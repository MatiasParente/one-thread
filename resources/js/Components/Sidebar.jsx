import ApplicationLogo from '@/Components/ApplicationLogo';
import NavLink from '@/Components/NavLink';
import { Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    MessageSquare,
    Sparkles,
    FolderTree,
    Tags,
    Users,
    UserCog,
    BarChart3,
    Settings,
    User,
    LogOut,
    X,
} from 'lucide-react';

export default function Sidebar({ show, onClose }) {
    const user = usePage().props.auth.user;

    const navItems = [
        {
            label: 'Dashboard',
            href: route('dashboard'),
            active: route().current('dashboard'),
            icon: LayoutDashboard,
        },
        {
            label: 'Mensajes',
            href: route('mensajes-simples.index'),
            active: route().current('mensajes-simples.*'),
            icon: MessageSquare,
        },
        {
            label: 'Clasificados',
            href: route('mensajes-clasificados.index'),
            active: route().current('mensajes-clasificados.*'),
            icon: Sparkles,
        },
        {
            label: 'Categorías',
            href: route('categorias.index'),
            active: route().current('categorias.*'),
            icon: FolderTree,
        },
        {
            label: 'Tipos',
            href: route('tipos.index'),
            active: route().current('tipos.*'),
            icon: Tags,
        },
        {
            label: 'Usuarios',
            href: route('mensajeros.index'),
            active: route().current('mensajeros.*'),
            icon: Users,
        },
        {
            label: 'Agentes',
            href: route('agentes.index'),
            active: route().current('agentes.*'),
            icon: UserCog,
        },
        {
            label: 'Reportes',
            href: route('reportes'),
            active: route().current('reportes'),
            icon: BarChart3,
        },
        {
            label: 'Configuración',
            href: route('configuracion'),
            active: route().current('configuracion'),
            icon: Settings,
        },
    ];

    return (
        <>
            {show && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={
                    'fixed inset-y-0 left-0 z-50 flex w-60 flex-col border-r border-gray-200 bg-white transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ' +
                    (show ? 'translate-x-0' : '-translate-x-full')
                }
            >
                <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
                    <Link href={route('dashboard')}>
                        <ApplicationLogo />
                    </Link>
                    <button
                        onClick={onClose}
                        className="rounded-sm p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-600 lg:hidden"
                    >
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.label}
                            href={item.href}
                            active={item.active}
                            icon={item.icon}
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </nav>

                <div className="border-t border-gray-200 px-3 py-4 space-y-1">
                    <NavLink
                        href={route('profile.edit')}
                        active={route().current('profile.edit')}
                        icon={User}
                    >
                        Perfil
                    </NavLink>
                    <NavLink
                        href={route('logout')}
                        method="post"
                        as="button"
                        icon={LogOut}
                        className="w-full"
                    >
                        Cerrar sesión
                    </NavLink>
                </div>
            </aside>
        </>
    );
}
