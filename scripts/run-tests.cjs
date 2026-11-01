const fs=require('node:fs');const path=require('node:path');const {spawnSync,spawn}=require('node:child_process');const {chromium}=require('playwright');const {prunePassedTraces}=require('./artifacts.cjs');
(async()=>{
 const mode=process.argv[2]||'all';const root=path.resolve(__dirname,'..');process.chdir(root);
 let executable=process.env.CHROMIUM_PATH||chromium.executablePath();
 if(!fs.existsSync(executable)&&!process.env.CHROMIUM_PATH){console.log('Installing the lockfile-pinned Chromium build...');const cli=path.join(path.dirname(require.resolve('playwright/package.json')),'cli.js');const r=spawnSync(process.execPath,[cli,'install','chromium'],{stdio:'inherit'});if(r.status!==0)throw new Error('Chromium installation failed. Allow Playwright download hosts or set CHROMIUM_PATH to an explicitly chosen installed Chromium.');}
 if(!fs.existsSync(executable))throw new Error('CHROMIUM_PATH does not exist: '+executable);
 const browser=await chromium.launch({executablePath:executable,args:['--no-sandbox']});const version=browser.version();await browser.close();
 const out=path.resolve(process.env.TEST_ARTIFACT_DIR||path.join('test-results',mode));fs.mkdirSync(out,{recursive:true});
 fs.writeFileSync(path.join(out,'environment.json'),JSON.stringify({node:process.version,playwright:require('playwright/package.json').version,chromium:version,executable,mode},null,2));
 console.log('Testing with Chromium '+version+'; artifacts: '+out);
 let files=mode==='smoke'?['tests/smoke/pages.test.cjs']:fs.readdirSync('tests').filter(f=>f.endsWith('.test.cjs')).map(f=>'tests/'+f).concat('tests/smoke/pages.test.cjs');
 const log=fs.createWriteStream(path.join(out,'test-output.txt'));const child=spawn(process.execPath,['--test','--test-concurrency=1','--test-reporter=spec','--test-reporter-destination=stdout','--test-reporter=junit','--test-reporter-destination='+path.join(out,'junit.xml'),'--test-reporter='+path.join(root,'scripts/test-events.cjs'),'--test-reporter-destination='+path.join(out,'events.jsonl'),...files],{env:{...process.env,CHROMIUM_PATH:executable,TEST_ARTIFACT_DIR:out},stdio:['inherit','pipe','pipe']});
 for(const stream of [child.stdout,child.stderr])stream.on('data',chunk=>{process.stdout.write(chunk);log.write(chunk)});
 child.on('error',error=>{console.error(error);process.exitCode=1;log.end()});child.on('close',code=>{process.exitCode=code??1;log.end();try{const events=fs.readFileSync(path.join(out,'events.jsonl'),'utf8').trim().split('\n').filter(Boolean).map(JSON.parse);prunePassedTraces(out,events);}catch(error){console.error('Unable to prune success traces: '+error.message);process.exitCode=1}});
})().catch(error=>{console.error(error.message);console.error('On clean Linux hosts install OS dependencies with npx playwright install --with-deps chromium.');process.exitCode=1});
