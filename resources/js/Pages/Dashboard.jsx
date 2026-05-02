import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({auth}) {

    //ahora es una lista estatica, luego se obtiene de lo que recibamos con inertia
    const conversations = [
        {id:1, contact: 'Juan Perez', preview: 'Hola! El cargador viene fallido...', channel: 'WhatsApp', unread:true},
        {id:2, contact: 'Maria Lopez', preview: 'Hola! Buen dia...', channel: 'Facebook', unread:false},
        {id:3, contact: 'Pedro Gomez', preview: 'Hola! Ya lo recibi, muchas gracias', channel: 'WhatsApp', unread:true}
    ]

    const nombre = auth.user.name;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Bienvenido {nombre} 
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7x1 sm:px-6 lg:px-8">
                    {/* Usamos .map() que nos permite recorrrer el array y renderizar un componente por cada conversacion */}
                    <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg overflow-hidden">
                        {conversations.map((conversation) => (
                            <ConversationItem
                                key={conversation.id}
                                conversation={conversation}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


// Este es un componente hijo, lo ideal es que este en otro archivo, no aqui, por ahora esta aqui
function ConversationItem ({conversation}) {
return(
    <div className="flex items-center gap-4 p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
        
        {/* Avatar con la inicial del nombre*/}
        <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center flex-shrink-0">
            <span className="text-indigo-600 dark:text-indigo-300 font-medium text-sm">
                {conversation.contact[0]}
            </span>
        </div>

        {/*Contenido Principal*/}
        <div className="flex-1 min-w-0">
            <div className=" flex items-center justify-between">
                <span className="flex items-center justify-between">
                    {conversation.contact}
                </span>
                <span className="text-xs text-gray-400 ml-2">
                        {conversation.channel}
                </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {conversation.preview}
            </p>
        </div>

        {/*Indicador de que no esta leido */}
        {conversation.unread && (
            <div className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0"></div>
        )}
        
    </div>
);
}
