<?php

namespace App\Http\Controllers;

use App\Models\Mensaje;
use App\Models\Mensaje_Clasificado;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke()
    {
        $yesterday = now()->subDay()->toDateString();
        $dayBefore = now()->subDays(2)->toDateString();

        $stats = [
            'total' => [
                'value' => Mensaje::count(),
                'prev' => Mensaje::whereDate('created_at', $yesterday)->count(),
                'prev2' => Mensaje::whereDate('created_at', $dayBefore)->count(),
            ],
            'urgentes' => [
                'value' => Mensaje_Clasificado::where('prioridad', 'Alta')->count(),
                'prev' => Mensaje_Clasificado::where('prioridad', 'Alta')->whereDate('created_at', $yesterday)->count(),
                'prev2' => Mensaje_Clasificado::where('prioridad', 'Alta')->whereDate('created_at', $dayBefore)->count(),
            ],
            'pendientes' => [
                'value' => Mensaje_Clasificado::where('estado', Mensaje_Clasificado::ESTADO_PENDIENTE)->count(),
                'prev' => Mensaje_Clasificado::where('estado', Mensaje_Clasificado::ESTADO_PENDIENTE)->whereDate('created_at', $yesterday)->count(),
                'prev2' => Mensaje_Clasificado::where('estado', Mensaje_Clasificado::ESTADO_PENDIENTE)->whereDate('created_at', $dayBefore)->count(),
            ],
            'sinAsignar' => [
                'value' => Mensaje::whereDoesntHave('admin_mensajes')->count(),
                'prev' => Mensaje::whereDoesntHave('admin_mensajes')->whereDate('created_at', $yesterday)->count(),
                'prev2' => Mensaje::whereDoesntHave('admin_mensajes')->whereDate('created_at', $dayBefore)->count(),
            ],
        ];

        $mensajes = Mensaje_Clasificado::with('mensaje')->latest()->get();

        $mensajesPorCanal = Mensaje::selectRaw('origen, count(*) as total')
            ->groupBy('origen')
            ->pluck('total', 'origen');

        $mensajesPorDia = Mensaje::where('created_at', '>=', now()->subDays(7))
            ->selectRaw('DATE(created_at) as fecha, count(*) as total')
            ->groupBy('fecha')
            ->orderBy('fecha')
            ->get();

        $avgMinutes = Mensaje_Clasificado::where('estado', Mensaje_Clasificado::ESTADO_RESUELTO)
            ->join('mensajes', 'mensajes_clasificados.id_mensaje', '=', 'mensajes.id')
            ->selectRaw('AVG(TIMESTAMPDIFF(MINUTE, mensajes.fecha_envio, mensajes_clasificados.updated_at)) as avg_minutes')
            ->value('avg_minutes');

        $resumenRapido = [
            'tiempoRespuesta' => $avgMinutes ? round($avgMinutes) : null,
            'sinAsignar' => Mensaje::whereDoesntHave('admin_mensajes')->count(),
            'actividadHoy' => Mensaje_Clasificado::whereDate('updated_at', today())->count(),
        ];

        return Inertia::render('Dashboard', compact('stats', 'mensajes', 'mensajesPorCanal', 'mensajesPorDia', 'resumenRapido'));
    }
}
