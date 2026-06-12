import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/Button';
import { ArrowLeft, FolderTree } from 'lucide-react';

export default function Edit({ categoria }) {
    const { data, setData, put, processing, errors } = useForm({
        nombre: categoria.nombre,
    });

    const dirty = data.nombre !== categoria.nombre;

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('categorias.update', categoria.id));
    };

    return (
        <AuthenticatedLayout
            title="Editar Categoría"
            subtitle="Modificar categoría"
        >

            <div className="bg-white border border-gray-200 rounded-md shadow-sm p-5 mb-6">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-md bg-primary-light flex items-center justify-center">
                            <FolderTree
                                size={22}
                                className="text-primary"
                            />
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Categoría seleccionada
                            </p>

                            <h2 className="text-xl font-semibold text-gray-900">
                                {categoria.nombre}
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                ID #{categoria.id}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6">
                <div className="border-b border-gray-200 pb-4 mb-6">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Información de la Categoría
                    </h2>

                    <p className="text-sm text-gray-600 mt-1">
                        Modifica los datos asociados a esta categoría.
                    </p>
                </div>

                {dirty && (
                    <div className="mb-6 rounded-md border border-warning/30 bg-yellow-50 px-4 py-3">
                        <p className="text-sm text-warning">
                            Hay cambios sin guardar.
                        </p>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nombre *
                            </label>

                            <input
                                type="text"
                                value={data.nombre}
                                onChange={(e) =>
                                    setData('nombre', e.target.value)
                                }
                                className="
                                        w-full
                                        h-10
                                        px-3
                                        border
                                        border-gray-200
                                        rounded-md
                                        text-gray-800
                                        focus:outline-none
                                        focus:ring-2
                                        focus:ring-primary-light
                                        focus:border-primary
                                    "
                                required
                            />

                            {errors.nombre && (
                                <p className="text-danger text-sm mt-2">
                                    {errors.nombre}
                                </p>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                            <Button
                                href={route('categorias.index')}
                                variant="secondary"
                            >
                                Cancelar
                            </Button>

                            <Button
                                type="submit"
                                disabled={processing}
                            >
                                {processing
                                    ? 'Guardando...'
                                    : 'Guardar cambios'}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}