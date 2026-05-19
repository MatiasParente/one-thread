<?php

namespace App\Http\Controllers;

// Opcional pero bueno tenerlo
use App\Models\Admin;                // <--- ESTA ES LA QUE FALTA
use Inertia\Inertia;
use Inertia\Response;

               // Para el tipado

class AdminController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Dashboard', [
            'admins' => Admin::with(['user', 'categorias'])->get(),
        ]);
    }
}
