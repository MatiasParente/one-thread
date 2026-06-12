import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/Button';
import {
    FolderOpen,
    Search,
    Eye,
    Pencil,
    Trash2,
    Layers3,
    MessageSquare,
    BarChart3,
    ArrowLeft,
} from 'lucide-react';

export default function Index({ categorias, totalMensajes = 0 }) {

    const promedioMensajes =
        categorias.length > 0
            ? (totalMensajes / categorias.length).toFixed(1)
            : 0;

    const handleDelete = (id) => {
        if (confirm('¿Eliminar esta categoría?')) {
            router.delete(route('categorias.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            title="Categorías"
            subtitle="Administración de categorías de clasificación"
        >
            <div className="min-h-screen bg-gray-50 p-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-[30px] font-bold text-gray-900">
                            Categorías
                        </h1>

                        <p className="mt-1 text-gray-600">
                            Administra las categorías utilizadas para clasificar
                            mensajes.
                        </p>
                    </div>
                    <div className="flex gap-2">

                        <Button
                            href={route('configuracion')}
                            variant="secondary"
                        >
                            <ArrowLeft size={16} />
                            Volver
                        </Button>

                        <Button href={route('categorias.create')}>
                            + Nueva Categoría
                        </Button>
                    </div>
                </div>

                {/* cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">
                                    Categorías
                                </p>

                                <p className="text-3xl font-bold text-gray-900 mt-1">
                                    {categorias.length}
                                </p>
                            </div>

                            <Layers3
                                size={24}
                                className="text-primary"
                            />
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">
                                    Mensajes Clasificados
                                </p>

                                <p className="text-3xl font-bold text-gray-900 mt-1">
                                    {totalMensajes}
                                </p>
                            </div>

                            <MessageSquare
                                size={24}
                                className="text-primary"
                            />
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">
                                    Promedio por Categoría
                                </p>

                                <p className="text-3xl font-bold text-gray-900 mt-1">
                                    {promedioMensajes}
                                </p>
                            </div>

                            <BarChart3
                                size={24}
                                className="text-primary"
                            />
                        </div>
                    </div>
                </div>
                {/* Tabla */}
                <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>

                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                    Nombre
                                </th>

                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                    Mensajes
                                </th>

                                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                                    Acciones
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {categorias.length > 0 ? (
                                categorias.map((categoria) => (
                                    <tr
                                        key={categoria.id}
                                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                    >


                                        <td className="px-4 py-4">
                                            <span className="font-medium text-gray-900">
                                                {categoria.nombre}
                                            </span>
                                        </td>

                                        <td className="px-4 py-4">
                                            <span
                                                className="
                                                    inline-flex
                                                    items-center
                                                    px-3
                                                    py-1
                                                    rounded-full
                                                    text-xs
                                                    font-medium
                                                    bg-primary-light
                                                    text-primary
                                                "
                                            >
                                                {categoria.cantidad_mensajes ?? 0}
                                            </span>
                                        </td>

                                        <td className="px-4 py-4">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    href={route(
                                                        'categorias.show',
                                                        categoria.id
                                                    )}
                                                >
                                                    <Eye size={16} />
                                                </Button>

                                                <Button
                                                    size="sm"
                                                    href={route(
                                                        'categorias.edit',
                                                        categoria.id
                                                    )}
                                                >
                                                    <Pencil size={16} />
                                                </Button>

                                                <Button
                                                    size="sm"
                                                    variant="danger"
                                                    onClick={() =>
                                                        handleDelete(
                                                            categoria.id
                                                        )
                                                    }
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">
                                        <div className="flex flex-col items-center justify-center py-16">
                                            <FolderOpen
                                                size={56}
                                                className="text-gray-300 mb-4"
                                            />

                                            <h3 className="text-lg font-semibold text-gray-700">
                                                No hay categorías registradas
                                            </h3>

                                            <p className="text-sm text-gray-500 mt-2">
                                                Crea tu primera categoría para
                                                comenzar a clasificar mensajes.
                                            </p>

                                            <div className="mt-6">
                                                <Button
                                                    href={route(
                                                        'categorias.create'
                                                    )}
                                                >
                                                    + Nueva Categoría
                                                </Button>
                                            </div>
                                        </div>
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