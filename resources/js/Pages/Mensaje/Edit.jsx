// resources/js/Pages/Mensajes/Edit.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import NormalButton from '@/Components/NormalButton';

export default function Edit({ mensaje }) {
    const { data, setData, put, processing, errors } = useForm({
        contenido: mensaje.contenido,
        origen: mensaje.origen
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('mensajes-simples.update', mensaje.id));
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
                                <label>Contenido *</label>
                                <input
                                    type="text"
                                    value={data.contenido}
                                    onChange={(e) => setData('contenido', e.target.value)}
                                    className="w-full rounded border p-2"
                                />
                                {errors.contenido && <div className="text-red-500">{errors.resumen}</div>}
                            </div>

                            <div>
                                <label>Prioridad *</label>
                                <select
                                    value={data.origen}
                                    onChange={(e) => setData('origen', e.target.value)}
                                    className="w-full rounded border p-2"
                                >
                                    <option value="Telegram">Telegram</option>
                                    <option value="Instagram">Instagram</option>
                                    <option value="Whatsapp">Whatsapp</option>
                                    <option value="Gmail">Gmail</option>
                                </select>
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