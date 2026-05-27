import React, { useEffect, useRef, useState } from 'react';
import { Send, ArrowLeft, MessageSquare, Mail, SendHorizontal, AlertTriangle } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function ChatCliente({ mensajeClasificado, historialMensajes = [] }) {
    const msgOriginal = mensajeClasificado?.mensaje;
    const cliente = msgOriginal?.mensajeros;
    const [seleccionados, setSeleccionados] = useState([]);
    const messagesEndRef = useRef(null);

    const toggleSeleccion = (id) => {
    setSeleccionados((prevSeleccionados) => {
        if (prevSeleccionados.includes(id)) {
            // Si ya está, lo sacamos del arreglo
            return prevSeleccionados.filter(item => item !== id);
        } else {
            // si no esta seleccionado lo agregamos al arreglo
            return [...prevSeleccionados, id];
        }
    });
};  

    const ultimoIdSeleccionado = seleccionados[seleccionados.length - 1];
    const mensajeDestino = historialMensajes.find(m => m.id === ultimoIdSeleccionado) || msgOriginal;

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [historialMensajes]);

    const getCanalConfig = (origen) => {
        const canal = origen?.toLowerCase();
        switch (canal) {
            case 'whatsapp':
                return {
                    bgBubble: 'bg-[#DCF8C6] text-gray-800',
                    borderColor: 'border-l-4 border-l-[#25D366]',
                    badge: 'bg-[#25D366] text-white',
                    icon: <MessageSquare className="h-3 w-3" />
                };
            case 'telegram':
                return {
                    bgBubble: 'bg-[#E1F3FC] text-gray-800',
                    borderColor: 'border-l-4 border-l-[#32afed]',
                    badge: 'bg-[#32afed] text-white',
                    icon: <SendHorizontal className="h-3 w-3" />
                };
            case 'email':
                return {
                    bgBubble: 'bg-[#FEECEB] text-gray-800',
                    borderColor: 'border-l-4 border-l-[#EA4335]',
                    badge: 'bg-[#EA4335] text-white',
                    icon: <Mail className="h-3 w-3" />
                };
            default:
                return {
                    bgBubble: 'bg-white text-gray-800',
                    borderColor: 'border-l-4 border-l-gray-300',
                    badge: 'bg-gray-500 text-white',
                    icon: <MessageSquare className="h-3 w-3" />
                };
        }
    };

    // Colores
    const headerConfig = msgOriginal?.origen?.toLowerCase() === 'whatsapp' ? 'bg-[#075E54]' : 
                    msgOriginal?.origen?.toLowerCase() === 'telegram' ? 'bg-[#0088cc]' : 
                    msgOriginal?.origen?.toLowerCase() === 'email' ? 'bg-[#EA4335]' : 'bg-gray-700';

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-md overflow-hidden border border-gray-200 my-4">
            
            <div className={`px-6 py-3 flex items-center justify-between shadow-sm text-white ${headerConfig}`}>
                <div className="flex items-center gap-3">
                    <Link href={route('mensajes-clasificados.index')} className="hover:opacity-80 transition-opacity">
                        <ArrowLeft className="h-6 w-6" />
                    </Link>
                    
                    <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg uppercase border border-white/10">
                        {cliente?.nombre?.[0] || 'C'}{cliente?.apellido?.[0] || 'D'}
                    </div>

                    <div>
                        <h2 className="font-semibold text-base leading-tight">
                            {cliente ? `${cliente.nombre} ${cliente.apellido}` : 'Cliente Desconocido'}
                        </h2>
                        <span className="text-xs opacity-75">Historial completo de interacciones</span>
                    </div>
                </div>

                <div className="hidden sm:block">
                    <span className="bg-white/20 text-xs px-3 py-1 rounded-md font-medium backdrop-blur-xs">
                        Prioridad Actual: {mensajeClasificado?.prioridad || 'Media'}
                    </span>
                </div>
            </div>
            <div 
                className="flex-1 overflow-y-auto p-6 space-y-4" 
                style={{ 
                    backgroundImage: `url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")`,
                    backgroundBlendMode: 'overlay',
                    backgroundColor: '#efeae2'
                }}
            >

                {historialMensajes.length > 0 ? (
                    historialMensajes.map((msg) => {

                        const estaSeleccionado = seleccionados.includes(msg.id);

                        const config = getCanalConfig(msg.origen);

                        return (
                            <div 
                                key={msg.id} 
                                onClick={() => toggleSeleccion(msg.id)}
                                className={`flex flex-col w-full max-w-[85%] sm:max-w-[70%] animate-fade-in cursor-pointer transition-all ${
                                    estaSeleccionado ? 'ring-2 ring-blue-500 scale-[1.02] rounded-xl' : ''
                                }`}
                            >
                                <div className={`relative p-3.5 rounded-xl rounded-tl-none shadow-xs ${config.bgBubble} ${config.borderColor}`}>
                                    
                                    <div className="flex items-center justify-between gap-4 mb-1">
                                        <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${config.badge}`}>
                                            {config.icon}
                                            {msg.origen}
                                        </span>
                                        {estaSeleccionado && (
                                            <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-1.5 py-0.5 rounded-sm uppercase tracking-wide">
                                                Seleccionado
                                            </span>
                                        )}
                                    </div>
                                    
                                    {/* Contenido */}
                                    <p className="text-sm whitespace-pre-wrap leading-relaxed break-words text-gray-900">
                                        {msg.contenido}
                                    </p>
                                    
                                    {/* Fecha y hora */}
                                    <p className="text-right text-[10px] text-gray-500 mt-1 font-medium">
                                        {msg.fecha_envio 
                                            ? `${new Date(msg.fecha_envio).toLocaleDateString()} a las ${new Date(msg.fecha_envio).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` 
                                            : '--/--/--'}
                                    </p>
                                </div>
                                {estaSeleccionado && msg.mensaje_clasificado?.resumen && (
                                    <div className="mt-2 text-xs bg-blue-50 border border-blue-200 text-blue-800 p-2 rounded shadow-sm animate-fade-in">
                                        <span className="font-bold">Resumen IA:</span> {msg.mensaje_clasificado.resumen}
                                    </div>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <AlertTriangle className="h-8 w-8 mb-2" />
                        <p>No se encontraron mensajes en el historial.</p>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            <div className="bg-[#f0f2f5] p-4 border-t border-gray-200 flex items-center gap-3">
                <div className="flex-1">
                    <input 
                        type="text" 
                        placeholder={`Responder a través de ${mensajeDestino?.origen || 'sistema'}...`}
                        className="w-full py-2.5 px-4 rounded-lg bg-white border border-gray-300 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm shadow-2xs transition-all"
                    />
                </div>
                <button 
                    type="button"
                    className="p-2.5 bg-[#00a884] text-white rounded-lg hover:bg-[#008f72] transition-colors shadow-xs active:scale-95"
                >
                    <Send className="h-5 w-5" />
                </button>
            </div>

        </div>
    );
}