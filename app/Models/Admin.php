<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Admin extends Model
{
    //

    public function admin_categorias(): HasMany
    {
        return $this->hasMany(Admin_Categoria::class);
    }

    public function admin_mensaje(): HasMany{
        return $this->hasMany(Admin_Mensaje::class);
    }
}
