const CACHE='geoplano-v17';
const SHELL=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png',
  './favicon.ico','./favicon-16.png','./favicon-32.png','./logo-ypc.png','./viewer.html',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>Promise.allSettled(SHELL.map(u=>c.add(u)))));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const req=e.request;if(req.method!=='GET')return;
  e.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(res=>{
    try{const u=new URL(req.url);if(u.origin===location.origin||u.host==='cdnjs.cloudflare.com'){const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy));}}catch(_){}
    return res;
  }).catch(()
