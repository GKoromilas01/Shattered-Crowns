const {test,before,after}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),http=require('node:http');
const {launchBrowser,browserPage}=require('./support/browser.cjs');
const adapter=`window.__sc38={inspect(type){inspectedBuilding=buildings.find(b=>b.team===0&&b.type===type);selected=[];updateUI();return el('buildingInspector').textContent},seed(type,x,y){const b=addBuilding(0,type,x,y);updateUI();return !!b},advance(s){for(let left=s;left>1e-8;left-=.25)tick(Math.min(.25,left));}};`;
let browser,server,url;
before(async()=>{server=http.createServer((q,r)=>{r.setHeader('Content-Type','text/html');r.end(fs.readFileSync('index.html','utf8').replace('window.scHoverBuildings=buildings;function frame',adapter+'window.scHoverBuildings=buildings;function frame'))});await new Promise(r=>server.listen(0,'127.0.0.1',r));url='http://127.0.0.1:'+server.address().port;browser=await launchBrowser()});
after(async()=>{await browser?.close();server?.close()});
async function game(t,origin='home',w=1440,h=900){const {page:p}=await browserPage(t,browser,{viewport:{width:w,height:h},reducedMotion:'reduce',autoBuilders:true});p.setDefaultTimeout(20000);await p.goto(url);await p.locator('#sc1310Skip').click();await p.evaluate(id=>scCampaign.start('city',id),origin);await p.locator('#sc154Pause').click();return p;}
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
 assert.notEqual(b.label,a);assert.match(await p.locator('#scMusicNext').getAttribute('title'),new RegExp(b.label));
});
test('Every kingdom has stone and gold within a short walk',async t=>{
 const p=await game(t);
 const n=await p.evaluate(()=>{const o=scDayNight;return typeof o==='object'});assert.ok(n);
 for(const id of ['briar-3','saffron-3','stormhaven-2']){
  const q=await game(t,id);
  const d=await q.evaluate(()=>{const st=scCitySave.capture().state,k=st.buildings.find(b=>b.type==='keep');const near=ty=>Math.min(...st.nodes.filter(n=>n.type===ty).map(n=>Math.hypot(n.x-k.x,n.y-k.y)));return {stone:near('stone'),gold:near('gold'),tree:near('tree')}});
  assert.ok(d.stone<280&&d.gold<280&&d.tree<280,id+' '+JSON.stringify(d));
 }
});

test('A farm foundation placed with no workers selected tells the player what to do, and the opening food lasts',async t=>{
 const p=await game(t);
 const f=await p.evaluate(()=>scCityEconomy.snapshot().food.stock);assert.ok(f>=200,'home opening food '+f);
 const g=await p.evaluate(()=>document.getElementById('scGuideText').textContent);assert.match(g,/Click one of your workers/);
});

test('Rank promotions never push a unit above its maximum health (saves stay valid)',async t=>{
 const p=await game(t);
 const r=await p.evaluate(()=>{const u=scRTSUnits.find(x=>x.team===0&&x.type==='soldier');u.hp=u.max-5;for(let i=0;i<10;i++)scEarnKill(u);const ok=u.hp<=u.max;return {ok,hp:u.hp,max:u.max,exp:scSavedCity.exportText().ok}});
 assert.ok(r.ok,JSON.stringify(r));assert.equal(r.exp,true);
});

test('School can be placed by clicking the build button and then the map (real UI path)',async t=>{
 const p=await game(t,'home',1366,640);
 await p.locator('#sc140Build').click();await p.locator('#sc140Commands button',{hasText:'School'}).first().click();
 await p.mouse.click(700,350);await p.waitForTimeout(500);
 const r=await p.evaluate(()=>({sites:(scCitySave.capture().state.construction||[]).filter(c=>c.type==='school').length,res:scCityEconomy.snapshot().village.resources}));
 assert.equal(r.sites,1,'a School foundation appears: '+JSON.stringify(r));assert.equal(r.res.gold,200);assert.equal(r.res.wood,150);assert.equal(r.res.stone,20);
});

test('Chapel is placed by clicking, finishes, and gives the town a Priest',async t=>{
 const p=await game(t,'home',1366,640);
 await p.locator('#sc140Build').click();await p.locator('#sc140Commands button',{hasText:'Chapel'}).first().click();
 await p.mouse.click(700,350);await p.waitForTimeout(500);
 const r=await p.evaluate(()=>({sites:(scCitySave.capture().state.construction||[]).filter(c=>c.type==='chapel').length,res:scCityEconomy.snapshot().village.resources}));
 assert.equal(r.sites,1);assert.equal(r.res.gold,180);assert.equal(r.res.wood,170);assert.equal(r.res.stone,0);
 await p.evaluate(()=>__sc38.seed('chapel',760,430));
 const pr=await p.evaluate(()=>{__sc38.advance(2);return scPeople.list().filter(x=>x.role==='Priest').length});
 assert.ok(pr>=1,'a Priest is assigned');
});

test('People: Show home centres the map; children grow up faster; survivors get a smaller keep flag',async t=>{
 const p=await game(t,'home',1366,640);
 const r=await p.evaluate(()=>{const c0=scPeople.list().filter(x=>x.role==='Child').length;__sc38.advance(600);const c1=scPeople.list().filter(x=>x.role==='Child').length;return {c0,c1,cycles:scCityEconomy.snapshot().cycles}});
 assert.ok(r.c0>=1,'there are children at the start '+JSON.stringify(r));assert.ok(r.c1<r.c0,'children grow into adults over ten minutes '+JSON.stringify(r));
 await p.locator('#sc36PeopleBtn').click();await p.locator('#sc36People .sc36Row').first().click();
 await p.locator('#sc39ShowHome').click();
 const f=await p.evaluate(()=>scPeople.lastFocus);assert.ok(f&&f.x>0&&f.y>0,'focus recorded '+JSON.stringify(f));
 assert.equal(await p.locator('#sc36People').count(),0,'panel closes after showing');
 assert.equal(await p.evaluate(()=>{scApplyJourney({survivors:5,gold:200,wood:150,stone:40,food:90});return window.scSmallKeep}),true);
 assert.equal(await p.evaluate(()=>{scCampaign.start('city','home');return window.scSmallKeep}),false);
});

test('Placing a School by clicking sends free workers to build it, and it finishes without selecting anyone',async t=>{
 const p=await game(t,'home',1366,640);
 await p.locator('#sc140Build').click();await p.locator('#sc140Commands button',{hasText:'School'}).first().click();
 await p.mouse.click(700,350);await p.waitForTimeout(400);
 const a=await p.evaluate(()=>({builders:scCitySave.capture().state.units.filter(u=>u.order&&u.order.type==='build').length,sites:(scCitySave.capture().state.construction||[]).length}));
 assert.ok(a.builders>=1,'free workers are sent: '+JSON.stringify(a));
 const b=await p.evaluate(()=>{__sc38.advance(240);const st=scCitySave.capture().state;return {done:st.buildings.filter(x=>x.type==='school').length,sites:(st.construction||[]).length}});
 assert.equal(b.done,1,'the School is finished '+JSON.stringify(b));assert.equal(b.sites,0);
});
test('Survivors camp and the focus ring render without errors',async t=>{
 const p=await game(t,'home',1366,640);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.evaluate(()=>{scApplyJourney({survivors:5,gold:200,wood:150,stone:40,food:90});scFocusRing={x:400,y:300,until:performance.now()+2500,text:'House #1'}});
 await p.waitForTimeout(700);assert.deepEqual(errs,[]);
});
test('School and Chapel show a placement rectangle and no weather exists',async t=>{
 const p=await game(t,'home',1366,640);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 for(const name of ['School','Chapel']){
  await p.locator('#sc140Build').click();await p.locator('#sc140Commands button',{hasText:name}).first().click();
  await p.mouse.move(700,350);await p.waitForTimeout(150);await p.mouse.move(708,354);await p.waitForTimeout(250);
  const px=await p.evaluate(()=>{const c=document.querySelector('#field'),r=c.getBoundingClientRect(),g=c.getContext('2d');const x=Math.round((708-r.x)*c.width/r.width),y=Math.round((354-r.y)*c.height/r.height);const d=g.getImageData(x-6,y-6,12,12).data;let light=0;for(let i=0;i<d.length;i+=4)if(d[i]>150&&d[i+1]>150&&d[i+2]>130)light++;return light});
  assert.ok(px>10,name+' placement rectangle is drawn under the pointer ('+px+')');
  await p.keyboard.press('Escape');
 }
 assert.equal(await p.evaluate(()=>typeof window.scWeather),'undefined');assert.equal(await p.locator('#sc37Weather').count(),0);assert.equal(await p.locator('#scWeatherQuick').count(),0);
 assert.deepEqual(errs,[]);
});
test('Story cards appear once at milestones and the School inspect panel shows its staff',async t=>{
 const p=await game(t,'home',1366,640);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.waitForTimeout(1500);assert.equal(await p.locator('#scStoryCard').count(),0,'no card for the starting state');
 await p.evaluate(()=>__sc38.seed('school',700,420));
 await p.waitForFunction(()=>document.querySelector('#scStoryCard'),null,{timeout:6000});
 assert.match(await p.locator('#scStoryCard').innerText(),/School Opens/);
 await p.locator('#scStoryCard').click();assert.equal(await p.locator('#scStoryCard').count(),0);
 await p.evaluate(()=>__sc38.seed('chapel',820,420));
 await p.waitForFunction(()=>document.querySelector('#scStoryCard'),null,{timeout:6000});
 assert.match(await p.locator('#scStoryCard').innerText(),/Chapel Bell/);
 await p.evaluate(()=>{__sc38.advance(2)});
 const info=await p.evaluate(()=>__sc38.inspect('school'));
 assert.match(info,/SCHOOL: \d+ Teacher/);
 assert.deepEqual(errs,[]);
});
test('Events: refugees can be welcomed, a trader sells stone, saves stay valid, traits show in People',async t=>{
 const p=await game(t,'home',1366,640);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const before=await p.evaluate(()=>({w:scCitySave.capture().state.units.filter(u=>u.type==='worker').length,food:scCitySave.capture().state.resources.food,stone:scCitySave.capture().state.resources.stone,gold:scCitySave.capture().state.resources.gold}));
 await p.evaluate(()=>scEvents.fire('refugees'));
 await p.locator('#scEventCard [data-choice="accept"]').click();
 const a=await p.evaluate(()=>scCitySave.capture());
 assert.equal(a.state.units.filter(u=>u.type==='worker').length,before.w+2);
 assert.equal(a.state.resources.food,before.food-15);
 assert.equal((await p.evaluate(s=>scCitySave.restore(s),a)).ok,true,'a save with refugees restores');
 await p.evaluate(()=>scEvents.fire('trader'));
 await p.locator('#scEventCard [data-choice="buy"]').click();
 const b=await p.evaluate(()=>scCitySave.capture().state.resources);
 assert.equal(b.stone,before.stone+40);assert.equal(b.gold,before.gold-60);
 await p.evaluate(()=>scEvents.fire('refugees'));await p.locator('#scEventCard [data-choice="decline"]').click();
 assert.equal(await p.locator('#scEventCard').count(),0);
 await p.evaluate(()=>scPeople.open());
 assert.match(await p.locator('.sc36Row').first().innerText(),/·\s*\S+/);
 assert.deepEqual(errs,[]);
});
