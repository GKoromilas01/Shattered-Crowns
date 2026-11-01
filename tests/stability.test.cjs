const {test,before,after}=require('node:test');
const assert=require('node:assert/strict');
const {chromium}=require('playwright');
const http=require('node:http');
const fs=require('node:fs');
let browser,server,url;
before(async()=>{
 server=http.createServer((req,res)=>{res.setHeader('Content-Type','text/html');res.end(fs.readFileSync('index.html'));});
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));url=`http://127.0.0.1:${server.address().port}`;
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||(fs.existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined),args:['--no-sandbox']});
});
after(async()=>{await browser?.close();server?.close()});
async function game(t,{wealth=false,width=1440,height=900}={}){
 const context=await browser.newContext({viewport:{width,height}});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 t.after(async()=>{if(t.signal.aborted||t.error){fs.mkdirSync('test-results',{recursive:true});await page.screenshot({path:`test-results/${t.name.replace(/\W/g,'_')}.png`}).catch(()=>{})}await context.close();assert.deepEqual(errors,[],'Game must not raise uncaught JavaScript errors')});
 // Test-only starting stores: use the real engine, costs, pointer events and placement validation.
 if(wealth)await page.route('**/*',route=>route.fulfill({contentType:'text/html',body:fs.readFileSync('index.html','utf8').replace('gold=240;wood=100;stone=30;','gold=2400;wood=2000;stone=2000;')}));
 page.setDefaultTimeout(5000);await page.goto(url);await page.waitForFunction(()=>window.sc140UI&&window.scHoverBuildings?.length);
 await page.locator('#sc1310Skip').click();await page.mouse.move(700,400);return {page,errors};
}
const commands=p=>p.locator('#sc140Commands');
async function choose(p,name){await p.locator('#sc140Build').click();await commands(p).getByRole('button',{name,exact:false}).first().click()}
async function position(p,x,y){return p.evaluate(({x,y})=>{const c=document.querySelector('#field'),v=c.parentElement;v.scrollLeft=x*c.getBoundingClientRect().width/c.width-v.clientWidth/2;v.scrollTop=y*c.getBoundingClientRect().height/c.height-v.clientHeight/2;const r=c.getBoundingClientRect();return{x:r.left+x*r.width/c.width,y:r.top+y*r.height/c.height}},{x,y})}
async function point(p,x,y){return p.evaluate(({x,y})=>{const c=document.querySelector('#field'),r=c.getBoundingClientRect();return{x:r.left+x*r.width/c.width,y:r.top+y*r.height/c.height}},{x,y})}
const roads=p=>p.evaluate(()=>window.scHoverBuildings.filter(b=>b.team===0&&b.type==='road').map(b=>({x:b.x,y:b.y})));
test('Construction → Units → Construction repeatedly preserves camera and recruitment',async t=>{
 const {page:p}=await game(t);const start=await p.evaluate(()=>window.sc148Camera.state());
 for(let i=0;i<4;i++){await p.locator('#sc140Build').click();assert.match(await commands(p).innerText(),/House/);assert.doesNotMatch(await p.locator('#sc149SelectionHint').innerText(),/Recruit/);await p.locator('#sc140Keep span').click();await p.waitForTimeout(120);assert.match(await commands(p).innerText(),/Worker/);assert.doesNotMatch(await commands(p).innerText(),/House/)}
 assert.deepEqual(await p.evaluate(()=>window.sc148Camera.state()),start);
 await p.locator('#sc140Build').click();assert.match(await commands(p).innerText(),/House/);
});
test('atlas renders kingdoms and settlements; supply has no JavaScript errors before and after tick',async t=>{
 const {page:p,errors}=await game(t);await p.locator('#sc146MenuButton').click();await p.locator('#sc146Menu').getByRole('button',{name:'Maps',exact:false}).click();
 await p.locator('#history1200Region').selectOption('tharwen');assert.match(await p.locator('#history1200Details').innerText(),/Tharwen/);assert.match(await p.locator('#scAtlasArms').innerText(),/Tharwen/);
 await p.locator('#history1200Region').selectOption('realm017');assert.ok((await p.locator('#history1200Details').innerText()).length>50);
 await p.waitForTimeout(6000);assert.match(await p.locator('#sc1411Logistics').innerText(),/Supply 0\/0/);assert.deepEqual(errors,[]);
});
test('House placement spends resources, rejects occupied ground, and undo refunds',async t=>{
 const {page:p}=await game(t);await p.locator('#sc154Pause').click();const before=await p.locator('#resWood').innerText();
 await choose(p,'House');const at=await position(p,600,180);await p.mouse.click(at.x,at.y);
 await p.waitForFunction(()=>window.scHoverBuildings.some(b=>b.team===0&&b.type==='house'));
 assert.equal(Number(await p.locator('#resWood').innerText()),Number(before)-60);
 await choose(p,'House');await p.mouse.click(at.x,at.y);assert.equal(await p.evaluate(()=>window.scHoverBuildings.filter(b=>b.type==='house'&&b.team===0).length),1);
 await p.locator('#sc1369Undo').click();assert.equal(await p.evaluate(()=>window.scHoverBuildings.filter(b=>b.type==='house'&&b.team===0).length),0);assert.equal(await p.locator('#resWood').innerText(),before);
});
for(const size of [3,6,9])test(`Road drag preserves ${size}×${size} perimeter, costs, and undo`,async t=>{
 const {page:p}=await game(t,{wealth:true});await p.locator('#sc154Pause').click();await choose(p,'Road');
 const a=await position(p,1100,75),b=await point(p,1100+size*44-10,75+size*44-10);const stone=Number(await p.locator('#resStone').innerText());
 await p.mouse.move(a.x,a.y);await p.mouse.down();await p.mouse.move(b.x,b.y,{steps:15});await p.mouse.up();
 const rs=await roads(p);assert.equal(rs.length,size*4);assert.equal(Math.round(Math.max(...rs.map(r=>r.x))-Math.min(...rs.map(r=>r.x))),size*44);assert.equal(Math.round(Math.max(...rs.map(r=>r.y))-Math.min(...rs.map(r=>r.y))),size*44);
 assert.equal(Number(await p.locator('#resStone').innerText()),stone-size*4*12);await p.locator('#sc1369Undo').click();assert.equal((await roads(p)).length,0);assert.equal(Number(await p.locator('#resStone').innerText()),stone);
});
test('Road rectangle with insufficient stone is atomic',async t=>{const {page:p}=await game(t);await p.locator('#sc154Pause').click();await choose(p,'Road');const a=await position(p,1100,75),b=await point(p,1222,197);await p.mouse.move(a.x,a.y);await p.mouse.down();await p.mouse.move(b.x,b.y,{steps:10});await p.mouse.up();assert.equal((await roads(p)).length,0);assert.equal(Number(await p.locator('#resStone').innerText()),30)});
test('Advisor checklist persists checks across close and reload',async t=>{const {page:p}=await game(t);await p.locator('#sc1310AdvisorBtn').click();const boxes=p.locator('#sc1392Tests input');assert.equal(await boxes.count(),2);await boxes.first().check();assert.match(await p.locator('.sc1392Status').innerText(),/1 \/ 2/);await p.locator('#sc1310AdvisorClose').click();await p.locator('#sc1310AdvisorBtn').click();assert.equal(await boxes.first().isChecked(),true);await p.reload();await p.locator('#sc1310AdvisorBtn').click();assert.equal(await boxes.first().isChecked(),true);await boxes.nth(1).check();assert.match(await p.locator('.sc1392Status').innerText(),/2 \/ 2/)});
test('camera arrows, wheel, right drag and real fullscreen work',async t=>{const {page:p}=await game(t);await position(p,600,350);const state=()=>p.evaluate(()=>window.sc148Camera.state());const a=await state();await p.keyboard.down('ArrowRight');await p.waitForTimeout(300);await p.keyboard.up('ArrowRight');assert.ok((await state()).x>a.x);await p.mouse.move(750,400);const b=await state();await p.mouse.wheel(0,120);await p.waitForTimeout(200);assert.ok((await state()).y>b.y);await p.mouse.down({button:'right'});await p.mouse.move(680,340,{steps:10});await p.mouse.up({button:'right'});assert.ok((await state()).x>b.x);await p.locator('#sc146MenuButton').click();await p.locator('#scFullscreen').click();await p.waitForFunction(()=>!!document.fullscreenElement);await p.locator('#sc146MenuButton').click();await p.locator('#scFullscreen').click();await p.waitForFunction(()=>!document.fullscreenElement);});
for(const width of [1440,1024,768])test(`UI controls do not overlap at ${width}px`,async t=>{const {page:p}=await game(t,{width});await p.locator('#sc140Build').click();for(const b of await commands(p).locator('button:enabled').all()){await b.scrollIntoViewIfNeeded();await b.click({trial:true})}const issues=await p.locator('button:visible').evaluateAll(bs=>bs.filter(b=>!b.disabled&&!b.closest('#sc140Commands')).flatMap(b=>{const r=b.getBoundingClientRect();if(r.right<=0||r.left>=innerWidth||r.bottom<=0||r.top>=innerHeight)return[];const x=Math.max(0,Math.min(innerWidth-1,(Math.max(0,r.left)+Math.min(innerWidth,r.right))/2)),y=Math.max(0,Math.min(innerHeight-1,(Math.max(0,r.top)+Math.min(innerHeight,r.bottom))/2));const hit=document.elementFromPoint(x,y);return b.contains(hit)?[]:[{id:b.id,text:b.textContent,coveredBy:hit?.id}]}));assert.deepEqual(issues,[])});

test('switching cancels armed placement and rapid switching has no delayed override',async t=>{
 const {page:p}=await game(t);await p.locator('#sc154Pause').click();await choose(p,'House');await p.locator('#sc140Keep').click();const at=await position(p,600,180);await p.mouse.click(at.x,at.y);assert.equal(await p.evaluate(()=>window.scHoverBuildings.filter(b=>b.team===0&&b.type==='house').length),0);
 await p.evaluate(()=>{document.querySelector('#sc140Build').click();document.querySelector('#sc140Keep').click();document.querySelector('#sc140Build').click()});await p.waitForTimeout(150);assert.match(await commands(p).innerText(),/House/);assert.equal(await p.locator('#sc140Build').getAttribute('aria-pressed'),'true');await p.keyboard.press('Escape');assert.match(await commands(p).innerText(),/Worker/);
});
test('straight road extension joins at 44 units and undo refunds only the extension',async t=>{
 const {page:p}=await game(t,{wealth:true});await p.locator('#sc154Pause').click();await choose(p,'Road');let a=await position(p,1100,100),b=await point(p,1188,100);await p.mouse.move(a.x,a.y);await p.mouse.down();await p.mouse.move(b.x,b.y,{steps:8});await p.mouse.up();assert.equal((await roads(p)).length,3);const stone=Number(await p.locator('#resStone').innerText());a=await point(p,1188,100);b=await point(p,1276,100);await p.mouse.move(a.x,a.y);await p.mouse.down();await p.mouse.move(b.x,b.y,{steps:8});await p.mouse.up();assert.equal((await roads(p)).length,5);assert.equal(Number(await p.locator('#resStone').innerText()),stone-24);await p.locator('#sc1369Undo').click();assert.equal((await roads(p)).length,3);assert.equal(Number(await p.locator('#resStone').innerText()),stone);
});
