<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MensajeClasificadoController;
use App\Http\Controllers\MensajeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TipoController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MensajeroController;
use Inertia\Inertia;
use App\Http\Controllers\AdminMensajeController;
use App\Http\Controllers\ConfiguracionController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/dashboard', DashboardController::class)
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::resource('mensajes-clasificados', MensajeClasificadoController::class)
    ->only(['index', 'edit', 'update', 'destroy', 'show'])
    ->middleware(['auth', 'verified']);

Route::resource('mensajes-simples', MensajeController::class)
    ->only(['index', 'destroy', 'show'])
    ->middleware(['auth', 'verified']);

Route::resource('mensajeros', MensajeroController::class)
        ->only(['index'])
        ->middleware(['auth', 'verified']);

Route::get('/reportes', function () {
    return Inertia::render('Reportes/Index');
})->middleware(['auth', 'verified'])->name('reportes');

Route::get('/configuracion', [ConfiguracionController::class, 'index']
)->middleware(['auth', 'verified'])->name('configuracion');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth'])->group(function () {

    Route::resource('categorias', CategoriaController::class);

    Route::resource('tipos', TipoController::class);

    // Rutas de detalle para paneles de agente (deben ir antes del resource)
    Route::get('agentes/{admin}/mensajes', [AdminController::class, 'mensajes'])->name('agentes.mensajes');
    Route::get('agentes/{admin}/metricas', [AdminController::class, 'metricas'])->name('agentes.metricas');
    Route::get('agentes/{admin}/carga', [AdminController::class, 'carga'])->name('agentes.carga');

    Route::resource('agentes', AdminController::class);

    Route::get('mensajes-clasificados/{id}/respuesta', [AdminMensajeController::class, 'create'])
        ->name('mensajes-clasificados.respuesta');

    Route::post('/mensajes/responder', [AdminMensajeController::class, 'store'])
        ->name('mensajes.responder');
        
    Route::post('mensajes-clasificados/{id}/finalizar', [AdminMensajeController::class, 'finalizar'])
        ->name('mensajes-clasificados.finalizar');

    Route::resource('admin-mensajes', AdminMensajeController::class)->only(['index', 'update', 'destroy']);
    Route::post('/verificar-cierre-chat', [AdminMensajeController::class, 'verificarCierreChat']);
});

require __DIR__.'/auth.php';
