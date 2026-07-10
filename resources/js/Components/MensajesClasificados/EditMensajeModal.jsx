import { useForm, router } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import Button from '@/Components/Button';
import { useEffect } from 'react';

export default function EditMensajeModal({ mensaje, isOpen, onClose, onUpdate, categorias, is_general }) {
    const getInitialTipos = (msg) => {
        if (!msg) return [];
        if (msg.tipos) return msg.tipos.map(t => t.id); // From edit endpoint
        if (msg.tipo_mensaje) return msg.tipo_mensaje.map(tm => tm.id_tipo || tm.tipos?.id).filter(Boolean); // From index/dashboard endpoint
        return [];
    };

    const { data, setData, put, processing, errors, reset } = useForm({
        resumen: '',
        prioridad: 'Media',
        estado: 0,
        tipos_ids: [],
    });

    // Cuando se abre el modal con un mensaje nuevo, actualizar el formulario
    useEffect(() => {
        if (mensaje) {
            reset();
            setData({
                resumen: mensaje.resumen || '',
                prioridad: mensaje.prioridad || 'Media',
                estado: mensaje.estado || 0,
                tipos_ids: getInitialTipos(mensaje),
            });
        }
    }, [mensaje, reset, setData]);

    const handleTipoChange = (tipoId) => {
        const nextIds = [...data.tipos_ids];
        if (nextIds.includes(tipoId)) {
            setData('tipos_ids', nextIds.filter(id => id !== tipoId));
        } else {
            setData('tipos_ids', [...nextIds, tipoId]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('mensajes-clasificados.update', mensaje.id), {
            preserveState: true,  // Mantiene el estado actual
            preserveScroll: true, //  Mantiene la posición del scroll
            onSuccess: () => {
                if (onUpdate) onUpdate();
                onClose();
            },
        });
    };

    if (!mensaje) return null;

    return (
        <Modal show={isOpen} onClose={onClose} maxWidth="lg">
            <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Editar Mensaje Clasificado
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Resumen */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Resumen
                        </label>
                        <textarea
                            value={data.resumen}
                            onChange={(e) => setData('resumen', e.target.value)}
                            rows={3}
                            className="w-full border border-gray-200 rounded-sm px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary-light"
                        />
                        {errors.resumen && (
                            <p className="text-danger text-sm mt-1">{errors.resumen}</p>
                        )}
                    </div>

                    {/* Prioridad */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Prioridad
                        </label>
                        <select
                            value={data.prioridad}
                            onChange={(e) => setData('prioridad', e.target.value)}
                            className="w-full border border-gray-200 rounded-sm px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary-light"
                        >
                            <option value="Baja">Baja</option>
                            <option value="Media">Media</option>
                            <option value="Alta">Alta</option>
                        </select>
                    </div>

                    {/* Estado */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Estado
                        </label>
                        <select
                            value={data.estado}
                            onChange={(e) => setData('estado', parseInt(e.target.value))}
                            className="w-full border border-gray-200 rounded-sm px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary-light"
                        >
                            <option value={0}>Pendiente</option>
                            <option value={1}>En proceso</option>
                            <option value={2}>Resuelto</option>
                            <option value={3}>Eliminado</option>
                        </select>
                    </div>

                    {/* Categorías y Tipos */}
                    {is_general && categorias && categorias.length > 0 && (
                        <div className="border-t border-gray-200 pt-4 mt-2">
                            <label className="block text-sm font-bold text-gray-900 mb-3">Categorías y Tipos</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-48 overflow-y-auto pr-2">
                                {categorias.map(categoria => (
                                    <div key={categoria.id} className="rounded-md border border-gray-200 p-3 bg-gray-50 flex flex-col">
                                        <h4 className="font-semibold text-gray-800 mb-2 border-b border-gray-200 pb-1 text-sm">{categoria.nombre}</h4>
                                        <div className="space-y-2 flex-1">
                                            {categoria.tipos && categoria.tipos.length > 0 ? (
                                                categoria.tipos.map(tipo => (
                                                    <label key={tipo.id} className="flex items-center space-x-2">
                                                        <input
                                                            type="checkbox"
                                                            checked={data.tipos_ids.includes(tipo.id)}
                                                            onChange={() => handleTipoChange(tipo.id)}
                                                            className="rounded border-gray-300 text-primary shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                                                        />
                                                        <span className="text-xs text-gray-700">{tipo.nombre}</span>
                                                    </label>
                                                ))
                                            ) : (
                                                <div className="bg-yellow-50 text-yellow-800 border border-yellow-200 rounded p-2 mt-1">
                                                    <p className="text-[11px] leading-tight">
                                                        No tiene tipos asignados. Ve a <span className="font-semibold">Configuración &gt; Tipos</span> para agregar opciones a esta categoría.
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {errors.tipos_ids && <div className="mt-1 text-sm text-danger">{errors.tipos_ids}</div>}
                        </div>
                    )}

                    {/* Botones */}
                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="secondary" onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={processing}>
                            Guardar cambios
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}