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
        Schema::create('mensajes_clasificados', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_mensaje')->unique()->constrained('mensajes')->cascadeOnUpdate()->cascadeOnDelete();
            $table->text('resumen')->nullable();
            $table->enum('prioridad', ['Baja', 'Media', 'Alta']);
            $table->decimal('puntaje_confianza', 5, 2)->default(0.00);
            $table->tinyInteger('estado')->default(0);
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mensajes_clasificados');
    }
};
