const {test,before,after}=require('node:test');const assert=require('node:assert/strict'),fs=require('node:fs'),http=require('node:http');
const {launchBrowser,browserPage}=require('./support/browser.cjs');let browser,server,url;
before(async()=>{server=http.createServer((q,r)=>{r.setHeader('Content-Type','text/html');r.end(fs.readFileSync('index.html'));});await new Promise(r=>server.listen(0,'127.0.0.1',r));url='http://127.0.0.1:'+server.address().port;browser=await launchBrowser();});after(async()=>{await browser?.close();server?.close()});
async function game(t,width=1440,enter=true){const {page:p}=await browserPage(t,browser,{viewport:{width,height:900},reducedMotion:'reduce'});p.setDefaultTimeout(6000);await p.goto(url);if(enter){await p.locator('#sc1310Skip').click();await p.locator('#sc154Pause').click();}return p;}
test('World identity catalogue contains exactly sixteen kingdoms and 128 distinct settlements',async t=>{
 const p=await game(t),a=await p.evaluate(()=>scWorldAtlas);assert.equal(a.continents.length,6);assert.equal(a.kingdoms.length,16);assert.equal(a.settlements.length,128);
 for(const list of [a.continents,a.kingdoms,a.settlements]){assert.equal(new Set(list.map(x=>x.id)).size,list.length);assert.equal(new Set(list.map(x=>x.name)).size,list.length);}
 assert.deepEqual(a.settlements.filter(x=>x.playable).map(x=>x.id).sort(),['brookstead','home']);
 const banners=new Set();for(const k of a.kingdoms){assert.ok(a.continents.some(c=>c.id===k.continentId));assert.equal(a.settlements.filter(s=>s.kingdomId===k.id).length,8);for(const key of ['motto','history','mythology','government','ruler','description'])assert.ok(k[key]?.length>12,k.id+' '+key);assert.equal(k.heroes.length,2);assert.ok(k.heroes.every(h=>h.name&&h.deed.length>20));for(const rel of k.relationships)assert.ok(a.kingdoms.some(x=>x.id===rel.kingdomId));banners.add(JSON.stringify(k.banner));}assert.equal(banners.size,16);
 for(const s of a.settlements){assert.notEqual(s.ruler,'You','Catalogue identity must be neutral across player origins');assert.ok(a.kingdoms.some(k=>k.id===s.kingdomId));assert.ok(s.history.length>30&&s.description.length>30&&s.location.length>12);}
 for(const id of ['home','ironmere','ashford','valewatch','brookstead'])assert.equal(a.settlements.find(s=>s.id===id).kingdomId,'marches');
 assert.equal(await p.evaluate(()=>{const frozen=x=>!x||typeof x!=='object'||Object.isFrozen(x)&&Object.values(x).every(frozen);return frozen(scWorldAtlas)}),true);
});
for(const width of [390,1440])test('Kingdom dossiers expose all settlements with original banners and read-only politics at '+width,async t=>{
 const p=await game(t,width);await p.evaluate(()=>scKingdomUI.openWorld());const before=await p.evaluate(()=>scCitySave.capture());await p.locator('#scAtlasIdentity').click();const a=await p.evaluate(()=>scWorldAtlas);let visited=0;
 for(const c of a.continents){await p.locator('#scAtlasWorldBtn').click();await p.locator('[data-continent="'+c.id+'"]').click();for(const k of a.kingdoms.filter(k=>k.continentId===c.id)){
  await p.locator('[data-identity="'+k.id+'"]').click();assert.equal(await p.locator('#scIdentityBanner svg').count(),1);assert.equal(await p.locator('#scIdentityBanner svg').isVisible(),true);assert.match(await p.locator('#scIdentityPolitics').innerText(),/Government|Ruler|Relationships/);assert.ok((await p.locator('#scIdentityLore').innerText()).includes(k.motto));
  for(const s of a.settlements.filter(s=>s.kingdomId===k.id)){await p.locator('[data-world-place="'+s.id+'"]').click();assert.ok((await p.locator('#scSettlementIdentity').innerText()).includes(s.name));assert.match(await p.locator('#scSettlementIdentity').innerText(),s.playable?/existing starting choices/i:/inspection only/i);visited++;}
  await p.locator('#scIdentityContinent').click();
 }}assert.equal(visited,128);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);const after=await p.evaluate(()=>scCitySave.capture());assert.deepEqual(after.state,before.state);assert.deepEqual(after.view,before.view);assert.deepEqual(after.campaign,before.campaign);assert.equal(after.cityId,before.cityId);
});
test('Identity browsing keeps keyboard focus and resumes the existing running city',async t=>{
 const p=await game(t);await p.locator('#sc154Pause').click();await p.evaluate(()=>scKingdomUI.openWorld());const before=await p.evaluate(()=>scCitySave.capture());
 await p.locator('#scAtlasIdentity').focus();await p.keyboard.press('Enter');const b=p.locator('[data-world-place="brookstead"]');await b.focus();await p.keyboard.press('Space');assert.match(await p.locator('#scSettlementIdentity').innerText(),/Brookstead/);await p.waitForTimeout(1150);assert.equal(await b.evaluate(e=>e===document.activeElement),true);await p.keyboard.press('q');await p.keyboard.press('w');assert.deepEqual((await p.evaluate(()=>scCitySave.capture())).state,before.state);
 await p.keyboard.press('Escape');assert.equal(await p.locator('#scKingdomPanel').isVisible(),false);assert.equal(await p.evaluate(()=>scCitySave.status().paused),false);await p.waitForTimeout(200);assert.ok((await p.evaluate(()=>scCitySave.capture())).state.clock.elapsed>before.state.clock.elapsed);
});
test('Title dossiers return only to existing choices and restore clears transient world selection',async t=>{
 const p=await game(t,390,false);await p.locator('#scStartChoose').click();await p.locator('#scStartExplore').click();const before=await p.evaluate(()=>scCitySave.capture());await p.locator('#scAtlasIdentity').click();await p.locator('[data-world-place="brookstead"]').click();await p.getByRole('button',{name:'Back to existing starting choices',exact:true}).click();assert.equal(await p.locator('#scStartLocation').isVisible(),true);assert.equal(await p.getByRole('radio').count(),2);assert.deepEqual((await p.evaluate(()=>scCitySave.capture())).state,before.state);
 await p.locator('#scStartGovern').click();await p.evaluate(()=>scKingdomUI.openWorld());await p.locator('[data-continent="emberreach"]').click();await p.locator('[data-identity="cinder-coast"]').click();const old=JSON.parse(fs.readFileSync('tests/fixtures/city-v0140.json'));assert.equal((await p.evaluate(s=>scCitySave.restore(s),old)).ok,true);assert.equal(await p.locator('#scKingdomPanel').isVisible(),false);await p.evaluate(()=>scKingdomUI.open());assert.equal(await p.locator('#scWorldIdentity').isVisible(),false);assert.deepEqual((await p.evaluate(()=>scCitySave.capture())).state,old.state);
});
test('Regional identity follows the Marches map after inspecting a foreign kingdom',async t=>{
 const p=await game(t,390);await p.evaluate(()=>scKingdomUI.openWorld());await p.locator('[data-continent="emberreach"]').click();await p.locator('[data-identity="caldris"]').click();await p.locator('#scAtlasRegionBtn').click();await p.locator('#scAtlasIdentity').click();assert.equal(await p.locator('#scWorldIdentity').getAttribute('data-kingdom'),'marches');
});
test('All six world continent controls remain separate and within the phone map',async t=>{
 const p=await game(t,390);await p.evaluate(()=>scKingdomUI.openWorld());const r=await p.locator('#scWorldTerrain').boundingBox(),boxes=await p.locator('#scWorldTerrain [data-continent]').evaluateAll(es=>es.map(e=>{const r=e.getBoundingClientRect();return {name:e.textContent,x:r.x,y:r.y,w:r.width,h:r.height}}));assert.equal(boxes.length,6);for(const b of boxes)assert.ok(b.x>=r.x&&b.y>=r.y&&b.x+b.w<=r.x+r.width+1&&b.y+b.h<=r.y+r.height+1,b.name+' stays within map');for(let i=0;i<boxes.length;i++)for(let j=i+1;j<boxes.length;j++){const a=boxes[i],b=boxes[j];assert.ok(a.x+a.w<=b.x||b.x+b.w<=a.x||a.y+a.h<=b.y||b.y+b.h<=a.y,a.name+' and '+b.name+' must not overlap');}
});
test('Kingdom banner and availability are visible in the playable atlas',async t=>{
 const p=await game(t);await p.evaluate(()=>scKingdomUI.openWorld());await p.locator('#scAtlasIdentity').click();assert.equal(await p.locator('#scIdentityBanner svg').isVisible(),true);assert.equal(await p.locator('.scIdentityHero h3').isVisible(),true);assert.match(await p.locator('.scIdentityHero').innerText(),/existing city starts/i);
});
test('Dossier steward identifies only the active home for both supported origins',async t=>{
 const p=await game(t);
 for(const origin of ['home','brookstead']){
  await p.evaluate(origin=>scCampaign.start('city',origin),origin);await p.locator('#sc154Pause').click();await p.evaluate(()=>scKingdomUI.openWorld());await p.locator('#scAtlasIdentity').click();
  for(const id of ['home','brookstead']){await p.locator('[data-world-place="'+id+'"]').click();const text=await p.locator('#scSettlementIdentity').innerText();assert.equal(/Local steward: You/.test(text),id===origin,'Only '+origin+' belongs to the current governor');}
  await p.keyboard.press('Escape');
 }
});
