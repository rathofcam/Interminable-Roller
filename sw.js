const CACHE_NAME = "interminable-rooms-cache-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",

  "./e9.png",
  "./e1.png",
  "./e6.png",
  "./e11.png",
  "./e7.png",
  "./E12.png",
  "./e27.png",
  "./e8.png",
  "./e10.png",
  "./e5.png",
  "./e3v1.png",
  "./pixeldude.png",
  "./e4.png",
  "./a45.png",
  "./e200.png",
  "./cannibalism.png",

  "./blaze.png",
  "./anne.png",
  "./isabelle.png",
  "./anne.mp3",

  "./icon-192.png",
  "./icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});
