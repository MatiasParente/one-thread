import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/Button';

export default function Index({ tipos }) {
    const handleDelete = (id) => {
        if (confirm('¿Eliminar este tipo?')) {
            router.delete(route('tipos.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout title="Tipos" subtitle="Lista de tipos de mensajes">
            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-[30px] font-bold text-gray-900 tracking-tight">
                        Tipos
                    </h1>
                    <Button href={route('tipos.create')}>
                        + Nuevo Tipo
                    </Button>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr className="text-sm font-semibold text-gray-100" style={{ backgroundColor: "#226583" }}>
                                <th className="p-3 text-left">ID</th>
                                <th className="p-3 text-left">Nombre</th>
                                <th className="p-3 text-left">Categoría</th>
                                <th className="p-3 text-left">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tipos.map(tipo => (
                                <tr key={tipo.id} className="border-t border-gray-100 hover:bg-gray-50">
                                    <td className="p-3 text-gray-600">{tipo.id}</td>
                                    <td className="p-3 font-medium text-gray-800">{tipo.nombre}</td>
                                    <td className="p-3 text-gray-600">{tipo.categoria?.nombre}</td>
                                    <td className="p-3">
                                        <div className="flex gap-2">
                                            <Button size="sm" variant='ghost' href={route('tipos.show', tipo.id)}>
                                                Ver
                                            </Button>
                                            <Button size="sm" href={route('tipos.edit', tipo.id)}>
                                                Editar
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="danger"
                                                onClick={() => handleDelete(tipo.id)}
                                            >
                                                Eliminar
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {tipos.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-gray-400">
                                        No hay tipos registrados
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