/* Inspector-only road transactions. The existing planner owns geometry/costs. */
let sc69Epoch=0;
for(const event of ['sc-city-started','sc-city-restored'])window.addEventListener(event,()=>sc69Epoch++);
function sc69Plan(id){
 const b=buildings.find(b=>b.id===id&&b.team===0&&alive(b)&&b.type!=='road');if(!b)return null;
 const p=scConnectPlan(b);if(!p)return null;
 return {id:b.id,epoch:sc69Epoch,cityId:window.scCitySave.status().cityId,cost:p.cost,blocked:p.blocked||0,start:{x:b.x,y:b.y},target:{id:p.target.id,x:p.target.x,y:p.target.y},points:p.points.map(p=>({x:p.x,y:p.y}))};
}
window.scSettlementAccess=Object.freeze({
 plan:sc69Plan,
 connect(id,expected){
  if(!scVillageActionReady()||inspectedBuilding?.id!==id||!window.scCaravan.activationAllowed()||!window.sc50UI.activationAllowed())return {ok:false,reason:'Select this building again before connecting.'};
  const plan=sc69Plan(id);if(!expected||!plan||JSON.stringify(expected)!==JSON.stringify(plan))return {ok:false,reason:'City or route changed. Preview the path again.'};
  if(plan.blocked)return {ok:false,reason:'No clear path: water or an obstacle blocks this route.'};
  if(!plan.points.length)return {ok:false,reason:'Already connected to the nearest town anchor.'};
  const result=scConnectToTown(buildings.find(b=>b.id===id));if(result.ok&&result.placed){window.scConnectUsed=true;updateUI();msg('Path laid to town for '+result.cost+' stone.');}return result;
 }
});
