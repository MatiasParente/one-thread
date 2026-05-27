<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Admin_Mensaje extends Model
{
    protected $table = 'admin_mensaje';

    protected $fillable = [
        'id_admin',
        'id_mensaje',
        'respuesta',
        'canal_envio',
        'puntaje',
        'comentarios_cliente',
        'fecha_respuesta',
    ];

    protected $casts = [
        'fecha_respuesta' => 'datetime',
        'puntaje' => 'integer',
    ];

    public function mensaje(): BelongsTo
    {
        return $this->belongsTo(Mensaje::class, 'id_mensaje');
    }

    public function admin(): BelongsTo
    {
        return $this->belongsTo(Admin::class, 'id_admin');
    }
}
