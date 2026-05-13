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
            'admin_categorias',
            'id_admin',
            'id_categoria'
        );
    }

    /**
     * Mensajes crudos asignados a este admin (ManyToMany via admin_mensaje).
     * Permite acceder a los mensajes que el agente tiene asignados.
     */
    public function mensajes()
    {
        return $this->belongsToMany(
            Mensaje::class,
            'admin_mensaje',
            'id_admin',
            'id_mensaje'
        );
    }
}
