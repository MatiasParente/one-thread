<?php

namespace App\Http\Controllers\Auth;
use App\Models\Admin;
use App\Models\Categoria;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): \Inertia\Response
    {
    return Inertia::render('Auth/Register', [
        'categorias' => Categoria::all(['id', 'nombre']) 
    ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
{
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
        'password' => ['required', 'confirmed', Rules\Password::defaults()],
        'telefono' => 'required|string|max:20',
        'categorias_ids' => 'required|array', // Validamos que sea un array
        'categorias_ids.*' => 'exists:categorias,id', // Y que cada ID exista
    ]);

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);

    $admin = Admin::create([
        'id_user' => $user->id,
        'nombre' => $request->name,
        'telefono' => $request->telefono,
    ]);

    // Usamos el método sincronizar o adjuntar
    $admin->categorias()->attach($request->categorias_ids);

    event(new Registered($user));
    Auth::login($user);

    return redirect(route('dashboard'));
}
}
