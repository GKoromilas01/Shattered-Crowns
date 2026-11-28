// Embeds assets/v047/runtime/*.webp as window.sc47Art in index.html.
const fs=require('fs'),path=require('path');const root=path.join(__dirname,'..');
const crypto=require('crypto');const inventory=JSON.parse(fs.readFileSync(path.join(root,'assets/v070/inventory.json'),'utf8'));for(const row of inventory.files){for(const item of [{path:row.source_path,sha256:row.sha256},row.runtime].filter(Boolean)){const bytes=fs.readFileSync(path.join(root,item.path));if(crypto.createHash('sha256').update(bytes).digest('hex')!==item.sha256)throw Error('Owner media integrity mismatch: '+item.path);}}
const dir=path.join(root,'assets/v047/runtime'),art={};
for(const f of fs.readdirSync(dir).sort())if(f.endsWith('.webp'))art[f.slice(0,-5)]='data:image/webp;base64,'+fs.readFileSync(path.join(dir,f)).toString('base64');
// v0.52: owner requested original one-minute recordings; extended copies remain archived.
const mdir=path.join(root,'assets/v048/music-originals'),mus={};
for(const dir of [mdir,path.join(root,'assets/v062/music'),path.join(root,'assets/v070/music')])if(fs.existsSync(dir))for(const f of fs.readdirSync(dir).sort())if(f.endsWith('.mp3'))mus[f.slice(0,-4)]='data:audio/mpeg;base64,'+fs.readFileSync(path.join(dir,f)).toString('base64');
const vdir=path.join(root,'assets/v047/video'),vid={};
for(const dir of [vdir,path.join(root,'assets/v062/video'),path.join(root,'assets/v070/video')])if(fs.existsSync(dir))for(const f of fs.readdirSync(dir).sort())if(f.endsWith('.webm'))vid[f.slice(0,-5)]='data:video/webm;base64,'+fs.readFileSync(path.join(dir,f)).toString('base64');
const tag='<script id="sc47Art">window.sc47Art='+JSON.stringify(art)+';</script>'+
 '<script id="sc47Media" type="application/json">'+JSON.stringify({music:mus,video:vid})+'</script>'+
 '<script id="sc47MediaLoader">(function(){let c;const el=document.getElementById("sc47Media"),txt=el?el.textContent:"{}";if(el)el.remove();const art=document.getElementById("sc47Art");if(art)art.remove();const d=()=>c||(c=JSON.parse(txt));Object.defineProperty(window,"sc47Music",{get:()=>d().music,configurable:true});Object.defineProperty(window,"sc47Video",{get:()=>d().video,configurable:true})})();</script>';
let s=fs.readFileSync(path.join(root,'index.html'),'utf8');
s=s.replace(/<script id="sc47Art">[\s\S]*?<\/script>/,'');s=s.replace(/<script id="sc47Media" type="application\/json">[\s\S]*?<\/script>/,'');s=s.replace(/<script id="sc47MediaLoader">[\s\S]*?<\/script>/,'');
const first=s.indexOf('<script id="sc26TradeTownPresentation">');const i=first>=0?first:s.lastIndexOf('</body>');s=s.slice(0,i)+tag+s.slice(i);
if(process.argv.includes('--check')){process.exit(0)}
fs.writeFileSync(path.join(root,'index.html'),s);console.log('sc47Art',Object.keys(art).length,'images',Object.keys(mus).length,'tracks',Object.keys(vid).length,'clips');
