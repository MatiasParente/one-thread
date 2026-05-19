import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import Button from '@/Components/Button';
import { Sparkles, Plus } from 'lucide-react';
import MensajeFilterCard from '@/Components/MensajesClasificados/MensajeFilterCard';
import MensajeTable from '@/Components/MensajesClasificados/MensajeTable';

export default function Index({ mensajes, clientes, categorias, filters }) {
    const [idMensajero, setIdMensajero] = useState(filters.id_mensajero || '');
    const [idCategoria, setIdCategoria] = useState(filters.id_categoria || '');
    const [prioridad, setPrioridad] = useState(filters.prioridad || '');

    // Trigger filters update when state changes
    const applyFilters = () => {
        const queryParams = {};
        if (idMensajero) queryParams.id_mensajero = idMensajero;
        if (idCategoria) queryParams.id_categoria = idCategoria;
        if (prioridad) queryParams.prioridad = prioridad;

        router.get(route('mensajes-clasificados.index'), queryParams, {
            preserveState: true,
            replace: true,
        });
    };

    const handleClearFilters = () => {
        setIdMensajero('');
        setIdCategoria('');
        setPrioridad('');
        router.get(route('mensajes-clasificados.index'), {}, {
            preserveState: true,
            replace: true,
        });
    };

    const handleDelete = (id, resumen) => {
        if (confirm(`¿Estás seguro de que deseas eliminar el mensaje clasificado: "${resumen}"?`)) {
            router.delete(route('mensajes-clasificados.destroy', id), {
                onSuccess: () => router.reload()
            });
        }
    };

    return (
        <AuthenticatedLayout
            title="Mensajes Clasificados"
            subtitle="Historial de mensajes e incidentes analizados por IA"
        >
            <Head title="Mensajes Clasificados" />

            <div className="space-y-6">
                {/* Action Header bar */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-white p-4 rounded-md border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-2 text-[#226583]">
                        <Sparkles className="h-5 w-5" />
                        <span className="font-semibold text-gray-800">Total clasificados: {mensajes?.length || 0}</span>
                    </div>
                    <Link href={route('mensajes-clasificados.create')}>
                        <Button className="flex items-center gap-1">
                            <Plus className="h-4 w-4" /> Nuevo Registro
                        </Button>
                    </Link>
                </div>

                <MensajeFilterCard
                    clientes={clientes}
                    categorias={categorias}
                    idMensajero={idMensajero}
                    setIdMensajero={setIdMensajero}
                    idCategoria={idCategoria}
                    setIdCategoria={setIdCategoria}
                    prioridad={prioridad}
                    setPrioridad={setPrioridad}
                    applyFilters={applyFilters}
                    handleClearFilters={handleClearFilters}
                />

                <MensajeTable 
                    mensajes={mensajes} 
                    handleDelete={handleDelete}
                />
            </div>
        </AuthenticatedLayout>
    );
}
