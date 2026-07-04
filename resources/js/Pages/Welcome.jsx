import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, canLogin, canRegister }) {
    return (
        <>
            <Head title="Bienvenido a One Thread" />

            <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased relative overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
                <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>

                <nav className="absolute top-0 right-0 p-6 flex justify-end items-center space-x-6 z-50 w-full pointer-events-auto">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="text-sm font-bold text-blue-800 hover:text-blue-500 transition relative cursor-pointer"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <Link
                            href={route('login')}
                            className="text-sm font-bold px-6 py-2.5 bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all relative cursor-pointer"
                        >
                            Entrar
                        </Link>
                    )}
                </nav>

                <main className="flex flex-col items-center justify-center pb-16 px-6 relative z-10">
                    <div className="text-center">
                        <img src="https://res.cloudinary.com/dp2oavkr0/image/upload/v1781278576/one-thread_pc0mgu.png" alt="One Thread" width="740" height="640" class="transition-transform duration-300 ease-in-out hover:scale-110" />
                        <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
                            Unificamos tus mensajes de Gmail y Telegram en un solo canal. <br/>
                            Responde, gestiona tus agentes y organiza la información en un solo lugar.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
                            <a 
                                href="https://t.me/OneThread_bot" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-8 py-3.5 bg-[#0088cc] text-white font-semibold rounded-full hover:bg-[#0077b5] hover:scale-105 transition-all shadow-lg shadow-[#0088cc]/30"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                                Probar Bot Telegram
                            </a>
                            <a 
                                href="mailto:soporte.onethread@gmail.com"
                                className="flex items-center gap-2 px-8 py-3.5 bg-white text-slate-700 border border-slate-200 font-semibold rounded-full hover:bg-slate-50 hover:text-red-500 hover:border-red-200 hover:scale-105 transition-all shadow-sm"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                                Contactar por Correo
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
                        
                        <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-blue-100 shadow-xl shadow-blue-900/5 hover:-translate-y-2 transition-transform duration-300">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">Proyecto Académico UTEC</h2>
                            <p className="text-slate-600 leading-relaxed">
                                Proyecto academico para UTEC donde se busca unificar los mensajes de Gmail y Telegram en un solo canal, permitiendo gestionar todas las conversaciones desde una interfaz de forma eficiente.
                            </p>
                        </div>

                        <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-green-100 shadow-xl shadow-green-900/5 hover:-translate-y-2 transition-transform duration-300">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">Tecnologías</h2>
                            <ul className="space-y-3 text-slate-600 font-medium">
                                <li className="flex items-center"><span className="text-green-500 mr-3">-</span> Laravel (Backend)</li>
                                <li className="flex items-center"><span className="text-green-500 mr-3">-</span> React & Inertia.js</li>
                                <li className="flex items-center"><span className="text-green-500 mr-3">-</span> Tailwind CSS</li>
                                <li className="flex items-center"><span className="text-green-500 mr-3">-</span> Laravel cloud</li>
                                <li className="flex items-center"><span className="text-green-500 mr-3">-</span> n8n</li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-3xl shadow-xl shadow-blue-900/20 text-white hover:-translate-y-2 transition-transform duration-300 border border-blue-400">
                            <h2 className="text-2xl font-bold mb-2">Nuestro Equipo</h2>
                            <p className="text-blue-100 mb-6 text-sm">Investigación y desarrollo por:</p>
                            <ul className="space-y-3 font-medium text-lg">
                                <li>- Jhon Guimaraens</li>
                                <li>- Carlos Cardozo</li>
                                <li>- Pilar Pérez</li>
                                <li>- Matías Parente</li>
                            </ul>
                        </div>
                        
                    </div>
                </main>
            </div>
        </>
    );
}