# AGENTS.md

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
