<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoriaController extends Controller
{
    public function index()
    {
        $categorias = Categoria::with('tipos')->get();
        
        return Inertia::render('Categoria/Categoria', [
            'categorias' => $categorias
        ]);
    }
    public function create()
{
    $categorias = Categoria::all();
    return Inertia::render('Categoria/Create', [
        'categorias' => $categorias
    ]);
}

public function show(Categoria $categoria)
{
    return Inertia::render('Categoria/Show', [
        'categoria' => $categoria->load('tipos')
    ]);
}

public function edit(Categoria $categoria)
{
    return Inertia::render('Categoria/Edit', [
        'categoria' => $categoria
    ]);
}

    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255'
        ]);
        
        Categoria::create([
            'nombre' => $request->nombre
        ]);
        
        return redirect()->back();
    }

    public function update(Request $request, Categoria $categoria)
    {
        $request->validate([
            'nombre' => 'required|string|max:255'
        ]);
        
        $categoria->update([
            'nombre' => $request->nombre
        ]);
        
        return redirect()->back();
    }

    public function destroy(Categoria $categoria)
    {
        $categoria->delete();
        return redirect()->back();
    }
}