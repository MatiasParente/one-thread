import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/Button';
import {
    Tag,
    FolderTree,
    Calendar,
    Pencil,
    ArrowLeft,
} from 'lucide-react';

export default function Show({ tipo }) {
    return (
        <AuthenticatedLayout
            title="Detalle del Tipo"
            subtitle="Información completa"
        >
            <div className="min-h-screen bg-gray-50 p-6">

                <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-md bg-primary-light flex items-center justify-center flex-shrink-0">
                                <Tag
                                    size={22}
                                    className="text-primary"
                                />
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Tipo seleccionado
                                </p>

                                <h2 className="text-2xl font-semibold text-gray-900 mt-1">
                                    {tipo.nombre}
                                </h2>

                                <div className="flex items-center gap-2 mt-3">
                                    <FolderTree
                                        size={16}
                                        className="text-gray-400"
                                    />

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
                                        {tipo.categoria?.nombre}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2">
                            <Button
                                href={route('tipos.index')}
                                variant="secondary"
                            >
                                <ArrowLeft size={16} />
                                Volver
                            </Button>
                            <Button
                                href={route('tipos.edit', tipo.id)}
                            >
                                <Pencil size={16} />
                                Editar
                            </Button>


                        </div>

                    </div>
                </div>
                {/* Información */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl">

                    {/* Datos */}
                    <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6">
                        <div className="border-b border-gray-200 pb-4 mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Información General
                            </h3>

                            <p className="text-sm text-gray-600 mt-1">
                                Datos principales del tipo.
                            </p>
                        </div>

                        <div className="space-y-5">
                            <div className="flex justify-between">
                                <span className="text-gray-500">
                                    ID
                                </span>

                                <span className="font-medium text-gray-900">
                                    #{tipo.id}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">
                                    Nombre
                                </span>

                                <span className="font-medium text-gray-900">
                                    {tipo.nombre}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">
                                    Categoría
                                </span>

                                <span className="font-medium text-gray-900">
                                    {tipo.categoria?.nombre}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Auditoría */}
                    <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6">
                        <div className="border-b border-gray-200 pb-4 mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Auditoría
                            </h3>

                            <p className="text-sm text-gray-600 mt-1">
                                Información de creación y modificación.
                            </p>
                        </div>

                        <div className="space-y-5">
                            <div className="flex items-start gap-3">
                                <Calendar
                                    size={18}
                                    className="text-gray-400 mt-0.5"
                                />

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Fecha de creación
                                    </p>

                                    <p className="font-medium text-gray-900">
                                        {new Date(
                                            tipo.created_at
                                        ).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <FolderTree
                                    size={18}
                                    className="text-gray-400 mt-0.5"
                                />

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Última actualización
                                    </p>

                                    <p className="font-medium text-gray-900">
                                        {new Date(
                                            tipo.updated_at
                                        ).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}