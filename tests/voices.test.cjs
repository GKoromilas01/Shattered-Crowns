const {test,before,after}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs'),http=require('node:http');const {launchBrowser,browserPage}=require('./support/browser.cjs');
let browser,server,url;
before(async()=>{server=http.createServer((q,r)=>{r.setHeader('Content-Type','text/html');r.end(fs.readFileSync('index.html'))});await new Promise(r=>server.listen(0,'127.0.0.1',r));url='http://127.0.0.1:'+server.address().port;browser=await launchBrowser()});after(async()=>{await browser?.close();server?.close()});
const fake=()=>{window.__said=[];const voice={lang:'en-GB',name:'Test'};Object.defineProperty(window,'speechSynthesis',{value:{getVoices:()=>[voice],cancel(){},speak(u){window.__said.push({text:u.text,pitch:u.pitch,rate:u.rate,volume:u.volume});}},configurable:true});window.SpeechSynthesisUtterance=function(t){this.text=t;};};
async function ready(t){const {page:p}=await browserPage(t,browser,{viewport:{width:1200,height:800}});p.setDefaultTimeout(8000);await p.addInitScript(fake);await p.goto(url);await p.waitForFunction(()=>!!window.scVoice);await p.locator('#sc1310Skip').click();await p.mouse.click(600,400);await p.waitForFunction(()=>window.scAudio.status().contextState==='running');return p;}
const pick=(p,units)=>p.evaluate(u=>{window.dispatchEvent(new CustomEvent('sc-selection-changed',{detail:{units:u.map(type=>({type}))}}));},units);
test('Selecting a worker or soldier speaks an acknowledgement at a character pitch',async t=>{
 const p=await ready(t);await p.mouse.click(600,400);await pick(p,['worker']);
 const w=await p.evaluate(()=>window.__said);assert.equal(w.length,1);assert.ok(['Yes, my lord.','Right away.','What shall I do?','I am ready.'].includes(w[0].text));
 await p.waitForTimeout(1900);await p.mouse.click(600,400);await pick(p,['soldier']);
 const all=await p.evaluate(()=>window.__said);assert.equal(all.length,2);assert.ok(all[1].pitch<all[0].pitch);assert.ok(['At your service.','Ready to march.','For the Crown.','Awaiting orders.'].includes(all[1].text));
});
test('Voice lines are throttled and can be switched off and stay off after reload',async t=>{
 const p=await ready(t);await p.mouse.click(600,400);await pick(p,['worker']);await pick(p,['worker']);assert.equal((await p.evaluate(()=>window.__said)).length,1);
 await p.locator('#sc146MenuButton').click();await p.locator('#scAudioVoices').uncheck();await p.locator('#sc146MenuButton').click();assert.equal(await p.locator('#scAudioSection').isVisible(),false);assert.equal(await p.evaluate(()=>localStorage.getItem('shattered-crowns-voice-v1')),'off');
 await p.waitForTimeout(1900);await p.mouse.click(600,400);await pick(p,['soldier']);assert.equal((await p.evaluate(()=>window.__said)).length,1);
 await p.reload();await p.waitForFunction(()=>!!window.scVoice);assert.equal(await p.evaluate(()=>window.scVoice.status().on),false);
});
test('A slow box selection of a whole group still gets an acknowledgement',async t=>{
 const p=await ready(t);await p.waitForTimeout(2000);
 const scr=await p.evaluate(()=>{const c=document.querySelector('#field'),r=c.getBoundingClientRect(),sx=r.width/c.width,sy=r.height/c.height;return scRTSUnits.filter(u=>u.team===0&&u.type==='soldier').map(u=>({x:r.x+u.x*sx,y:r.y+u.y*sy}))});
 assert.ok(scr.length>=3,'the city starts with a group of soldiers');
 const xs=scr.map(u=>u.x),ys=scr.map(u=>u.y),before=await p.evaluate(()=>window.__said.length);
 await p.mouse.move(Math.min(...xs)-40,Math.min(...ys)-40);await p.mouse.down();await p.waitForTimeout(1300);await p.mouse.move(Math.max(...xs)+40,Math.max(...ys)+40,{steps:4});await p.mouse.up();await p.waitForTimeout(300);
 assert.ok((await p.evaluate(()=>scRTSSelected.length))>=3,'the whole group is selected');
 assert.ok((await p.evaluate(()=>window.__said.length))>before,'the group answered');
});
