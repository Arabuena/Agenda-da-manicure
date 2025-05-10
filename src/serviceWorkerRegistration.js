// Este código registra o service worker para PWA
export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          // Configuração padrão do service worker
          registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            if (installingWorker == null) {
              return;
            }
            installingWorker.onstatechange = () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  console.log('New content is available; please refresh.');
                  if (config && config.onUpdate) {
                    config.onUpdate(registration);
                  }
                } else {
                  console.log('Content is cached for offline use.');
                  if (config && config.onSuccess) {
                    config.onSuccess(registration);
                  }
                }
              }
            };
          };
        })
        .catch((error) => {
          console.error('Error during service worker registration:', error);
        });

      // Adiciona o evento para mostrar o prompt de instalação
      let deferredPrompt;
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        // Mostra um modal ou banner personalizado para instalação
        const installBanner = document.createElement('div');
        installBanner.className = 'fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg flex justify-between items-center';
        installBanner.innerHTML = `
          <p class="text-gray-800">Instale nosso app para melhor experiência!</p>
          <button class="bg-blue-500 text-white px-4 py-2 rounded" id="installBtn">Instalar</button>
          <button class="text-gray-500 ml-2" id="closeInstallBanner">✕</button>
        `;
        
        document.body.appendChild(installBanner);
        
        document.getElementById('installBtn').addEventListener('click', async () => {
          if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
              console.log('App instalado');
            }
            deferredPrompt = null;
            installBanner.remove();
          }
        });
        
        document.getElementById('closeInstallBanner').addEventListener('click', () => {
          installBanner.remove();
        });
      });
    });
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
} 