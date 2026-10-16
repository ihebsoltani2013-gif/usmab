const V="usmab-v1",SHELL=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>Promise.allSettled(SHELL.map(u=>c.add(u)))).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{const r=e.request,u=new URL(r.url);
if(r.method!="GET"||u.origin!=location.origin)return;
if(u.pathname.endsWith("/live.txt")||u.pathname.endsWith("/admin.html"))return;
const key=u.origin+u.pathname;
e.respondWith((async()=>{const c=await caches.open(V);
try{const net=await Promise.race([fetch(r),new Promise((_,no)=>setTimeout(no,5000))]);if(net&&net.ok&&net.type=="basic")c.put(key,net.clone());return net}
catch(x){const hit=(await c.match(key))||(r.mode=="navigate"?await c.match("index.html"):null);if(hit)return hit;throw x}})())});
