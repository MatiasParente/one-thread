import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register({ categorias }) {
    // Definimos el formulario UNIFICADO con el hook de Inertia React
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        telefono: '',
        categorias_ids: [], // Array para los checkboxes
        password: '',
        password_confirmation: '',
    });

    // Manejo de los Checkboxes para las categorías
    const handleCategoryChange = (id) => {
        let newCategories = [...data.categorias_ids];
        if (newCategories.includes(id)) {
            // Si ya está, lo quitamos
            newCategories = newCategories.filter((catId) => catId !== id);
        } else {
            // Si no está, lo agregamos
            newCategories.push(id);
        }
        setData('categorias_ids', newCategories);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Registro de Administrador" />

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="name" value="Nombre Completo" />
                    <TextInput
                        id="name"
                        name="name"
                        value={data.name}
                        className="mt-1 block w-full"
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="email" value="Correo Electrónico" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="telefono" value="Teléfono" />
                    <TextInput
                        id="telefono"
                        type="text"
                        name="telefono"
                        value={data.telefono}
                        className="mt-1 block w-full"
                        placeholder="+598..."
                        onChange={(e) => setData('telefono', e.target.value)}
                        required
                    />
                    <InputError message={errors.telefono} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Contraseña" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="Confirmar Contraseña" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <div className="mt-4 border-t pt-4 border-gray-100">
                    <span className="block font-medium text-sm text-gray-700 mb-2">Asignar a Categorías:</span>
                    <div className="grid grid-cols-2 gap-2">
                        {categorias.map((cat) => (
                            <div key={cat.id} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`cat-${cat.id}`}
                                    value={cat.id}
                                    checked={data.categorias_ids.includes(cat.id)}
                                    onChange={() => handleCategoryChange(cat.id)}
                                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500"
                                />
                                <label
                                    htmlFor={`cat-${cat.id}`}
                                    className="ml-2 text-sm text-gray-600 cursor-pointer"
                                >
                                    {cat.nombre}
                                </label>
                            </div>
                        ))}
                    </div>
                    <InputError message={errors.categorias_ids} className="mt-2" />
                </div>

                <div className="mt-6 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        ¿Ya tienes cuenta?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Registrar Administrador
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}