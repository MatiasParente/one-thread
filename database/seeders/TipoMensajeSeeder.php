<?php

namespace Database\Seeders;

use App\Models\Mensaje_Clasificado;
use App\Models\Mensaje;
use App\Models\Tipo;
use App\Models\Tipo_Mensaje;
use Illuminate\Database\Seeder;

class TipoMensajeSeeder extends Seeder
{
    public function run(): void
    {
        // Obtener todos los clasificados
        $mensajesClasificados = Mensaje_Clasificado::all();
        
        $keywordToTipoId = [
            'dañado' => 20, 'daño' => 20, 'roto' => 20,
            'decepcionado' => 21, 'decepción' => 21,
            'sugiero' => 22, 'sugerencia' => 22, 'mejoraran' => 22,
            'cita' => 23, 'agendar' => 23, 'reprogramar' => 23,
            'cotización' => 24, 'cotizacion' => 24,
            'técnico' => 25, 'problema' => 25, 'técnicos' => 25,
            'factura' => 26, 'facturación' => 26, 'cargo' => 26,
            'pedido' => 27, 'envío' => 27, 'devolución' => 27,
            'excelente' => 28, 'gracias' => 28, 'contento' => 28,
            'información' => 29, 'solicitud' => 29, 'consultar' => 29,
        ];
        
        foreach ($mensajesClasificados as $mensajeClasificado) {
            // 🔥 BUSCAR EL MENSAJE DIRECTAMENTE POR ID
            $mensaje = Mensaje::find($mensajeClasificado->id_mensaje);
            
            if (!$mensaje) {
                $this->command->warn("❌ Mensaje con ID {$mensajeClasificado->id_mensaje} no encontrado");
                continue;
            }
            
            if (empty($mensaje->contenido)) {
                $this->command->warn("⚠️ Mensaje ID {$mensaje->id} tiene contenido vacío");
                continue;
            }
            
            $contenido = strtolower($mensaje->contenido);
            $tiposAsignados = [];
            
            foreach ($keywordToTipoId as $keyword => $tipoId) {
                if (str_contains($contenido, $keyword) && !in_array($tipoId, $tiposAsignados)) {
                    $tiposAsignados[] = $tipoId;
                    $this->command->line("📌 Mensaje {$mensaje->id}: Coincide con '{$keyword}' -> Tipo {$tipoId}");
                }
            }
            
            if (empty($tiposAsignados)) {
                $tipoAleatorio = Tipo::inRandomOrder()->first();
                if ($tipoAleatorio) {
                    $tiposAsignados[] = $tipoAleatorio->id;
                    $this->command->line("🎲 Mensaje {$mensaje->id}: Sin coincidencias, asignando tipo aleatorio {$tipoAleatorio->id}");
                } else {
                    $this->command->error("❌ No hay tipos disponibles");
                    continue;
                }
            }
            
            $tiposAsignados = array_slice($tiposAsignados, 0, 2);
            
            foreach ($tiposAsignados as $tipoId) {
                try {
                    $result = Tipo_Mensaje::firstOrCreate([
                        'id_mensaje' => $mensajeClasificado->id,
                        'id_tipo' => $tipoId,
                    ]);
                    
                    if ($result->wasRecentlyCreated) {
                        $this->command->info("✅ Creado: Mensaje_Clasificado {$mensajeClasificado->id} -> Tipo {$tipoId}");
                    } else {
                        $this->command->line("⏭️ Ya existía: Mensaje_Clasificado {$mensajeClasificado->id} -> Tipo {$tipoId}");
                    }
                } catch (\Exception $e) {
                    $this->command->error("❌ Error: " . $e->getMessage());
                }
            }
        }
        
        $this->command->info("✅ TipoMensajeSeeder completado");
        
        // Mostrar resumen
        $total = Tipo_Mensaje::count();
        $this->command->info("📊 Total de registros en tipo_mensaje: {$total}");
    }
}