<?php

namespace App\Http\Controllers;

use App\Models\Mensajero;
use Inertia\Inertia;

class MensajeroController extends Controller
{
    public function index()
    {

        $mensajes = Mensajero::all();

        return Inertia::render('Mensajero/Mensajero', [
            'mensajeros' => $mensajes,
        ]);
    }
}
