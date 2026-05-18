import { useState } from 'react';
import './MessengerList.css';
import Button from './Button';

export default function MessengerList({ mensajeros }) {

    const [paginaActual, setPaginaActual] = useState(1);
    const itemsPorPagina = 10; 

    const indiceUltimoItem = paginaActual * itemsPorPagina;
    const indicePrimerItem = indiceUltimoItem - itemsPorPagina;
    const mensajerosPagina = mensajeros.slice(indicePrimerItem, indiceUltimoItem);
    
    const totalPaginas = Math.ceil(mensajeros.length / itemsPorPagina);

    const paginaAnterior = () =>{
        if(paginaActual > 1){
            setPaginaActual(paginaActual - 1);
        }
    }

    const paginaSiguiente = () =>{
        if(paginaActual < totalPaginas){
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
                    className="canal-icon"
                />
            ));
    };

    return (

        <div>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Telefono</th>
                        <th>Correo</th>
                        <th>Canales</th>
                    </tr>
                </thead>
                <tbody>
                    {mensajeros.length > 0 ? (
                        mensajerosPagina.map(mensajero => (
                            <tr key={mensajero.id}>
                                <td >{mensajero.nombre}</td>
                                <td>{mensajero.apellido}</td>
                                <td>{mensajero.telefono}</td>
                                <td>{mensajero.correo}</td>
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