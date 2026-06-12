import { router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/Button';
import {
    FolderTree,
    Tags,
    Layers3,
    Search,
    Eye,
    Pencil,
    Trash2,
    FolderOpen,
    ArrowLeft,
} from 'lucide-react';

export default function Index({ tipos }) {
    const categoriasUnicas = [
        ...new Set(
            tipos
                .map((tipo) => tipo.categoria?.nombre)
                .filter(Boolean)
        ),
    ];

    const handleDelete = (id) => {
        if (confirm('¿Eliminar este tipo?')) {
            router.delete(route('tipos.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            title="Tipos"
            subtitle="Administración de tipos de mensajes"
        >
            <div className="min-h-screen bg-gray-50 p-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-[30px] font-bold text-gray-900">
                            Tipos
                        </h1>

                        <p className="mt-1 text-gray-600">
                            Gestiona los tipos utilizados para clasificar
                            mensajes dentro de cada categoría.
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

                        <Button href={route('tipos.create')}>
                            + Nuevo Tipo
                        </Button>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">
                                    Tipos
                                </p>

                                <p className="text-3xl font-bold text-gray-900 mt-1">
                                    {tipos.length}
                                </p>
                            </div>

                            <Tags
                                size={24}
                                className="text-primary"
                            />
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">
                                    Categorías Relacionadas
                                </p>

                                <p className="text-3xl font-bold text-gray-900 mt-1">
                                    {categoriasUnicas.length}
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
                                    Promedio por Categoría
                                </p>

                                <p className="text-3xl font-bold text-gray-900 mt-1">
                                    {categoriasUnicas.length > 0
                                        ? (
                                            tipos.length /
                                            categoriasUnicas.length
                                        ).toFixed(1)
                                        : 0}
                                </p>
                            </div>

                            <FolderTree
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
                                    ID
                                </th>

                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                    Nombre
                                </th>

                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                                    Categoría
                                </th>

                                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-700">
                                    Acciones
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {tipos.length > 0 ? (
                                tipos.map((tipo) => (
                                    <tr
                                        key={tipo.id}
                                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-4 py-4 text-gray-600">
                                            #{tipo.id}
                                        </td>

                                        <td className="px-4 py-4">
                                            <span className="font-medium text-gray-900">
                                                {tipo.nombre}
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
                                                {tipo.categoria?.nombre ??
                                                    'Sin categoría'}
                                            </span>
                                        </td>

                                        <td className="px-4 py-4">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    href={route(
                                                        'tipos.show',
                                                        tipo.id
                                                    )}
                                                >
                                                    <Eye size={16} />
                                                </Button>

                                                <Button
                                                    size="sm"
                                                    href={route(
                                                        'tipos.edit',
                                                        tipo.id
                                                    )}
                                                >
                                                    <Pencil size={16} />
                                                </Button>

                                                <Button
                                                    size="sm"
                                                    variant="danger"
                                                    onClick={() =>
                                                        handleDelete(tipo.id)
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
                                                No hay tipos registrados
                                            </h3>

                                            <p className="text-sm text-gray-500 mt-2">
                                                Crea tu primer tipo para comenzar
                                                a clasificar mensajes.
                                            </p>

                                            <div className="mt-6">
                                                <Button
                                                    href={route(
                                                        'tipos.create'
                                                    )}
                                                >
                                                    + Nuevo Tipo
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