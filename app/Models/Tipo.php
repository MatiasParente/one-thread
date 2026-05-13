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
        return $this->hasMany(Tipo_Mensaje::class);
    }
}
