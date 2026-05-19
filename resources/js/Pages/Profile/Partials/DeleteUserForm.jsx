import Button from '@/Components/Button';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { ShieldAlert } from 'lucide-react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header className="pb-4 border-b border-red-100">
                <h2 className="text-lg font-bold text-red-700 flex items-center gap-2">
                    <ShieldAlert className="h-5 w-5 text-red-600 animate-pulse" />
                    Zona de Peligro: Eliminar Cuenta
                </h2>

                <p className="mt-1 text-sm text-red-600/80">
                    Una vez eliminada la cuenta, todos los recursos, datos, chats e historial de asignaciones se perderán de manera irreversible. Procede con extrema precaución.
                </p>
            </header>

            <div>
                <Button variant="danger" onClick={confirmUserDeletion}>
                    Eliminar Mi Cuenta Permanentemente
                </Button>
            </div>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6 bg-white rounded-md">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <ShieldAlert className="h-5 w-5 text-red-600" />
                        ¿Estás seguro de que deseas eliminar tu cuenta?
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        Esta acción es irreversible y eliminará todos tus accesos del sistema inmediatamente. Por favor, introduce tu contraseña actual para verificar y confirmar la eliminación definitiva.
                    </p>

                    <div className="mt-4">
                        <InputLabel
                            htmlFor="password"
                            value="Contraseña"
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="mt-1 block w-full sm:w-3/4"
                            isFocused
                            placeholder="Introduce tu contraseña actual"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <Button variant="secondary" onClick={closeModal}>
                            Cancelar
                        </Button>

                        <Button type="submit" variant="danger" disabled={processing}>
                            Sí, Eliminar Cuenta Definitivamente
                        </Button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
