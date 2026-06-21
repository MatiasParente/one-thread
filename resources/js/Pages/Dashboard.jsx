import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useEffect } from 'react';
import StatsCards from '@/Components/Dashboard/StatsCards';
import ChannelDistribution from '@/Components/Dashboard/ChannelDistribution';
import MessagesByDay from '@/Components/Dashboard/MessagesByDay';
import QuickSummary from '@/Components/Dashboard/QuickSummary';
import MensajeTable from '@/Components/MensajesClasificados/MensajeTable';
import Swal from 'sweetalert2';

export default function Dashboard({ stats, mensajes, mensajesPorCanal, mensajesPorDia, resumenRapido, categorias, general }) {
    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({ preserveScroll: true, preserveState: true });
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    // Declaramos handleDelete para que la tabla pueda borrar registros en el dashboard
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
            title="Dashboard"
            subtitle="Resumen de actividad y mensajes"
        >
            <Head title="Dashboard" />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 items-start">
                <StatsCards stats={stats} />

                <div className="flex flex-col gap-6 lg:row-span-2">
                    <ChannelDistribution mensajesPorCanal={mensajesPorCanal} />
                    <MessagesByDay mensajesPorDia={mensajesPorDia} />
                    <QuickSummary resumenRapido={resumenRapido} />
                </div>

                <div className="lg:col-span-3 rounded-md border border-gray-200 bg-white p-4 shadow-sm space-y-3">
                    <div>
                        <h3 className="text-sm font-bold text-gray-900">
                            Consultas Recientes Clasificadas
                        </h3>
                        <p className="text-xs text-gray-400">Últimos mensajes procesados en tiempo real por la IA</p>
                    </div>
{/*ACa iria el componente de los filtros pero como se necesitan una banda de datos no lo puse, por ahora solo esta el que tiene los datos del mensaje clasificado */}
                    <MensajeTable 
                        mensajes={mensajes} 
                        handleDelete={handleDelete}
                        categorias={categorias}
                        is_general={general}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
