<?php

namespace App\Http\Controllers;

use App\Models\Admin_Mensaje;
use App\Models\Mensaje;
use App\Models\Mensaje_Clasificado;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Http;
use Carbon\Carbon;

class AdminMensajeController extends Controller
{
    public function index()
    {
        $mensajes = Admin_Mensaje::with(['mensaje.mensajeros', 'admin'])->latest()->get();

        return Inertia::render('Admin_Mensaje/Admin_Mensaje', [
            'mensajes' => $mensajes,
        ]);
    }

    public function create($id)
    {
        $mensajeClasificado = Mensaje_Clasificado::with(['mensaje.mensajeros', 'tipo_mensaje.tipos.categoria'])
            ->findOrFail($id);

        $mensajeroId = $mensajeClasificado->mensaje->id_mensajero;
        
        $admin = auth()->user()->admin;
        $adminCategorias = $admin ? $admin->categorias : collect();
        $adminCategoriasIds = $adminCategorias->pluck('id')->toArray();
        $esGeneral = $adminCategorias->contains(function ($cat) {
            return strtolower($cat->nombre) === 'general';
        });

        $query = Mensaje::where('id_mensajero', $mensajeroId);

        if (!$esGeneral) {
            $query->where(function ($q) use ($adminCategoriasIds) {
                // Mostrar mensajes sin clasificar (charla activa)
                $q->doesntHave('mensaje_clasificado')
                    // O mostrar mensajes clasificados que pertenezcan a las categorías del admin
                    ->orWhereHas('mensaje_clasificado.tipo_mensaje.tipos', function ($q2) use ($adminCategoriasIds) {
                        $q2->whereIn('id_categoria', $adminCategoriasIds);
                    });
            });
        }

        $historialMensajes = $query->with(['mensaje_clasificado', 'admin_mensajes.admin'])
            ->orderBy('fecha_envio', 'asc')
            ->get();

        return Inertia::render('Respuesta/RespuestaAgente', [
            'mensajeClasificado' => $mensajeClasificado,
            'historialMensajes' => $historialMensajes
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'respuesta' => 'required|string',
            'seleccionados' => 'required|array|min:1',
            'canal_seleccionado' => 'required|string',
            'seleccionados.*' => 'integer|exists:mensajes,id'
        ]);

        $adminId = auth()->id(); 

        $primerMensajeId = $request->seleccionados[0];
        $primerMensajeOriginal = Mensaje::findOrFail($primerMensajeId);
        
        $mensajeroId = $primerMensajeOriginal->id_mensajero;
        
        // Un chat se considera activo si el cliente ya tiene algún mensaje en estado 1 (En proceso)
        $esCharlaActiva = Mensaje_Clasificado::whereHas('mensaje', function($q) use ($mensajeroId) {
            $q->where('id_mensajero', $mensajeroId);
        })->where('estado', 1)->exists();

        DB::transaction(function () use ($request, $adminId) {
            foreach ($request->seleccionados as $idMensaje) {
                Admin_Mensaje::create([
                    'id_admin' => $adminId,
                    'id_mensaje' => $idMensaje,
                    'respuesta' => $request->respuesta,
                    'canal_envio' => $request->canal_seleccionado, 
                    'fecha_respuesta' => now(),
                ]);

                Mensaje_Clasificado::where('id_mensaje', $idMensaje)->update([
                    'estado' => 1 
                ]);
            }
        });

        try {
            $mensajesSeleccionados = Mensaje::whereIn('id', $request->seleccionados)->get();

            $mensajeOriginalTexto = "";
            if (!$esCharlaActiva) {
                $mensajeOriginalTexto = $mensajesSeleccionados->map(function ($msg) {
                    return "- " . $msg->contenido;
                })->implode("\n");
            }

            $mensajeConCliente = Mensaje::with('mensajeros')->findOrFail($primerMensajeId);
            $cliente = $mensajeConCliente->mensajeros;
            $nombreAdmin = auth()->user()->name;

            Http::withoutVerifying()
                ->withToken(env('N8N_WEBHOOK_SECRET'))
                ->connectTimeout(1)
                ->timeout(2)
                ->post('https://1689b3416f179237a92fb7aa79bbc6c4.tipyenaccion.net/webhook/enviar-respuesta', [
                    'respuesta'                => $request->respuesta,
                    'canal_envio'              => $request->canal_seleccionado, 
                    'agente_nombre'            => $nombreAdmin,
                    'cliente_id'               => $cliente->id,
                    'cliente_nombre'           => $cliente->nombre . ' ' . $cliente->apellido,
                    'telefono'                 => $cliente->telefono ?? null,
                    'email'                    => $cliente->correo ?? null,
                    'telegram_id'              => $cliente->telegram_id ?? null,
                    'es_charla_activa'         => $esCharlaActiva,
                    'mensaje_original_cliente' => $mensajeOriginalTexto,
                ]);
        } catch (\Exception $e) {
            logger("Error enviando Webhook a n8n: " . $e->getMessage());
        }

        return redirect()->back()->with('success', 'Mensajes respondidos correctamente.');
    }

    public function update(Request $request, Admin_Mensaje $admin_mensaje)
    {
        $request->validate([
            'respuesta' => 'required|string',
        ]);

        $admin_mensaje->update([
            'respuesta' => $request->respuesta,
        ]);

        return redirect()->back()->with('success', 'Respuesta actualizada.');
    }

    public function destroy(Admin_Mensaje $admin_mensaje)
    {
        $admin_mensaje->delete();
        return redirect()->back()->with('success', 'Respuesta eliminada.');
    }

    public function finalizar(Request $request, $idMensajeClasificado)
    {
        $mensajeClasificado = Mensaje_Clasificado::with('mensaje.mensajeros')->findOrFail($idMensajeClasificado);
        
        $cliente = $mensajeClasificado->mensaje->mensajeros;
        $mensajeroId = $cliente->id;

        // Pasamos a 'Resuelto' (2) a TODOS los mensajes de este cliente que estén 'En proceso' (1)
        Mensaje_Clasificado::whereHas('mensaje', function($q) use ($mensajeroId) {
            $q->where('id_mensajero', $mensajeroId);
        })
        ->where('estado', 1)
        ->update([
            'estado' => 2
        ]);

        $canal = $mensajeClasificado->mensaje->origen;
        
        $canal_id = null;
        if (strtolower($canal) === 'telegram') {
            $canal_id = $cliente->telegram_id;
        } elseif (strtolower($canal) === 'whatsapp') {
            $canal_id = $cliente->telefono;
        } else {
            $canal_id = $cliente->correo;
        }

        try {
            Http::withoutVerifying()
                ->withToken(env('N8N_WEBHOOK_SECRET'))
                ->timeout(3)
                ->post('https://1689b3416f179237a92fb7aa79bbc6c4.tipyenaccion.net/webhook/encuesta', [
                    'canal' => ucfirst($canal),
                    'canal_id' => $canal_id,
                    'nombre_cliente' => trim($cliente->nombre . ' ' . $cliente->apellido)
                ]);
        } catch (\Exception $e) {
            logger("Error enviando Webhook encuesta a n8n: " . $e->getMessage());
        }

        return redirect()->back()->with('success', 'Conversación finalizada y encuesta enviada.');
    }
}