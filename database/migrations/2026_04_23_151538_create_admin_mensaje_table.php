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
        $table->foreignId('id_admin')->constrained('admins')->cascadeOnUpdate()->restrictOnDelete();
        $table->foreignId('id_mensaje')->constrained('mensajes')->cascadeOnUpdate()->cascadeOnDelete();
        $table->primary(['id_admin', 'id_mensaje']);
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
