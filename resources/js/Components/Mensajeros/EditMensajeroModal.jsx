import { useForm, router } from '@inertiajs/react';
import Modal from '../Modal';
import Button from '../Button';
import { useEffect } from 'react';

export default function EditMensajeroModal({ mensajero, isOpen, onClose }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        nombre: '',
        apellido: '',
        telefono: '',
        correo: '',
    });

    useEffect(() => {
        if (mensajero) {
            reset();
            setData({
                nombre: mensajero.nombre || '',
                apellido: mensajero.apellido || '',
                telefono: mensajero.telefono || '',
                correo: mensajero.correo || '',
            });
        }
    }, [mensajero, reset, setData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('mensajeros.update', mensajero.id), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                onClose();
            },
        });
    };

    if (!mensajero) return null;

    return (
        <Modal show={isOpen} onClose={onClose} maxWidth="sm">
            <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Editar Mensajero
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre
                        </label>
                        <input
                            type="text"
                            value={data.nombre}
                            onChange={(e) => setData('nombre', e.target.value)}
                            className="w-full border border-gray-200 rounded-sm px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary-light"
                        />
                        {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Apellido
                        </label>
                        <input
                            type="text"
                            value={data.apellido}
                            onChange={(e) => setData('apellido', e.target.value)}
                            className="w-full border border-gray-200 rounded-sm px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary-light"
                        />
                        {errors.apellido && <p className="text-red-500 text-sm mt-1">{errors.apellido}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Teléfono
                        </label>
                        <input
                            type="tel"
                            value={data.telefono}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === '' || /^\+?[\d-]*$/.test(value)) {
                                    setData('telefono', value);
                                }
                            }}
                            placeholder="+59899123456 o 598-99-123456"
                            className="w-full border border-gray-200 rounded-sm px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary-light"
                        />
                        <p className="text-xs text-gray-400 mt-1">
                            Solo dígitos, opcional <span className="font-mono">+</span> al inicio y guiones como separadores.
                        </p>
                        {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Correo electrónico
                        </label>
                        <input
                            type="email"
                            value={data.correo}
                            onChange={(e) => setData('correo', e.target.value)}
                            className="w-full border border-gray-200 rounded-sm px-3 py-2 focus:border-primary focus:ring-1 focus:ring-primary-light"
                        />
                        {errors.correo && <p className="text-red-500 text-sm mt-1">{errors.correo}</p>}
                    </div>

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
