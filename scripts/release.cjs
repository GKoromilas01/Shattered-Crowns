const fs=require('node:fs');const path=require('node:path');const crypto=require('node:crypto');const {execFileSync}=require('node:child_process');
const SHA=/^[a-f0-9]{40}$/;const FILES=['index.html','release-manifest.json','release.json'];
function demand(ok,message){if(!ok)throw new Error(message)}
const digest=data=>crypto.createHash('sha256').update(data).digest('hex');
function validMeta(m){demand(SHA.test(m.sourceSha),'Invalid source SHA');demand(/^\d+$/.test(String(m.verificationRunId)),'Invalid verification run ID')}
function buildSite(root,out,meta){
 validMeta(meta);const index=fs.readFileSync(path.join(root,'index.html'));const bytes=fs.readFileSync(path.join(root,'release.json'));const release=JSON.parse(bytes);
 demand(/^\d+\.\d+\.\d+$/.test(release.version),'Invalid release version');
 demand(!fs.existsSync(out),'Output directory already exists; refusing stale artifact files');fs.mkdirSync(out,{recursive:true});
 const manifest={format:1,version:release.version,sourceSha:meta.sourceSha,verificationRunId:String(meta.verificationRunId),files:{'index.html':digest(index),'release.json':digest(bytes)}};
 fs.writeFileSync(path.join(out,'index.html'),index);fs.writeFileSync(path.join(out,'release.json'),bytes);fs.writeFileSync(path.join(out,'release-manifest.json'),JSON.stringify(manifest,null,2)+'\n');return manifest;
}
function verifySite(dir,expected={}){
 demand(JSON.stringify(fs.readdirSync(dir).sort())===JSON.stringify(FILES),'Unexpected or missing artifact files');
 for(const name of FILES)demand(fs.lstatSync(path.join(dir,name)).isFile()&&!fs.lstatSync(path.join(dir,name)).isSymbolicLink(),'Artifact must contain regular files, never symlinks');
 const m=JSON.parse(fs.readFileSync(path.join(dir,'release-manifest.json')));validMeta(m);demand(m.format===1,'Unsupported manifest format');
 demand(m.files&&JSON.stringify(Object.keys(m.files).sort())===JSON.stringify(['index.html','release.json']),'Unexpected manifest files');
 for(const name of ['index.html','release.json'])demand(m.files[name]===digest(fs.readFileSync(path.join(dir,name))),'Artifact checksum mismatch: '+name);
 const release=JSON.parse(fs.readFileSync(path.join(dir,'release.json')));demand(/^\d+\.\d+\.\d+$/.test(m.version)&&m.version===release.version,'Release version mismatch');
 if(expected.sourceSha)demand(m.sourceSha===expected.sourceSha,'Source SHA does not match approved candidate');
 if(expected.verificationRunId)demand(m.verificationRunId===String(expected.verificationRunId),'Verification run does not match approved candidate');return m;
}
function verifyGitSource(dir,{cwd='.',bootstrap}={}){
 const m=verifySite(dir);
 const read=name=>execFileSync('git',['show',m.sourceSha+':'+name],{cwd,stdio:['ignore','pipe','pipe']});
 demand(digest(read('index.html'))===m.files['index.html'],'Artifact game does not match immutable committed Git source');
 if(bootstrap&&m.sourceSha===bootstrap.sourceSha&&m.verificationRunId==='0')demand(m.files['index.html']===bootstrap.indexSha256,'Wrong pinned bootstrap Git source');
 else demand(digest(read('release.json'))===m.files['release.json'],'Artifact version does not match committed Git source');
 return m;
}
function assertLiveSite({bytes,manifest},fallback,{bootstrap=false}={}){
 demand(digest(bytes)===fallback.files['index.html'],'Current live game bytes differ from the verified fallback');
 if(manifest===null){demand(bootstrap,'Managed production metadata is missing');return;}
 for(const key of ['format','version','sourceSha','verificationRunId'])demand(manifest[key]===fallback[key],'Current live metadata differs from the verified fallback');
 for(const name of ['index.html','release.json'])demand(manifest.files?.[name]===fallback.files[name],'Current live metadata checksum differs from the verified fallback');
}
function assertVerifiedRun(run,{repository,sourceSha,runId}){
 demand(SHA.test(sourceSha),'Invalid source SHA');demand(String(run.id)===String(runId),'Wrong verification run');
 demand(run.repository?.full_name===repository,'Foreign repository is not trusted');
 demand(run.path==='.github/workflows/chromium-regressions.yml','Wrong verification workflow');
 demand(run.head_sha===sourceSha&&run.head_branch==='main','Candidate must be verified on main');
 demand(['push','workflow_dispatch'].includes(run.event),'PR runs cannot authorize production');
 demand(run.status==='completed'&&run.conclusion==='success','Verification run must complete successfully');
}
function assertStableReleaseRun(run,{repository,runId}){
 demand(String(run.id)===String(runId)&&run.repository?.full_name===repository,'Wrong stable release repository or run');
 demand(run.path==='.github/workflows/verified-pages-release.yml'&&run.event==='workflow_dispatch'&&run.head_branch==='main','Rollback requires protected main release history');
 demand(run.status==='completed'&&run.conclusion==='success','Stable release must have completed successfully');
}
function assertPromotion({sourceSha,currentMain,rollback}){demand(SHA.test(sourceSha)&&SHA.test(currentMain),'Invalid source SHA');demand(rollback===true||sourceSha===currentMain,'Ordinary release must match current main; select rollback explicitly for an older version')}
function assertProtectedEnvironment(environment){demand(environment?.protection_rules?.some(r=>r.type==='required_reviewers'&&r.reviewers?.length>0),'Production protection must contain required reviewers; missing or unreadable protection fails closed')}
function selectArtifact(artifacts,name){const matches=artifacts.filter(a=>a.name===name&&!a.expired);demand(matches.length===1,matches.length?'Ambiguous candidate artifact':'Missing or expired '+name+' artifact');return matches[0]}

module.exports={buildSite,verifySite,verifyGitSource,assertLiveSite,assertVerifiedRun,assertStableReleaseRun,assertPromotion,assertProtectedEnvironment,selectArtifact,digest,demand};
if(require.main===module){
 try{
  const [command,arg='dist']=process.argv.slice(2);
  if(command==='build'){
   const sha=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();for(const name of ['index.html','release.json'])demand(execFileSync('git',['show',sha+':'+name]).equals(fs.readFileSync(name)),'Site differs from tested committed source: '+name);
   console.log(JSON.stringify(buildSite('.',arg,{sourceSha:sha,verificationRunId:process.env.GITHUB_RUN_ID||'0'})));
  }else if(command==='verify')console.log(JSON.stringify(verifySite(arg,{sourceSha:process.env.EXPECTED_RELEASE_SHA,verificationRunId:process.env.EXPECTED_RUN_ID})));
  else throw new Error('Usage: node scripts/release.cjs build|verify [directory]');
 }catch(error){console.error(error.message);process.exitCode=1;}
}
