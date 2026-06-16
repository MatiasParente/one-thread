import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import { MessageSquare, Loader2 } from 'lucide-react';
import StarRating from '../StarRating';

const canalBadge = {
    Telegram: 'bg-primary-light text-primary',
    Whatsapp: 'bg-emerald-100 text-emerald-800',
    Gmail: 'bg-gray-100 text-gray-600',
    Instagram: 'bg-pink-100 text-pink-800',
};

export default function AdminComentariosList({ adminId }) {
    const [comentarios, setComentarios] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (!adminId) return;
        setLoading(true);
        fetch(route('agentes.comentarios', adminId))
            .then((res) => res.json())
            .then((data) => {
                setComentarios(data);
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

    if (comentarios.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <MessageSquare size={40} className="mb-3 text-gray-300" />
                <p className="text-sm">Este agente no ha recibido comentarios de clientes</p>
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
                            Puntaje
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">
                            Fecha
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {comentarios.map((com) => (
                        <tr
                            key={com.id}
                            className="transition-colors hover:bg-gray-50  cursor-pointer"
                        >
                            <td className="px-4 py-3">
                                <span
                                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                                        canalBadge[com.canal_envio] ?? 'bg-gray-100 text-gray-600'
                                    }`}
                                >
                                    {com.canal_envio ?? '—'}
                                </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-700">
                                {com.mensaje?.mensajeros
                                    ? `${com.mensaje.mensajeros.nombre} ${com.mensaje.mensajeros.apellido ?? ''}`
                                    : '—'}
                            </td>
                            <td className="max-w-xs truncate px-4 py-3 text-sm text-gray-700">
                                {com.comentarios_cliente ?? 'Sin resumen'}
                            </td>
                            <td className=" px-4 py-3 text-center" >
                                <StarRating value={com.puntaje}></StarRating>
                            </td>
                            
                            <td className="px-4 py-3 text-xs text-gray-500">
                                {com.mensaje?.fecha_envio
                                    ? new Date(com.mensaje.fecha_envio).toLocaleDateString('es-UY')
                                    : '—'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
