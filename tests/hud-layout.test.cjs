const {test,before,after}=require('node:test');const assert=require('node:assert/strict'),fs=require('node:fs'),http=require('node:http');
const {launchBrowser,browserPage}=require('./support/browser.cjs');let browser,server,url;
before(async()=>{server=http.createServer((q,r)=>r.end(fs.readFileSync('index.html')));await new Promise(r=>server.listen(0,'127.0.0.1',r));url='http://127.0.0.1:'+server.address().port;browser=await launchBrowser()});after(async()=>{await browser?.close();server?.close()});
for(const [width,height] of [[390,844],[320,740],[430,932],[844,390],[1366,768],[1920,1080]])test(`HUD remains readable at ${width}x${height}`,async t=>{
 const {page}=await browserPage(t,browser,{viewport:{width,height}});await page.goto(url);await page.locator('#sc1310Skip').click();
 const problems=await page.evaluate(()=>{
  const selectors=['.sc1408Resource','#scCalendarBadge','#sc1380Zoom','#sc154Pause','#sc158CityStatus','#sc146MenuButton','#sc149Status'];
  const items=selectors.flatMap(s=>[...document.querySelectorAll(s)]).filter(e=>e.getClientRects().length);const out=[];
  for(const e of items){const r=e.getBoundingClientRect();if(r.left<0||r.right>innerWidth||r.top<0||r.bottom>innerHeight)out.push(e.id+' outside viewport');for(const other of items){if(e===other)continue;const b=other.getBoundingClientRect();if(Math.min(r.right,b.right)-Math.max(r.left,b.left)>1&&Math.min(r.bottom,b.bottom)-Math.max(r.top,b.top)>1)out.push((e.id||e.textContent)+' overlaps '+(other.id||other.textContent));}}
  return out;
 });assert.deepEqual(problems,[]);
 await page.locator('#sc146MenuButton').click();
 assert.ok(await page.locator('#sc146Menu').evaluate(e=>e.getBoundingClientRect().top>=document.getElementById('scResponsiveHud').getBoundingClientRect().bottom),'Menu must open below HUD');
 await page.locator('#sc146MenuButton').click();
 for(const [open,close] of [['#sc189HelpButton','#sc189Close'],['#sc190ChronicleBtn','#sc190Close']]){
  await page.locator(open).scrollIntoViewIfNeeded();await page.locator(open).click();
  assert.ok(await page.locator(close).evaluate(e=>{const r=e.getBoundingClientRect(),hit=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);return r.top>=document.getElementById('scResponsiveHud').getBoundingClientRect().bottom&&e.contains(hit)}),'Panel close control must clear HUD and receive pointer input');
  await page.locator(close).click();
 }
 await page.locator('#sc154Pause').click();await page.waitForTimeout(100);assert.match(await page.locator('#sc154Pause').innerText(),/Resume/);await page.locator('#sc154Pause').click();
 await page.locator('#sc140Build').click();
 const house=page.locator('#sc140Commands button').filter({hasText:'House'});await house.scrollIntoViewIfNeeded();await house.click();
 await page.waitForFunction(()=>document.getElementById('sc143Tip').textContent.includes('House'));
 const notices=await page.evaluate(()=>{
  const elements=[...document.querySelectorAll('#scHudNotices>*')].filter(e=>e.getClientRects().length&&Number(getComputedStyle(e).opacity)>0);
  const bottom=document.getElementById('sc140Bar').getBoundingClientRect().top,issues=[];
  for(const e of elements){const r=e.getBoundingClientRect();if(r.left<0||r.right>innerWidth||r.bottom>bottom||r.top<0)issues.push(e.id+' clipped');for(const other of elements){if(e===other)continue;const b=other.getBoundingClientRect();if(Math.min(r.right,b.right)>Math.max(r.left,b.left)&&Math.min(r.bottom,b.bottom)>Math.max(r.top,b.top))issues.push(e.id+' overlaps '+other.id);}}
  return issues;
 });assert.deepEqual(notices,[],'Construction feedback and notifications must clear each other and the command bar');
});
