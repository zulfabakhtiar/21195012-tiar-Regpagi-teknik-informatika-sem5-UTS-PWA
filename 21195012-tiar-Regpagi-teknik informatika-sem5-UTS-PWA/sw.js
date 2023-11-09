var cacheName = 'cv pwa';
var filesToCache = [
  '/',
  '/index.html',
  '/sw.js',
  // 'css/bootstrap.min.css',
  // '/manifest.json',
  // 'css/bootstrap.css',
  // 'css/bootstrap.min.css',
  // 'css/bootstrap.min.css.map',
  // 'scripts/aos.js',
  // 'scripts/bootstrap.bundle.min.js',
  // 'scripts/bootstrap.bundle.min.js.map',
  // 'scripts/main.js',
  // 'scripts/style.js'
];

/* Start the service worker and cache all of the app's content */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
  self.skipWaiting();
});

/* Serve cached content when offline */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
      caches.keys()
      .then((keyList) => {
          return Promise.all(keyList.map((key) => {
              if (key !== cacheName) {
                  console.log('[ServiceWorker] Hapus cache lama', key)
                  return caches.delete(key)
              }
          }))
      })
      .then(() => self.clients.claim())
  )
})