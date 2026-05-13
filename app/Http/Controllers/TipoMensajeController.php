<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TipoMensajeController extends Controller
{
    //

    public function index(){

    $tipos = Tipo_Mensaje::all();

    return Inertia::render('TipoMensaje/TipoMensaje',[
        'tipos' => $tipos,
    ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'id_mensaje' => 'required|integer',
            'id_tipo' => 'required|integer'
        ]);
        
        Tipo_Mensaje::create([
            'id_mensaje' => $request->id_mensaje,
            'id_tipo' => $request->id_tipo
        ]);
        
        return redirect()->back();
    }

    public function update(Request $request, Tipo_Mensaje $tipos_mensaje)
    {
        $request->validate([
            'id_mensaje' => 'required|integer',
            'id_tipo' => 'required|integer'
        ]);
        
        $tipos_mensaje->update([
            'id_mensaje' => $request->id_mensaje,
            'id_tipo' => $request->id_tipo
        ]);
        
        return redirect()->back();
    }

    public function destroy(Tipo_Mensaje $tipos_mensaje)
    {
        $tipos_mensaje->delete();
        return redirect()->back();
    }

}
