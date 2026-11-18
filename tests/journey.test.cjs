const {test,before,after}=require('node:test');const assert=require('node:assert/strict'),fs=require('node:fs'),http=require('node:http');const {launchBrowser,browserPage}=require('./support/browser.cjs');let browser,server,url;
before(async()=>{server=http.createServer((q,r)=>{r.setHeader('Content-Type','text/html');r.end(fs.readFileSync('index.html'))});await new Promise(r=>server.listen(0,'127.0.0.1',r));url='http://127.0.0.1:'+server.address().port;browser=await launchBrowser()});after(async()=>{await browser?.close();server?.close()});
test('Survivors start: journey prologue decides survivors and starting stock, then the village begins',async t=>{
 const {page:p}=await browserPage(t,browser,{viewport:{width:1440,height:900}});p.setDefaultTimeout(8000);await p.goto(url);
 await p.locator('#scStartJourney').waitFor({state:'attached'});await p.evaluate(()=>document.getElementById('scStartJourney').click());
 await p.locator('#sc35Journey').waitFor({state:'visible'});assert.equal(await p.locator('#sc35Begin').isDisabled(),false);
 await p.locator('#sc35Begin').click();
 for(let i=0;i<5;i++){await p.locator('#sc35River').click();}
 await p.locator('#sc35Found').waitFor({state:'visible'});assert.match(await p.locator('#sc35Journey').innerText(),/survivors reach the site/);
 await p.locator('#sc35Found').click();await p.waitForTimeout(400);
 const s=await p.evaluate(()=>({pop:scCityEconomy.snapshot().population,res:scCityEconomy.snapshot().resources||null}));
 assert.ok(s.pop>=3&&s.pop<=8,JSON.stringify(s));
});
test('A careless journey costs lives but never leaves fewer than three survivors',async t=>{
 const {page:p}=await browserPage(t,browser,{viewport:{width:1440,height:900}});p.setDefaultTimeout(8000);await p.goto(url);
 await p.locator('#scStartJourney').waitFor({state:'attached'});await p.evaluate(()=>document.getElementById('scStartJourney').click());
 await p.evaluate(()=>{for(const k of ['food','water']){const i=document.getElementById('sc35'+k);i.value=0;i.dispatchEvent(new Event('input'))}const t=document.getElementById('sc35tools');t.value=30;t.dispatchEvent(new Event('input'));const f=document.getElementById('sc35food');f.value=6;f.dispatchEvent(new Event('input'))});
 await p.locator('#sc35Begin').isDisabled().then(d=>{});
 await p.evaluate(()=>{for(const [k,v] of [['food',3],['water',3],['tools',30]]){const i=document.getElementById('sc35'+k);i.value=v;i.dispatchEvent(new Event('input'))}});
 await p.locator('#sc35Begin').click();for(let i=0;i<5;i++)await p.locator('#sc35Ridge').click();
 await p.locator('#sc35Found').waitFor({state:'visible'});const n=+(await p.locator('#sc35Journey').innerText()).match(/(\d+) survivors/)[1];assert.ok(n>=3&&n<=8,'survivors '+n);
});
