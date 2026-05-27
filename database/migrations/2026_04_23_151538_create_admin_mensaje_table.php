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
        Schema::create('admin_mensaje', function (Blueprint $table) {
            $table->id(); 
            $table->foreignId('id_admin')->constrained('admins')->cascadeOnUpdate()->restrictOnDelete();
            $table->foreignId('id_mensaje')->constrained('mensajes')->cascadeOnUpdate()->cascadeOnDelete();
            
            $table->text('respuesta'); 
            $table->string('canal_envio'); 
            $table->tinyInteger('puntaje')->nullable(); 
            $table->text('comentarios_cliente')->nullable(); 
            $table->timestamp('fecha_respuesta')->useCurrent(); 
            $table->timestamps(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admin_mensaje');
    }
};