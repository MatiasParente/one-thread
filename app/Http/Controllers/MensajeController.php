<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Mensaje;
use App\Models\Mensaje_Clasificado;
use App\Models\Mensaje_Temporal;
use App\Models\Mensajero;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class MensajeController extends Controller
{
    //
    public function index(Request $request)
    {
        $user = Auth::user();
        $user->load('admin.categorias');

        $categoriasAdmin = $user->admin?->categorias ?? collect();
        $categoriaIds = $categoriasAdmin->pluck('id')->toArray();
        $general = in_array(32, $categoriaIds);

        // Optimizacion: Obtener el ultimo mensaje clasificado por mensajero
        $latestMessages = DB::table('mensajes')
            ->join('mensajes_clasificados', 'mensajes.id', '=', 'mensajes_clasificados.id_mensaje')
            ->selectRaw('id_mensajero, MAX(mensajes.id) as last_msg_id')
            ->groupBy('id_mensajero')
            ->get();

        $lastMsgIds = $latestMessages->pluck('last_msg_id')->toArray();

        $classifieds = Mensaje::whereIn('id', $lastMsgIds)
            ->with('mensaje_clasificado.tipo_mensaje.tipos.categoria')
            ->get();

        $mensajerosCategoria = [];
        $mensajerosPermitidos = [];
        $allMensajeros = Mensajero::pluck('id')->toArray();
        $mensajerosConClasificados = [];

        foreach ($classifieds as $msg) {
            $mId = $msg->id_mensajero;
            $mensajerosConClasificados[] = $mId;
            $cats = collect();
            if ($msg->mensaje_clasificado && $msg->mensaje_clasificado->tipo_mensaje) {
                foreach ($msg->mensaje_clasificado->tipo_mensaje as $tm) {
                    if ($tm->tipos && $tm->tipos->categoria) {
                        $cats->push($tm->tipos->categoria);
                    }
                }
            }
            $mensajerosCategoria[$mId] = $cats;

            $catIds = $cats->pluck('id')->toArray();
            $intersect = array_intersect($catIds, $categoriaIds);
            if ($general || ! empty($intersect)) {
                $mensajerosPermitidos[] = $mId;
            }
        }

        $mensajerosSinClasificar = array_diff($allMensajeros, $mensajerosConClasificados);
        foreach ($mensajerosSinClasificar as $mId) {
            $mensajerosCategoria[$mId] = collect();
            $mensajerosPermitidos[] = $mId; // Visible to everyone if no category
        }

        $query = Mensaje::query()
            ->with('mensajeros:id,nombre,apellido')
            ->leftJoin('mensajes_clasificados', 'mensajes.id', '=', 'mensajes_clasificados.id_mensaje')
            ->select('mensajes.id', 'mensajes.contenido', 'mensajes.origen', 'mensajes.fecha_envio', 'mensajes.id_mensajero', 'mensajes.created_at', 'mensajes.updated_at', 'mensajes_clasificados.id as clasificado_id')
            ->whereIn('mensajes.id_mensajero', $mensajerosPermitidos)
            ->where(function ($q) {
                $q->whereNull('mensajes_clasificados.id')
                    ->orWhere('mensajes_clasificados.estado', '!=', 3);
            });

        if ($request->filled('contenido')) {
            $query->where('mensajes.contenido', 'like', '%'.$request->contenido.'%');
        }

        if ($request->filled('origen')) {
            $query->where('mensajes.origen', $request->origen);
        }

        if ($request->filled('id_categoria')) {
            $reqCat = (int) $request->id_categoria;
            $allowedForCat = [];
            foreach ($mensajerosPermitidos as $mId) {
                $cats = $mensajerosCategoria[$mId];
                if ($cats && $cats->contains('id', $reqCat)) {
                    $allowedForCat[] = $mId;
                }
            }
            $query->whereIn('mensajes.id_mensajero', $allowedForCat);
        }

        $mensajes = $query->latest('mensajes.fecha_envio')->get();

        $mensajes->transform(function ($msg) use ($mensajerosCategoria) {
            $msg->categorias_derivadas = $mensajerosCategoria[$msg->id_mensajero] ?? [];

            return $msg;
        });

        $todasCategorias = Categoria::orderBy('nombre')->get();
        if (! $general) {
            $todasCategorias = $todasCategorias->whereIn('id', $categoriaIds)->values();
        }

        $temporales = Mensaje_Temporal::all();

        return Inertia::render('Mensaje/Mensaje', [
            'mensajes' => $mensajes,
            'mensajes_temporales' => $temporales,
            'categorias' => $todasCategorias,
            'filters' => $request->only(['contenido', 'origen', 'id_categoria']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Mensaje/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'contenido' => 'required|string|max:255',
            'origen' => 'required|string',
            'id_mensajero' => 'required|integer',
            'temporal_id' => 'sometimes|integer|exists:mensajes_temporal,id',
        ]);

        // Agregar la fecha actual
        $validated['fecha_envio'] = Carbon::now();

        if ($request->has('temporal_id')) {
            $temporal = Mensaje_Temporal::find($request->temporal_id);
            if ($temporal) {
                $temporal->delete();
            }
        }

        Mensaje::create($validated);

        return redirect()->route('mensajes-simples.index')->with('success', 'Mensaje creado correctamente.');
    }

    public function edit($id)
    {
        $mensaje = Mensaje::findOrFail($id);

        return Inertia::render('Mensaje/Edit', [
            'mensaje' => $mensaje,
        ]);
    }

    public function update(Request $request, $id)
    {
        $mensaje = Mensaje::findOrFail($id);

        $validated = $request->validate([
            'contenido' => 'required|string|max:255',
            'origen' => 'required|string',
        ]);

        $mensaje->update($validated);

        return redirect()->route('mensajes-simples.index')->with('success', 'Mensaje actualizado.');
    }

    public function destroy($id)
    {
        $mensaje = Mensaje::findOrFail($id);

        $mensajeClasificado = Mensaje_Clasificado::where('id_mensaje', $mensaje->id)->first();
        if ($mensajeClasificado) {
            $mensajeClasificado->delete();
        }

        $mensaje->delete();

        return redirect()->back()->with('success', 'Mensaje eliminado permanentemente.');
    }

    public function mensajesAdmin()
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

        $query = Mensaje::query()
            ->leftJoin('mensajes_clasificados', 'mensajes.id', '=', 'mensajes_clasificados.id_mensaje')
            ->leftJoin('tipo_mensaje', 'mensajes_clasificados.id_mensaje', '=', 'tipo_mensaje.id_mensaje')
            ->leftJoin('tipos', 'tipo_mensaje.id_tipo', '=', 'tipos.id')
            ->leftJoin('categorias', 'tipos.id_categoria', '=', 'categorias.id')
            ->select('mensajes.id', 'mensajes.contenido', 'mensajes.origen', 'mensajes.fecha_envio', 'mensajes.id_mensajero', 'mensajes.created_at', 'mensajes.updated_at');

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
