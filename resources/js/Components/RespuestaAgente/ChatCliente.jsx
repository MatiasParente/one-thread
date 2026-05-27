import React, { useEffect, useRef, useMemo } from 'react';
import { Send, ArrowLeft, MessageSquare, Mail, SendHorizontal, AlertTriangle, User } from 'lucide-react';
import { Link, useForm } from '@inertiajs/react';

export default function ChatCliente({ mensajeClasificado, historialMensajes = [] }) {
    const msgOriginal = mensajeClasificado?.mensaje;
    const cliente = msgOriginal?.mensajeros;
    const messagesEndRef = useRef(null);

    const { data, setData, post, processing, reset, errors } = useForm({
        respuesta: '',
        seleccionados: [],
        canal_seleccionado: msgOriginal?.origen || 'WhatsApp', 
    });

    const toggleSeleccion = (id) => {
        if (data.seleccionados.includes(id)) {
            setData('seleccionados', data.seleccionados.filter(id_sel => id_sel !== id));
        } else {
            setData('seleccionados', [...data.seleccionados, id]);
        }
    };

    const getPrioridadBadge = (prioridad) => {
        switch (prioridad?.toLowerCase()) {
            case 'alta': return 'bg-red-100 text-red-700 border border-red-200';
            case 'media': return 'bg-yellow-100 text-yellow-700 border border-yellow-200';
            case 'baja': return 'bg-green-100 text-green-700 border border-green-200';
            default: return 'bg-gray-100 text-gray-700 border border-gray-200';
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [historialMensajes]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (data.seleccionados.length === 0) {
            alert("Por favor, selecciona al menos un mensaje para responder.");
            return;
        }
        post(route('mensajes.responder'), {
            onSuccess: () => {
                reset('respuesta', 'seleccionados');
            }
        });
    };

    const chatConversacion = useMemo(() => {
        let combinados = [];
        let respuestasAdminGlobales = [];
        let llavesDeDuplicacion = new Set();

        historialMensajes.forEach(msg => {
            combinados.push({
                ...msg,
                es_admin: false,
                fecha_orden: msg.fecha_envio ? new Date(msg.fecha_envio).getTime() : 0
            });

            if (msg.admin_mensajes && msg.admin_mensajes.length > 0) {
                msg.admin_mensajes.forEach(resp => {
                    const fechaMinuto = resp.fecha_respuesta ? resp.fecha_respuesta.substring(0, 16) : '';
                    const claveUnica = `${resp.respuesta}_${fechaMinuto}`;

                    if (!llavesDeDuplicacion.has(claveUnica)) {
                        llavesDeDuplicacion.add(claveUnica);
                        respuestasAdminGlobales.push({
                            ...resp,
                            es_admin: true,
                            fecha_orden: resp.fecha_respuesta ? new Date(resp.fecha_respuesta).getTime() : 0
                        });
                    }
                });
            }
        });

        const conversacionCompleta = [...combinados, ...respuestasAdminGlobales];
        return conversacionCompleta.sort((a, b) => a.fecha_orden - b.fecha_orden);
    }, [historialMensajes]);

    const getCanalConfig = (origen) => {
        const canal = origen?.toLowerCase();
        switch (canal) {
            case 'whatsapp': return { bgBubble: 'bg-white', borderColor: 'border-l-4 border-l-[#25D366]', badge: 'bg-[#25D366] text-white', icon: <MessageSquare className="h-3 w-3" /> };
            case 'telegram': return { bgBubble: 'bg-white', borderColor: 'border-l-4 border-l-[#32afed]', badge: 'bg-[#32afed] text-white', icon: <SendHorizontal className="h-3 w-3" /> };
            case 'email': return { bgBubble: 'bg-white', borderColor: 'border-l-4 border-l-[#EA4335]', badge: 'bg-[#EA4335] text-white', icon: <Mail className="h-3 w-3" /> };
            default: return { bgBubble: 'bg-white', borderColor: 'border-l-4 border-l-gray-300', badge: 'bg-gray-500 text-white', icon: <MessageSquare className="h-3 w-3" /> };
        }
    };

    const headerConfig = msgOriginal?.origen?.toLowerCase() === 'whatsapp' ? 'bg-[#075E54]' : 
                        msgOriginal?.origen?.toLowerCase() === 'telegram' ? 'bg-[#0088cc]' : 
                        msgOriginal?.origen?.toLowerCase() === 'email' ? 'bg-[#EA4335]' : 'bg-gray-700';

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-md overflow-hidden border border-gray-200 my-4">
            
            {/* Header */}
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
                        <span className="text-xs opacity-75">Historial multicanal</span>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div 
                className="flex-1 overflow-y-auto p-6 space-y-4" 
                style={{ 
                    backgroundImage: `url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")`,
                    backgroundBlendMode: 'overlay',
                    backgroundColor: '#efeae2'
                }}
            >
                {chatConversacion.length > 0 ? (
                    chatConversacion.map((item, index) => {
                        
                        if (item.es_admin) {
                            return (
                                <div key={`admin-${item.id}-${index}`} className="flex flex-col w-full max-w-[85%] sm:max-w-[75%] ml-auto items-end animate-fade-in">
                                    <div className="relative p-3.5 rounded-xl rounded-tr-none shadow-sm bg-[#D9FDD3] border border-[#a3e49b] text-gray-900 min-w-[200px]">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                                                <User className="h-3 w-3" /> {item.admin?.name || 'Yo'}
                                            </span>
                                            <span className="text-[10px] font-semibold text-gray-500 uppercase">
                                                Vía {item.canal_envio}
                                            </span>
                                        </div>
                                        <p className="text-sm whitespace-pre-wrap leading-relaxed break-words">
                                            {item.respuesta}
                                        </p>
                                        <p className="text-right text-[10px] text-gray-500 mt-1 font-medium">
                                            {item.fecha_respuesta ? `${new Date(item.fecha_respuesta).toLocaleDateString()} ${new Date(item.fecha_respuesta).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}` : ''}
                                        </p>
                                    </div>
                                </div>
                            );
                        }

                        const msg = item;
                        const estaSeleccionado = data.seleccionados.includes(msg.id);
                        const config = getCanalConfig(msg.origen);
                        const yaRespondido = msg.admin_mensajes && msg.admin_mensajes.length > 0;

                        return (
                            <div 
                                key={`cliente-${msg.id}`} 
                                onClick={() => toggleSeleccion(msg.id)}
                                className={`flex flex-col w-full max-w-[85%] sm:max-w-[75%] animate-fade-in cursor-pointer transition-all ${
                                    yaRespondido ? 'opacity-70 hover:opacity-100' : ''
                                } ${
                                    estaSeleccionado ? 'ring-2 ring-blue-500 scale-[1.01] rounded-xl' : ''
                                }`}
                            >
                                <div className={`relative p-3.5 rounded-xl rounded-tl-none shadow-sm ${config.bgBubble} ${config.borderColor}`}>
                                    
                                    {/* Cabecera balanceada: Canal a la izquierda, prioridad a la derecha */}
                                    <div className="flex items-center justify-between gap-4 mb-2">
                                        <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${config.badge}`}>
                                            {config.icon} {msg.origen}
                                        </span>
                                        
                                        <div className="flex items-center gap-2">
                                            {msg.mensaje_clasificado?.prioridad && (
                                                <span className={`inline-flex items-center px-1.5 py-0.5 rounded-sm text-[9px] font-bold uppercase ${getPrioridadBadge(msg.mensaje_clasificado.prioridad)}`}>
                                                    {msg.mensaje_clasificado.prioridad}
                                                </span>
                                            )}
                                            {estaSeleccionado && (
                                                <span className="bg-blue-600 text-white text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-sm shadow-xs">
                                                    Seleccionado
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <p className="text-sm whitespace-pre-wrap leading-relaxed break-words text-gray-900">
                                        {msg.contenido}
                                    </p>
                                    
                                    <p className="text-right text-[10px] text-gray-500 mt-1 font-medium flex justify-end items-center gap-2">
                                        {msg.fecha_envio ? `${new Date(msg.fecha_envio).toLocaleDateString()} ${new Date(msg.fecha_envio).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}` : '--/--/--'}
                                        {yaRespondido && <span className="text-emerald-600 font-bold">✓✓</span>}
                                    </p>
                                </div>

                                {estaSeleccionado && (
                                    <div className="mt-2 ml-2 space-y-2 border-l-2 border-blue-400 pl-3 animate-fade-in">
                                        {msg.mensaje_clasificado?.resumen && (
                                            <div className="text-xs bg-blue-50/90 border border-blue-200 text-blue-900 p-2 rounded shadow-2xs">
                                                <span className="font-bold block text-blue-700 mb-0.5">Resumen IA:</span>
                                                {msg.mensaje_clasificado.resumen}
                                            </div>
                                        )}
                                        {msg.admin_mensajes && msg.admin_mensajes.length > 0 && (
                                            <div className="text-[10px] text-gray-500 italic bg-gray-50 px-2 py-1 rounded border border-gray-200">
                                                Este mensaje ya fue respondido {msg.admin_mensajes.length} vez/veces.
                                            </div>
                                        )}
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

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="bg-[#f0f2f5] p-4 border-t border-gray-200 flex flex-col gap-2">
                {errors.seleccionados && <p className="text-xs text-red-600 font-semibold px-1">{errors.seleccionados}</p>}
                
                <div className="flex items-center gap-3">
                    <div className="w-36 shrink-0">
                        <select
                            value={data.canal_seleccionado}
                            onChange={e => setData('canal_seleccionado', e.target.value)}
                            className="w-full py-2 px-2.5 rounded-lg bg-white border border-gray-300 focus:outline-none focus:border-emerald-500 text-xs font-medium shadow-2xs cursor-pointer h-[40px]"
                        >
                            <option value="WhatsApp">WhatsApp</option>
                            <option value="Telegram">Telegram</option>
                            <option value="Email">Email</option>
                        </select>
                    </div>

                    <div className="flex-1">
                        <input 
                            type="text" 
                            value={data.respuesta}
                            onChange={e => setData('respuesta', e.target.value)}
                            required
                            placeholder={
                                data.seleccionados.length > 0 
                                ? `Responder ${data.seleccionados.length} mensaje(s) vía ${data.canal_seleccionado}...`
                                : "Selecciona mensajes del cliente para responder..."
                            }
                            disabled={data.seleccionados.length === 0}
                            className="w-full py-2.5 px-4 rounded-lg bg-white border border-gray-300 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-sm shadow-2xs disabled:bg-gray-200 disabled:cursor-not-allowed h-[40px]"
                        />
                    </div>

                    <button 
                        type="submit"
                        disabled={processing || data.seleccionados.length === 0 || !data.respuesta.trim()}
                        className="p-2.5 bg-[#00a884] text-white rounded-lg hover:bg-[#008f72] transition-colors shadow-xs active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed h-[40px] w-[40px] flex items-center justify-center"
                    >
                        <Send className="h-4 w-4" />
                    </button>
                </div>
            </form>
        </div>
    );
}