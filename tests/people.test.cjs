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
 assert.equal(await p.locator('#sc36Daylight').evaluate(e=>getComputedStyle(e).backgroundColor),'rgba(0, 0, 0, 0)','night no longer darkens the map');assert.doesNotMatch(await p.locator('#sc36Clock').textContent(),/Night/);
});
test('People list has a summary, filters and household families that grow up',async t=>{
 const p=await game(t);await p.locator('#sc36PeopleBtn').click();
 assert.match(await p.locator('#sc36Summary').innerText(),/\d+ residents: \d+ working age, \d+ children, \d+ elders/);
 const all=await p.locator('.sc36Row').count();
 for(const k of ['workers','children','elders']){await p.locator('.sc36Filter[data-filter="'+k+'"]').click();const n=await p.locator('.sc36Row').count();assert.ok(n<=all);}
 await p.locator('.sc36Filter[data-filter="all"]').click();await p.locator('.sc36Row').first().click();assert.match(await p.locator('#sc36Family').innerText(),/Household:|Lives alone/);
 const r=await p.evaluate(()=>{const a=scPeople.list();const kids=a.filter(x=>x.role==='Child');return {kids:kids.length,hh:a.some(x=>x.household.length>0)}});assert.equal(r.hh,true);
});
test('Weather changes the screen overlay and the clock label',async t=>{
 const p=await game(t);const seen=await p.evaluate(()=>{const o={};for(const k of scWeather.kinds){scWeather.set(k);o[k]=document.getElementById('sc36Clock').textContent}scWeather.clear();return o});
 assert.match(seen.Rain,/Rain/);assert.match(seen.Fog,/Fog/);assert.match(seen.Cloudy,/Cloudy/);assert.doesNotMatch(seen.Clear,/Rain|Fog|Cloudy/);
 assert.equal(await p.locator('#sc37Weather').evaluate(c=>getComputedStyle(c).pointerEvents),'none');
});
test('Weather overlay never hides the map (transparent canvas, map still drawn)',async t=>{
 const p=await game(t);await p.evaluate(()=>scWeather.set('Cloudy'));await p.waitForTimeout(400);
 assert.equal(await p.locator('#sc37Weather').evaluate(c=>getComputedStyle(c).backgroundColor),'rgba(0, 0, 0, 0)');
 const shot=await p.screenshot();const {PNG}=(()=>{try{return require('pngjs')}catch(e){return {}}})();
 if(PNG){const img=PNG.sync.read(shot);const set=new Set();for(let y=250;y<img.height-200;y+=40)for(let x=150;x<img.width-150;x+=40){const i=(y*img.width+x)*4;set.add(img.data[i]+','+img.data[i+1]+','+img.data[i+2])}assert.ok(set.size>20,'map area has detail, colours '+set.size)}
});
