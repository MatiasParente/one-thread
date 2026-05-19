<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Mensajero extends Model
{
    //
    protected $fillable = ['id', 'nombre', 'apellido', 'telefono', 'correo', 'whatsapp_id', 'telegram_id', 'instagram_id', 'created_at', 'updated_at'];

    public function mensaje(): HasMany
    {
        return $this->hasMany(Mensaje::class);
    }
}
