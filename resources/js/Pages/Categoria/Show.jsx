import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/Button';
import { ArrowLeft, Pencil, FolderTree, Calendar, Shapes } from 'lucide-react';

export default function Show({ categoria }) {
    return (
        <AuthenticatedLayout
            title="Detalle de Categoría"
            subtitle="Información completa de la categoría seleccionada."
        >
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-md bg-primary-light flex items-center justify-center flex-shrink-0">
                                <FolderTree
                                    size={24}
                                    className="text-primary"
                                />
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    Categoría seleccionada
                                </p>

                                <h2 className="text-2xl font-semibold text-gray-900 mt-1">
                                    {categoria.nombre}
                                </h2>

                                <p className="text-sm text-gray-500 mt-2">
                                    ID #{categoria.id}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2">

                            <Button
                                href={route('categorias.index')}
                                variant="secondary"
                            >
                                <ArrowLeft size={16} />
                                Volver
                            </Button>
                            <Button href={route('categorias.edit', categoria.id)}>
                                <Pencil size={16} />
                                Editar
                            </Button>

                        </div>

                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6">

                    <div className="border-b border-gray-200 pb-4 mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Información de la Categoría
                        </h2>

                        <p className="text-sm text-gray-600 mt-1">
                            Datos generales y elementos asociados.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        <div className="border border-gray-200 rounded-md p-5">
                            <div className="flex items-center gap-2 mb-3">
                                <FolderTree
                                    size={18}
                                    className="text-primary"
                                />
                                <h3 className="font-semibold text-gray-900">
                                    Datos Generales
                                </h3>
                            </div>

                            <dl className="space-y-4">
                                <div>
                                    <dt className="text-sm text-gray-500">
                                        ID
                                    </dt>
                                    <dd className="font-medium text-gray-900">
                                        {categoria.id}
                                    </dd>
                                </div>

                                <div>
                                    <dt className="text-sm text-gray-500">
                                        Nombre
                                    </dt>
                                    <dd className="font-medium text-gray-900">
                                        {categoria.nombre}
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        <div className="border border-gray-200 rounded-md p-5">
                            <div className="flex items-center gap-2 mb-3">
                                <Calendar
                                    size={18}
                                    className="text-primary"
                                />
                                <h3 className="font-semibold text-gray-900">
                                    Auditoría
                                </h3>
                            </div>

                            <dl className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-500">
                                        Fecha de creación
                                    </p>

                                    <p className="font-medium text-gray-900">
                                        {new Date(
                                            categoria.created_at
                                        ).toLocaleString()}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-500">
                                        Última actualización
                                    </p>

                                    <p className="font-medium text-gray-900">
                                        {new Date(
                                            categoria.updated_at
                                        ).toLocaleString()}
                                    </p>
                                </div>
                            </dl>
                        </div>

                    </div>

                    <div className="mt-6 border border-gray-200 rounded-md p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <Shapes
                                size={18}
                                className="text-primary"
                            />

                            <h3 className="font-semibold text-gray-900">
                                Tipos Asociados
                            </h3>

                            <span className="px-2 py-0.5 text-xs rounded-full bg-primary-light text-primary font-medium">
                                {categoria.tipos?.length ?? 0}
                            </span>
                        </div>

                        {categoria.tipos?.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                {categoria.tipos.map((tipo) => (
                                    <div
                                        key={tipo.id}
                                        className="
                                            border
                                            border-gray-200
                                            rounded-md
                                            px-4
                                            py-3
                                            bg-gray-50
                                        "
                                    >
                                        <p className="font-medium text-gray-900">
                                            {tipo.nombre}
                                        </p>

                                        <p className="text-xs text-gray-500 mt-1">
                                            ID #{tipo.id}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-8 text-center border border-dashed border-gray-200 rounded-md">
                                <p className="text-gray-500">
                                    No hay tipos asociados a esta categoría.
                                </p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}