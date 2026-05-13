# AGENTS.md

## Project Overview

**One Thread** es una plataforma SaaS que centraliza los canales de comunicación de PyMEs (Telegram, WhatsApp, Email, etc.) en una única interfaz. Los mensajes recibidos son clasificados automáticamente con IA (Gemini), asignados al agente correspondiente, y priorizados para optimizar tiempos de respuesta y reducir costos operativos.

### Objetivo
Proveer a PyMEs una herramienta simple y accesible para gestionar la atención al cliente multicanal, con clasificación inteligente de mensajes y asignación automática a agentes.

### Propósito/Misión
Centralizar la comunicación empresarial, clasificar mensajes automáticamente con IA, y asignarlos al personal adecuado — ahorrando tiempo, esfuerzo y dinero.

### Usuarios objetivo
- **Administradores**: Dueños/encargados del negocio que configuran el sistema y supervisan operaciones
- **Agentes/Operadores**: Personal que atiende directamente los mensajes de los clientes
- **Clientes externos**: Los clientes del negocio (no acceden al sistema, solo envían mensajes por los canales integrados)

### Estado actual
MVP/Prototipo en desarrollo. Equipo de 2-3 desarrolladores. Plazo estimado: 1-2 meses para versión funcional.

### Región
Uruguay

### Canales de comunicación (MVP)
- Telegram (primera integración)
- Email
- WhatsApp (futuro)

### Funcionalidades core del MVP
1. Recepción de mensajes desde canales integrados
2. Clasificación automática con IA (Gemini - capa gratuita)
3. Asignación de mensajes a agentes
4. Historial de conversaciones por cliente
5. Dashboard con métricas y reportes
6. Gestión de usuarios y roles

### Datos capturados por mensaje
- Contenido del mensaje
- Datos del contacto (nombre, teléfono, email)
- Canal de origen
- Timestamp
- Clasificación IA
- Prioridad (urgente, normal, bajo)
- Estado (nuevo, en proceso, resuelto)

### Arquitectura de integración
- **Laravel orquesta**: Laravel recibe, n8n clasifica, Laravel asigna
- **IA**: Google Gemini (capa gratuita)
- **Integración n8n**: Por definir (API REST, webhooks, o acceso directo a DB)

### Modelo de negocio
- Suscripción por planes (plan único actualmente)
- Target: PyMEs

### Diferenciador clave
Simplicidad y UX — fácil de configurar y usar.

### KPIs de éxito
- Reducción de tiempo de respuesta
- Volumen de mensajes procesados
- Satisfacción del cliente (CSAT)
- Ahorro de tiempo del equipo

### Infraestructura
- Hosting: VPS/Servidor propio
- Móvil: No planeada (solo web responsive)
- Dominio: No definido aún

### Integraciones adicionales
Ninguna por ahora (enfoque en el MVP core)

### Design System
Ver `.agents/DESIGN_SYSTEM.md` — tokens de color, tipografía, espaciado, componentes UI, patrones de interacción y accesibilidad. Todas las decisiones estéticas deben basarse en ese documento.

---

## Stack

- Laravel 13 + PHP 8.3+, React 18 + Inertia.js v2, Tailwind CSS 3, Vite 8
- Auth: Laravel Breeze (React variant) + Sanctum
- Testing: Pest v4, Linting: Laravel Pint
- DB: SQLite default (tests always use `:memory:`), MySQL/MariaDB for prod
- Platform: Windows / WAMP

## Commands

```bash
composer dev          # full dev server (artisan + queue + pail + vite concurrently)
composer test         # clears config cache then runs artisan test
composer setup        # install deps, copy .env, key:generate, migrate, npm install, build
php artisan test      # run Pest tests (Unit + Feature)
php artisan test --filter=TestName   # single test
vendor/bin/pint      # PHP formatter (Laravel Pint)
```

## Architecture

- **Inertia SPA**: backend returns `Inertia::render('PageName', $data)`, frontend resolves from `resources/js/Pages/{PageName}.jsx`
- **Path alias**: `@/*` = `resources/js/*` (defined in `jsconfig.json`)
- **Ziggy**: `route()` helper available in JS via `@routes` Blade directive
- **Root template**: `resources/views/app.blade.php` — uses `@viteReactRefresh` + `@vite`
- **Entry point**: `resources/js/app.jsx` → pages glob `./Pages/**/*.jsx`

## Frontend structure

```
resources/js/
  Pages/          # Inertia page components (.jsx)
  Components/     # reusable UI atoms (TextInput, Modal, Dropdown, etc.)
  Layouts/        # AuthenticatedLayout, GuestLayout
  features/       # feature folders (currently empty placeholders)
  hooks/          # empty, ready for custom hooks
  shared/         # empty, ready for shared utils
  store/          # empty, ready for state management
```

## Domain models (snake_case naming convention)

| Model | Table | Key relations |
|---|---|---|
| `User` | `users` | hasOne Admin |
| `Admin` | `admins` | belongsTo User (id_user), belongsToMany Categoria via admin_categorias |
| `Categoria` | `categorias` | belongsToMany Admin via admin_categorias, hasMany Tipo |
| `Mensajero` | `mensajeros` | hasMany Mensaje |
| `Mensaje` | `mensajes` | belongsTo Mensajero, hasOne Mensaje_Clasificado, hasMany Admin_Mensaje |
| `Mensaje_Clasificado` | `mensajes_clasificados` | belongsTo Mensaje, hasMany Tipo_Mensaje |
| `Tipo` | `tipos` | belongsTo Categoria |
| `Tipo_Mensaje` | `tipo_mensaje` | pivot (Mensaje_Clasificado ↔ Tipo) |
| `Admin_Categoria` | `admin_categorias` | pivot with explicit model |
| `Admin_Mensaje` | `admin_mensajes` | pivot with explicit model |

FK convention: `id_{referenced_table}` (e.g. `id_user`, `id_admin`, `id_categoria`).

## Backend: Controllers & Routes

> **REGLA**: Cada vez que se cree, modifique o elimine un controller, 
> **actualizar esta sección**. Los agentes dependen de esta documentación 
> para saber qué operaciones CRUD están disponibles y cuáles no.

### Controllers implementados

| Controller | Entity | Métodos implementados | Rutas | Notas |
|---|---|---|---|---|
| `MensajeController` | `Mensaje` | index, create, store, edit, update, destroy | `mensajes-simples.*` | Falta `show` (ruta registrada pero método no existe) |
| `MensajeClasificadoController` | `Mensaje_Clasificado` | create, store, show, edit, update, destroy | `mensajes-clasificados.*` | `index` no está en `only()` pero existe en el controller |
| `CategoriaController` | `Categoria` | index, store, update, destroy, create, show, edit | `categorias.*` (resource completo) | (ruta registrada, método no existe) |
| `TipoController` | `Tipo` | index, store, update, destroy, create, show, edit | `tipos.*` (resource completo) | (ruta registrada, método no existe) |
| `ProfileController` | `User` / `Admin` | edit, update, destroy | `GET/PATCH/DELETE /profile` | Implementado completamente |
| `AdminController` | `Admin` | index | **Sin ruta** | Implementado pero no expuesto en `web.php` |

### Controllers stub (vacíos)

| Controller | Entity | Estado |
|---|---|---|
| `MensajeroController` | `Mensajero` | Stub vacío — sin métodos ni rutas |
| `TipoMensajeController` | `Tipo_Mensaje` | Stub vacío — sin métodos ni rutas |
| `AdminCategoriaController` | `Admin_Categoria` | Stub vacío — sin métodos ni rutas |
| `AdminMensajeController` | `Admin_Mensaje` | Stub vacío — sin métodos ni rutas |

### Auth controllers (Breeze)

| Controller | Rutas | Estado |
|---|---|---|
| `AuthenticatedSessionController` | `GET/POST /login`, `POST /logout` | Implementado |
| `RegisteredUserController` | `GET/POST /register` | Implementado (customizado: crea User + Admin + Categorias) |
| `PasswordResetLinkController` | `GET/POST /forgot-password` | Implementado (Breeze default) |
| `NewPasswordController` | `GET /reset-password/{token}`, `POST /reset-password` | Implementado (Breeze default) |
| `PasswordController` | `PUT /password` | Implementado (Breeze default) |
| `ConfirmablePasswordController` | `GET/POST /confirm-password` | Implementado (Breeze default) |
| `EmailVerificationPromptController` | `GET /verify-email` | Implementado (Breeze default) |
| `VerifyEmailController` | `GET /verify-email/{id}/{hash}` | Implementado (Breeze default) |

## Conventions that differ from defaults

- Models use **snake_case class names** (`Admin_Categoria`, not `AdminCategoria`) — non-standard for Laravel
- Several controllers are stubs (MensajeController, CategoriaController) — only AdminController and ProfileController have logic
- `Dashboard.jsx` contains an inline `ConversationItem` component — the author noted it should be extracted
- `.npmrc` has `ignore-scripts=true`; always run `npm install --ignore-scripts`
- Tests use Pest syntax with `RefreshDatabase` trait auto-applied to Feature tests

## Testing

- Feature tests auto-migrate with SQLite `:memory:`
- No custom test helpers beyond Pest defaults
- Auth tests exist in `tests/Feature/Auth/`, Profile test in `tests/Feature/ProfileTest.php`
