import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    icon: Icon,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'flex items-center gap-3 rounded-sm px-4 py-2 text-sm font-medium transition-colors duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-l-2 border-primary bg-primary-light text-primary'
                    : 'border-l-2 border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900') +
                ' ' +
                className
            }
        >
            {Icon && <Icon size={20} />}
            {children}
        </Link>
    );
}
