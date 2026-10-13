import assert from 'node:assert/strict';
import {readdir,readFile,stat} from 'node:fs/promises';
import {join,extname} from 'node:path';
async function walk(path){const files=[];for(const item of await readdir(path)){const p=join(path,item);if((await stat(p)).isDirectory())files.push(...await walk(p));else files.push(p);}return files;}
const files=await walk('out');
for(const route of ['out/index.html','out/play/daily/index.html','out/play/infinite/index.html'])assert(files.includes(route),`Missing ${route}`);
for(const file of files){
 assert(!/\.(sqlite3?|db|py|env|pem)$/.test(file),`Unexpected private/server file: ${file}`);
 if(!['.js','.html','.css','.json'].includes(extname(file)))continue;
 const text=await readFile(file,'utf8');
 assert(!/127\.0\.0\.1:8000|localhost:8000|access_token|refresh_token|daily-data\/api|Bearer |django-insecure-/.test(text),`Backend reference in ${file}`);
 assert(!/(?:src|href)=["']\/(?:game-assets|background-assets|icons|audio|_next|logo\.svg|noise\.png)/.test(text),`Unprefixed asset in ${file}`);
 assert(!['.html','.css'].includes(extname(file)) || !/https?:\/\/(?:fonts\.googleapis|fonts\.gstatic)/.test(text),`External font in ${file}`);
}
console.log(`Verified ${files.length} static files: all routes exported, no backend credentials/endpoints or unprefixed assets.`);
