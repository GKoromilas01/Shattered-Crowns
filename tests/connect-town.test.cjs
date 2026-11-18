const {test,before,after}=require('node:test');
const assert=require('node:assert/strict'),fs=require('node:fs'),http=require('node:http');
const {launchBrowser,browserPage}=require('./support/browser.cjs');
let browser,server,url;
const adapter=`window.__ct={keep(){return buildings.find(b=>b.team===0&&b.type==='keep')},add(t,x,y){return addBuilding(0,t,x,y)},stone(v){if(v!==undefined)stone=v;return stone},roads(){return buildings.filter(b=>b.type==='road'&&b.team===0).length},inspect(b){inspectedBuilding=b},u(){return units.find(u=>u.team===0&&u.type==='worker')},clear(h){for(const o of buildings)if(o!==h&&Math.hypot(o.x-h.x,o.y-h.y)<200)o.hp=0},step(u,p,n){for(let i=0;i<n;i++)move(u,p,.05)}};`;
before(async()=>{server=http.createServer((q,r)=>{r.setHeader('Content-Type','text/html');r.end(fs.readFileSync('index.html','utf8').replace('window.scHoverBuildings=buildings;function frame',adapter+'window.scHoverBuildings=buildings;function frame'));});await new Promise(r=>server.listen(0,'127.0.0.1',r));url='http://127.0.0.1:'+server.address().port;browser=await launchBrowser();});
after(async()=>{await browser?.close();server?.close();});
async function game(t){const {page:p}=await browserPage(t,browser,{viewport:{width:1440,height:900}});p.setDefaultTimeout(6500);await p.goto(url);await p.locator('#sc1310Skip').click();await p.locator('#sc154Pause').click();return p;}
test('Connect to town lays a path costing 12 stone per tile and refuses without stone',async t=>{
 const p=await game(t);
 const r=await p.evaluate(()=>{const k=__ct.keep();const h=__ct.add('house',k.x+330,k.y);const plan=scConnectPlan(h.id);__ct.stone(0);const poor=scConnectToTown(h.id);__ct.stone(500);const before=__ct.roads(),s0=__ct.stone();const ok=scConnectToTown(h.id);return {plan,poor,ok,roads:__ct.roads()-before,spent:s0-__ct.stone(),again:scConnectToTown(h.id)}});
 assert.ok(r.plan.count>=3);assert.equal(r.plan.cost,r.plan.count*12);
 assert.equal(r.poor.ok,false);assert.equal(r.ok.ok,true);assert.equal(r.roads,r.ok.placed);assert.equal(r.spent,r.ok.placed*12);assert.equal(r.again.placed,0);
});
test('Units steer around a building instead of walking through it',async t=>{
 const p=await game(t);
 const r=await p.evaluate(()=>{const k=__ct.keep();const u=__ct.u();const h=__ct.add('house',k.x,k.y);h.x=800;h.y=700;__ct.clear(h);u.x=h.x-120;u.y=h.y;u.speed=60;const goal={x:h.x+120,y:h.y};let min=1e9;for(let i=0;i<400;i++){__ct.step(u,goal,1);min=Math.min(min,Math.hypot(u.x-h.x,u.y-h.y))}return {min,radius:h.radius,end:Math.hypot(u.x-goal.x,u.y-goal.y)}});
 assert.ok(r.min>=r.radius,'walked inside: '+JSON.stringify(r));assert.ok(r.end<5,'did not arrive: '+JSON.stringify(r));
});
test('Roads can be placed right beside buildings and the Guide panel is visible with both modes',async t=>{
 const p=await game(t);
 const r=await p.evaluate(()=>{const k=__ct.keep();const ok=scCanPlace('road',{x:k.x+k.radius+18,y:k.y+4},null);return {ok,stone:__ct.stone()}});
 assert.equal(r.ok,true,'road beside keep is blocked');
 await p.locator('#sc1310Skip').click().catch(()=>{});
 assert.equal(await p.locator('#scGuide').isVisible(),true);
 assert.equal(await p.locator('#scGuideMode option').count(),2);
 await p.selectOption('#scGuideMode','tester');
 assert.match(await p.locator('#scGuideText').textContent(),/Start screen|World map|Connect to town|People/);
});
test('Connect to town draws an unbroken path from the building edge to the keep edge',async t=>{
 const p=await game(t);
 const r=await p.evaluate(()=>{const k=__ct.keep();const h=__ct.add('house',k.x+60,k.y-240);__ct.clear(h);__ct.stone(500);const res=scConnectToTown(h.id);const rs=window.scHoverBuildings.filter(b=>b.type==='road'&&b.team===0).sort((a,b)=>a.y-b.y);let maxGap=0;for(let i=1;i<rs.length;i++)maxGap=Math.max(maxGap,Math.hypot(rs[i].x-rs[i-1].x,rs[i].y-rs[i-1].y));return {res,nearHouse:Math.hypot(rs[0].x-h.x,rs[0].y-h.y)-h.radius,nearKeep:Math.hypot(rs[rs.length-1].x-k.x,rs[rs.length-1].y-k.y)-k.radius,maxGap}});
 assert.equal(r.res.ok,true);assert.ok(r.nearHouse<=14,'gap at house '+r.nearHouse);assert.ok(r.nearKeep<=14,'gap at keep '+r.nearKeep);assert.ok(r.maxGap<=46,'gap '+r.maxGap);
});
test('Guide panel sits top right and unit buttons carry the emblem icons',async t=>{
 const p=await game(t);await p.locator('#sc1310Skip').click().catch(()=>{});await p.waitForTimeout(900);
 const r=await p.evaluate(()=>{const g=document.getElementById('scGuide').getBoundingClientRect();return {right:innerWidth-g.right,top:g.top,icons:[...document.querySelectorAll('#sc140Commands button[data-sc31]')].map(b=>b.dataset.sc31)}});
 assert.ok(r.right<20&&r.top<120);assert.deepEqual(r.icons.sort(),['archer','soldier','worker']);
});
