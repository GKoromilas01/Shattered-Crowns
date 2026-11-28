// Optional charter state is part of native checkpoints, never a localStorage sidecar.
let scWinterState=null;
function scWinterFacts(){const owned=buildings.filter(b=>b.team===0&&alive(b)),s=citySnapshot();return {houses:owned.filter(b=>b.type==='house').length,producer:s.workforce.sites.some(b=>['farm','fishery'].includes(b.type)&&!b.paused&&b.filled>0),population,happiness,gold,wood,stone,food,production:s.food.production,demand:s.food.demand,army:units.filter(u=>u.team===0&&alive(u)&&['soldier','archer'].includes(u.type)).length,tower:owned.some(b=>b.type==='tower')}}
function scWinterChanged(message){if(message)msg(message);window.scBuildingMenus?.render(true);window.dispatchEvent(new Event('sc-winter-changed'));}
function scWinterAllowed(){return scScenario==='city'&&scVillageActionReady()&&window.scCaravan.activationAllowed()&&window.sc50UI.activationAllowed();}
window.scFirstWinter=Object.freeze({
 snapshot:()=>({supported:scScenario==='city',state:scClone(scWinterState),remaining:scWinterState?Math.max(0,scWinterState.startedAt+480-elapsed):480,event:window.scWinterRules.pending(scWinterState,elapsed),checks:window.scWinterRules.checks(scWinterFacts())}),
 start:()=>{if(!scWinterAllowed()||scWinterState)return {ok:false};scNavalEnsure();scWinterState=window.scWinterRules.start(elapsed);scWinterChanged('First Winter charter begun. Review readiness and three council decisions at your Keep.');return {ok:true}},
 choose:action=>{if(!scWinterAllowed())return {ok:false};const r=window.scWinterRules.choose(scWinterState,elapsed,action,{gold,wood,stone,food});if(!r.ok)return r;for(const [k,v] of Object.entries(r.delta)){if(k==='gold')gold+=v;else if(k==='wood')wood+=v;else if(k==='stone')stone+=v;else if(k==='food')food+=v;else if(k==='happiness')happiness=clamp(happiness+v,0,100)}scWinterState=r.state;updateUI();scWinterChanged('Winter council decision recorded.');return {ok:true}},
 assess:()=>{if(!scWinterAllowed())return {ok:false};const r=window.scWinterRules.assess(scWinterState,elapsed,scWinterFacts());if(r.ok){scWinterState=r.state;scWinterChanged(r.message)}return r}
});
