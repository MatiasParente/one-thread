<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Admin extends Model
{
    //

    protected $fillable = [
        'id_user', 
        'nombre', 
        'telefono', 
        'id_categoria'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function categorias()
{
    return $this->belongsToMany(
        Categoria::class, 
        'admin_categorias',
        'id_admin',        
        'id_categoria'      
    );
}

    public function admin_mensaje(): HasMany{
        return $this->hasMany(Admin_Mensaje::class);
    }
}
