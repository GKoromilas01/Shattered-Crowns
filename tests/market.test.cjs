const {test,before,after}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),http=require('node:http');
const {launchBrowser,browserPage}=require('./support/browser.cjs');
const adapter=`window.__sc38={inspect(type){inspectedBuilding=buildings.find(b=>b.team===0&&b.type===type);selected=[];updateUI();return el('buildingInspector').textContent},seed(type,x,y){const b=addBuilding(0,type,x,y);updateUI();return !!b},advance(s){for(let left=s;left>1e-8;left-=.25)tick(Math.min(.25,left));}};`;
let browser,server,url;
before(async()=>{server=http.createServer((q,r)=>{r.setHeader('Content-Type','text/html');r.end(fs.readFileSync('index.html','utf8').replace('window.scHoverBuildings=buildings;function frame',adapter+'window.scHoverBuildings=buildings;function frame'))});await new Promise(r=>server.listen(0,'127.0.0.1',r));url='http://127.0.0.1:'+server.address().port;browser=await launchBrowser()});
after(async()=>{await browser?.close();server?.close()});
async function game(t,origin='home',w=1440,h=900){const {page:p}=await browserPage(t,browser,{viewport:{width:w,height:h},reducedMotion:'reduce',autoBuilders:true});p.setDefaultTimeout(20000);await p.goto(url);await p.locator('#sc1310Skip').click();await p.evaluate(id=>scCampaign.start('city',id),origin);await p.locator('#sc154Pause').click();return p;}
test('Market panel shows prices, trading moves prices and gold, and cycling never prints gold',async t=>{
 const p=await game(t,'home',1366,700);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 assert.equal(await p.locator('#scBuildingMenu').isVisible().catch(()=>false),false,'no menu without a market');
 await p.evaluate(()=>__sc38.seed('market',700,420));
 const pos=await p.evaluate(()=>{const b=scHoverBuildings.find(x=>x.type==='market'&&x.team===0),c=document.querySelector('#field'),r=c.getBoundingClientRect();return {x:r.x+b.x*r.width/c.width,y:r.y+b.y*r.height/c.height}});
 await p.mouse.click(pos.x,pos.y);
 await p.waitForFunction(()=>{const m=document.querySelector('#scCityInspection #scBuildingMenu');return m&&!m.hidden&&/Trade/.test(m.innerText)},null,{timeout:3000});
 assert.equal(await p.locator('#scMarketPanel').count(),0,'no floating panel any more');
 const txt=await p.locator('#scBuildingMenu').innerText();
 assert.match(txt,/Food[\s\S]*Planks[\s\S]*Stone/);assert.match(txt,/Advisor:/);
 const st=()=>p.evaluate(()=>({g:scCitySave.capture().state.resources,p:scMarket.state().prices}));
 const a=await st();
 await p.locator('#scBuildingMenu [data-side="sell"][data-good="wood"]').click();
 const b=await st();
 assert.ok(b.g.gold>a.g.gold,'selling gives gold');assert.equal(b.g.wood,a.g.wood-10);assert.ok(b.p.wood<a.p.wood,'selling lowers the price');
 await p.locator('#scBuildingMenu [data-side="buy"][data-good="stone"]').click();
 const c=await st();assert.equal(c.g.stone,b.g.stone+10);assert.ok(c.p.stone>b.p.stone,'buying raises the price');assert.ok(c.g.gold<b.g.gold);
 // no gold printing: buy and sell the same good repeatedly, total wealth (gold + goods at base value) must never grow
 const result=await p.evaluate(()=>{const w=()=>{const s=scCitySave.capture().state.resources;return s.gold+s.food*1.2+s.wood*1.45+s.stone*1.5};const start=w();let max=start;
  for(let i=0;i<60;i++){for(const g of scMarket.goods()){scMarket.trade('buy',g,10);scMarket.trade('sell',g,10);scMarket.trade('sell',g,10);scMarket.trade('buy',g,10);max=Math.max(max,w())}}
  return {start,max,end:w()}});
 assert.ok(result.max<=result.start+1e-6,'cycling trades never gains wealth: '+JSON.stringify(result));
 const lim=await p.evaluate(()=>{for(let i=0;i<80;i++)scMarket.trade('sell','wood',10);return {low:scMarket.state().prices.wood,base:scMarket.base('wood')}});
 assert.ok(lim.low>=lim.base*.5-1e-9,'price never falls below half of its base: '+JSON.stringify(lim));
 await p.getByRole('button',{name:'Close building inspector',exact:true}).click();
 await p.waitForFunction(()=>{const m=document.querySelector('#scBuildingMenu');return !m||m.hidden||!m.offsetParent},null,{timeout:2000});
 assert.deepEqual(errs,[]);
});
test('Regions differ, the trader follows prices, and trading counts toward chapter 2',async t=>{
 const home=await game(t,'home',1366,700);
 const hp=await home.evaluate(()=>({food:scMarket.price('food'),stone:scMarket.price('stone')}));
 const b=await game(t,'brookstead',1366,700);
 const bp=await b.evaluate(()=>({food:scMarket.price('food'),stone:scMarket.price('stone')}));
 assert.ok(bp.food<hp.food,'the rural village has cheaper food');assert.ok(bp.stone>hp.stone,'the rural village has dearer stone');
 await home.evaluate(()=>{__sc38.seed('market',700,420);scMarket.trade('sell','stone',10);scMarket.trade('sell','stone',10);scEvents.fire('trader')});
 const card=await home.locator('#scEventCard').innerText();
 const expect=await home.evaluate(()=>Math.round(40*scMarket.price('stone')));
 assert.ok(card.includes('('+expect+' gold)'),'trader quotes the live stone price '+expect+': '+card);
 await home.locator('#scEventCard [data-choice="decline"]').click();
 const done=await home.evaluate(()=>{for(let i=0;i<4;i++)scMarket.trade('sell','wood',10);return scMarket.traded()});
 assert.ok(done>=20);
 await home.evaluate(()=>{for(const [t,x,y] of [['house',560,300],['house',560,360],['house',560,420],['farm',760,300],['granary',860,300],['bakery',860,380]])__sc38.seed(t,x,y)});
 await home.waitForFunction(()=>/Chapter 3/.test(document.querySelector('#scChapters')?.innerText||''),null,{timeout:8000});
});
