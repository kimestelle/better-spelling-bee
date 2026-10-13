import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname } from 'node:path';
const root=resolve('out');
const base=process.env.NEXT_PUBLIC_BASE_PATH || '/better-spelling-bee';
const types={'.html':'text/html','.css':'text/css','.js':'text/javascript','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.mp3':'audio/mpeg','.woff2':'font/woff2','.woff':'font/woff','.txt':'text/plain'};
createServer(async(req,res)=>{
  const url=new URL(req.url,'http://localhost');
  if(url.pathname===base){res.writeHead(301,{Location:base+'/'}).end();return;}
  if(!url.pathname.startsWith(base+'/')){res.writeHead(404).end();return;}
  const path=resolve(root,'.'+decodeURIComponent(url.pathname.slice(base.length))+(url.pathname.endsWith('/')?'index.html':''));
  if(!path.startsWith(root+'/')){res.writeHead(403).end();return;}
  try{const data=await readFile(path);res.writeHead(200,{'Content-Type':types[extname(path)]||'application/octet-stream'}).end(data);}
  catch{res.writeHead(404).end('Not found');}
}).listen(4321,'127.0.0.1',()=>console.log(`Static game: http://127.0.0.1:4321${base}/`));
