<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MensajeClasificadoController;
use App\Http\Controllers\MensajeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TipoController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::get('/dashboard', DashboardController::class)
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::resource('mensajes-clasificados', MensajeClasificadoController::class)
    ->only(['create', 'store', 'edit', 'update', 'destroy', 'show'])
    ->middleware(['auth', 'verified']);

Route::resource('mensajes-simples', MensajeController::class)
    ->only(['index', 'create', 'store', 'edit', 'update', 'destroy', 'show'])
    ->middleware(['auth', 'verified']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth'])->group(function () {

    Route::resource('categorias', CategoriaController::class);

    Route::resource('tipos', TipoController::class);

    // Rutas de detalle para paneles de agente (deben ir antes del resource)
    Route::get('usuarios/{admin}/mensajes', [AdminController::class, 'mensajes'])->name('usuarios.mensajes');
    Route::get('usuarios/{admin}/metricas', [AdminController::class, 'metricas'])->name('usuarios.metricas');
    Route::get('usuarios/{admin}/carga', [AdminController::class, 'carga'])->name('usuarios.carga');

    Route::resource('usuarios', AdminController::class);
});

require __DIR__.'/auth.php';
