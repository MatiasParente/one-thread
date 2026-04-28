<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Mensaje_Clasificado extends Model
{
    protected $table = 'mensajes_clasificados';
    protected $fillable = ['id','id_mensaje','resumen','prioridad','puntaje_confianza','requiere_revision','created_at','updated_at']; 
    //
    public function tipo_mensaje(): HasMany
    {
        return $this->hasMany(Tipo_Mensaje::class);
    }

    public function mensaje(): BelongsTo
    {
        return $this->belongsTo(Mensaje::class);
    }
}
