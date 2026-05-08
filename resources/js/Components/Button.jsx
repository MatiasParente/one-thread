import { router } from '@inertiajs/react';

const variantStyles = {
    primary:
        'bg-primary text-white hover:bg-primary-hover active:bg-[#153f52] focus:ring-primary',
    secondary:
        'bg-white text-gray-800 border border-gray-200 hover:bg-gray-50 active:bg-gray-100 focus:ring-gray-300',
    danger:
        'bg-danger text-white hover:bg-[#a81a32] active:bg-[#8e1428] focus:ring-danger',
    ghost:
        'text-primary hover:bg-primary-light active:bg-[#d0e3ed] focus:ring-primary',
};

const sizeStyles = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-9 px-4 text-sm',
    lg: 'h-11 px-6 text-base',
};

export default function Button({
    variant = 'primary',
    size = 'md',
    href,
    type = 'button',
    className = '',
    disabled,
    children,
    onClick,
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
            type={type}
            disabled={disabled}
            onClick={href || onClick ? handleClick : undefined}
            className={
                `inline-flex items-center justify-center rounded-md font-medium transition-colors duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 ${variantStyles[variant]} ${sizeStyles[size]} ` +
                className
            }
        >
            {children}
        </button>
    );
}
