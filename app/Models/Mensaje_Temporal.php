<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mensaje_Temporal extends Model
{
    protected $table = 'mensajes_temporal';

    protected $fillable = ['canal_id', 'canal', 'nombre', 'apellido', 'contenido', 'necesita_recuperacion', 'created_at', 'updated_at'];
}
