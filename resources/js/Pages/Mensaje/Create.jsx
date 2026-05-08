// resources/js/Pages/Mensajes/Create.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import Button from '@/Components/Button';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        contenido: '',
        origen: '',
        id_mensajero: 1
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('mensajes-simples.store'));
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
                                <label className="block font-medium">Contenido *</label>
                                <input
                                    type="text"
                                    value={data.contenido}
                                    onChange={(e) => setData('contenido', e.target.value)}
                                    className="w-full rounded border p-2"
                                />
                                {errors.contenido && <div className="text-red-500 text-sm">{errors.resumen}</div>}
                            </div>

                            <div>
                                <label className="block font-medium">Origen *</label>
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
                                {errors.origen && <div className="text-red-500 text-sm">{errors.prioridad}</div>}
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