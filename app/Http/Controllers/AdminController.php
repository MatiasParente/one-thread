<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller; // Opcional pero bueno tenerlo
use Inertia\Inertia;                // <--- ESTA ES LA QUE FALTA
use Inertia\Response;               // Para el tipado

class AdminController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Dashboard', [
            'admins' => \App\Models\Admin::with(['user', 'categorias'])->get()
        ]);
    }
}