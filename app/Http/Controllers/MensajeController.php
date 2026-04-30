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
}
