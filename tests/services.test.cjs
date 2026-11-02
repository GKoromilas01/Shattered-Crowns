const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const {launchBrowser,browserPage}=require('./support/browser.cjs');
const fs = require('node:fs');
const http = require('node:http');
let browser, server, url;
before(async () => {
  fs.mkdirSync('test-results/gallery',{recursive:true});
  server = http.createServer((req, res) => { res.setHeader('Content-Type', 'text/html'); res.end(fs.readFileSync('index.html')); });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  url = `http://127.0.0.1:${server.address().port}`;
  browser = await launchBrowser();
});
after(async () => { await browser?.close(); server?.close(); });
const adapter = `
window.__cityTest = {
  seed(items) { for(const [type,x,y] of items)addBuilding(0,type,x,y); updateUI(); },
  advance(seconds) { for(let left=seconds;left>1e-8&&!ended;){const dt=Math.min(.25,left);tick(dt);left-=dt;} window.scHoverBuildings=buildings; window.scRTSUnits=units; },
  remove(type) { for(const b of buildings)if(b.team===0&&b.type===type)b.hp=0;buildings=buildings.filter(alive);updateUI(); },
  stores(value) {food=value;updateUI();},
  population(value) {population=value;updateUI();},
  reset() {init();paused=true;window.scHoverBuildings=buildings;window.scRTSUnits=units;},
  inspectionCost(){inspectedBuilding=buildings.find(b=>b.team===0&&b.type==='farm');window.__roadBuilds=0;window.__citySnapshotCalls=0;updateUI();return {networks:window.__roadBuilds,snapshots:window.__citySnapshotCalls};}, mood(value){happiness=value;updateUI();}, elapsed:()=>elapsed, raids:()=>stats.raids, ended:()=>ended
};
`;
async function game(t, width = 1440, height = 900, rich = true) {
  const {context,page} = await browserPage(t,browser,{ viewport: { width, height } }); const errors = [];
  page.on('pageerror', e => errors.push(e.message)); page.setDefaultTimeout(6000);
  t.after(() => assert.deepEqual(errors, []));
  await page.route('**/*', route => route.fulfill({ contentType: 'text/html', body: fs.readFileSync('index.html', 'utf8').replace('gold=240;wood=100;stone=30;', rich?'gold=2400;wood=2000;stone=2000;':'gold=240;wood=100;stone=30;').replace('function citySnapshot(){','function citySnapshot(){window.__citySnapshotCalls=(window.__citySnapshotCalls||0)+1;').replace('function getRoadNetwork(){','function getRoadNetwork(){window.__roadBuilds=(window.__roadBuilds||0)+1;').replace('window.scHoverBuildings=buildings;function frame', adapter + '\nwindow.scHoverBuildings=buildings;function frame') }));
  await page.goto(url); await page.locator('#sc1310Skip').click(); await page.locator('#sc154Pause').click();
  assert.equal(await page.evaluate(() => typeof window.scCityEconomy?.snapshot), 'function', 'Engine must publish one read-only city snapshot');
  return page;
}
const snapshot = p => p.evaluate(() => window.scCityEconomy.snapshot());
const advance = (p, seconds) => p.evaluate(seconds => window.__cityTest.advance(seconds), seconds);
const seed = (p, items) => p.evaluate(items => window.__cityTest.seed(items), items);
const neighborhood = [ ['house',1100,200],['house',1160,200],['well',1120,260],['farm',1180,100],['farm',1250,100],['granary',1230,250],['market',1190,300],['clinic',1090,300],['garden',1050,220],['plaza',1100,340],['road',1100,140],['road',1144,140],['road',1188,140],['road',1188,184],['road',1188,228],['road',1188,272] ];
function conserved(s) {
  const f = s.food.last;
  assert.ok(Math.abs(f.opening + f.harvest + f.logistics + f.bakeryNet - f.exports - f.delivered - f.overflow - f.closing) < 1e-7, JSON.stringify(f));
  assert.ok(s.food.stock >= 0 && s.food.stock <= s.food.capacity);
  assert.equal(s.workforce.filled + s.workforce.idle + s.workforce.reserved, s.population);
  assert.equal(s.housing.keepResidents + s.housing.displaced + s.housing.houses.reduce((n,h)=>n+h.occupancy,0), s.population);
}
test('Services distinguish coverage, staffing, roads and food without duplicating food stocks',async t=>{
 const p=await game(t);await seed(p,[['house',1100,200]]);let s=await snapshot(p),h=s.housing.houses[0];assert.equal(h.services.water.status,'out_of_range');
 await seed(p,[['well',1290,200]]);assert.equal((await snapshot(p)).housing.houses[0].services.water.status,'out_of_range','Range is strictly below 190');
 await seed(p,[['well',1289,200],['farm',1180,100],['farm',1250,100],['clinic',1090,300],['market',1190,300]]);s=await snapshot(p);h=s.housing.houses[0];assert.equal(h.services.water.status,'ready');assert.equal(h.services.health.status,'unstaffed');assert.equal(h.services.market.status,'unstaffed');
 await p.evaluate(()=>window.__cityTest.population(14));s=await snapshot(p);h=s.housing.houses[0];assert.equal(h.services.health.status,'ready');assert.equal(h.services.market.status,'disconnected');
 await seed(p,[['road',1188,140],['road',1188,184],['road',1188,228]]);assert.equal((await snapshot(p)).housing.houses[0].services.market.status,'ready');
 await p.evaluate(()=>window.__cityTest.stores(0));s=await snapshot(p);assert.equal(s.housing.houses[0].services.market.status,'no_food');assert.equal(s.housing.houses[0].services.water.status,'ready');assert.equal(s.housing.houses[0].services.health.status,'ready');
});
test('Satisfaction exposes bounded factors and the actual applied five-second transition',async t=>{
 const p=await game(t);await seed(p,neighborhood);await advance(p,5);const s=await snapshot(p),a=s.satisfaction;assert.equal(a.factors.reduce((n,f)=>n+f.max,0),100);assert.ok(a.score>=0&&a.score<=100);assert.equal(a.target,Math.max(0,Math.min(100,Math.round((a.factors.reduce((n,f)=>n+f.points,0)+a.modifier.points)*10)/10)));assert.ok(Math.abs(a.last.closing-a.last.opening)<=2+1e-8);assert.equal(a.last.change,a.last.closing-a.last.opening);conserved(s);
});
test('Services choose a working provider even when a nearer provider has no staff',async t=>{
 const p=await game(t);await seed(p,[['farm',1250,100],['clinic',1200,300],['clinic',1100,220],['house',1100,200],['well',1120,260]]);await p.evaluate(()=>window.__cityTest.population(7));const s=await snapshot(p),clinics=s.workforce.sites.filter(b=>b.type==='clinic');assert.ok(clinics[0].filled>clinics[1].filled);assert.equal(s.housing.houses[0].services.health.providerId,clinics[0].id);assert.equal(s.housing.houses[0].services.health.status,'ready');
});
test('Services preserve residents through water loss, pause growth and recover housing gradually',async t=>{
 const p=await game(t);await seed(p,neighborhood);await advance(p,30);const before=await snapshot(p);assert.ok(before.population>8);const tier=before.housing.houses[0].tier;
 await p.evaluate(()=>window.__cityTest.remove('well'));await advance(p,5);let s=await snapshot(p);assert.equal(s.housing.houses[0].services.water.status,'out_of_range');assert.equal(s.housing.houses[0].tier,tier);assert.equal(s.population,before.population);assert.equal(s.growth.progress,0);assert.match(s.advice.join(' '),/Water:|water.*190/);conserved(s);
 await advance(p,25);s=await snapshot(p);assert.ok(s.housing.houses[0].tier<tier);await seed(p,[['well',1120,260]]);await advance(p,5);assert.equal((await snapshot(p)).housing.houses[0].tier,s.housing.houses[0].tier);await advance(p,10);s=await snapshot(p);assert.ok(s.population>before.population);assert.equal(s.housing.houses[0].services.water.status,'ready');conserved(s);
});
test('Services happiness gates migration and recovers through the same bounded satisfaction value',async t=>{
 const p=await game(t);await seed(p,neighborhood);await p.evaluate(()=>window.__cityTest.mood(20));await advance(p,15);let s=await snapshot(p);assert.equal(s.population,8);assert.match(s.growth.reason,/45/);assert.ok(s.satisfaction.score>20&&s.satisfaction.score<45);
 await advance(p,90);s=await snapshot(p);assert.ok(s.satisfaction.score>=45);assert.ok(s.population>8);assert.ok(s.prosperity.factors.find(f=>f.label==='Happiness').points>2);conserved(s);
});
test('Services do not count empty housing capacity as dissatisfied citizens',async t=>{
 const p=await game(t);await seed(p,[['farm',1180,100]]);await advance(p,5);const before=await snapshot(p);await seed(p,[['house',1450,600]]);const after=await snapshot(p);assert.equal(after.housing.houses[0].occupancy,0);assert.deepEqual(after.satisfaction.factors,before.satisfaction.factors);assert.equal(after.housing.houses[0].services.water.status,'out_of_range');
});
test('Services ration policies remain explicit target modifiers and paid events retain bounded effects',async t=>{
 const p=await game(t);await seed(p,[...neighborhood,['bakery',1170,260],['theater',1100,400]]);await advance(p,5);const a=(await snapshot(p)).satisfaction;
 await p.locator('#sc1303Mode').evaluate(el=>{el.value='conserve';el.dispatchEvent(new Event('change'))});let s=await snapshot(p);assert.equal(s.satisfaction.modifier.points,-2);assert.equal(s.satisfaction.target,Math.max(0,a.target-2));await advance(p,5);assert.ok(Math.abs((await snapshot(p)).satisfaction.last.change)<=2);
 await p.locator('#sc1303Mode').evaluate(el=>{el.value='generous';el.dispatchEvent(new Event('change'))});s=await snapshot(p);assert.equal(s.satisfaction.modifier.points,1.5);
 await p.evaluate(()=>{window.__cityTest.mood(70);window.__cityTest.stores(200)});await p.locator('#sc154Pause').click();const result=await p.evaluate(()=>window.scFestival.hold());assert.equal(result.ok,true);await p.locator('#sc154Pause').click();s=await snapshot(p);assert.ok(s.satisfaction.score>=78&&s.satisfaction.score<=80);assert.ok(s.satisfaction.score<=100);
});
async function point(p,x,y,center=false){return p.evaluate(({x,y,center})=>{const c=document.querySelector('#field'),v=c.parentElement;if(center){v.scrollLeft=x*c.getBoundingClientRect().width/c.width-v.clientWidth/2;v.scrollTop=y*c.getBoundingClientRect().height/c.height-v.clientHeight/2;}const r=c.getBoundingClientRect();return{x:r.left+x*r.width/c.width,y:r.top+y*r.height/c.height}},{x,y,center})}
test('Services feedback explains house/provider blockers and satisfaction without a new menu',async t=>{
 const p=await game(t);await seed(p,neighborhood);await advance(p,15);await p.locator('#sc1312CityLifeBtn').click();const panel=p.locator('#scCityEconomyPanel');await panel.waitFor({state:'visible'});assert.equal(await p.getByRole('table',{name:'Citizen satisfaction factors'}).count(),1);assert.match(await panel.innerText(),/basic services|Keep/);await p.getByRole('table',{name:'Citizen satisfaction factors'}).scrollIntoViewIfNeeded();await p.screenshot({path:'test-results/gallery/m5-satisfaction.png'});
 await p.locator('#scCityLifeClose').click();const q=await point(p,1100,200,true);await p.mouse.click(q.x,q.y);await p.locator('#scCityInspection').waitFor({state:'visible'});assert.match(await p.locator('#scCityInspection').innerText(),/Water:|Healthcare:/);assert.match(await p.locator('#scCityInspection').innerText(),/Happiness|Satisfaction/);await p.screenshot({path:'test-results/gallery/m5-house-services.png'});
 await p.locator('#sc1310AdvisorBtn').click();assert.deepEqual(await p.locator('#sc1310AdvisorAdvice .sc1310Task p').allTextContents(),(await snapshot(p)).advice.slice(0,5));assert.match(await p.locator('#sc1310AdvisorAdvice').innerText(),/Healthcare:.*staff|healer/i);assert.doesNotMatch(await p.locator('#sc1310AdvisorAdvice').innerText(),/all.*complete|supplied and staffed/i);
});
test('Services satisfaction freezes on pause and measured transitions reset with the game',async t=>{
 const p=await game(t);await seed(p,neighborhood);await advance(p,5);const a=(await snapshot(p)).satisfaction;await p.waitForTimeout(1100);assert.deepEqual((await snapshot(p)).satisfaction,a);await p.evaluate(()=>window.__cityTest.reset());const s=await snapshot(p);assert.equal(s.satisfaction.score,70);assert.equal(s.satisfaction.last,null);
});
test('Services sustain five simulated minutes including induced shortage and recovery with full AI',async t=>{
 const p=await game(t);await seed(p,[['house',1100,200],['house',1160,200],['well',1120,260],['farm',1180,100],['road',1100,140],['road',1144,140],['road',1188,140]]);
 await advance(p,90);const supplied=await snapshot(p);assert.ok(supplied.population>8);assert.equal(supplied.housing.houses[0].services.water.status,'ready');
 await p.evaluate(()=>window.__cityTest.remove('well'));await advance(p,60);const shortage=await snapshot(p);assert.ok(shortage.satisfaction.score<supplied.satisfaction.score);assert.equal(shortage.growth.progress,0);assert.equal(shortage.housing.houses[0].tier,1);conserved(shortage);
 await seed(p,[['well',1120,260]]);await advance(p,150.1);const recovered=await snapshot(p);assert.ok(recovered.cycles>=60);assert.ok(recovered.satisfaction.score>shortage.satisfaction.score);assert.ok(recovered.population>shortage.population);assert.ok(recovered.housing.houses[0].tier>=2);assert.equal(recovered.food.last.shortfall,0);assert.equal(await p.evaluate(()=>window.__cityTest.ended()),false);conserved(recovered);
 fs.writeFileSync('test-results/gallery/m5-five-minute-recovery.json',JSON.stringify({supplied,shortage,recovered},null,2));await p.locator('#sc1312CityLifeBtn').click();await p.getByRole('table',{name:'Citizen satisfaction factors'}).scrollIntoViewIfNeeded();await p.screenshot({path:'test-results/gallery/m5-recovered-city.png'});
});
for(const width of [390,768])test(`Services feedback preserves minimap, focus and menus at ${width}px`,async t=>{
 const p=await game(t,width,844);await seed(p,neighborhood);await advance(p,15);await p.locator('#sc1312CityLifeBtn').click();await p.getByRole('table',{name:'Citizen satisfaction factors'}).waitFor({state:'visible'});const summary=p.locator('#scCityEconomyPanel summary').first();await summary.focus();const key=await summary.evaluate(e=>e.closest('details').dataset.house);await advance(p,5);await p.waitForTimeout(600);assert.equal(await p.evaluate(()=>document.activeElement.closest('details')?.dataset.house),key);
 const a=await p.locator('#sc159Pulse').boundingBox(),b=await p.locator('#scFloatingMinimap').boundingBox();assert.ok(a.x>=0&&a.x+a.width<=width);assert.ok(a.x>=b.x+b.width||a.y>=b.y+b.height);assert.ok(a.y+a.height<=844-88);await p.screenshot({path:`test-results/gallery/m5-services-${width}.png`});await p.locator('#scCityLifeClose').click();await p.locator('#sc140Keep').click();await p.locator('#sc140Build').click();assert.match(await p.locator('#sc140Commands').innerText(),/House/);
});
test('Services legacy Advisor, culture and ration explanations match the satisfaction engine',async t=>{
 const p=await game(t);await seed(p,[...neighborhood,['theater',1100,400]]);await advance(p,15);await p.locator('#sc1310AdvisorBtn').click();await p.waitForFunction(()=>document.querySelector('#sc1316Coverage')?.textContent.length>15);assert.doesNotMatch(await p.locator('#sc1316Coverage').innerText(),/Happiness bonus|per cycle/);assert.match(await p.locator('#sc1315ServicesText').innerText(),/target/i);await p.locator('#sc1310AdvisorClose').click();
 const q=await point(p,1100,400,true);await p.mouse.click(q.x,q.y);await p.locator('#scCityInspection').waitFor({state:'visible'});assert.doesNotMatch(await p.locator('#scCityInspection').innerText(),/0\.4 happiness|per food cycle/);assert.match(await p.locator('#scCityInspection').innerText(),/240|target/);
 await p.evaluate(()=>window.__cityTest.stores(0));await p.locator('#sc1303Mode').evaluate(el=>{el.value='auto';el.dispatchEvent(new Event('change'))});assert.match(await p.locator('#sc1306Status').textContent(),/satisfaction target/);assert.doesNotMatch(await p.locator('#sc1306Status').textContent(),/per cycle/);
 await p.locator('#sc190ChronicleBtn').click();await p.waitForFunction(()=>/target|amenities/i.test(document.querySelector('#sc1347CultureInfo')?.textContent||''));assert.doesNotMatch(await p.locator('#sc1347CultureInfo').innerText(),/happiness per food cycle|town-wide.*bonus/i);assert.doesNotMatch(await p.locator('#sc1347CultureInfo').evaluate(el=>el.parentElement.innerText),/0\.4 happiness/);
});
test('Services enforce all home reach boundaries and the exact 135 market road boundary',async t=>{
 const p=await game(t);
 for(const [kind,type] of [['water','well'],['health','clinic'],['market','market']]){
  await p.evaluate(()=>window.__cityTest.reset());await seed(p,[['house',1100,200],[type,1290,200],['road',1289,250],['road',1333,250],['road',1377,250]]);assert.equal((await snapshot(p)).housing.houses[0].services[kind].status,'out_of_range',kind+' excludes exactly190');await seed(p,[[type,1289.99,200]]);assert.equal((await snapshot(p)).housing.houses[0].services[kind].status,'ready',kind+' includes below190');
 }
 await p.evaluate(()=>window.__cityTest.reset());await seed(p,[['house',1100,250],['market',1100,200],['road',1235,200],['road',1279,200],['road',1323,200]]);assert.equal((await snapshot(p)).housing.houses[0].services.market.status,'disconnected');await p.evaluate(()=>window.__cityTest.remove('road'));await seed(p,[['road',1234.99,200],['road',1279,200],['road',1323,200]]);assert.equal((await snapshot(p)).housing.houses[0].services.market.status,'ready');
});
test('Services selected inspection avoids full-city snapshots and per-road network rebuilding',async t=>{
 const p=await game(t);await seed(p,[['farm',1180,100],...Array.from({length:20},(_,i)=>['road',1000+i*44,400])]);const small=await p.evaluate(()=>window.__cityTest.inspectionCost());await seed(p,Array.from({length:180},(_,i)=>['road',1000+(i%20)*44,450+Math.floor(i/20)*44]));const large=await p.evaluate(()=>window.__cityTest.inspectionCost());assert.equal(small.snapshots,0);assert.equal(large.snapshots,0);assert.ok(large.networks<=small.networks+1,JSON.stringify({small,large}));
});
test('Services selected market map matches 190-unit reach and empty-reserve readiness',async t=>{
 const p=await game(t);await seed(p,[['market',1100,200],['house',1100,395],['road',1188,140],['road',1188,184],['road',1188,228]]);await p.evaluate(()=>{window.__cityTest.stores(0);window.__marketText=[];window.__marketRadius190=false;const text=CanvasRenderingContext2D.prototype.fillText,arc=CanvasRenderingContext2D.prototype.arc;CanvasRenderingContext2D.prototype.fillText=function(t,...args){window.__marketText.push(String(t));if(window.__marketText.length>1000)window.__marketText.shift();return text.call(this,t,...args)};CanvasRenderingContext2D.prototype.arc=function(x,y,r,...args){if(x===1100&&y===200&&r===190)window.__marketRadius190=true;return arc.call(this,x,y,r,...args)}});
 const q=await point(p,1100,200,true);await p.mouse.click(q.x,q.y);await p.locator('#scCityInspection').waitFor({state:'visible'});assert.match(await p.locator('#scCityInspection').innerText(),/reserve is empty/);await p.waitForFunction(()=>window.__marketRadius190&&window.__marketText.includes('MARKET: EMPTY FOOD RESERVE'));assert.equal((await snapshot(p)).housing.houses[0].services.market.status,'out_of_range');await p.screenshot({path:'test-results/gallery/m5-market-shortage.png'});
});
