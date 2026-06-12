import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/Button';

export default function Create({ categorias }) {
    const { data, setData, post, processing, errors } = useForm({
        nombre: '',
        id_categoria: '',
    });

    const dirty =
        data.nombre.trim() !== '' ||
        data.id_categoria !== '';

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('tipos.store'));
    };

    return (
        <AuthenticatedLayout
            title="Crear Tipo"
            subtitle="Nuevo tipo de mensaje"
        >
            <div className="min-h-screen bg-gray-50 p-6">

                <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6">
                    <div className="border-b border-gray-200 pb-4 mb-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Información del Tipo
                            </h2>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                            Define el nombre y la categoría asociada al nuevo tipo.
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
                                    placeholder="Ej: Reclamo Técnico"
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

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Categoría *
                                </label>

                                <select
                                    value={data.id_categoria}
                                    onChange={(e) =>
                                        setData(
                                            'id_categoria',
                                            e.target.value
                                        )
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
                                >
                                    <option value="">
                                        Seleccionar categoría
                                    </option>

                                    {categorias.map((cat) => (
                                        <option
                                            key={cat.id}
                                            value={cat.id}
                                        >
                                            {cat.nombre}
                                        </option>
                                    ))}
                                </select>

                                {errors.id_categoria && (
                                    <p className="text-danger text-sm mt-2">
                                        {errors.id_categoria}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <Button
                                    href={route('tipos.index')}
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
                                        : 'Guardar Tipo'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}