const {test,before,after}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),http=require('node:http');
const {launchBrowser,browserPage}=require('./support/browser.cjs');
let browser,server,url;
before(async()=>{server=http.createServer((q,r)=>{r.setHeader('Content-Type','text/html');r.end(fs.readFileSync('index.html','utf8').replace('setTimeout(start,300);','window.__graphicsReady=true;'));});await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));url='http://127.0.0.1:'+server.address().port;browser=await launchBrowser();});
after(async()=>{await browser?.close();server?.close()});

test('building silhouettes are deterministic and preserve the caller canvas state',async t=>{
 const {page}=await browserPage(t,browser);await page.goto(url);await page.waitForFunction(()=>window.scDrawBuildingSilhouette);
 const result=await page.evaluate(()=>{
  const c=document.createElement('canvas');c.width=180;c.height=140;const g=c.getContext('2d');
  const before=['#123456','#654321',7,.8];g.fillStyle=before[0];g.strokeStyle=before[1];g.lineWidth=before[2];g.globalAlpha=before[3];
  const building=Object.freeze({x:90,y:75,type:'market',team:0});
  window.scDrawBuildingSilhouette(g,building);const first=c.toDataURL();
  g.clearRect(0,0,c.width,c.height);g.fillStyle=before[0];g.strokeStyle=before[1];g.lineWidth=before[2];g.globalAlpha=before[3];window.scDrawBuildingSilhouette(g,building);const second=c.toDataURL();
  const pixels=g.getImageData(0,0,c.width,c.height).data;return {stable:first===second,painted:pixels.filter((v,i)=>i%4===3&&v>0).length,state:[g.fillStyle,g.strokeStyle,g.lineWidth,g.globalAlpha]};
 });
 assert.equal(result.stable,true);assert.ok(result.painted>100);assert.deepEqual(result.state,['#123456','#654321',7,.8]);
});

test('unit silhouettes distinguish worker, soldier, and archer states',async t=>{
 const {page}=await browserPage(t,browser);await page.goto(url);await page.waitForFunction(()=>window.scDrawUnit);
 const result=await page.evaluate(()=>{const out={};for(const type of ['worker','soldier','archer']){const c=document.createElement('canvas');c.width=120;c.height=100;const g=c.getContext('2d');window.scDrawUnit(g,{x:60,y:58,type,team:0});out[type]=c.toDataURL();}return out;});
 assert.notEqual(result.worker,result.soldier);assert.notEqual(result.soldier,result.archer);assert.notEqual(result.worker,result.archer);
});
