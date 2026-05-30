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

        // Buscamos el último mensaje ANTES de la transacción para evaluar la inactividad real
        $primerMensajeId = $request->seleccionados[0];
        $primerMensajeOriginal = Mensaje::findOrFail($primerMensajeId);
        
        // Buscamos la última respuesta que ESTE admin le envió a ESTE cliente (mensajero)
        $mensajeroId = $primerMensajeOriginal->id_mensajero;
        
        $ultimoAdminMensaje = Admin_Mensaje::where('id_admin', $adminId)
            ->whereHas('mensaje', function ($q) use ($mensajeroId) {
                $q->where('id_mensajero', $mensajeroId);
            })
            ->latest('fecha_respuesta')
            ->first();

        // Evaluamos si el chat venía activo en las últimas 24 horas (ahora 1 min para pruebas)
        $esCharlaActiva = false;
        if ($ultimoAdminMensaje && Carbon::parse($ultimoAdminMensaje->fecha_respuesta)->diffInMinutes(now()) < 1) {
            $esCharlaActiva = true;
        }

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
                    'estado' => 2 
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
                ->connectTimeout(1)
                ->timeout(2)
                ->post('https://n8njhong.ddns.net/webhook/enviar-respuesta', [
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
}