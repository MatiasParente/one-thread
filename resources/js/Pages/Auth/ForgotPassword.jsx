import InputError from '@/Components/InputError';
import Button from '@/Components/Button';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Olvidaste tu contraseña?" />

            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                ¿Olvidaste tu contraseña? No hay problema. Solo envíanos tu correo
                y te enviaremos un enlace para restablecer tu contraseña.
            </div>

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600 dark:text-green-400">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="mt-4 flex items-center justify-end">
                    <Button type="submit" className="ms-4" disabled={processing}>
                        Enviar enlace
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
