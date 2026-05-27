import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import ChatCliente from '@/Components/RespuestaAgente/ChatCliente';

export default function RespuestaAgente({mensajeClasificado, historialMensajes}) {
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
