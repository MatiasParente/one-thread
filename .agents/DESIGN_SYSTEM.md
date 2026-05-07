# Design System: One Thread

## 1. Filosofía de Diseño

**Metáfora central: El Prisma**

La comunicación empresarial es caótica: múltiples canales, diferentes prioridades, mensajes sin clasificar. One Thread actúa como un prisma que filtra ese caos en hilos ordenados, paralelos y priorizados.

| Concepto | Traducción UI |
|---|---|
| **Caos (entrada)** | Mensajes de Telegram, Email, WhatsApp con diferentes formatos y urgencias |
| **El Prisma (One Thread)** | Interfaz limpia, sin elementos decorativos innecesarios |
| **Orden (salida)** | Componentes geométricos, colores semánticos, alineación estricta |

**Principios:**
1. **Claridad sobre belleza** — Cada pixel debe comunicar, no decorar
2. **Densidad controlada** — Mucha información, pero nunca abrumadora
3. **Consistencia absoluta** — Un componente se ve igual en todas las vistas
4. **Accesibilidad como estándar** — No es un extra, es un requisito

---

## 2. Design Tokens

### 2.1 Tipografía

**Familia:** Inter (Google Fonts) — legible, neutra, profesional. Fallback: system-ui.

| Token | Tamaño | Peso | Line-height | Uso |
|---|---|---|---|---|
| `heading-xl` | 30px | 700 | 1.2 | Títulos de página |
| `heading-lg` | 24px | 700 | 1.3 | Secciones principales |
| `heading-md` | 20px | 600 | 1.3 | Subsecciones, nombres de contacto |
| `body-lg` | 16px | 400 | 1.5 | Texto principal, contenido de mensajes |
| `body-md` | 14px | 400 | 1.5 | Texto secundario, metadatos |
| `body-sm` | 12px | 400 | 1.4 | Timestamps, captions, badges |
| `mono` | 13px | 400 | 1.5 | Datos técnicos, IDs |

---

### 2.2 Espaciado

**Base:** 4px. Escala multiplicativa.

| Token | Valor | Uso típico |
|---|---|---|
| `space-1` | 4px | Espacio mínimo entre elementos inline |
| `space-2` | 8px | Padding interno de badges, separación de texto |
| `space-3` | 12px | Gap entre items de lista, padding de inputs |
| `space-4` | 16px | Padding de cards, separación de secciones |
| `space-6` | 24px | Margen entre componentes |
| `space-8` | 32px | Separación de bloques |
| `space-12` | 48px | Secciones grandes |
| `space-16` | 64px | Márgenes de página |

---

### 2.3 Paleta de Color

#### Primarios (La marca)

| Token | Hex | Uso |
|---|---|---|
| `primary` | `#226583` | Acciones principales, enlaces, canal Telegram, estado Nuevo |
| `primary-hover` | `#1a506a` | Hover sobre elementos primarios |
| `primary-light` | `#e8f1f6` | Fondos sutiles, badges de canal Telegram |

#### Semánticos (Estados)

| Token | Hex | Uso | Contraste vs blanco |
|---|---|---|---|
| `danger` | `#C41E3A` | Prioridad Urgente, errores, acciones destructivas | 5.9:1 ✅ AA |
| `success` | `#308230` | Estado Resuelto, sentimiento positivo, confirmaciones | 4.8:1 ✅ AA |
| `warning` | `#B8860B` | Prioridad Normal, estado En Proceso, alertas | 4.7:1 ✅ AA |
| `info` | `#226583` | Estado Nuevo, información general | 4.5:1 ✅ AA |

#### Neutrales

| Token | Hex | Uso |
|---|---|---|
| `white` | `#FFFFFF` | Fondo principal, superficies |
| `gray-50` | `#F9FAFB` | Fondo alternativo, zonas sutiles |
| `gray-100` | `#F3F4F6` | Bordes, separadores, fondos de sidebar |
| `gray-200` | `#E5E7EB` | Bordes de inputs, divisores |
| `gray-400` | `#9CA3AF` | Texto placeholder, iconos deshabilitados |
| `gray-600` | `#4B5563` | Texto secundario |
| `gray-800` | `#1F2937` | Texto principal |
| `gray-900` | `#111827` | Títulos |

#### Canales

| Token | Hex | Nota |
|---|---|---|
| `channel-telegram` | `#226583` | Mismo que primary (alineado con la marca) |
| `channel-whatsapp` | `#075E54` | Verde oscuro de WhatsApp, diferenciado de success |
| `channel-email` | `#6B7280` | Gris neutro, representa comunicación estándar |

---

### 2.4 Proporciones de Color (Regla 60-30-10)

| Proporción | Color | Aplicación |
|---|---|---|
| **60%** | Neutrales (white, gray-50, gray-100) | Fondos, superficies, espacios |
| **30%** | Primary (`#226583`) | Navegación, acciones, elementos interactivos |
| **10%** | Semánticos (danger, success, warning) | Badges, alertas, estados — uso limitado y preciso |

---

### 2.5 Bordes y Radios

| Token | Valor | Uso |
|---|---|---|
| `radius-sm` | 4px | Inputs, botones pequeños |
| `radius-md` | 8px | Cards, badges, botones |
| `radius-lg` | 12px | Modales, contenedores grandes |
| `radius-full` | 9999px | Pills (badges de estado, avatares) |
| `border-default` | 1px solid `gray-200` | Bordes estándar |

---

### 2.6 Sombras

| Token | Valor | Uso |
|---|---|---|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Cards sutiles |
| `shadow-md` | `0 4px 6px rgba(0,0,0,0.07)` | Dropdowns, popovers |
| `shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modales, overlays |

---

## 3. Componentes

### 3.1 Botones

| Variante | Estilo | Uso |
|---|---|---|
| **Primary** | Fondo `primary`, texto blanco | Acciones principales (Enviar, Asignar, Guardar) |
| **Secondary** | Fondo blanco, borde `gray-200`, texto `gray-800` | Acciones secundarias (Cancelar, Filtrar) |
| **Danger** | Fondo `danger`, texto blanco | Acciones destructivas (Eliminar, Rechazar) |
| **Ghost** | Sin fondo, texto `primary` | Acciones terciarias (Ver más, Enlaces) |

**Estados:** default → hover (oscurecer 10%) → active (oscurecer 15%) → disabled (opacidad 50%) → focus (ring 2px `primary` con offset 2px).

**Tamaños:** sm (32px), md (36px), lg (44px).

---

### 3.2 Inputs

| Elemento | Spec |
|---|---|
| Altura | 36px (md), 44px (lg) |
| Borde | 1px `gray-200`, radius `sm` |
| Padding | 8px 12px |
| Focus | Borde `primary`, ring 2px `primary-light` |
| Error | Borde `danger`, texto de error en `danger` debajo |
| Placeholder | `gray-400` |

**Variantes:** Text, Textarea, Select, Search.

---

### 3.3 Badges (Pills)

| Variante | Fondo | Texto | Uso |
|---|---|---|---|
| `urgent` | `danger` | blanco | Prioridad urgente |
| `normal` | `warning` | blanco | Prioridad normal |
| `bajo` | `gray-200` | `gray-600` | Prioridad baja |
| `nuevo` | `primary-light` | `primary` | Estado nuevo |
| `en-proceso` | `#FEF3C7` | `#92400E` | Estado en proceso |
| `resuelto` | `#D1FAE5` | `#065F46` | Estado resuelto |
| `positivo` | `#D1FAE5` | `#065F46` | Sentimiento positivo |
| `negativo` | `#FEE2E2` | `#991B1B` | Sentimiento negativo |
| `neutro` | `gray-100` | `gray-600` | Sentimiento neutro |

**Spec:** Padding 2px 8px, font-size 12px, font-weight 500, radius `full`.

---

### 3.4 Cards

| Variante | Uso |
|---|---|
| **Card base** | Fondo blanco, border `gray-200`, radius `md`, shadow `sm`, padding `space-4` |
| **KPI Card** | Card base + número grande (`heading-xl`), label en `body-sm` `gray-600`, icono semántico |
| **Conversation Card** | Card base + avatar + nombre + preview + timestamp + badges de estado/canal |

---

### 3.5 Inbox (Lista de Conversaciones)

**Estructura por fila:**

| Elemento | Posición | Spec |
|---|---|---|
| Avatar | Izquierda | 40px, radius `full` |
| Canal icon | Esquina del avatar | 16px, fondo según canal, radius `full` |
| Nombre contacto | Centro-top | `heading-md`, truncate a 1 línea |
| Preview mensaje | Centro-bottom | `body-md` `gray-600`, truncate a 1 línea |
| Timestamp | Derecha-top | `body-sm` `gray-400` |
| Badges | Derecha-bottom | Badges de prioridad/estado |

**Estados de fila:** default → hover (`gray-50`) → selected (`primary-light` + borde izquierdo `primary` 3px) → unread (nombre en `gray-900` bold).

**Densidad:** Padding 12px 16px por fila, separador 1px `gray-100`.

---

### 3.6 Chat (Vista de Conversación)

| Elemento | Spec |
|---|---|
| Burbuja agente | Fondo `#D1FAE5`, texto `gray-800`, radius 12px (con cola), alineada izquierda |
| Burbuja contacto | Fondo `primary-light`, texto `gray-800`, radius 12px (con cola), alineada derecha |
| Timestamp | `body-sm` `gray-400`, debajo de cada burbuja |
| Separador de fecha | Línea horizontal + texto centrado `body-sm` `gray-400` |
| Input de respuesta | Textarea + botón enviar, fijo abajo |

---

### 3.7 Tablas

| Elemento | Spec |
|---|---|
| Header | Fondo `gray-50`, font-weight 600, `body-sm`, sticky |
| Filas | Padding 12px 16px, border-bottom `gray-100` |
| Hover | Fondo `gray-50` |
| Selected | Fondo `primary-light` |
| Celdas | `body-md` |

---

### 3.8 Modals

| Elemento | Spec |
|---|---|
| Overlay | `rgba(0,0,0,0.4)`, backdrop-blur 2px |
| Contenedor | Max-width 480px, radius `lg`, shadow `lg` |
| Header | `heading-lg`, padding 24px 24px 0 |
| Body | Padding 16px 24px |
| Footer | Padding 0 24px 24px, botones alineados derecha |

---

### 3.9 Navegación (Sidebar)

| Elemento | Spec |
|---|---|
| Ancho | 240px (colapsable a 64px en mobile) |
| Fondo | `white` con borde derecho `gray-200` |
| Logo | Parte superior, 48px de alto |
| Items | Icono + label, padding 8px 16px, radius `sm` |
| Active item | Fondo `primary-light`, texto `primary`, borde izquierdo 3px `primary` |
| Hover | Fondo `gray-50` |

---

### 3.10 Avatars

| Tamaño | Uso |
|---|---|
| 24px | Listas compactas, comentarios inline |
| 32px | Tablas, sidebars |
| 40px | Inbox, chat headers |
| 64px | Perfil de usuario |

**Fallback:** Iniciales sobre fondo `primary-light` con texto `primary`.

---

### 3.11 Loading & Empty States

| Estado | Spec |
|---|---|
| **Skeleton** | Rectángulos `gray-100` con animación shimmer, misma estructura que el contenido real |
| **Spinner** | 24px, borde 3px `gray-200` + borde-top `primary`, rotación |
| **Empty state** | Icono ilustrativo 64px `gray-300` + texto `body-lg` `gray-400` + botón de acción |

---

### 3.12 Toast Notifications

| Elemento | Spec |
|---|---|
| Posición | Bottom-right |
| Animación | Slide-in desde la derecha, fade-out al dismiss |
| Success | Fondo `success`, icono check, auto-dismiss 3s |
| Error | Fondo `danger`, icono X, auto-dismiss 5s |
| Warning | Fondo `warning`, icono alerta, auto-dismiss 4s |

---

## 4. Iconografía

**Librería:** Lucide React (consistente, open source, bien mantenido).

**Tamaños:** 16px (badges, inline), 20px (botones, inputs), 24px (navegación), 32px (empty states).

**Color:** Hereda del texto padre. Iconos de canal usan sus colores definidos.

---

## 5. Patrones de Interacción

| Patrón | Comportamiento |
|---|---|
| **Hover en inbox** | Fondo `gray-50`, cursor pointer |
| **Selección en inbox** | Fondo `primary-light`, borde izquierdo 3px `primary` |
| **Hover en botón** | Oscurecer fondo 10% |
| **Focus (keyboard)** | Ring 2px `primary` con offset 2px (visible siempre, no solo con Tab) |
| **Nuevo mensaje** | Fade-in 200ms de la fila, badge "Nuevo" aparece con fade-in 150ms |
| **Cambio de estado** | Badge se actualiza con crossfade 200ms |
| **Toast success** | Slide-in desde abajo-derecha, auto-dismiss 3s, fondo `success` |
| **Toast error** | Slide-in desde abajo-derecha, auto-dismiss 5s, fondo `danger` |
| **Loading** | Skeleton shimmer 1.5s infinite, spinner rotación 0.8s |

---

## 6. Responsive

| Breakpoint | Ancho | Comportamiento |
|---|---|---|
| **Mobile** | < 768px | Sidebar colapsada (hamburger), inbox full-width, chat full-width, stack vertical |
| **Tablet** | 768px – 1023px | Sidebar iconos (64px), inbox 320px + chat restante |
| **Desktop** | ≥ 1024px | Sidebar expandida (240px), inbox 360px + chat restante |

---

## 7. Implementación Técnica (Tailwind CSS 3)

Extensión sugerida para `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      primary: '#226583',
      'primary-hover': '#1a506a',
      'primary-light': '#e8f1f6',
      danger: '#C41E3A',
      success: '#308230',
      warning: '#B8860B',
      'channel-telegram': '#226583',
      'channel-whatsapp': '#075E54',
      'channel-email': '#6B7280',
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
    },
    borderRadius: {
      sm: '4px',
      md: '8px',
      lg: '12px',
    },
    boxShadow: {
      sm: '0 1px 2px rgba(0,0,0,0.05)',
      md: '0 4px 6px rgba(0,0,0,0.07)',
      lg: '0 10px 15px rgba(0,0,0,0.1)',
    },
  },
}
```

---

## 8. Accesibilidad

| Requisito | Estándar |
|---|---|
| Contraste texto/fondo | Mínimo 4.5:1 (AA) para texto normal, 3:1 para texto grande |
| Focus indicators | Siempre visibles, ring 2px `primary` |
| Touch targets | Mínimo 44x44px en mobile |
| Screen reader | Labels en todos los inputs, aria-labels en iconos sin texto |
| Color como único indicador | Siempre acompañar con icono o texto (ej: no solo rojo para error) |

---

## 9. Checklist de Componentes MVP

| # | Componente | Estado |
|---|---|---|
| 1 | Botones (4 variantes) | Por crear |
| 2 | Inputs (text, textarea, select, search) | Por crear |
| 3 | Badges (9 variantes semánticas) | Por crear |
| 4 | Cards (base, KPI, conversación) | Por crear |
| 5 | Inbox (lista de conversaciones) | Por crear |
| 6 | Chat (burbujas + input) | Por crear |
| 7 | Tablas | Por crear |
| 8 | Modals | Por crear |
| 9 | Sidebar navigation | Por crear |
| 10 | Avatars | Por crear |
| 11 | Toast notifications | Por crear |
| 12 | Loading states (skeleton, spinner) | Por crear |
| 13 | Empty states | Por crear |
| 14 | Dropdown/Popover | Por crear |
| 15 | Tabs | Por crear |
