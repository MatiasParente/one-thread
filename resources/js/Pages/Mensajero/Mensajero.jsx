import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { useEffect } from 'react';

import MessengerList from '@/Components/Mensajeros/MessengerList';
import Button from '@/Components/Button';

export default function Index({mensajeros}) {
    useEffect(() => {
        const interval = setInterval(() => {
            router.reload({ preserveScroll: true, preserveState: true, only: ['mensajeros'] });
        }, 20000);
        return () => clearInterval(interval);
    }, []);

    return (
        <AuthenticatedLayout
            title="Mensajeros"
            subtitle="Gestión de nuevos mensajeros"
        >

        <Head title="Mensajeros" />
        <div>
            <MessengerList mensajeros={mensajeros}></MessengerList>
        </div>
        </AuthenticatedLayout>


    )
}