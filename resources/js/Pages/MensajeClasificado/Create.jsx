// resources/js/Pages/Mensajes/Create.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import NormalButton from '@/Components/NormalButton';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        resumen: '',
        prioridad: 'media',
        requiere_revision: false,
        id_mensaje: 2
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('mensajes-clasificados.store'));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold">Crear mensaje</h2>}
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

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={data.requiere_revision}
                                    onChange={(e) => setData('requiere_revision', e.target.checked)}
                                />
                                <label>Requiere revisión</label>
                                {errors.requiere_revision && <div className="text-red-500 text-sm">{errors.requiere_revision}</div>}
                            </div>


                            <div className="flex justify-end">
                                <NormalButton type="submit" disabled={processing}>
                                    Guardar mensaje
                                </NormalButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}