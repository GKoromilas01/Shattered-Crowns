const fs=require('node:fs');const path=require('node:path');const {execFileSync}=require('node:child_process');
const {buildSite,verifySite,verifyGitSource,assertLiveSite,assertVerifiedRun,assertStableReleaseRun,assertPromotion,assertProtectedEnvironment,selectArtifact,digest,demand}=require('./release.cjs');
const SITE='https://gkoromilas01.github.io/Shattered-Crowns/';
async function getJson(route){const r=await fetch('https://api.github.com/'+route,{headers:{Authorization:'Bearer '+process.env.GITHUB_TOKEN,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28'}});if(!r.ok)throw new Error('GitHub metadata unavailable ('+r.status+'); refusing release');return r.json()}
function output(values){if(process.env.GITHUB_OUTPUT)fs.appendFileSync(process.env.GITHUB_OUTPUT,Object.entries(values).map(([k,v])=>k+'='+v).join('\n')+'\n')}
async function preflight(read=getJson){
 demand(process.env.GITHUB_REF==='refs/heads/main','Releases may run only from main');demand(process.env.CONFIRM_RELEASE==='deploy','Explicit deploy confirmation required');
 const repo=process.env.GITHUB_REPOSITORY;demand(repo==='GKoromilas01/Shattered-Crowns','Wrong repository');const runId=process.env.CANDIDATE_RUN_ID,sha=process.env.EXPECTED_RELEASE_SHA;
 demand(/^\d+$/.test(runId||''),'Candidate run ID must be numeric');demand(['true','false'].includes(process.env.ROLLBACK),'Rollback selection must be explicit');
 assertProtectedEnvironment(await read('repos/'+repo+'/environments/production'));
 const run=await read('repos/'+repo+'/actions/runs/'+runId);const rollback=process.env.ROLLBACK==='true';if(rollback)assertStableReleaseRun(run,{repository:repo,runId});else assertVerifiedRun(run,{repository:repo,sourceSha:sha,runId});
 const branch=await read('repos/'+repo+'/branches/main');demand(branch.protected===true,'Main branch protection is not active; refuse release until safeguards are enabled');
 const main=await read('repos/'+repo+'/git/ref/heads/main');assertPromotion({sourceSha:sha,currentMain:main.object.sha,rollback:process.env.ROLLBACK==='true'});
 if(!rollback){const artifacts=await read('repos/'+repo+'/actions/runs/'+runId+'/artifacts');selectArtifact(artifacts.artifacts,'verified-site');}
 const history=await read('repos/'+repo+'/actions/workflows/verified-pages-release.yml/runs?status=success&per_page=100');
 const previous=history.workflow_runs.find(r=>r.head_branch==='main'&&r.event==='workflow_dispatch'&&String(r.id)!==process.env.GITHUB_RUN_ID);
 let fallbackRun='';if(previous){assertStableReleaseRun(previous,{repository:repo,runId:String(previous.id)});fallbackRun=String(previous.id)}
 fs.writeFileSync('release-approval.json',JSON.stringify({candidateRun:runId,candidateSha:sha,rollback,fallbackRun,bootstrap:!previous},null,2));output({fallback_run:fallbackRun,bootstrap:String(!previous),rollback:String(rollback)});
 console.log('Approved verification provenance; production fallback will be validated before publishing.');
}
function bootstrap(){const baseline=JSON.parse(fs.readFileSync('release-baseline.json'));const bytes=execFileSync('git',['show',baseline.sourceSha+':index.html']);demand(digest(bytes)===baseline.indexSha256,'Pinned bootstrap bytes do not match the stable baseline');const root='work/bootstrap-source';fs.mkdirSync(root,{recursive:true});fs.writeFileSync(path.join(root,'index.html'),bytes);fs.writeFileSync(path.join(root,'release.json'),JSON.stringify({version:baseline.version,milestone:'Verified Milestone 2 bootstrap'}));buildSite(root,'fallback',{sourceSha:baseline.sourceSha,verificationRunId:'0'})}
async function payloads(){
 const approval=JSON.parse(fs.readFileSync('release-approval.json'));verifySite('candidate',{sourceSha:approval.candidateSha,...(!approval.rollback?{verificationRunId:approval.candidateRun}:{})});
 if(approval.bootstrap)bootstrap();
 verifyGitSource('candidate');const fallback=verifyGitSource('fallback',{bootstrap:JSON.parse(fs.readFileSync('release-baseline.json'))});
 if(approval.bootstrap){const b=JSON.parse(fs.readFileSync('release-baseline.json'));demand(fallback.sourceSha===b.sourceSha&&fallback.files['index.html']===b.indexSha256,'Wrong bootstrap fallback')}
 const live=await fetch(SITE+'?preflight='+Date.now(),{headers:{'Cache-Control':'no-cache'},signal:AbortSignal.timeout(20000)});demand(live.ok,'Cannot verify current production bytes; refusing release');const metaResponse=await fetch(SITE+'release-manifest.json?preflight='+Date.now(),{signal:AbortSignal.timeout(20000)});demand(metaResponse.ok||metaResponse.status===404,'Cannot read current production metadata');const liveManifest=metaResponse.ok?await metaResponse.json():null;assertLiveSite({bytes:Buffer.from(await live.arrayBuffer()),manifest:liveManifest},fallback,{bootstrap:approval.bootstrap});
 output({fallback_sha:fallback.sourceSha});console.log('Candidate and last verified production fallback are intact.');
}
function downloadStable(runId,dir){
 demand(/^\d+$/.test(String(runId)),'Invalid stable release run ID');
 execFileSync('gh',['release','download','stable-run-'+runId,'--repo',process.env.GITHUB_REPOSITORY,'--dir',dir,'--pattern','index.html','--pattern','release.json','--pattern','release-manifest.json'],{stdio:'inherit'});verifySite(dir);
}
function downloadPayloads(){const a=JSON.parse(fs.readFileSync('release-approval.json'));if(a.rollback)downloadStable(a.candidateRun,'candidate');if(a.fallbackRun)downloadStable(a.fallbackRun,'fallback');}
function archive(){const m=verifySite('candidate');const id=process.env.GITHUB_RUN_ID;demand(/^\d+$/.test(id||''),'Invalid release run ID');demand(/^[a-f0-9]{40}$/.test(process.env.GITHUB_SHA||''),'Invalid release controller SHA');execFileSync('gh',['release','create','stable-run-'+id,'--repo',process.env.GITHUB_REPOSITORY,'--target',process.env.GITHUB_SHA,'--draft','--latest=false','--title','Stable '+m.version+' · '+m.sourceSha.slice(0,12),'--notes','Verified source: '+m.sourceSha+'\nVerification run: '+m.verificationRunId+'\nApproved release run: '+id,'candidate/index.html','candidate/release.json','candidate/release-manifest.json'],{stdio:'inherit'});}
function archiveTag(){demand(/^\d+$/.test(process.env.GITHUB_RUN_ID||''),'Invalid release run ID');return 'stable-run-'+process.env.GITHUB_RUN_ID;}
function releaseRecord(){return JSON.parse(execFileSync('gh',['release','view',archiveTag(),'--repo',process.env.GITHUB_REPOSITORY,'--json','assets,isDraft'],{encoding:'utf8',stdio:['ignore','pipe','pipe']}));}
function finalize(){
 verifySite('candidate');const r=releaseRecord();demand(r.isDraft===true,'Release archive is not provisional');
 demand(JSON.stringify(r.assets.map(a=>a.name).sort())===JSON.stringify(['index.html','release-manifest.json','release.json']),'Incomplete release archive must never be published');
 execFileSync('gh',['release','edit',archiveTag(),'--repo',process.env.GITHUB_REPOSITORY,'--draft=false','--latest=false'],{stdio:'inherit'});
}
function quarantine(){
 try{releaseRecord();}catch(error){if(/HTTP 404|release not found/i.test(String(error.stderr||error.message))){console.log('No provisional release archive exists.');return;}throw error;}
 execFileSync('gh',['release','edit',archiveTag(),'--repo',process.env.GITHUB_REPOSITORY,'--draft=true','--latest=false'],{stdio:'inherit'});
}
if(require.main===module){const command=process.argv[2];Promise.resolve().then(()=>command==='preflight'?preflight():command==='download'?downloadPayloads():command==='payloads'?payloads():command==='archive'?archive():command==='finalize'?finalize():command==='quarantine'?quarantine():Promise.reject(new Error('Usage: github-release.cjs preflight|download|payloads|archive|finalize|quarantine'))).catch(error=>{console.error(error.message);process.exitCode=1})}
module.exports={SITE,preflight};
