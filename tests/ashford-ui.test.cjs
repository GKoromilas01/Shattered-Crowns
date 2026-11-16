const {test,before,after}=require('node:test'),assert=require('node:assert/strict');
const {setup,game,capture,advance}=require('./support/living-city.cjs');let env;
before(async()=>{env=await setup();});after(async()=>env?.close());
async function trade(p){if(!await p.locator('#sc24CityTrade').isVisible())await p.locator('#sc1312CityLifeBtn').click();await p.locator('#sc24CityTrade').click();}
const contacts=p=>p.evaluate(()=>{const q=scFrontiers.snapshot();return {v:q.contacts.valewatch,a:q.contacts.ashford,gold:q.gold,stone:q.stone,history:q.history}});
test('Partner chooser shows Valewatch first and Ashford separately without sharing state',async t=>{
 const p=await game(t,env);await trade(p);
 assert.equal(await p.locator('#sc28Contact').inputValue(),'valewatch');
 assert.equal(await p.locator('#sc28Survey').isVisible(),true);assert.equal(await p.locator('#sc28AshfordSurvey').isVisible(),false);
 await p.locator('#sc28Contact').selectOption('ashford');
 assert.equal(await p.locator('#sc28Survey').isVisible(),false);assert.equal(await p.locator('#sc28AshfordSurvey').isVisible(),true);
 assert.match(await p.locator('#sc28AshfordSurvey').innerText(),/Survey Ashford route · 10 gold/);
 assert.equal(await p.locator('#sc28AshfordPortrait').isVisible(),false);
 const start=await contacts(p);await p.locator('#sc28AshfordSurvey').click();
 const paid=await contacts(p);assert.equal(paid.gold,start.gold-10);assert.notEqual(paid.a.surveySentAt,null);assert.equal(paid.v.surveySentAt,null);
 assert.match(await p.locator('#sc28AshfordStatus').innerText(),/Surveying Ashford/);
 assert.equal(await p.locator('#sc28Survey').isHidden(),true);
 await advance(p,60);await trade(p);await p.locator('#sc28Contact').selectOption('ashford');
 assert.match(await p.locator('#sc28AshfordStatus').innerText(),/Caelan/);
 await p.locator('#sc28AshfordReview').click();
 assert.equal(await p.locator('#sc28AshfordAid').innerText(),'Send 20 stone → 48 gold · +1 trust');
 assert.equal(await p.locator('#sc28AshfordManufactured').innerText(),'Send 12 baskets → 60 gold · +2 trust');
 await p.evaluate(()=>{stone=200;});
 const before=await contacts(p);await p.locator('#sc28AshfordAid').click();
 const sent=await contacts(p);assert.equal(sent.stone,before.stone-20);assert.equal(sent.a.intro,'aid');assert.equal(sent.v.intro,null);
 await advance(p,120);const done=await contacts(p);assert.equal(done.history.length,1);assert.equal(done.history[0].contact,'ashford');assert.equal(done.history[0].reward.gold,48);assert.equal(done.a.trust,1);assert.equal(done.v.trust,0);
 assert.match(await p.locator('#sc28AshfordCargoInfo').innerText(),/reserved baskets|Reserved baskets/);
 await p.locator('#sc28Contact').selectOption('valewatch');assert.equal(await p.locator('#sc28Survey').isVisible(),true);
});
test('Ashford atlas route and details appear only for the Ashford settlement',async t=>{
 const p=await game(t,env);await trade(p);await p.locator('#sc28Contact').selectOption('ashford');await p.locator('#sc28AshfordShowAtlas').click();
 await p.waitForSelector('[data-settlement="ashford"]');
 assert.equal(await p.locator('#sc28AshfordAtlasDetails').isVisible(),true);assert.equal(await p.locator('#sc28AtlasDetails').isVisible(),false);
 assert.match(await p.locator('#sc28AshfordAtlasDetails').innerText(),/Ashford · the river garrison/);
 assert.equal(await p.locator('#sc28AshfordAtlasRoute').count(),1);
});
