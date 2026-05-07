<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MensajeController;
use App\Models\Mensaje_Clasificado;
use App\Http\Controllers\MensajeClasificadoController;
use Inertia\Inertia;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\TipoController;

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


Route::resource('mensajes-clasificados', MensajeClasificadoController::class)
    ->only(['create', 'store', 'edit', 'update', 'destroy','show'])
    ->middleware(['auth', 'verified']);

Route::resource('mensajes-simples', MensajeController::class)
    ->only(['index','create', 'store', 'edit', 'update', 'destroy','show'])
    ->middleware(['auth', 'verified']);  

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::middleware(['auth'])->group(function () {
  
    Route::resource('categorias', CategoriaController::class);
    
   
    Route::resource('tipos', TipoController::class);
});

require __DIR__.'/auth.php';
