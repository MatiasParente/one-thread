<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tipo_mensaje', function (Blueprint $table) {
            $table->foreignId('id_mensaje')->constrained('mensajes_clasificados')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('id_tipo')->constrained('tipos')->cascadeOnUpdate()->restrictOnDelete();
            $table->primary(['id_mensaje', 'id_tipo']);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tipo_mensaje');
    }
};
