import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';


export default function Index({ totalCategorias = 0, totalTipos = 0 }) {
    const cards = [
        {
            title: 'Categorías',
            description: 'Administrar categorías de mensajes',
            count: totalCategorias,
            route: route('categorias.index'),
        },
        {
            title: 'Tipos',
            description: 'Administrar tipos de mensajes',
            count: totalTipos,
            route: route('tipos.index'),
        },
    ];

    return (
        <AuthenticatedLayout
            title="Configuración"
            subtitle="Configuración del sistema"
        >
            <Head title="Configuración" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cards.map(card => (
                    <Link
                        key={card.title}
                        href={card.route}
                        className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition flex justify-between items-center"
                    >
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                                {card.title}
                            </h3>
                            <p className="text-gray-600 mt-1">
                                {card.description}
                            </p>
                            <span className="inline-block mt-4 text-primary font-medium">
                                Gestionar
                            </span>
                        </div>
                        <div className="text-right">
                            <span className="text-3xl font-bold text-primary">
                                {card.count}
                            </span>
                            <p className="text-xs text-gray-500">registros</p>
                        </div>
                    </Link>
                ))}
            </div>
        </AuthenticatedLayout>
    );
}