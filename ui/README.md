# CookieGuard UI - Documentación

## Estructura del Proyecto

```
ui/
├── popup.html          # Página principal
├── notificaciones.html # Sección de notificaciones
├── configuracion.html  # Sección de configuración
├── ayuda.html         # Sección de ayuda
├── popup.css          # Estilos principales
├── popup.js           # Lógica del popup principal
├── navigation.js      # Sistema de navegación
├── config.js          # Configuración centralizada
└── README.md          # Esta documentación
```

## Mejores Prácticas Implementadas

### 1. **Separación de Responsabilidades**
- **HTML**: Solo estructura y contenido
- **CSS**: Solo estilos y presentación
- **JavaScript**: Solo lógica y comportamiento

### 2. **Código DRY (Don't Repeat Yourself)**
- Navegación centralizada en `navigation.js`
- Configuración centralizada en `config.js`
- Estilos reutilizables en `popup.css`

### 3. **Modularidad**
- Cada funcionalidad en su propio archivo
- Fácil mantenimiento y escalabilidad
- Código reutilizable

### 4. **Configuración Centralizada**
- Todas las constantes en `config.js`
- Fácil modificación de textos, iconos y estilos
- Sin valores hardcodeados en el código

### 5. **Navegación Inteligente**
- Sistema de navegación automático
- Resaltado de página activa
- Fácil agregar nuevas páginas

## Cómo Agregar una Nueva Página

1. Crear el archivo HTML (ej: `nueva-pagina.html`)
2. Agregar la referencia en `config.js`:
   ```javascript
   PAGES: {
     // ... páginas existentes
     NUEVA_PAGINA: 'nueva-pagina.html'
   }
   ```
3. Agregar el botón en el menú de navegación
4. El sistema de navegación se encargará automáticamente

## Convenciones de Nomenclatura

- **Archivos**: kebab-case (`mi-archivo.html`)
- **Clases CSS**: kebab-case (`.mi-clase`)
- **IDs**: camelCase (`miId`)
- **Variables JS**: camelCase (`miVariable`)
- **Constantes**: UPPER_SNAKE_CASE (`MI_CONSTANTE`)

## Mantenimiento

- Actualizar `config.js` para cambios de configuración
- Modificar `navigation.js` para cambios en navegación
- Usar `popup.css` para estilos globales
- Documentar cambios en este README 