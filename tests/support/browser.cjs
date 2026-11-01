const {chromium}=require('playwright');const fs=require('node:fs');const path=require('node:path');const assert=require('node:assert/strict');const {safeName}=require('../../scripts/artifacts.cjs');
function launchBrowser(){return chromium.launch({executablePath:process.env.CHROMIUM_PATH||chromium.executablePath(),args:['--no-sandbox']})}
async function browserPage(t,browser,options={}){
 const context=await browser.newContext(options);await context.tracing.start({screenshots:false,snapshots:true,sources:true});const page=await context.newPage();const errors=[],consoleMessages=[];
 page.on('pageerror',e=>errors.push(e.stack||e.message));page.on('console',m=>{if(['error','warning'].includes(m.type()))consoleMessages.push(m.text())});
 const dir=path.join(process.env.TEST_ARTIFACT_DIR||'test-results',safeName(t.name));fs.mkdirSync(dir,{recursive:true});
 t.after(async()=>{
  try{await page.screenshot({path:path.join(dir,'screenshot.png')});}catch(e){consoleMessages.push('Screenshot unavailable: '+e.message)}
  try{await context.tracing.stop({path:path.join(dir,'trace.zip')});}finally{fs.writeFileSync(path.join(dir,'browser.json'),JSON.stringify({url:page.url(),errors,consoleMessages},null,2));await context.close()}
  assert.deepEqual(errors,[],'No uncaught game JavaScript errors');
 });
 return {context,page};
}
module.exports={launchBrowser,browserPage};
