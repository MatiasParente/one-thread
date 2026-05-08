// resources/js/Pages/Mensajes/Index.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import Button from '@/Components/Button';
import '../../../css/mensajes.css'

export default function Index({ mensajes }) {
    const { flash } = usePage().props;

    const handleDelete = (id, contenido) => {
        if (confirm(`¿Eliminar mensaje "${contenido}"?`)) {
            router.delete(route('mensajes-simples.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Gestión de Mensajes 
                </h2>
            }
        >
            <Head title="Mensajes" />


            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6">
                            <div className="mb-4 flex justify-end">
                                <Link href={route('mensajes-simples.create')}>
                                    <Button>+ Nuevo Mensaje</Button>
                                </Link>
                            </div>

                            <div id="containerTable">
                                <table className="min-w-full border">
                                    <thead>
                                        <tr>
                                            <th>Contenido</th>
                                            <th>Origen</th>
                                            <th>Fecha Envio</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mensajes?.length > 0 ? (
                                            mensajes.map((mensaje) => (
                                                <tr key={mensaje.id}>
                                                    <td>{mensaje.contenido}</td>
                                                    <td>{mensaje.origen}</td>
                                                    <td>{mensaje.fecha_envion}</td>
                                                    <td className="space-x-2">
                                                        <Link href={route('mensajes-simples.edit', mensaje.id)}>
                                                            <Button size="sm" variant="secondary">Editar</Button>
                                                        </Link>
                                                        <Button
                                                            size="sm"
                                                            variant="danger"
                                                            onClick={() => handleDelete(mensaje.id, mensaje.contenido)}
                                                        >
                                                            Eliminar
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="text-center py-4">
                                                    No hay mensajes disponibles.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
