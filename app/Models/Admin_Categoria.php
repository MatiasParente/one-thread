<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Admin_Categoria extends Model
{
    //
    protected $fillable = ['id','id_admin','id_categoria'];
    protected $table = 'admin_categorias'; 
    public function admin(): BelongsTo
    {
        return $this->belongsTo(Admin::class);
    }

    public function categoria(): BelongsTo
    {
        return $this->belongsTo(Categoria::class);
    }
}