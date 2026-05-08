import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            colors: {
                primary: '#226583',
                'primary-hover': '#1a506a',
                'primary-light': '#e8f1f6',
                danger: '#C41E3A',
                success: '#308230',
                warning: '#B8860B',
                'channel-telegram': '#226583',
                'channel-whatsapp': '#075E54',
                'channel-email': '#6B7280',
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            borderRadius: {
                sm: '4px',
                md: '8px',
                lg: '12px',
            },
            boxShadow: {
                sm: '0 1px 2px rgba(0,0,0,0.05)',
                md: '0 4px 6px rgba(0,0,0,0.07)',
                lg: '0 10px 15px rgba(0,0,0,0.1)',
            },
        },
    },

    plugins: [forms],
};
