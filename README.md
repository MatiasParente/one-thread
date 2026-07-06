# One Thread

<p align="center">
  <strong>Plataforma que centraliza los canales de comunicación de PyMEs (Telegram y Email) en una única interfaz.</strong><br>
  Los mensajes recibidos son clasificados automáticamente con IA (Gemini), asignados al agente correspondiente, y priorizados para optimizar tiempos de respuesta y reducir costos operativos.
</p>

---

## Objetivo

Proveer a PyMEs una herramienta simple y accesible para gestionar la atención al cliente multicanal, con clasificación inteligente de mensajes y asignación automática a agentes. Ahorrando tiempo, esfuerzo y dinero.

## Stack Tecnológico

- **Backend:** Laravel 13 + PHP 8.3+
- **Frontend:** React 18 + Inertia.js v2 + Tailwind CSS 3 + Vite 8
- **Autenticación:** Laravel Breeze (React) + Sanctum
- **Base de Datos:** SQLite (desarrollo/testing) / MySQL o MariaDB (producción)
- **IA:** Google Gemini (Capa gratuita)

---

## Instalación Local

Sigue estos pasos para levantar el proyecto en tu entorno local.

### 1. Requisitos Previos

Asegúrate de tener instalado en tu sistema:
- [PHP](https://www.php.net/downloads) 8.3 o superior
- [Composer](https://getcomposer.org/)
- [Node.js](https://nodejs.org/) (v18 o superior)
- [Git](https://git-scm.com/)

### 2. Clonar el Repositorio

```bash
git clone https://github.com/MatiasParente/one-thread
cd one-thread
```

### 3. Configuración Inicial

Para instalar las dependencias (PHP y Node), generar el archivo `.env` inicial, crear la key de la aplicación y correr las migraciones automáticamente, simplemente ejecuta:

```bash
composer setup
```


### 4. Configurar Variables de Entorno

Abre el archivo `.env` en la raíz del proyecto y asegúrate de configurar tu conexión a la base de datos y el secreto para los webhooks de n8n:

```env
# Configuración de Base de Datos
DB_CONNECTION=sqlite
# O si usas MySQL:
# DB_CONNECTION=mysql
# DB_DATABASE=one_thread
# DB_USERNAME=root
# DB_PASSWORD=

# Webhook
N8N_WEBHOOK_SECRET=tu_secreto_aqui
```

### 5. Levantar el Servidor de Desarrollo

Para iniciar el entorno localmente, abre dos terminales separadas en la carpeta del proyecto y ejecuta:

**Terminal 1 (Backend de Laravel):**
```bash
php artisan serve
```

**Terminal 2 (Frontend de Vite):**
```bash
npm run dev
```

La aplicación estará disponible en [http://localhost:8000](http://localhost:8000).

---

**Con esto el proyecto quedaria operativo en su entorno local**
