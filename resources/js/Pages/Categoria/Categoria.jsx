import { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/Button';

export default function Index({ categorias }) {
    const [editing, setEditing] = useState(null);
    const { data, setData, post, put, reset, errors } = useForm({
        nombre: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (editing) {
            put(route('categorias.update', editing), {
                onSuccess: () => {
                    setEditing(null);
                    reset();
                }
            });
        } else {
            post(route('categorias.store'), {
                onSuccess: () => reset()
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('¿Eliminar esta categoría?')) {
            router.delete(route('categorias.destroy', id));
        }
    };

    const handleEdit = (categoria) => {
        setEditing(categoria.id);
        setData({ nombre: categoria.nombre });
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6 text-white">Gestión de Categorías</h1>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="mb-8 dark:bg-gray-800 p-4 rounded shadow">
                    <div className="flex gap-4 ">
                        <div className="flex-1 dark:bg-gray-800">
                            <input
                                type="text"
                                placeholder="Nombre de la categoría"
                                value={data.nombre}
                                onChange={e => setData('nombre', e.target.value)}
                                className="w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-white"
                                required
                            />
                            {errors.nombre && (
                                <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
                            )}
                        </div>
                        <Button
                            type="submit"
                        >
                            {editing ? 'Actualizar' : 'Guardar'}
                        </Button>
                        {editing && (
                            <Button
                                variant="secondary"
                                type="button"
                                onClick={() => {
                                    setEditing(null);
                                    reset();
                                }}
                            >
                                Cancelar
                            </Button>
                        )}
                    </div>
                </form>

                {/* Tabla */}
                <div className="bg-white rounded shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 text-left">ID</th>
                                <th className="p-3 text-left">Nombre</th>
                                <th className="p-3 text-left">Tipos</th>
                            
                            </tr>
                        </thead>
                        <tbody>
                            {categorias.map(categoria => (
                                <tr key={categoria.id} className="border-t">
                                    <td className="p-3">{categoria.id}</td>
                                    <td className="p-3">{categoria.nombre}</td>
                                
                                    <td className="p-3">
                                        <Button
                                            size="sm"
                                            onClick={() => handleEdit(categoria)}
                                            className="mr-2"
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="danger"
                                            onClick={() => handleDelete(categoria.id)}
                                        >
                                            Eliminar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {categorias.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="p-3 text-center text-gray-500">
                                        No hay categorías registradas
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}