import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/Button';

export default function Show({ categoria }) {
    return (
        <AuthenticatedLayout title="Detalle de Categoría" subtitle="Información completa">
            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-[30px] font-bold text-gray-900 tracking-tight">
                        Detalle de Categoría
                    </h1>
                    <div className="flex gap-2">
                        <Button href={route('categorias.edit', categoria.id)}>
                            Editar
                        </Button>
                        <Button href={route('categorias.index')} variant="secondary">
                            Volver
                        </Button>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 max-w-lg">
                    <div className="mb-4">
                        <label className="block text-sm text-gray-500 mb-1">ID</label>
                        <p className="text-gray-800 font-medium">{categoria.id}</p>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm text-gray-500 mb-1">Nombre</label>
                        <p className="text-gray-800 font-medium">{categoria.nombre}</p>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm text-gray-500 mb-1">Tipos asociados</label>
                        {categoria.tipos?.length > 0 ? (
                            <ul className="list-disc list-inside text-gray-600">
                                {categoria.tipos.map(tipo => (
                                    <li key={tipo.id}>{tipo.nombre}</li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-400">No hay tipos asociados</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm text-gray-500 mb-1">Fecha creación</label>
                        <p className="text-gray-600">{new Date(categoria.created_at).toLocaleString()}</p>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm text-gray-500 mb-1">Última actualización</label>
                        <p className="text-gray-600">{new Date(categoria.updated_at).toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}