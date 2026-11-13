// Controlled chapter engine fixtures; not resource-funded play evidence.
const adapter=`window.__charterTest={
 advance(seconds){for(let n=0;n<seconds*4;n++)tick(.25);},
 neighborhood(){nodes=[];addBuilding(0,'house',1250,600);addBuilding(0,'well',1180,600);addBuilding(0,'farm',1250,400);for(const x of [1206,1250,1294])addBuilding(0,'road',x,550);population=20;food=90;assignEmployment();updateUI();},
 project(type){const site=scStartConstruction(type,{x:1320,y:650});selected=units.filter(u=>u.type==='worker');scConstructionAssign(site.id);for(const u of selected){u.x=site.x;u.y=site.y;}return site.id;},
 finish(id){const site=scConstructionSites.find(s=>s.id===id);site.progress=site.required-.01;scConstructionTick(.25);},
 shortage(){food=0;for(const b of buildings)if(b.type==='farm')b.cityWorkPaused=true;},
 move(id,x,y){const b=buildings.find(b=>b.id===id);b.x=x;b.y=y;},
 remove(id){buildings=buildings.filter(b=>b.id!==id);updateUI();}
};`;
module.exports={adapter};
