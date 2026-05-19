<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        DB::statement('SET FOREIGN_KEY_CHECKS=0;');

        // Limpiar tablas en orden inverso (primero las que tienen dependencias)
        DB::table('tipo_mensaje')->truncate();
        DB::table('mensajes_clasificados')->truncate();
        DB::table('mensajes')->truncate();
        DB::table('mensajeros')->truncate();

        // Re-habilitar revisiones
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $this->call(CategoriaSeeder::class);
        $this->call(TipoSeeder::class);
        $this->call(MensajeroSeeder::class);
        $this->call(MensajeSeeder::class);
        $this->call(MensajeClasificadoSeeder::class);
        $this->call(TipoMensajeSeeder::class);
    }
}
