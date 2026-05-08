// resources/js/Pages/Mensajes/Create.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import Button from '@/Components/Button';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        resumen: '',
        prioridad: 'media',
        estado: 0,
        id_mensaje: 2
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('mensajes-clasificados.store'));
    };

    return (
        <AuthenticatedLayout
            title="Nuevo Clasificado"
            subtitle="Crear mensaje clasificado"
        >
            <Head title="Nuevo mensaje" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <div className="bg-white p-6 shadow sm:rounded-lg dark:bg-gray-800">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block font-medium">Resumen *</label>
                                <input
                                    type="text"
                                    value={data.resumen}
                                    onChange={(e) => setData('resumen', e.target.value)}
                                    className="w-full rounded border p-2"
                                />
                                {errors.resumen && <div className="text-red-500 text-sm">{errors.resumen}</div>}
                            </div>

                            <div>
                                <label className="block font-medium">Prioridad *</label>
                                <select
                                    value={data.prioridad}
                                    onChange={(e) => setData('prioridad', e.target.value)}
                                    className="w-full rounded border p-2"
                                >
                                    <option value="alta">Alta</option>
                                    <option value="media">Media</option>
                                    <option value="baja">Baja</option>
                                </select>
                                {errors.prioridad && <div className="text-red-500 text-sm">{errors.prioridad}</div>}
                            </div>

                            <div>
                                <label className="block font-medium">Estado *</label>
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
                                {errors.estado && <div className="text-red-500 text-sm">{errors.estado}</div>}
                            </div>


                            <div className="flex justify-end">
                                <Button type="submit" disabled={processing}>
                                    Guardar mensaje
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}