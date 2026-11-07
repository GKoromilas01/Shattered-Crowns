const {test,before,after}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),http=require('node:http');
const {launchBrowser,browserPage}=require('./support/browser.cjs');
let browser,server,url;
const adapter=`window.__stewardTest={
 advance(seconds){for(let left=seconds;left>0;left-=.25)tick(Math.min(.25,left));},
 busy(){const w=units.filter(u=>u.team===0&&u.type==='worker');w[0].order={type:'gather',target:nodes.find(n=>n.type==='stone')};w[1].order={type:'move',x:1200,y:400};w[2].order=null;w[2].target=null;},
 exhaust(type){for(const n of nodes.filter(n=>n.type===type)){n.amount=0;n.renew=0;}},
 seed(){addBuilding(0,'house',1100,200);for(let i=0;i<4;i++)addBuilding(0,'clinic',1200+i*65,100);food=0;updateUI();},
 ineligible(){const w=units.filter(u=>u.team===0&&u.type==='worker');w[0].target=units.find(u=>u.team===1);w[1].carry=1;w[2].hp=0;},
 guard(value){if(value==='ended')ended=true;if(value==='noKeep')buildings=buildings.filter(b=>b.type!=='keep'||b.team!==0);},
};`;
before(async()=>{fs.mkdirSync('test-results/gallery',{recursive:true});server=http.createServer((q,r)=>{r.setHeader('Content-Type','text/html');r.end(fs.readFileSync('index.html','utf8').replace('window.scHoverBuildings=buildings;function frame',adapter+'window.scHoverBuildings=buildings;function frame'));});await new Promise(r=>server.listen(0,'127.0.0.1',r));url='http://127.0.0.1:'+server.address().port;browser=await launchBrowser();});
after(async()=>{await browser?.close();server?.close();});
async function game(t,width=1440,enter=true){const {page:p}=await browserPage(t,browser,{viewport:{width,height:900},reducedMotion:'reduce'});p.setDefaultTimeout(7000);await p.goto(url,{timeout:30000});if(enter){await p.locator('#sc1310Skip').click();await p.locator('#sc154Pause').click();}return p;}
const capture=p=>p.evaluate(()=>window.scCitySave.capture());
const village=p=>p.evaluate(()=>window.scCityEconomy.snapshot().village);
test('Village state reconciles actual map workers and deposits without mutating a paused city',async t=>{
 const p=await game(t),before=await capture(p),v=await village(p);
 assert.ok(v,'A derived village snapshot is required');assert.deepEqual(v.resources,{gold:before.state.resources.gold,wood:before.state.resources.wood,stone:before.state.resources.stone});
 assert.equal(v.workers.total,3);assert.equal(v.workers.idle,3);assert.equal(v.workers.other,0);assert.deepEqual(v.workers.gathering,{wood:0,stone:0,gold:0});
 for(const d of v.deposits){const type=d.resource==='wood'?'tree':d.resource,n=before.state.nodes.filter(n=>n.type===type),keep=before.state.buildings.find(b=>b.type==='keep');assert.equal(d.remaining,n.reduce((s,n)=>s+n.amount,0));assert.equal(d.active,n.filter(n=>n.amount>0).length);const nearest=n.filter(n=>n.amount>0).sort((a,b)=>Math.hypot(a.x-keep.x,a.y-keep.y)-Math.hypot(b.x-keep.x,b.y-keep.y))[0];assert.deepEqual(d.nearest,{x:nearest.x,y:nearest.y});}
 assert.deepEqual((await capture(p)).state,before.state);
});
test('Select idle workers excludes busy and enemy units, preserves orders and sends the existing selection event',async t=>{
 const p=await game(t);await p.evaluate(()=>window.__stewardTest.busy());const before=await capture(p);await p.evaluate(()=>window.addEventListener('sc-selection-changed',e=>window.__stewardSelection=e.detail.units.map(u=>u.id)));
 assert.equal(await p.evaluate(()=>window.scCityEconomy.selectIdleWorkers()),true);const after=await capture(p),workers=before.state.units.filter(u=>u.type==='worker');assert.deepEqual(after.state.selected,[workers[2].id]);assert.deepEqual(after.state.units,before.state.units);assert.deepEqual(after.state.resources,before.state.resources);assert.deepEqual(await p.evaluate(()=>window.__stewardSelection),after.state.selected);assert.equal(await p.evaluate(()=>window.scCitySave.status().paused),true);
 const v=await village(p);assert.equal(v.workers.idle,1);assert.equal(v.workers.gathering.stone,1);assert.equal(v.workers.other,1);
 await p.evaluate(()=>window.scCampaign.start('skirmish'));await p.locator('#sc154Pause').click();await p.evaluate(()=>window.scCityEconomy.selectIdleWorkers());const s=await capture(p);assert.ok(s.state.selected.every(id=>s.state.units.find(u=>u.id===id).team===0));
});
test('Resource location preserves selection orders construction and pause, and existing right-click gathers real stone',async t=>{
 const p=await game(t);assert.equal(await p.evaluate(()=>window.scCityEconomy.selectIdleWorkers()),true);const before=await capture(p);const target=(await village(p)).deposits.find(d=>d.resource==='stone').nearest;
 assert.equal(await p.evaluate(()=>window.scCityEconomy.locateResource('stone')),true);const after=await capture(p);assert.deepEqual(after.state,before.state);assert.equal(await p.evaluate(()=>window.scCitySave.status().paused),true);
 const at=await p.evaluate(({x,y})=>{const c=document.querySelector('#field'),r=c.getBoundingClientRect();return {x:r.x+x*r.width/c.width,y:r.y+y*r.height/c.height};},target);
 await p.mouse.click(at.x,at.y,{button:'right'});await p.evaluate(()=>window.__stewardTest.advance(120));assert.ok((await capture(p)).state.resources.stone>before.state.resources.stone);assert.ok((await capture(p)).state.units.filter(u=>u.type==='worker').every(u=>u.order?.type==='gather'));
});
test('Depleted deposits are unavailable then recover through the existing simulation',async t=>{
 const p=await game(t);await p.evaluate(()=>window.__stewardTest.exhaust('gold'));const before=await capture(p);assert.equal(await p.evaluate(()=>window.scCityEconomy.locateResource('gold')),false);assert.deepEqual((await capture(p)).state,before.state);let d=(await village(p)).deposits.find(d=>d.resource==='gold');assert.equal(d.nearest,null);assert.equal(d.active,0);assert.ok(d.recovering>0);await p.evaluate(()=>window.__stewardTest.advance(46));d=(await village(p)).deposits.find(d=>d.resource==='gold');assert.ok(d.active>0);assert.equal(await p.evaluate(()=>window.scCityEconomy.locateResource('gold')),true);
});
test('Invalid title overview ended and missing-Keep actions reject without mutation',async t=>{
 const p=await game(t,1440,false);assert.equal(await p.evaluate(()=>window.scCityEconomy.selectIdleWorkers()),false);assert.equal(await p.evaluate(()=>window.scCityEconomy.locateResource('wood')),false);await p.locator('#sc1310Skip').click();await p.locator('#sc154Pause').click();
 for(const bad of [null,'tree','food','__proto__',0]){const before=await capture(p);assert.equal(await p.evaluate(x=>window.scCityEconomy.locateResource(x),bad),false);assert.deepEqual((await capture(p)).state,before.state);}
 await p.evaluate(()=>window.scKingdomUI.open());const before=await capture(p);assert.equal(await p.evaluate(()=>window.scCityEconomy.selectIdleWorkers()),false);assert.equal(await p.evaluate(()=>window.scCityEconomy.locateResource('stone')),false);assert.deepEqual((await capture(p)).state,before.state);await p.keyboard.press('Escape');
 await p.evaluate(()=>window.__stewardTest.guard('noKeep'));assert.equal(await p.evaluate(()=>window.scCityEconomy.locateResource('wood')),false);await p.evaluate(()=>window.__stewardTest.guard('ended'));assert.equal(await p.evaluate(()=>window.scCityEconomy.selectIdleWorkers()),false);
});
test('A genuine v0.10 Brookstead save restores exact state and rebuilds derived stewardship data',async t=>{
 const p=await game(t),old=JSON.parse(fs.readFileSync('tests/fixtures/city-v0100.json'));assert.equal(old.createdWith,'0.10.0');assert.equal(old.schema,3);assert.equal((await p.evaluate(s=>window.scCitySave.restore(s),old)).ok,true);assert.deepEqual((await capture(p)).state,old.state);assert.deepEqual((await capture(p)).campaign,old.campaign);assert.ok(await village(p));assert.equal(await p.evaluate(()=>window.scCampaign.status().originId),'brookstead');
});
for(const width of [390,1440])test('Village board is reachable at '+width+'px and keyboard actions preserve Pause and active orders',async t=>{
 const p=await game(t,width);if(width===390){await p.evaluate(()=>window.scCampaign.start('city','brookstead'));await p.locator('#sc154Pause').click();}
 await p.locator('#sc1312CityLifeBtn').click();const board=p.locator('#scVillageBoard');await board.waitFor({state:'visible'});assert.match(await board.innerText(),/Map workers|map workers/);assert.equal(await board.locator('[data-steward-resource]').count(),3);
 await p.getByRole('button',{name:'Village',exact:true}).focus();await p.keyboard.press('Space');assert.equal(await p.locator('#scPlanSectionVillage').evaluate(e=>e===document.activeElement),true);assert.equal(await p.evaluate(()=>window.scCitySave.status().paused),true);assert.notEqual(await p.evaluate(()=>window.scSpacePan),true);
 const bounds=await board.boundingBox();assert.ok(bounds.x>=0&&bounds.x+bounds.width<=width+1);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 await p.locator('[data-steward="idle"]').focus();await p.evaluate(()=>window.__stewardTest.busy());await p.waitForTimeout(700);assert.equal(await p.locator('[data-steward="idle"]').evaluate(e=>e===document.activeElement),true,'Live refresh preserves action focus');
 const before=await capture(p);await p.keyboard.press('Space');assert.equal(await p.locator('#sc159Pulse').isVisible(),false);const after=await capture(p);assert.equal(after.state.selected.length,1);assert.deepEqual(after.state.units,before.state.units);assert.equal(await p.evaluate(()=>window.scCitySave.status().paused),true);assert.notEqual(await p.evaluate(()=>window.scSpacePan),true);
 await p.locator('#sc1312CityLifeBtn').click();await p.locator('[data-steward-resource="wood"]').focus();await p.keyboard.press('Enter');assert.equal(await p.locator('#sc159Pulse').isVisible(),false);assert.deepEqual((await capture(p)).state,after.state);
 await p.locator('#sc1312CityLifeBtn').click();await p.getByRole('button',{name:'Village',exact:true}).click();await p.screenshot({path:'test-results/gallery/m11-village-'+width+'.png'});
});
test('Village needs link measured shortages housing services and staff to existing details without issuing orders',async t=>{
 const p=await game(t);await p.evaluate(()=>{window.__stewardTest.seed();window.__stewardTest.advance(5);});await p.locator('#sc1312CityLifeBtn').click();await p.locator('#scVillageNeeds').waitFor({state:'visible'});
 assert.match(await p.locator('#scVillageNeeds').innerText(),/water|health|market/i);assert.match(await p.locator('#scVillageNeeds').innerText(),/unmet meals.*last measured cycle/i);assert.match(await p.locator('#scVillageNeeds').innerText(),/2 civilian workplace jobs are unfilled/);
 await p.getByRole('button',{name:'Review food',exact:true}).click();assert.equal(await p.locator('#scPlanSectionFood').evaluate(e=>e===document.activeElement),true);await p.getByRole('button',{name:'Village',exact:true}).click();
 await p.getByRole('button',{name:'Review staffing',exact:true}).click();assert.equal(await p.locator('#scPlanSectionEmployment').evaluate(e=>e===document.activeElement),true);await p.getByRole('button',{name:'Village',exact:true}).click();
 await p.getByRole('button',{name:'Review services',exact:true}).click();assert.equal(await p.locator('#scPlanSectionHousing').evaluate(e=>e===document.activeElement),true);
 await p.evaluate(()=>window.__stewardTest.exhaust('gold'));await p.getByRole('button',{name:'Village',exact:true}).click();await p.waitForFunction(()=>document.querySelector('[data-steward-resource="gold"]')?.disabled);assert.match(await p.locator('#scVillageBoard').innerText(),/recover/i);
 const before=await capture(p);assert.deepEqual((await capture(p)).state,before.state);
});
test('No idle action interrupts targeting or carried resources, and disabled action refresh leaves useful focus',async t=>{
 const p=await game(t);await p.evaluate(()=>window.scCampaign.start('skirmish'));await p.locator('#sc154Pause').click();await p.locator('#sc1312CityLifeBtn').click();await p.locator('[data-steward="idle"]').focus();await p.evaluate(()=>window.__stewardTest.ineligible());
 await p.waitForFunction(()=>document.querySelector('[data-steward="idle"]')?.disabled);assert.equal(await p.locator('#scPlanSectionVillage').evaluate(e=>e===document.activeElement),true);
 const before=await capture(p);assert.equal(await p.evaluate(()=>window.scCityEconomy.selectIdleWorkers()),false);assert.deepEqual((await capture(p)).state,before.state);const v=await village(p);assert.equal(v.workers.total,2);assert.equal(v.workers.idle,0);assert.equal(v.workers.other,2);
});
test('Live updates preserve a native Space press until keyup activates the current idle-worker action',async t=>{
 const p=await game(t);await p.locator('#sc1312CityLifeBtn').click();await p.locator('[data-steward="idle"]').focus();await p.keyboard.down('Space');await p.evaluate(()=>window.__stewardTest.busy());await p.waitForTimeout(750);await p.keyboard.up('Space');
 assert.equal(await p.locator('#sc159Pulse').isVisible(),false,'A refresh must not discard the held native button activation');assert.equal((await capture(p)).state.selected.length,1);assert.equal(await p.evaluate(()=>window.scCitySave.status().paused),true);assert.notEqual(await p.evaluate(()=>window.scSpacePan),true);
});
test('Live updates preserve a pressed pointer button until release activates the current idle-worker action',async t=>{
 const p=await game(t);await p.locator('#sc1312CityLifeBtn').click();await p.getByRole('button',{name:'Village',exact:true}).click();await p.locator('[data-steward="idle"]').scrollIntoViewIfNeeded();const at=await p.locator('[data-steward="idle"]').boundingBox();assert.equal(await p.locator('[data-steward="idle"]').evaluate(e=>{const r=e.getBoundingClientRect(),hit=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);return e.contains(hit)}),true,'Pointer target must be visible before pressing it: '+JSON.stringify(at));await p.mouse.move(at.x+at.width/2,at.y+at.height/2);await p.mouse.down();await p.evaluate(()=>window.__stewardTest.busy());await p.waitForTimeout(750);await p.mouse.up();
 assert.equal(await p.locator('#sc159Pulse').isVisible(),false,'A refresh must not discard a held pointer activation');assert.equal((await capture(p)).state.selected.length,1);assert.equal(await p.evaluate(()=>window.scCitySave.status().paused),true);
});
