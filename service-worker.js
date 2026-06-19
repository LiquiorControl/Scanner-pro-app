const CACHE_NAME = 'scanner-pro-v1';
self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(['./'])));
});
self.addEventListener('activate', (event) => { self.clients.claim(); });
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request).then((res) => {
      const resClone = res.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(event.request, resClone));
      return res;
    }).catch(() => caches.match(event.request))
  );
});
