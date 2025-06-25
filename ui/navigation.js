// Navigation.js - Manejo centralizado de la navegación
class Navigation {
  constructor() {
    this.pages = {
      'btn-inicio': 'popup.html',
      'btn-notificaciones': 'notificaciones.html',
      'btn-configuracion': 'configuracion.html',
      'btn-ayuda': 'ayuda.html'
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

  navigateTo(page) {
    window.location.href = page;
  }

  highlightCurrentPage() {
    const currentPage = this.getCurrentPage();
    Object.keys(this.pages).forEach(btnId => {
      const button = document.getElementById(btnId);
      if (button && this.pages[btnId] === currentPage) {
        button.classList.add('active');
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