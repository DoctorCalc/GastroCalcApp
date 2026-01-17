const CACHE_NAME = 'gastrocalc-v1.0.2'; 

const ASSETS = [
  './',
  './index.html',
  './Calculagas.html',
  './fonts/poppins-v24-latin-600.woff2',
  './fonts/poppins-v24-latin-regular.woff2',
  './manifest.json',
  './icons/icon-48.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// 1. INSTALACIÓN: Cachear y forzar activación inmediata
self.addEventListener('install', e => {
  self.skipWaiting(); // <--- IMPORTANTE: Hace que la nueva versión se active sin esperar
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Cacheando archivos de GastroCalc...');
      return cache.addAll(ASSETS);
    })
  );
});

// 2. ACTIVACIÓN: Borrar cachés antiguas para liberar espacio
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('Borrando caché antigua:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// 3. ESTRATEGIA: Cache First (pero con fallback a red)
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});