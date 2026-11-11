const {test,before,after}=require('node:test');
const assert=require('node:assert/strict'),fs=require('node:fs'),http=require('node:http');
const {launchBrowser,browserPage}=require('./support/browser.cjs');
let browser,server,url;
before(async()=>{server=http.createServer((q,r)=>{r.setHeader('Content-Type','text/html');r.end(fs.readFileSync('index.html','utf8').replace('window.scHoverBuildings=buildings;function frame','window.__combinedAdvance=seconds=>{for(let i=0;i<seconds*4;i++)tick(.25);};window.scHoverBuildings=buildings;function frame'));});await new Promise(r=>server.listen(0,'127.0.0.1',r));url='http://127.0.0.1:'+server.address().port;browser=await launchBrowser();});
after(async()=>{await browser?.close();server?.close();});
async function game(t,origin='home'){const {page:p}=await browserPage(t,browser,{viewport:{width:390,height:844}});p.setDefaultTimeout(6500);await p.goto(url);await p.locator('#sc1310Skip').click();await p.evaluate(id=>scCampaign.start('city',id),origin);await p.locator('#sc154Pause').click();return p;}
test('Governor workplace controls coexist with live measured Advisor in a new origin',async t=>{
 const p=await game(t,'saffron-3');assert.equal(await p.evaluate(()=>typeof window.scGovernorUI),'object','Governor presentation must be available alongside the released Advisor');
 await p.evaluate(()=>__combinedAdvance(5));await p.locator('#sc1310AdvisorBtn').click();await p.waitForFunction(()=>document.querySelector('#scAdvisorMeasurement')?.textContent.includes('last completed'));
 const before=await p.evaluate(()=>scCitySave.capture());await p.locator('#scAdvisorIssues button').first().click();await p.locator('#scGovernorOverview').waitFor({state:'visible'});const model=await p.evaluate(()=>scGovernorUI.model());assert.equal(model.population,before.state.people.population);assert.ok(model.reports.length<=3);assert.deepEqual((await p.evaluate(()=>scCitySave.capture())).state,before.state);
 await p.locator('#scCityLifeClose').click();const farm=await p.evaluate(()=>scCityEconomy.snapshot().workforce.sites.find(s=>s.type==='farm').id);assert.equal(await p.evaluate(id=>scCityEconomy.inspect(id),farm),true);await p.locator('#sc19Workplace').waitFor({state:'visible'});await p.locator('#sc19Workplace').click();assert.equal(await p.evaluate(id=>scCityEconomy.snapshot().workforce.sites.find(s=>s.id===id).paused,farm),true);
 await p.locator('#sc1310AdvisorBtn').click();await p.waitForFunction(()=>!!document.querySelector('[data-advisor-id="production"]'));assert.match(await p.locator('[data-advisor-id="production"]').innerText(),/No base harvest/);assert.equal(await p.evaluate(()=>scCitySave.status().paused),true);
});
test('A real thirty-minute food shortage still produces a valid restorable checkpoint',async t=>{
 const p=await game(t);await p.evaluate(()=>__combinedAdvance(1800));const saved=await p.evaluate(()=>scCitySave.capture());assert.equal(saved.state.people.population,4);assert.ok(saved.state.growth.departure<=15,'Departure timer must remain within the existing save bound at the population floor');
 assert.equal((await p.evaluate(s=>scCitySave.restore(s),saved)).ok,true);assert.deepEqual((await p.evaluate(()=>scCitySave.capture())).state,saved.state);
});
test('Expanded workplace controls remain visually above the Pause card on phones',async t=>{
 const p=await game(t,'saffron-3');assert.equal(await p.evaluate(()=>scCityEconomy.inspect(scCityEconomy.snapshot().workforce.sites.find(s=>s.type==='farm').id)),true);const button=p.locator('#sc19Workplace');await button.waitFor({state:'visible'});await p.locator('#sc1311PauseOverlay').waitFor({state:'visible'});
 const paint=await button.evaluate(e=>{const overlay=document.getElementById('sc1311PauseOverlay'),card=overlay.querySelector('.sc1311PauseCard'),r=e.getBoundingClientRect(),c=card.getBoundingClientRect(),x=r.x+r.width/2,y=r.y+r.height/2;const old=overlay.style.pointerEvents;try{overlay.style.pointerEvents='auto';return {overlap:x>=c.left&&x<=c.right&&y>=c.top&&y<=c.bottom,above:e.contains(document.elementFromPoint(x,y))};}finally{overlay.style.pointerEvents=old;}});
 assert.equal(paint.overlap,true,'Fixture must exercise the area covered by the Pause card');assert.equal(paint.above,true,'Pause text must not obscure the expanded workplace action');assert.equal(await p.evaluate(()=>scCitySave.status().paused),true);
});
