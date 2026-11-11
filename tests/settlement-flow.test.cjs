const {test,before,after}=require('node:test');
const assert=require('node:assert/strict'),fs=require('node:fs'),http=require('node:http');
const {launchBrowser,browserPage}=require('./support/browser.cjs');
let browser,server,url;
const adapter=`window.__flow={
 setup(){nodes=[];buildings=buildings.filter(b=>b.type==='keep');scConstructionSites=[];selected=[];for(const u of units){u.order=null;u.target=null;}},
 sites(){return [scStartConstruction('house',{x:700,y:420}),scStartConstruction('farm',{x:850,y:420}),scStartConstruction('well',{x:1000,y:420})].map(s=>s.id);},
 workers(){return units.filter(u=>u.team===0&&u.type==='worker'&&alive(u));},
 capacity(a,b){for(let i=0;i<4;i++)addUnit(0,'worker',850,420);const s=scConstructionSites.find(s=>s.id===b);this.workers().slice(3).forEach(u=>u.order={type:'build',target:s});this.assign(a);},
 assign(id,n=3){selected=this.workers().slice(0,n);return scConstructionAssign(id);},
 finish(id){const s=scConstructionSites.find(s=>s.id===id);s.progress=s.required-.01;for(const u of this.workers())if(u.order?.target===s){u.x=s.x;u.y=s.y;}scConstructionTick(.25);},
 advance(s){for(let i=0;i<s*4;i++)tick(.25);},
 house(){addBuilding(0,'farm',700,420);return buildings.at(-1).id;},
 duplicateText(){const old=ctx.fillText,seen=[];ctx.fillText=function(text,...args){if(String(text).startsWith('Condition '))seen.push(text);return old.call(this,text,...args);};try{draw();return seen;}finally{ctx.fillText=old;}},
 gather(){assignGather('tree');},
 resource(){nodes=[{type:'tree',x:800,y:400,radius:18,amount:600,renew:0}];selected=this.workers().slice(0,1);selected[0].x=700;selected[0].y=400;},
 mode(){return mode;}
};`;
before(async()=>{server=http.createServer((q,r)=>{r.setHeader('Content-Type','text/html');r.end(fs.readFileSync('index.html','utf8').replace('window.scHoverBuildings=buildings;function frame',adapter+'window.scHoverBuildings=buildings;function frame'));});await new Promise(r=>server.listen(0,'127.0.0.1',r));url='http://127.0.0.1:'+server.address().port;browser=await launchBrowser();});
after(async()=>{await browser?.close();server?.close();});
async function game(t){const {page:p}=await browserPage(t,browser,{viewport:{width:1366,height:768}});p.setDefaultTimeout(7000);await p.goto(url);await p.locator('#sc1310Skip').click();await p.locator('#sc154Pause').click();return p;}
test('Finished city builders travel to the next project, then become idle',async t=>{
 const p=await game(t);await p.evaluate(()=>__flow.setup());const [a,b,c]=await p.evaluate(()=>__flow.sites());
 await p.evaluate(id=>__flow.assign(id),a);await p.evaluate(id=>__flow.finish(id),a);
 let state=await p.evaluate(()=>scConstruction.snapshot());assert.equal(state.sites.find(s=>s.id===b).assigned,3);assert.equal(state.sites.find(s=>s.id===b).progress,0,'Travel precedes work');
 const saved=await p.evaluate(()=>scCitySave.capture());assert.equal((await p.evaluate(s=>scCitySave.restore(s),saved)).ok,true);assert.deepEqual((await p.evaluate(()=>scCitySave.capture())).state,saved.state);
 await p.evaluate(id=>__flow.finish(id),b);assert.equal((await p.evaluate(()=>scConstruction.snapshot())).sites.find(s=>s.id===c).assigned,3);
 await p.evaluate(id=>__flow.finish(id),c);assert.ok((await p.evaluate(()=>scCitySave.capture())).state.units.filter(u=>u.type==='worker').every(u=>u.order===null));
});
test('Automatic builders respect capacity, manual orders, release and cancellation',async t=>{
 const p=await game(t);await p.evaluate(()=>__flow.setup());const [a,b,c]=await p.evaluate(()=>__flow.sites());
 await p.evaluate(({a,b})=>__flow.capacity(a,b), {a,b});
 await p.evaluate(id=>__flow.finish(id),a);const snap=await p.evaluate(()=>scConstruction.snapshot());assert.equal(snap.sites.find(s=>s.id===b).assigned,4);assert.equal(snap.sites.find(s=>s.id===c).assigned,3);
 await p.evaluate(id=>scConstruction.release(id),c);await p.evaluate(()=>__flow.advance(2));assert.equal((await p.evaluate(()=>scConstruction.snapshot())).sites.find(s=>s.id===c).assigned,0);
 await p.evaluate(id=>scConstruction.cancel(id),b);assert.ok((await p.evaluate(()=>scCitySave.capture())).state.units.filter(u=>u.type==='worker').every(u=>u.order===null));
});
test('Gameplay surface prevents the browser context menu including empty overlay areas',async t=>{
 const p=await game(t);const prevented=await p.evaluate(()=>['field','scHudNotices','sc140Bar','scFloatingMinimap'].map(id=>{const e=new MouseEvent('contextmenu',{bubbles:true,cancelable:true,button:2});document.getElementById(id).dispatchEvent(e);return e.defaultPrevented;}));assert.deepEqual(prevented,[true,true,true,true]);
});
test('Selecting a building or pressing Escape clears stale Theater placement feedback',async t=>{
 const p=await game(t);await p.evaluate(()=>{const s=JSON.parse(JSON.stringify(scCitySave.capture()));s.state.resources.wood=1000;s.state.resources.gold=1000;s.state.resources.stone=1000;scCitySave.restore(s);});
 const theater=p.locator('#quickDock [data-action="theater"]');await theater.evaluate(e=>e.click());await p.waitForFunction(()=>document.getElementById('sc1345TheaterCard').classList.contains('visible'));
 const id=await p.evaluate(()=>__flow.house());await p.evaluate(id=>scCityEconomy.inspect(id),id);
 await p.waitForFunction(()=>!document.getElementById('sc1345TheaterCard').classList.contains('visible'));assert.equal(await p.evaluate(()=>__flow.mode()),null);
 await theater.evaluate(e=>e.click());await p.waitForTimeout(50);await p.keyboard.press('Escape');assert.equal(await p.locator('#sc1345TheaterCard').isVisible(),false);
});
test('Worksites and inspector replace one another without a duplicate map box',async t=>{
 const p=await game(t);const id=await p.evaluate(()=>__flow.house());await p.evaluate(id=>scCityEconomy.inspect(id),id);await p.locator('#scCityInspection').waitFor({state:'visible'});
 assert.deepEqual(await p.evaluate(()=>__flow.duplicateText()),[],'Building details belong in one inspector');
 await p.evaluate(()=>scConstructionUI.open());await p.locator('#scConstructionPanel').waitFor({state:'visible'});await p.locator('#scCityInspection').waitFor({state:'hidden'});
 await p.evaluate(id=>scCityEconomy.inspect(id),id);await p.locator('#scConstructionPanel').waitFor({state:'hidden'});await p.locator('#scCityInspection').waitFor({state:'visible'});
});
test('Chronicle offers attributed literature and a skippable scene that preserves the city',async t=>{
 const p=await game(t);await p.locator('#sc190ChronicleBtn').click();const literature=p.locator('#sc22Literature');await literature.waitFor({state:'visible'});
 await literature.locator('summary').click();assert.match(await literature.innerText(),/Shakespeare/);assert.match(await literature.innerText(),/Sonnet 18/);assert.match(await literature.innerText(),/Original settlement saying/);
 const before=await p.evaluate(()=>({state:scCitySave.capture().state,paused:scCitySave.status().paused,view:scCitySave.capture().view}));
 await p.locator('#sc22SceneOpen').click();await p.locator('#sc22Vignette').waitFor({state:'visible'});assert.equal(await p.evaluate(()=>scCampaign.status().overview),true);
 await p.keyboard.press('F3');assert.equal(await p.evaluate(()=>scCitySave.status().paused),before.paused,'Game hotkeys must not change the city under the scene');
 await p.waitForTimeout(300);assert.deepEqual(await p.evaluate(()=>scCitySave.capture().state),before.state);
 await p.keyboard.press('Escape');await p.locator('#sc22Vignette').waitFor({state:'hidden'});assert.equal(await p.evaluate(()=>scCampaign.status().overview),false);assert.equal(await p.evaluate(()=>scCitySave.status().paused),before.paused);assert.deepEqual(await p.evaluate(()=>scCitySave.capture().view),before.view);
});
test('Scene restores running state, respects reduced motion and cleans up on city changes',async t=>{
 const p=await game(t);await p.emulateMedia({reducedMotion:'reduce'});assert.equal(await p.evaluate(()=>typeof scVignette),'object');
 await p.locator('#sc154Pause').click();assert.equal(await p.evaluate(()=>scVignette.open()),true);assert.equal(await p.evaluate(()=>scVignette.open()),false);
 assert.equal(await p.locator('#sc22Vignette').getAttribute('data-motion'),'still');await p.locator('#sc22SceneSkip').click();assert.equal(await p.evaluate(()=>scCitySave.status().paused),false);
 await p.locator('#sc154Pause').click();const save=await p.evaluate(()=>scCitySave.capture());await p.evaluate(()=>scVignette.open());assert.equal((await p.evaluate(s=>scCitySave.restore(s),save)).ok,true);assert.equal(await p.locator('#sc22Vignette').isVisible(),false);assert.deepEqual(await p.evaluate(()=>scCitySave.capture().state),save.state);
 await p.evaluate(()=>scVignette.open());await p.evaluate(()=>scCampaign.start('city','brookstead'));assert.equal(await p.locator('#sc22Vignette').isVisible(),false);assert.equal(await p.evaluate(()=>scCampaign.status().overview),false);
});
test('Construction completion cue respects effects settings and coalesces simultaneous completions',async t=>{
 const p=await game(t);await p.evaluate(()=>scAudio.configure({music:false,effects:true,muted:false,volume:30}));await p.mouse.click(800,400);await p.waitForFunction(()=>scAudio.status().contextState==='running');
 await p.evaluate(()=>__flow.setup());let ids=await p.evaluate(()=>__flow.sites());await p.evaluate(id=>__flow.assign(id),ids[0]);
 const before=await p.evaluate(()=>scAudio.status().effectsPlayed);await p.evaluate(ids=>{__flow.finish(ids[0]);__flow.finish(ids[1]);},ids);assert.equal(await p.evaluate(()=>scAudio.status().lastEffect),'complete');assert.equal(await p.evaluate(()=>scAudio.status().effectsPlayed),before+1);
 await p.evaluate(()=>scAudio.configure({muted:true}));await p.evaluate(id=>__flow.finish(id),ids[2]);assert.equal(await p.evaluate(()=>scAudio.status().effectsPlayed),before+1);
});
test('A slightly missed resource click still gives the selected worker a gathering order',async t=>{
 const p=await game(t);await p.evaluate(()=>{__flow.setup();});
 await p.evaluate(()=>__flow.resource());const at=await p.evaluate(()=>{const c=document.getElementById('field'),v=c.parentElement;v.scrollLeft=600;v.scrollTop=200;const r=c.getBoundingClientRect();return {x:r.x+836*r.width/c.width,y:r.y+400*r.height/c.height};});
 await p.mouse.click(at.x,at.y,{button:'right'});assert.equal(await p.evaluate(()=>scRTSUnits.find(u=>u.type==='worker').order?.type),'gather');
});
test('A manual gathering order survives completion of the workers previous construction job',async t=>{
 const p=await game(t);await p.evaluate(()=>__flow.setup());const [first,next]=await p.evaluate(()=>__flow.sites());await p.evaluate(id=>__flow.assign(id),first);await p.evaluate(()=>__flow.resource());
 const at=await p.evaluate(()=>{const c=document.getElementById('field'),v=c.parentElement;v.scrollLeft=600;v.scrollTop=200;const r=c.getBoundingClientRect();return {x:r.x+800*r.width/c.width,y:r.y+400*r.height/c.height};});
 await p.mouse.click(at.x,at.y,{button:'right'});await p.evaluate(id=>__flow.finish(id),first);
 assert.equal(await p.evaluate(()=>scRTSUnits.find(u=>u.type==='worker').order?.type),'gather');assert.equal((await p.evaluate(()=>scConstruction.snapshot())).sites.find(s=>s.id===next).assigned,2);
});
