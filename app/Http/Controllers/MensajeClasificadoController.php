<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Mensaje_Clasificado;

class MensajeClasificadoController extends Controller
{
    //

    public function index(){

    $mensajes = Mensaje_Clasificado::all();

    return Inertia::render('Dashboard',[
        'mensajes' => $mensajes,
    ]);
    }
}
