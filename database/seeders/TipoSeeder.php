<?php

namespace Database\Seeders;

use App\Models\Tipo;
use Illuminate\Database\Seeder;

class TipoSeeder extends Seeder
{
    public function run(): void
    {
        $tipos = [
            ['id' => 20, 'nombre' => 'Queja', 'id_categoria' => 24],      // Atención al Cliente
            ['id' => 21, 'nombre' => 'Reclamo', 'id_categoria' => 24],    // Atención al Cliente
            ['id' => 22, 'nombre' => 'Sugerencia', 'id_categoria' => 24], // Atención al Cliente
            ['id' => 23, 'nombre' => 'Cita', 'id_categoria' => 20],       // Ventas
            ['id' => 24, 'nombre' => 'Cotización', 'id_categoria' => 20], // Ventas
            ['id' => 25, 'nombre' => 'Problema Técnico', 'id_categoria' => 22], // Soporte Técnico
            ['id' => 26, 'nombre' => 'Factura', 'id_categoria' => 23],     // Facturación
            ['id' => 27, 'nombre' => 'Devolución', 'id_categoria' => 25],  // Logística
            ['id' => 28, 'nombre' => 'Felicitación', 'id_categoria' => 24], // Atención al Cliente
            ['id' => 29, 'nombre' => 'Solicitud de Información', 'id_categoria' => 21], // Marketing
        ];

        foreach ($tipos as $tipo) {
            Tipo::updateOrCreate(
                ['id' => $tipo['id']],
                [
                    'nombre' => $tipo['nombre'],
                    'id_categoria' => $tipo['id_categoria'],
                ]
            );
        }
    }
}
