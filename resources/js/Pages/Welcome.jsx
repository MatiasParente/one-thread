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
                        <>
                            <Link
                                href={route('login')}
                                className="text-sm font-bold text-slate-600 hover:text-blue-500 transition relative cursor-pointer"
                            >
                                Entrar
                            </Link>

                            {canRegister && (
                                <Link
                                    href={route('register')}
                                    className="text-sm font-bold px-6 py-2.5 bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 transition-all relative cursor-pointer"
                                >
                                    Registrarse
                                </Link>
                            )}
                        </>
                    )}
                </nav>

                <main className="flex flex-col items-center justify-center pt-32 pb-16 px-6 relative z-10">
                    <div className="text-center">
                        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-400">
                            ONE THREAD
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto mb-20 leading-relaxed font-light">
                            Unificando tus comunicaciones de WhatsApp y Telegram con la potencia de la Inteligencia Artificial en un solo lugar.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
                        
                        <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-blue-100 shadow-xl shadow-blue-900/5 hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl mb-6">💬</div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">Solución Omnicanal</h2>
                            <p className="text-slate-600 leading-relaxed">
                                Centralizamos los mensajes de diferentes plataformas, permitiéndote gestionar todas tus conversaciones desde una interfaz única y súper eficiente.
                            </p>
                        </div>

                        <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-green-100 shadow-xl shadow-green-900/5 hover:-translate-y-2 transition-transform duration-300">
                            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center text-2xl mb-6">⚙️</div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">Tecnologías</h2>
                            <ul className="space-y-3 text-slate-600 font-medium">
                                <li className="flex items-center"><span className="text-green-500 mr-3">✔</span> Laravel (Backend)</li>
                                <li className="flex items-center"><span className="text-green-500 mr-3">✔</span> React & Inertia.js</li>
                                <li className="flex items-center"><span className="text-green-500 mr-3">✔</span> Tailwind CSS</li>
                                <li className="flex items-center"><span className="text-green-500 mr-3">✔</span> Oracle Cloud (BD)</li>
                                <li className="flex items-center"><span className="text-green-500 mr-3">✔</span> n8n & IA</li>
                            </ul>
                        </div>

                        <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 rounded-3xl shadow-xl shadow-blue-900/20 text-white hover:-translate-y-2 transition-transform duration-300 border border-blue-400">
                            <div className="w-12 h-12 bg-white/20 text-white rounded-xl flex items-center justify-center text-2xl mb-6">🚀</div>
                            <h2 className="text-2xl font-bold mb-2">Nuestro Equipo</h2>
                            <p className="text-blue-100 mb-6 text-sm">Investigación y desarrollo por:</p>
                            <ul className="space-y-3 font-medium text-lg">
                                <li>Jhon Guimaraens</li>
                                <li>Carlos Cardozo</li>
                                <li>Pilar Pérez</li>
                                <li>Matías Parente</li>
                            </ul>
                        </div>
                        
                    </div>
                </main>
            </div>
        </>
    );
}