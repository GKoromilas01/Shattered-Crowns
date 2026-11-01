const fs=require('node:fs');const path=require('node:path');
const safeName=name=>name.replace(/[^a-zA-Z0-9_-]/g,'_');
function prunePassedTraces(root,events){for(const e of events)if(e.type==='test:pass')fs.rmSync(path.join(root,safeName(e.name),'trace.zip'),{force:true})}
module.exports={safeName,prunePassedTraces};
