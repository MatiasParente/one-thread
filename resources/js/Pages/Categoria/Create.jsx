import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/Button';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
    });

    const dirty = data.nombre.trim() !== '';

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('categorias.store'));
    };

    return (
        <AuthenticatedLayout
            title="Crear Categoría"
            subtitle="Nueva categoría de mensajes"
        >
            <div className="min-h-screen bg-gray-50 p-6">


                <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6">
                    <div className="border-b border-gray-200 pb-4 mb-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Información de la Categoría
                            </h2>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                            Define el nombre de la nueva categoría que se utilizará para clasificar mensajes.
                        </p>
                    </div>

                    {dirty && (
                        <div className="mb-6 rounded-md border border-warning/30 bg-yellow-50 px-4 py-3">
                            <p className="text-sm text-warning">
                                Hay información pendiente de guardar.
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
                                    placeholder="Ej: Ventas, Soporte, Administración"
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
                                        : 'Guardar Categoría'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}