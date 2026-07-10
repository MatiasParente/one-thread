<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Tipo;
use Inertia\Inertia;

class ConfiguracionController extends Controller
{
    public function index()
    {
        return Inertia::render('Configuracion/Index', [
            'totalCategorias' => Categoria::query()->count(),
            'totalTipos' => Tipo::query()->count(),
        ]);
    }
}
