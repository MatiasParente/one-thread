<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Tipo_Mensaje extends Model
{
    //
    protected $table = 'tipo_mensaje';
    protected $fillable = ['id_mensaje','id_tipo','created_at','updated_at']; 

    public function tipos(): BelongsTo
    {
        return $this->belongsTo(Tipo::class);
    }

    public function mensajes(): BelongsTo
    {
        return $this->belongsTo(Mensaje_Clasificado::class);
    }
}
