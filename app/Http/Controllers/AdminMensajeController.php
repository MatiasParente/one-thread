<?php

namespace App\Http\Controllers;

use App\Models\Admin_Mensaje;
use App\Models\Mensaje;
use App\Models\Mensaje_Clasificado;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

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

    $historialMensajes = Mensaje::where('id_mensajero', $mensajeroId)
        ->with(['mensaje_clasificado', 'admin_mensajes.admin'])
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

        DB::transaction(function () use ($request, $adminId) {
            foreach ($request->seleccionados as $idMensaje) {
                
                $mensajeOriginal = Mensaje::findOrFail($idMensaje);
                
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