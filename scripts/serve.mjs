import { createServer } from 'node:http';
import { readFile,stat } from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('out');const port=Number(process.env.PORT||3066);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.json':'application/json','.webmanifest':'application/manifest+json','.txt':'text/x-component','.svg':'image/svg+xml','.png':'image/png','.ico':'image/x-icon','.xml':'application/xml','.woff2':'font/woff2'};
createServer(async(req,res)=>{try{
  const url=new URL(req.url||'/','http://127.0.0.1');let file=path.resolve(root,'.'+decodeURIComponent(url.pathname));
  if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
  if((await stat(file)).isDirectory())file=path.join(file,req.headers.rsc==='1'?'index.txt':'index.html');
  const body=await readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':file.endsWith('sw.js')?'no-cache':'public, max-age=0, must-revalidate','X-Content-Type-Options':'nosniff','X-Robots-Tag':'noindex, nofollow','Referrer-Policy':'strict-origin-when-cross-origin'}).end(body);
}catch{res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'}).end(await readFile(path.join(root,'404.html')).catch(()=>'Not found'));}}).listen(port,'127.0.0.1',()=>console.log(`Series 65 production preview: http://127.0.0.1:${port}`));
