/* v0.29 war cost model (data + pure functions, not yet wired into combat).
   Waging war hurts the aggressor's economy and politics, growing the longer it lasts.
   A win pays back, but only if won, and long wars eat the prize. Units: gold-equivalent per season-day. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.scWarCosts=api;})(typeof window!=='undefined'?window:globalThis,function(){
const CFG={
 declareStanding:{unjust:-18,justified:-6},   // political standing hit when declaring (aggressor)
 declareStability:{unjust:-8,justified:-3},   // unrest from conscription and rumour
 econBase:0.08, econGrowthPerDay:0.012, econCap:0.40, // output lost by the aggressor
 defenderEconBase:0.05, defenderGrowthPerDay:0.006, defenderCap:0.25,
 upkeepPerSoldierDay:0.6,                     // gold per soldier per day
 embargoFromTargetAllies:true,
 warWeariness:{perDay:0.5,cap:25},            // extra stability loss over time (aggressor)
 victoryShare:0.30,                           // share of defender wealth taken as tribute and spoils
 victoryRoutes:0.10,                          // lasting trade/territory value, as share of wealth
 loss:{reparationShare:0.25,standing:-12,stability:-10}
};
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function declare(justified){const k=justified?'justified':'unjust';return {standing:CFG.declareStanding[k],stability:CFG.declareStability[k],embargo:!justified};}
function economyPenalty(days,role){const aggressor=role!=='defender';const base=aggressor?CFG.econBase:CFG.defenderEconBase,g=aggressor?CFG.econGrowthPerDay:CFG.defenderGrowthPerDay,cap=aggressor?CFG.econCap:CFG.defenderCap;return clamp(base+g*Math.max(0,days),0,cap);}
function weariness(days){return clamp(CFG.warWeariness.perDay*Math.max(0,days),0,CFG.warWeariness.cap);}
function dailyCost(o){const{days=0,soldiers=0,income=100,role='aggressor'}=o;return soldiers*CFG.upkeepPerSoldierDay+income*economyPenalty(days,role);}
function totalCost(o){let t=0;for(let d=0;d<o.days;d++)t+=dailyCost({...o,days:d});return Math.round(t);}
function victoryReward(o){const{defenderWealth=1000,days=0}=o;const decay=clamp(1-days/120,0.25,1);return Math.round(defenderWealth*(CFG.victoryShare+CFG.victoryRoutes)*decay);}
function lossCost(o){return Math.round((o.ownWealth||1000)*CFG.loss.reparationShare);}
function netIfWon(o){return victoryReward(o)-totalCost(o);}
function netIfLost(o){return -(totalCost(o)+lossCost(o));}
return {CFG,declare,economyPenalty,weariness,dailyCost,totalCost,victoryReward,lossCost,netIfWon,netIfLost};
});
