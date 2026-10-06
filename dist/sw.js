const CACHE_NAME = 'v2-site-assets';
const MEDIA_RE = /\.(gif|webm|mp3|ogg)$/i;

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(['/ushank/ushanktrailer-pre-final-three.webm'])
    )
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin || !MEDIA_RE.test(url.pathname)) return; // browser handles everything else normally
  event.respondWith(mediaResponse(req));
});

async function mediaResponse(req) {
  try {
    const cache = await caches.open(CACHE_NAME);
    let res = await cache.match(req.url);

    if (!res) {
      const full = await fetch(req.url); // full file, no Range header
      if (full.status !== 200) return fetch(req); // 404 etc: pass through untouched
      await cache.put(req.url, full.clone());
      res = full;
    }

    const range = req.headers.get('range');
    if (!range) return res;

    const m = /bytes=(\d+)-(\d*)/.exec(range);
    if (!m) return res;
    const buf = await res.arrayBuffer();
    const start = Number(m[1]);
    const end = Math.min(m[2] ? Number(m[2]) : buf.byteLength - 1, buf.byteLength - 1);
    return new Response(buf.slice(start, end + 1), {
      status: 206,
      statusText: 'Partial Content',
      headers: {
        'Content-Type': res.headers.get('Content-Type') || 'application/octet-stream',
        'Content-Range': `bytes ${start}-${end}/${buf.byteLength}`,
        'Content-Length': String(end - start + 1),
      },
    });
  } catch (err) {
    try { return await fetch(req); } catch { return Response.error(); }
  }
}