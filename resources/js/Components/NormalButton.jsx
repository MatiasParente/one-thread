import { router } from '@inertiajs/react';

export default function NormalButton({
    className = '',
    type= 'button',
    disabled,
    onClick,
    href ='',
    children,
    ...props
}) {

    const handleClick = (e) => {
        if (onClick) {
            onClick(e);
            return;
        }
        if (!disabled && href) {
            router.visit(href);
        }
    };



     return (
        <button
            {...props}
            onClick={handleClick}
            className={
                `inline-flex items-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-gray-700 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 active:bg-gray-900 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-gray-800 dark:active:bg-gray-300 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
            type={type}
        >
            {children}
        </button>
    );
}
