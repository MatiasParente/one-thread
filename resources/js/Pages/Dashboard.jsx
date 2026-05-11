import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import StatsCards from '@/Components/StatsCards';
import ChannelDistribution from '@/Components/ChannelDistribution';
import MessagesByDay from '@/Components/MessagesByDay';
import QuickSummary from '@/Components/QuickSummary';

export default function Dashboard({ stats, mensajes, mensajesPorCanal, mensajesPorDia, resumenRapido }) {
    return (
        <AuthenticatedLayout
            title="Dashboard"
            subtitle="Resumen de actividad y mensajes"
        >
            <Head title="Dashboard" />

            <StatsCards stats={stats} />

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                <div className="lg:col-span-3">
                    <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
                        <h3 className="mb-3 text-sm font-semibold text-gray-900">
                            Mensajes
                        </h3>
                        <p className="text-sm text-gray-400">Para el siguiente sprint profe se lo juramos</p>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <ChannelDistribution mensajesPorCanal={mensajesPorCanal} />
                    <MessagesByDay mensajesPorDia={mensajesPorDia} />
                    <QuickSummary resumenRapido={resumenRapido} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
