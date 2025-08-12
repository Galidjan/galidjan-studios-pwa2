
const VERSION = 'v3';
const CACHE_STATIC = 'gs-static-' + VERSION;
const STATIC_ASSETS = [
  './',
  'index.html',
  '404.html',
  'offline.html',
  'manifest.json',
  'css/style.css',
  'js/app.js',
  'js/install.js',
  'assets/icons/icon-192.png',
  'assets/icons/icon-512.png',
  'assets/icons/maskable-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_STATIC).then(c => c.addAll(STATIC_ASSETS)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => !k.includes(VERSION)).map(k => caches.delete(k)))
    )
  );
});

// Network-first for navigations, cache-first for static
self.addEventListener('fetch', (e) => {
  const req = e.request;
  const isNavigate = req.mode === 'navigate';
  if (isNavigate) {
    e.respondWith(
      fetch(req).catch(() => caches.match('offline.html'))
    );
    return;
  }
  e.respondWith(
    caches.match(req).then(cached => cached || fetch(req))
  );
});
