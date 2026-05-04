// resources/js/Pages/Mensajes/Edit.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import NormalButton from '@/Components/NormalButton';

export default function Edit({ mensaje }) {
    const { data, setData, put, processing, errors } = useForm({
        resumen: mensaje.resumen,
        prioridad: mensaje.prioridad,
        requiere_revision: mensaje.requiere_revision
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('mensajes.update', mensaje.id));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold">Editar mensaje</h2>}
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

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={data.requiere_revision}
                                    onChange={(e) => setData('requiere_revision', e.target.checked)}
                                />
                                <label>Requiere revisión</label>
                            </div>

                            <div className="flex justify-end">
                                <NormalButton type="submit" disabled={processing}>
                                    Actualizar
                                </NormalButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}