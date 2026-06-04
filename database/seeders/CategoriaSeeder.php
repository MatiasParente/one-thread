<?php

namespace Database\Seeders;

use App\Models\Categoria;
use Illuminate\Database\Seeder;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categorias = [
            ['id' => 20, 'nombre' => 'Ventas'],
            ['id' => 21, 'nombre' => 'Marketing'],
            ['id' => 22, 'nombre' => 'Soporte Técnico'],
            ['id' => 23, 'nombre' => 'Facturación'],
            ['id' => 24, 'nombre' => 'Atención al Cliente'],
            ['id' => 25, 'nombre' => 'Logística'],
            ['id' => 26, 'nombre' => 'Recursos Humanos'],
            ['id' => 27, 'nombre' => 'Calidad'],
            ['id' => 28, 'nombre' => 'Producción'],
            ['id' => 29, 'nombre' => 'Investigación y Desarrollo'],
            ['id' => 32, 'nombre' => 'General']
        ];

        foreach ($categorias as $categoria) {
            Categoria::updateOrCreate(
                ['id' => $categoria['id']],
                ['nombre' => $categoria['nombre']]
            );
        }

    }
}
