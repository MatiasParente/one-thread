import { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
// import Button from '@/Components/Button';
import { Sparkles, Plus } from 'lucide-react';
import MensajeFilterCard from '@/Components/MensajesClasificados/MensajeFilterCard';
import MensajeTable from '@/Components/MensajesClasificados/MensajeTable';
import Swal from 'sweetalert2';

export default function Index({ mensajes, clientes, categorias, filters, is_general }) {
    const [nombreCliente, setNombreCliente] = useState(filters.nombre_cliente || '');
    const [idCategoria, setIdCategoria] = useState(filters.id_categoria || '');
    const [prioridad, setPrioridad] = useState(filters.prioridad || '');
    const [estado, setEstado] = useState(filters.estado || '');

    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({ preserveScroll: true, preserveState: true, only: ['mensajes'] });
        }, 20000);
        return () => clearInterval(interval);
    }, []);

    const applyFilters = () => {
        const queryParams = {};
        if (nombreCliente) queryParams.nombre_cliente = nombreCliente;
        if (idCategoria) queryParams.id_categoria = idCategoria;
        if (prioridad) queryParams.prioridad = prioridad;
        if (estado !== '') queryParams.estado = estado;

        router.get(route('mensajes-clasificados.index'), queryParams, {
            preserveState: true,
            replace: true,
        });
    };

    const handleClearFilters = () => {
        setNombreCliente('');
        setIdCategoria('');
        setPrioridad('');
        setEstado('');
        router.get(route('mensajes-clasificados.index'), {}, {
            preserveState: true,
            replace: true,
        });
    };

    const handleDelete = (id, resumen) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: `¿Deseas eliminar permanentemente el mensaje clasificado y su mensaje original: "${resumen}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('mensajes-clasificados.destroy', id), {
                    onSuccess: () => router.reload()
                });
            }
        });
    };

    return (
        <AuthenticatedLayout
            title="Mensajes Clasificados"
            subtitle="Historial de mensajes e incidentes analizados por IA"
        >
            <Head title="Mensajes Clasificados" />

            <div className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white p-4 rounded-md border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-2 text-[#226583]">
                        <Sparkles className="h-5 w-5" />
                        <span className="font-semibold text-gray-800">Total clasificados: {mensajes?.length || 0}</span>
                    </div>
                    {/* <Link href={route('mensajes-clasificados.create')}>
                        <Button className="flex items-center gap-1">
                            <Plus className="h-4 w-4" /> Nuevo Registro
                        </Button>
                    </Link> */}
                </div>

                <MensajeFilterCard
                    nombreCliente={nombreCliente}
                    setNombreCliente={setNombreCliente}
                    categorias={categorias}
                    idCategoria={idCategoria}
                    setIdCategoria={setIdCategoria}
                    prioridad={prioridad}
                    setPrioridad={setPrioridad}
                    estado={estado}
                    setEstado={setEstado}
                    applyFilters={applyFilters}
                    handleClearFilters={handleClearFilters}
                />

                <MensajeTable 
                    mensajes={mensajes} 
                    handleDelete={handleDelete}
                    categorias={categorias}
                    is_general={is_general}
                />
            </div>
        </AuthenticatedLayout>
    );
}
