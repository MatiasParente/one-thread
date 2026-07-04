<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $user = $this->user();
        $admin = $user?->admin;
        $esGeneral = $admin
            ? $admin->categorias()->where('nombre', 'General')->exists()
            : false;

        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', Rule::unique(User::class)->ignore($user->id)],
            'telefono' => ['required', 'string', 'max:20'],
            'categorias_ids' => $esGeneral ? ['required', 'array'] : ['sometimes'],
        ];
    }
}
