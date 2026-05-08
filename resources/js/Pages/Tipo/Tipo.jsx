import { useState } from "react";
import { useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/Button';

export default function Index({ tipos, categorias }) {
    const [editing, setEditing] = useState(null);
    const { data, setData, post, put, reset } = useForm({
        nombre: '',
        id_categoria: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editing) {
            put(route('tipos.update', editing), {
                onSuccess: () => {
                    setEditing(null);
                    reset();
                }
            });
        } else {
            post(route('tipos.store'), {
                onSuccess: () => reset()
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('¿Eliminar este tipo?')) {
            router.delete(route('tipos.destroy', id));
        }
    };

    const handleEdit = (tipo) => {
        setEditing(tipo.id);
        setData({
            nombre: tipo.nombre,
            id_categoria: tipo.id_categoria
        });
    };

    return (
        <AuthenticatedLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6 text-white">Gestión de Tipos</h1>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="mb-8 dark:bg-gray-800 p-4 rounded shadow">
                    <div className="flex gap-4 ">
                        <input
                            type="text"
                            placeholder="Nombre del tipo"
                            value={data.nombre}
                            onChange={e => setData('nombre', e.target.value)}
                            className="border rounded px-3 py-2 flex-1 dark:bg-gray-700 dark:text-white"
                            required
                        />
                        <select
                            value={data.id_categoria}
                            onChange={e => setData('id_categoria', e.target.value)}
                            className="border rounded px-3 py-2 flex-1 dark:bg-gray-800 text-white "
                            required
                        >
                            <option value="">Seleccionar categoría</option>
                            {categorias.map(cat => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.nombre}
                                </option>
                            ))}
                        </select>
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

                {/* Tabla de tipos */}
                <div className="bg-white rounded shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="p-3 text-left">ID</th>
                                <th className="p-3 text-left">Nombre</th>
                                <th className="p-3 text-left">Categoría</th>
                                <th className="p-3 text-left">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tipos.map(tipo => (
                                <tr key={tipo.id} className="border-t">
                                    <td className="p-3">{tipo.id}</td>
                                    <td className="p-3">{tipo.nombre}</td>
                                    <td className="p-3">{tipo.categoria?.nombre}</td>
                                    <td className="p-3">
                                        <Button
                                            size="sm"
                                            onClick={() => handleEdit(tipo)}
                                            className="mr-2"
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="danger"
                                            onClick={() => handleDelete(tipo.id)}
                                        >
                                            Eliminar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {tipos.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="p-3 text-center text-gray-500">
                                        No hay tipos registrados
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