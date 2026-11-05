const {test,before,after}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {setup,game,snapshot,capture,advance,conserved,build,gather,roads}=require('./support/living-city.cjs');let env;
before(async()=>{env=await setup();fs.mkdirSync('test-results/balance',{recursive:true})});after(async()=>env?.close());
const origins=['home','brookstead','briar-3','saffron-3','stormhaven-2'];
for(const id of origins)test('Thirty simulation minutes conserve the real economy and restore '+id,async t=>{
 const p=await game(t,env,id),start=await capture(p),all=[];let checkpoint;
 for(let i=0;i<6;i++){const rows=await advance(p,300);rows.forEach(conserved);all.push(...rows);if(i===1)checkpoint=await capture(p);}
 const final=await snapshot(p);conserved(final);assert.ok(Math.abs((await capture(p)).state.clock.elapsed-start.state.clock.elapsed-1800)<1e-6);assert.ok(all.length>=359,'Every simulated cycle is measured');assert.equal((await capture(p)).state.ended,false);assert.equal((await capture(p)).state.buildings.some(b=>b.team===1),false);assert.ok(all.every(r=>r.food.closing>=0&&r.happiness>=0&&r.happiness<=100));
 assert.ok(checkpoint.state.growth.departure<=15,'Departure timer remains valid at the minimum population');const result=await p.evaluate(s=>scCitySave.restore(s),checkpoint);assert.equal(result.ok,true,result.message);await advance(p,1200);const restored=await snapshot(p);for(const key of ['population','housing','workforce','food','prosperity','satisfaction'])assert.deepEqual(restored[key],final[key],key+' continuation matches uninterrupted reference');
 fs.writeFileSync('test-results/balance/'+id+'-baseline.json',JSON.stringify({origin:id,simulationSeconds:1800,startPopulation:start.state.people.population,finalPopulation:final.population,finalFood:final.food.stock,finalProsperity:final.prosperity,cycles:all},null,2));
});

for(const id of origins)test('Legitimate guided growth sustains thirty simulation minutes at '+id,async t=>{
 const p=await game(t,env,id),began=(await capture(p)).state.clock.elapsed,initial=await snapshot(p),keep=(await capture(p)).state.buildings.find(b=>b.type==='keep');
 if(id==='home')await build(p,'farm',keep.x+180,keep.y);
 await gather(p,'wood',25);await gather(p,'stone',25);
 if(id!=='home')await build(p,'farm',keep.x+180,keep.y-100);
 const house=await build(p,'house',keep.x+180,keep.y+130);
 if(!(await snapshot(p)).housing.houses.find(h=>h.id===house.id).access){const line=await p.evaluate(({x,y})=>__livingCityTest.roadLine(x,y),house);assert.ok(line,'Guided route must find a legal connected three-road line near its new house');await roads(p,line);}
 await build(p,'well',house.x-80,house.y);await build(p,'clinic',house.x+80,house.y);await build(p,'garden',house.x,house.y+80);
 await p.evaluate(()=>scCityEconomy.setTradePolicy(false,2));
 const all=[];let checkpoint;for(let i=0;i<6;i++){const remaining=1800-((await capture(p)).state.clock.elapsed-began);if(remaining>1e-6){const rows=await advance(p,Math.min(300,remaining));rows.forEach(conserved);all.push(...rows);}if(i===2)checkpoint=await capture(p);}assert.ok(Math.abs((await capture(p)).state.clock.elapsed-began-1800)<1e-6);
 const final=await snapshot(p);assert.ok(final.population>initial.population,'Funded route grows beyond initial population');assert.ok(final.housing.houses.some(h=>h.occupancy>0&&h.tier>=2),'At least one occupied home upgrades');assert.ok(all.filter(r=>r.at-began>1500).every(r=>r.food.shortfall===0),'Final five simulation minutes have no unmet food');assert.equal((await capture(p)).state.ended,false);
 assert.equal((await p.evaluate(s=>scCitySave.restore(s),checkpoint)).ok,true);await advance(p,1800-(checkpoint.state.clock.elapsed-began));const restored=await snapshot(p);for(const key of ['population','housing','workforce','food','prosperity'])assert.deepEqual(restored[key],final[key],key+' guided continuation matches reference');
 fs.writeFileSync('test-results/balance/'+id+'-guided.json',JSON.stringify({origin:id,simulationSeconds:1800,initialPopulation:initial.population,finalPopulation:final.population,finalFood:final.food.stock,finalProsperity:final.prosperity,cycles:all},null,2));
});
