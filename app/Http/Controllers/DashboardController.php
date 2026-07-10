<?php

namespace App\Http\Controllers;

use App\Models\Mensaje;
use App\Models\Mensaje_Clasificado;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke()
    {

        $user = Auth::user();
        $user->load('admin.categorias.tipos');

        $categorias = $user->admin?->categorias;
        $categoriaIds = $categorias ? $categorias->pluck('id')->toArray() : [];

        $general = in_array(32, $categoriaIds);

        if (! $general) {
            $categorias = \App\Models\Categoria::with('tipos')->whereIn('id', $categoriaIds)->orderBy('nombre')->get();
        } else {
            $categorias = \App\Models\Categoria::with('tipos')->orderBy('nombre')->get();
        }

        $applyFilterToClasificado = function ($query) use ($general, $categoriaIds) {
            if (! $general) {
                $query->whereHas('tipo_mensaje.tipos.categoria', function ($q) use ($categoriaIds) {
                    $q->whereIn('categorias.id', $categoriaIds);
                });
            }

            return $query;
        };

        $applyFilterToMensaje = function ($query) use ($general, $categoriaIds) {
            if (! $general) {
                $query->whereHas('mensaje_clasificado.tipo_mensaje.tipos.categoria', function ($q) use ($categoriaIds) {
                    $q->whereIn('categorias.id', $categoriaIds);
                });
            }

            return $query;
        };

        $mensajesQuery = Mensaje_Clasificado::with(['mensaje.mensajeros', 'tipo_mensaje.tipos.categoria']);
        $mensajes = $applyFilterToClasificado($mensajesQuery)
            ->latest('mensajes_clasificados.created_at')
            ->get();

        $yesterday = now()->subDay()->toDateString();
        $dayBefore = now()->subDays(2)->toDateString();

        $totalMensajes = $applyFilterToMensaje(Mensaje::query())->count();
        $totalMensajesAyer = $applyFilterToMensaje(Mensaje::whereDate('created_at', $yesterday))->count();
        $totalMensajesAnteayer = $applyFilterToMensaje(Mensaje::whereDate('created_at', $dayBefore))->count();

        $urgentesQuery = $applyFilterToClasificado(Mensaje_Clasificado::where('prioridad', 'Alta'));
        $urgentes = $urgentesQuery->count();
        $urgentesAyer = (clone $urgentesQuery)->whereDate('created_at', $yesterday)->count();
        $urgentesAnteayer = (clone $urgentesQuery)->whereDate('created_at', $dayBefore)->count();

        $pendientesQuery = $applyFilterToClasificado(
            Mensaje_Clasificado::where('estado', Mensaje_Clasificado::ESTADO_PENDIENTE)
        );
        $pendientes = $pendientesQuery->count();
        $pendientesAyer = (clone $pendientesQuery)->whereDate('created_at', $yesterday)->count();
        $pendientesAnteayer = (clone $pendientesQuery)->whereDate('created_at', $dayBefore)->count();

        $sinAsignarQuery = $applyFilterToMensaje(
            Mensaje::whereDoesntHave('admin_mensajes')
        );
        $sinAsignar = $sinAsignarQuery->count();
        $sinAsignarAyer = (clone $sinAsignarQuery)->whereDate('created_at', $yesterday)->count();
        $sinAsignarAnteayer = (clone $sinAsignarQuery)->whereDate('created_at', $dayBefore)->count();

        $stats = [
            'total' => [
                'value' => $totalMensajes,
                'prev' => $totalMensajesAyer,
                'prev2' => $totalMensajesAnteayer,
            ],
            'urgentes' => [
                'value' => $urgentes,
                'prev' => $urgentesAyer,
                'prev2' => $urgentesAnteayer,
            ],
            'pendientes' => [
                'value' => $pendientes,
                'prev' => $pendientesAyer,
                'prev2' => $pendientesAnteayer,
            ],
            'sinAsignar' => [
                'value' => $sinAsignar,
                'prev' => $sinAsignarAyer,
                'prev2' => $sinAsignarAnteayer,
            ],
        ];

        $mensajesPorCanal = $applyFilterToMensaje(Mensaje::query())
            ->selectRaw('origen, count(*) as total')
            ->groupBy('origen')
            ->pluck('total', 'origen');

        $mensajesPorDia = $applyFilterToMensaje(
            Mensaje::where('created_at', '>=', now()->subDays(7))
        )
            ->selectRaw('DATE(created_at) as fecha, count(*) as total')
            ->groupBy('fecha')
            ->orderBy('fecha')
            ->get();

        $avgMinutesQuery = $applyFilterToClasificado(
            Mensaje_Clasificado::where('estado', Mensaje_Clasificado::ESTADO_RESUELTO)
        );
        $avgMinutes = $avgMinutesQuery
            ->join('mensajes', 'mensajes_clasificados.id_mensaje', '=', 'mensajes.id')
            ->selectRaw('AVG(TIMESTAMPDIFF(MINUTE, mensajes.fecha_envio, mensajes_clasificados.updated_at)) as avg_minutes')
            ->value('avg_minutes');

        $actividadHoy = $applyFilterToClasificado(
            Mensaje_Clasificado::whereDate('updated_at', today())
        )->count();

        $resumenRapido = [
            'tiempoRespuesta' => $avgMinutes ? round($avgMinutes) : null,
            'sinAsignar' => $sinAsignar,
            'actividadHoy' => $actividadHoy,
        ];

        return Inertia::render('Dashboard', compact('stats', 'mensajes', 'mensajesPorCanal', 'mensajesPorDia', 'resumenRapido', 'categorias', 'general'));
    }
}
