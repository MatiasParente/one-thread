<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Categoria extends Model
{
    protected $fillable = ['id','nombre','created_at','updated_at'];
    public function admin_categorias(): HasMany{
        return $this->hasMany(Admin_Categoria::class);

    }

public function admins()
{
    return $this->belongsToMany(
        Admin::class, 
        'admin_categorias', 
        'id_categoria', 
        'id_admin'
    );
}

    public function tipo(): HasMany{
        return $this->hasMany(Tipo::class);
    }
    //
}