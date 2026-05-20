import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Button from '@/Components/Button';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';
import { KeyRound } from 'lucide-react';

export default function UpdatePasswordForm({ className = '' }) {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();

        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }

                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section className={className}>
            <header className="pb-4 border-b border-gray-100 mb-6">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <KeyRound className="h-5 w-5 text-[#226583]" />
                    Actualizar Contraseña
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    Asegúrate de que tu cuenta esté utilizando una contraseña segura y aleatoria para mantener la confidencialidad.
                </p>
            </header>

            <form onSubmit={updatePassword} className="space-y-6">
                {/* Current Password */}
                <div className="space-y-1.5">
                    <InputLabel
                        htmlFor="current_password"
                        value="Contraseña Actual"
                        className="text-xs font-semibold text-gray-600 uppercase"
                    />
                    <TextInput
                        id="current_password"
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) =>
                            setData('current_password', e.target.value)
                        }
                        type="password"
                        className="block w-full"
                        autoComplete="current-password"
                    />
                    <InputError
                        message={errors.current_password}
                        className="mt-2"
                    />
                </div>

                {/* New Password */}
                <div className="space-y-1.5">
                    <InputLabel 
                        htmlFor="password" 
                        value="Nueva Contraseña" 
                        className="text-xs font-semibold text-gray-600 uppercase"
                    />
                    <TextInput
                        id="password"
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        className="block w-full"
                        autoComplete="new-password"
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                    <InputLabel
                        htmlFor="password_confirmation"
                        value="Confirmar Nueva Contraseña"
                        className="text-xs font-semibold text-gray-600 uppercase"
                    />
                    <TextInput
                        id="password_confirmation"
                        value={data.password_confirmation}
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        type="password"
                        className="block w-full"
                        autoComplete="new-password"
                    />
                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2"
                    />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                    <Button type="submit" disabled={processing} className="min-w-[170px]">
                        Cambiar Contraseña
                    </Button>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-300"
                        enterFrom="opacity-0 translate-x-2"
                        enterTo="opacity-100 translate-x-0"
                        leave="transition ease-in-out duration-300"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-green-600 font-semibold">
                            ¡Contraseña actualizada!
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
