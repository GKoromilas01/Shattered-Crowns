const {test,before,after}=require('node:test');const assert=require('node:assert/strict'),fs=require('node:fs'),http=require('node:http');const {launchBrowser,browserPage}=require('./support/browser.cjs');let browser,server,url;
before(async()=>{server=http.createServer((q,r)=>{r.setHeader('Content-Type','text/html');r.end(fs.readFileSync('index.html'))});await new Promise(r=>server.listen(0,'127.0.0.1',r));url='http://127.0.0.1:'+server.address().port;browser=await launchBrowser()});after(async()=>{await browser?.close();server?.close()});
async function game(t,width=1440){const {page:p}=await browserPage(t,browser,{viewport:{width,height:900},reducedMotion:'reduce'});p.setDefaultTimeout(6500);await p.goto(url);await p.locator('#sc1310Skip').click();await p.locator('#sc154Pause').click();return p;}
test('Milestone story cards show once, in order, and can be continued',async t=>{
 const p=await game(t);await p.evaluate(()=>scMilestones.reset());
 assert.equal(await p.evaluate(()=>scMilestones.trigger('harvest')),true);assert.equal(await p.evaluate(()=>scMilestones.trigger('harvest')),false);
 await p.locator('#sc34Milestone').waitFor({state:'visible'});assert.match(await p.locator('#sc34Milestone').innerText(),/First Harvest/);
 await p.evaluate(()=>scMilestones.trigger('market'));assert.equal(await p.locator('#sc34Milestone').count(),1);
 await p.locator('#sc34MilestoneGo').click();await p.waitForFunction(()=>/Market Day/.test(document.getElementById('sc34Milestone')?.innerText||''),null,{timeout:5000});
 await p.locator('#sc34MilestoneGo').click();assert.equal(await p.evaluate(()=>scMilestones.defs.length),6);
});
test('Southveil settlements sit centred and inside the continent view',async t=>{
 const p=await game(t);await p.evaluate(()=>scKingdomUI.openWorld());await p.locator('[data-continent="southveil"]').click();await p.waitForTimeout(300);
 const r=await p.evaluate(()=>{const vp=document.getElementById('scContinentMap').getBoundingClientRect();const m=[...document.querySelectorAll('#scContinentTerrain [data-continent-place]')].map(e=>e.getBoundingClientRect());const ys=m.map(b=>(b.top+b.bottom)/2);const mid=(Math.min(...ys)+Math.max(...ys))/2;return {offset:Math.abs(mid-(vp.top+vp.bottom)/2),h:vp.height,inside:m.filter(b=>b.top>=vp.top&&b.bottom<=vp.bottom).length,total:m.length}});
 assert.ok(r.offset<r.h*.2,JSON.stringify(r));assert.ok(r.inside>=r.total-3,JSON.stringify(r));
});
test('Soldiers earn ranks from victories and a General triggers the story card',async t=>{
 const p=await game(t);await p.evaluate(()=>scMilestones.reset());
 const r=await p.evaluate(()=>{const u={team:0,type:'soldier',hp:50};const out=[];for(let i=0;i<10;i++){scEarnKill(u);out.push(u.rank||'')}const w={team:0,type:'worker',hp:10};scEarnKill(w);scEarnKill(w);scEarnKill(w);return {out,worker:w.rank||null}});
 assert.equal(r.out[2],'Sergeant');assert.equal(r.out[5],'Captain');assert.equal(r.out[9],'General');assert.equal(r.worker,null);
 await p.locator('#sc34Milestone').waitFor({state:'visible'});assert.match(await p.locator('#sc34Milestone').innerText(),/General Rises/);
});
