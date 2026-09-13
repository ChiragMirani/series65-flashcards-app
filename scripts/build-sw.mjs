import { readdir,readFile,writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
async function walk(dir){const entries=await readdir(dir,{withFileTypes:true});const output=[];for(const entry of entries){const file=path.join(dir,entry.name);if(entry.isDirectory())output.push(...await walk(file));else if(!file.endsWith('.map')&&!file.endsWith('sw.js'))output.push(file);}return output;}
const files=(await walk('out')).sort();
const digest=createHash('sha256');const urls=[];
for(const file of files){const relative=file.replaceAll('\\','/').replace(/^out\//,'');digest.update(relative);digest.update(await readFile(file));urls.push('/'+relative);if(relative.endsWith('index.html'))urls.push('/'+relative.slice(0,-10));}
const version=digest.digest('hex').slice(0,16);
const worker=`/* Generated from the complete static export; do not edit by hand. */
const CACHE='series65-${version}';
const URLS=${JSON.stringify([...new Set(urls)])};
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(URLS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('series65-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 const request=event.request;const url=new URL(request.url);
 if(request.method!=='GET'||url.origin!==self.location.origin)return;
 event.respondWith((async()=>{
  const cache=await caches.open(CACHE);
  let pathname=url.pathname;
  if(request.headers.get('RSC')==='1'&&!pathname.endsWith('.txt'))pathname=(pathname.endsWith('/')?pathname:pathname+'/')+'index.txt';
  const cached=await cache.match(pathname,{ignoreSearch:true});
  if(cached)return cached;
  try{return await fetch(request);}catch{
   if(request.mode==='navigate')return await cache.match('/404.html')||new Response('Page unavailable offline',{status:404,headers:{'Content-Type':'text/plain'}});
   return new Response('Unavailable offline',{status:503});
  }
 })());
});
`;
await writeFile('out/sw.js',worker);
console.log(`Offline cache ${version}: ${new Set(urls).size} URLs. All route HTML, navigation data, chunks, and icons included.`);
