<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('mensajes_clasificados', function (Blueprint $table) {
            $table->dropColumn('requiere_revision');
            $table->tinyInteger('estado')->default(0)->after('puntaje_confianza');
        });
    }

    public function down(): void
    {
        Schema::table('mensajes_clasificados', function (Blueprint $table) {
            $table->dropColumn('estado');
            $table->boolean('requiere_revision')->default(false)->after('puntaje_confianza');
        });
    }
};
