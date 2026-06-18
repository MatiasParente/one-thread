<?php

namespace App\Http\Controllers;

use App\Models\Mensajero;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class MensajeroController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $user->load('admin.categorias'); 

        $categoriasAdmin = $user->admin?->categorias ?? collect(); 
        $categoriaIds = $categoriasAdmin->pluck('id')->toArray();
        $general = in_array(32, $categoriaIds);

        // Optimizacion: Obtener el ultimo mensaje clasificado por mensajero
        $latestMessages = \Illuminate\Support\Facades\DB::table('mensajes')
            ->join('mensajes_clasificados', 'mensajes.id', '=', 'mensajes_clasificados.id_mensaje')
            ->selectRaw('id_mensajero, MAX(mensajes.id) as last_msg_id')
            ->groupBy('id_mensajero')
            ->get();

        $lastMsgIds = $latestMessages->pluck('last_msg_id')->toArray();

        $classifieds = \App\Models\Mensaje::whereIn('id', $lastMsgIds)
            ->with('mensaje_clasificado.tipo_mensaje.tipos.categoria')
            ->get();

        $mensajerosPermitidos = [];
        $allMensajeros = Mensajero::pluck('id')->toArray();
        $mensajerosConClasificados = [];

        foreach ($classifieds as $msg) {
            $mId = $msg->id_mensajero;
            $mensajerosConClasificados[] = $mId;
            $cats = collect();
            if ($msg->mensaje_clasificado && $msg->mensaje_clasificado->tipo_mensaje) {
                foreach ($msg->mensaje_clasificado->tipo_mensaje as $tm) {
                    if ($tm->tipos && $tm->tipos->categoria) {
                        $cats->push($tm->tipos->categoria);
                    }
                }
            }
            
            $catIds = $cats->pluck('id')->toArray();
            $intersect = array_intersect($catIds, $categoriaIds);
            if ($general || !empty($intersect)) {
                $mensajerosPermitidos[] = $mId;
            }
        }

        $mensajerosSinClasificar = array_diff($allMensajeros, $mensajerosConClasificados);
        foreach ($mensajerosSinClasificar as $mId) {
            $mensajerosPermitidos[] = $mId;
        }

        $mensajeros = Mensajero::whereIn('id', $mensajerosPermitidos)
            ->orderBy('nombre')
            ->get();

        return Inertia::render('Mensajero/Mensajero', [
            'mensajeros' => $mensajeros,
        ]);
    }

    public function update(\Illuminate\Http\Request $request, $id)
    {
        $mensajero = Mensajero::findOrFail($id);

        $validated = $request->validate([
            'nombre' => 'required|string|max:255',
            'apellido' => 'nullable|string|max:255',
            'telefono' => 'nullable|string|max:255',
            'correo' => 'nullable|email|max:255',
        ]);

        $mensajero->update($validated);

        return redirect()->back()->with('success', 'Mensajero actualizado.');
    }

    public function destroy($id)
    {
        $mensajero = Mensajero::findOrFail($id);
        
        $mensajesIds = \App\Models\Mensaje::where('id_mensajero', $id)->pluck('id');
        
        \App\Models\Mensaje_Clasificado::whereIn('id_mensaje', $mensajesIds)->delete();
        \App\Models\Mensaje::whereIn('id', $mensajesIds)->delete();

        $mensajero->delete();

        return redirect()->back()->with('success', 'Mensajero eliminado.');
    }

    public function mensajeroId($canal_id){
        
        $mensajero = Mensajero::where('telegram_id',$canal_id)->first();


        return response()->json($mensajero);

    }
}
