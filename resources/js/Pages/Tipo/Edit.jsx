import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/Button';
import { ArrowLeft, Tag } from 'lucide-react';

export default function Edit({ tipo, categorias }) {
    const { data, setData, put, processing, errors } = useForm({
        nombre: tipo.nombre,
        id_categoria: tipo.id_categoria,
    });

    const dirty =
        data.nombre !== tipo.nombre ||
        String(data.id_categoria) !== String(tipo.id_categoria);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('tipos.update', tipo.id));
    };

    return (
        <AuthenticatedLayout
            title="Editar Tipo"
            subtitle="Modificar tipo de mensaje"
        >
            <div className="min-h-screen bg-gray-50 p-6">

                <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-md bg-primary-light flex items-center justify-center flex-shrink-0">
                                <Tag
                                    size={24}
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

                                <p className="text-sm text-gray-500 mt-2">
                                    ID #{tipo.id}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-md shadow-sm p-6">
                    <div className="border-b border-gray-200 pb-4 mb-6">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Información del Tipo
                        </h2>

                        <p className="text-sm text-gray-600 mt-1">
                            Modifica los datos asociados a este tipo de mensaje.
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
                                        : 'Guardar cambios'}
                                </Button>
                            </div>

                        </div>
                    </form>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}