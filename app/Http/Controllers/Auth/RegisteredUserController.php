<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Categoria;
use App\Models\User; // <--- 1. IMPORTA TU MODELO AQUÍ
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Muestra la vista de registro.
     */
    public function create(): Response
    {
        // 2. BUSCA LAS CATEGORÍAS Y PÁSALAS A LA VISTA
        return Inertia::render('Auth/Register', [
            'categorias' => Categoria::all(),
        ]);
    }

    /**
     * Maneja la solicitud de registro.
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:users,email',
            'telefono' => 'required|string|max:20',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'categorias_ids' => 'required|array|min:1',
        ]);

        // 1. Crear el usuario para el login
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // 2. Crear el perfil de Admin
        // Solo pasamos nombre y telefono (id_user se pone solo por la relación)
        $admin = $user->admin()->create([
            'nombre' => $request->name,
            'telefono' => $request->telefono,
        ]);

        // 3. Vincular las categorías en la tabla 'admin_categorias'
        if ($request->has('categorias_ids')) {
            $admin->categorias()->attach($request->categorias_ids);
        }

        event(new Registered($user));
        Auth::login($user);

        return redirect(route('dashboard'));
    }
}
