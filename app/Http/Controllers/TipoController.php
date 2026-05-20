<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Tipo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TipoController extends Controller
{
    public function index()
    {
        $tipos = Tipo::with('categoria')->get();

        $categorias = Categoria::all();

        return Inertia::render('Tipo/Tipo', [
            'tipos' => $tipos,
            'categorias' => $categorias,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'id_categoria' => 'required|exists:categorias,id',
        ]);

        Tipo::create([
            'nombre' => $request->nombre,
            'id_categoria' => $request->id_categoria,
        ]);

        return redirect()->back();
    }

    public function update(Request $request, Tipo $tipo)
    {

        $request->validate([
            'nombre' => 'required|string|max:255',
            'id_categoria' => 'required|exists:categorias,id',
        ]);

        $tipo->update([
            'nombre' => $request->nombre,
            'id_categoria' => $request->id_categoria,
        ]);

        return redirect()->back();
    }

    public function create()
    {
        $categorias = Categoria::all();

        return Inertia::render('Tipo/Create', [
            'categorias' => $categorias,
        ]);
    }

    public function show(Tipo $tipo)
    {
        return Inertia::render('Tipo/Show', [
            'tipo' => $tipo->load('categoria'),
        ]);
    }

    public function edit(Tipo $tipo)
    {
        $categorias = Categoria::all();

        return Inertia::render('Tipo/Edit', [
            'tipo' => $tipo->load('categoria'),
            'categorias' => $categorias,
        ]);
    }

    public function destroy(Tipo $tipo)
    {
        $tipo->delete();

        return redirect()->back();
    }
}
