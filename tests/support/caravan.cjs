const {adapter:chapter}=require('./first-charter.cjs');
// Controlled engine fixtures only. Resource-funded routes are separate tests.
const adapter=chapter+`window.__caravanTest={
 advance(seconds){for(let left=seconds;left>1e-8;left-=.25)tick(Math.min(.25,left));},
 prepare(){__charterTest.neighborhood();addBuilding(0,'market',1190,600);wood=80;assignEmployment();updateUI();},
 wood(n){wood=n;updateUI();},
 market(remove=false){const m=buildings.find(b=>b.type==='market'&&b.team===0);if(remove){m.hp=0;buildings=buildings.filter(alive);}else m.cityWorkPaused=true;assignEmployment();updateUI();},
 inspect(){const m=buildings.find(b=>b.type==='market'&&b.team===0);inspectedBuilding=m;window.scRTSInspectedBuilding=m;updateUI();window.dispatchEvent(new CustomEvent('sc-building-inspected',{detail:{building:m}}));}
};`;
module.exports={adapter};
