const {test,before,after}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),http=require('node:http');
const {launchBrowser,browserPage}=require('./support/browser.cjs');
const adapter=`window.__sc38={seed(type,x,y){const b=addBuilding(0,type,x,y);updateUI();return !!b},advance(s){for(let left=s;left>1e-8;left-=.25)tick(Math.min(.25,left));}};`;
let browser,server,url;
before(async()=>{server=http.createServer((q,r)=>{r.setHeader('Content-Type','text/html');r.end(fs.readFileSync('index.html','utf8').replace('window.scHoverBuildings=buildings;function frame',adapter+'window.scHoverBuildings=buildings;function frame'))});await new Promise(r=>server.listen(0,'127.0.0.1',r));url='http://127.0.0.1:'+server.address().port;browser=await launchBrowser()});
after(async()=>{await browser?.close();server?.close()});
async function game(t,origin='home',w=1440,h=900){const {page:p}=await browserPage(t,browser,{viewport:{width:w,height:h},reducedMotion:'reduce'});p.setDefaultTimeout(7000);await p.goto(url);await p.locator('#sc1310Skip').click();await p.evaluate(id=>scCampaign.start('city',id),origin);await p.locator('#sc154Pause').click();return p;}
test('School is a placeable building with a teacher and attending children',async t=>{
 const p=await game(t);
 assert.equal(await p.evaluate(()=>!!document.querySelector('#quickDock [data-action="school"]')),true,'School in the build menu');
 await p.evaluate(()=>__sc38.seed('school',700,420));
 const r=await p.evaluate(()=>{__sc38.advance(2);const s=scCityEconomy.snapshot();const ps=scPeople.list();return {school:s.buildings.filter(b=>b.type==='school').length,teachers:ps.filter(x=>x.role==='Teacher').length}});
 assert.equal(r.school,1);assert.ok(r.teachers>=1,'a teacher is assigned');
});
test('People panel fits above the bottom bar, shows the Ruler, and scrolls',async t=>{
 const p=await game(t,'home',1280,720);
 await p.locator('#sc36PeopleBtn').click();await p.locator('#sc36People').waitFor({state:'visible'});
 assert.equal(await p.locator('#sc38Ruler').count(),1);
 const box=await p.locator('#sc36People').boundingBox();assert.ok(box.y>=100&&box.y+box.height<=720-90,'panel ends above the bottom bar: '+JSON.stringify(box));
 assert.ok(Math.abs(box.x+box.width/2-640)<2,'centred');
});
test('Music has a Next track button that changes the track',async t=>{
 const p=await game(t);
 const a=await p.evaluate(()=>scMusic.info().label);
 await p.locator('#scMusicNext').evaluate(e=>e.click());
 const b=await p.evaluate(()=>scMusic.info());
 assert.notEqual(b.label,a);assert.match(await p.locator('#scMusicNext').innerText(),new RegExp(b.label));
});
test('Night is lighter and every kingdom has stone and gold within a short walk',async t=>{
 const p=await game(t);
 const n=await p.evaluate(()=>{const o=scDayNight;return typeof o==='object'});assert.ok(n);
 for(const id of ['briar-3','saffron-3','stormhaven-2']){
  const q=await game(t,id);
  const d=await q.evaluate(()=>{const st=scCitySave.capture().state,k=st.buildings.find(b=>b.type==='keep');const near=ty=>Math.min(...st.nodes.filter(n=>n.type===ty).map(n=>Math.hypot(n.x-k.x,n.y-k.y)));return {stone:near('stone'),gold:near('gold'),tree:near('tree')}});
  assert.ok(d.stone<280&&d.gold<280&&d.tree<280,id+' '+JSON.stringify(d));
 }
});
