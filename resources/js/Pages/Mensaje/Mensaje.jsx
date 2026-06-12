// resources/js/Pages/Mensajes/Index.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '@/Components/Button';

export default function Index({ mensajes }) {
    const { flash } = usePage().props;

    const handleDelete = (id, contenido) => {
        if (confirm(`¿Eliminar mensaje "${contenido}"?`)) {
            router.delete(route('mensajes-simples.destroy', id));
        }
    };

    const [paginaActual, setPaginaActual] = useState(1);
    const [irAPagina, setIrAPagina] = useState('');
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
                                        <td className="p-3 font-medium text-gray-800">{new Date(mensaje.fecha_envio).toLocaleString()}</td>
                                        <td className="space-x-2">
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
                                    className="w-16 px-2 py-1 text-sm border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                                    placeholder="Nº"
                                />
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </AuthenticatedLayout>
    );
}