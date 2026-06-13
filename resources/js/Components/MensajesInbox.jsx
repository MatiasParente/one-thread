import { useState, useMemo } from 'react';
import {
    ChevronLeft, ChevronRight, Trash2, MessageSquare, Send, Mail, Phone, Search, ChevronDown, ChevronUp,
} from 'lucide-react';

const canalConfig = {
    telegram: { bg: 'bg-[#e8f1f6] text-[#226583] border border-[#d0e3ed]', icon: Send },
    whatsapp: { bg: 'bg-[#D1FAE5] text-[#075E54] border border-[#A7F3D0]', icon: MessageSquare },
    email: { bg: 'bg-gray-100 text-gray-600 border border-gray-200', icon: Mail },
    gmail: { bg: 'bg-gray-100 text-gray-600 border border-gray-200', icon: Mail },
};

function getCanalConfig(origen) {
    return canalConfig[origen?.toLowerCase()] ?? { bg: 'bg-gray-100 text-gray-600 border border-gray-200', icon: Phone };
}

function getInitials(nombre, apellido) {
    return ((nombre?.[0] ?? '') + (apellido?.[0] ?? '')).toUpperCase() || '?';
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        return date.toLocaleTimeString('es-UY', { hour: '2-digit', minute: '2-digit' });
    }
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) {
        return date.toLocaleDateString('es-UY', { weekday: 'short' });
    }
    return date.toLocaleDateString('es-UY', { day: 'numeric', month: 'short' });
}

function formatDateTime(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-UY', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
    });
}

export default function MensajesInbox({
    mensajes = [],
    onSelectMessage,
    onDeleteMessage,
    emptyMessage = 'No hay mensajes disponibles.',
}) {
    const [paginaActual, setPaginaActual] = useState(1);
    const [irAPagina, setIrAPagina] = useState('');
    const [busqueda, setBusqueda] = useState('');
    const [filtroCanal, setFiltroCanal] = useState('');
    const [orden, setOrden] = useState('reciente');
    const [expandedId, setExpandedId] = useState(null);
    const itemsPorPagina = 8;

    const contactos = useMemo(() => {
        const grupos = {};

        mensajes.forEach((msg) => {
            const id = msg.id_mensajero || 'sin-contacto';
            if (!grupos[id]) {
                grupos[id] = {
                    id_mensajero: id,
                    mensajeros: msg.mensajeros,
                    mensajes: [],
                };
            }
            grupos[id].mensajes.push(msg);
        });

        let lista = Object.values(grupos);

        lista.forEach((g) => {
            g.mensajes.sort((a, b) => new Date(b.fecha_envio) - new Date(a.fecha_envio));
            g.ultimoMensaje = g.mensajes[0];
            g.totalMensajes = g.mensajes.length;
            g.previewMensajes = g.mensajes.slice(0, 4);
        });

        if (busqueda) {
            const q = busqueda.toLowerCase();
            lista = lista.filter((g) => {
                const c = g.mensajeros;
                if (!c) return false;
                return `${c.nombre} ${c.apellido ?? ''}`.toLowerCase().includes(q);
            });
        }

        if (filtroCanal) {
            lista = lista.filter((g) =>
                g.mensajes.some((m) => m.origen?.toLowerCase() === filtroCanal.toLowerCase())
            );
        }

        if (orden === 'reciente') {
            lista.sort((a, b) => new Date(b.ultimoMensaje.fecha_envio) - new Date(a.ultimoMensaje.fecha_envio));
        } else {
            lista.sort((a, b) => new Date(a.ultimoMensaje.fecha_envio) - new Date(b.ultimoMensaje.fecha_envio));
        }

        return lista;
    }, [mensajes, busqueda, filtroCanal, orden]);

    const totalPaginas = Math.ceil(contactos.length / itemsPorPagina);
    const indiceUltimo = paginaActual * itemsPorPagina;
    const indicePrimero = indiceUltimo - itemsPorPagina;
    const contactosPagina = contactos.slice(indicePrimero, indiceUltimo);

    const paginaAnterior = () => {
        if (paginaActual > 1) setPaginaActual(paginaActual - 1);
    };

    const paginaSiguiente = () => {
        if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
    };

    const irAPaginaEspecifica = (pagina) => {
        if (pagina >= 1 && pagina <= totalPaginas) setPaginaActual(pagina);
    };

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
    };

    const handleFilterChange = (setter) => (e) => {
        setter(e.target.value);
        setPaginaActual(1);
        setExpandedId(null);
    };

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const mostrarLimpiar = busqueda || filtroCanal || orden !== 'reciente';

    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            {/* Filter bar */}
            <div className="border-b border-gray-200 bg-gray-50/50 px-4 py-3 space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={busqueda}
                            onChange={handleFilterChange(setBusqueda)}
                            placeholder="Buscar por nombre del contacto..."
                            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#226583]/30 focus:border-[#226583]"
                        />
                    </div>
                    <select
                        value={filtroCanal}
                        onChange={handleFilterChange(setFiltroCanal)}
                        className="px-3 py-2 text-sm border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#226583]/30 focus:border-[#226583] min-w-[140px]"
                    >
                        <option value="">Todos los canales</option>
                        <option value="telegram">Telegram</option>
                        <option value="whatsapp">WhatsApp</option>
                        <option value="email">Email</option>
                        <option value="gmail">Gmail</option>
                    </select>
                    <select
                        value={orden}
                        onChange={handleFilterChange(setOrden)}
                        className="px-3 py-2 text-sm border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#226583]/30 focus:border-[#226583] min-w-[140px]"
                    >
                        <option value="reciente">Más reciente</option>
                        <option value="antiguo">Más antiguo</option>
                    </select>
                    {mostrarLimpiar && (
                        <button
                            onClick={() => {
                                setBusqueda('');
                                setFiltroCanal('');
                                setOrden('reciente');
                                setPaginaActual(1);
                                setExpandedId(null);
                            }}
                            className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors border border-gray-200 bg-white"
                        >
                            Limpiar
                        </button>
                    )}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>{contactos.length} contacto{contactos.length !== 1 ? 's' : ''}</span>
                    {filtroCanal && <span className="text-gray-300">·</span>}
                    {filtroCanal && <span className="capitalize">Canal: {filtroCanal}</span>}
                </div>
            </div>

            {contactos.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                    <MessageSquare size={48} className="text-gray-300 mb-3" />
                    <p className="text-sm font-medium">{emptyMessage}</p>
                </div>
            ) : (
                <>
                    <div className="divide-y divide-gray-100">
                        {contactosPagina.map((grupo) => {
                            const contacto = grupo.mensajeros;
                            const nombre = contacto ? `${contacto.nombre} ${contacto.apellido ?? ''}`.trim() : 'Desconocido';
                            const initials = contacto ? getInitials(contacto.nombre, contacto.apellido) : '?';
                            const canal = getCanalConfig(grupo.ultimoMensaje.origen);
                            const CanalIcon = canal.icon;
                            const isExpanded = expandedId === grupo.id_mensajero;

                            return (
                                <div key={grupo.id_mensajero}>
                                    {/* Contact header — click to expand/collapse */}
                                    <div
                                        onClick={() => toggleExpand(grupo.id_mensajero)}
                                        className={`
                                            flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors
                                            ${isExpanded
                                                ? grupo.ultimoMensaje.origen?.toLowerCase() === 'telegram' ? 'bg-[#e8f1f6]'
                                                  : grupo.ultimoMensaje.origen?.toLowerCase() === 'whatsapp' ? 'bg-[#D1FAE5]'
                                                  : 'bg-gray-100'
                                                : 'hover:bg-gray-50'
                                            }
                                        `}
                                    >
                                        <div className="relative shrink-0 mt-0.5">
                                            <div className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold ${
                                                isExpanded
                                                    ? grupo.ultimoMensaje.origen?.toLowerCase() === 'telegram' ? 'bg-[#226583] text-white'
                                                      : grupo.ultimoMensaje.origen?.toLowerCase() === 'whatsapp' ? 'bg-[#075E54] text-white'
                                                      : 'bg-gray-500 text-white'
                                                    : 'bg-[#e8f1f6] text-[#226583]'
                                            }`}>
                                                {initials}
                                            </div>
                                            <div className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-sm">
                                                <CanalIcon size={10} className={
                                                    grupo.ultimoMensaje.origen?.toLowerCase() === 'telegram' ? 'text-[#226583]'
                                                    : grupo.ultimoMensaje.origen?.toLowerCase() === 'whatsapp' ? 'text-[#075E54]'
                                                    : 'text-gray-500'
                                                } />
                                            </div>
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-baseline justify-between gap-2">
                                                <div className="flex items-center gap-2 min-w-0">
                                                    <h3 className={`text-sm font-semibold truncate ${isExpanded ? 'text-gray-900' : 'text-gray-900'}`}>
                                                        {nombre}
                                                    </h3>
                                                    {isExpanded && (
                                                        <span className={`shrink-0 inline-flex items-center rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                                                            grupo.ultimoMensaje.origen?.toLowerCase() === 'telegram' ? 'bg-[#226583] text-white'
                                                            : grupo.ultimoMensaje.origen?.toLowerCase() === 'whatsapp' ? 'bg-[#075E54] text-white'
                                                            : 'bg-gray-600 text-white'
                                                        }`}>
                                                            {grupo.totalMensajes}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2 shrink-0">
                                                    <span className="text-xs text-gray-400">
                                                        {formatDate(grupo.ultimoMensaje.fecha_envio)}
                                                    </span>
                                                    {isExpanded ? (
                                                        <ChevronUp size={14} className="text-[#226583]" />
                                                    ) : (
                                                        <ChevronDown size={14} className="text-gray-400" />
                                                    )}
                                                </div>
                                            </div>

                                            {!isExpanded && (
                                                <>
                                                    <div className="mt-2 space-y-1.5">
                                                        {grupo.previewMensajes.map((msg) => {
                                                            const CanalMsgIcon = getCanalConfig(msg.origen).icon;
                                                            return (
                                                                <div key={msg.id} className="flex items-start gap-2 text-sm text-gray-500">
                                                                    <CanalMsgIcon size={12} className="shrink-0 mt-0.5 text-gray-400" />
                                                                    <span className="line-clamp-1 flex-1">{msg.contenido}</span>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>

                                                    <div className="mt-2 flex items-center gap-2">
                                                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${canal.bg}`}>
                                                            <CanalIcon size={10} className="mr-1" />
                                                            {grupo.ultimoMensaje.origen}
                                                        </span>
                                                        {grupo.totalMensajes > 1 && (
                                                            <span className="text-[10px] text-gray-400 font-medium">
                                                                {grupo.totalMensajes} mensajes
                                                            </span>
                                                        )}
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* Expanded messages */}
                                    <div
                                        className={`
                                            overflow-hidden transition-all duration-300 ease-in-out
                                            ${isExpanded ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'}
                                        `}
                                    >
                                        <div className="pl-14 pr-4 pb-4 pt-2 bg-white space-y-2">
                                            {grupo.mensajes.map((msg, idx) => {
                                                const canalMsg = getCanalConfig(msg.origen);
                                                const CanalMsgIcon = canalMsg.icon;
                                                const tieneClasificado = !!msg.clasificado_id;
                                                const hoverTint =
                                                    msg.origen?.toLowerCase() === 'telegram' ? 'hover:bg-[#e8f1f6]/60'
                                                    : msg.origen?.toLowerCase() === 'whatsapp' ? 'hover:bg-[#D1FAE5]/60'
                                                    : 'hover:bg-gray-50';

                                                return (
                                                    <div
                                                        key={msg.id}
                                                        onClick={() => {
                                                            if (tieneClasificado) onSelectMessage?.(msg);
                                                        }}
                                                        className={`
                                                            flex items-start gap-3 p-3 rounded-lg transition-all duration-200 ease-out
                                                            ${idx !== grupo.mensajes.length - 1 ? 'border-b border-gray-100' : ''}
                                                            ${tieneClasificado ? `cursor-pointer ${hoverTint}` : ''}
                                                            ${isExpanded ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
                                                        `}
                                                        style={{ transitionDelay: isExpanded ? `${idx * 50}ms` : '0ms' }}
                                                    >
                                                        <div className="shrink-0 mt-0.5">
                                                            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${canalMsg.bg.split(' ').slice(0, 2).join(' ')}`}>
                                                                <CanalMsgIcon size={13} />
                                                            </div>
                                                        </div>
                                                        <div className="min-w-0 flex-1">
                                                            <div className="flex items-center justify-between gap-2">
                                                                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${canalMsg.bg}`}>
                                                                    <CanalMsgIcon size={9} className="mr-1" />
                                                                    {msg.origen}
                                                                </span>
                                                                <span className="text-[11px] text-gray-400">
                                                                    {formatDateTime(msg.fecha_envio)}
                                                                </span>
                                                            </div>
                                                            <p className="mt-1.5 text-sm text-gray-800 leading-relaxed">
                                                                {msg.contenido}
                                                            </p>
                                                            <div className="mt-2 flex items-center gap-3">
                                                                {tieneClasificado && (
                                                                    <span className="inline-flex items-center gap-1 text-[11px] text-[#226583] font-medium hover:text-[#1a506a] transition-colors">
                                                                        <MessageSquare size={11} />
                                                                        Ir al chat clasificado
                                                                    </span>
                                                                )}
                                                                {onDeleteMessage && (
                                                                    <button
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            onDeleteMessage(msg.id, msg.contenido);
                                                                        }}
                                                                        className="inline-flex items-center gap-1 text-[11px] text-gray-400 hover:text-[#C41E3A] transition-colors"
                                                                        title="Eliminar"
                                                                    >
                                                                        <Trash2 size={11} />
                                                                        Eliminar
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {contactos.length > 0 && (
                        <div className="border-t border-gray-200 px-4 py-3">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                                <span className="text-sm text-gray-600">
                                    Página <span className="font-semibold text-gray-900">{paginaActual}</span> de{' '}
                                    <span className="font-semibold text-gray-900">{totalPaginas}</span>
                                    <span className="text-gray-400 ml-1">({contactos.length} contactos)</span>
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
                                                        ? 'bg-[#226583] text-white font-semibold'
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
                                        className="w-16 px-2 py-1 text-sm border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-[#226583]/30 focus:border-[#226583]"
                                        placeholder="Nº"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
