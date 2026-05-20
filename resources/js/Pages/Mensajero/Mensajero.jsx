import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage, router } from '@inertiajs/react';

import MessengerList from '@/Components/MessengerList';

export default function Index({mensajeros}) {
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