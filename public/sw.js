const CACHE_NAME = 'v1-site-assets';

// Keep your core shell assets here for primary bootstrap
const ASSETS_TO_CACHE = [
    '/',
    '/index.html','/ushank/ushanktrailer-pre-final-three.webm'
];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

// --- THE INTERCEPTOR: Catching and caching files dynamically ---
self.addEventListener('fetch', (event) => {
    const url = event.request.url;

    // Check if the file requested ends with .gif, .webm, .mp3, or .ogg
    const isTargetFileType = url.endsWith('.gif') || 
                             url.endsWith('.webm') || 
                             url.endsWith('.mp3') || 
                             url.endsWith('.ogg');

    if (isTargetFileType) {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                // If it's already in the cache, serve it instantly!
                if (cachedResponse) {
                    return cachedResponse;
                }

                // If it's NOT in the cache, fetch it from the network, 
                // clone it, and save it to the cache automatically.
                return fetch(event.request).then((networkResponse) => {
                    // Check if we received a valid response back
                    if (!networkResponse || networkResponse.status !== 200) {
                        return networkResponse;
                    }

                    // Open cache and save the copy
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                        console.log(`Successfully cached file asset: ${url}`);
                    });

                    return networkResponse;
                }).catch(() => {
                    // Fallback failure catcher
                });
            })
        );
    } else {
        // Standard non-media requests bypass the special type rule
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                return cachedResponse || fetch(event.request);
            })
        );
    }
});
