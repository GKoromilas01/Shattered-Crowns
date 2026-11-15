const {adapter}=require('./caravan.cjs');
const townAdapter=adapter+`window.__townTest={
 prepare(){__caravanTest.prepare();addBuilding(0,'granary',1200,490);addBuilding(0,'bakery',1240,490);addBuilding(0,'workshop',1130,440);food=200;wood=1000;gold=2000;stone=500;assignEmployment();updateUI();},
 cycle(){tick(5-cityTimer);},advance(n){for(let left=n;left>1e-8;left-=.25)tick(Math.min(.25,left));},
 ready(){this.prepare();this.advance(5);if(!scCaravan.dispatch())throw Error('first dispatch');this.advance(120);this.advance(5);if(!scCaravan.dispatchFollowup('gold'))throw Error('old followup');this.advance(120);},
 stock(woodValue,foodValue){wood=woodValue;food=foodValue;updateUI();},
 workshop(){return buildings.find(b=>b.type==='workshop');},
 selectWorkers(){selected=units.filter(u=>u.type==='worker');},
 pauseWorkshop(value){this.workshop().cityWorkPaused=value;assignEmployment();},
 basketStock(n){tradeGoods=n;},
 finish(id){const s=scConstructionSites.find(s=>s.id===id);selected=units.filter(u=>u.type==='worker');scConstructionAssign(id);for(const u of selected){u.x=s.x;u.y=s.y;}s.progress=s.required-.01;scConstructionTick(.25);},
 market(){return buildings.find(b=>b.type==='market');},
 loseMarket(){const b=this.market();b.hp=0;buildings=buildings.filter(alive);updateUI();}
};`;
module.exports={adapter:townAdapter};
