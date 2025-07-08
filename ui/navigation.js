// Navigation.js - Manejo centralizado de la navegación mejorado
class Navigation {
  constructor() {
    this.pages = {
      'btn-inicio': 'popup.html',
      'btn-notificaciones': 'notification/notification.html',
      'btn-configuracion': 'config/config.html',
      'btn-ayuda': 'help/help.html'
    };
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.highlightCurrentPage();
  }

  setupEventListeners() {
    Object.keys(this.pages).forEach(btnId => {
      const button = document.getElementById(btnId);
      if (button) {
        button.addEventListener('click', () => this.navigateTo(this.pages[btnId]));
      }
    });
  }

  // Método mejorado para calcular rutas relativas
  getRelativePath(targetPage) {
    const currentPath = window.location.pathname;
    const currentDir = currentPath.substring(0, currentPath.lastIndexOf('/'));
    
    // Detectar si estamos en una subcarpeta
    const isInSubfolder = currentPath.includes('/config/') || 
                         currentPath.includes('/notification/') || 
                         currentPath.includes('/help/');
    
    if (isInSubfolder) {
      // Si estamos en una subcarpeta y queremos ir a la raíz
      if (targetPage === 'popup.html') {
        return '../' + targetPage;
      }
      // Si estamos en una subcarpeta y queremos ir a otra subcarpeta
      if (targetPage.includes('/')) {
        return '../' + targetPage;
      }
      // Si queremos ir a un archivo en la raíz
      return '../' + targetPage;
    } else {
      // Si estamos en la raíz
      return targetPage;
    }
  }

  navigateTo(page) {
    const relativePath = this.getRelativePath(page);
    console.log(`Navegando desde ${window.location.pathname} hacia ${relativePath}`);
    window.location.href = relativePath;
  }

  highlightCurrentPage() {
    const currentPage = this.getCurrentPage();
    console.log('Página actual:', currentPage);
    
    Object.keys(this.pages).forEach(btnId => {
      const button = document.getElementById(btnId);
      if (button) {
        button.classList.remove('active');
        
        // Comparar página actual con las rutas definidas
        const targetPage = this.pages[btnId];
        const targetFileName = targetPage.split('/').pop();
        
        if (currentPage === targetFileName) {
          button.classList.add('active');
        }
      }
    });
  }

  getCurrentPage() {
    const path = window.location.pathname;
    return path.split('/').pop() || 'popup.html';
  }
}

// Inicializar navegación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new Navigation();
});