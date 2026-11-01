const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const {launchBrowser,browserPage}=require('./support/browser.cjs');
const fs = require('node:fs');
const http = require('node:http');
let browser, server, url;
before(async () => {
  server = http.createServer((req, res) => { res.setHeader('Content-Type', 'text/html'); res.end(fs.readFileSync('index.html')); });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  url = `http://127.0.0.1:${server.address().port}`;
  browser = await launchBrowser();
});
after(async () => { await browser?.close(); server?.close(); });
const adapter = `
window.__cityTest = {
  seed(items) { for(const [type,x,y] of items)addBuilding(0,type,x,y); updateUI(); },
  advance(seconds) { for(let i=0;i<seconds*4&&!ended;i++)tick(.25); window.scHoverBuildings=buildings; window.scRTSUnits=units; },
  remove(type) { for(const b of buildings)if(b.team===0&&b.type===type)b.hp=0;buildings=buildings.filter(alive);updateUI(); },
  stores(value) {food=value;updateUI();},
  population(value) {population=value;updateUI();},
  reset() {init();window.scHoverBuildings=buildings;window.scRTSUnits=units;},
  ended:()=>ended
};
`;
async function game(t, width = 1440, height = 900) {
  const {context,page} = await browserPage(t,browser,{ viewport: { width, height } }); const errors = [];
  page.on('pageerror', e => errors.push(e.message)); page.setDefaultTimeout(6000);
  t.after(() => assert.deepEqual(errors, []));
  await page.route('**/*', route => route.fulfill({ contentType: 'text/html', body: fs.readFileSync('index.html', 'utf8').replace('gold=240;wood=100;stone=30;', 'gold=2400;wood=2000;stone=2000;').replace('window.scHoverBuildings=buildings;function frame', adapter + '\nwindow.scHoverBuildings=buildings;function frame') }));
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
test('housing develops gradually, shows occupancy and requires food, water and roads for migration', async t => {
  const p = await game(t); await seed(p, [['house',1100,200]]); await advance(p,30);
  let s = await snapshot(p); assert.equal(s.population,8); assert.equal(s.housing.houses[0].tier,1); assert.equal(s.housing.houses[0].occupancy,0); assert.match(s.growth.reason,/water|road/i);
  await seed(p, neighborhood.slice(2)); await advance(p,5); s=await snapshot(p); assert.equal(s.housing.houses[0].tier,1); assert.equal(s.housing.houses[0].upgradeSeconds,5);
  await advance(p,5); s=await snapshot(p); assert.equal(s.housing.houses[0].tier,2); assert.equal(s.population,8);
  await advance(p,5); s=await snapshot(p); assert.equal(s.population,9); conserved(s);
});
test('workforce arithmetic and farm/fishery production follow actual staffing', async t => {
  const p=await game(t); await seed(p,[['farm',1100,100],['fishery',1250,740],['farm',1200,100],['market',1150,300]]); await advance(p,5);
  const s=await snapshot(p); assert.equal(s.workforce.pool,6); assert.equal(s.workforce.filled,6); assert.equal(s.workforce.idle,0); assert.ok(s.workforce.jobs>6); assert.equal(s.food.last.harvest,26); conserved(s);
  const fish=s.workforce.sites.find(b=>b.type==='fishery'); assert.equal(fish.filled,0);
});
test('granaries, distribution, bakery conversion, overflow and shortage reconcile one reserve', async t => {
  const p=await game(t); await seed(p,[...neighborhood,['bakery',1170,260]]); await p.evaluate(()=>window.__cityTest.population(22)); await advance(p,5);
  let s=await snapshot(p); conserved(s); assert.ok(s.food.last.logistics>0); assert.ok(s.food.markets.served>0); assert.ok(s.food.last.bakeryNet>0); assert.ok(s.food.granaries.every(g=>g.stock<=g.capacity));
  assert.equal(s.food.baseStock+s.food.granaries.reduce((n,g)=>n+g.stock,0),s.food.stock);
  await p.evaluate(()=>window.__cityTest.stores(250)); await advance(p,5); s=await snapshot(p); conserved(s); assert.ok(s.food.last.overflow>0);
  await p.evaluate(()=>{window.__cityTest.remove('farm');window.__cityTest.remove('market');window.__cityTest.remove('bakery');window.__cityTest.stores(0)}); await advance(p,5);s=await snapshot(p);conserved(s);assert.ok(s.food.last.shortfall>0);assert.match(s.advice.join(' '),/food|farm/i);
});
test('prosperity explains its factors, is bounded and responds to lost services', async t => {
  const p=await game(t);await seed(p,[...neighborhood,['fortress',770,310]]);await advance(p,180);let s=await snapshot(p);assert.equal(s.prosperity.factors.reduce((n,f)=>n+f.max,0),100);assert.equal(Math.round(s.prosperity.factors.reduce((n,f)=>n+f.points,0)),s.prosperity.target);const score=s.prosperity.score;assert.ok(score>0&&score<=100);
  await p.evaluate(()=>{window.__cityTest.remove('well');window.__cityTest.remove('farm');window.__cityTest.stores(0)});await advance(p,120);s=await snapshot(p);assert.ok(s.prosperity.score<score);assert.ok(s.housing.houses.every(h=>h.tier<=2));conserved(s);
});
test('five simulated minutes sustain a growing city, preserve recruitment and handle displacement/reset', async t => {
  const p=await game(t);await seed(p,[...neighborhood,['fortress',770,310],['fortress',770,220],['fortress',770,400]]);const initialCycles=(await snapshot(p)).cycles;
  for(let i=0;i<60;i++){await advance(p,5);const s=await snapshot(p);conserved(s);assert.ok(s.prosperity.score>=0&&s.prosperity.score<=100)}
  let s=await snapshot(p);assert.equal(s.cycles,initialCycles+60,'The full 300 simulated seconds must run');assert.ok(s.population>8);assert.ok(s.housing.houses.some(h=>h.tier>=3));assert.ok(s.food.stock>0);assert.equal(await p.evaluate(()=>window.__cityTest.ended()),false,await p.locator('#report').innerText());
  const before=await p.evaluate(()=>window.scRTSUnits.filter(u=>u.team===0&&u.type==='worker').length);await p.locator('#sc140Keep').click();await p.locator('#sc140Commands').getByRole('button',{name:/worker/i}).click();await advance(p,7);assert.equal(await p.evaluate(()=>window.scRTSUnits.filter(u=>u.team===0&&u.type==='worker').length),before+1);
  await p.evaluate(()=>window.__cityTest.remove('house'));s=await snapshot(p);assert.ok(s.housing.displaced>0);conserved(s);await advance(p,15);conserved(await snapshot(p));
  await p.evaluate(()=>window.__cityTest.reset());s=await snapshot(p);assert.equal(s.population,8);assert.equal(s.housing.houses.length,0);assert.equal(s.prosperity.score,0);assert.equal(s.cycles,0);
});
for(const width of [1440,1024,768])test(`City Life and Advisor show real figures with reachable controls at ${width}px`, async t => {
  const p=await game(t,width,800);await seed(p,neighborhood);await advance(p,30);await p.locator('#sc1312CityLifeBtn').click();await p.locator('#scCityEconomyPanel').waitFor({state:'visible'});assert.match(await p.locator('#scCityEconomyPanel').innerText(),/Prosperity|prosperity/);assert.match(await p.locator('#scCityEconomyPanel').innerText(),/reserve|Reserve/);
  const bounds=await p.locator('#sc159Pulse').boundingBox();assert.ok(bounds.x>=0&&bounds.x+bounds.width<=width);assert.ok(bounds.y+bounds.height<=800-88);const camera=await p.evaluate(()=>window.sc148Camera.state());await p.mouse.move(bounds.x+bounds.width-2,bounds.y+100);await p.waitForTimeout(350);assert.deepEqual(await p.evaluate(()=>window.sc148Camera.state()),camera,'Reading City Life at the viewport edge must not scroll the world');
  await p.locator('#scCityLifeClose').click();assert.equal(await p.locator('#sc159Pulse').isVisible(),false);await p.locator('#sc1310AdvisorBtn').click();assert.equal(await p.locator('#sc159Pulse').isVisible(),false);assert.ok((await p.locator('#sc1310AdvisorAdvice').innerText()).length>20);
  await p.locator('#sc1310AdvisorClose').click();const mini=p.locator('#scFloatingMinimap');await mini.click({position:{x:100,y:40}});assert.ok((await p.evaluate(()=>window.sc148Camera.state())).x>0);
  fs.mkdirSync('test-results/gallery',{recursive:true});await p.locator('#sc1312CityLifeBtn').click();await p.locator('#sc154Pause').click();await p.waitForTimeout(250);await p.screenshot({path:`test-results/gallery/city-life-${width}.png`});if(width===1440){await p.locator('#scCityEconomyPanel h3').filter({hasText:/Prosperity/}).scrollIntoViewIfNeeded();await p.screenshot({path:'test-results/gallery/prosperity-1440.png'})}
});
test('pause freezes housing and food and Chronicle uses the same workforce totals', async t => {
  const p=await game(t);await seed(p,neighborhood);await advance(p,15);const a=await snapshot(p);await p.waitForTimeout(5500);const b=await snapshot(p);assert.equal(a.cycles,b.cycles);assert.equal(a.population,b.population);assert.equal(a.food.stock,b.food.stock);
  await p.locator('#sc190ChronicleBtn').click();await p.waitForTimeout(600);assert.doesNotMatch(await p.locator('#sc194Capacity').innerText(),/estimated|potential/i);assert.match(await p.locator('#sc194Balance').innerText(),new RegExp(String(b.workforce.filled)));
});
test('migration cannot fill a remote unserviced house after serviced housing is full', async t => {
  const p=await game(t);await seed(p,[['house',1100,200],['house',1450,600],['well',1120,260],['farm',1180,100],['road',1100,140],['road',1144,140],['road',1188,140]]);await advance(p,10);await p.evaluate(()=>window.__cityTest.population(18));await advance(p,30);const s=await snapshot(p);assert.equal(s.population,18);assert.equal(s.housing.houses[1].occupancy,0);assert.equal(s.growth.progress,0);
});
test('house requirements retain keyboard focus across live City Life refreshes', async t => {
  const p=await game(t);await seed(p,neighborhood);await advance(p,15);await p.locator('#sc1312CityLifeBtn').click();const summary=p.locator('#scCityEconomyPanel summary').first();await summary.focus();const id=await summary.evaluate(el=>el.closest('details').dataset.house);await advance(p,5);await p.waitForTimeout(1200);assert.equal(await p.evaluate(()=>document.activeElement?.closest('details')?.dataset.house),id);await p.keyboard.press('Enter');assert.equal(await p.locator('#scCityEconomyPanel details').first().getAttribute('open'),'');
});
test('Advisor guidance comes exclusively from the engine city snapshot',async t=>{
  const p=await game(t);await p.locator('#sc1310AdvisorBtn').click();assert.deepEqual(await p.locator('#sc1310AdvisorAdvice .sc1310Task p').allTextContents(),(await snapshot(p)).advice.slice(0,5));
});
test('half-staffed bakeries scale both inputs and outputs and lost granaries reconcile storage',async t=>{
  const p=await game(t);await seed(p,[['farm',1180,100],['granary',1230,250],['market',1190,300],['bakery',1170,260],['road',1188,140],['road',1188,184],['road',1188,228],['road',1188,272]]);await p.evaluate(()=>window.__cityTest.population(9));await advance(p,5);let s=await snapshot(p);assert.equal(s.workforce.sites.find(b=>b.type==='bakery').filled,1);assert.equal(s.food.last.bakeryNet,1);conserved(s);
  await p.evaluate(()=>{window.__cityTest.stores(250);window.__cityTest.remove('granary')});await advance(p,5);s=await snapshot(p);assert.equal(s.food.capacity,90);assert.ok(s.food.last.overflow>0);conserved(s);
});
test('a city constructed through the working palette grows with food, water and roads',async t=>{
  const p=await game(t);
  async function point(x,y,center=false){return p.evaluate(({x,y,center})=>{const c=document.querySelector('#field'),v=c.parentElement;if(center){v.scrollLeft=x-v.clientWidth/2;v.scrollTop=y-v.clientHeight/2}const r=c.getBoundingClientRect();return{x:r.left+x*r.width/c.width,y:r.top+y*r.height/c.height}},{x,y,center})}
  for(const [name,x,y] of [['House',1100,200],['Farm',1180,100],['Well',1120,260]]){await p.locator('#sc140Build').click();await p.locator('#sc140Commands').getByRole('button',{name:new RegExp(name,'i')}).first().click();const at=await point(x,y,true);await p.mouse.click(at.x,at.y)}
  await p.locator('#sc140Build').click();await p.locator('#sc140Commands').getByRole('button',{name:/Road/i}).first().click();const a=await point(1050,140,true),b=await point(1138,140);await p.mouse.move(a.x,a.y);await p.mouse.down();await p.mouse.move(b.x,b.y,{steps:10});await p.mouse.up();await advance(p,20);const s=await snapshot(p);assert.equal(s.housing.houses.length,1);assert.ok(s.population>8);assert.ok(s.food.last.harvest>0);conserved(s);
});
