import Sidebar from '@/Components/Sidebar';
import { useState } from 'react';
import { Menu } from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar
                show={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="flex flex-1 flex-col lg:ml-0">
                <header className="flex h-16 items-center border-b border-gray-200 bg-white px-4 lg:px-6">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="rounded-sm p-1 text-gray-500 hover:bg-gray-50 hover:text-gray-700 lg:hidden"
                    >
                        <Menu size={24} />
                    </button>

                    {header && (
                        <div className="ml-4 lg:ml-0">
                            {header}
                        </div>
                    )}
                </header>

                <main className="flex-1 p-4 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
