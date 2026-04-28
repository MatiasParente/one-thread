<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Admin_Mensaje extends Model
{
    //
    public function mensaje(): BelongsTo
    {
        return $this->belongsTo(Mensaje::class);
    }

    public function Admins(): BelongsTo
    {
        return $this->belongsTo(Admin::class);
    }
}
