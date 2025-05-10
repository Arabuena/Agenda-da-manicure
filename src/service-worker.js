// Lista de domínios para ignorar
const ignoredDomains = [
  'profitableratecpm.com',
  'cloudinary.com/image/upload/v1/icons', // Adiciona o path dos ícones
];

// Lista de recursos que devem ter fallback
const FALLBACK_RESOURCES = {
  '/icons/logo192.png': '/default-logo192.png',
  '/icons/logo512.png': '/default-logo512.png'
};

self.addEventListener('fetch', event => {
  // Ignora domínios problemáticos
  if (ignoredDomains.some(domain => event.request.url.includes(domain))) {
    event.respondWith(new Response('', { status: 200, statusText: 'OK' }));
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }

        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200) {
              // Verifica se há um fallback disponível
              const url = new URL(event.request.url);
              const fallbackUrl = FALLBACK_RESOURCES[url.pathname];
              if (fallbackUrl) {
                return caches.match(fallbackUrl);
              }
            }

            const responseToCache = response.clone();
            caches.open('v1').then(cache => {
              cache.put(event.request, responseToCache);
            });

            return response;
          })
          .catch(error => {
            console.log('Fetch failed:', error);
            // Retorna uma resposta vazia para requisições de anúncios
            if (event.request.url.includes('profitableratecpm.com')) {
              return new Response('', { status: 200, statusText: 'OK' });
            }
            return new Response('Offline');
          });
      })
  );
}); 