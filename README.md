<div align="center">
  <img src="https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/n8n-FF6E57?style=for-the-badge&logo=n8n&logoColor=white" alt="n8n" />
  <img src="https://img.shields.io/badge/Gemini-8E75B2?style=for-the-badge&logo=google-gemini&logoColor=white" alt="Google Gemini" />
  <img src="https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white" alt="Telegram" />
  <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail" />
</div>

<h1 align="center">One Thread</h1>

<p align="center">
  <strong>Plataforma SaaS para la centralización y clasificación inteligente de canales de comunicación para PyMEs.</strong>
</p>

## Sobre el Proyecto

**One Thread** es una solución desarrollada como proyecto final para la unidad curricular **PHP como taller**, perteneciente a la carrera **Tecnólogo en Informática** de la **UTEC (Universidad Tecnológica), sede Paysandú**.

Este sistema nace con el objetivo de proveer a las PyMEs una herramienta centralizada, simple y accesible para gestionar la atención al cliente de forma omnicanal. Mediante la automatización de flujos y el uso de Inteligencia Artificial, One Thread optimiza los tiempos de respuesta y reduce significativamente la carga operativa de los equipos de soporte.

### Equipo de Desarrollo

- **Jhon Guimaraens**
- **Carlos Cardozo**
- **Pilar Perez**
- **Matías Parente**

---

## Características Principales

- **Centralización Multicanal:** Integración fluida de canales de mensajería como **Telegram** y correo electrónico (**Gmail**) en una única interfaz web.
- **Clasificación con IA:** Análisis y etiquetado automático del contenido, prioridad y sentimiento de los mensajes entrantes utilizando la inteligencia artificial de **Google Gemini**.
- **Flujos Automatizados:** Recepción, procesamiento y orquestación de mensajes impulsados a través de **n8n**.
- **Gestión de Agentes:** Asignación automática o manual de tickets a los agentes correspondientes, manteniendo un historial consolidado por cliente.
- **Interfaz Moderna:** Aplicación de página única (SPA) desarrollada con **React** y estilizada con **Tailwind CSS**, garantizando una experiencia de usuario rápida e intuitiva.

---

## Tecnologías y Herramientas

### Backend y Arquitectura Core
- **[Laravel 11+](https://laravel.com/):** Framework principal del backend (PHP 8.3+).
- **[SQLite / MySQL](https://www.mysql.com/):** Base de datos relacional (SQLite para desarrollo/testing, MySQL/MariaDB para producción).
- **[Laravel Breeze & Sanctum](https://laravel.com/docs/breeze):** Sistema de autenticación robusto y seguro.

### Frontend
- **[React 18](https://reactjs.org/):** Biblioteca para la construcción de interfaces de usuario.
- **[Inertia.js v2](https://inertiajs.com/):** Enlace entre Laravel y React sin necesidad de construir una API REST clásica.
- **[Tailwind CSS 3](https://tailwindcss.com/):** Framework de utilidades CSS para un diseño ágil y moderno.
- **[Vite 8](https://vitejs.dev/):** Entorno de desarrollo ultrarrápido y empaquetador de módulos.

### Integraciones y Automatización
- **[n8n](https://n8n.io/):** Herramienta de automatización de flujos de trabajo (orquestación de bots).
- **[Bots de Telegram & Gmail API](https://core.telegram.org/bots):** Fuentes de entrada de mensajes.
- **[Google Gemini](https://deepmind.google/technologies/gemini/):** Motor de IA para el análisis semántico y clasificación de la información.

---

## Instalación y Configuración Local

Siga estos pasos para desplegar el entorno de desarrollo en su máquina local:

### 1. Requisitos Previos

Asegúrese de contar con el siguiente software instalado:
- **PHP** (v8.3 o superior)
- **Composer**
- **Node.js** (v18 o superior) y **npm**
- **Git**

### 2. Clonar el Repositorio

```bash
git clone https://github.com/MatiasParente/one-thread.git
cd one-thread
```

### 3. Configuración Inicial

Para instalar las dependencias (PHP y Node), generar el archivo `.env` inicial, crear la clave de la aplicación y correr las migraciones automáticamente, ejecute el comando personalizado incluido en el proyecto:

```bash
composer setup
```

### 4. Variables de Entorno

Abra el archivo `.env` en la raíz del proyecto y configure los parámetros de su base de datos, así como el secreto para los webhooks provenientes de n8n:

```env
# Configuración de Base de Datos (Por defecto SQLite)
DB_CONNECTION=sqlite

# En caso de utilizar MySQL:
# DB_CONNECTION=mysql
# DB_DATABASE=one_thread
# DB_USERNAME=root
# DB_PASSWORD=tu_contraseña

# Seguridad del Webhook
N8N_WEBHOOK_SECRET=tu_secreto_aqui
```

### 5. Levantar el Entorno de Desarrollo

El proyecto requiere ejecutar los servidores de backend y frontend en simultáneo. Puede utilizar nuestro comando integrado o ejecutar ambos procesos en terminales separadas:

**Opción A: Todo en uno**
```bash
composer dev
```
*(Requiere que el entorno soporte ejecución concurrente de procesos)*

**Opción B: Terminales separadas**

Terminal 1 (Servidor de Laravel):
```bash
php artisan serve
```

Terminal 2 (Servidor de Vite):
```bash
npm run dev
```

La plataforma estará disponible en: [http://localhost:8000](http://localhost:8000).

---

<p align="center">
  Desarrollado para la materia <strong>PHP como taller</strong> - UTEC Paysandú, Uruguay
</p>
