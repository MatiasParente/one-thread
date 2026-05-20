<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Mensaje extends Model
{
    protected $fillable = ['id', 'contenido', 'origen', 'fecha_envio', 'id_mensajero', 'created_at', 'updated_at'];

    //
    public function mensaje_clasificado(): HasOne
    {
        return $this->hasOne(Mensaje_Clasificado::class, 'id_mensaje');
    }

    public function mensajeros(): BelongsTo
    {
        return $this->belongsTo(Mensajero::class, 'id_mensajero');
    }

    public function admin_mensajes(): HasMany
    {
        return $this->hasMany(Admin_Mensaje::class, 'id_mensaje');
    }
}
