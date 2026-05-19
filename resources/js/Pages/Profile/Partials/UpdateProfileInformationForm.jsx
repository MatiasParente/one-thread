import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Button from '@/Components/Button';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';
import { User, Mail, Phone, FolderHeart } from 'lucide-react';

export default function UpdateProfileInformation({ mustVerifyEmail, status, admin, allCategorias, className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        telefono: admin?.telefono || '',
        categorias_ids: admin?.categorias?.map(cat => cat.id) || [],
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    const handleCategoryChange = (id) => {
        let newIds = [...data.categorias_ids];
        if (newIds.includes(id)) {
            newIds = newIds.filter(catId => catId !== id);
        } else {
            newIds.push(id);
        }
        setData('categorias_ids', newIds);
    };

    return (
        <section className={className}>
            <header className="pb-4 border-b border-gray-100 mb-6">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <User className="h-5 w-5 text-[#226583]" />
                    Información del Perfil
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    Actualiza los datos personales, de contacto y áreas de atención asignadas a tu cuenta.
                </p>
            </header>

            <form onSubmit={submit} className="space-y-6">
                {/* Name */}
                <div className="space-y-1.5">
                    <InputLabel htmlFor="name" value="Nombre Completo" className="text-xs font-semibold text-gray-600 uppercase" />
                    <div className="relative">
                        <TextInput
                            id="name"
                            className="block w-full pl-3"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            isFocused
                            autoComplete="name"
                        />
                    </div>
                    <InputError className="mt-2" message={errors.name} />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                    <InputLabel htmlFor="email" value="Correo Electrónico" className="text-xs font-semibold text-gray-600 uppercase" />
                    <TextInput
                        id="email"
                        type="email"
                        className="block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />
                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md text-sm text-yellow-800">
                        <p className="font-semibold">Tu dirección de correo no está verificada.</p>
                        <Link
                            href={route('verification.send')}
                            method="post"
                            as="button"
                            className="mt-1 text-xs font-bold underline hover:text-yellow-950 focus:outline-none"
                        >
                            Haz clic aquí para reenviar el correo de verificación.
                        </Link>
                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-xs font-semibold text-green-600">
                                Se ha enviado un nuevo enlace de verificación a tu correo.
                            </div>
                        )}
                    </div>
                )}

                {/* Phone */}
                <div className="space-y-1.5">
                    <InputLabel htmlFor="telefono" value="Teléfono / Celular" className="text-xs font-semibold text-gray-600 uppercase" />
                    <TextInput
                        id="telefono"
                        type="text"
                        className="block w-full"
                        value={data.telefono}
                        onChange={(e) => setData('telefono', e.target.value)}
                        required
                        placeholder="Ej. +598 99 123 456"
                    />
                    <InputError className="mt-2" message={errors.telefono} />
                </div>

                {/* Assigned Categories */}
                <div className="space-y-2 pt-2 border-t border-gray-100">
                    <InputLabel value="Mis Categorías / Áreas Asignadas" className="text-xs font-semibold text-gray-600 uppercase flex items-center gap-1.5" />
                    <p className="text-xs text-gray-400">Recibirás y podrás gestionar las consultas asociadas a las siguientes áreas marcadas:</p>
                    
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 mt-2 bg-gray-50 p-4 rounded-md border border-gray-200">
                        {allCategorias?.map((cat) => (
                            <div key={cat.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`edit-cat-${cat.id}`}
                                    value={cat.id}
                                    checked={data.categorias_ids.includes(cat.id)}
                                    onChange={() => handleCategoryChange(cat.id)}
                                    className="rounded border-gray-300 text-[#226583] focus:ring-[#226583] shadow-sm h-4 w-4"
                                />
                                <label 
                                    htmlFor={`edit-cat-${cat.id}`} 
                                    className="ml-2 text-sm text-gray-700 font-medium cursor-pointer selection:bg-transparent"
                                >
                                    {cat.nombre}
                                </label>
                            </div>
                        ))}
                    </div>
                    <InputError className="mt-2" message={errors.categorias_ids} />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                    <Button type="submit" disabled={processing} className="min-w-[140px]">
                        Guardar Cambios
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
                            ¡Guardado con éxito!
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}