const {test,before,after}=require('node:test');const assert=require('node:assert/strict'),fs=require('node:fs'),http=require('node:http');
const {launchBrowser,browserPage}=require('./support/browser.cjs');let browser,server,url;
before(async()=>{server=http.createServer((q,r)=>{r.setHeader('Content-Type','text/html');r.end(fs.readFileSync('index.html'))});await new Promise(r=>server.listen(0,'127.0.0.1',r));url='http://127.0.0.1:'+server.address().port;browser=await launchBrowser()});after(async()=>{await browser?.close();server?.close()});
for(const [width,height]of [[390,844],[1366,606],[1440,900]])test('Expanded City Life controls stay visible to focus and do not overlap at '+width+'x'+height,async t=>{
 const {page:p}=await browserPage(t,browser,{viewport:{width,height}});await p.goto(url);await p.locator('#sc1310Skip').click();await p.evaluate(s=>scCitySave.restore(s),JSON.parse(fs.readFileSync('tests/fixtures/city-v0140.json')));await p.locator('#sc1312CityLifeBtn').click();const before=await p.evaluate(()=>scCitySave.capture().state);
 for(const name of ['Village','Economy','Food','Housing','Employment','Satisfaction']){
  await p.locator('#scCityPlanningNav [data-section="'+name+'"]').click();await p.locator('#sc159Pulse details').evaluateAll(es=>es.forEach(e=>e.open=true));
  const problems=await p.evaluate(()=>{const root=document.querySelector('#sc159Pulse'),bounds=root.getBoundingClientRect(),out=[];for(const e of root.querySelectorAll('button,summary,input,select')){if(!e.getClientRects().length||e.disabled)continue;e.focus();if(document.activeElement!==e)continue;const r=e.getBoundingClientRect(),x=(r.left+r.right)/2,y=(r.top+r.bottom)/2,hit=document.elementFromPoint(x,y);if(x<=bounds.left||x>=bounds.right||y<=bounds.top||y>=bounds.bottom||!e.contains(hit))out.push(e.textContent.trim().slice(0,70));}return out;});assert.deepEqual(problems,[],name+' focused controls must not hide behind another control');
 }
 assert.deepEqual(await p.evaluate(()=>scCitySave.capture().state),before,'Layout inspection cannot spend resources or alter units');
});
