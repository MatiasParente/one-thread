// resources/js/Pages/Mensaje/Mensaje.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Trash2, Filter, X, MessageSquare } from 'lucide-react';
import Button from '@/Components/Button';

export default function Index({ mensajes, categorias = [], filters = {} }) {
    const [contenido, setContenido] = useState(filters.contenido || '');
    const [origen, setOrigen] = useState(filters.origen || '');
    const [idCategoria, setIdCategoria] = useState(filters.id_categoria || '');

    const applyFilters = () => {
        const queryParams = {};
        if (contenido) queryParams.contenido = contenido;
        if (origen) queryParams.origen = origen;
        if (idCategoria) queryParams.id_categoria = idCategoria;

        router.get(route('mensajes-simples.index'), queryParams, {
            preserveState: true,
            replace: true,
        });
    };

    const handleClearFilters = () => {
        setContenido('');
        setOrigen('');
        setIdCategoria('');
        router.get(route('mensajes-simples.index'), {}, {
            preserveState: true,
            replace: true,
        });
    };

    const handleDelete = (id, contenidoMsg) => {
        if (confirm(`¿Eliminar mensaje "${contenidoMsg}"?`)) {
            router.delete(route('mensajes-simples.destroy', id), {
                onSuccess: () => router.reload()
            });
        }
    };

    const [paginaActual, setPaginaActual] = useState(1);
    const [irAPagina, setIrAPagina] = useState('');
    const itemsPorPagina = 10;

    const indiceUltimoItem = paginaActual * itemsPorPagina;
    const indicePrimerItem = indiceUltimoItem - itemsPorPagina;
    const mensajesPagina = mensajes.slice(indicePrimerItem, indiceUltimoItem);
    const totalPaginas = Math.ceil(mensajes.length / itemsPorPagina);

    const paginaAnterior = () => { if (paginaActual > 1) setPaginaActual(paginaActual - 1); };
    const paginaSiguiente = () => { if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1); };
    const irAPaginaEspecifica = (pagina) => { if (pagina >= 1 && pagina <= totalPaginas) setPaginaActual(pagina); };

    const getPageNumbers = () => {
        if (totalPaginas <= 5) return Array.from({ length: totalPaginas }, (_, i) => i + 1);
        const pages = [1];
        const left = Math.max(2, paginaActual - 1);
        const right = Math.min(totalPaginas - 1, paginaActual + 1);
        if (left > 2) pages.push('...');
        for (let i = left; i <= right; i++) pages.push(i);
        if (right < totalPaginas - 1) pages.push('...');
        if (totalPaginas > 1) pages.push(totalPaginas);
        return pages;
    };

    const getChannelBadgeClass = (channel) => {
        switch (channel?.toLowerCase()) {
            case 'telegram': return 'bg-[#e8f1f6] text-[#226583] border-[#d0e3ed]';
            case 'whatsapp': return 'bg-[#D1FAE5] text-[#075E54] border-[#A7F3D0]';
            case 'instagram': return 'bg-[#FCE7F3] text-[#BE185D] border-[#FBCFE8]';
            case 'gmail': return 'bg-[#FEF2F2] text-[#B91C1C] border-[#FECACA]';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white p-4 rounded-md border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 text-[#226583]">
                    <MessageSquare className="h-5 w-5" />
                    <span className="font-semibold text-gray-800">Total mensajes: {mensajes?.length || 0}</span>
                </div>
            </div>

            {/* Filtros */}
            <div className="bg-white p-4 rounded-md border-t-4 border-t-[#226583] border-x border-b border-gray-200 shadow-sm">
                <div className="mb-3 flex items-center gap-2 font-semibold text-gray-800">
                    <Filter className="h-4 w-4 text-[#226583]" />
                    <span>Filtros de búsqueda</span>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 items-end">
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-600">Contenido</label>
                        <input
                            type="text"
                            value={contenido}
                            onChange={(e) => setContenido(e.target.value)}
                            placeholder="Buscar en el mensaje..."
                            onKeyDown={(e) => { if (e.key === 'Enter') applyFilters(); }}
                            className="w-full rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-800 shadow-sm focus:border-[#226583] focus:ring-1 focus:ring-[#226583]"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-600">Categoría</label>
                        <select
                            value={idCategoria}
                            onChange={(e) => setIdCategoria(e.target.value)}
                            className="w-full rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-800 shadow-sm focus:border-[#226583] focus:ring-1 focus:ring-[#226583]"
                        >
                            <option value="">Todas las categorías</option>
                            {categorias.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-medium text-gray-600">Canal</label>
                        <select
                            value={origen}
                            onChange={(e) => setOrigen(e.target.value)}
                            className="w-full rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-800 shadow-sm focus:border-[#226583] focus:ring-1 focus:ring-[#226583]"
                        >
                            <option value="">Todos los canales</option>
                            <option value="Whatsapp">Whatsapp</option>
                            <option value="Instagram">Instagram</option>
                            <option value="Telegram">Telegram</option>
                            <option value="Gmail">Gmail</option>
                        </select>
                    </div>

                    <div className="flex gap-2">
                        <Button onClick={applyFilters} size="md" className="flex-1">
                            Filtrar
                        </Button>
                        {(contenido || origen || idCategoria) && (
                            <Button
                                variant="secondary"
                                onClick={handleClearFilters}
                                size="md"
                                className="flex items-center gap-1 border border-gray-300"
                            >
                                <X className="h-4 w-4" /> Limpiar
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Tabla */}
            <div className="bg-white rounded-md border-t-4 border-t-green-600 border-x border-b border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200 text-sm font-semibold text-white tracking-wider" style={{ backgroundColor: '#226583' }}>
                                <th className="px-6 py-3">Contenido</th>
                                <th className="px-6 py-3 text-center">Canal</th>
                                <th className="px-6 py-3 text-center">Fecha</th>
                                <th className="px-6 py-3 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                            {mensajes?.length > 0 ? (
                                mensajesPagina.map((mensaje) => {
                                    return (
                                        <tr key={mensaje.id} className="hover:bg-gray-50/75 transition-colors">
                                            <td className="px-6 py-4 max-w-md">
                                                <div className="text-gray-800 font-medium line-clamp-3">
                                                    {mensaje.contenido}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border ${getChannelBadgeClass(mensaje.origen)}`}>
                                                    {mensaje.origen}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center text-gray-500 whitespace-nowrap">
                                                {new Date(mensaje.fecha_envio).toLocaleString(undefined, {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => handleDelete(mensaje.id, mensaje.contenido)}
                                                    className="p-1 text-gray-500 hover:text-[#C41E3A] hover:bg-gray-100 rounded transition-colors"
                                                    title="Eliminar"
                                                >
                                                    <Trash2 className="h-4.5 w-4.5" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-8 text-gray-500">
                                        No hay mensajes disponibles que coincidan con los filtros.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {mensajes.length > 0 && (
                    <div className="border-t border-gray-100 px-4 py-3 bg-gray-50/50">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                            <span className="text-sm text-gray-600">
                                Página <span className="font-semibold text-gray-900">{paginaActual}</span> de{' '}
                                <span className="font-semibold text-gray-900">{totalPaginas}</span>
                            </span>

                            <div className="flex items-center gap-1">
                                <button
                                    onClick={paginaAnterior}
                                    disabled={paginaActual === 1}
                                    className="p-1.5 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-200 disabled:text-gray-300 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
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
                                            className={`min-w-[2rem] px-2 py-1 text-sm rounded-md transition-colors ${page === paginaActual
                                                    ? 'bg-primary text-white font-semibold shadow-sm'
                                                    : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    )
                                )}

                                <button
                                    onClick={paginaSiguiente}
                                    disabled={paginaActual === totalPaginas}
                                    className="p-1.5 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-200 disabled:text-gray-300 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"
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
                                    className="w-16 px-2 py-1 text-sm border border-gray-300 rounded-md text-center shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                                    placeholder="Nº"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}