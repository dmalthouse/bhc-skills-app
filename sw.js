const CACHE_NAME = 'bhc-skills-v1';
const URLS = [
  'https://dmalthouse.github.io/bhc-skills-app/',
  'https://dmalthouse.github.io/bhc-skills-app/index.html',
  'https://dmalthouse.github.io/bhc-skills-app/manifest.json',
  'https://dmalthouse.github.io/bhc-skills-app/icon.png',
  'https://dmalthouse.github.io/bhc-skills-app/icon-512.png',
  'https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
