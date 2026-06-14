import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useEffect } from 'react';
import { MessageSquare } from 'lucide-react';
import MensajesInbox from '@/Components/MensajesInbox';

export default function Index({ mensajes }) {
    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({ preserveScroll: true, preserveState: true, only: ['mensajes'] });
        }, 20000);
        return () => clearInterval(interval);
    }, []);

    const handleDeleteMessage = (id, contenido) => {
        if (confirm(`¿Eliminar mensaje "${contenido}"?`)) {
            router.delete(route('mensajes-simples.destroy', id));
        }
    };

    const handleSelectMessage = (mensaje) => {
        if (mensaje.clasificado_id) {
            router.visit(route('mensajes-clasificados.respuesta', mensaje.clasificado_id));
        }
    };

    return (
        <AuthenticatedLayout
            title="Mensajes"
            subtitle="Bandeja de entrada de todos los canales"
        >
            <Head title="Mensajes" />

            <div className="space-y-4">
                <div className="flex items-center justify-between bg-white p-4 rounded-md border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                        <MessageSquare className="h-5 w-5 text-[#226583]" />
                        <span className="font-semibold text-gray-800">
                            Total: {mensajes?.length || 0} mensajes
                        </span>
                    </div>
                </div>

                <MensajesInbox
                    mensajes={mensajes}
                    onSelectMessage={handleSelectMessage}
                    onDeleteMessage={handleDeleteMessage}
                    emptyMessage="No hay mensajes recibidos todavía."
                />
            </div>
        </AuthenticatedLayout>
    );
}
