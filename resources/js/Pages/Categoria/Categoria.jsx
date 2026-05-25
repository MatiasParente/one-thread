import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/Button';

export default function Index({ categorias }) {
    const handleDelete = (id) => {
        if (confirm('¿Eliminar esta categoría?')) {
            router.delete(route('categorias.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout title="Categorías" subtitle="Lista de categorías">
            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-[30px] font-bold text-gray-900 tracking-tight">
                        Categorías
                    </h1>
                    <Button href={route('categorias.create')}>
                        + Nueva Categoría
                    </Button>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr className="text-sm font-semibold text-gray-100" style={{ backgroundColor: "#226583" }}>
                                <th className="p-3 text-left">ID</th>
                                <th className="p-3 text-left">Nombre</th>
                                <th className='p-3 text-left'>Cantidad de Mensajes</th>
                                <th className="p-3 text-left">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categorias.map(categoria => (
                                <tr key={categoria.id} className="border-t border-gray-100 hover:bg-gray-50">
                                    <td className="p-3 text-gray-600">{categoria.id}</td>
                                    <td className="p-3 font-medium text-gray-800">{categoria.nombre}</td>
                                    <td className="p-3 text-gray-600">{categoria.cantidad_mensajes ?? 0}</td>
                                    <td className="p-3">
                                        <div className="flex gap-2">
                                            <Button size="sm" variant='ghost' href={route('categorias.show', categoria.id)}>
                                                Ver
                                            </Button>
                                            <Button size="sm" href={route('categorias.edit', categoria.id)}>
                                                Editar
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="danger"
                                                onClick={() => handleDelete(categoria.id)}
                                            >
                                                Eliminar
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {categorias.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-gray-400">
                                        No hay categorías registradas
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