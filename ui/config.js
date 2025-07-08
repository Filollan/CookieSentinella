// config.js - Configuración centralizada de la aplicación
const CONFIG = {
  // Configuración de navegación
  PAGES: {
    INICIO: 'popup.html',
    NOTIFICACIONES: 'notification/notification.html',
    CONFIGURACION: 'config/config.html',
    AYUDA: 'help/help.html'
  },
  
  // Configuración de estilos
  STYLES: {
    POPUP_WIDTH: '380px',
    POPUP_MIN_HEIGHT: '587px',
    ACTIVE_COLOR: '#20B2AA'
  },
  
  // Configuración de iconos
  ICONS: {
    LOGO: '../icons/icon48.png',
    ESCUDO: '../icons/escudoo.png',
    CAMPANA: '../icons/campana.svg',
    AJUSTES: '../icons/ajustes.svg',
    AYUDA: '../icons/ayuda.svg'
  },
  
  // Configuración de textos
  TEXTS: {
    APP_NAME: 'CookieGuard',
    LOADING: 'Cargando estado...',
    SESSION_CHECK: 'Verificando sesión...',
    NO_NOTIFICATIONS: 'No tienes notificaciones nuevas.',
    COMING_SOON: 'Próximamente podrás personalizar tu experiencia.',
    HELP_MESSAGE: '¿Tienes dudas? Pronto encontrarás aquí respuestas y recursos útiles.'
  }
};

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CONFIG;
} 