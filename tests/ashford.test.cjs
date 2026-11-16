const {test,before,after}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),http=require('node:http');
const {launchBrowser,browserPage}=require('./support/browser.cjs'),{adapter}=require('./support/envoy.cjs');let browser,server,url;
before(async()=>{server=http.createServer((q,r)=>{r.setHeader('Content-Type','text/html');r.end(fs.readFileSync('index.html','utf8').replace('window.scHoverBuildings=buildings;function frame',adapter+'window.scHoverBuildings=buildings;function frame'));});await new Promise(r=>server.listen(0,'127.0.0.1',r));url='http://127.0.0.1:'+server.address().port;browser=await launchBrowser();});after(async()=>{await browser?.close();server?.close();});
async function game(t,origin='brookstead'){const {page:p}=await browserPage(t,browser,{viewport:{width:1440,height:900},reducedMotion:'reduce'});p.setDefaultNavigationTimeout(30000);await p.goto(url);await p.locator('#sc1310Skip').click();await p.evaluate(id=>scCampaign.start('city',id),origin);await p.locator('#sc154Pause').click();return p;}
const capture=p=>p.evaluate(()=>scCitySave.capture()),advance=(p,n)=>p.evaluate(n=>__envoyTest.advance(n),n),snapshot=p=>p.evaluate(()=>scFrontiers.snapshot());
async function roundtrip(p){const s=await capture(p),r=await p.evaluate(s=>scCitySave.restore(s),s);assert.equal(r.ok,true,r.message);assert.deepEqual((await capture(p)).state,s.state);return s;}
async function late(p){const s=JSON.parse(fs.readFileSync('tests/fixtures-envoy/city-v026-supplier.json'));assert.equal((await p.evaluate(s=>scCitySave.restore(s),s)).ok,true);await p.evaluate(()=>__envoyTest.wood(400));}
async function discover(p,id){assert.equal(await p.evaluate(id=>scFrontiers.survey(id),id),true);await advance(p,60);}
const dispatch=(p,id,kind,batches=1)=>p.evaluate(([id,kind,batches])=>scFrontiers.dispatch(id,kind,batches),[id,kind,batches]);
// Stocks real baskets for the reservation, then reserves them. Only used to set up cargo; the cargo itself is deducted by the engine.
const reserve=(p,n)=>p.evaluate(n=>{__envoyTest.baskets(n);return scTradeTown.reserveBaskets(n);},n);

for(const origin of ['home','brookstead','briar-3','saffron-3','stormhaven-2'])test('Ashford survey costs ten gold and is discoverable from '+origin,async t=>{const p=await game(t,origin);const before=await capture(p);assert.equal(await p.evaluate(()=>scFrontiers.survey('ashford')),true);const s=await capture(p);assert.equal(s.schema,11);assert.equal(s.state.resources.gold,before.state.resources.gold-10);assert.equal(s.state.exploration.contacts.valewatch.surveySentAt,null,'Valewatch stays blank');assert.equal(await p.evaluate(()=>scFrontiers.survey('ashford')),false);assert.equal(await p.evaluate(()=>scFrontiers.survey('valewatch')),false,'One envoy at a time');await advance(p,30);await roundtrip(p);await advance(p,30);const done=await roundtrip(p);assert.equal(done.state.exploration.contacts.ashford.discoveredAt,done.state.clock.elapsed);assert.equal(done.state.exploration.contacts.valewatch.surveySentAt,null);});

test('Ashford introductions use exact stone or reserved baskets and are mutually exclusive',async t=>{
 for(const [kind,pay,gold,trust] of [['intro-aid','stone',48,1],['intro-manufactured','baskets',60,2]]){
  const p=await game(t);await late(p);await discover(p,'ashford');await p.evaluate(()=>{stone=100;});
  if(kind==='intro-manufactured'){assert.equal(await reserve(p,12),true);}
  const before=await capture(p);assert.equal(await dispatch(p,'ashford',kind),true);const sent=await capture(p);
  if(pay==='stone')assert.equal(sent.state.resources.stone,before.state.resources.stone-20);else assert.equal(sent.state.tradeTown.reservedBaskets,before.state.tradeTown.reservedBaskets-12);
  const other=kind==='intro-aid'?'intro-manufactured':'intro-aid';assert.equal(await dispatch(p,'ashford',other),false,'Only one introduction');
  await advance(p,60);await roundtrip(p);await advance(p,59.75);const treasury=(await capture(p)).state.resources;await advance(p,.25);const done=await roundtrip(p);
  assert.equal(done.state.resources.gold,treasury.gold+gold);assert.equal(done.state.exploration.history.length,1);assert.equal((await snapshot(p)).contacts.ashford.trust,trust);
  const paid=done.state.resources;await advance(p,.25);assert.deepEqual((await capture(p)).state.resources,paid,'Reward is credited once');
 }
});

test('Valewatch and Ashford keep independent trust, refusal and pact privileges',async t=>{
 const p=await game(t);await late(p);await discover(p,'valewatch');assert.equal(await dispatch(p,'valewatch','intro-manufactured'),true);await advance(p,120);
 await discover(p,'ashford');assert.equal(await p.evaluate(()=>scFrontiers.refuse('ashford')),true);let s=await snapshot(p);assert.equal(s.contacts.ashford.trust,-1);assert.equal(s.contacts.valewatch.trust,2);
 assert.equal(await p.evaluate(()=>scFrontiers.refuse('valewatch')),false,'Valewatch already has its introduction');
 await p.evaluate(()=>scFrontiers.reopen('ashford'));await p.evaluate(()=>{stone=100;});assert.equal(await dispatch(p,'ashford','intro-aid'),true);await advance(p,120);s=await snapshot(p);assert.equal(s.contacts.ashford.trust,0);assert.equal(await p.evaluate(()=>scFrontiers.sign('ashford')),false,'A Valewatch record never grants Ashford a pact');
 await roundtrip(p);
});

test('Ashford repeat orders, pact and double batches need a yard, real baskets and earned trust',async t=>{
 const p=await game(t,'briar-3');await p.evaluate(()=>__townTest.prepare());await discover(p,'ashford');await p.evaluate(()=>{stone=200;});
 assert.equal(await dispatch(p,'ashford','intro-aid'),true);await advance(p,120);
 assert.equal(await reserve(p,12),true);assert.equal(await dispatch(p,'ashford','basic'),false,'Needs a real loading yard');
 await p.evaluate(()=>{__envoyTest.gold(400);__envoyTest.wood(400);stone=200;__envoyTest.stock(40);});const yard=await p.evaluate(()=>scTradeTown.upgrade(__townTest.market().id));assert.equal(typeof yard,'number');await p.evaluate(id=>__townTest.finish(id),yard);
 assert.equal(await p.evaluate(()=>scFrontiers.sign('ashford')),false,'Pact needs three trust');
 for(let i=0;i<2;i++){assert.equal(await reserve(p,12),true);const before=await capture(p);assert.equal(await dispatch(p,'ashford','basic'),true);const sent=await capture(p);assert.equal(sent.state.tradeTown.reservedBaskets,before.state.tradeTown.reservedBaskets-12);assert.equal(sent.state.exploration.cargo.reward.gold,53);await advance(p,120);}
 assert.equal((await snapshot(p)).contacts.ashford.trust,3);assert.equal(await p.evaluate(()=>scFrontiers.sign('ashford')),true);
 assert.equal(await dispatch(p,'ashford','pact',2),false,'Double batch needs six trust');assert.equal(await reserve(p,48),false,'The 48-basket reserve is earned, not available yet');
 assert.equal(await reserve(p,24),true);const pactBefore=await capture(p);assert.equal(await dispatch(p,'ashford','pact'),true);assert.equal((await capture(p)).state.exploration.cargo.reward.gold,112);assert.equal((await capture(p)).state.tradeTown.reservedBaskets,pactBefore.state.tradeTown.reservedBaskets-24);await advance(p,120);
 for(let i=0;i<2;i++){assert.equal(await reserve(p,24),true);assert.equal(await dispatch(p,'ashford','pact'),true);await advance(p,120);}
 assert.equal((await snapshot(p)).contacts.ashford.trust,6);assert.equal((await snapshot(p)).doubleReserveEarned,true);
 assert.equal(await reserve(p,48),true);const b=await capture(p);assert.equal(await dispatch(p,'ashford','pact',2),true);const sent=await capture(p);assert.equal(sent.state.tradeTown.reservedBaskets,b.state.tradeTown.reservedBaskets-48);assert.equal(sent.state.exploration.cargo.reward.gold,224);await advance(p,120);const done=await roundtrip(p);assert.equal(done.state.exploration.history.at(-1).completedAt,done.state.clock.elapsed);
});

test('Shared cargo slot blocks overlap between Ashford, Valewatch and Ironmere cargo',async t=>{
 const p=await game(t);await late(p);await discover(p,'valewatch');await discover(p,'ashford');await p.evaluate(()=>{stone=200;});
 assert.equal(await dispatch(p,'ashford','intro-aid'),true);const busy=await capture(p);assert.equal(await dispatch(p,'valewatch','intro-aid'),false);assert.equal(await p.evaluate(()=>scTradeTown.dispatch('standing-planks')),false);assert.deepEqual((await capture(p)).state,busy.state);
 assert.equal((await snapshot(p)).cargoBusy,true);
});

test('Schema eleven refuses a 48-basket reserve, altered Ashford terms and an unearned pact',async t=>{
 const p=await game(t);await late(p);await discover(p,'ashford');await p.evaluate(()=>{stone=100;});await dispatch(p,'ashford','intro-aid');await advance(p,120);const good=await roundtrip(p);
 for(const change of [s=>{s.state.tradeTown.reservedBaskets=40;s.state.tradeTown.reservationTarget=40;},s=>s.state.exploration.history[0].reward.gold=999,s=>s.state.exploration.history[0].cost.stone=0,s=>s.state.exploration.contacts.ashford.pactAt=s.state.clock.elapsed,s=>s.state.exploration.contacts.valewatch.surveySentAt=0]){
  const bad=structuredClone(good);change(bad);assert.equal((await p.evaluate(s=>scCitySave.restore(s),bad)).ok,false);assert.deepEqual((await capture(p)).state,good.state,'A refused import leaves the city unchanged');}
 assert.equal(await p.evaluate(()=>scFrontiers.survey('unknown')),false);assert.equal(await p.evaluate(()=>scFrontiers.dispatch('unknown','basic')),false);
});

test('A prototype save with an active Valewatch survey loads with Ashford exactly blank',async t=>{
 const p=await game(t);assert.equal(await p.evaluate(()=>scFrontiers.survey('valewatch')),true);await advance(p,20);const proto=await capture(p);assert.deepEqual(proto.state.exploration.contacts.ashford,{surveySentAt:null,surveyPaid:0,discoveredAt:null,refusedAt:null,talkClosed:false,intro:null,introAt:null,pactAt:null});
 const r=await p.evaluate(s=>scCitySave.restore(s),proto);assert.equal(r.ok,true,r.message);assert.deepEqual((await capture(p)).state,proto.state);
});
