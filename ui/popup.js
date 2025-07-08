document.addEventListener('DOMContentLoaded', async () => {
  const statusEl = document.getElementById('status');
  const statusIcon = document.getElementById('statusIcon');
  const statusText = statusEl.querySelector('span');
  const sessionEl = document.getElementById('sessionStatus');
  const toggleBtn = document.getElementById('toggleBtn');
  const cleanupBtn = document.getElementById('cleanupBtn');
  const errorEl = document.getElementById('error');

  // Función para establecer el icono
  function setStatusIcon(isProtected) {
    const icon = document.getElementById('statusIcon');
    const timestamp = Date.now();
    if (icon) {
      if (isProtected) {
        icon.src = `/icons/escudo-protegido.png?${timestamp}`;
        icon.alt = 'Escudo protegido';
        console.log('Icono establecido: protegido');
      } else {
        icon.src = `/icons/escudo-no.png?${timestamp}`;
        icon.alt = 'Escudo no protegido';
        console.log('Icono establecido: no protegido');
      }
    } else {
      console.error('No se encontró el elemento statusIcon');
    }
  }

  // Evento para verificar carga de imagen
  statusIcon.addEventListener('load', () => {
    console.log('Imagen cargada correctamente:', statusIcon.src);
  });

  statusIcon.addEventListener('error', () => {
    console.error('Error cargando imagen:', statusIcon.src);
  });

  // Establecer estado inicial
  setStatusIcon(false);

  // Actualizar UI
  async function updateUI() {
    try {
      const response = await chrome.runtime.sendMessage({ action: 'getStatus' });
      console.log('Estado recibido:', response);
      
      // Estado de protección
      if (response.protection) {
        statusText.textContent = 'Protección activa';
        statusEl.className = 'statusBox active';
        setStatusIcon(true);
      } else {
        statusText.textContent = 'Protección inactiva';
        statusEl.className = 'statusBox inactive';
        setStatusIcon(false);
      }
      
      // Configurar botón con clases CSS
      if (response.protection) {
        toggleBtn.textContent = 'Desactivar protección';
        toggleBtn.className = 'deactivate';
      } else {
        toggleBtn.textContent = 'Activar protección';
        toggleBtn.className = 'activate';
      }
      
      // Estado de sesión
      sessionEl.textContent = response.active ? 
        '🟢 Sesión activa' : '🔴 Sesión inactiva';
      sessionEl.className = response.active ? 'sessionActive' : 'sessionInactive';
      
      errorEl.textContent = '';
    } catch (error) {
      errorEl.textContent = 'Error conectando con la extensión';
      console.error('UI update error:', error);
      // Establecer estado por defecto
      setStatusIcon(false);
    }
  }

  // Event listeners
  toggleBtn.addEventListener('click', async () => {
    try {
      const response = await chrome.runtime.sendMessage({ action: 'getStatus' });
      await chrome.runtime.sendMessage({
        action: 'toggleProtection',
        enable: !response.protection
      });
      await updateUI();
    } catch (error) {
      errorEl.textContent = error.message;
    }
  });

  cleanupBtn.addEventListener('click', async () => {
    cleanupBtn.disabled = true;
    
    // Cambiar texto y mostrar estado de carga
    const originalText = cleanupBtn.innerHTML;
    cleanupBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="animate-spin">
        <path d="M21 12a9 9 0 11-6.219-8.56"></path>
      </svg>
      Limpiando...
    `;
    
    try {
      await chrome.runtime.sendMessage({ action: 'forceCleanup' });
      
      // Mostrar éxito
      cleanupBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 6L9 17l-5-5"></path>
        </svg>
        ¡Limpieza completada!
      `;
      cleanupBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
      cleanupBtn.style.borderColor = '#047857';
      
      // Restaurar después de 2 segundos
      setTimeout(() => {
        cleanupBtn.innerHTML = originalText;
        cleanupBtn.style.background = 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
        cleanupBtn.style.borderColor = '#b45309';
        cleanupBtn.disabled = false;
      }, 2000);
      
      await updateUI();
    } catch (error) {
      // Mostrar error
      cleanupBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 6L6 18"></path>
          <path d="M6 6l12 12"></path>
        </svg>
        Error en limpieza
      `;
      cleanupBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
      cleanupBtn.style.borderColor = '#b91c1c';
      
      // Restaurar después de 3 segundos
      setTimeout(() => {
        cleanupBtn.innerHTML = originalText;
        cleanupBtn.style.background = 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)';
        cleanupBtn.style.borderColor = '#b45309';
        cleanupBtn.disabled = false;
      }, 3000);
      
      errorEl.textContent = error.message;
      errorEl.style.color = 'red';
    }
  });

  // Inicialización y monitoreo continuo
  updateUI();
  setInterval(updateUI, 2000);
});

document.getElementById('btn-notificaciones').onclick = function() {
  window.location.href = '../notification/notification.html';
};
document.getElementById('btn-configuracion').onclick = function() {
  window.location.href = '../config/config.html';
};
document.getElementById('btn-ayuda').onclick = function() {
  window.location.href = '../help/help.html';
};
document.getElementById('btn-inicio').onclick = function() {
  window.location.href = 'popup.html';
};