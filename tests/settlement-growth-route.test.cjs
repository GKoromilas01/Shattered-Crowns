const {test,before,after}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {setup,game,build,gather,roads,capture,snapshot,advance,conserved}=require('./support/living-city.cjs');const {waitFor,checkpoint}=require('./support/funded-supplier.cjs');let env;
before(async()=>env=await setup());after(async()=>env?.close());
test('Town charter and mixed commission use gathered resources, real builders and actual production without the old agreement',async t=>{
 const p=await game(t,env,'home'),initial=await capture(p),keep=initial.state.buildings.find(b=>b.type==='keep');
 await gather(p,'wood',30);await gather(p,'stone',30);
 await build(p,'farm',keep.x+180,keep.y-100);
 const home=await build(p,'house',keep.x+180,keep.y+130);await build(p,'well',home.x-80,home.y);const line=await p.evaluate(h=>__livingCityTest.roadLine(h.x,h.y),home);assert.ok(line);await roads(p,line);
 const market=await build(p,'market',home.x-100,home.y+90);
 await build(p,'farm',home.x+180,home.y-180);
 for(let i=0;i<5;i++){
  const h=await build(p,'house',home.x+(i%3)*85,home.y-85-Math.floor(i/3)*100);
  const line=await p.evaluate(h=>__livingCityTest.roadLine(h.x,h.y),h);if(line){await gather(p,'stone',10);await roads(p,line);}
  const s=await snapshot(p),info=s.housing.houses.find(x=>x.id===h.id);if(!info.water)await build(p,'well',h.x-65,h.y+55);
 }
 const plots=await p.evaluate(m=>{const points=[];for(let dy=-180;dy<=180;dy+=24)for(let dx=-180;dx<=180;dx+=24)points.push({x:m.x+dx,y:m.y+dy});for(const b of points.filter(p=>Math.hypot(p.x-m.x,p.y-m.y)<180&&scCanPlace('bakery',p,null)))for(const g of points.filter(p=>scCanPlace('granary',p,null))){const d=Math.hypot(b.x-g.x,b.y-g.y);if(d>100&&d<165)return {bakery:b,granary:g};}return null;},market);assert.ok(plots);
 await build(p,'granary',plots.granary.x,plots.granary.y);await build(p,'bakery',plots.bakery.x,plots.bakery.y);await build(p,'workshop',market.x+100,market.y+100);
 await waitFor(p,()=>scSettlementGrowth.snapshot().checks.every(x=>x.ok),600);
 for(let n=0;n<100&&(await p.evaluate(()=>!scSettlementGrowth.snapshot().canPay));n++){await gather(p,'wood',10);await gather(p,'gold',5);await advance(p,5);}
 fs.mkdirSync('test-results/growth',{recursive:true});const before=await capture(p);fs.writeFileSync('test-results/growth/charter-ready.json',JSON.stringify(before));assert.equal(await p.evaluate(()=>scSettlementGrowth.claim()),true,JSON.stringify(await p.evaluate(()=>scSettlementGrowth.snapshot())));const earned=await capture(p);assert.equal(earned.state.resources.gold,before.state.resources.gold-80);assert.equal(earned.state.tradeTown.planks,before.state.tradeTown.planks-8);assert.equal(earned.state.tradeTown.stage,0);await checkpoint(p,'earned Town');
 for(let n=0;n<100&&(await p.evaluate(()=>scTradeTown.snapshot().planks<8||scTradeTown.snapshot().wood<60||scTradeTown.snapshot().stone<30||scTradeTown.snapshot().gold<80));n++){await gather(p,'wood',10);await gather(p,'stone',5);await advance(p,5);}
 await p.keyboard.press('w');const id=await p.evaluate(id=>scTradeTown.upgrade(id),market.id);assert.equal(typeof id,'number');await checkpoint(p,'Town loading yard worksite');await p.keyboard.press('w');assert.equal(await p.evaluate(id=>scConstruction.assign(id),id),true);await waitFor(p,()=>scTradeTown.snapshot().hasYard,240);
 await p.evaluate(()=>scTradeTown.reserveBaskets(12));for(let n=0;n<100&&(await p.evaluate(()=>scTradeTown.snapshot().planks<8||scTradeTown.snapshot().reservedBaskets<12));n++){await gather(p,'wood',5);await advance(p,5);}fs.writeFileSync('test-results/growth/mixed-ready.json',JSON.stringify(await capture(p)));assert.equal(await p.evaluate(()=>scTradeTown.dispatch('town-mixed')),true);
 await advance(p,30);await checkpoint(p,'Town mixed outbound');await advance(p,35);await checkpoint(p,'Town mixed returning');await advance(p,55);const done=await capture(p);assert.equal(done.state.tradeTown.history.length,1);assert.equal(done.state.tradeTown.history[0].gold,110);assert.equal(done.state.tradeTown.stage,0);conserved(await snapshot(p));
 fs.mkdirSync('test-results/growth',{recursive:true});fs.writeFileSync('test-results/growth/funded-town.json',JSON.stringify(done));fs.writeFileSync('test-results/growth/funded-route.json',JSON.stringify({method:'Real gathering, paid native placements, real construction and production. Accelerated simulation, not normal-clock play.',initial:initial.state.resources,final:done.state.resources,elapsed:done.state.clock.elapsed},null,2));await p.screenshot({path:'test-results/growth/funded-town.png'});
});
