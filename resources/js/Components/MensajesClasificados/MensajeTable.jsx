import { Link, router } from '@inertiajs/react'; // 1. Importamos router para la navegación manual
import { Eye, Edit2, Trash2, AlertTriangle, ChevronLeft, ChevronRight } from 'lucide-react';
import './css/mensajes.css';
import React, { useState } from 'react';
import EditMensajeModal from './EditMensajeModal';
import ViewMensajeOriginalModal from './ViewMensajeOriginalModal';

export default function MensajeTable({ mensajes = [], handleDelete, categorias = [], is_general }) {

    const [paginaActual, setPaginaActual] = useState(1);
    const [irAPagina, setIrAPagina] = useState('');
    const itemsPorPagina = 10;

    const indiceUltimoItem = paginaActual * itemsPorPagina;
    const indicePrimerItem = indiceUltimoItem - itemsPorPagina;
    const mensajesUnicos = React.useMemo(() => {
        let unique = [];
        let lastByClient = {};

        // Ordenamos del más antiguo al más nuevo para detectar duplicados secuenciales,
        // aunque el original viene ordenado por latest() desc.
        // Lo invertimos para procesar, y luego lo volvemos a invertir para mantener el latest.
        const sorted = [...mensajes].reverse();

        sorted.forEach(mc => {
            const clienteId = mc.mensaje?.mensajeros?.id;
            const content = mc.mensaje?.contenido;
            const fechaActual = mc.mensaje?.fecha_envio ? new Date(mc.mensaje.fecha_envio).getTime() : 0;

            if (clienteId && content) {
                const last = lastByClient[clienteId];
                const esDuplicado = last 
                    && last.content === content 
                    && (fechaActual - last.fecha) <= 3000;

                if (!esDuplicado) {
                    unique.push(mc);
                    lastByClient[clienteId] = { content, fecha: fechaActual };
                }
            } else {
                unique.push(mc);
            }
        });

        return unique.reverse();
    }, [mensajes]);

    const totalPaginas = Math.ceil(mensajesUnicos.length / itemsPorPagina);

    const mensajesPagina = mensajesUnicos.slice(indicePrimerItem, indiceUltimoItem);

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

    const irAPaginaEspecifica = (pagina) => {
        if (pagina >= 1 && pagina <= totalPaginas) {
            setPaginaActual(pagina);
        }
    }

    const getPageNumbers = () => {
        if (totalPaginas <= 5) {
            return Array.from({ length: totalPaginas }, (_, i) => i + 1);
        }

        const pages = [1];
        const left = Math.max(2, paginaActual - 1);
        const right = Math.min(totalPaginas - 1, paginaActual + 1);

        if (left > 2) pages.push('...');
        for (let i = left; i <= right; i++) pages.push(i);
        if (right < totalPaginas - 1) pages.push('...');

        if (totalPaginas > 1) pages.push(totalPaginas);
        return pages;
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
            case 2: return 'badge-status-resuelto';
            case 3: return 'badge-status-eliminado bg-red-100 text-red-800'; 
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
        <div className="overflow-hidden bg-white rounded-md border-t-4 border-t-green-600 border-x border-b border-gray-200 shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                            <tr className="border-b border-gray-200 text-sm font-semibold text-white tracking-wider" style={{ backgroundColor: '#226583' }}>
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
                                                    {mensajeClasificado.puntaje_confianza * 100}%
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
                }}
                categorias={categorias}
                is_general={is_general}
            />

            {mensajesUnicos.length > 0 && (
                <div className="border-t border-gray-200 px-4 py-3">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                        <span className="text-sm text-gray-600">
                            Página <span className="font-semibold text-gray-900">{paginaActual}</span> de{' '}
                            <span className="font-semibold text-gray-900">{totalPaginas}</span>
                        </span>

                        <div className="flex items-center gap-1">
                            <button
                                onClick={paginaAnterior}
                                disabled={paginaActual === 1}
                                className="p-1.5 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 disabled:text-gray-300 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
                                aria-label="Página anterior"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>

                            {getPageNumbers().map((page, idx) =>
                                page === '...' ? (
                                    <span key={`ellipsis-${idx}`} className="px-2 py-1 text-sm text-gray-400 select-none">
                                        ...
                                    </span>
                                ) : (
                                    <button
                                        key={page}
                                        onClick={() => irAPaginaEspecifica(page)}
                                        className={`min-w-[2rem] px-2 py-1 text-sm rounded-md transition-colors ${
                                            page === paginaActual
                                                ? 'bg-primary text-white font-semibold'
                                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                )
                            )}

                            <button
                                onClick={paginaSiguiente}
                                disabled={paginaActual === totalPaginas}
                                className="p-1.5 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 disabled:text-gray-300 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
                                aria-label="Página siguiente"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">Ir a:</span>
                            <input
                                type="number"
                                min={1}
                                max={totalPaginas}
                                value={irAPagina}
                                onChange={(e) => setIrAPagina(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        const page = parseInt(irAPagina);
                                        if (page >= 1 && page <= totalPaginas) {
                                            setPaginaActual(page);
                                        }
                                        setIrAPagina('');
                                    }
                                }}
                                className="w-16 px-2 py-1 text-sm border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                                placeholder="Nº"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}