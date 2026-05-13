import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/Button';

export default function Edit({ tipo, categorias }) {
    const { data, setData, put, processing, errors } = useForm({
        nombre: tipo.nombre,
        id_categoria: tipo.id_categoria
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('tipos.update', tipo.id));
    };

    return (
        <AuthenticatedLayout title="Editar Tipo" subtitle="Modificar tipo de mensaje">
            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-[30px] font-bold text-gray-900 tracking-tight">
                        Editar Tipo
                    </h1>
                    <Button href={route('tipos.index')} variant="secondary">
                        Volver
                    </Button>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 max-w-lg">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nombre *
                            </label>
                            <input
                                type="text"
                                value={data.nombre}
                                onChange={e => setData('nombre', e.target.value)}
                                className="w-full border border-gray-200 rounded-sm px-3 py-2 text-gray-800 focus:border-primary focus:ring-1 focus:ring-primary-light"
                                required
                            />
                            {errors.nombre && (
                                <p className="text-danger text-sm mt-1">{errors.nombre}</p>
                            )}
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Categoría *
                            </label>
                            <select
                                value={data.id_categoria}
                                onChange={e => setData('id_categoria', e.target.value)}
                                className="w-full border border-gray-200 rounded-sm px-3 py-2 text-gray-800 focus:border-primary focus:ring-1 focus:ring-primary-light"
                                required
                            >
                                <option value="">Seleccionar categoría</option>
                                {categorias.map(cat => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.nombre}
                                    </option>
                                ))}
                            </select>
                            {errors.id_categoria && (
                                <p className="text-danger text-sm mt-1">{errors.id_categoria}</p>
                            )}
                        </div>

                        <div className="flex gap-3">
                            <Button type="submit" disabled={processing}>
                                Actualizar
                            </Button>
                            <Button href={route('tipos.index')} variant="secondary">
                                Cancelar
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}