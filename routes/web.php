<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MensajeController;
use App\Models\Mensaje_Clasificado;
use App\Http\Controllers\MensajeClasificadoController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $mensajes = Mensaje_Clasificado::all();
    return Inertia::render('Dashboard', ['mensajes' => $mensajes]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/mensajes', [MensajeController::class, 'index'])->name('mensajes.index');

Route::resource('mensajes', MensajeClasificadoController::class)
    ->only(['create', 'store', 'edit', 'update', 'destroy','show'])
    ->middleware(['auth', 'verified']);



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
