import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useEffect } from 'react';
import ChatCliente from '@/Components/RespuestaAgente/ChatCliente';

export default function RespuestaAgente({mensajeClasificado, historialMensajes}) {
    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({ preserveScroll: true, preserveState: true });
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    return (
        <AuthenticatedLayout
            title="Respuesta"
            subtitle="Módulo de respuestas a mensajes"
        >
            <Head title="Respuesta" />

            <div className="bg-white p-6 rounded-md border border-gray-200 shadow-sm min-h-[300px] flex items-center justify-center text-gray-400">
                <ChatCliente mensajeClasificado={mensajeClasificado} historialMensajes={historialMensajes} />
            </div>
        </AuthenticatedLayout>
    );
}
