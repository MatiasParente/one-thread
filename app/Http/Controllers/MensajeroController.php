<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Mensajero;

class MensajeroController extends Controller
{
    public function index(){

    $mensajes = Mensajero::all();

    return Inertia::render('Mensajero/Mensajero',[
        'mensajeros' => $mensajes,
    ]);
    }
}
