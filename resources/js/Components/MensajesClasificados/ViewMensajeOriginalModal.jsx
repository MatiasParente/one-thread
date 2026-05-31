import Modal from '@/Components/Modal';

export default function ViewMensajeModal({ mensaje, isOpen, onClose }) {
    if (!mensaje) return null;

    return (
        <Modal show={isOpen} onClose={onClose} maxWidth="2xl">
            <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Mensaje Original
                </h3>
                
                <div className="space-y-4">
                    {/* Datos del cliente */}
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <span className="text-xs text-gray-400">Cliente</span>
                                <p className="font-medium text-gray-800">
                                    {mensaje.mensajeros?.nombre} {mensaje.mensajeros?.apellido}
                                </p>
                            </div>
                            <div>
                                <span className="text-xs text-gray-400">Canal</span>
                                <p className="font-medium text-gray-800">{mensaje.origen}</p>
                            </div>
                            <div>
                                <span className="text-xs text-gray-400">Fecha</span>
                                <p className="font-medium text-gray-800">
                                    {new Date(mensaje.fecha_envio).toLocaleString()}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contenido del mensaje */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                            Contenido
                        </h4>
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                            <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                                {mensaje.contenido}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}