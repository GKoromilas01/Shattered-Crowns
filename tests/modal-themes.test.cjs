const {test,before,after}=require('node:test');const assert=require('node:assert/strict'),fs=require('node:fs'),http=require('node:http');const {launchBrowser,browserPage}=require('./support/browser.cjs');let browser,server,url;
before(async()=>{server=http.createServer((q,r)=>{r.setHeader('Content-Type','text/html');r.end(fs.readFileSync('index.html'))});await new Promise(r=>server.listen(0,'127.0.0.1',r));url='http://127.0.0.1:'+server.address().port;browser=await launchBrowser()});after(async()=>{await browser?.close();server?.close()});
test('Celtic, Byzantine, Oriental, Organ, Pastoral and Roman themes are valid, varied and use violin, flute and organ voices',async t=>{
 const {page:p}=await browserPage(t,browser,{viewport:{width:1440,height:900}});p.setDefaultTimeout(6500);await p.goto(url);await p.locator('#sc1310Skip').click();
 const r=await p.evaluate(()=>Object.fromEntries(scModalThemes.names.map(n=>{const notes=scModalThemes.notes(n,64);const f=notes.map(x=>x.f);return [n,{count:notes.length,finite:f.every(x=>Number.isFinite(x)&&x>30&&x<4200),flavors:[...new Set(notes.map(x=>x.fl))].sort(),distinctBars:new Set(Array.from({length:8},(_,i)=>scModalThemes.notes(n,8).filter(x=>Math.floor(x.at/ (x.at||1))>=0).length)).size,tune:notes.filter(x=>x.fl==='flute'||x.fl==='horn'||x.fl==='strings').slice(0,24).map(x=>Math.round(x.f)).join(',')}]})));
 assert.deepEqual(Object.keys(r).sort(),['byzantine','celtic','organ','oriental','pastoral','roman']);
 for(const [n,v] of Object.entries(r)){assert.ok(v.finite,n+' notes in audible range');assert.ok(v.count>200,n);}
 const tunes=new Set(Object.values(r).map(v=>v.tune));assert.equal(tunes.size,6,'themes must differ');
 assert.ok(r.celtic.flavors.includes('flute')&&r.celtic.flavors.includes('strings')&&r.celtic.flavors.includes('organ'));
 assert.ok(r.organ.flavors.includes('organ')&&r.pastoral.flavors.includes('flute')&&r.byzantine.flavors.includes('organ')&&r.oriental.flavors.includes('strings')&&r.roman.flavors.includes('horn'));
});
