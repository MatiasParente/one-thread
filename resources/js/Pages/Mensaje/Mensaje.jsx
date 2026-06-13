import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useEffect } from 'react';
import MensajeFeature from '@/Components/MensajesNormales/MensajeFeature';

export default function Mensaje({ mensajes, categorias = [], filters = {} }) {
    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({ preserveScroll: true, preserveState: true, only: ['mensajes'] });
        }, 20000);
        return () => clearInterval(interval);
    }, []);

    return (
        <AuthenticatedLayout
            title="Mensajes Normales"
            subtitle="Bandeja de entrada general"
        >
            <Head title="Mensajes" />
            <MensajeFeature mensajes={mensajes} categorias={categorias} filters={filters} />
        </AuthenticatedLayout>
    );
}
