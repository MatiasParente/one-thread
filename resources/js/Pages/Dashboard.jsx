import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Button from '@/Components/Button';
import StatsCards from '@/Components/StatsCards';

const estadoLabels = {
    0: { text: 'Pendiente', className: 'bg-primary-light text-primary' },
    1: { text: 'En proceso', className: 'bg-amber-50 text-amber-700' },
    2: { text: 'En pausa', className: 'bg-gray-100 text-gray-600' },
    3: { text: 'Resuelto', className: 'bg-emerald-50 text-emerald-700' },
};

export default function Dashboard({ stats, mensajes }) {
    return (
        <AuthenticatedLayout
            title="Dashboard"
            subtitle="Resumen de actividad y mensajes"
        >
            <Head title="Dashboard" />

            <StatsCards stats={stats} />

            <div className="mb-6 flex gap-3">
                <Button href={route('mensajes-simples.index')}>
                    Ir a mensajes
                </Button>

                <Button href={route('mensajes-clasificados.create')} variant="secondary">
                    Crear Mensaje
                </Button>
            </div>

            <div className="overflow-hidden bg-white shadow-sm sm:rounded-md">
                <div className="p-6">
                    <h1 className="text-lg font-semibold mb-4 text-gray-900">Mensajes disponibles</h1>
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-3 text-left text-sm font-medium text-gray-600">Resumen</th>
                                <th className="p-3 text-left text-sm font-medium text-gray-600">Prioridad</th>
                                <th className="p-3 text-left text-sm font-medium text-gray-600">Estado</th>
                                <th className="p-3 text-left text-sm font-medium text-gray-600">Accion</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {mensajes && mensajes.length > 0 ? (
                                mensajes.map((mensaje) => {
                                    const estado = estadoLabels[mensaje.estado] ?? estadoLabels[0];
                                    return (
                                        <tr key={mensaje.id} className="hover:bg-gray-50">
                                            <td className="p-3 text-sm text-gray-800">{mensaje.resumen}</td>
                                            <td className="p-3 text-sm text-gray-800">{mensaje.prioridad}</td>
                                            <td className="p-3">
                                                <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${estado.className}`}>
                                                    {estado.text}
                                                </span>
                                            </td>
                                            <td className="p-3">
                                                <Button size="sm" href={route('mensajes-clasificados.show', mensaje.id)}>
                                                    Ver Mensaje
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="4" className="p-3 text-center text-sm text-gray-500">
                                        No hay mensajes disponibles.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
