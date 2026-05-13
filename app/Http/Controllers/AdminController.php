<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Admin_Mensaje;
use App\Models\Categoria;
use App\Models\Mensaje_Clasificado;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    /**
     * Página principal de gestión de agentes.
     * Carga todos los admins con su usuario y categorías para el listado de cards.
     */
    public function index(): Response
    {
        return Inertia::render('Usuarios/Index', [
            'admins' => Admin::with(['user', 'categorias'])->get(),
            'allCategorias' => Categoria::all(['id', 'nombre']),
        ]);
    }

    /**
     * Crea un nuevo agente: User (login) + Admin (perfil) + admin_categorias (asignación).
     * Misma lógica que RegisteredUserController@store pero sin login automático.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:users,email',
            'telefono' => 'required|string|max:20',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'categorias_ids' => 'required|array|min:1',
            'categorias_ids.*' => 'exists:categorias,id',
        ]);

        // 1. Crear usuario para login
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // 2. Crear perfil de admin vinculado al user
        $admin = $user->admin()->create([
            'nombre' => $request->name,
            'telefono' => $request->telefono,
        ]);

        // 3. Vincular categorías en tabla pivote admin_categorias
        $admin->categorias()->attach($request->categorias_ids);

        return redirect()->back();
    }

    /**
     * actualizamos datos de un agente existente y sincroniza las categorías asignadas. Contra opcional sise da
     */
    public function update(Request $request, Admin $admin)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:users,email,'.$admin->id_user,
            'telefono' => 'required|string|max:20',
            'password' => ['nullable', 'confirmed', Rules\Password::defaults()],
            'categorias_ids' => 'required|array|min:1',
            'categorias_ids.*' => 'exists:categorias,id',
        ]);

        $userData = [
            'name' => $request->name,
            'email' => $request->email,
        ];

        if ($request->filled('password')) {
            $userData['password'] = Hash::make($request->password);
        }

        $admin->user->fill($userData);

        // Si cambió el email, invalidar verificación
        if ($admin->user->isDirty('email')) {
            $admin->user->email_verified_at = null;
        }

        $admin->user->save();

        // actualizar perfil admin
        $admin->update([
            'nombre' => $request->name,
            'telefono' => $request->telefono,
        ]);

        // Ponemos al día las categorías (agrega las nuevas, elimina las quitadas)
        $admin->categorias()->sync($request->categorias_ids);

        return redirect()->back();
    }

    /**
     * Al eliminar el User, cascade delete elimina el Admin y los registros en admin_categorias y admin_mensaje. Ojalá nunca usar esto
     */
    public function destroy(Admin $admin)
    {
        // Eliminar el User (cascade elimina Admin, admin_categorias, admin_mensaje)
        $admin->user->delete();

        return redirect()->back();
    }

    // ──────────────────────────────────────────────
    // ENDPOINTS PARA PANELES DE DETALLE DEL AGENTE
    // ──────────────────────────────────────────────

    /**
     * Obtenemos los mensajes clasificados asignados a un admin en particular.
     *
     * SQL equivalente:
     *   SELECT mc.*, m.contenido, m.origen, m.fecha_envio
     *   FROM mensajes_clasificados mc
     *   INNER JOIN mensajes m ON m.id = mc.id_mensaje
     *   WHERE mc.id_mensaje IN (
     *     SELECT id_mensaje FROM admin_mensaje WHERE id_admin = ?
     *   )
     *   ORDER BY mc.created_at DESC; HORRIBLE LA CONSULTA, YA LO SÉ, NO QUIERO ALTERAR LA BD
     *
     * "Eager" loading para facilitar el trabajo del frontend:
     *   - mensaje: contenido original, canal, fecha de envío
     *   - mensaje.mensajeros: datos del remitente externo (nombre, teléfono)
     *   - tipo_mensaje.tipos: clasificación asignada por la IA (tipo + categoría)
     *
     * @return JsonResponse
     */
    public function mensajes(Admin $admin)
    {
        // 1. Obtenemos los IDs de mensajes asignados a este admin
        $mensajeIds = Admin_Mensaje::where('id_admin', $admin->id)
            ->pluck('id_mensaje');

        // 2. Buscamos mensajes clasificados cuyo id_mensaje esté en esa lista
        $mensajes = Mensaje_Clasificado::whereIn('id_mensaje', $mensajeIds)
            ->with([
                'mensaje.mensajeros',       // datos del remitente
                'tipo_mensaje.tipos',        // clasificación IA (tipo -> categoría)
            ])
            ->latest()
            ->get();

        return response()->json($mensajes);
    }

    /**
     * Calcula métricas de rendimiento de un admin.
     *
     * Consultas realizadas:
     *   - Total asignados: COUNT(*) FROM admin_mensaje WHERE id_admin = ?; facilito
     *   - Por día (7 días): JOIN mensajes, GROUP BY DATE(fecha_envio); igual facilito
     *   - Por prioridad: JOIN mensajes_clasificados, GROUP BY prioridad; easy (mentira)
     *   - Por estado: JOIN mensajes_clasificados, GROUP BY estado; very easy
     *   - Confianza promedio: AVG(puntaje_confianza) FROM mensajes_clasificados; esta la sugirió la ia
     *
     * @return JsonResponse
     */
    public function metricas(Admin $admin)
    {
        // IDs de mensajes asignados a este admin
        $mensajeIds = Admin_Mensaje::where('id_admin', $admin->id)
            ->pluck('id_mensaje');

        // Total de mensajes asignados
        $totalAsignados = $mensajeIds->count();

        // Mensajes por día (últimos 7 días)
        // JOIN mensajes para obtener fecha_envio, agrupa por día
        $porDia = Mensaje_Clasificado::whereIn('id_mensaje', $mensajeIds)
            ->join('mensajes', 'mensajes_clasificados.id_mensaje', '=', 'mensajes.id')
            ->where('mensajes.fecha_envio', '>=', now()->subDays(7))
            ->selectRaw('DATE(mensajes.fecha_envio) as fecha, COUNT(*) as total')
            ->groupBy('fecha')
            ->orderBy('fecha')
            ->get();

        // distribución por prioridad (Alta, Media, Baja)
        $porPrioridad = Mensaje_Clasificado::whereIn('id_mensaje', $mensajeIds)
            ->selectRaw('prioridad, COUNT(*) as total')
            ->groupBy('prioridad')
            ->pluck('total', 'prioridad');

        // distribución por estado (pendiente, en proceso, en pausa, resuelto)
        $porEstado = Mensaje_Clasificado::whereIn('id_mensaje', $mensajeIds)
            ->selectRaw('estado, COUNT(*) as total')
            ->groupBy('estado')
            ->pluck('total', 'estado');

        // puntaje de confianza promedio de la clasificación IA
        $confianzaPromedio = Mensaje_Clasificado::whereIn('id_mensaje', $mensajeIds)
            ->avg('puntaje_confianza');

        return response()->json([
            'totalAsignados' => $totalAsignados,
            'porDia' => $porDia,
            'porPrioridad' => $porPrioridad,
            'porEstado' => $porEstado,
            'confianzaPromedio' => $confianzaPromedio ? round($confianzaPromedio, 1) : 0,
        ]);
    }

    /**
     * Obtiene la carga de trabajo actual de un admin. Esta la sugirió la ia, puede ser útil.
     *
     * Consulta SQL equivalente:
     *   SELECT estado, COUNT(*) as total
     *   FROM mensajes_clasificados
     *   WHERE id_mensaje IN (SELECT id_mensaje FROM admin_mensaje WHERE id_admin = ?)
     *   GROUP BY estado
     *
     * Y desglosa los mensajes pendientes por prioridad:
     *   SELECT prioridad, COUNT(*) as total
     *   FROM mensajes_clasificados
     *   WHERE id_mensaje IN (...) AND estado = 0
     *   GROUP BY prioridad
     *
     * @return JsonResponse
     */
    public function carga(Admin $admin)
    {
        // IDs de mensajes asignados a este admin
        $mensajeIds = Admin_Mensaje::where('id_admin', $admin->id)
            ->pluck('id_mensaje');

        // Conteo por estado: pendientes (0), en proceso (1), en pausa (2), resueltos (3)
        $porEstado = Mensaje_Clasificado::whereIn('id_mensaje', $mensajeIds)
            ->selectRaw('estado, COUNT(*) as total')
            ->groupBy('estado')
            ->pluck('total', 'estado');

        // desglose por prioridad SOLO de los pendientes (estado = 0)
        $pendientesPorPrioridad = Mensaje_Clasificado::whereIn('id_mensaje', $mensajeIds)
            ->where('estado', Mensaje_Clasificado::ESTADO_PENDIENTE)
            ->selectRaw('prioridad, COUNT(*) as total')
            ->groupBy('prioridad')
            ->pluck('total', 'prioridad');

        return response()->json([
            'porEstado' => $porEstado,
            'pendientesPorPrioridad' => $pendientesPorPrioridad,
        ]);
    }
}
