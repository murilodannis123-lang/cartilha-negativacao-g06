// Guarda a cartilha no celular depois da primeira visita, para abrir sem internet.
const CACHE='cartilha-g06-v2';
const FILES=['./','index.html','manifest.webmanifest','fonts/archivo.woff2','fonts/atkinson-400.woff2','fonts/atkinson-400-italic.woff2','fonts/atkinson-700.woff2','fonts/plex-mono-400.woff2','fonts/plex-mono-500.woff2'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('index.html'))));
});
