const {test,before,after}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),http=require('node:http');
const {launchBrowser,browserPage}=require('./support/browser.cjs');
let browser,server,url;
const adapter=`window.__advisorTest={mode:()=>mode,seed(type,x,y){addBuilding(0,type,x,y);updateUI();window.scHoverBuildings=buildings;},advance(){for(let i=0;i<20;i++)tick(.25);},empty(){food=0;updateUI();}};`;
before(async()=>{server=http.createServer((q,r)=>{r.setHeader('Content-Type','text/html');r.end(fs.readFileSync('index.html','utf8').replace('window.scHoverBuildings=buildings;function frame',adapter+'\nwindow.scHoverBuildings=buildings;function frame'))});await new Promise(r=>server.listen(0,'127.0.0.1',r));url='http://127.0.0.1:'+server.address().port;browser=await launchBrowser();});
after(async()=>{await browser?.close();server?.close();});
async function game(t,width=1440){const {page:p}=await browserPage(t,browser,{viewport:{width,height:900}});p.setDefaultTimeout(6000);await p.goto(url);await p.locator('#sc1310Skip').click();await p.locator('#sc154Pause').click();await p.locator('#sc1310AdvisorBtn').click();return p;}
for(const width of [390,768,1440])test('Advisor explains real bottlenecks and navigates without changing city state at '+width,async t=>{
 const p=await game(t,width);const cards=p.locator('#scAdvisorIssues');await cards.waitFor({state:'visible'});assert.match(await cards.innerText(),/housing is full|staffed farms/i);assert.match(await p.locator('#scAdvisorMeasurement').innerText(),/waiting/i);
 const close=await p.locator('#sc1310AdvisorClose').boundingBox(),panel=await p.locator('#sc1310AdvisorPanel').boundingBox();assert.ok(close.y>=panel.y&&close.y+close.height<=panel.y+panel.height,'Close advisor stays visible before scrolling');
 const review=cards.getByRole('button',{name:'Review Employment',exact:true}).first();const b=await review.boundingBox();assert.ok(b.x>=0&&b.x+b.width<=width+1);
 const capture=()=>p.evaluate(()=>({save:window.scCitySave.capture(),paused:window.scCitySave.status().paused}));const before=await capture();await review.focus();await p.keyboard.press('Space');
 assert.equal(await p.locator('#sc1310AdvisorPanel').isVisible(),false);assert.equal(await p.locator('#sc159Pulse').isVisible(),true);assert.equal(await p.locator('#scPlanSectionEmployment').evaluate(e=>document.activeElement===e),true);
 const after=await capture();assert.deepEqual(after.save.state,before.save.state);assert.deepEqual(after.save.view,before.save.view);assert.equal(after.paused,before.paused);
});
test('Advisor refreshes measured shortages and keeps keyboard and held pointer activation alive',async t=>{
 const p=await game(t);await p.evaluate(()=>{window.__advisorTest.empty();window.__advisorTest.advance();});await p.waitForFunction(()=>document.querySelector('#scAdvisorIssues')?.textContent.includes('unmet meals'));
 assert.match(await p.locator('#scAdvisorMeasurement').innerText(),/last completed/i);
 const button=p.locator('[data-advisor-id="meals"] button');await button.focus();await p.keyboard.down('Space');await p.evaluate(()=>window.__advisorTest.advance());await p.waitForTimeout(750);assert.equal(await button.evaluate(e=>document.activeElement===e),true);await p.keyboard.up('Space');assert.equal(await p.locator('#sc159Pulse').isVisible(),true);
 await p.locator('#scCityLifeClose').click();await p.locator('#sc1310AdvisorBtn').click();const at=await button.boundingBox();await p.mouse.move(at.x+at.width/2,at.y+at.height/2);await p.mouse.down();await p.evaluate(()=>window.__advisorTest.advance());await p.waitForTimeout(750);await p.mouse.up();assert.equal(await p.locator('#sc159Pulse').isVisible(),true);assert.equal(await p.locator('#scPlanSectionFood').evaluate(e=>document.activeElement===e),true);
});
test('Advisor detailed advice refreshes after city changes while panel stays open',async t=>{
 const p=await game(t);
 const advice=p.locator('#sc1310AdvisorAdvice');
 await p.waitForFunction(()=>document.querySelector('#sc1310AdvisorAdvice')?.textContent.includes('Food forecast'));
 await p.evaluate(()=>{window.__advisorTest.empty();window.__advisorTest.advance();});
 await p.waitForFunction(()=>document.querySelector('#sc1310AdvisorAdvice')?.textContent.includes('Food shortage'));
 assert.match(await advice.innerText(),/Food shortage/);
 assert.doesNotMatch(await advice.innerText(),/Food forecast/);
});
test('Advisor preserves a focused review control through changing evidence and ignores paused vacancies',async t=>{
 const p=await game(t);await p.evaluate(()=>{window.__advisorTest.seed('farm',1100,100);window.__advisorTest.seed('market',1150,100);window.__advisorTest.seed('bakery',1200,100);});
 await p.waitForFunction(()=>document.querySelector('[data-advisor-id="staffing"]'));const button=p.locator('[data-advisor-id="staffing"] button');await button.focus();await p.evaluate(()=>window.__advisorTest.advance());await p.waitForTimeout(750);assert.equal(await button.evaluate(e=>document.activeElement===e),true);
 await p.evaluate(()=>{const s=window.scCityEconomy.snapshot();for(const b of s.workforce.sites)window.scCityEconomy.setWorkplaceOpen(b.id,false);});await p.waitForFunction(()=>!document.querySelector('[data-advisor-id="staffing"]'));assert.match(await p.locator('#scAdvisorIssues').innerText(),/No base harvest/);
});

test('Advisor Review preserves an armed placement and selected workers after restoring a city',async t=>{
 const p=await game(t);await p.locator('#sc1310AdvisorBtn').click();
 await p.locator('#sc140Build').click();await p.locator('#sc140Commands').getByRole('button',{name:/House/i}).first().click();assert.equal(await p.evaluate(()=>window.scCityEconomy.selectIdleWorkers()),true);
 const before=await p.evaluate(()=>({mode:window.__advisorTest.mode(),selected:window.scRTSSelected.map(u=>u.id),save:window.scCitySave.capture()}));assert.equal(before.mode,'house');assert.ok(before.selected.length>0);
 await p.locator('#sc1310AdvisorBtn').click();await p.locator('#scAdvisorIssues').getByRole('button',{name:'Review Employment',exact:true}).first().click();
 const after=await p.evaluate(()=>({mode:window.__advisorTest.mode(),selected:window.scRTSSelected.map(u=>u.id)}));assert.equal(after.mode,before.mode);assert.deepEqual(after.selected,before.selected);
 await p.locator('#scCityLifeClose').click();await p.locator('#sc1310AdvisorBtn').click();
 await p.evaluate(()=>{window.__advisorTest.empty();window.__advisorTest.advance();});await p.waitForFunction(()=>!!document.querySelector('[data-advisor-id="meals"]'));
 assert.equal((await p.evaluate(s=>window.scCitySave.restore(s),before.save)).ok,true);
 if(!await p.locator('#sc1310AdvisorPanel').isVisible())await p.locator('#sc1310AdvisorBtn').click();
 await p.waitForFunction(()=>!document.querySelector('[data-advisor-id="meals"]'));assert.match(await p.locator('#scAdvisorMeasurement').innerText(),/waiting/);
 assert.equal(await p.evaluate(()=>window.scCitySave.status().paused),true);
});
