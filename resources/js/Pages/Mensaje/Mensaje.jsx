// resources/js/Pages/Mensajes/Index.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import Button from '@/Components/Button';

export default function Index({ mensajes }) {
    const { flash } = usePage().props;

    const handleDelete = (id, contenido) => {
        if (confirm(`¿Eliminar mensaje "${contenido}"?`)) {
            router.delete(route('mensajes-simples.destroy', id));
        }
    };

    const [paginaActual, setPaginaActual] = useState(1);
    const itemsPorPagina = 10;

    const indiceUltimoItem = paginaActual * itemsPorPagina;
    const indicePrimerItem = indiceUltimoItem - itemsPorPagina;
    const mensajesPagina = mensajes.slice(indicePrimerItem, indiceUltimoItem);

    const totalPaginas = Math.ceil(mensajes.length / itemsPorPagina);

    const paginaAnterior = () => {
        if (paginaActual > 1) {
            setPaginaActual(paginaActual - 1);
        }
    }

    const paginaSiguiente = () => {
        if (paginaActual < totalPaginas) {
            setPaginaActual(paginaActual + 1);
        }
    }

    return (
        <AuthenticatedLayout
            title="Mensajes"
            subtitle="Gestión de mensajes recibidos"
        >
            <Head title="Mensajes" />
            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-[30px] font-bold text-gray-900 tracking-tight">
                        Mensajes
                    </h1>
                    <Link href={route('mensajes-simples.create')}>
                        <Button>+ Nuevo Mensaje</Button>
                    </Link>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr className="text-sm font-semibold text-gray-100" style={{ backgroundColor: "#226583" }}>
                                <th className="p-3 text-left">Contenido</th>
                                <th className="p-3 text-left">Origen</th>
                                <th className="p-3 text-left">Fecha Envio</th>
                                <th className="p-3 text-left">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mensajes?.length > 0 ? (
                                mensajesPagina.map((mensaje) => (
                                    <tr key={mensaje.id} className="border-t border-gray-100 hover:bg-gray-50">
                                        <td className="p-3 text-gray-600">{mensaje.contenido}</td>
                                        <td className="p-3 font-medium text-gray-800">{mensaje.origen}</td>
                                        <td className="p-3 font-medium text-gray-800">{mensaje.fecha_envio}</td>
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
                {mensajes.length > 0 && (
                                <div className="pagination-container">
                                    <div className="pagination-controls" style={{display: 'flex',
                                    justifyContent: 'space-between'
                                }}>
                                        {/* Botón Anterior */}
                                        <Button
                                            onClick={paginaAnterior}
                                            disabled={paginaActual === 1}
                                            className="pagination-btn"
                                            aria-label="Página anterior"
                                        >
                                            ← Anterior
                                        </Button>
                
                
                                        {/* Botón Siguiente */}
                                        <Button
                                            onClick={paginaSiguiente}
                                            disabled={paginaActual === totalPaginas}
                                            className="pagination-btn"
                                            aria-label="Página siguiente"
                                        >
                                            Siguiente →
                                        </Button>
                                    </div>
                                </div>
                            )}

            </div>
        </AuthenticatedLayout>
    );
}
