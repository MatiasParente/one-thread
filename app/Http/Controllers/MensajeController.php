<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Mensaje;

class MensajeController extends Controller
{
    //
    public function index(){

    $mensajes = Mensaje::all();

    return Inertia::render('Mensaje/Mensaje',[
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
            'id_mensajero' => 'required|integer'
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
            'origen' => 'required|string'
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
}
