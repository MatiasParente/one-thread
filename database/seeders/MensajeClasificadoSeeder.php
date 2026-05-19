<?php

namespace Database\Seeders;

use App\Models\Mensaje;
use App\Models\Mensaje_Clasificado;
use Illuminate\Database\Seeder;

class MensajeClasificadoSeeder extends Seeder
{
    public function run(): void
    {
        $mensajes = Mensaje::all();

        $clasificados = [
            1 => ['resumen' => 'Cliente reporta producto dañado en pedido #12345', 'prioridad' => 'Alta'],
            2 => ['resumen' => 'Solicitud de información y precios del producto X-200', 'prioridad' => 'Baja'],
            3 => ['resumen' => 'INCIDENCIA URGENTE: Servidor caído con pérdidas económicas', 'prioridad' => 'Alta'],
            4 => ['resumen' => 'Feedback positivo: Buen servicio y rápida resolución', 'prioridad' => 'Baja'],
            5 => ['resumen' => 'Reclamo: Error en NIF de facturación', 'prioridad' => 'Alta'],
            6 => ['resumen' => 'Solicitud de cita para revisión técnica', 'prioridad' => 'Media'],
            7 => ['resumen' => 'Sugerencia: Implementar chat en vivo en la web', 'prioridad' => 'Baja'],
            8 => ['resumen' => 'Solicitud de cambio de dirección de envío', 'prioridad' => 'Media'],
            9 => ['resumen' => 'Problema técnico: PC no enciende tras actualización', 'prioridad' => 'Alta'],
            10 => ['resumen' => 'Solicitud de catálogo de productos 2025', 'prioridad' => 'Baja'],
            11 => ['resumen' => 'Queja por falta de respuesta a reclamo por una semana', 'prioridad' => 'Alta'],
            12 => ['resumen' => 'Solicitud de cotización por volumen (100 unidades)', 'prioridad' => 'Media'],
            13 => ['resumen' => 'Felicitación al equipo de soporte técnico', 'prioridad' => 'Baja'],
            14 => ['resumen' => 'Reclamo: Pedido marcado como entregado pero no recibido', 'prioridad' => 'Alta'],
            15 => ['resumen' => 'Reclamo: Doble cobro en tarjeta, solicita reembolso', 'prioridad' => 'Alta'],
            16 => ['resumen' => 'Consulta de stock para producto Z-45 color azul', 'prioridad' => 'Baja'],
            17 => ['resumen' => 'Problema técnico: App se cierra constantemente', 'prioridad' => 'Media'],
            18 => ['resumen' => 'Solicitud de información de promociones por WhatsApp', 'prioridad' => 'Baja'],
            19 => ['resumen' => 'Queja: Producto no coincide con especificaciones web', 'prioridad' => 'Alta'],
            20 => ['resumen' => 'Solicitud de reprogramación de cita', 'prioridad' => 'Media'],
            21 => ['resumen' => 'Sugerencia: Mejorar buscador de productos', 'prioridad' => 'Baja'],
            22 => ['resumen' => 'Problema grave: No puede acceder a su cuenta', 'prioridad' => 'Alta'],
            23 => ['resumen' => 'Feedback positivo: Producto superó expectativas', 'prioridad' => 'Baja'],
            24 => ['resumen' => 'Reclamo: No ha recibido factura de compra de diciembre', 'prioridad' => 'Media'],
            25 => ['resumen' => 'Consulta de horario de atención al público', 'prioridad' => 'Baja'],
            26 => ['resumen' => 'INCIDENCIA CRÍTICA: Sistema no procesa pagos', 'prioridad' => 'Alta'],
            27 => ['resumen' => 'Feedback positivo: Cliente muy contento, volverá a comprar', 'prioridad' => 'Baja'],
            28 => ['resumen' => 'Solicitud de devolución de producto', 'prioridad' => 'Media'],
            29 => ['resumen' => 'Consulta sobre garantía extendida', 'prioridad' => 'Baja'],
            30 => ['resumen' => 'Queja: Larga espera en atención telefónica', 'prioridad' => 'Media'],
            31 => ['resumen' => 'Sugerencia: Implementar pagos con PayPal', 'prioridad' => 'Baja'],
            32 => ['resumen' => 'Confirmación de asistencia a cita', 'prioridad' => 'Baja'],
            33 => ['resumen' => 'Problema técnico: Impresora no conecta al WiFi', 'prioridad' => 'Media'],
            34 => ['resumen' => 'Consulta sobre tienda física en Madrid', 'prioridad' => 'Baja'],
            35 => ['resumen' => 'Reclamo: Cargo no reconocido en factura', 'prioridad' => 'Alta'],
            36 => ['resumen' => 'Solicitud de cita para asesoría personalizada', 'prioridad' => 'Media'],
            37 => ['resumen' => 'Sugerencia: Modo oscuro para app móvil', 'prioridad' => 'Baja'],
            38 => ['resumen' => 'Reclamo: Paquete robado por dejarlo en la puerta', 'prioridad' => 'Alta'],
            39 => ['resumen' => 'Problema técnico: No puede iniciar sesión', 'prioridad' => 'Alta'],
            40 => ['resumen' => 'Consulta sobre programa de afiliados', 'prioridad' => 'Baja'],
            41 => ['resumen' => 'Problema técnico: Sistema muy lento', 'prioridad' => 'Media'],
            42 => ['resumen' => 'Consulta de descuentos por volumen de compra', 'prioridad' => 'Media'],
            43 => ['resumen' => 'Feedback positivo: Excelente atención al cliente', 'prioridad' => 'Baja'],
            44 => ['resumen' => 'Solicitud urgente de factura', 'prioridad' => 'Alta'],
            45 => ['resumen' => 'Consulta sobre tiempo de entrega a Barcelona', 'prioridad' => 'Baja'],
            46 => ['resumen' => 'Problema técnico: App consume mucha batería', 'prioridad' => 'Media'],
            47 => ['resumen' => 'Solicitud de cita con asesor de ventas', 'prioridad' => 'Media'],
            48 => ['resumen' => 'Feedback positivo: Rápida resolución del problema', 'prioridad' => 'Baja'],
            49 => ['resumen' => 'Consulta sobre financiamiento a plazos', 'prioridad' => 'Baja'],
            50 => ['resumen' => 'Reclamo: Producto llegó con pieza faltante', 'prioridad' => 'Alta'],
            51 => ['resumen' => 'Consulta sobre soporte en fin de semana', 'prioridad' => 'Media'],
            52 => ['resumen' => 'Sugerencia: Más puntos de entrega en la ciudad', 'prioridad' => 'Baja'],
            53 => ['resumen' => 'Feedback positivo: Técnico profesional y eficiente', 'prioridad' => 'Baja'],
            54 => ['resumen' => 'Solicitud de baja de suscripción mensual', 'prioridad' => 'Media'],
            55 => ['resumen' => 'Problema técnico: Error 404 en todo el sitio web', 'prioridad' => 'Alta'],
            56 => ['resumen' => 'Feedback positivo: Excelente relación calidad-precio', 'prioridad' => 'Baja'],
            57 => ['resumen' => 'Solicitud de cambio de fecha de pedido', 'prioridad' => 'Media'],
            58 => ['resumen' => 'Consulta sobre política de devoluciones', 'prioridad' => 'Baja'],
            59 => ['resumen' => 'Problema técnico: Web no carga en Firefox', 'prioridad' => 'Media'],
            60 => ['resumen' => 'Felicitación al repartidor por su servicio', 'prioridad' => 'Baja'],
            61 => ['resumen' => 'Consulta sobre programa de fidelización', 'prioridad' => 'Baja'],
            62 => ['resumen' => 'Consulta sobre extensión de garantía', 'prioridad' => 'Baja'],
            63 => ['resumen' => 'Solicitud de manual de instrucciones en español', 'prioridad' => 'Baja'],
            64 => ['resumen' => 'Feedback positivo: Nueva funcionalidad de app es excelente', 'prioridad' => 'Baja'],
            65 => ['resumen' => 'Consulta sobre envíos internacionales', 'prioridad' => 'Baja'],
            66 => ['resumen' => 'Reclamo grave: Canceló suscripción pero siguen cobrando', 'prioridad' => 'Alta'],
            67 => ['resumen' => 'Solicitud de certificado de garantía para seguro', 'prioridad' => 'Media'],
            68 => ['resumen' => 'Queja: Color del producto no coincide con web', 'prioridad' => 'Media'],
            69 => ['resumen' => 'Consulta sobre cambio de talla sin costo', 'prioridad' => 'Baja'],
            70 => ['resumen' => 'Feedback positivo: Excelente servicio postventa', 'prioridad' => 'Baja'],
            71 => ['resumen' => 'Solicitud de garantía por producto defectuoso', 'prioridad' => 'Alta'],
            72 => ['resumen' => 'Consulta de stock en color rojo', 'prioridad' => 'Baja'],
            73 => ['resumen' => 'Queja: Mala atención en tienda física', 'prioridad' => 'Alta'],
            74 => ['resumen' => 'Solicitud de facturación a nombre de empresa', 'prioridad' => 'Media'],
            75 => ['resumen' => 'Solicitud de manual de instrucciones en PDF', 'prioridad' => 'Baja'],
            76 => ['resumen' => 'Feedback positivo: Buena comunicación en compra', 'prioridad' => 'Baja'],
            77 => ['resumen' => 'Consulta de descuentos para estudiantes', 'prioridad' => 'Baja'],
            78 => ['resumen' => 'Solicitud URGENTE de cancelación de pedido', 'prioridad' => 'Alta'],
            79 => ['resumen' => 'Queja: Calidad inferior al precio pagado', 'prioridad' => 'Media'],
            80 => ['resumen' => 'Consulta sobre activación de garantía extendida', 'prioridad' => 'Media'],
            81 => ['resumen' => 'Feedback positivo: Envío más rápido de lo esperado', 'prioridad' => 'Baja'],
            82 => ['resumen' => 'Solicitud URGENTE de hablar con supervisor', 'prioridad' => 'Alta'],
            83 => ['resumen' => 'Consulta sobre versión demo del producto', 'prioridad' => 'Baja'],
            84 => ['resumen' => 'Queja: Embalaje frágil, producto con daños menores', 'prioridad' => 'Media'],
            85 => ['resumen' => 'Felicitación a vendedora María por excelente atención', 'prioridad' => 'Baja'],
            86 => ['resumen' => 'Solicitud de recogida en tienda', 'prioridad' => 'Baja'],
            87 => ['resumen' => 'Reclamo: Sistema de tracking no funciona', 'prioridad' => 'Media'],
            88 => ['resumen' => 'Sugerencia: Agregar más métodos de pago', 'prioridad' => 'Baja'],
            89 => ['resumen' => 'Queja: Producto requiere instalación profesional no ofrecida', 'prioridad' => 'Media'],
            90 => ['resumen' => 'Problema técnico: Error en página de pago', 'prioridad' => 'Alta'],
            91 => ['resumen' => 'Consulta sobre soporte técnico 24/7 en español', 'prioridad' => 'Baja'],
            92 => ['resumen' => 'Feedback positivo: Producto cumple todas expectativas', 'prioridad' => 'Baja'],
            93 => ['resumen' => 'Solicitud URGENTE de cotización para oferta', 'prioridad' => 'Alta'],
            94 => ['resumen' => 'Consulta sobre producto similar más económico', 'prioridad' => 'Baja'],
            95 => ['resumen' => 'Reclamo: Servicio de mensajería perdió paquete', 'prioridad' => 'Alta'],
            96 => ['resumen' => 'Problema técnico: No llega correo de confirmación', 'prioridad' => 'Media'],
            97 => ['resumen' => 'Sugerencia: Rediseñar interfaz de usuario confusa', 'prioridad' => 'Baja'],
            98 => ['resumen' => 'Consulta sobre asesoramiento pre-compra', 'prioridad' => 'Baja'],
            99 => ['resumen' => 'Queja grave: Factura de otro cliente en su paquete', 'prioridad' => 'Alta'],
            100 => ['resumen' => 'Felicitación a Juan de soporte técnico', 'prioridad' => 'Baja'],
        ];

        foreach ($mensajes as $index => $mensaje) {
            $id = $index + 1;

            if (! isset($clasificados[$id])) {
                continue;
            }

            $datos = $clasificados[$id];
            $puntajeConfianza = ($datos['prioridad'] === 'Alta') ? 0.92 : (($datos['prioridad'] === 'Media') ? 0.85 : 0.78);

            Mensaje_Clasificado::create([
                'id_mensaje' => $mensaje->id,
                'resumen' => $datos['resumen'],
                'prioridad' => $datos['prioridad'],
                'puntaje_confianza' => $puntajeConfianza,
                'requiere_revision' => ($datos['prioridad'] === 'Alta'),
            ]);
        }

        $this->command->info('✅ Creados '.Mensaje_Clasificado::count().' mensajes clasificados');
    }
}
