import Button from '@/Components/Button';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <GuestLayout>
            <Head title="Verificar Email" />

            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                ¡Gracias por registrarte! Antes de comenzar, ¿podrías verificar
                tu dirección de correo electrónico haciendo clic en el enlace que te acabamos de enviar por correo electrónico?
                Si no recibiste el correo electrónico, con gusto te enviaremos otro.
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                    Un nuevo enlace de verificación ha sido enviado a tu correo electrónico registrado.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <Button type="submit" disabled={processing}>
                        Reenviar Email de verificación
                    </Button>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                    >
                        Cerrar Sesión
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
