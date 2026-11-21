// Read authoritative model state: the hover export refreshes only on animation frames.
function roadState(){return window.scCitySave.capture().state.buildings.filter(b=>b.team===0&&b.type==='road').map(b=>({x:b.x,y:b.y}));}
module.exports={roadState};
