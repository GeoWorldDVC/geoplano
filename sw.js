/* GeoPlano service worker.
   VERSION debe coincidir con APP_VERSION en index.html. Súbela cada vez que
   despliegues cambios: al cambiar este archivo, los equipos reciben la versión
   nueva (install -> activate -> se borra el caché viejo). */
const VERSION = '22';
const CACHE = 'geoplano-v' + VERSION;

const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png',
  './favicon.ico', './favicon-16.png', './favicon-32.png', './logo-ypc.png', './viewer.html', './GeoPlano-Help.html',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => Promise.allSettled(SHELL.map(u => c.add(u)))));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  // App (HTML): red primero -> un despliegue nuevo aparece apenas hay internet;
  // si no hay señal, cae al caché. Esto evita el "deploy fantasma".
  const isHTML = req.mode === 'navigate' || req.destination === 'document';
  if (isHTML) {
    e.respondWith(
      fetch(req)
        .then(res => {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(req).then(hit => hit || caches.match('./index.html')))
    );
    return;
  }

  // Resto (mosaicos del mapa, imágenes, librerías): caché primero para velocidad
  // y uso offline en campo; se guarda lo del propio sitio y de cdnjs al llegar.
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      try {
        const u = new URL(req.url);
        if (u.origin === location.origin || u.host === 'cdnjs.cloudflare.com') {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
        }
      } catch (_) { /* ignore */ }
      return res;
    }).catch(() => caches.match(req)))
  );
});
