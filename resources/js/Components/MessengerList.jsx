import { useState } from 'react';
import Button from './Button';

export default function MessengerList({ mensajeros }) {

    const [paginaActual, setPaginaActual] = useState(1);
    const itemsPorPagina = 10;

    const indiceUltimoItem = paginaActual * itemsPorPagina;
    const indicePrimerItem = indiceUltimoItem - itemsPorPagina;
    const mensajerosPagina = mensajeros.slice(indicePrimerItem, indiceUltimoItem);

    const totalPaginas = Math.ceil(mensajeros.length / itemsPorPagina);

    const paginaAnterior = () => {
        if (paginaActual > 1) {
            setPaginaActual(paginaActual - 1);
        }
    }

    const paginaSiguiente = () => {
        if (paginaActual < totalPaginas) {
            setPaginaActual(paginaActual + 1);
        }
    }

    const getCanales = (mensajero) => {
        const canales = [
            { condition: mensajero.whatsapp_id, icon: '/images/sapp.png', name: 'WhatsApp' },
            { condition: mensajero.telegram_id, icon: '/images/telegram-4.png', name: 'Telegram' },
            { condition: mensajero.correo, icon: '/images/gmail.png', name: 'Gmail' }
        ];

        return canales
            .filter(canal => canal.condition)
            .map((canal, index) => (
                <img
                    key={index}
                    src={canal.icon}
                    alt={canal.name}
                    title={canal.name}
                    style={{
                        width: '1.8rem',
                        height: '1.8rem',
                        objectFit: 'contain',
                        verticalAlign: 'middle',
                        display: 'inline-block',
                        marginRight: index < canales.filter(c => c.condition).length - 1 ? '4px' : 0
                    }}
                />
            ));
    };

    return (
        <div>
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead >
                        <tr className="text-sm font-semibold text-gray-100" style={{ backgroundColor: "#226583" }}>
                            <th className="p-3 text-left">Nombre</th>
                            <th className="p-3 text-left">Apellido</th>
                            <th className="p-3 text-left">Telefono</th>
                            <th className="p-3 text-left">Correo</th>
                            <th className="p-3 text-left">Canales</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mensajeros.length > 0 ? (
                            mensajerosPagina.map(mensajero => (
                                <tr key={mensajero.id} className="border-t border-gray-100 hover:bg-gray-50">
                                    <td className="p-3 font-medium text-gray-800">{mensajero.nombre}</td>
                                    <td className="p-3 font-medium text-gray-800">{mensajero.apellido}</td>
                                    <td className="p-3 font-medium text-gray-800">{mensajero.telefono}</td>
                                    <td className="p-3 font-medium text-gray-800">{mensajero.correo}</td>
                                    <td className='canales'>
                                        {getCanales(mensajero)}
                                    </td>
                                </tr>
                            )
                            )) : (
                            <tr>
                                <td>No hay Mensajeros disponibles</td>
                            </tr>
                        )}
                    </tbody>
                </table>



            </div>
            {mensajeros.length > 0 && (
                <div className="pagination-container">
                    <div className="pagination-controls">
                        {/* Botón Anterior */}
                        <Button
                            onClick={paginaAnterior}
                            disabled={paginaActual === 1}
                            className="pagination-btn"
                            aria-label="Página anterior"
                        >
                            ← Anterior
                        </Button>


                        {/* Botón Siguiente */}
                        <Button
                            onClick={paginaSiguiente}
                            disabled={paginaActual === totalPaginas}
                            className="pagination-btn"
                            aria-label="Página siguiente"
                        >
                            Siguiente →
                        </Button>
                    </div>
                </div>
            )}
        </div>


    )
}