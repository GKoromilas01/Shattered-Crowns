// Read-only evidence probe. This file never calls preflight, publishes, downloads via gh,
// changes an approval, or authorizes a release. Selectors mirror PR70 and are checked below.
const fs=require('node:fs'),path=require('node:path');
const {assertStableReleaseRun,assertLiveSite,digest,demand}=require('../release.cjs');
const REPO='GKoromilas01/Shattered-Crowns',WORKFLOW='verified-pages-release.yml';
const proposedLine="const previous=history.workflow_runs.find(r=>r.conclusion==='success'&&r.head_branch==='main'&&r.event==='workflow_dispatch'&&String(r.id)!==process.env.GITHUB_RUN_ID);";
function assertSelectorMatchesController(source){demand(source.includes(proposedLine)&&source.includes("runs?status=completed&per_page=100"),'Probe selector does not match the proposed controller; update/review diagnostic first');}
function compareHistories({oldRuns,newRuns,unfilteredRuns=[],expectedRun,currentRun}){
 const current=String(currentRun),expected=Number(expectedRun);
 const old=oldRuns.find(r=>r.head_branch==='main'&&r.event==='workflow_dispatch'&&String(r.id)!==current);
 const proposed=newRuns.find(r=>r.conclusion==='success'&&r.head_branch==='main'&&r.event==='workflow_dispatch'&&String(r.id)!==current);
 const unfiltered=unfilteredRuns.find(r=>r.conclusion==='success'&&r.head_branch==='main'&&r.event==='workflow_dispatch'&&String(r.id)!==current);
 const summarize=(rows,selected)=>({count:rows.length,containsExpected:rows.some(r=>r.id===expected),selected:selected?.id??null,runs:rows.map(r=>({id:r.id,status:r.status,conclusion:r.conclusion,branch:r.head_branch,event:r.event,sha:r.head_sha}))});
 return {old:summarize(oldRuns,old),proposed:summarize(newRuns,proposed),provesExpectedSelection:proposed?.id===expected,unfiltered:summarize(unfilteredRuns,unfiltered),unfilteredProvesExpectedSelection:unfiltered?.id===expected};
}
async function main(){
 const expected=process.env.EXPECTED_STABLE_RUN_ID||'44864060304',current=process.env.DIAGNOSTIC_RELEASE_RUN_ID||'44898940499';
 demand(/^\d+$/.test(expected)&&/^\d+$/.test(current),'Diagnostic run IDs must be numeric');
 demand(process.env.GITHUB_REPOSITORY===REPO,'Wrong diagnostic repository');
 assertSelectorMatchesController(fs.readFileSync(path.join(__dirname,'../github-release.cjs'),'utf8'));
 async function api(route){const r=await fetch('https://api.github.com/repos/'+REPO+'/'+route,{headers:{Authorization:'Bearer '+process.env.GITHUB_TOKEN,Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28'},signal:AbortSignal.timeout(20000)});demand(r.ok,'GitHub evidence unavailable: HTTP'+r.status);return {body:await r.json(),link:r.headers.get('link'),date:r.headers.get('date')};}
 async function publicBytes(url,headers={}){const started=Date.now(),r=await fetch(url,{headers,signal:AbortSignal.timeout(20000)});demand(r.ok,'Public evidence unavailable: HTTP'+r.status);const bytes=Buffer.from(await r.arrayBuffer());return {bytes,metadata:{url,status:r.status,bytes:bytes.length,sha256:digest(bytes),contentEncoding:r.headers.get('content-encoding'),contentLength:r.headers.get('content-length'),elapsedMs:Date.now()-started}};}
 const oldRoute='actions/workflows/'+WORKFLOW+'/runs?status=success&per_page=100',newRoute='actions/workflows/'+WORKFLOW+'/runs?status=completed&per_page=100';
 const unfilteredRoute='actions/workflows/'+WORKFLOW+'/runs?per_page=100';
 const [oldList,newList,unfilteredList,stable,archive]=await Promise.all([api(oldRoute),api(newRoute),api(unfilteredRoute),api('actions/runs/'+expected),api('releases/tags/stable-run-'+expected)]);
 assertStableReleaseRun(stable.body,{repository:REPO,runId:expected});demand(archive.body.draft===false,'Expected archive is provisional');
 const asset=name=>{const a=archive.body.assets.filter(a=>a.name===name);demand(a.length===1,'Missing/ambiguous stable archive asset '+name);return a[0];};
 const [saved,manifestBytes,live,liveMeta]=await Promise.all([publicBytes(asset('index.html').browser_download_url),publicBytes(asset('release-manifest.json').browser_download_url),publicBytes('https://gkoromilas01.github.io/Shattered-Crowns/?preflight='+Date.now(),{'Cache-Control':'no-cache'}),publicBytes('https://gkoromilas01.github.io/Shattered-Crowns/release-manifest.json?preflight='+Date.now())]);
 const fallback=JSON.parse(manifestBytes.bytes.toString()),liveManifest=JSON.parse(liveMeta.bytes.toString());demand(saved.metadata.sha256===fallback.files['index.html'],'Stable archive bytes do not match its manifest');
 let liveError=null;try{assertLiveSite({bytes:live.bytes,manifest:liveManifest},fallback);}catch(e){liveError=e.message;}
 const result={purpose:'Evidence only; no release or approval action',controllerCommit:process.env.GITHUB_SHA||null,expectedStableRun:Number(expected),excludedReleaseRun:Number(current),queriedAt:new Date().toISOString(),queries:{old:{path:oldRoute,date:oldList.date,link:oldList.link,total:oldList.body.total_count},proposed:{path:newRoute,date:newList.date,link:newList.link,total:newList.body.total_count},unfiltered:{path:unfilteredRoute,date:unfilteredList.date,link:unfilteredList.link,total:unfilteredList.body.total_count}},...compareHistories({oldRuns:oldList.body.workflow_runs,newRuns:newList.body.workflow_runs,unfilteredRuns:unfilteredList.body.workflow_runs,expectedRun:expected,currentRun:current}),stable:{run:stable.body.id,sourceSha:stable.body.head_sha,manifest:fallback,archive:saved.metadata,apiAssetDigest:asset('index.html').digest},live:{...live.metadata,matchesStable:liveError===null,error:liveError}};
 console.log(JSON.stringify(result,null,2));
 if(process.env.GITHUB_STEP_SUMMARY)fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY,'## Fallback-selection evidence\n\nExpected stable run: '+expected+'\n\nOld selector: '+result.old.selected+'; proposed selector: '+result.proposed.selected+'; unfiltered candidate: '+result.unfiltered.selected+'\n\nKnown stable present in completed list: '+result.proposed.containsExpected+'\n\nLive bytes: '+live.metadata.bytes+'; SHA256: `'+live.metadata.sha256+'`\n\nLive/archive safety check: '+(liveError||'PASS')+'\n\nNo release action was performed.\n');
 if(result.unfilteredProvesExpectedSelection){const selected=unfilteredList.body.workflow_runs.find(r=>r.id===Number(expected));assertStableReleaseRun(selected,{repository:REPO,runId:expected});}
 demand(result.provesExpectedSelection,'Proposed API query/selector did NOT select the known stable run '+expected+'; do not treat PR70 as a demonstrated fix');
 demand(liveError===null,'Live/archive safety check failed: '+liveError);
}
module.exports={compareHistories,assertSelectorMatchesController};
if(require.main===module)main().catch(e=>{console.error(e.message);process.exitCode=1;});
