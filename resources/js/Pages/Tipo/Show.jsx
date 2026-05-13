import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/Button';

export default function Show({ tipo }) {
    return (
        <AuthenticatedLayout title="Detalle del Tipo" subtitle="Información completa">
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-white">Detalle del Tipo</h1>
                    <div className="flex gap-2">
                        <Button href={route('tipos.edit', tipo.id)}>
                            Editar
                        </Button>
                        <Button href={route('tipos.index')} variant="secondary">
                            Volver
                        </Button>
                    </div>
                </div>

                <div className="bg-white rounded shadow p-6 max-w-lg">
                    <div className="mb-4">
                        <label className="block text-gray-500 text-sm mb-1">ID</label>
                        <p className="text-gray-800">{tipo.id}</p>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-500 text-sm mb-1">Nombre</label>
                        <p className="text-gray-800 font-medium">{tipo.nombre}</p>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-500 text-sm mb-1">Categoría</label>
                        <p className="text-gray-800">{tipo.categoria?.nombre}</p>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-500 text-sm mb-1">Fecha creación</label>
                        <p className="text-gray-800">{new Date(tipo.created_at).toLocaleString()}</p>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-500 text-sm mb-1">Última actualización</label>
                        <p className="text-gray-800">{new Date(tipo.updated_at).toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}