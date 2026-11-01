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
  elapsed:()=>elapsed, raids:()=>stats.raids, ended:()=>ended
};
`;
async function game(t, width = 1440, height = 900, rich = true) {
  const {context,page} = await browserPage(t,browser,{ viewport: { width, height } }); const errors = [];
  page.on('pageerror', e => errors.push(e.message)); page.setDefaultTimeout(6000);
  t.after(() => assert.deepEqual(errors, []));
  await page.route('**/*', route => route.fulfill({ contentType: 'text/html', body: fs.readFileSync('index.html', 'utf8').replace('gold=240;wood=100;stone=30;', rich?'gold=2400;wood=2000;stone=2000;':'gold=240;wood=100;stone=30;').replace('function getRoadNetwork(){','function getRoadNetwork(){window.__roadBuilds=(window.__roadBuilds||0)+1;').replace('window.scHoverBuildings=buildings;function frame', adapter + '\nwindow.scHoverBuildings=buildings;function frame') }));
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
test('Living City records measured producer and bakery flows and reconciles household delivery', async t => {
 const p=await game(t);await seed(p,[...neighborhood,['bakery',1170,260]]);await p.evaluate(()=>window.__cityTest.population(22));await advance(p,5);
 const s=await snapshot(p);conserved(s);assert.ok(s.food.flows.length);
 assert.equal(s.food.flows.reduce((n,f)=>n+f.harvest,0),s.food.last.harvest);
 assert.equal(s.food.flows.reduce((n,f)=>n+f.logistics,0),s.food.last.logistics);
 assert.equal(s.food.flows.reduce((n,f)=>n+f.produced-f.consumed,0),s.food.last.bakeryNet);
 assert.equal(s.food.flows.reduce((n,f)=>n+f.exported,0),s.food.last.exports);
 assert.ok(Math.abs(s.food.households.reduce((n,h)=>n+h.delivered,0)-s.food.last.delivered)<1e-7);
 assert.ok(Math.abs(s.food.households.reduce((n,h)=>n+h.shortfall,0)-s.food.last.shortfall)<1e-7);
 assert.ok(s.buildings.find(b=>b.type==='bakery').last.produced>0);
});
test('Living City diagnoses idle staff, disconnected logistics and blocked baking without false completion',async t=>{
 const p=await game(t);let s=await snapshot(p);assert.match(s.advice.join(' '),/unemployed/);assert.doesNotMatch(s.advice.join(' '),/supplied and staffed/);
 await seed(p,[['farm',1100,100],['bakery',1170,260]]);await advance(p,5);s=await snapshot(p);
 assert.equal(s.buildings.find(b=>b.type==='farm').supply.connected,false);
 assert.equal(s.buildings.find(b=>b.type==='bakery').idle,true);assert.match(s.advice.join(' '),/granary/);
 assert.equal(s.buildings.find(b=>b.type==='bakery').last.produced,0);
 await seed(p,[['granary',1230,200],['road',1100,140],['road',1144,140],['road',1188,140]]);await advance(p,5);s=await snapshot(p);
 assert.ok(s.buildings.find(b=>b.type==='farm').supply.connected);assert.ok(s.buildings.find(b=>b.type==='bakery').last.produced>0);
 await p.evaluate(()=>window.__cityTest.remove('road'));await advance(p,5);s=await snapshot(p);assert.equal(s.food.last.logistics,0);assert.match(s.advice.join(' '),/Supply link/);conserved(s);
});
test('Living City food shortage reports household shares and housing decline without instant loss',async t=>{
 const p=await game(t);await seed(p,neighborhood);await advance(p,30);let s=await snapshot(p);const h=s.housing.houses[0],tier=h.tier;
 await p.evaluate(()=>{window.__cityTest.remove('farm');window.__cityTest.stores(0)});await advance(p,5);s=await snapshot(p);
 assert.ok(s.food.last.shortfall>0);assert.equal(s.housing.houses[0].tier,tier);assert.equal(s.housing.houses[0].downgradeSeconds,5);
 assert.match(s.buildings.find(b=>b.id===h.id).nextAction,/Food reserve/);assert.match(s.advice[0],/Food shortage/);
 assert.ok(s.food.households.some(h=>h.residents>0&&h.shortfall>0));conserved(s);
 await advance(p,25);s=await snapshot(p);assert.ok(s.housing.houses[0].tier<tier);conserved(s);
});
async function point(p,x,y,center=false){return p.evaluate(({x,y,center})=>{const c=document.querySelector('#field'),v=c.parentElement;if(center){v.scrollLeft=x*c.getBoundingClientRect().width/c.width-v.clientWidth/2;v.scrollTop=y*c.getBoundingClientRect().height/c.height-v.clientHeight/2;}const r=c.getBoundingClientRect();return{x:r.left+x*r.width/c.width,y:r.top+y*r.height/c.height}},{x,y,center})}
test('Living City selected buildings expose staffing, actual output and next housing action',async t=>{
 const p=await game(t);await seed(p,neighborhood);await advance(p,15);await p.evaluate(()=>{window.__canvasText=[];const original=CanvasRenderingContext2D.prototype.fillText;CanvasRenderingContext2D.prototype.fillText=function(text,...args){window.__canvasText.push(String(text));if(window.__canvasText.length>1000)window.__canvasText.shift();return original.call(this,text,...args)}});let q=await point(p,1100,200,true);await p.mouse.click(q.x,q.y);await p.locator('#scCityInspection').waitFor({state:'visible'});
 assert.match(await p.locator('#scCityInspection').innerText(),/Occupancy|NEXT ACTION/);const h=(await snapshot(p)).housing.houses[0];await p.waitForFunction(expected=>window.__canvasText.includes(expected),h.name+' · '+h.occupancy+'/'+h.capacity+' residents');assert.match(await p.locator('#scCityInspection').innerText(),/Healer|Beauty/);await p.screenshot({path:'test-results/gallery/living-city-house.png'});
 await p.getByRole('button',{name:'Close building inspector',exact:true}).click();assert.equal(await p.locator('#scCityInspection').isVisible(),false);
 q=await point(p,1180,100,true);await p.mouse.click(q.x,q.y);await p.locator('#scCityInspection').waitFor({state:'visible'});assert.match(await p.locator('#scCityInspection').innerText(),/Staff: 3\/3/);assert.match(await p.locator('#scCityInspection').innerText(),/LAST CYCLE/);
 await p.locator('#sc1312CityLifeBtn').click();await p.locator('#scCityEconomyPanel').waitFor({state:'visible'});assert.equal(await p.locator('#scCityInspection').isVisible(),false);assert.equal(await p.getByRole('table',{name:'Measured production chain'}).count(),1);await p.getByRole('table',{name:'Measured production chain'}).scrollIntoViewIfNeeded();await p.screenshot({path:'test-results/gallery/living-city-chain.png'});
});
for(const width of [390,601,640])test(`Living City narrow feedback remains clear of minimap and command controls at ${width}px`,async t=>{
 const p=await game(t,width,844);await seed(p,neighborhood);await advance(p,5);await p.locator('#sc1312CityLifeBtn').click();await p.locator('#scCityEconomyPanel').waitFor({state:'visible'});
 const panel=await p.locator('#sc159Pulse').boundingBox(),mini=await p.locator('#scFloatingMinimap').boundingBox();assert.ok(panel.x>=0&&panel.x+panel.width<=width);assert.ok(panel.y>=mini.y+mini.height||panel.x>=mini.x+mini.width);assert.ok(panel.y+panel.height<=844-88);
 await p.locator('#scCityLifeClose').click();await p.locator('#sc1310AdvisorBtn').click();const advisor=await p.locator('#sc1310AdvisorPanel').boundingBox();assert.ok(advisor.x>=0&&advisor.x+advisor.width<=width);assert.ok(advisor.y>=mini.y+mini.height||advisor.x>=mini.x+mini.width);
 await p.locator('#sc1310AdvisorClose').click();
 const rectangles=[];for(const id of ['sc154Pause','sc146MenuButton','sc149Status','scFloatingMinimap','sc140Build','sc140Keep','sc140Selection','sc140Commands']){const r=await p.locator('#'+id).boundingBox();assert.ok(r&&r.x>=0&&r.x+r.width<=width+1,id+' must fit');rectangles.push({id,...r});}
 for(let i=0;i<rectangles.length;i++)for(let j=i+1;j<rectangles.length;j++){const a=rectangles[i],b=rectangles[j];assert.ok(a.x+a.width<=b.x+1||b.x+b.width<=a.x+1||a.y+a.height<=b.y+1||b.y+b.height<=a.y+1,a.id+' overlaps '+b.id);}
 await p.locator('#sc140Build').click();assert.match(await p.locator('#sc140Commands').innerText(),/House/);await p.locator('#sc140Keep').click();await p.locator('#sc140Build').click();assert.match(await p.locator('#sc140Commands').innerText(),/House/);
});

test('Living City survives five minutes from starting resources using real gathering and construction',async t=>{
 const p=await game(t,1440,900,false);assert.equal(Number(await p.locator('#resWood').innerText()),100);assert.equal(Number(await p.locator('#resStone').innerText()),30);
 for(const type of ['tree','stone']){await p.keyboard.press('k');const n=await p.evaluate(type=>window.scRTSNodes.find(n=>n.type===type&&n.amount>0&&n.x<1300),type);const q=await point(p,n.x,n.y,true);await p.mouse.click(q.x,q.y,{button:'right'});await advance(p,15);await p.keyboard.press('x');}
 assert.ok(Number(await p.locator('#resWood').innerText())>=160);assert.ok(Number(await p.locator('#resStone').innerText())>=71);
 for(const [name,x,y] of [['Farm',1180,100],['House',1100,200],['Well',1120,260]]){await p.locator('#sc140Build').click();await p.locator('#sc140Commands').getByRole('button',{name:new RegExp(name,'i')}).first().click();const q=await point(p,x,y,true);await p.mouse.click(q.x,q.y);}
 await p.locator('#sc140Build').click();await p.locator('#sc140Commands').getByRole('button',{name:/Road/i}).first().click();const a=await point(p,1050,140,true),b=await point(p,1138,140);await p.mouse.move(a.x,a.y);await p.mouse.down();await p.mouse.move(b.x,b.y,{steps:10});await p.mouse.up();
 assert.equal((await snapshot(p)).housing.houses.length,1);
 const remaining=await p.evaluate(()=>299.5-window.__cityTest.elapsed());await advance(p,remaining);assert.equal(await p.evaluate(()=>window.__cityTest.raids()),0);await advance(p,.6);
 const s=await snapshot(p);assert.equal(s.cycles,60);assert.ok(s.population>8);assert.ok(s.food.stock>0);assert.equal(s.food.last.shortfall,0);assert.equal(s.housing.houses[0].tier,2);assert.equal(await p.evaluate(()=>window.__cityTest.ended()),false);conserved(s);
 await advance(p,1);assert.equal(await p.evaluate(()=>window.__cityTest.raids()),1,'Offensive raids remain available after the settlement grace');
});
test('Living City hard difficulty retains an earlier raid challenge',async t=>{
 const p=await game(t);await p.evaluate(()=>{document.querySelector('#difficulty').value='hard';window.__cityTest.reset()});const s=await snapshot(p);assert.equal(s.peace.graceSeconds,180);assert.equal(s.peace.raidInterval,120);await advance(p,179.5);assert.equal(await p.evaluate(()=>window.__cityTest.raids()),0);await advance(p,1);assert.equal(await p.evaluate(()=>window.__cityTest.raids()),1);
});
test('Living City uses the market trade radius consistently in feedback and Advisor',async t=>{
 const p=await game(t);await seed(p,[['market',1100,300],['road',1210,300],['road',1254,300],['road',1298,300]]);await advance(p,5);const s=await snapshot(p),m=s.buildings.find(b=>b.type==='market');assert.equal(m.connected,true);assert.doesNotMatch(s.advice.join(' '),/undefined|Supply link: market/);assert.equal(m.blockers.length,0);
});
test('Living City clears the visible selection and measured cycle records on restart',async t=>{
 const p=await game(t);await seed(p,[['farm',1180,100]]);await advance(p,5);const q=await point(p,1180,100,true);await p.mouse.click(q.x,q.y);await p.locator('#scCityInspection').waitFor({state:'visible'});
 await p.evaluate(()=>window.__cityTest.reset());await p.locator('#scCityInspection').waitFor({state:'hidden'});assert.equal(await p.evaluate(()=>window.scRTSInspectedBuilding),null);const s=await snapshot(p);assert.deepEqual(s.food.flows,[]);assert.deepEqual(s.food.households,[]);
});
test('Living City reuses one road network while diagnosing a large road neighborhood',async t=>{
 const p=await game(t);await seed(p,Array.from({length:200},(_,i)=>['road',1000+(i%20)*44,100+Math.floor(i/20)*44]));
 const builds=await p.evaluate(()=>{window.__roadBuilds=0;window.scCityEconomy.snapshot();return window.__roadBuilds;});assert.ok(builds<=3,'Snapshot should share the road network, got '+builds+' builds');
});
test('Living City selected services show the same occupied-neighborhood coverage as City Life',async t=>{
 const p=await game(t);await seed(p,neighborhood);await advance(p,15);const s=await snapshot(p),well=s.buildings.find(b=>b.type==='well');assert.equal(well.coverage.nearby,2);assert.equal(well.coverage.served,2);
 const q=await point(p,1120,260,true);await p.mouse.click(q.x,q.y);await p.locator('#scCityInspection').waitFor({state:'visible'});assert.match(await p.locator('#scCityInspection').innerText(),/Service coverage: 2\/2 nearby homes/);
});
test('Living City Advisor includes measured logistics and baking before reporting a food deficit',async t=>{
 const p=await game(t);await seed(p,[['farm',1180,100],['granary',1230,200],['market',1190,300],['bakery',1170,260],['road',1188,140],['road',1188,184],['road',1188,228]]);await p.evaluate(()=>window.__cityTest.population(30));await advance(p,5);
 const s=await snapshot(p),f=s.food.last;assert.ok(s.food.production<s.food.demand);assert.ok(f.harvest+f.logistics+f.bakeryNet-f.exports>=f.demand);assert.doesNotMatch(s.advice.join(' '),/Food deficit/);conserved(s);
});
