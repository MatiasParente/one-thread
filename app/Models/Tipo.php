<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tipo extends Model
{
    protected $fillable = ['id', 'nombre', 'id_categoria', 'created_at', 'updated_at'];

    public function categoria(): BelongsTo
    {
        return $this->belongsTo(Categoria::class, 'id_categoria');
    }

    public function tipo_mensaje(): HasMany
    {
        return $this->hasMany(Tipo_Mensaje::class, 'id_tipo');
    }

    // Relación con Mensaje_Clasificado a través de tipo_mensaje
    // Obtiene todos los mensajes clasificados que tienen asociado este tipo.
    public function mensajes()
    {
        return $this->belongsToMany(
            Mensaje_Clasificado::class,
            'tipo_mensaje',
            'id_tipo',
            'id_mensaje'
        );
    }
}
