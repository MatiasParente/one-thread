<?php

namespace Database\Seeders;

use App\Models\Mensajero;
use Illuminate\Database\Seeder;

class MensajeroSeeder extends Seeder
{
    public function run(): void
    {
        $mensajeros = [
            ['nombre' => 'Carlos', 'apellido' => 'González', 'telefono' => '+34912345678', 'correo' => 'carlos.gonzalez@email.com', 'whatsapp_id' => '34123456789', 'telegram_id' => 'carlos_g', 'instagram_id' => 'carlos_g'],
            ['nombre' => 'María', 'apellido' => 'Rodríguez', 'telefono' => '+34912345679', 'correo' => 'maria.rodriguez@email.com', 'whatsapp_id' => '34234567890', 'telegram_id' => 'maria_r', 'instagram_id' => 'maria_r'],
            ['nombre' => 'José', 'apellido' => 'López', 'telefono' => '+34912345680', 'correo' => 'jose.lopez@email.com', 'whatsapp_id' => '34345678901', 'telegram_id' => 'jose_l', 'instagram_id' => 'jose_l'],
            ['nombre' => 'Ana', 'apellido' => 'Martínez', 'telefono' => '+34912345681', 'correo' => 'ana.martinez@email.com', 'whatsapp_id' => '34456789012', 'telegram_id' => 'ana_m', 'instagram_id' => 'ana_m'],
            ['nombre' => 'Luis', 'apellido' => 'Sánchez', 'telefono' => '+34912345682', 'correo' => 'luis.sanchez@email.com', 'whatsapp_id' => '34567890123', 'telegram_id' => 'luis_s', 'instagram_id' => 'luis_s'],
            ['nombre' => 'Laura', 'apellido' => 'Pérez', 'telefono' => '+34912345683', 'correo' => 'laura.perez@email.com', 'whatsapp_id' => '34678901234', 'telegram_id' => 'laura_p', 'instagram_id' => 'laura_p'],
            ['nombre' => 'David', 'apellido' => 'García', 'telefono' => '+34912345684', 'correo' => 'david.garcia@email.com', 'whatsapp_id' => '34789012345', 'telegram_id' => 'david_g', 'instagram_id' => 'david_g'],
            ['nombre' => 'Elena', 'apellido' => 'Fernández', 'telefono' => '+34912345685', 'correo' => 'elena.fernandez@email.com', 'whatsapp_id' => '34890123456', 'telegram_id' => 'elena_f', 'instagram_id' => 'elena_f'],
            ['nombre' => 'Javier', 'apellido' => 'Ruiz', 'telefono' => '+34912345686', 'correo' => 'javier.ruiz@email.com', 'whatsapp_id' => '34901234567', 'telegram_id' => 'javier_r', 'instagram_id' => 'javier_r'],
            ['nombre' => 'Carmen', 'apellido' => 'Díaz', 'telefono' => '+34912345687', 'correo' => 'carmen.diaz@email.com', 'whatsapp_id' => '34012345678', 'telegram_id' => 'carmen_d', 'instagram_id' => 'carmen_d'],
            ['nombre' => 'Miguel', 'apellido' => 'Torres', 'telefono' => '+34912345688', 'correo' => 'miguel.torres@email.com', 'whatsapp_id' => '34123456780', 'telegram_id' => 'miguel_t', 'instagram_id' => 'miguel_t'],
            ['nombre' => 'Isabel', 'apellido' => 'Romero', 'telefono' => '+34912345689', 'correo' => 'isabel.romero@email.com', 'whatsapp_id' => '34234567891', 'telegram_id' => 'isabel_r', 'instagram_id' => 'isabel_r'],
            ['nombre' => 'Pablo', 'apellido' => 'Navarro', 'telefono' => '+34912345690', 'correo' => 'pablo.navarro@email.com', 'whatsapp_id' => '34345678902', 'telegram_id' => 'pablo_n', 'instagram_id' => 'pablo_n'],
            ['nombre' => 'Sara', 'apellido' => 'Jiménez', 'telefono' => '+34912345691', 'correo' => 'sara.jimenez@email.com', 'whatsapp_id' => '34456789013', 'telegram_id' => 'sara_j', 'instagram_id' => 'sara_j'],
            ['nombre' => 'Alejandro', 'apellido' => 'Moreno', 'telefono' => '+34912345692', 'correo' => 'alejandro.moreno@email.com', 'whatsapp_id' => '34567890124', 'telegram_id' => 'alejandro_m', 'instagram_id' => 'alejandro_m'],
            ['nombre' => 'Patricia', 'apellido' => 'Álvarez', 'telefono' => '+34912345693', 'correo' => 'patricia.alvarez@email.com', 'whatsapp_id' => '34678901235', 'telegram_id' => 'patricia_a', 'instagram_id' => 'patricia_a'],
            ['nombre' => 'Fernando', 'apellido' => 'Gómez', 'telefono' => '+34912345694', 'correo' => 'fernando.gomez@email.com', 'whatsapp_id' => '34789012346', 'telegram_id' => 'fernando_g', 'instagram_id' => 'fernando_g'],
            ['nombre' => 'Raquel', 'apellido' => 'Ortega', 'telefono' => '+34912345695', 'correo' => 'raquel.ortega@email.com', 'whatsapp_id' => '34890123457', 'telegram_id' => 'raquel_o', 'instagram_id' => 'raquel_o'],
            ['nombre' => 'Sergio', 'apellido' => 'Ramos', 'telefono' => '+34912345696', 'correo' => 'sergio.ramos@email.com', 'whatsapp_id' => '34901234568', 'telegram_id' => 'sergio_r', 'instagram_id' => 'sergio_r'],
            ['nombre' => 'Marta', 'apellido' => 'Serrano', 'telefono' => '+34912345697', 'correo' => 'marta.serrano@email.com', 'whatsapp_id' => '34012345679', 'telegram_id' => 'marta_s', 'instagram_id' => 'marta_s'],
            ['nombre' => 'Antonio', 'apellido' => 'Blanco', 'telefono' => '+34912345698', 'correo' => 'antonio.blanco@email.com', 'whatsapp_id' => '34123456781', 'telegram_id' => 'antonio_b', 'instagram_id' => 'antonio_b'],
            ['nombre' => 'Cristina', 'apellido' => 'Molina', 'telefono' => '+34912345699', 'correo' => 'cristina.molina@email.com', 'whatsapp_id' => '34234567892', 'telegram_id' => 'cristina_m', 'instagram_id' => 'cristina_m'],
            ['nombre' => 'Óscar', 'apellido' => 'Vázquez', 'telefono' => '+34912345700', 'correo' => 'oscar.vazquez@email.com', 'whatsapp_id' => '34345678903', 'telegram_id' => 'oscar_v', 'instagram_id' => 'oscar_v'],
            ['nombre' => 'Nuria', 'apellido' => 'Delgado', 'telefono' => '+34912345701', 'correo' => 'nuria.delgado@email.com', 'whatsapp_id' => '34456789014', 'telegram_id' => 'nuria_d', 'instagram_id' => 'nuria_d'],
            ['nombre' => 'Roberto', 'apellido' => 'Suárez', 'telefono' => '+34912345702', 'correo' => 'roberto.suarez@email.com', 'whatsapp_id' => '34567890125', 'telegram_id' => 'roberto_s', 'instagram_id' => 'roberto_s'],
            ['nombre' => 'Beatriz', 'apellido' => 'Herrero', 'telefono' => '+34912345703', 'correo' => 'beatriz.herrero@email.com', 'whatsapp_id' => '34678901236', 'telegram_id' => 'beatriz_h', 'instagram_id' => 'beatriz_h'],
            ['nombre' => 'Jesús', 'apellido' => 'Cano', 'telefono' => '+34912345704', 'correo' => 'jesus.cano@email.com', 'whatsapp_id' => '34789012347', 'telegram_id' => 'jesus_c', 'instagram_id' => 'jesus_c'],
            ['nombre' => 'Eva', 'apellido' => 'Iglesias', 'telefono' => '+34912345705', 'correo' => 'eva.iglesias@email.com', 'whatsapp_id' => '34890123458', 'telegram_id' => 'eva_i', 'instagram_id' => 'eva_i'],
            ['nombre' => 'Alberto', 'apellido' => 'Castro', 'telefono' => '+34912345706', 'correo' => 'alberto.castro@email.com', 'whatsapp_id' => '34901234569', 'telegram_id' => 'alberto_c', 'instagram_id' => 'alberto_c'],
            ['nombre' => 'Silvia', 'apellido' => 'Vidal', 'telefono' => '+34912345707', 'correo' => 'silvia.vidal@email.com', 'whatsapp_id' => '34012345680', 'telegram_id' => 'silvia_v', 'instagram_id' => 'silvia_v'],
        ];

        foreach ($mensajeros as $mensajero) {
            Mensajero::create($mensajero);
        }
    }
}