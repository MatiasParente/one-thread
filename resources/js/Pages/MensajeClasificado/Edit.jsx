// resources/js/Pages/Mensajes/Edit.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import Button from '@/Components/Button';

export default function Edit({ mensaje, categorias }) {
    const initialTipos = mensaje.tipos ? mensaje.tipos.map(t => t.id) : [];
    
    const { data, setData, put, processing, errors } = useForm({
        resumen: mensaje.resumen || '',
        prioridad: mensaje.prioridad || 'Media',
        estado: mensaje.estado || 0,
        tipos_ids: initialTipos
    });

    const handleTipoChange = (tipoId) => {
        const nextIds = [...data.tipos_ids];
        if (nextIds.includes(tipoId)) {
            setData('tipos_ids', nextIds.filter(id => id !== tipoId));
        } else {
            setData('tipos_ids', [...nextIds, tipoId]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('mensajes-clasificados.update', mensaje.id));
    };

    return (
        <AuthenticatedLayout
            title="Editar Clasificado"
            subtitle="Modificar mensaje clasificado"
        >
            <Head title="Editar mensaje" />
            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow sm:rounded-lg dark:bg-gray-800">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Resumen *</label>
                                <input
                                    type="text"
                                    value={data.resumen}
                                    onChange={(e) => setData('resumen', e.target.value)}
                                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                />
                                {errors.resumen && <div className="mt-1 text-sm text-red-500">{errors.resumen}</div>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Prioridad *</label>
                                <select
                                    value={data.prioridad}
                                    onChange={(e) => setData('prioridad', e.target.value)}
                                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                >
                                    <option value="Alta">Alta</option>
                                    <option value="Media">Media</option>
                                    <option value="Baja">Baja</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Estado *</label>
                                <select
                                    value={data.estado}
                                    onChange={(e) => setData('estado', parseInt(e.target.value))}
                                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                                >
                                    <option value="0">Pendiente</option>
                                    <option value="1">En proceso</option>
                                    <option value="2">Resuelto</option>
                                    <option value="3">Eliminado</option>
                                </select>
                                {errors.estado && <div className="mt-1 text-sm text-red-500">{errors.estado}</div>}
                            </div>

                            <div className="border-t border-gray-200 pt-4">
                                <label className="block text-sm font-bold text-gray-900 mb-3">Categorías y Tipos</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {categorias && categorias.map(categoria => (
                                        <div key={categoria.id} className="rounded-md border border-gray-200 p-3 bg-gray-50">
                                            <h4 className="font-semibold text-gray-800 mb-2 border-b border-gray-200 pb-1">{categoria.nombre}</h4>
                                            <div className="space-y-2">
                                                {categoria.tipos && categoria.tipos.length > 0 ? (
                                                    categoria.tipos.map(tipo => (
                                                        <label key={tipo.id} className="flex items-center space-x-2">
                                                            <input
                                                                type="checkbox"
                                                                checked={data.tipos_ids.includes(tipo.id)}
                                                                onChange={() => handleTipoChange(tipo.id)}
                                                                className="rounded border-gray-300 text-primary shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                                                            />
                                                            <span className="text-sm text-gray-700">{tipo.nombre}</span>
                                                        </label>
                                                    ))
                                                ) : (
                                                    <span className="text-xs text-gray-400 italic">No hay tipos disponibles</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {errors.tipos_ids && <div className="mt-1 text-sm text-red-500">{errors.tipos_ids}</div>}
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button type="submit" disabled={processing}>
                                    Actualizar
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}