<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Tipo extends Model
{
    protected $fillable = ['id','nombre','id_categoria','created_at','updated_at'];
    public function categorias(): BelongsTo
    {
        return $this->belongsTo(Categoria::class);
    }

    public function tipo_mensaje(): HasMany
    {
        return $this->hasMany(Tipo::class);
    }
}
