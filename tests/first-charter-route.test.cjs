const {test,before,after}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {setup,game,snapshot,capture,advance,conserved,build,gather,roads}=require('./support/living-city.cjs');let env;
before(async()=>{env=await setup();fs.mkdirSync('test-results/charter',{recursive:true});});after(async()=>env?.close());
// Real resource-funded UI construction. Only simulation time is accelerated.
for(const choice of ['granary','garden'])test('Resource-funded First Charter completes '+choice+' without grants and survives a checkpoint',async t=>{
 const p=await game(t,env,'brookstead'),initial=await capture(p),keep=initial.state.buildings.find(b=>b.type==='keep');
 assert.equal(await p.evaluate(()=>scFirstCharter.begin()),true);
 await p.evaluate(()=>{const original=__livingCityTest.advance.bind(__livingCityTest);window.__chapterCycles=[];__livingCityTest.advance=n=>{const rows=original(n);__chapterCycles.push(...rows);return rows;};});
 await gather(p,'wood',25);await gather(p,'stone',25);
 await build(p,'farm',keep.x+180,keep.y-100);const home=await build(p,'house',keep.x+180,keep.y+130);await build(p,'well',home.x-80,home.y);
 const line=await p.evaluate(({x,y})=>__livingCityTest.roadLine(x,y),home);assert.ok(line);const beforeRoads=await capture(p);await roads(p,line);const afterRoads=await capture(p);const roadSpend=beforeRoads.state.resources.stone-afterRoads.state.resources.stone;assert.ok(roadSpend>=36);
 for(let n=0;n<120&&(await p.evaluate(()=>scFirstCharter.snapshot().stage))!=='petition';n++)await advance(p,5);
 assert.equal((await p.evaluate(()=>scFirstCharter.snapshot())).stage,'petition');await p.locator('#sc1310AdvisorBtn').click();const button=p.locator(choice==='granary'?'#sc23Granary':'#sc23Garden');await button.waitFor({state:'visible'});await button.click();
 const project=await build(p,choice,choice==='granary'?keep.x+180:home.x+70,choice==='granary'?keep.y-40:home.y+70);await advance(p,5);const result=await p.evaluate(()=>scFirstCharter.snapshot());assert.equal(result.stage,'complete');assert.equal(result.outcome.choice,choice);assert.equal(result.outcome.projectId,project.id);
 const saved=await capture(p);assert.equal(saved.schema,7);assert.equal((await p.evaluate(s=>scCitySave.restore(s),saved)).ok,true);assert.deepEqual((await p.evaluate(()=>scFirstCharter.snapshot())).outcome,result.outcome);
 const cycles=await p.evaluate(()=>__chapterCycles);for(const row of cycles)conserved(row);assert.ok(cycles.length>20);assert.ok(cycles.every(row=>row.food.shortfall===0));
 const final=await snapshot(p);conserved(final);const spent={wood:160+(choice==='granary'?85:35),stone:35+roadSpend+(choice==='granary'?35:0),gold:55+(choice==='garden'?15:0)};const earned=Object.fromEntries(Object.keys(spent).map(k=>[k,saved.state.resources[k]-initial.state.resources[k]+spent[k]]));
 assert.ok(Object.values(saved.state.resources).every(n=>n>=0));fs.writeFileSync('test-results/charter/'+choice+'.json',JSON.stringify({method:'Resource-funded native placement and actual gathering/building workers; simulation time accelerated; no grants or fixture restoration before completion.',choice,simulationSeconds:saved.state.clock.elapsed,spent,earned,initial:initial.state.resources,final:saved.state.resources,outcome:result.outcome,cycles},null,2));
 await p.locator('#sc190ChronicleBtn').click();await p.locator('#sc199Tabs [data-tab=history]').click();await p.locator('#sc23History').waitFor({state:'visible'});await p.screenshot({path:'test-results/charter/'+choice+'.png'});
});
