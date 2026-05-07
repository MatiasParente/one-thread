<?php

namespace Database\Seeders;

use App\Models\Mensaje;
use Illuminate\Database\Seeder;

class MensajeSeeder extends Seeder
{
    public function run(): void
    {
        $mensajes = [
            // id_mensajero varía del 1 al 30
            ['contenido' => 'Buenos días, quería reportar que mi pedido #12345 llegó completamente dañado. La caja estaba rota y el producto tiene golpes.', 'origen' => 'Whatsapp', 'id_mensajero' => 1],
            ['contenido' => 'Hola, estoy interesado en el producto X-200. ¿Me podrían dar el precio y las especificaciones técnicas?', 'origen' => 'Instagram', 'id_mensajero' => 2],
            ['contenido' => 'URGENTE: Mi servidor lleva 2 horas caído y esto me está generando pérdidas económicas importantes.', 'origen' => 'Telegram', 'id_mensajero' => 3],
            ['contenido' => 'Excelente servicio, resolvieron mi problema en menos de 5 minutos. Muchas gracias al equipo.', 'origen' => 'Whatsapp', 'id_mensajero' => 4],
            ['contenido' => 'La factura que me llegó tiene el NIF incorrecto. Necesito que lo corrijan urgentemente.', 'origen' => 'Gmail', 'id_mensajero' => 5],
            ['contenido' => 'Quisiera agendar una cita para revisión técnica de mi equipo. ¿Tienen horario el próximo lunes?', 'origen' => 'Whatsapp', 'id_mensajero' => 6],
            ['contenido' => 'Sería bueno que implementaran un chat en vivo en la web para resolver dudas más rápidamente.', 'origen' => 'Instagram', 'id_mensajero' => 7],
            ['contenido' => 'Necesito cambiar la dirección de envío de mi último pedido #67890. Me equivoqué al escribir la calle.', 'origen' => 'Telegram', 'id_mensajero' => 8],
            ['contenido' => 'Mi computadora no enciende después de la actualización de Windows. ¿Qué puedo hacer?', 'origen' => 'Whatsapp', 'id_mensajero' => 9],
            ['contenido' => '¿Podrían enviarme el catálogo completo de productos 2025 a mi correo? Estoy muy interesado.', 'origen' => 'Gmail', 'id_mensajero' => 10],
            ['contenido' => 'Llevo una semana esperando respuesta a mi reclamo #456 y nadie me contacta. Pésimo servicio.', 'origen' => 'Whatsapp', 'id_mensajero' => 11],
            ['contenido' => 'Quisiera una cotización para 100 unidades del modelo premium. Es para un proyecto corporativo.', 'origen' => 'Instagram', 'id_mensajero' => 12],
            ['contenido' => 'Felicitaciones al equipo de soporte, son muy profesionales y resolvieron todo rápidamente.', 'origen' => 'Telegram', 'id_mensajero' => 13],
            ['contenido' => 'El paquete dice "entregado" pero yo no recibí nada. ¿Dónde está mi pedido? Es urgente.', 'origen' => 'Whatsapp', 'id_mensajero' => 14],
            ['contenido' => 'Me cobraron dos veces el mismo pedido en mi tarjeta. Necesito el reembolso inmediato.', 'origen' => 'Gmail', 'id_mensajero' => 15],
            ['contenido' => '¿Tienen stock del artículo Z-45 en color azul? Necesito 5 unidades para esta semana.', 'origen' => 'Whatsapp', 'id_mensajero' => 16],
            ['contenido' => 'La aplicación se cierra sola cada 5 minutos. Ya desinstalé e instalé varias veces.', 'origen' => 'Instagram', 'id_mensajero' => 17],
            ['contenido' => 'Me gustaría recibir información sobre sus promociones y novedades por WhatsApp.', 'origen' => 'Telegram', 'id_mensajero' => 18],
            ['contenido' => 'El producto no cumple con lo publicado en la web. Las especificaciones son diferentes.', 'origen' => 'Whatsapp', 'id_mensajero' => 19],
            ['contenido' => 'Necesito reprogramar mi cita del viernes 15 porque me surgió un imprevisto laboral.', 'origen' => 'Gmail', 'id_mensajero' => 20],
            ['contenido' => 'Sugiero mejorar el sistema de búsqueda de productos, es muy lento y poco preciso.', 'origen' => 'Whatsapp', 'id_mensajero' => 21],
            ['contenido' => 'Grave problema con mi cuenta, no puedo acceder a mis datos desde hace 3 días.', 'origen' => 'Instagram', 'id_mensajero' => 22],
            ['contenido' => 'El producto superó mis expectativas. Llegó antes de tiempo y en perfectas condiciones.', 'origen' => 'Telegram', 'id_mensajero' => 23],
            ['contenido' => 'No he recibido la factura de mi compra de diciembre. La necesito para la declaración.', 'origen' => 'Whatsapp', 'id_mensajero' => 24],
            ['contenido' => '¿Cuál es el horario de atención al público? Quiero pasar personalmente a hacer una gestión.', 'origen' => 'Gmail', 'id_mensajero' => 25],
            ['contenido' => 'Incidencia crítica: El sistema no procesa los pagos correctamente desde esta mañana.', 'origen' => 'Whatsapp', 'id_mensajero' => 26],
            ['contenido' => 'Muy contento con mi compra. Sin duda volveré a comprar con ustedes. Excelente atención.', 'origen' => 'Instagram', 'id_mensajero' => 27],
            ['contenido' => 'Quiero devolver el producto porque no se ajusta a lo que necesito. ¿Cómo hago el proceso?', 'origen' => 'Telegram', 'id_mensajero' => 28],
            ['contenido' => '¿Ofrecen garantía extendida para sus productos? Me interesaría contratarla.', 'origen' => 'Whatsapp', 'id_mensajero' => 29],
            ['contenido' => 'El servicio de atención al cliente es terrible. Llevo 30 minutos en espera telefónica.', 'origen' => 'Gmail', 'id_mensajero' => 30],
            ['contenido' => '¿Podrían implementar pagos con PayPal? Sería más cómodo para muchos clientes.', 'origen' => 'Whatsapp', 'id_mensajero' => 1],
            ['contenido' => 'Confirmo mi asistencia a la cita del martes 19 a las 10:00 am. Muchas gracias.', 'origen' => 'Instagram', 'id_mensajero' => 2],
            ['contenido' => 'La impresora no conecta con la red WiFi. He reiniciado todo y sigue sin funcionar.', 'origen' => 'Telegram', 'id_mensajero' => 3],
            ['contenido' => '¿Tienen tienda física en Madrid? Me gustaría ir a ver los productos en persona.', 'origen' => 'Whatsapp', 'id_mensajero' => 4],
            ['contenido' => 'Hay un cargo de 50€ que no reconozco en mi última factura. ¿Me lo pueden explicar?', 'origen' => 'Gmail', 'id_mensajero' => 5],
            ['contenido' => '¿Puedo agendar una cita para asesoría personalizada sobre sus productos?', 'origen' => 'Whatsapp', 'id_mensajero' => 6],
            ['contenido' => 'La app móvil necesita un modo oscuro, lastima mucho la vista por la noche.', 'origen' => 'Instagram', 'id_mensajero' => 7],
            ['contenido' => 'El repartidor dejó el paquete en la puerta y se lo robaron. ¿Quién se hace responsable?', 'origen' => 'Telegram', 'id_mensajero' => 8],
            ['contenido' => 'No puedo iniciar sesión en mi cuenta, me dice "credenciales inválidas" pero estoy seguro.', 'origen' => 'Whatsapp', 'id_mensajero' => 9],
            ['contenido' => '¿Cuáles son los requisitos para aplicar al programa de afiliados? Me interesa mucho.', 'origen' => 'Gmail', 'id_mensajero' => 10],
            ['contenido' => 'El sistema está muy lento desde ayer. Tarda 10 segundos en cargar cada página.', 'origen' => 'Whatsapp', 'id_mensajero' => 11],
            ['contenido' => '¿Ofrecen descuentos por volumen? Estoy evaluando comprar 500 unidades para mi empresa.', 'origen' => 'Instagram', 'id_mensajero' => 12],
            ['contenido' => 'Atención al cliente excelente, me ayudaron con todos mis problemas. Muy agradecido.', 'origen' => 'Telegram', 'id_mensajero' => 13],
            ['contenido' => 'Necesito la factura con urgencia para presentar un informe. ¿Me la pueden enviar hoy?', 'origen' => 'Whatsapp', 'id_mensajero' => 14],
            ['contenido' => '¿Cuál es el tiempo estimado de entrega para envíos a Barcelona?', 'origen' => 'Gmail', 'id_mensajero' => 15],
            ['contenido' => 'Problema con la última actualización, la app consume mucha batería ahora.', 'origen' => 'Whatsapp', 'id_mensajero' => 16],
            ['contenido' => 'Me gustaría agendar una cita con un asesor de ventas para discutir un contrato grande.', 'origen' => 'Instagram', 'id_mensajero' => 17],
            ['contenido' => 'Gracias por la rápida respuesta, solucionaron mi problema en menos de una hora.', 'origen' => 'Telegram', 'id_mensajero' => 18],
            ['contenido' => '¿Puedo financiar mi compra a plazos sin intereses? Hay algún requisito especial?', 'origen' => 'Whatsapp', 'id_mensajero' => 19],
            ['contenido' => 'El producto llegó con una pieza faltante. Necesito que me la envíen urgentemente.', 'origen' => 'Gmail', 'id_mensajero' => 20],
            ['contenido' => '¿Tienen soporte en fin de semana? Tengo una emergencia con mi equipo el sábado.', 'origen' => 'Whatsapp', 'id_mensajero' => 21],
            ['contenido' => 'Sería bueno que pusieran más puntos de entrega en mi ciudad.', 'origen' => 'Instagram', 'id_mensajero' => 22],
            ['contenido' => 'El técnico que vino a casa fue muy profesional y dejó todo funcionando perfectamente.', 'origen' => 'Telegram', 'id_mensajero' => 23],
            ['contenido' => '¿Cómo puedo dar de baja mi suscripción? Ya no necesito el servicio mensual.', 'origen' => 'Whatsapp', 'id_mensajero' => 24],
            ['contenido' => 'Error 404 en todas las páginas del sitio web. No puedo acceder a nada.', 'origen' => 'Gmail', 'id_mensajero' => 25],
            ['contenido' => 'Excelente relación calidad-precio. Muy satisfecho con mi compra.', 'origen' => 'Whatsapp', 'id_mensajero' => 26],
            ['contenido' => 'Necesito cambiar la fecha de mi pedido porque no estaré en casa.', 'origen' => 'Instagram', 'id_mensajero' => 27],
            ['contenido' => '¿Aceptan devoluciones después de 30 días? El producto lo compré hace 40 días.', 'origen' => 'Telegram', 'id_mensajero' => 28],
            ['contenido' => 'La página web no carga correctamente en mi navegador. Uso Firefox.', 'origen' => 'Whatsapp', 'id_mensajero' => 29],
            ['contenido' => 'Quisiera felicitar al repartidor por su amabilidad y puntualidad.', 'origen' => 'Gmail', 'id_mensajero' => 30],
            ['contenido' => '¿Tienen algún programa de fidelización para clientes recurrentes?', 'origen' => 'Whatsapp', 'id_mensajero' => 1],
            ['contenido' => 'La garantía de mi producto expira la próxima semana. ¿Puedo extenderla?', 'origen' => 'Instagram', 'id_mensajero' => 2],
            ['contenido' => 'El instructivo del producto está en inglés. ¿Tienen versión en español?', 'origen' => 'Telegram', 'id_mensajero' => 3],
            ['contenido' => 'Me encantó la nueva funcionalidad de la app. Muy intuitiva.', 'origen' => 'Whatsapp', 'id_mensajero' => 4],
            ['contenido' => '¿Realizan envíos internacionales a países de Sudamérica?', 'origen' => 'Gmail', 'id_mensajero' => 5],
            ['contenido' => 'Cancelé mi suscripción pero me siguen cobrando. Esto es un fraude.', 'origen' => 'Whatsapp', 'id_mensajero' => 6],
            ['contenido' => 'Necesito un certificado de garantía para el seguro de mi equipo.', 'origen' => 'Instagram', 'id_mensajero' => 7],
            ['contenido' => 'El color del producto no coincide con las fotos de la web. Es más oscuro.', 'origen' => 'Telegram', 'id_mensajero' => 8],
            ['contenido' => '¿Puedo hacer un cambio de talla sin costo adicional?', 'origen' => 'Whatsapp', 'id_mensajero' => 9],
            ['contenido' => 'El servicio postventa es excelente, siempre responden rápido.', 'origen' => 'Gmail', 'id_mensajero' => 10],
            ['contenido' => 'Quiero solicitar la garantía porque el producto dejó de funcionar.', 'origen' => 'Whatsapp', 'id_mensajero' => 11],
            ['contenido' => '¿Hay stock del producto en el color rojo? En la web solo sale azul.', 'origen' => 'Instagram', 'id_mensajero' => 12],
            ['contenido' => 'La atención en tienda fue pésima, me ignoraron por 20 minutos.', 'origen' => 'Telegram', 'id_mensajero' => 13],
            ['contenido' => '¿Pueden facturar a nombre de mi empresa? Necesito los datos fiscales.', 'origen' => 'Whatsapp', 'id_mensajero' => 14],
            ['contenido' => 'El producto vino sin manual de instrucciones. ¿Dónde lo descargo?', 'origen' => 'Gmail', 'id_mensajero' => 15],
            ['contenido' => 'Muy buena comunicación durante todo el proceso de compra.', 'origen' => 'Whatsapp', 'id_mensajero' => 16],
            ['contenido' => '¿Tienen algún descuento para estudiantes o docentes?', 'origen' => 'Instagram', 'id_mensajero' => 17],
            ['contenido' => 'URGENTE: Necesito cancelar mi pedido porque me equivoqué de producto.', 'origen' => 'Telegram', 'id_mensajero' => 18],
            ['contenido' => 'La calidad del producto es inferior a la esperada por el precio.', 'origen' => 'Whatsapp', 'id_mensajero' => 19],
            ['contenido' => '¿Cómo activo la garantía extendida que compré? No encuentro la opción.', 'origen' => 'Gmail', 'id_mensajero' => 20],
            ['contenido' => 'El envío fue más rápido de lo esperado. Llegó en 24 horas.', 'origen' => 'Whatsapp', 'id_mensajero' => 21],
            ['contenido' => 'Necesito hablar con un supervisor urgentemente. Estoy muy molesto.', 'origen' => 'Instagram', 'id_mensajero' => 22],
            ['contenido' => '¿Tienen versión demo del producto para probar antes de comprar?', 'origen' => 'Telegram', 'id_mensajero' => 23],
            ['contenido' => 'El embalaje del producto es muy frágil. Llegó con daños menores.', 'origen' => 'Whatsapp', 'id_mensajero' => 24],
            ['contenido' => 'Excelente atención por parte de María en el departamento de ventas.', 'origen' => 'Gmail', 'id_mensajero' => 25],
            ['contenido' => '¿Puedo recoger mi pedido en tienda en lugar de recibirlo en casa?', 'origen' => 'Whatsapp', 'id_mensajero' => 26],
            ['contenido' => 'El sistema de tracking no funciona. No sé dónde está mi pedido.', 'origen' => 'Instagram', 'id_mensajero' => 27],
            ['contenido' => 'Me gustaría sugerir que agreguen más métodos de pago disponibles.', 'origen' => 'Telegram', 'id_mensajero' => 28],
            ['contenido' => 'El producto requiere una instalación profesional que no ofrecen.', 'origen' => 'Whatsapp', 'id_mensajero' => 29],
            ['contenido' => 'La página de pago tiene un error y no procesa mi tarjeta.', 'origen' => 'Gmail', 'id_mensajero' => 30],
            ['contenido' => '¿Tienen soporte técnico en español 24/7? Trabajo en horario nocturno.', 'origen' => 'Whatsapp', 'id_mensajero' => 1],
            ['contenido' => 'El producto es exactamente lo que necesitaba. Cumple todas las expectativas.', 'origen' => 'Instagram', 'id_mensajero' => 2],
            ['contenido' => 'Necesito la cotización con urgencia para presentar una oferta mañana.', 'origen' => 'Telegram', 'id_mensajero' => 3],
            ['contenido' => '¿Pueden recomendar un producto similar pero más económico?', 'origen' => 'Whatsapp', 'id_mensajero' => 4],
            ['contenido' => 'El servicio de mensajería perdió mi paquete. Necesito una solución.', 'origen' => 'Gmail', 'id_mensajero' => 5],
            ['contenido' => 'Me registré pero no me llega el correo de confirmación.', 'origen' => 'Whatsapp', 'id_mensajero' => 6],
            ['contenido' => 'La interfaz de usuario es muy confusa. Deberían rediseñarla.', 'origen' => 'Instagram', 'id_mensajero' => 7],
            ['contenido' => '¿Ofrecen asesoramiento personalizado antes de la compra?', 'origen' => 'Telegram', 'id_mensajero' => 8],
            ['contenido' => 'El producto vino con la factura de otro cliente. Error grave.', 'origen' => 'Whatsapp', 'id_mensajero' => 9],
            ['contenido' => 'Muy agradecido con Juan del soporte, solucionó mi problema técnico.', 'origen' => 'Gmail', 'id_mensajero' => 10],
            ['contenido' => '¿Tienen algún plan de suscripción mensual en lugar de pago anual?', 'origen' => 'Whatsapp', 'id_mensajero' => 11],
            ['contenido' => 'La contraseña que me enviaron no funciona. No puedo acceder.', 'origen' => 'Instagram', 'id_mensajero' => 12],
            ['contenido' => 'El producto llegó en perfecto estado y antes de lo previsto. Gracias.', 'origen' => 'Telegram', 'id_mensajero' => 13],
        ];
        
        $fechas = [];
        for ($i = 0; $i < count($mensajes); $i++) {
            $fechas[] = now()->subDays(rand(0, 60))->subHours(rand(0, 23))->subMinutes(rand(0, 59));
        }
        sort($fechas);
        
        foreach ($mensajes as $index => $mensaje) {
            $fecha = $fechas[$index];
            
            Mensaje::create([
                'contenido' => $mensaje['contenido'],
                'origen' => $mensaje['origen'],
                'fecha_envio' => $fecha,
                'id_mensajero' => $mensaje['id_mensajero'],
                'created_at' => $fecha,
                'updated_at' => $fecha,
            ]);
        }
        
        $this->command->info("✅ Creados " . count($mensajes) . " mensajes");
    }
}