import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import '../../css/mensajes.css';
import NormalButton from '@/Components/NormalButton';

export default function Dashboard({ mensajes }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            
                <NormalButton href={route('mensajes-simples.index')}>
                    Ir a mensajes
                </NormalButton>
                
                <NormalButton href={route('mensajes-clasificados.create')}>
                    Crear Mensaje
                </NormalButton>
        

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h1 className="text-lg font-semibold mb-4">Mensajes disponibles</h1>
                            <div id="containerTable">
                                <table>
                                <thead>
                                    <tr>
                                        <th>Resumen</th>
                                        <th>Prioridad</th>
                                        <th>Requiere Revision</th>
                                        <th>Accion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                        {mensajes && mensajes.length > 0 ? (
                                                mensajes.map((mensaje, index) => (
                                                    <tr key={index}>
                                                        <td> {mensaje.resumen} </td>
                                                        <td> {mensaje.prioridad} </td>
                                                        <td> {mensaje.requiere_revision ? 'Sí' : 'No'} </td>
                                                        <td>
                                                            <NormalButton href={route('mensajes-clasificados.show', mensaje.id)}> Ver Mensaje</NormalButton>
                                                        </td>
                                                    </tr>
                                                ))
                                        ) : (
                                            <p>No hay mensajes disponibles.</p>
                                        )}
                                    
                                </tbody>
                            </table>
                            </div>
                            

                        </div>
                    </div>
                </div>
            </div>


        </AuthenticatedLayout>
    );
}
