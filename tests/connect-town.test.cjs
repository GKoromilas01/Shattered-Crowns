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
