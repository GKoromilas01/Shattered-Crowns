const {test,before,after}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs'),http=require('node:http');const {launchBrowser,browserPage}=require('./support/browser.cjs');
let browser,server,url;
before(async()=>{server=http.createServer((q,r)=>{r.setHeader('Content-Type','text/html');r.end(fs.readFileSync('index.html'))});await new Promise(r=>server.listen(0,'127.0.0.1',r));url='http://127.0.0.1:'+server.address().port;browser=await launchBrowser()});after(async()=>{await browser?.close();server?.close()});
test('Crown anthem is selectable, persists and generates a real signal',async t=>{
 const {page:p}=await browserPage(t,browser,{viewport:{width:390,height:844}});p.setDefaultTimeout(8000);await p.goto(url);await p.waitForFunction(()=>!!window.scAudio);
 await p.locator('#sc1310Skip').click();await p.locator('#sc146MenuButton').click();
 assert.equal(await p.locator('#scMusicStyle option[value="anthem"]').count(),1);
 await p.locator('#scMusicStyle').selectOption('anthem');
 assert.equal(await p.evaluate(()=>window.scAudio.status().musicStyle),'anthem');
 await p.waitForFunction(()=>window.scAudio.status().contextState==='running'&&window.scAudio.status().musicVoices>0);
 await p.waitForFunction(()=>window.scAudio.status().level>0.00001);
 await p.reload();await p.waitForFunction(()=>window.scAudio);assert.equal(await p.evaluate(()=>window.scAudio.status().musicStyle),'anthem');
 assert.equal(await p.evaluate(()=>window.scAudio.setMusicStyle('city').ok),true);
});
