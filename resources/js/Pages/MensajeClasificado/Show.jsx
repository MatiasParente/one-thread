// resources/js/Pages/Mensajes/Show.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import NormalButton from '@/Components/NormalButton';

export default function Show({ mensaje }) {
     const handleDelete = (id, resumen) => {
        if (confirm(`¿Eliminar mensaje "${resumen}"?`)) {
            router.delete(route('mensajes-clasificados.destroy', id));
        }
    };
    return (
        <AuthenticatedLayout header={<h2>Detalle del mensaje</h2>}>
            <Head title={mensaje.resumen} />
            <div className="py-12">
                <div className="mx-auto max-w-3xl">
                    <div className="bg-white p-6 shadow rounded">
                        <h3 className="text-xl font-bold">{mensaje.resumen}</h3>
                        <p><strong>Prioridad:</strong> {mensaje.prioridad}</p>
                        <p><strong>Requiere revisión:</strong> {mensaje.requiere_revision ? 'Sí' : 'No'}</p>
                        <div className="mt-4">
                            <Link href={route('dashboard')}>
                                <NormalButton>Volver</NormalButton>
                            </Link>
                            <Link href={route('mensajes-clasificados.edit', mensaje.id)}>
                                <NormalButton>Editar</NormalButton>
                            </Link>
                            <NormalButton
                            size="sm"
                            variant="danger"
                            onClick={() => handleDelete(mensaje.id, mensaje.resumen)}>Eliminar</NormalButton>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}