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
    Schema::create('mensajes', function (Blueprint $table) {
        $table->id();
        $table->text('contenido');
        $table->enum('origen', ['Whatsapp', 'Instagram', 'Telegram', 'Gmail']);
        $table->dateTime('fecha_envio');
        $table->foreignId('id_mensajero')->constrained('mensajeros')->cascadeOnUpdate()->restrictOnDelete();
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mensajes');
    }
};
