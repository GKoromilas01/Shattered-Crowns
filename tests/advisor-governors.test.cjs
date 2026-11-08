const {test,before,after}=require('node:test');
const assert=require('node:assert/strict'),fs=require('node:fs'),http=require('node:http');
const {launchBrowser,browserPage}=require('./support/browser.cjs');
let browser,server,url;
before(async()=>{server=http.createServer((q,r)=>{r.setHeader('Content-Type','text/html');r.end(fs.readFileSync('index.html','utf8').replace('window.scHoverBuildings=buildings;function frame','window.__advisorGovernorAdvance=()=>{for(let i=0;i<20;i++)tick(.25);};window.scHoverBuildings=buildings;function frame'));});await new Promise(r=>server.listen(0,'127.0.0.1',r));url='http://127.0.0.1:'+server.address().port;browser=await launchBrowser();});
after(async()=>{await browser?.close();server?.close();});
for(const id of ['home','brookstead','briar-3','saffron-3','stormhaven-2'])test('Released Advisor follows '+id+' through measurement navigation and save restoration',async t=>{
 const {page:p}=await browserPage(t,browser,{viewport:{width:id==='saffron-3'?390:1440,height:900}});p.setDefaultTimeout(6500);await p.goto(url);await p.locator('#sc1310Skip').click();
 const start=await p.evaluate(id=>scCampaign.start('city',id),id);assert.equal(start.ok,true,'Supported governor '+id+' must start');await p.locator('#sc154Pause').click();await p.evaluate(()=>__advisorGovernorAdvance());
 await p.locator('#sc1310AdvisorBtn').click();await p.waitForFunction(()=>document.querySelector('#scAdvisorMeasurement')?.textContent.includes('last completed'));
 const expected=await p.evaluate(()=>scCityAdvisor.assess(scCityEconomy.snapshot()));assert.equal(expected.measured,true);assert.deepEqual(await p.locator('#scAdvisorIssues article').evaluateAll(es=>es.map(e=>e.dataset.advisorId)),expected.issues.map(i=>i.id));
 for(const issue of expected.issues)assert.ok((await p.locator('[data-advisor-id="'+issue.id+'"]').innerText()).includes(issue.evidence));
 const saved=await p.evaluate(()=>scCitySave.capture());await p.locator('#scAdvisorIssues button').first().click();assert.equal(await p.locator('#scPlanSection'+expected.issues[0].section).evaluate(e=>document.activeElement===e),true);const after=await p.evaluate(()=>scCitySave.capture());assert.deepEqual(after.state,saved.state);assert.deepEqual(after.view,saved.view);
 await p.locator('#scCityLifeClose').click();await p.evaluate(()=>scCampaign.start('city','home'));assert.equal((await p.evaluate(s=>scCitySave.restore(s),saved)).ok,true);await p.locator('#sc1310AdvisorBtn').click();await p.waitForFunction(()=>document.querySelector('#scAdvisorMeasurement')?.textContent.includes('last completed'));
 assert.equal(await p.evaluate(()=>scCampaign.status().originId),id);assert.equal(await p.evaluate(()=>scCitySave.status().paused),true);assert.deepEqual(await p.locator('#scAdvisorIssues article').evaluateAll(es=>es.map(e=>e.dataset.advisorId)),expected.issues.map(i=>i.id));
});
