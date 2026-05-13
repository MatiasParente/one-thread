<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\AdminCategoria;

class AdminCategoriaController extends Controller
{
    public function index(){

    $categorias = Admin_Categoria::all();

    return Inertia::render('AdminCategoria/AdminCategoria',[
        'categorias' => $categorias,
    ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'id_categoria' => 'required|integer',
            'id_admin' => 'required|integer'
        ]);
        
        Admin_Categoria::create([
            'id_categoria' => $request->id_categoria,
            'id_admin' => $request->id_admin
        ]);
        
        return redirect()->back();
    }

    public function update(Request $request, Admin_Categoria $categoria)
    {
        $request->validate([
            'id_categoria' => 'required|integer',
            'id_admin' => 'required|integer'
        ]);
        
        $categoria->update([
            'id_categoria' => $request->id_categoria,
            'id_admin' => $request->id_admin
        ]);
        
        return redirect()->back();
    }

    public function destroy(Admin_Categoria $categoria)
    {
        $categoria->delete();
        return redirect()->back();
    }
}
