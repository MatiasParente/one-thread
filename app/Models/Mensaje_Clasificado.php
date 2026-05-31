<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Mensaje_Clasificado extends Model
{
    protected $table = 'mensajes_clasificados';

    protected $fillable = ['id', 'id_mensaje', 'resumen', 'prioridad', 'puntaje_confianza', 'estado', 'created_at', 'updated_at'];

    protected $appends = ['estado_label'];

    const ESTADO_PENDIENTE = 0;

    const ESTADO_EN_PROCESO = 1;

    const ESTADO_RESUELTO = 2;

    const ESTADO_ELIMINADO = 3;

    const ESTADOS = [
        self::ESTADO_PENDIENTE => 'Pendiente',
        self::ESTADO_EN_PROCESO => 'En proceso',
        self::ESTADO_RESUELTO => 'Resuelto',
        self::ESTADO_ELIMINADO => 'Eliminado',
    ];

    public function getEstadoLabelAttribute(): string
    {
        return self::ESTADOS[$this->estado] ?? 'Desconocido';
    }

    //
    public function tipo_mensaje(): HasMany
    {
        return $this->hasMany(Tipo_Mensaje::class, 'id_mensaje');
    }

    public function mensaje(): BelongsTo
    {
        return $this->belongsTo(Mensaje::class, 'id_mensaje');
    }

    // Relación con Tipo a través de tipo_mensaje
    // Obtiene todos los tipos que están asociados a este mensaje clasificado.
    public function tipos()
    {
        return $this->belongsToMany(
            Tipo::class,
            'tipo_mensaje',
            'id_mensaje',
            'id_tipo'
        );
    }
}
