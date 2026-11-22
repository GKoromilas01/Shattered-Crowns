// Quick tier: every player-placeable building must be listed everywhere it needs to be.
// Root cause of the School/Chapel bug (v0.38-v0.40) was a missing entry in one list.
const {test,before,after}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),http=require('node:http');
const {launchBrowser,browserPage}=require('./support/browser.cjs');
const adapter=`window.__reg={fund(){wood=2000;gold=2000;stone=2000;updateUI()},types(){return Object.keys(civicCosts)},plot(type){const k=buildings.find(b=>b.team===0&&b.type==='keep');for(let y=type==='shipyard'?755:120;y<(type==='shipyard'?756:700);y+=20)for(let x=Math.max(100,k.x-300);x<Math.min(W-100,k.x+700);x+=20)if(canPlace(type,{x,y},null))return {x,y};return null},screen(x,y){const c=document.querySelector('#field'),v=c.parentElement;v.scrollLeft=x-v.clientWidth/2;v.scrollTop=y-v.clientHeight/2;const r=c.getBoundingClientRect();return {x:r.x+x*r.width/c.width,y:r.y+y*r.height/c.height}}};`;
let browser,server,url;
before(async()=>{server=http.createServer((q,r)=>{r.setHeader('Content-Type','text/html');r.end(fs.readFileSync('index.html','utf8').replace('window.scHoverBuildings=buildings;function frame',adapter+'window.scHoverBuildings=buildings;function frame'))});await new Promise(r=>server.listen(0,'127.0.0.1',r));url='http://127.0.0.1:'+server.address().port;browser=await launchBrowser()});
after(async()=>{await browser?.close();server?.close()});
const SPECIAL=new Set(['road','loadingyard','workshop']); // own placement mechanics
test('Static lists agree for every placeable building',()=>{
 const html=fs.readFileSync('index.html','utf8'),ov=fs.readFileSync('src/v026/overlays.js','utf8'),rd=fs.readFileSync('src/v026/renderer.js','utf8');
 const keys=[...html.match(/const civicCosts=\{([\s\S]*?)\};/)[1].matchAll(/(?:^|[,{\s])([a-z]+):\{/g)].map(x=>x[1]).filter(k=>!SPECIAL.has(k));
 assert.ok(keys.length>=12,'found the building list: '+keys);
 const times=html.match(/const scConstructionTimes=\{([^}]*)\}/)[1],rad=html.match(/const scConstructionRadii=\{([^}]*)\}/)[1],art=ov.match(/const art=\{([\s\S]*?)\};/)[1],modes=ov.match(/\[('tower'[^\]]*)\]\.includes\(mode\)&&wallPointer/)[1];
 const miss=[];for(const k of keys){const re=new RegExp('\\b'+k+'\\s*:');if(!re.test(times))miss.push(k+': scConstructionTimes');if(!re.test(rad))miss.push(k+': scConstructionRadii');if(!re.test(art))miss.push(k+': preview size table');if(!modes.includes("'"+k+"'"))miss.push(k+': placement-rectangle mode list');if(!html.includes('data-action="'+k+'"'))miss.push(k+': dock button');if(!rd.includes(k))miss.push(k+': renderer');}
 assert.deepEqual(miss,[]);
});
test('Every placeable building shows a rectangle when armed and places a foundation by real clicks',async t=>{
 const {page:p}=await browserPage(t,browser,{viewport:{width:1366,height:700},reducedMotion:'reduce'});p.setDefaultTimeout(30000);await p.goto(url);await p.locator('#sc1310Skip').click();await p.locator('#sc154Pause').click();
 const types=(await p.evaluate(()=>__reg.types())).filter(k=>!SPECIAL.has(k)&&k!=='fishery');const bad=[];
 for(const type of types){
  await p.evaluate(()=>__reg.fund());
  const pl=await p.evaluate(ty=>__reg.plot(ty),type);if(!pl){bad.push(type+': no free plot found');continue}
  const at=await p.evaluate(({x,y})=>__reg.screen(x,y),pl);
  await p.locator('#sc140Build').click();
  const btn=p.locator('#sc140Commands button').filter({hasText:new RegExp('^\\s*\\S*\\s*'+type.replace('lumberyard','Lumber').replace('clinic','Healer').replace('fishery','Fishery'),'i')}).first();
  if(!(await btn.count())){bad.push(type+': no palette button');continue}
  await btn.click();await p.mouse.move(at.x-6,at.y-4);await p.waitForTimeout(150);await p.mouse.move(at.x,at.y);await p.waitForTimeout(400);
  const light=await p.evaluate(({x,y})=>{const c=document.querySelector('#field'),r=c.getBoundingClientRect(),g=c.getContext('2d');const cx=Math.round((x-r.x)*c.width/r.width),cy=Math.round((y-r.y)*c.height/r.height);const d=g.getImageData(cx-5,cy-5,10,10).data;let n=0;for(let i=0;i<d.length;i+=4)if(d[i]>140&&d[i+1]>140&&d[i+2]>120)n++;return n},at);
  if(light<8)bad.push(type+': no placement rectangle');
  const sites0=await p.evaluate(()=>scConstruction.snapshot().sites.length);
  await p.mouse.click(at.x,at.y);await p.waitForTimeout(150);
  const sites1=await p.evaluate(()=>scConstruction.snapshot().sites.length);
  if(sites1!==sites0+1)bad.push(type+': click did not create a foundation');
  await p.keyboard.press('Escape');
 }
 assert.deepEqual(bad,[]);
});
