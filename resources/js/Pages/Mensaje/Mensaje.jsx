import React from 'react';
import { usePage } from '@inertiajs/react';

export default function Index(){
    const { mensajes } = usePage().props;

    return (
        <div>
            <h1>Mensajes disponibles</h1>
            <ul>
                {mensajes.map(mensaje =>(
                    <li>
                        {mensaje.contenido} - {mensaje.origen}
                    </li>
                ))}
            </ul>
        </div>

    );
}
