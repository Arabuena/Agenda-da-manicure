/* eslint-disable no-restricted-globals */

const CACHE_NAME = 'agenda-card-v2';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico'
];

// Cache principal para arquivos essenciais
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CORE_ASSETS))
  );
});

// Cache para imagens
self.addEventListener('fetch', event => {
  const { request } = event;
  
  // Estratégia diferente para imagens
  if (request.destination === 'image') {
    event.respondWith(
      caches.match(request).then(response => {
        // Retorna do cache se existir
        if (response) {
          return response;
        }

        // Se não estiver no cache, faz o fetch e armazena
        return fetch(request).then(response => {
          // Clona a resposta pois ela só pode ser usada uma vez
          const responseToCache = response.clone();

          caches.open(`${CACHE_NAME}-images`).then(cache => {
            cache.put(request, responseToCache);
          });

          return response;
        });
      })
    );
    return;
  }

  // Estratégia padrão para outros recursos
  event.respondWith(
    caches.match(request)
      .then(response => response || fetch(request))
  );
});

// Limpar caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => 
            cacheName.startsWith('agenda-card-') && 
            cacheName !== CACHE_NAME &&
            cacheName !== `${CACHE_NAME}-images`
          )
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
});

// Permite que o PWA funcione offline
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request);
      })
  );
}); 