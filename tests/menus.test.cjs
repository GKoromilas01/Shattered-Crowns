const {test,before,after}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),http=require('node:http');
const {launchBrowser,browserPage}=require('./support/browser.cjs');
const adapter=`window.__sc38={inspect(type){inspectedBuilding=buildings.find(b=>b.team===0&&b.type===type);selected=[];updateUI();return el('buildingInspector').textContent},seed(type,x,y){const b=addBuilding(0,type,x,y);updateUI();return !!b},setWood(amount){wood=amount;updateUI()},advance(s){for(let left=s;left>1e-8;left-=.25)tick(Math.min(.25,left));}};`;
let browser,server,url;
before(async()=>{server=http.createServer((q,r)=>{r.setHeader('Content-Type','text/html');r.end(fs.readFileSync('index.html','utf8').replace('window.scHoverBuildings=buildings;function frame',adapter+'window.scHoverBuildings=buildings;function frame'))});await new Promise(r=>server.listen(0,'127.0.0.1',r));url='http://127.0.0.1:'+server.address().port;browser=await launchBrowser()});
after(async()=>{await browser?.close();server?.close()});
async function game(t,origin='home',w=1440,h=900){const {page:p}=await browserPage(t,browser,{viewport:{width:w,height:h},reducedMotion:'reduce',autoBuilders:true});p.setDefaultTimeout(20000);await p.goto(url);await p.locator('#sc1310Skip').click();await p.evaluate(id=>scCampaign.start('city',id),origin);await p.locator('#sc154Pause').click();await p.waitForFunction(()=>window.sc26WorldRenderer?.ready());await p.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));return p;}
const spot=(p,type)=>p.evaluate(t=>{const b=scHoverBuildings.find(x=>x.type===t&&x.team===0),c=document.querySelector('#field'),r=c.getBoundingClientRect();return {x:r.x+b.x*r.width/c.width,y:r.y+b.y*r.height/c.height}},type);
async function open(p,type,title){const ready=w=>p.waitForFunction(w=>{const m=document.querySelector('#scCityInspection #scBuildingMenu');return m&&!m.hidden&&m.innerText.length>5&&(!w||m.innerText.startsWith(w))},w,{timeout:6000});let last;for(let i=0;i<3;i++){const s=await spot(p,type);await p.mouse.click(s.x,s.y);try{await ready(title);return p.locator('#scBuildingMenu')}catch(e){last=e}}throw last}
async function closePanel(p){await p.getByRole('button',{name:'Close building inspector',exact:true}).click();await p.waitForFunction(()=>{const m=document.querySelector('#scBuildingMenu');return !m||m.hidden||!m.innerText.trim()},null,{timeout:4000})}
const res=p=>p.evaluate(()=>scCitySave.capture().state.resources);
test('Keep menu sets taxes: High earns more gold and lowers the mood target, Low does the opposite',async t=>{
 const out={};
 for(const level of ['low','normal','high']){
  const p=await game(t,'home',1366,700);const m=await open(p,'keep');
  assert.match(await m.innerText(),/Taxes/);
  await m.locator('button[data-arg="'+level+'"]').click();
  assert.equal(await p.evaluate(()=>scTax.level()),level);
  const g0=(await res(p)).gold;await p.evaluate(()=>__sc38.advance(60));
  out[level]={gain:(await res(p)).gold-g0,target:await p.evaluate(()=>scCityEconomy.snapshot().satisfaction.target)};
 }
 assert.ok(out.high.gain>out.normal.gain&&out.normal.gain>out.low.gain,'gold: '+JSON.stringify(out));
 assert.ok(out.high.target<out.normal.target&&out.normal.target<out.low.target,'mood target: '+JSON.stringify(out));
});
test('Theater menu holds a festival and then waits for the cooldown',async t=>{
 const p=await game(t,'home',1366,700);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.evaluate(()=>__sc38.seed('theater',700,420));
 const m=await open(p,'theater');assert.match(await m.innerText(),/Festival[\s\S]*35 gold/);
 await p.locator('#sc154Pause').click();
 const before={r:await res(p),h:await p.evaluate(()=>scCitySave.capture().state.people.happiness)};
 await m.locator('button[data-act="go"]').click();
 const after={r:await res(p),h:await p.evaluate(()=>scCitySave.capture().state.people.happiness)};
 assert.equal(after.r.gold,before.r.gold-35);assert.ok(after.h>before.h,'mood rose');
 await p.waitForFunction(()=>/Next one in \d+ s/.test(document.querySelector('#scBuildingMenu').innerText),null,{timeout:3000});
 assert.equal(await m.locator('button[data-act="go"]').isDisabled(),true);
 assert.deepEqual(errs,[]);
});
test('Granary, Lumberyard and Farm have their own menus with a suggestion and a sell shortcut',async t=>{
 const p=await game(t,'home',1366,700);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.evaluate(()=>{__sc38.seed('market',640,400);__sc38.seed('granary',700,400);__sc38.seed('lumberyard',700,470)});
 await p.evaluate(()=>__sc38.advance(6));
 let m=await open(p,'granary','Granary');assert.match(await m.innerText(),/Stock: \d+ \/ \d+ food[\s\S]*Suggestion:/);
 const a=await res(p);await m.locator('button[data-act="sell"]').click();const b=await res(p);
 assert.equal(b.food,a.food-10);assert.ok(b.gold>a.gold);
 await closePanel(p);
 m=await open(p,'lumberyard','Lumberyard');assert.match(await m.innerText(),/Lumberyard[\s\S]*Wood in store[\s\S]*Market price/);
 const c=await res(p);
 await m.getByRole('button',{name:'Sell 10 wood',exact:true}).click();
 assert.equal((await res(p)).wood,c.wood-10);
 await p.evaluate(()=>__sc38.setWood(7));
 await p.waitForFunction(()=>document.querySelector('#scBuildingMenu')?.innerText.includes('Need 3 more wood'));
 assert.equal(await m.getByRole('button',{name:'Sell 10 wood',exact:true}).isDisabled(),true);
 await closePanel(p);
 await p.evaluate(()=>{__sc38.seed('farm',780,400)});
 m=await open(p,'farm','Farm');assert.match(await m.innerText(),/Farm[\s\S]*Staff[\s\S]*Harvest this cycle[\s\S]*Suggestion:/);
 assert.deepEqual(errs,[]);
});
