import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/Button';

export default function Edit({ categoria }) {
    const { data, setData, put, processing, errors } = useForm({
        nombre: categoria.nombre
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('categorias.update', categoria.id));
    };

    return (
        <AuthenticatedLayout title="Editar Categoría" subtitle="Modificar categoría">
            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-[30px] font-bold text-gray-900 tracking-tight">
                        Editar Categoría
                    </h1>
                    <Button href={route('categorias.index')} variant="secondary">
                        Volver
                    </Button>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 max-w-lg">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
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

                        <div className="flex gap-3">
                            <Button type="submit" disabled={processing}>
                                Actualizar
                            </Button>
                            <Button href={route('categorias.index')} variant="secondary">
                                Cancelar
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}