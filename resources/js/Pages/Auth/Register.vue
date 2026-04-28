<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import TextInput from '@/Components/TextInput.vue';
import { Head, Link, useForm } from '@inertiajs/vue3';

// Recibimos las categorías desde el controlador
const props = defineProps({
    categorias: Array,
});

// Definimos el formulario UNIFICADO
const form = useForm({
    name: '',
    email: '',
    telefono: '',        // Campo nuevo
    categorias_ids: [],  // Array para los checkboxes
    password: '',
    password_confirmation: '',
});

const submit = () => {
    form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template>
    <GuestLayout>
        <Head title="Registro de Administrador" />

        <form @submit.prevent="submit">
            <div>
                <InputLabel for="name" value="Nombre Completo" />
                <TextInput
                    id="name"
                    type="text"
                    class="mt-1 block w-full"
                    v-model="form.name"
                    required
                    autofocus
                    autocomplete="name"
                />
                <InputError class="mt-2" :message="form.errors.name" />
            </div>

            <div class="mt-4">
                <InputLabel for="email" value="Correo Electrónico" />
                <TextInput
                    id="email"
                    type="email"
                    class="mt-1 block w-full"
                    v-model="form.email"
                    required
                    autocomplete="username"
                />
                <InputError class="mt-2" :message="form.errors.email" />
            </div>

            <div class="mt-4">
                <InputLabel for="telefono" value="Teléfono" />
                <TextInput
                    id="telefono"
                    type="text"
                    class="mt-1 block w-full"
                    v-model="form.telefono"
                    required
                    placeholder="+598..."
                />
                <InputError class="mt-2" :message="form.errors.telefono" />
            </div>

            <div class="mt-4">
                <InputLabel for="password" value="Contraseña" />
                <TextInput
                    id="password"
                    type="password"
                    class="mt-1 block w-full"
                    v-model="form.password"
                    required
                    autocomplete="new-password"
                />
                <InputError class="mt-2" :message="form.errors.password" />
            </div>

            <div class="mt-4">
                <InputLabel for="password_confirmation" value="Confirmar Contraseña" />
                <TextInput
                    id="password_confirmation"
                    type="password"
                    class="mt-1 block w-full"
                    v-model="form.password_confirmation"
                    required
                    autocomplete="new-password"
                />
                <InputError class="mt-2" :message="form.errors.password_confirmation" />
            </div>

            <div class="mt-4 border-t pt-4 border-gray-100">
                <span class="block font-medium text-sm text-gray-700 mb-2">Asignar a Categorías:</span>
                <div class="grid grid-cols-2 gap-2">
                    <div v-for="cat in categorias" :key="cat.id" class="flex items-center">
                        <input 
                            type="checkbox" 
                            :id="'cat-' + cat.id"
                            :value="cat.id" 
                            v-model="form.categorias_ids" 
                            class="rounded border-gray-300 text-blue-600 shadow-sm focus:ring-blue-500"
                        />
                        <label :for="'cat-' + cat.id" class="ml-2 text-sm text-gray-600 cursor-pointer">
                            {{ cat.nombre }}
                        </label>
                    </div>
                </div>
                <InputError class="mt-2" :message="form.errors.categorias_ids" />
            </div>

            <div class="mt-6 flex items-center justify-end">
                <Link
                    :href="route('login')"
                    class="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    ¿Ya tienes cuenta?
                </Link>

                <PrimaryButton
                    class="ms-4"
                    :class="{ 'opacity-25': form.processing }"
                    :disabled="form.processing"
                >
                    Registrar Administrador
                </PrimaryButton>
            </div>
        </form>
    </GuestLayout>
</template>