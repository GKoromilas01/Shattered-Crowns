// Earned settlement recognition. Snapshots never create charter/save state.
let scGrowthState=null;
function scGrowthSnapshot(){
 const city=scScenario==='city',owned=cityOwned(),network=getRoadNetwork(),staff=cityAllocateEmployment(owned.filter(b=>cityJobSlots[b.type]));
 const served=owned.filter(b=>b.type==='house').filter(h=>{const t=houseTier(h,{owned,network});return t.water&&t.access;}).length;
 const market=owned.some(b=>b.type==='market'&&marketHasTradeAccess(b,network)&&(staff.byId.get(b.id)?.efficiency||0)>=.5);
 const demand=Math.ceil(population*.45*(window.scRationFactor||1)),production=owned.reduce((n,b)=>n+(b.type==='farm'?13:b.type==='fishery'?9:0)*(staff.byId.get(b.id)?.efficiency||0),0);
 const checks=[
  {id:'residents',label:'20 residents',value:population,goal:20,ok:population>=20},
  {id:'homes',label:'6 homes with water and road access',value:served,goal:6,ok:served>=6},
  {id:'happiness',label:'Happiness 65 or higher',value:Math.round(happiness*10)/10,goal:65,ok:happiness>=65},
  {id:'market',label:'Road-connected Market at half staffing or better',ok:market},
  {id:'food',label:'Food production covers demand, four cycles stored, latest cycle without shortage',ok:production>=demand&&food>=demand*4&&!!cityLedger&&cityLedger.shortfall===0}
 ];
 const earned=!!scGrowthState,canPay=gold>=80&&(scTownState?.planks||0)>=8;
 return {tier:earned?'Town':'Village',earned,charteredAt:scGrowthState?.charteredAt??null,supported:city,checks,eligible:city&&!earned&&checks.every(x=>x.ok),canPay,gold,planks:scTownState?.planks||0,cost:{gold:80,planks:8}};
}
function scGrowthClaim(){
 if(!scVillageActionReady()||!scCaravan.activationAllowed()||!window.sc50UI?.activationAllowed())return false;
 const s=scGrowthSnapshot();if(!s.eligible||!s.canPay)return false;
 gold-=80;scTownState.planks-=8;scGrowthState={version:1,charteredAt:elapsed};updateUI();scTownChanged();window.dispatchEvent(new Event('sc-settlement-changed'));msg('Town charter earned. Build a Market loading yard for mixed-cargo commissions.');return true;
}
function scGrowthTradeReady(){return !!scGrowthState&&scTradePolicyReady()&&cityOwned().some(b=>b.type==='market'&&marketHasTradeAccess(b)&&(employment.byId.get(b.id)?.efficiency||0)>=.5);}
function scGrowthPrepare(q,data){
 if(data.schema<12)return null;
 if(data.campaign?.mode!=='city'||!q||typeof q!=='object'||Array.isArray(q)||Object.keys(q).length!==2||q.version!==1||!Object.hasOwn(q,'charteredAt')||!Number.isFinite(q.charteredAt)||q.charteredAt<0||q.charteredAt>data.state.clock.elapsed)throw Error('Invalid Town charter. Your city has not changed.');
 return scClone(q);
}
window.scSettlementGrowth=Object.freeze({snapshot:scGrowthSnapshot,claim:scGrowthClaim});
