import { useState } from 'react';
import Button from './Button';
import { ChevronLeft, ChevronRight, Search, MessageCircle, Send, Mail, Users } from 'lucide-react';

export default function MessengerList({ mensajeros }) {
    const [paginaActual, setPaginaActual] = useState(1);
    const [irAPagina, setIrAPagina] = useState('');
    const [busqueda, setBusqueda] = useState('');
    const [canal, setCanal] = useState('');

    const itemsPorPagina = 10;

    const mensajerosFiltrados = mensajeros.filter((mensajero) => {
        const texto = busqueda.toLowerCase();

        const coincideBusqueda =
            !texto ||
            mensajero.nombre?.toLowerCase().includes(texto) ||
            mensajero.apellido?.toLowerCase().includes(texto) ||
            mensajero.correo?.toLowerCase().includes(texto) ||
            mensajero.telefono?.toLowerCase().includes(texto);

        const coincideCanal =
            !canal ||
            (canal === 'whatsapp' && mensajero.whatsapp_id) ||
            (canal === 'telegram' && mensajero.telegram_id) ||
            (canal === 'email' && mensajero.correo);

        return coincideBusqueda && coincideCanal;
    });

    const indiceUltimoItem = paginaActual * itemsPorPagina;
    const indicePrimerItem = indiceUltimoItem - itemsPorPagina;

    const mensajerosPagina = mensajerosFiltrados.slice(
        indicePrimerItem,
        indiceUltimoItem
    );

    const totalPaginas = Math.ceil(
        mensajerosFiltrados.length / itemsPorPagina
    );

    const paginaAnterior = () => {
        if (paginaActual > 1) {
            setPaginaActual(paginaActual - 1);
        }
    };

    const paginaSiguiente = () => {
        if (paginaActual < totalPaginas) {
            setPaginaActual(paginaActual + 1);
        }
    };

    const irAPaginaEspecifica = (pagina) => {
        if (pagina >= 1 && pagina <= totalPaginas) {
            setPaginaActual(pagina);
        }
    };

    const getPageNumbers = () => {
        if (totalPaginas <= 5) {
            return Array.from({ length: totalPaginas }, (_, i) => i + 1);
        }

        const pages = [1];
        const left = Math.max(2, paginaActual - 1);
        const right = Math.min(totalPaginas - 1, paginaActual + 1);

        if (left > 2) pages.push('...');

        for (let i = left; i <= right; i++) {
            pages.push(i);
        }

        if (right < totalPaginas - 1) pages.push('...');

        pages.push(totalPaginas);

        return pages;
    };

    const totalWhatsapp = mensajeros.filter(
        (m) => m.whatsapp_id
    ).length;

    const totalTelegram = mensajeros.filter(
        (m) => m.telegram_id
    ).length;

    const totalCorreo = mensajeros.filter(
        (m) => m.correo
    ).length;



    return (
        <div className="space-y-6">
            {/* Resumen */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">
                                Mensajeros
                            </p>

                            <p className="text-3xl font-bold text-gray-900 mt-1">
                                {mensajeros.length}
                            </p>
                        </div>

                        <Users
                            size={26}
                            className="text-primary"
                        />
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">
                                WhatsApp
                            </p>

                            <p className="text-3xl font-bold text-gray-900 mt-1">
                                {totalWhatsapp}
                            </p>
                        </div>

                        <MessageCircle
                            size={26}
                            className="text-green-600"
                        />
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">
                                Telegram
                            </p>

                            <p className="text-3xl font-bold text-gray-900 mt-1">
                                {totalTelegram}
                            </p>
                        </div>

                        <Send
                            size={26}
                            className="text-blue-600"
                        />
                    </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-md p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">
                                Email
                            </p>

                            <p className="text-3xl font-bold text-gray-900 mt-1">
                                {totalCorreo}
                            </p>
                        </div>

                        <Mail
                            size={26}
                            className="text-red-600"
                        />
                    </div>
                </div>
            </div>

            {/* Buscador */}
            <div className="bg-white border border-gray-200 rounded-md shadow-sm p-4 mb-6">
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="relative flex-1">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            placeholder="Buscar por nombre, apellido, teléfono o email..."
                            value={busqueda}
                            onChange={(e) => {
                                setBusqueda(e.target.value);
                                setPaginaActual(1);
                            }}
                            className="
                    w-full
                    pl-10
                    pr-3
                    py-2
                    border
                    border-gray-200
                    rounded-md
                    focus:outline-none
                    focus:ring-2
                    focus:ring-primary-light
                "
                        />
                    </div>

                    <select
                        value={canal}
                        onChange={(e) => {
                            setCanal(e.target.value);
                            setPaginaActual(1);
                        }}
                        className="
                px-3
                py-2
                border
                border-gray-200
                rounded-md
                focus:outline-none
                focus:ring-2
                focus:ring-primary-light
                min-w-[180px]
            "
                    >
                        <option value="">Todos los canales</option>
                        <option value="whatsapp">WhatsApp</option>
                        <option value="telegram">Telegram</option>
                        <option value="email">Email</option>
                    </select>

                    <Button
                        variant="secondary"
                        onClick={() => {
                            setBusqueda('');
                            setCanal('');
                            setPaginaActual(1);
                        }}
                    >
                        Limpiar
                    </Button>
                </div>
            </div>
            {/* Tabla */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px]">
                        <thead>
                            <tr
                                className="text-sm font-semibold text-white"
                                style={{
                                    backgroundColor: '#226583',
                                }}
                            >
                                <th className="p-3 text-left">
                                    Mensajero
                                </th>

                                <th className="p-3 text-left">
                                    Teléfono
                                </th>

                                <th className="p-3 text-left">
                                    Correo
                                </th>

                                <th className="p-3 text-left">
                                    Canales
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {mensajerosPagina.length > 0 ? (
                                mensajerosPagina.map(
                                    (mensajero) => (
                                        <tr
                                            key={mensajero.id}
                                            className="
                                                border-t
                                                border-gray-100
                                                hover:bg-gray-50
                                                transition-colors
                                            "
                                        >
                                            <td className="p-3">
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        {
                                                            mensajero.nombre
                                                        }{' '}
                                                        {
                                                            mensajero.apellido
                                                        }
                                                    </p>
                                                </div>
                                            </td>

                                            <td className="p-3 text-gray-700">
                                                {
                                                    mensajero.telefono
                                                }
                                            </td>

                                            <td className="p-3">
                                                <a
                                                    href={`mailto:${mensajero.correo}`}
                                                    className="text-primary hover:underline"
                                                >
                                                    {
                                                        mensajero.correo
                                                    }
                                                </a>
                                            </td>

                                            <td className="p-3">
                                                <div className="flex flex-wrap gap-2">
                                                    {mensajero.whatsapp_id && (
                                                        <span
                                                            className="
                                                                px-2
                                                                py-1
                                                                rounded-full
                                                                text-xs
                                                                font-medium
                                                                bg-green-100
                                                                text-green-700
                                                            "
                                                        >
                                                            WhatsApp
                                                        </span>
                                                    )}

                                                    {mensajero.telegram_id && (
                                                        <span
                                                            className="
                                                                px-2
                                                                py-1
                                                                rounded-full
                                                                text-xs
                                                                font-medium
                                                                bg-blue-100
                                                                text-blue-700
                                                            "
                                                        >
                                                            Telegram
                                                        </span>
                                                    )}

                                                    {mensajero.correo && (
                                                        <span
                                                            className="
                                                                px-2
                                                                py-1
                                                                rounded-full
                                                                text-xs
                                                                font-medium
                                                                bg-red-100
                                                                text-red-700
                                                            "
                                                        >
                                                            Email
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )
                            ) : (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="
                                            text-center
                                            py-12
                                            text-gray-400
                                        "
                                    >
                                        No se encontraron mensajeros.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {mensajeros.length > 0 && (
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
                                            className={`min-w-[2rem] px-2 py-1 text-sm rounded-md transition-colors ${page === paginaActual
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
                                    className="w-16
                                    px-2 
                                    py-1 
                                    text-sm 
                                    border 
                                    border-gray-300 
                                    rounded-md 
                                    text-center 
                                    focus:outline-none 
                                    focus:ring-2 
                                    focus:ring-primary/30 
                                    focus:border-primary"
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