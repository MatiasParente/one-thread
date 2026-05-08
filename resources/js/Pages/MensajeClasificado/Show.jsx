// resources/js/Pages/Mensajes/Show.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import Button from '@/Components/Button';

export default function Show({ mensaje }) {
     const handleDelete = (id, resumen) => {
        if (confirm(`¿Eliminar mensaje "${resumen}"?`)) {
            router.delete(route('mensajes-clasificados.destroy', id));
        }
    };
    return (
        <AuthenticatedLayout
            title="Detalle"
            subtitle="Ver mensaje clasificado"
        >
            <Head title={mensaje.resumen} />
            <div className="py-12">
                <div className="mx-auto max-w-3xl">
                    <div className="bg-white p-6 shadow rounded">
                        <h3 className="text-xl font-bold">{mensaje.resumen}</h3>
                        <p><strong>Prioridad:</strong> {mensaje.prioridad}</p>
                        <p><strong>Estado:</strong> {mensaje.estado_label}</p>
                        <div className="mt-4">
                            <Link href={route('dashboard')}>
                                <Button>Volver</Button>
                            </Link>
                            <Link href={route('mensajes-clasificados.edit', mensaje.id)}>
                                <Button>Editar</Button>
                            </Link>
                            <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handleDelete(mensaje.id, mensaje.resumen)}>Eliminar</Button>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}