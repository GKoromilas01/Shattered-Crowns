const {test,before,after}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),http=require('node:http');
const {launchBrowser,browserPage}=require('./support/browser.cjs');
let browser,server,url;
const adapter=`window.__planningTest={
 seed(items){for(const [type,x,y] of items)addBuilding(0,type,x,y);updateUI();window.scHoverBuildings=buildings;},
 advance(seconds){for(let i=0;i<seconds*4;i++)tick(.25);},
 stores(value){food=value;updateUI();},population(value){population=value;updateUI();},
 remove(id){buildings=buildings.filter(b=>b.id!==id);window.scHoverBuildings=buildings;updateUI();},
 mode:()=>mode
};`;
before(async()=>{server=http.createServer((q,r)=>{r.setHeader('Content-Type','text/html');r.end(fs.readFileSync('index.html','utf8').replace('window.scHoverBuildings=buildings;function frame',adapter+'\nwindow.scHoverBuildings=buildings;function frame'))});await new Promise(r=>server.listen(0,'127.0.0.1',r));url='http://127.0.0.1:'+server.address().port;browser=await launchBrowser();});
after(async()=>{await browser?.close();server?.close();});
async function game(t,width=1440){const {page:p}=await browserPage(t,browser,{viewport:{width,height:900}});p.setDefaultTimeout(6000);await p.goto(url);await p.locator('#sc1310Skip').click();await p.locator('#sc154Pause').click();await p.locator('#sc1312CityLifeBtn').click();await p.locator('#scCityEconomyPanel').waitFor({state:'visible'});return p;}
const snap=p=>p.evaluate(()=>window.scCityEconomy.snapshot());
const advance=(p,n)=>p.evaluate(n=>window.__planningTest.advance(n),n);
const seed=(p,items)=>p.evaluate(items=>window.__planningTest.seed(items),items);
const overview=p=>p.locator('#scCityPlanningSummary');

test('Planning distinguishes unmeasured food, empty housing and zero jobs',async t=>{
 const p=await game(t);assert.equal(await overview(p).count(),1,'City Life needs an at-a-glance planning summary');
 assert.match(await p.locator('#scPlanFood').innerText(),/waiting.*first.*cycle/i);
 assert.match(await p.locator('#scPlanHousing').innerText(),/8.*8/);
 assert.match(await p.locator('#scPlanJobs').innerText(),/0.*0/);
 assert.match(await p.locator('#scPlanServices').innerText(),/no houses/i);
});

test('Planning food balance uses measured demand and separates overflow and unmet meals',async t=>{
 const p=await game(t);await seed(p,[['farm',1100,100]]);await advance(p,5);let s=await snap(p),f=s.food.last;
 assert.ok(f.overflow>0);const expected=f.harvest+f.logistics+f.bakeryNet-f.exports-f.demand;
 await p.waitForFunction(n=>document.querySelector('#scPlanFoodBalance')?.textContent===n,String(expected>0?'+':'')+String(expected));
 assert.match(await p.locator('#scPlanFood').innerText(),/before.*overflow/i);
 assert.equal(await p.locator('#scPlanFoodOverflow').innerText(),String(f.overflow));
 await p.evaluate(()=>window.__planningTest.population(20));assert.equal((await snap(p)).food.last.demand,f.demand);
 await p.waitForTimeout(650);assert.equal(await p.locator('#scPlanFoodBalance').innerText(),(expected>0?'+':'')+expected,'Uses last-cycle demand even if population changes');
 const id=s.workforce.sites[0].id;await p.evaluate(id=>window.__planningTest.remove(id),id);await p.evaluate(()=>window.__planningTest.stores(0));await advance(p,5);s=await snap(p);assert.ok(s.food.last.shortfall>0);
 await p.waitForFunction(()=>Number(document.querySelector('#scPlanFoodShortfall')?.textContent)>0);
 assert.equal(await p.locator('#scPlanFoodShortfall').innerText(),String(s.food.last.shortfall));
});

for(const width of [390,768,1440])test('Planning sections and controls remain reachable at '+width+'px',async t=>{
 const p=await game(t,width);await seed(p,[['house',1100,200],['well',1120,260],['farm',1180,100]]);await advance(p,5);
 await p.waitForFunction(()=>document.querySelector('#scPlanServices')?.textContent.includes('Water 1/1'));
 await p.screenshot({path:'test-results/gallery/m8-overview-'+width+'.png'});
 const bounds=await overview(p).boundingBox();assert.ok(bounds.x>=0&&bounds.x+bounds.width<=width+1);
 for(const section of ['Food','Housing','Employment','Satisfaction']){const nav=p.getByRole('button',{name:section,exact:true});await nav.focus();await p.keyboard.press('Enter');const heading=p.locator('#scPlanSection'+section);await heading.waitFor({state:'visible'});assert.equal(await heading.evaluate(e=>document.activeElement===e),true);const b=await heading.boundingBox();const root=await p.locator('#sc159Pulse').boundingBox();assert.ok(b.y>=root.y&&b.y<root.y+root.height);await advance(p,5);await p.waitForTimeout(650);assert.equal(await heading.evaluate(e=>document.activeElement===e),true,'Section focus survives updates');}
 await p.getByRole('button',{name:'Housing',exact:true}).click();await p.screenshot({path:'test-results/gallery/m8-planning-'+width+'.png'});
});

test('Locate centers a live home at current zoom without changing orders, placement, pause or resources',async t=>{
 const p=await game(t,768);await seed(p,[['house',1100,200]]);const id=(await snap(p)).housing.houses[0].id;
 await p.locator('#scCityLifeClose').click();await p.keyboard.press('w');await p.locator('#sc140Build').click();await p.locator('#sc140Commands').getByRole('button',{name:/House/i}).first().click();await p.locator('#sc1380Out').click();
 await p.locator('#sc1312CityLifeBtn').click();const before=await p.evaluate(()=>({save:window.scCitySave.capture(),mode:window.__planningTest.mode(),paused:window.scCitySave.status().paused}));
 const details=p.locator('details[data-house="'+id+'"]');await details.locator('summary').click();const locate=details.getByRole('button',{name:'Locate house #'+id,exact:true});await locate.focus();await advance(p,5);await p.waitForTimeout(650);assert.equal(await locate.evaluate(e=>document.activeElement===e),true);
 const immediatelyBefore=await p.evaluate(()=>window.scCitySave.capture());await p.keyboard.press('Enter');assert.equal(await p.locator('#sc159Pulse').isVisible(),false);
 const after=await p.evaluate(()=>({save:window.scCitySave.capture(),mode:window.__planningTest.mode(),paused:window.scCitySave.status().paused}));
 assert.equal(after.mode,before.mode);assert.equal(after.paused,before.paused);assert.deepEqual(after.save.state,immediatelyBefore.state);assert.equal(after.save.view.zoom,immediatelyBefore.view.zoom);
 const centered=await p.evaluate(()=>{const c=document.querySelector('#field'),v=c.parentElement,r=c.getBoundingClientRect(),vr=v.getBoundingClientRect();return {x:r.left+1100*r.width/c.width,y:r.top+200*r.height/c.height,vx:vr.left,vy:vr.top,w:v.clientWidth,h:v.clientHeight};});
 assert.ok(Math.abs(centered.x-(centered.vx+centered.w/2))<=2);assert.ok(centered.y>=centered.vy&&centered.y<=centered.vy+centered.h);
});

test('Locate rejects stale, enemy and invalid IDs without moving the camera or closing City Life',async t=>{
 const p=await game(t);await seed(p,[['house',1100,200]]);const id=(await snap(p)).housing.houses[0].id;
 const details=p.locator('details[data-house="'+id+'"]');await details.locator('summary').click();const locate=details.getByRole('button',{name:'Locate house #'+id,exact:true});assert.equal(await locate.count(),1);
 const before=await p.evaluate(()=>window.sc148Camera.state());await p.evaluate(id=>{const button=document.querySelector('[data-locate="'+id+'"]');window.__planningTest.remove(id);button.click();},id);assert.equal(await p.locator('#sc159Pulse').isVisible(),true);assert.match(await p.locator('#scPlanLocationStatus').innerText(),/no longer.*available/i);assert.deepEqual(await p.evaluate(()=>window.sc148Camera.state()),before);
 for(const invalid of [null,'1',-1,Infinity])assert.equal(await p.evaluate(id=>window.scCityEconomy.locate(id),invalid),false);
 await p.evaluate(()=>window.scCampaign.start('skirmish'));await p.waitForFunction(()=>window.scHoverBuildings.some(b=>b.team===1));const enemy=await p.evaluate(()=>window.scHoverBuildings.find(b=>b.team===1).id);assert.equal(await p.evaluate(id=>window.scCityEconomy.locate(id),enemy),false);
});

test('A genuine v0.7 campaign checkpoint restores without changing simulation or campaign progress',async t=>{
 const p=await game(t),saved=JSON.parse(fs.readFileSync('tests/fixtures/city-v070.json'));
 assert.equal(saved.createdWith,'0.7.0');assert.equal(saved.schema,2);
 const r=await p.evaluate(s=>window.scCitySave.restore(s),saved);assert.equal(r.ok,true,r.message);
 const after=await p.evaluate(()=>window.scCitySave.capture());assert.equal(after.createdWith,'0.8.1');assert.deepEqual(after.state,saved.state);assert.deepEqual(after.campaign,saved.campaign);assert.equal(await p.evaluate(()=>window.scCitySave.status().paused),true);
});

test('Space activates planning navigation and Locate without changing Pause or arming camera pan',async t=>{
 const p=await game(t,390);const paused=await p.evaluate(()=>window.scCitySave.status().paused);
 await p.getByRole('button',{name:'Food',exact:true}).focus();await p.keyboard.press('Space');
 assert.equal(await p.locator('#scPlanSectionFood').evaluate(e=>document.activeElement===e),true,'Space should activate the section button');
 assert.equal(await p.evaluate(()=>window.scCitySave.status().paused),paused);assert.notEqual(await p.evaluate(()=>window.scSpacePan),true);
 await seed(p,[['house',1100,200]]);await p.waitForFunction(()=>document.querySelector('details[data-house="8"]'));
 const detail=p.locator('details[data-house="8"]');await detail.locator('summary').focus();await p.keyboard.press('Space');assert.equal(await detail.getAttribute('open'),'');assert.equal(await p.evaluate(()=>window.scCitySave.status().paused),paused);
 await detail.getByRole('button',{name:'Locate house #8',exact:true}).focus();await p.keyboard.press('Space');assert.equal(await p.locator('#sc159Pulse').isVisible(),false);assert.equal(await p.evaluate(()=>window.scCitySave.status().paused),paused);assert.notEqual(await p.evaluate(()=>window.scSpacePan),true);
});

test('A removed building returns focused Locate to a visible section with an explanation',async t=>{
 const p=await game(t,390);await seed(p,[['house',1100,200]]);await p.waitForFunction(()=>document.querySelector('details[data-house="8"]'));
 const detail=p.locator('details[data-house="8"]');await detail.locator('summary').click();await detail.getByRole('button',{name:'Locate house #8',exact:true}).focus();
 await p.evaluate(()=>window.__planningTest.remove(8));await p.waitForFunction(()=>!document.querySelector('details[data-house="8"]'));
 assert.equal(await p.locator('#scPlanSectionHousing').evaluate(e=>document.activeElement===e),true,'A vanished control must leave a useful focus target');
 assert.match(await p.locator('#scPlanLocationStatus').innerText(),/no longer.*available/i);
 const h=await p.locator('#scPlanSectionHousing').boundingBox(),r=await p.locator('#sc159Pulse').boundingBox();assert.ok(h.y>=r.y&&h.y+h.height<=r.y+r.height);assert.equal(await p.evaluate(()=>window.scCitySave.status().paused),true);
});
