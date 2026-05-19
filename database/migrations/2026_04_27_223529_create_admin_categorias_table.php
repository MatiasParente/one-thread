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
        Schema::create('admin_categorias', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_admin')->constrained('admins')->cascadeOnDelete();
            $table->foreignId('id_categoria')->constrained('categorias')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admin_categorias');
    }
};
