import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';

export default function Edit({ mustVerifyEmail, status, admin, allCategorias }) {
    return (
        <AuthenticatedLayout
            title="Mi Perfil"
            subtitle="Configuración y datos personales de tu cuenta"
        >
            <Head title="Mi Perfil" />

            <div className="space-y-6 max-w-3xl">
                {/* Profile Info Form Section */}
                <div className="bg-white p-6 rounded-md border border-gray-200 shadow-sm">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                        admin={admin}
                        allCategorias={allCategorias}
                    />
                </div>

                {/* Password Update Form Section */}
                <div className="bg-white p-6 rounded-md border border-gray-200 shadow-sm">
                    <UpdatePasswordForm />
                </div>

                {/* Delete Account Form Section */}
                <div className="bg-white p-6 rounded-md border border-gray-200 border-red-100 shadow-sm bg-red-50/20">
                    <DeleteUserForm />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}