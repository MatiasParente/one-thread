import { useEffect, useState } from 'react';
import { MessageSquare, Loader2 } from 'lucide-react';

const prioridadBadge = {
    Alta: 'bg-red-100 text-red-800',
    Media: 'bg-amber-100 text-amber-800',
    Baja: 'bg-gray-100 text-gray-600',
};

const estadoBadge = {
    0: { label: 'Pendiente', class: 'bg-primary-light text-primary' },
    1: { label: 'En proceso', class: 'bg-amber-100 text-amber-800' },
    2: { label: 'Resuelto', class: 'bg-emerald-100 text-emerald-800' },
    3: { label: 'Eliminado', class: 'bg-red-100 text-red-800' },
};

const canalBadge = {
    Telegram: 'bg-primary-light text-primary',
    Whatsapp: 'bg-emerald-100 text-emerald-800',
    Gmail: 'bg-gray-100 text-gray-600',
    Instagram: 'bg-pink-100 text-pink-800',
};

export default function AdminMensajesList({ adminId }) {
    const [mensajes, setMensajes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!adminId) return;
        setLoading(true);
        fetch(route('agentes.mensajes', adminId))
            .then((res) => res.json())
            .then((data) => {
                setMensajes(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [adminId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 size={24} className="animate-spin text-primary" />
            </div>
        );
    }

    if (mensajes.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <MessageSquare size={40} className="mb-3 text-gray-300" />
                <p className="text-sm">Este agente no tiene mensajes asignados</p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-md border border-gray-200 bg-white">
            <table className="w-full">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                            Canal
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                            Remitente
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                            Resumen
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                            Prioridad
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                            Estado
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                            Fecha
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {mensajes.map((mc) => (
                        <tr
                            key={mc.id}
                            className="transition-colors hover:bg-gray-50"
                        >
                            <td className="px-4 py-3">
                                <span
                                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                                        canalBadge[mc.mensaje?.origen] ?? 'bg-gray-100 text-gray-600'
                                    }`}
                                >
                                    {mc.mensaje?.origen ?? '—'}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                                {mc.mensaje?.mensajeros
                                    ? `${mc.mensaje.mensajeros.nombre} ${mc.mensaje.mensajeros.apellido ?? ''}`
                                    : '—'}
                            </td>
                            <td className="max-w-xs truncate px-4 py-3 text-sm text-gray-700">
                                {mc.resumen ?? 'Sin resumen'}
                            </td>
                            <td className="px-4 py-3">
                                <span
                                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                                        prioridadBadge[mc.prioridad] ?? 'bg-gray-100 text-gray-600'
                                    }`}
                                >
                                    {mc.prioridad}
                                </span>
                            </td>
                            <td className="px-4 py-3">
                                <span
                                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                                        estadoBadge[mc.estado]?.class ?? 'bg-gray-100 text-gray-600'
                                    }`}
                                >
                                    {estadoBadge[mc.estado]?.label ?? 'Desconocido'}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-xs text-gray-500">
                                {mc.mensaje?.fecha_envio
                                    ? new Date(mc.mensaje.fecha_envio).toLocaleDateString('es-UY')
                                    : '—'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
