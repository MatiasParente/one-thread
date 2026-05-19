<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use App\Models\Mensaje_Clasificado;
use App\Models\Mensajero;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MensajeClasificadoController extends Controller
{
    //

    public function index(Request $request)
    {
        $query = Mensaje_Clasificado::with([
            'mensaje.mensajeros',
            'tipo_mensaje.tipos.categoria',
        ]);

        // Filter by Client (id_mensajero)
        if ($request->filled('id_mensajero')) {
            $query->whereHas('mensaje', function ($q) use ($request) {
                $q->where('id_mensajero', $request->id_mensajero);
            });
        }

        // Filter by Category (id_categoria)
        if ($request->filled('id_categoria')) {
            $query->whereHas('tipo_mensaje.tipos', function ($q) use ($request) {
                $q->where('id_categoria', $request->id_categoria);
            });
        }

        // Filter by Priority
        if ($request->filled('prioridad')) {
            $query->where('prioridad', $request->prioridad);
        }

        $mensajes = $query->latest()->get();

        // Fetch messengers and categories for filter dropdowns
        $clientes = Mensajero::orderBy('nombre')->get()->map(function ($m) {
            return [
                'id' => $m->id,
                'nombre_completo' => trim("{$m->nombre} {$m->apellido}"),
            ];
        });

        $categorias = Categoria::orderBy('nombre')->get();

        return Inertia::render('MensajeClasificado/Index', [
            'mensajes' => $mensajes,
            'clientes' => $clientes,
            'categorias' => $categorias,
            'filters' => $request->only(['id_mensajero', 'id_categoria', 'prioridad']),
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
        $mensaje = Mensaje_Clasificado::findOrFail($id);

        return Inertia::render('MensajeClasificado/Edit', [
            'mensaje' => $mensaje,
        ]);
    }

    public function update(Request $request, $id)
    {
        $mensaje = Mensaje_Clasificado::findOrFail($id);

        $validated = $request->validate([
            'resumen' => 'required|string|max:255',
            'prioridad' => 'required|string|in:Alta,Media,Baja',
            'estado' => 'required|integer|in:0,1,2,3',
        ]);

        $mensaje->update($validated);

        return redirect('dashboard')->with('success', 'Mensaje actualizado.');
    }

    public function destroy($id)
    {
        $mensaje = Mensaje_Clasificado::findOrFail($id);
        $mensaje->delete();

        return redirect()->route('dashboard')->with('success', 'Mensaje eliminado.');
    }
}
