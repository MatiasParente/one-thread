import Sidebar from '@/Components/Sidebar';
import { useState, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { Menu } from 'lucide-react';
import Swal from 'sweetalert2';

export default function AuthenticatedLayout({ title, subtitle, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const user = usePage().props.auth.user;
    const initials = user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    useEffect(() => {
        return router.on('navigate', () => {
            setSidebarOpen(false);
        });
    }, []);

    const flash = usePage().props.flash;

    useEffect(() => {
        if (flash?.success) {
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: flash.success,
                timer: 3000,
                showConfirmButton: false
            });
        }
        if (flash?.error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: flash.error,
            });
        }
    }, [flash]);

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            <Sidebar
                show={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="flex min-w-0 flex-1 flex-col lg:ml-0">
                <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 lg:px-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="rounded-sm p-1 text-gray-500 hover:bg-gray-50 hover:text-gray-700 lg:hidden"
                        >
                            <Menu size={24} />
                        </button>

                        {title && (
                            <div>
                                <h1 className="text-lg font-bold leading-tight text-gray-900">
                                    {title}
                                </h1>
                                {subtitle && (
                                    <p className="text-sm text-gray-500">
                                        {subtitle}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    <Link
                        href={route('profile.edit')}
                        className="flex items-center gap-3 rounded-md px-2 py-1 transition-colors hover:bg-gray-50"
                    >
                        <span className="hidden text-sm font-medium text-gray-700 sm:block">
                            {user.name}
                        </span>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-light text-xs font-semibold text-primary">
                            {initials}
                        </div>
                    </Link>
                </header>

                <main className="flex-1 overflow-y-auto p-4 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
