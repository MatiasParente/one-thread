// resources/js/Pages/Mensajes/Edit.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import Button from '@/Components/Button';

export default function Edit({ mensaje }) {
    const { data, setData, put, processing, errors } = useForm({
        resumen: mensaje.resumen,
        prioridad: mensaje.prioridad,
        estado: mensaje.estado
    });

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
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label>Resumen *</label>
                                <input
                                    type="text"
                                    value={data.resumen}
                                    onChange={(e) => setData('resumen', e.target.value)}
                                    className="w-full rounded border p-2"
                                />
                                {errors.resumen && <div className="text-red-500">{errors.resumen}</div>}
                            </div>

                            <div>
                                <label>Prioridad *</label>
                                <select
                                    value={data.prioridad}
                                    onChange={(e) => setData('prioridad', e.target.value)}
                                    className="w-full rounded border p-2"
                                >
                                    <option value="Alta">Alta</option>
                                    <option value="Media">Media</option>
                                    <option value="Baja">Baja</option>
                                </select>
                            </div>

                            <div>
                                <label>Estado *</label>
                                <select
                                    value={data.estado}
                                    onChange={(e) => setData('estado', parseInt(e.target.value))}
                                    className="w-full rounded border p-2"
                                >
                                    <option value="0">Pendiente</option>
                                    <option value="1">En proceso</option>
                                    <option value="2">En pausa</option>
                                    <option value="3">Resuelto</option>
                                </select>
                                {errors.estado && <div className="text-red-500">{errors.estado}</div>}
                            </div>

                            <div className="flex justify-end">
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