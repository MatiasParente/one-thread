import { Link, router } from '@inertiajs/react'; // 1. Importamos router para la navegación manual
import Button from '../Button';
import { Eye, Edit2, Trash2, AlertTriangle } from 'lucide-react';
import './css/mensajes.css';
import React, { useState } from 'react';
import EditMensajeModal from './EditMensajeModal';
import ViewMensajeOriginalModal from './ViewMensajeOriginalModal';

export default function MensajeTable({ mensajes = [], handleDelete }) {

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

    const getCategories = (msg) => {
        if (!msg.tipo_mensaje) return [];
        const seenIds = new Set();
        return msg.tipo_mensaje
            .map(tm => tm.tipos?.categoria)
            .filter(Boolean)
            .filter(cat => {
                if (seenIds.has(cat.id)) {
                    return false;
                }
                seenIds.add(cat.id);
                return true;
            });
    };

    const getPriorityBadgeClass = (priority) => {
        switch (priority) {
            case 'Alta': return 'badge-priority-alta';
            case 'Media': return 'badge-priority-media';
            case 'Baja': return 'badge-priority-baja';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getEstadoBadgeClass = (estado) => {
        switch (parseInt(estado)) {
            case 0: return 'badge-status-pendiente';
            case 1: return 'badge-status-proceso';
            case 2: return 'badge-status-pausa';
            case 3: return 'badge-status-resuelto';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getEstadoLabel = (estado) => {
        switch (parseInt(estado)) {
            case 0: return 'Pendiente';
            case 1: return 'En proceso';
            case 2: return 'Resuelto';
            case 3: return 'Eliminado';
            default: return 'Desconocido';
        }
    };

    const getChannelBadgeClass = (origen) => {
        switch (origen?.toLowerCase()) {
            case 'telegram': return 'badge-channel-telegram';
            case 'whatsapp': return 'badge-channel-whatsapp';
            case 'email': return 'badge-channel-email';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    // Para el modal de "Ver mensaje original"
    const [viewModalOpen, setViewModalOpen] = useState(false);
    const [selectedViewMessage, setSelectedViewMessage] = useState(null);

    const openViewModal = (mensaje) => {
        setSelectedViewMessage(mensaje);
        setViewModalOpen(true);
    };

    const closeViewModal = () => {
        setSelectedViewMessage(null);
        setViewModalOpen(false);
    };

    const handleRowClick = (e, id) => {
        if (e.target.closest('button') || e.target.closest('a')) {
            return;
        }

        router.visit(route('mensajes-clasificados.respuesta', id));
    };

    // Para el modal de "Editar"
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedEditMessage, setSelectedEditMessage] = useState(null);
    const openEditModal = (mensaje) => {
        setSelectedEditMessage(mensaje);
        setEditModalOpen(true);
    };

    const closeEditModal = () => {
        setSelectedEditMessage(null);
        setEditModalOpen(false);
    };


    return (
        <div className="overflow-hidden bg-white rounded-md border border-gray-200 shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-200 bg-gray-50 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            <th className="px-6 py-3">Cliente / Canal</th>
                            <th className="px-6 py-3">Resumen de IA</th>
                            <th className="px-6 py-3">Mensaje Original</th>
                            <th className="px-6 py-3">Categorías / Áreas</th>
                            <th className="px-6 py-3 text-center">Prioridad</th>
                            <th className="px-6 py-3 text-center">Estado</th>
                            <th className="px-6 py-3 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                        {mensajes?.length > 0 ? (
                            mensajesPagina.map((mensajeClasificado) => {
                                const cliente = mensajeClasificado.mensaje?.mensajeros;
                                const originalMessage = mensajeClasificado.mensaje;
                                const categories = getCategories(mensajeClasificado);

                                return (
                                    <tr
                                        key={mensajeClasificado.id}
                                        //evento onClick y la clase cursor-pointer
                                        onClick={(e) => handleRowClick(e, mensajeClasificado.id)}
                                        className="hover:bg-gray-50/75 transition-colors cursor-pointer"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-gray-900">
                                                {cliente ? `${cliente.nombre} ${cliente.apellido}` : 'Cliente Desconocido'}
                                            </div>
                                            {originalMessage?.origen && (
                                                <span className={`mt-1 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold uppercase ${getChannelBadgeClass(originalMessage.origen)}`}>
                                                    {originalMessage.origen}
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-6 py-4 max-w-xs md:max-w-md">
                                            <div className="font-medium text-gray-800 line-clamp-2">
                                                {mensajeClasificado.resumen || 'Sin resumen'}
                                            </div>
                                            <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-400">
                                                <span>Confianza:</span>
                                                <span className="font-mono font-semibold text-gray-500">
                                                    {mensajeClasificado.puntaje_confianza <= 1
                                                        ? Math.round(mensajeClasificado.puntaje_confianza * 100)
                                                        : Math.round(mensajeClasificado.puntaje_confianza)}%
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {originalMessage ? (
                                                <button
                                                    onClick={() => openViewModal(originalMessage)}
                                                    className="text-primary hover:text-primary-hover text-sm font-medium inline-flex items-center gap-1"
                                                >
                                                    Ver original
                                                </button>
                                            ) : (
                                                <span className="text-gray-400 text-xs italic">No disponible</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {categories.length > 0 ? (
                                                <div className="flex flex-wrap gap-1">
                                                    {categories.map((cat, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold badge-category-pill"
                                                        >
                                                            {cat.nombre}
                                                        </span>
                                                    ))}
                                                </div>
                                            ) : (
                                                <span className="text-gray-400 text-xs italic">Sin categoría</span>
                                            )}
                                        </td>

                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getPriorityBadgeClass(mensajeClasificado.prioridad)}`}>
                                                {mensajeClasificado.prioridad}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 text-center">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getEstadoBadgeClass(mensajeClasificado.estado)}`}>
                                                {getEstadoLabel(mensajeClasificado.estado)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <Link href={route('mensajes-clasificados.show', mensajeClasificado.id)}>
                                                    <button
                                                        title="Ver detalle"
                                                        className="p-1 text-gray-500 hover:text-[#226583] hover:bg-gray-100 rounded transition-colors"
                                                    >
                                                        <Eye className="h-4.5 w-4.5" />
                                                    </button>
                                                </Link>
                                                <button
                                                    title="Editar"
                                                    onClick={() => openEditModal(mensajeClasificado)}
                                                    className="p-1 text-gray-500 hover:text-[#B8860B] hover:bg-gray-100 rounded transition-colors"
                                                >
                                                    <Edit2 className="h-4.5 w-4.5" />
                                                </button>
                                                <button
                                                    title="Eliminar"
                                                    onClick={() => handleDelete(mensajeClasificado.id, mensajeClasificado.resumen)}
                                                    className="p-1 text-gray-500 hover:text-[#C41E3A] hover:bg-gray-100 rounded transition-colors"
                                                >
                                                    <Trash2 className="h-4.5 w-4.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center py-12 px-6">
                                    <div className="flex flex-col items-center justify-center text-gray-400">
                                        <AlertTriangle className="h-8 w-8 text-gray-300 mb-2" />
                                        <p className="font-semibold text-gray-500">No se encontraron mensajes clasificados</p>
                                        <p className="text-xs text-gray-400 mt-1">Prueba a cambiar los filtros de búsqueda o registra uno nuevo.</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal para ver mensaje original */}
            <ViewMensajeOriginalModal
                mensaje={selectedViewMessage}
                isOpen={viewModalOpen}
                onClose={closeViewModal}
            />

            {/* Modal para editar mensaje clasificado */}
            <EditMensajeModal
                mensaje={selectedEditMessage}
                isOpen={editModalOpen}
                onClose={closeEditModal}
                onUpdate={() => {
                    closeEditModal();
                    router.reload();
                }}
            />

            {mensajes.length > 0 && (
                <div className="pagination-container">
                    <div className="pagination-controls" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                            onClick={paginaAnterior}
                            disabled={paginaActual === 1}
                            className="pagination-btn"
                            aria-label="Página anterior"
                        >
                            &larr; Anterior
                        </Button>
                        <Button
                            onClick={paginaSiguiente}
                            disabled={paginaActual === totalPaginas}
                            className="pagination-btn"
                            aria-label="Página siguiente"
                        >
                            Siguiente &rarr;
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}