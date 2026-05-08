import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import Button from '@/Components/Button';

export default function Dashboard({ mensajes }) {
    const user = usePage().props.auth.user;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Bienvenido {user.name}
                </h2>
            }
        >
            <Head title="Dashboard" />

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
                                <th className="p-3 text-left text-sm font-medium text-gray-600">Requiere Revision</th>
                                <th className="p-3 text-left text-sm font-medium text-gray-600">Accion</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {mensajes && mensajes.length > 0 ? (
                                mensajes.map((mensaje) => (
                                    <tr key={mensaje.id} className="hover:bg-gray-50">
                                        <td className="p-3 text-sm text-gray-800">{mensaje.resumen}</td>
                                        <td className="p-3 text-sm text-gray-800">{mensaje.prioridad}</td>
                                        <td className="p-3 text-sm text-gray-800">{mensaje.requiere_revision ? 'Sí' : 'No'}</td>
                                        <td className="p-3">
                                            <Button size="sm" href={route('mensajes-clasificados.show', mensaje.id)}>
                                                Ver Mensaje
                                            </Button>
                                        </td>
                                    </tr>
                                ))
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
