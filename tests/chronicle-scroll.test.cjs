const {test,before,after}=require('node:test');
const assert=require('node:assert/strict'),fs=require('node:fs'),http=require('node:http');
const {launchBrowser,browserPage}=require('./support/browser.cjs');
let browser,server,url;
before(async()=>{server=http.createServer((q,r)=>{r.setHeader('Content-Type','text/html');r.end(fs.readFileSync('index.html'));});await new Promise(r=>server.listen(0,'127.0.0.1',r));url='http://127.0.0.1:'+server.address().port;browser=await launchBrowser();});
after(async()=>{await browser?.close();server?.close();});
for(const width of [390,1440])test('Chronicle Economy scroll leaves later controls unobscured at '+width,async t=>{
 const {page:p}=await browserPage(t,browser,{viewport:{width,height:800}});
 await p.goto(url);await p.locator('#sc1310Skip').click();await p.locator('#sc190ChronicleBtn').click();await p.locator('#sc199Tabs [data-tab="economy"]').click();
 await p.locator('#sc1308Cycles').evaluate(e=>e.scrollIntoView({block:'center'}));
 await p.locator('#sc1308Cycles').selectOption('4');
 const movement=await p.evaluate(()=>{const panel=document.querySelector('#sc190ChroniclePanel'),r=document.querySelector('#sc1303Rations');panel.scrollTop=0;const before=r.getBoundingClientRect().top;panel.scrollTop=250;return {distance:before-r.getBoundingClientRect().top,scroll:panel.scrollTop};});
 await p.screenshot({path:'work/chronicle-'+width+'.png'});
 assert.ok(movement.scroll>100,'Economy must have scrollable content');
 assert.ok(Math.abs(movement.distance-movement.scroll)<1,'Ration and export controls must scroll with content rather than cover later sections: '+JSON.stringify(movement));
 await p.locator('#sc1308Cycles').selectOption('4');assert.equal(await p.evaluate(()=>window.scBreadReserveCycles),4);
});
