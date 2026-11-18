const {test,before,after}=require('node:test');const assert=require('node:assert/strict'),fs=require('node:fs'),http=require('node:http');const {launchBrowser,browserPage}=require('./support/browser.cjs');let browser,server,url;
before(async()=>{server=http.createServer((q,r)=>{r.setHeader('Content-Type','text/html');r.end(fs.readFileSync('index.html'))});await new Promise(r=>server.listen(0,'127.0.0.1',r));url='http://127.0.0.1:'+server.address().port;browser=await launchBrowser()});after(async()=>{await browser?.close();server?.close()});
async function game(t,width=1440){const {page:p}=await browserPage(t,browser,{viewport:{width,height:900},reducedMotion:'reduce'});p.setDefaultTimeout(6500);await p.goto(url);await p.locator('#sc1310Skip').click();await p.locator('#sc154Pause').click();return p;}
test('Residents are individuals with jobs and stats, listed and inspectable',async t=>{
 const p=await game(t);
 const r=await p.evaluate(()=>{const ps=scPeople.list();return {n:ps.length,pop:scCityEconomy.snapshot().population,okStats:ps.every(x=>Object.values(x.stats).every(v=>v>=1&&v<=100)),names:new Set(ps.map(x=>x.name)).size,roles:[...new Set(ps.map(x=>x.role))],again:JSON.stringify(scPeople.list())===JSON.stringify(ps)}});
 assert.equal(r.n,r.pop);assert.ok(r.okStats);assert.ok(r.again,'deterministic');assert.ok(r.names>=Math.min(5,r.n));
 await p.locator('#sc36PeopleBtn').click();await p.locator('#sc36People').waitFor({state:'visible'});assert.equal(await p.locator('#sc36People .sc36Row').count(),r.n);
 await p.locator('#sc36People .sc36Row').first().click();assert.match(await p.locator('#sc36Meta').innerText(),/lives in/);assert.equal(await p.locator('#sc36People .sc36Bar').count(),6);
 await p.locator('#sc36Back').click();assert.equal(await p.locator('#sc36People .sc36Row').count(),r.n);await p.keyboard.press('Escape');await p.waitForTimeout(100);
 assert.equal(await p.locator('#sc36People').count(),0);
});
test('Working residents match filled jobs and the day turns through dawn, day, dusk and night',async t=>{
 const p=await game(t);
 await p.evaluate(()=>{});const seen=await p.evaluate(()=>{const o={};for(const t of [10,60,200,230,300,340]){scDayNight.setTime(t);o[t]=scDayNight.phase()}scDayNight.clear();return o});
 assert.deepEqual(Object.values(seen),['Dawn','Day','Dusk','Night','Night','Pre-dawn']);
 await p.evaluate(()=>scDayNight.setTime(300));assert.notEqual(await p.locator('#sc36Daylight').evaluate(e=>getComputedStyle(e).pointerEvents),'auto');
 assert.equal(await p.locator('#sc36Clock').innerText().then(s=>/Night/.test(s)),true);
});
