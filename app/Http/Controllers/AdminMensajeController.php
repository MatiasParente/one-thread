<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Admin_Mensaje;

class AdminMensajeController extends Controller
{
    //

    public function index(){

    $mensajes = Admin_Mensaje::all();

    return Inertia::render('Admin_Mensaje/Admin_Mensaje',[
        'mensajes' => $mensajes,
    ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'id_mensaje' => 'required|integer',
            'id_admin' => 'required|integer'
        ]);
        
        Admin_Mensaje::create([
            'id_mensaje' => $request->id_mensaje,
            'id_admin' => $request->id_admin
        ]);
        
        return redirect()->back();
    }

    public function update(Request $request, Admin_Mensaje $admin_mensaje)
    {
        $request->validate([
            'id_mensaje' => 'required|integer',
            'id_admin' => 'required|integer'
        ]);
        
        $admin_mensaje->update([
            'id_mensaje' => $request->id_mensaje,
            'id_admin' => $request->id_admin
        ]);
        
        return redirect()->back();
    }

    public function destroy(Admin_Mensaje $admin_mensaje)
    {
        $admin_mensaje->delete();
        return redirect()->back();
    }
}
