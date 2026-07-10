<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Mensaje_Clasificado;
use App\Models\Mensajero;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MensajeClasificadoController extends Controller
{
    //

    public function index(Request $request)
    {

        $user = Auth::user();
        $user->load('admin.categorias.tipos');

        $categorias = $user->admin?->categorias;
        $adminCategoriaIds = $categorias->pluck('id')->toArray();
        $categoriaIds = $categorias->pluck('id')->toArray();

        $general = in_array(32, $categoriaIds);

        $query = Mensaje_Clasificado::with([
            'mensaje.mensajeros',
            'tipo_mensaje.tipos.categoria',
        ]);

        if (! $general) {
            $query->whereHas('tipo_mensaje.tipos.categoria', function ($q) use ($categoriaIds) {
                $q->whereIn('categorias.id', $categoriaIds);
            });
        }

        if ($request->filled('nombre_cliente')) {
            $query->whereHas('mensaje.mensajeros', function ($q) use ($request) {
                $q->where('nombre', 'like', '%'.$request->nombre_cliente.'%')
                    ->orWhere('apellido', 'like', '%'.$request->nombre_cliente.'%');
            });
        }

        if ($request->filled('id_categoria')) {
            $query->whereHas('tipo_mensaje.tipos', function ($q) use ($request) {
                $q->where('id_categoria', $request->id_categoria);
            });
        }

        if ($request->filled('prioridad')) {
            $query->where('prioridad', $request->prioridad);
        }

        if ($request->filled('estado')) {
            $query->where('estado', $request->estado);
        }

        $mensajes = $query->latest()->get();

        $mensajerosQuery = Mensajero::query();

        if (! $general) {
            $mensajerosQuery->whereHas('mensaje', function ($q) use ($categoriaIds) {
                $q->whereHas('mensaje_clasificado', function ($sub) use ($categoriaIds) {
                    // Y desde mensaje_clasificado accedemos a tipo_mensaje -> tipos -> categoria
                    $sub->whereHas('tipo_mensaje.tipos.categoria', function ($sub2) use ($categoriaIds) {
                        $sub2->whereIn('categorias.id', $categoriaIds);
                    });
                });
            });
            // Fetch only categories allowed for this admin
            $categorias = Categoria::with('tipos')->whereIn('id', $categoriaIds)->orderBy('nombre')->get();
        } else {
            $categorias = Categoria::with('tipos')->orderBy('nombre')->get();
        }

        $clientes = $mensajerosQuery
            ->orderBy('nombre')
            ->get()
            ->map(function ($m) {
                return [
                    'id' => $m->id,
                    'nombre_completo' => trim("{$m->nombre} {$m->apellido}"),
                ];
            });

        return Inertia::render('MensajeClasificado/Index', [
            'mensajes' => $mensajes,
            'categorias' => $categorias,
            'is_general' => $general,
            'filters' => $request->only(['nombre_cliente', 'id_categoria', 'prioridad', 'estado']),
        ]);
    }

    public function create()
    {
        return Inertia::render('MensajeClasificado/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'resumen' => 'required|string|max:255',
            'prioridad' => 'required|string|in:Alta,Media,Baja',
            'estado' => 'required|integer|in:0,1,2,3',
            'id_mensaje' => 'required|integer',
        ]);

        Mensaje_Clasificado::create($validated);

        return redirect()->route('dashboard')->with('success', 'Mensaje creado correctamente.');
    }

    public function show($id)
    {
        $mensaje = Mensaje_Clasificado::findOrFail($id);

        return Inertia::render('MensajeClasificado/Show', [
            'mensaje' => $mensaje,
        ]);
    }

    public function edit($id)
    {
        $mensaje = Mensaje_Clasificado::with('tipos')->findOrFail($id);
        $categorias = Categoria::with('tipos')->get();

        return Inertia::render('MensajeClasificado/Edit', [
            'mensaje' => $mensaje,
            'categorias' => $categorias,
        ]);
    }

    public function update(Request $request, $id)
    {
        $mensaje = Mensaje_Clasificado::findOrFail($id);

        $validated = $request->validate([
            'resumen' => 'required|string|max:255',
            'prioridad' => 'required|string|in:Alta,Media,Baja',
            'estado' => 'required|integer|in:0,1,2,3',
            'tipos_ids' => 'nullable|array',
            'tipos_ids.*' => 'exists:tipos,id',
        ]);

        $mensaje->update([
            'resumen' => $validated['resumen'],
            'prioridad' => $validated['prioridad'],
            'estado' => $validated['estado'],
        ]);

        if (array_key_exists('tipos_ids', $validated)) {
            $mensaje->tipos()->sync($validated['tipos_ids'] ?? []);
        }

        return redirect()->back()->with('success', 'Mensaje actualizado.');
    }

    public function destroy($id)
    {
        $mensaje = Mensaje_Clasificado::findOrFail($id);
        if ($mensaje->estado != 3) {
            $mensaje->update(['estado' => 3]);

            return redirect()->back()->with('success', 'Mensaje marcado como resuelto.');
        } else {
            $mensajeAsociado = $mensaje->mensaje;
            $mensaje->delete();
            if ($mensajeAsociado) {
                $mensajeAsociado->delete();
            }

            return redirect()->back()->with('success', 'Mensaje eliminado permanentemente.');
        }
    }

    public function mensajeClasificadosAdmin()
    {
        $user = Auth::user();
        $user->load('admin.categorias');

        $categorias = $user->admin?->categorias;

        $categoriaIds = $categorias->pluck('id')->toArray();

        $general = false;

        foreach ($categoriaIds as $cat) {
            if ($cat == 32) {
                $general = true;
                break;
            }
        }

        $query = Mensaje_Clasificado::query()
            ->leftJoin('tipo_mensaje', 'mensajes_clasificados.id_mensaje', '=', 'tipo_mensaje.id_mensaje')
            ->leftJoin('tipos', 'tipo_mensaje.id_tipo', '=', 'tipos.id')
            ->leftJoin('categorias', 'tipos.id_categoria', '=', 'categorias.id')
            ->select('mensajes_clasificados.id', 'mensajes_clasificados.id_mensaje', 'mensajes_clasificados.resumen', 'mensajes_clasificados.prioridad', 'mensajes_clasificados.puntaje_confianza', 'mensajes_clasificados.estado');

        if ($general) {
            $mensajes = $query->distinct()->get();
        } else {
            $mensajes = $query->whereIn('categorias.id', $categoriaIds)
                ->distinct()
                ->get();
        }

        return $mensajes;

    }
}
