const {test,before,after}=require('node:test');
const assert=require('node:assert/strict'),fs=require('node:fs'),http=require('node:http');
const {launchBrowser,browserPage}=require('./support/browser.cjs');
let browser,server,url;
const adapter=`window.__tradeTest={
 setup({foodStock=80,people=20,granaryX=1100,marketX=1100,goods=0}={}){
  buildings=buildings.filter(b=>b.type==='keep');
  for(const [type,x,y] of [['granary',granaryX,500],['market',marketX,500],['bakery',1150,500],['road',marketX,550],['road',marketX+44,550],['road',marketX+88,550]])addBuilding(0,type,x,y);
  food=foodStock;population=people;tradeGoods=goods;happiness=80;updateUI();
 },
 advance(n){for(let t=0;t<n;t+=.25)tick(Math.min(.25,n-t));},
 placement:()=>mode,end(){ended=true;},killKeep(){for(const b of buildings)if(b.team===0&&b.type==='keep')b.hp=0;},
};`;
before(async()=>{fs.mkdirSync('test-results/gallery',{recursive:true});server=http.createServer((q,r)=>{r.setHeader('Content-Type','text/html');r.end(fs.readFileSync('index.html','utf8').replace('window.scHoverBuildings=buildings;function frame',adapter+'window.scHoverBuildings=buildings;function frame'));});await new Promise(r=>server.listen(0,'127.0.0.1',r));url='http://127.0.0.1:'+server.address().port;browser=await launchBrowser();});
after(async()=>{await browser?.close();server?.close();});
async function game(t,width=1440,enter=true,height=900){const {page:p}=await browserPage(t,browser,{viewport:{width,height},reducedMotion:'reduce'});p.setDefaultTimeout(6500);await p.goto(url);if(enter){await p.locator('#sc1310Skip').click();await p.locator('#sc154Pause').click();}return p;}
const capture=p=>p.evaluate(()=>scCitySave.capture()),snap=p=>p.evaluate(()=>scCityEconomy.snapshot());
const policy=(p,enabled,reserve)=>p.evaluate(([e,r])=>scCityEconomy.setTradePolicy(e,r),[enabled,reserve]);
const setup=(p,v={})=>p.evaluate(v=>window.__tradeTest.setup(v),v);
const advance=(p,n=5)=>p.evaluate(n=>window.__tradeTest.advance(n),n);
async function economy(p){await p.locator('#sc1312CityLifeBtn').click();await p.locator('#scCityPlanningNav').getByRole('button',{name:'Economy',exact:true}).click();}
const blocked=(s,key)=>s.trade.sites[0].checks.some(c=>c.key===key&&!c.met);
function conserved(s){const f=s.food.last;assert.ok(Math.abs(f.opening+f.harvest+f.logistics+f.bakeryNet-f.exports-f.delivered-f.overflow-f.closing)<1e-7);}

test('Trade policy uses existing save options and changes no stocks orders view or Pause',async t=>{
 const p=await game(t);await p.keyboard.press('q');await p.locator('#sc140Build').click();await p.locator('#sc140Commands').getByRole('button',{name:/Road/}).first().click();const before=await capture(p);assert.equal(await policy(p,false,4),true);const after=await capture(p);assert.equal(after.state.options.breadExport,false);assert.equal(after.state.options.breadReserveCycles,4);
 const expected=structuredClone(before.state);expected.options.breadExport=false;expected.options.breadReserveCycles=4;assert.deepEqual(after.state,expected);assert.deepEqual(after.view,before.view);assert.equal(await p.evaluate(()=>window.__tradeTest.placement()),'road');assert.equal(await p.evaluate(()=>scCitySave.status().paused),true);assert.equal(await p.locator('#sc1307BreadExport').isChecked(),false);assert.equal(await p.locator('#sc1308Cycles').inputValue(),'4');
 for(const r of [0,1,2,4]){assert.equal(await policy(p,true,r),true);assert.equal((await snap(p)).trade.reserveFloor,Math.max(8,(await snap(p)).food.demand*r));}
});
test('Trade policy rejects invalid inputs title overview missing Keep and ended cities atomically',async t=>{
 const p=await game(t,1440,false);assert.equal(await policy(p,false,4),false);await p.locator('#sc1310Skip').click();await p.locator('#sc154Pause').click();
 for(const [e,r] of [['true',4],[false,3],[false,-1],[null,2],[true,2.5],[false,null]]){const before=await capture(p);assert.equal(await policy(p,e,r),false);assert.deepEqual((await capture(p)).state,before.state);}
 await p.evaluate(()=>scKingdomUI.open());const before=await capture(p);assert.equal(await policy(p,false,4),false);assert.deepEqual((await capture(p)).state,before.state);await p.keyboard.press('Escape');await p.evaluate(()=>scCampaign.start('skirmish'));await p.locator('#sc154Pause').click();assert.equal(await policy(p,false,4),true);await p.evaluate(()=>window.__tradeTest.killKeep());assert.equal(await policy(p,false,4),false);await p.evaluate(()=>window.__tradeTest.end());assert.equal(await policy(p,false,4),false);
});
test('Export diagnosis shares actual granary market and reserve boundaries with production',async t=>{
 const p=await game(t);for(const [v,key] of [[{granaryX:1340},'granary'],[{marketX:1370},'market'],[{goods:80},'capacity']]){await setup(p,v);await policy(p,true,2);assert.equal(blocked(await snap(p),key),true);await advance(p);assert.equal((await snap(p)).food.last.exports,0);conserved(await snap(p));}
 await setup(p);assert.equal((await snap(p)).trade.sites[0].ready,true);await advance(p);assert.equal((await snap(p)).food.last.exports,2);conserved(await snap(p));
});
test('Food priority stops new baskets while existing trade goods still sell',async t=>{
 const p=await game(t);await setup(p,{goods:3});await policy(p,false,4);const before=await capture(p);await advance(p);const s=await snap(p),after=await capture(p);assert.equal(s.food.last.exports,0);assert.equal(s.trade.goodsSold,before.state.resources.goodsSold+1);assert.equal(s.trade.goods,2);assert.ok(after.state.resources.gold>=before.state.resources.gold+4);assert.equal(blocked(s,'policy'),true);conserved(s);
});
test('Readiness describes current reserves rather than promising next-cycle exports',async t=>{
 const p=await game(t);await setup(p,{foodStock:37});await policy(p,true,4);assert.equal(blocked(await snap(p),'reserve'),true);await advance(p);const s=await snap(p);assert.equal(s.food.last.bakeryNet,2);assert.equal(s.food.last.exports,2);assert.equal(blocked(s,'reserve'),true);conserved(s);
});
test('Paused granary retains physical export prerequisite; paused bakery or market stops exports',async t=>{
 const p=await game(t);await setup(p);let s=await snap(p);for(const type of ['granary','bakery','market']){const id=s.workforce.sites.find(b=>b.type===type).id;await p.evaluate(id=>scCityEconomy.setWorkplaceOpen(id,false),id);s=await snap(p);if(type==='granary'){assert.equal(s.trade.sites[0].ready,true);}else{assert.equal(s.trade.sites[0].ready,false);await advance(p);assert.equal((await snap(p)).food.last.exports,0);}await p.evaluate(id=>scCityEconomy.setWorkplaceOpen(id,true),id);}
});
test('Half-staffed bakery keeps original conversion basket and accounting rules',async t=>{
 const p=await game(t);await setup(p,{people:6});const s=await snap(p);assert.equal(s.workforce.sites.find(b=>b.type==='bakery').filled,1);assert.equal(s.trade.sites[0].ready,true);await advance(p);const after=await snap(p);assert.equal(after.food.last.bakeryNet,1);assert.equal(after.food.last.exports,2);conserved(after);
});
test('Genuine v0.13 save restores policy and paused workplace without new serialized fields',async t=>{
 const p=await game(t);const old=JSON.parse(fs.readFileSync('tests/fixtures/city-v0130.json'));assert.equal(old.createdWith,'0.13.0');assert.equal((await p.evaluate(s=>scCitySave.restore(s),old)).ok,true);const before=await capture(p);const s=await snap(p);assert.equal(s.trade.enabled,false);assert.equal(s.trade.reserveCycles,4);assert.deepEqual((await capture(p)).state,before.state);assert.deepEqual(before.state,old.state);assert.deepEqual(before.campaign,old.campaign);assert.equal(before.cityId,old.cityId);
 await economy(p);assert.equal(await p.locator('[data-trade-export="false"]').getAttribute('aria-pressed'),'true');assert.equal(await p.locator('[data-trade-reserve="4"]').getAttribute('aria-pressed'),'true');
});
for(const width of [390,1440])test('Economy management exposes honest chain growth and prosperity with preserved controls at '+width,async t=>{
 const p=await game(t,width);await setup(p);await p.mouse.move(width/2,450);await p.keyboard.press('q');await p.locator('#sc140Build').click();await p.locator('#sc140Commands').getByRole('button',{name:/Road/}).first().click();const before=await capture(p);await economy(p);assert.match(await p.locator('#scEconomyPlan').innerText(),/current conditions|current readiness/i);assert.match(await p.locator('#scEconomyPlan').innerText(),/prosperity/i);assert.match(await p.locator('#scEconomyPlan').innerText(),/resident/i);
 const hold=p.locator('[data-trade-export="false"]');await hold.focus();await p.keyboard.down('Space');await advance(p);await p.waitForTimeout(650);await p.keyboard.up('Space');await p.waitForFunction(()=>scCityEconomy.snapshot().trade.enabled===false);assert.equal(await hold.evaluate(e=>e===document.activeElement),true);const reserve=p.locator('[data-trade-reserve="4"]');await reserve.click();await p.waitForTimeout(650);assert.equal(await reserve.evaluate(e=>e===document.activeElement),true);assert.equal(await reserve.getAttribute('aria-pressed'),'true');const one=p.locator('[data-trade-reserve="1"]');const box=await one.boundingBox();await p.mouse.move(box.x+box.width/2,box.y+box.height/2);await p.mouse.down();await advance(p);await p.waitForTimeout(650);await p.mouse.up();await p.waitForFunction(()=>scCityEconomy.snapshot().trade.reserveCycles===1);assert.equal(await one.evaluate(e=>e===document.activeElement),true);assert.equal(await p.evaluate(()=>scCitySave.status().paused),true);
 const after=await capture(p);assert.equal(await p.evaluate(()=>window.__tradeTest.placement()),'road');const orders=units=>units.map(({id,x,y,order,target})=>({id,x,y,order,target}));assert.deepEqual(orders(after.state.units),orders(before.state.units));assert.deepEqual(after.state.selected,before.state.selected);assert.deepEqual(after.view,before.view);await p.locator('#scPlanSectionEconomy').evaluate(e=>e.scrollIntoView({block:'start'}));await p.screenshot({path:'test-results/gallery/m14-economy-'+width+'.png'});await p.locator('[data-economy-section="Housing"]').click();assert.equal(await p.evaluate(()=>document.activeElement.id),'scPlanSectionHousing');assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
});
test('Legacy controls and restored policies update the Economy board during live refresh',async t=>{
 const p=await game(t);await economy(p);await p.evaluate(()=>{const x=document.querySelector('#sc1307BreadExport');x.checked=false;x.dispatchEvent(new Event('change'));const r=document.querySelector('#sc1308Cycles');r.value='1';r.dispatchEvent(new Event('change'));});await p.waitForFunction(()=>document.querySelector('[data-trade-reserve="1"]')?.getAttribute('aria-pressed')==='true');assert.equal(await p.locator('[data-trade-export="false"]').getAttribute('aria-pressed'),'true');const s=await capture(p);await policy(p,true,4);assert.equal((await p.evaluate(s=>scCitySave.restore(s),s)).ok,true);await p.waitForFunction(()=>document.querySelector('[data-trade-reserve="1"]')?.getAttribute('aria-pressed')==='true');assert.equal((await snap(p)).trade.enabled,false);
});

test('Live refresh retains bakery Locate focus in its original Food details rather than Economy',async t=>{
 const p=await game(t);await setup(p);const id=(await snap(p)).trade.sites[0].id;await economy(p);await p.locator('#scCityPlanningNav').getByRole('button',{name:'Food',exact:true}).click();const detail=p.locator('details[data-house="site'+id+'"]');await detail.locator('summary').click();const locate=detail.locator('[data-locate]');await locate.focus();await advance(p);await p.waitForTimeout(650);assert.equal(await locate.evaluate(e=>e===document.activeElement),true);assert.equal(await detail.getAttribute('open'),'');
});

for(const width of [390,1366])test('Economy policy choices and confirmation are explicit and visible at '+width,async t=>{
 const p=await game(t,width,true,width===1366?606:900);await economy(p);const root=p.locator('#sc159Pulse');await p.getByText('Food reserve before exports',{exact:true}).waitFor({state:'visible'});
 for(const n of [0,1,2,4]){const r=await p.locator('[data-trade-reserve="'+n+'"]').boundingBox(),box=await root.boundingBox();assert.ok(r.y>=box.y&&r.y+r.height<=box.y+box.height,'Reserve choice is visible without searching below the panel');}
 assert.match(await p.locator('#scTradeCurrentPolicy').innerText(),/Export surplus.*2 cycles.*10 seconds/i);assert.match(await p.locator('#scTradeEffect').innerText(),/no bakery/i);
 await p.locator('[data-trade-export="false"]').click();await p.waitForFunction(()=>document.querySelector('#scTradeCurrentPolicy')?.textContent.includes('Food priority'));assert.match(await p.locator('[data-trade-export="false"]').innerText(),/✓/);await p.locator('[data-trade-reserve="4"]').click();await p.waitForFunction(()=>document.querySelector('#scTradeCurrentPolicy')?.textContent.includes('4 cycles'));
 const status=p.locator('#scPlanLocationStatus');assert.match(await status.innerText(),/Food priority.*4 cycles.*20 seconds/i);const a=await status.boundingBox(),b=await root.boundingBox();assert.ok(a.y>=b.y&&a.y+a.height<=b.y+b.height,'Confirmation stays in the visible City Life panel');assert.match(await p.locator('#scTradeEffect').innerText(),/paused|resume/i);await p.screenshot({path:'test-results/gallery/m14-policy-feedback-'+width+'.png'});
});
