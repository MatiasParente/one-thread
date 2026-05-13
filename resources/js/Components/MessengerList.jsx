import './MessengerList.css';

export default function MessengerList({ mensajeros }) {

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
                mensajeros.map(mensajero => (
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

    )
}