const fs=require('node:fs');const path=require('node:path');
const safeName=name=>name.replace(/[^a-zA-Z0-9_-]/g,'_');
function prunePassedTraces(root,events){for(const e of events)if(e.type==='test:pass')fs.rmSync(path.join(root,safeName(e.name),'trace.zip'),{force:true})}
function writeJUnit(root,events){
 const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
 const failures=events.filter(e=>e.type==='test:fail').length;
 const cases=events.map(e=>'<testcase name="'+escape(e.name)+'" time="'+((e.durationMs||0)/1000)+'">'+(e.type==='test:fail'?'<failure message="'+escape(e.error||'See test-output.txt')+'">'+escape(e.error||'See test-output.txt')+'</failure>':'')+'</testcase>').join('');
 fs.writeFileSync(path.join(root,'junit.xml'),'<?xml version="1.0" encoding="UTF-8"?><testsuite tests="'+events.length+'" failures="'+failures+'">'+cases+'</testsuite>\n');
}
module.exports={safeName,prunePassedTraces,writeJUnit};
