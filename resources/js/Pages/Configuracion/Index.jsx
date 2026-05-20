import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index() {
    return (
        <AuthenticatedLayout
            title="Configuración"
            subtitle="Configuración del sistema"
        >
            <Head title="Configuración" />

            <div className="bg-white p-6 rounded-md border border-gray-200 shadow-sm min-h-[300px] flex items-center justify-center text-gray-400">
                <span>Contenido en desarrollo</span>
            </div>
        </AuthenticatedLayout>
    );
}
