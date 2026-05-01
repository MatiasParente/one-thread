<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// app/Models/Admin.php
class Admin extends Model
{
    // Laravel por defecto buscará 'admins', así que esto está bien:
    protected $table = 'admins'; 

    protected $fillable = [
        'id_user', 
        'nombre', 
        'telefono',
        // NO incluyas id_categoria aquí porque no existe en esta tabla
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }

    public function categorias()
    {
        return $this->belongsToMany(
            Categoria::class, 
            'admin_categorias', // nombre de la tabla pivote
            'id_admin',         // FK en la pivote que apunta a admins
            'id_categoria'      // FK en la pivote que apunta a categorias
        );
    }
}