<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Mensaje_Clasificado;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoriaController extends Controller
{
    public function index()
    {
        // Obtener todas las categorías con sus tipos y mensajes relacionados
        // Luego, calcular la cantidad total de mensajes clasificados por categoría
        $categorias = Categoria::with(['tipos.mensajes'])->get();
        $categorias = $categorias->map(function ($categoria) {

            $cantidadMensajes = $categoria->tipos
                ->flatMap(fn ($tipo) => $tipo->mensajes)
                ->unique('id')
                ->count();

            $categoria->cantidad_mensajes = $cantidadMensajes;

            return $categoria;
        });

        $totalMensajes = Mensaje_Clasificado::count();

        return Inertia::render('Categoria/Categoria', [
            'categorias' => $categorias,
            'totalMensajes' => $totalMensajes,
        ]);
    }

    public function create()
    {
        $categorias = Categoria::all();

        return Inertia::render('Categoria/Create', [
            'categorias' => $categorias,
        ]);
    }

    public function show(Categoria $categoria)
    {
        return Inertia::render('Categoria/Show', [
            'categoria' => $categoria->load('tipos'),
        ]);
    }

    public function edit(Categoria $categoria)
    {
        return Inertia::render('Categoria/Edit', [
            'categoria' => $categoria,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
        ]);

        Categoria::create([
            'nombre' => $request->nombre,
        ]);

        return redirect()->back();
    }

    public function update(Request $request, Categoria $categoria)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
        ]);

        $categoria->update([
            'nombre' => $request->nombre,
        ]);

        return redirect()->back();
    }

    public function destroy(Categoria $categoria)
    {
        // Primero, por cada tipo en esta categoría, desvincular sus mensajes para satisfacer foreign keys
        foreach ($categoria->tipos as $tipo) {
            $tipo->mensajes()->detach();
            $tipo->delete();
        }

        $categoria->delete();

        return redirect()->back();
    }
}
