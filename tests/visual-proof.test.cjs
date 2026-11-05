const {test,before,after}=require('node:test');
const assert=require('node:assert/strict'),fs=require('node:fs'),http=require('node:http');
const {launchBrowser,browserPage}=require('./support/browser.cjs');
let browser,server,url;
before(async()=>{server=http.createServer((q,r)=>{r.setHeader('Content-Type','text/html');const source=fs.readFileSync('index.html','utf8');r.end(source.replace('setTimeout(start,300);','window.__visualProofInitialCamera=start;').replace('const alive=o=>',`window.__visualProof={ground:typeof sc16PaintGround==='function'?sc16PaintGround:null,tree:typeof sc16PaintTree==='function'?sc16PaintTree:null,house:typeof sc16PaintHouseDepth==='function'?sc16PaintHouseDepth:null,unit:typeof sc16PaintUnitDetails==='function'?sc16PaintUnitDetails:null};const alive=o=>`));});await new Promise(r=>server.listen(0,'127.0.0.1',r));url='http://127.0.0.1:'+server.address().port;browser=await launchBrowser();});
after(async()=>{await browser?.close();server?.close()});
test('Playable visual painters are deterministic and preserve inputs and canvas state',async t=>{
 const {page:p}=await browserPage(t,browser);await p.goto(url);await p.waitForFunction(()=>window.__visualProof);
 const result=await p.evaluate(()=>{
  const api=window.__visualProof,out=[];
  for(const [name,fn] of Object.entries(api)){
   if(!fn){out.push({name,missing:true});continue;}
   const c=document.createElement('canvas');c.width=240;c.height=200;const g=c.getContext('2d');
   const node=Object.freeze({x:100,y:100,type:'tree',amount:240,radius:18});
   const draw=()=>{g.fillStyle='#123456';g.strokeStyle='#654321';g.lineWidth=7;g.globalAlpha=.8;g.setTransform(1,0,0,1,2,3);if(name==='ground')fn(g,240,200);if(name==='tree')fn(g,node);if(name==='house')fn(g,100,100,49,38,2);if(name==='unit')fn(g,100,100,'worker','#4b95bd');};
   draw();const a=c.toDataURL(),state=[g.fillStyle,g.strokeStyle,g.lineWidth,g.globalAlpha,...['a','b','c','d','e','f'].map(k=>g.getTransform()[k])];
   const data=g.getImageData(0,0,240,200).data,painted=data.filter((v,i)=>i%4===3&&v>0).length;
   g.reset();draw();out.push({name,stable:a===c.toDataURL(),state,painted});
  }return out;
 });
 assert.equal(result.length,4);for(const r of result){assert.equal(r.missing,undefined,r.name+' must render the playable proof');assert.equal(r.stable,true,r.name+' cannot flicker or use random/time');assert.ok(r.painted>30,r.name+' must paint visible content');assert.deepEqual(r.state,['#123456','#654321',7,.8,1,0,0,1,2,3],r.name+' must restore the caller canvas');}
});
for(const width of [390,1440])test('Visual proof preserves old city state during paused drawing at '+width,async t=>{
 const {page:p}=await browserPage(t,browser,{viewport:{width,height:900},reducedMotion:'reduce'});await p.goto(url);await p.locator('#sc1310Skip').click();
 const old=JSON.parse(fs.readFileSync('tests/fixtures/city-v0140.json'));assert.equal((await p.evaluate(s=>scCitySave.restore(s),old)).ok,true);
 const before=await p.evaluate(()=>scCitySave.capture().state);await p.waitForTimeout(700);assert.deepEqual(await p.evaluate(()=>scCitySave.capture().state),before,'Rendering must not modify saves, resource stocks, units or economy');
 await p.locator('#sc154Pause').click();await p.waitForTimeout(250);assert.equal(await p.evaluate(()=>scCitySave.status().paused),false);await p.locator('#sc154Pause').click();
 assert.equal(await p.locator('#field').evaluate(c=>c.width>0&&c.height>0),true);
});

for(const action of ['new village','restored save'])test('Delayed startup camera cannot replace '+action+' view',async t=>{
 const {page:p}=await browserPage(t,browser,{viewport:{width:1440,height:900}});await p.goto(url);await p.waitForFunction(()=>window.__visualProofInitialCamera);
 if(action==='new village')await p.evaluate(()=>scCampaign.start('city','brookstead'));
 else {const save=JSON.parse(fs.readFileSync('tests/fixtures/city-v0140.json'));assert.equal((await p.evaluate(s=>scCitySave.restore(s),save)).ok,true);}
 const before=await p.evaluate(()=>({state:scCitySave.capture().state,view:scCitySave.capture().view}));await p.evaluate(()=>window.__visualProofInitialCamera());await p.waitForTimeout(400);
 assert.deepEqual(await p.evaluate(()=>({state:scCitySave.capture().state,view:scCitySave.capture().view})),before,'A timer for the original city must not take over another city camera');
});
