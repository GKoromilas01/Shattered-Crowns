const {test,before,after}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),http=require('node:http');
const {launchBrowser,browserPage}=require('./support/browser.cjs'),{adapter}=require('./support/caravan.cjs');let browser,server,url;
before(async()=>{server=http.createServer((q,r)=>{r.setHeader('Content-Type','text/html');r.end(fs.readFileSync('index.html','utf8').replace('window.scHoverBuildings=buildings;function frame',adapter+'window.scHoverBuildings=buildings;function frame'));});await new Promise(r=>server.listen(0,'127.0.0.1',r));url='http://127.0.0.1:'+server.address().port;browser=await launchBrowser();});after(async()=>{await browser?.close();server?.close();});
async function game(t,width=1440,motion='reduce'){const {page:p}=await browserPage(t,browser,{viewport:{width,height:900},reducedMotion:motion});p.setDefaultTimeout(10000);p.setDefaultNavigationTimeout(30000);await p.goto(url);await p.locator('#sc1310Skip').click();return p;}
async function offer(p){await p.evaluate(()=>{scCampaign.start('city','brookstead');__caravanTest.prepare();__caravanTest.advance(5);});if(!await p.evaluate(()=>scCitySave.status().paused))await p.locator('#sc154Pause').click();await p.locator('#sc24Offer').waitFor({state:'visible'});}
async function offer(p){await p.evaluate(()=>{scCampaign.start('city','brookstead');__caravanTest.prepare();__caravanTest.advance(5);});if(!await p.evaluate(()=>scCitySave.status().paused))await p.locator('#sc154Pause').click();await p.locator('#sc24Offer').waitFor({state:'visible'});}
test('DEBUG trade rules summary keyboard',async t=>{
 const p=await game(t);await offer(p);await p.locator('#sc24View').click();
 await p.evaluate(()=>{window.__keys=[];for(const ty of ['keydown','keyup','click'])window.addEventListener(ty,e=>window.__keys.push(ty+':'+(e.key||'')+':'+(e.target.id||e.target.tagName)+':dp='+e.defaultPrevented),true);});
 const rules=p.locator('#sc24TradeRules');await rules.locator('summary').focus();
 const info=async()=>p.evaluate(()=>({active:document.activeElement.id||document.activeElement.tagName,hasFocus:document.hasFocus(),open:document.querySelector('#sc24TradeRules')?.open,vis:document.visibilityState,keys:window.__keys.slice(),long:performance.getEntriesByType('longtask').length}));
 console.log('BEFORE',JSON.stringify(await info()));
 await p.keyboard.press('Space');await p.waitForTimeout(300);
 console.log('AFTER',JSON.stringify(await info()));
 console.log('SAMEEL',await p.evaluate(()=>document.querySelector('#sc24TradeRules summary')===document.activeElement));
});
