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
    Schema::create('mensajeros', function (Blueprint $table) {
        $table->id();
        $table->string('nombre', 50)->nullable();
        $table->string('apellido', 50)->nullable();
        
        // Datos de contacto tradicionales
        $table->string('telefono', 25)->nullable();
        $table->string('correo', 100)->nullable();

        $table->string('whatsapp_id')->nullable()->unique(); 
        $table->string('telegram_id')->nullable()->unique();
        $table->string('instagram_id')->nullable()->unique();

        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mensajeros');
    }
};
