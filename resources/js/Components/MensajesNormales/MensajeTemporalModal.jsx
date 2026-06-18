import Modal from "../Modal";
import Button from "../Button";
import { useState } from "react";
import axios from 'axios';
import { router } from '@inertiajs/react';

// Límite de caracteres para el contenido (opcional, si quieres truncar)
const MAX_CONTENT_LENGTH = 60;

const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
};

export default function MensajeTemporalModal({ mensajesTemporales, isOpen, onClose }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleRestaurar = async (origen, contenido, canal_id,id) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(route('mensajero.por-canal', { canal_id }));
            const mensajero = response.data; 
            if (!mensajero) {
                setError('No se encontró mensajero para este canal');
                setLoading(false);
                return;
            }

            router.post(route('mensajes-simples.store'), {
                contenido: contenido,
                origen: origen,
                id_mensajero: mensajero.id,
                temporal_id: id,
            }, {
                preserveScroll: true,
                onSuccess: () => {
                    onClose();
                    router.reload({ preserveScroll: true });
                },
                onError: (errors) => {
                    console.error('Errores de validación:', errors);
                    setError('Error al restaurar: ' + JSON.stringify(errors));
                    setLoading(false);
                }
            });

            
            onClose();
            router.reload({ preserveScroll: true });
        } catch (err) {
            console.error(err);
            setError('Error al restaurar mensaje');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal show={isOpen} onClose={onClose} maxWidth="2x1">
            <div className="p-4 flex flex-col max-h-[90vh]">
                <h2 className="text-lg font-semibold mb-4">Mensajes temporales</h2>

                {error && (
                    <div className="mb-4 p-2 bg-red-100 text-red-700 rounded border border-red-300">
                        {error}
                    </div>
                )}
                <div className="overflow-y-auto border border-gray-200 rounded-lg" style={{ maxHeight: '65vh' }}>
                    <table className="w-full min-w-[600px] divide-y divide-gray-200">
                        <thead className="bg-gray-50 sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 min-w-[180px]">Contenido</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 min-w-[100px]">Canal</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 min-w-[120px]">Mensajero</th>
                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 min-w-[110px]">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {mensajesTemporales?.map((mt) => (
                                <tr key={mt.id} className="hover:bg-gray-50 transition-colors">
                                    <td
                                        className="px-4 py-4 max-w-xs truncate"
                                        title={mt.contenido}
                                    >
                                        {truncateText(mt.contenido, MAX_CONTENT_LENGTH)}
                                    </td>
                                    <td className="px-4 py-4">{mt.canal}</td>
                                    <td className="px-4 py-4">{mt.nombre} {mt.apellido}</td>
                                    <td className="px-4 py-4">
                                        <Button className="whitespace-nowrap"
                                            onClick={() => handleRestaurar(mt.canal, mt.contenido, mt.canal_id,mt.id)}
                                            disabled={loading}
                                        >
                                            {loading ? 'Restaurando...' : 'Restaurar'}</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {(!mensajesTemporales || mensajesTemporales.length === 0) && (
                    <p className="text-center text-gray-500 mt-4">No hay mensajes temporales</p>
                )}
            </div>
        </Modal>
    );
}