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

        $categorias = $user->admin?->categorias; 

        $categoriaIds = $categorias->pluck('id')->toArray();

        $general = false;

        foreach($categoriaIds as $cat){
            if($cat == 32){
                $general = true;
                break;
            }
        }

        $query = Mensajero::query()
        ->leftJoin('mensajes','mensajeros.id','=','mensajes.id_mensajero')
        ->leftJoin('mensajes_clasificados', 'mensajes.id', '=', 'mensajes_clasificados.id_mensaje')
        ->leftJoin('tipo_mensaje', 'mensajes_clasificados.id_mensaje', '=', 'tipo_mensaje.id_mensaje')
        ->leftJoin('tipos', 'tipo_mensaje.id_tipo', '=', 'tipos.id')
        ->leftJoin('categorias', 'tipos.id_categoria', '=', 'categorias.id')
        ->select('mensajeros.id','mensajeros.nombre', 'mensajeros.apellido', 'mensajeros.telefono','mensajeros.correo','mensajeros.whatsapp_id','mensajeros.telegram_id','mensajeros.instagram_id');

        $mensajeros = $query->orderBy('mensajeros.nombre');

        if ($general) {
            $mensajes = $query->distinct()->get();
        } else {
            $mensajes = $query->whereIn('categorias.id', $categoriaIds)
                            ->distinct()
                            ->get();
        }

        return Inertia::render('Mensajero/Mensajero', [
            'mensajeros' => $mensajes,
        ]);
    }

    public function mensajerosAdmin(){
        $user = Auth::user();
        $user->load('admin.categorias'); 

        $categorias = $user->admin?->categorias; 

        $categoriaIds = $categorias->pluck('id')->toArray();

        $general = false;

        foreach($categoriaIds as $cat){
            if($cat == 32){
                $general = true;
                break;
            }
        }

        $query = Mensajero::query()
        ->leftJoin('mensajes','mensajeros.id','=','mensajes.id_mensajero')
        ->leftJoin('mensajes_clasificados', 'mensajes.id', '=', 'mensajes_clasificados.id_mensaje')
        ->leftJoin('tipo_mensaje', 'mensajes_clasificados.id_mensaje', '=', 'tipo_mensaje.id_mensaje')
        ->leftJoin('tipos', 'tipo_mensaje.id_tipo', '=', 'tipos.id')
        ->leftJoin('categorias', 'tipos.id_categoria', '=', 'categorias.id')
        ->select('mensajeros.id','mensajeros.nombre', 'mensajeros.apellido', 'mensajeros.telefono','mensajeros.correo','mensajeros.whatsapp_id','mensajeros.telegram_id','mensajeros.instagram_id');

        if ($general) {
            $mensajes = $query->distinct()->get();
        } else {
            $mensajes = $query->whereIn('categorias.id', $categoriaIds)
                            ->distinct()
                            ->get();
        }

        return $mensajes;
    }
}
