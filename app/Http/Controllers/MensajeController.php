<?php

namespace App\Http\Controllers;

use App\Models\Mensaje;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class MensajeController extends Controller
{
    //
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

        $query = Mensaje::query()
            ->with('mensajeros:id,nombre,apellido')
            ->leftJoin('mensajes_clasificados', 'mensajes.id', '=', 'mensajes_clasificados.id_mensaje')
            ->leftJoin('tipo_mensaje', 'mensajes_clasificados.id_mensaje', '=', 'tipo_mensaje.id_mensaje')
            ->leftJoin('tipos', 'tipo_mensaje.id_tipo', '=', 'tipos.id')
            ->leftJoin('categorias', 'tipos.id_categoria', '=', 'categorias.id')
            ->select('mensajes.id','mensajes.contenido', 'mensajes.origen', 'mensajes.fecha_envio','mensajes.id_mensajero','mensajes.created_at','mensajes.updated_at', 'mensajes_clasificados.id as clasificado_id');

        if ($general) {
            $mensajes = $query->distinct()->get();
        } else {
            $mensajes = $query->whereIn('categorias.id', $categoriaIds)
                            ->distinct()
                            ->get();
        }


        return Inertia::render('Mensaje/Mensaje', [
            'mensajes' => $mensajes,
        ]);
    }

    public function create()
    {
        return Inertia::render('Mensaje/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'contenido' => 'required|string|max:255',
            'origen' => 'required|string',
            'id_mensajero' => 'required|integer',
        ]);

        Mensaje::create($validated);

        return redirect()->route('mensajes-simples.index')->with('success', 'Mensaje creado correctamente.');
    }

    public function edit($id)
    {
        $mensaje = Mensaje::findOrFail($id);

        return Inertia::render('Mensaje/Edit', [
            'mensaje' => $mensaje,
        ]);
    }

    public function update(Request $request, $id)
    {
        $mensaje = Mensaje::findOrFail($id);

        $validated = $request->validate([
            'contenido' => 'required|string|max:255',
            'origen' => 'required|string',
        ]);

        $mensaje->update($validated);

        return redirect()->route('mensajes-simples.index')->with('success', 'Mensaje actualizado.');
    }

    public function destroy($id)
    {
        $mensaje = Mensaje::findOrFail($id);
        $mensaje->delete();

        return redirect()->route('mensajes-simples.index')->with('success', 'Mensaje eliminado.');
    }

    public function mensajesAdmin(){
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

        $query = Mensaje::query()
        ->leftJoin('mensajes_clasificados', 'mensajes.id', '=', 'mensajes_clasificados.id_mensaje')
        ->leftJoin('tipo_mensaje', 'mensajes_clasificados.id_mensaje', '=', 'tipo_mensaje.id_mensaje')
        ->leftJoin('tipos', 'tipo_mensaje.id_tipo', '=', 'tipos.id')
        ->leftJoin('categorias', 'tipos.id_categoria', '=', 'categorias.id')
        ->select('mensajes.id','mensajes.contenido', 'mensajes.origen', 'mensajes.fecha_envio','mensajes.id_mensajero','mensajes.created_at','mensajes.updated_at');

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
