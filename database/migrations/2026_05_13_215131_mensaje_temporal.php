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
    Schema::create('mensajes_temporal', function (Blueprint $table) {
        $table->id();
        
        $table->string('canal_id')->index();
        $table->string('canal'); 

        $table->string('nombre')->nullable();
        $table->string('apellido')->nullable();
        
        $table->text('contenido');
        
        $table->boolean('necesita_recuperacion')->default(false);
        
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mensajes_temporal');
    }
};