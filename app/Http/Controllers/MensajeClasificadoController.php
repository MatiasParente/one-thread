<?php

namespace App\Http\Controllers;

use App\Models\Mensaje_Clasificado;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MensajeClasificadoController extends Controller
{
    //

    public function index()
    {

        $mensajes = Mensaje_Clasificado::all();

        return Inertia::render('Dashboard', [
            'mensajes' => $mensajes,
        ]);
    }

    public function create()
    {
        return Inertia::render('MensajeClasificado/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'resumen' => 'required|string|max:255',
            'prioridad' => 'required|string|in:Alta,Media,Baja',
            'estado' => 'required|integer|in:0,1,2,3',
            'id_mensaje' => 'required|integer',
        ]);

        Mensaje_Clasificado::create($validated);

        return redirect()->route('dashboard')->with('success', 'Mensaje creado correctamente.');
    }

    public function show($id)
    {
        $mensaje = Mensaje_Clasificado::findOrFail($id);

        return Inertia::render('MensajeClasificado/Show', [
            'mensaje' => $mensaje,
        ]);
    }

    public function edit($id)
    {
        $mensaje = Mensaje_Clasificado::findOrFail($id);

        return Inertia::render('MensajeClasificado/Edit', [
            'mensaje' => $mensaje,
        ]);
    }

    public function update(Request $request, $id)
    {
        $mensaje = Mensaje_Clasificado::findOrFail($id);

        $validated = $request->validate([
            'resumen' => 'required|string|max:255',
            'prioridad' => 'required|string|in:Alta,Media,Baja',
            'estado' => 'required|integer|in:0,1,2,3',
        ]);

        $mensaje->update($validated);

        return redirect('dashboard')->with('success', 'Mensaje actualizado.');
    }

    public function destroy($id)
    {
        $mensaje = Mensaje_Clasificado::findOrFail($id);
        $mensaje->delete();

        return redirect()->route('dashboard')->with('success', 'Mensaje eliminado.');
    }
}
