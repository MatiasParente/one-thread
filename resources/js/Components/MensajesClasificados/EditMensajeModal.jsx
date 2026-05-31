import { useForm, router } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import Button from '@/Components/Button';
import { useEffect } from 'react';

export default function EditMensajeModal({ mensaje, isOpen, onClose, onUpdate }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        resumen: '',
        prioridad: 'Media',
        estado: 0,
    });

    // Cuando se abre el modal con un mensaje nuevo, actualizar el formulario
    useEffect(() => {
        if (mensaje) {
            reset();
            setData({
                resumen: mensaje.resumen || '',
                prioridad: mensaje.prioridad || 'Media',
                estado: mensaje.estado || 0,
            });
        }
    }, [mensaje, reset, setData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('mensajes-clasificados.update', mensaje.id), {
            preserveState: true,  // Mantiene el estado actual
            preserveScroll: true, //  Mantiene la posición del scroll
            onSuccess: () => {
                if (onUpdate) onUpdate();
                onClose();
                router.reload();
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