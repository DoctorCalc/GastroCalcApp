const CACHE_NAME = 'gastrocalc-v1.0.1'; 

const ASSETS = [
  './',
  './index.html',
  './Calculagas.html',
  './manifest.json',
  './fonts/poppins-v24-latin-regular.woff2',
  './fonts/poppins-v24-latin-600.woff2',
  './icons/icon-48.png',
  './icons/icon-192.png',  // <--- Añadido
  './icons/icon-512.png'   // <--- Añadido
];

// Instalar y guardar en caché
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Cacheando archivos de GastroCalc...');
      return cache.addAll(ASSETS);
    })
  );
});

// Responder desde la caché si no hay internet
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});