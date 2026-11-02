const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const YAML=require('yaml');
test('Feature branches run required verification before PR without becoming release candidates',()=>{
 const w=YAML.parse(fs.readFileSync('.github/workflows/chromium-regressions.yml','utf8'));
 assert.ok(w.on.push.branches.includes('feat/**'),'Feature pushes must run CI before a PR exists');
 assert.ok(w.on.push.branches.includes('main'));
 assert.equal(w.permissions.contents,'read');assert.equal(w.permissions.pages,undefined);
 assert.deepEqual(w.jobs['required-ci'].needs,['verify','live-smoke']);
 const release=YAML.parse(fs.readFileSync('.github/workflows/verified-pages-release.yml','utf8'));
 assert.deepEqual(Object.keys(release.on),['workflow_dispatch']);assert.equal(release.jobs.release.environment.name,'production');assert.match(release.jobs.release.if,/refs\/heads\/main/);
 const {assertVerifiedRun}=require('../scripts/release.cjs'),sha='a'.repeat(40),repository='GKoromilas01/Shattered-Crowns';
 assert.throws(()=>assertVerifiedRun({id:42,path:'.github/workflows/chromium-regressions.yml',head_sha:sha,head_branch:'feat/city-services-happiness',event:'push',status:'completed',conclusion:'success',repository:{full_name:repository}},{repository,sourceSha:sha,runId:'42'}),/main/);
});
