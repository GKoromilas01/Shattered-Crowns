// Authoritative v0.26 production and supplier transactions. UI reads copies only.
let scTownState=null;
const scTownFresh=()=>({version:1,planks:0,reservedBaskets:0,reservationTarget:0,stage:0,nextShipmentId:1,journey:null,history:[],yards:[],upgrades:[]});
function scTownEnsure(){if(!scTownState){scTownState=scTownFresh();if(scScenario==='city')scRegionalEnsure();}return scTownState;}
function scTownChanged(){window.dispatchEvent(new Event('sc-trade-town-changed'));}
function scTownCycle(){
 const workshops=buildings.filter(b=>b.team===0&&b.type==='workshop'&&alive(b));if(!workshops.length)return;
 const q=scTownEnsure();for(const b of workshops){const efficiency=employment.byId.get(b.id)?.efficiency||0;const amount=Math.min(efficiency,Math.max(0,200-q.planks),wood/4);if(amount>0){wood-=amount*4;q.planks+=amount;}}
 scTownChanged();
}
function scTownFillReservation(){if(!scTownState)return;const q=scTownState,amount=Math.min(Math.max(0,q.reservationTarget-q.reservedBaskets),Math.floor(tradeGoods));if(amount>0){tradeGoods-=amount;q.reservedBaskets+=amount;scTownChanged();}}
function scTownSupported(){return scScenario==='city'&&['home','brookstead'].includes(scOriginId);}
function scTownReady(){return scTownSupported()&&scRegional?.followup?.phase==='complete'&&scRegionalEligibility().eligible;}
function scTownReserve(count){
 if(!scTownSupported()||!scVillageActionReady()||!Number.isSafeInteger(count)||count<0||count>32)return false;
 const q=scTownEnsure(),release=Math.max(0,q.reservedBaskets-count);if(tradeGoods+release>80)return false;
 tradeGoods+=release;q.reservedBaskets-=release;q.reservationTarget=count;scTownFillReservation();updateUI();scTownChanged();return true;
}
function scTownTerms(stage,kind,choice=null,batches=1){
 if(kind==='agreement'){
  if(batches!==1||stage<0||stage>2||stage!==2&&choice!==null||stage===2&&!['timber','food'].includes(choice))return null;
  return stage===0?{planks:8,baskets:0,gold:40}:stage===1?{planks:0,baskets:12,gold:54}:choice==='timber'?{planks:12,baskets:4,gold:90}:{planks:4,baskets:16,gold:90};
 }
 if(stage!==3||![1,2].includes(batches)||choice!==null)return null;
 return kind==='standing-planks'?{planks:8*batches,baskets:0,gold:36*batches}:kind==='standing-baskets'?{planks:0,baskets:12*batches,gold:51*batches}:null;
}
function scTownHasYard(){return !!scTownState?.yards.some(link=>buildings.some(b=>b.id===link.marketId&&b.type==='market'&&alive(b))&&buildings.some(b=>b.id===link.yardId&&b.type==='loadingyard'&&alive(b)));}
function scTownDispatch(kind,choice=null,batches=1){
 if(!scTownReady()||!scCaravan.activationAllowed())return false;const q=scTownEnsure(),terms=scTownTerms(q.stage,kind,choice,batches);
 if(!terms||q.journey||q.history.length>=512||kind!=='agreement'&&!scTownHasYard()||q.planks+1e-8<terms.planks||q.reservedBaskets<terms.baskets)return false;
 q.planks=Math.max(0,q.planks-terms.planks);q.reservedBaskets-=terms.baskets;q.reservationTarget=Math.max(q.reservedBaskets,q.reservationTarget-terms.baskets);
 q.journey={id:q.nextShipmentId++,kind,stage:q.stage,choice,batches,progress:0,phase:'outbound',departedAt:elapsed,completedAt:null,cargo:{planks:terms.planks,baskets:terms.baskets},gold:terms.gold};updateUI();scTownChanged();return true;
}
function scTownTick(dt){
 const q=scTownState,j=q?.journey;if(scScenario!=='city'||ended||!j)return;j.progress=Math.min(120,j.progress+dt);
 if(j.progress>=120){j.progress=120;j.phase='complete';j.completedAt=elapsed;gold+=j.gold;q.history.push(scClone(j));if(j.kind==='agreement')q.stage++;q.journey=null;msg('Ironmere supplier order returned: +'+j.gold+' gold credited.');updateUI();scTownChanged();}
 else if(j.progress>=60)j.phase='returning';
}
function scTownUpgrade(marketId){
 const q=scTownState;if(!q||q.stage!==3||!scTownSupported()||!scVillageActionReady()||!scCaravan.activationAllowed())return false;
 const market=buildings.find(b=>b.id===marketId&&b.team===0&&b.type==='market'&&alive(b));if(!market||q.upgrades.some(x=>x.marketId===marketId)||q.yards.some(x=>x.marketId===marketId&&buildings.some(b=>b.id===x.yardId&&alive(b))))return false;
 if(wood<60||gold<80||stone<30||q.planks<8)return false;
 let plot=null;for(const r of [75,100,125])for(const [dx,dy]of [[1,0],[-1,0],[0,1],[0,-1],[.71,.71],[-.71,.71],[.71,-.71],[-.71,-.71]]){const p={x:market.x+dx*r,y:market.y+dy*r};if(canPlace('loadingyard',p,null)){plot=p;break;}if(plot)break;}
 if(!plot)return false;q.yards=q.yards.filter(x=>x.marketId!==marketId);wood-=60;gold-=80;stone-=30;q.planks-=8;const site=scStartConstruction('loadingyard',plot);q.upgrades.push({siteId:site.id,marketId,planks:8});scRecordUndo({kind:'build',ids:[site.id],gold:80,wood:60,stone:30,label:'Market loading yard'});updateUI();scTownChanged();return site.id;
}
function scTownComplete(site){const q=scTownState;if(!q||site.type!=='loadingyard')return;const link=q.upgrades.find(x=>x.siteId===site.id);if(link){q.yards=q.yards.filter(x=>x.marketId!==link.marketId);q.yards.push({marketId:link.marketId,yardId:site.id});q.upgrades=q.upgrades.filter(x=>x!==link);scTownChanged();}}
function scTownCancel(site,remainder){const q=scTownState;if(!q)return;const link=q.upgrades.find(x=>x.siteId===site.id);if(link){q.planks+=link.planks*remainder;q.upgrades=q.upgrades.filter(x=>x!==link);scTownChanged();}}
function scTownUndo(ids){if(!scTownState)return;for(const link of scTownState.yards.filter(x=>ids.has(x.yardId))){scTownState.planks+=8;scTownState.yards=scTownState.yards.filter(x=>x!==link);}scTownChanged();}
function scTownSnapshot(){const q=scTownState||scTownFresh(),reasons=[];if(!scTownSupported())reasons.push('Supplier agreements are available in Marches home and Brookstead.');else if(scRegional?.followup?.phase!=='complete')reasons.push('Finish Ironmere’s existing first shipment and follow-up first.');else reasons.push(...scRegionalEligibility().reasons);return {...scClone(q),supported:scTownSupported(),ready:reasons.length===0,reasons,hasYard:scTownHasYard(),saleBaskets:tradeGoods,wood,gold,stone};}
function scTownPrepare(q,data){
 const fail=()=>{throw Error('Invalid workshop, reservation or supplier checkpoint. Your city has not changed.');};
 const exact=(o,fields)=>{if(!o||typeof o!=='object'||Array.isArray(o)||Object.keys(o).length!==fields.length||Object.keys(o).some(k=>!fields.includes(k)))fail();};
 const num=(n,min=0,max=1e12,integer=false)=>{if(!Number.isFinite(n)||n<min||n>max||integer&&!Number.isSafeInteger(n))fail();};
 const list=(v,max)=>{if(!Array.isArray(v)||v.length>max)fail();};const id=n=>num(n,1,data.state.nextId-1,true),clock=data.state.clock.elapsed;
 exact(q,['version','planks','reservedBaskets','reservationTarget','stage','nextShipmentId','journey','history','yards','upgrades']);if(q.version!==1)fail();num(q.planks);num(q.reservedBaskets,0,32,true);num(q.reservationTarget,q.reservedBaskets,32,true);num(q.stage,0,3,true);list(q.history,512);list(q.yards,5000);list(q.upgrades,5000);
 let stage=0,lastReturn=data.state.regional?.followup?.outcome?.completedAt||0;
 function shipment(j,completed,index){
  exact(j,['id','kind','stage','choice','batches','progress','phase','departedAt','completedAt','cargo','gold']);if(j.id!==index+1||j.stage!==stage)fail();const terms=scTownTerms(stage,j.kind,j.choice,j.batches);if(!terms)fail();exact(j.cargo,['planks','baskets']);if(j.cargo.planks!==terms.planks||j.cargo.baskets!==terms.baskets||j.gold!==terms.gold)fail();num(j.departedAt,lastReturn,clock);num(j.progress,0,120);if(completed){if(j.phase!=='complete'||j.progress!==120)fail();num(j.completedAt,j.departedAt+120-1e-5,clock);lastReturn=j.completedAt;if(j.kind==='agreement')stage++;}else if(j.completedAt!==null||!['outbound','returning'].includes(j.phase)||j.progress>=120||j.phase==='outbound'&&j.progress>=60||j.phase==='returning'&&j.progress<60||Math.abs(j.progress-(clock-j.departedAt))>1e-5)fail();
 }
 q.history.forEach((j,i)=>shipment(j,true,i));if(stage!==q.stage)fail();if(q.journey!==null)shipment(q.journey,false,q.history.length);if(q.nextShipmentId!==q.history.length+(q.journey?2:1))fail();
 if((q.stage||q.journey||q.history.length)&&data.state.regional?.followup?.phase!=='complete')fail();
 if((q.stage||q.journey||q.history.length||q.reservationTarget||q.yards.length||q.upgrades.length)&&!['home','brookstead'].includes(data.campaign.originId||'home'))fail();
 const marketIds=new Set(),siteIds=new Set();for(const link of q.upgrades){exact(link,['siteId','marketId','planks']);id(link.siteId);id(link.marketId);if(link.siteId===link.marketId||data.state.units.some(u=>u.id===link.marketId)||link.planks!==8||marketIds.has(link.marketId)||siteIds.has(link.siteId)||!data.state.construction.some(s=>s.id===link.siteId&&s.type==='loadingyard'))fail();marketIds.add(link.marketId);siteIds.add(link.siteId);const m=data.state.buildings.find(b=>b.id===link.marketId);if(m&&m.type!=='market')fail();}
 for(const link of q.yards){exact(link,['marketId','yardId']);id(link.marketId);id(link.yardId);if(link.marketId===link.yardId||data.state.units.some(u=>u.id===link.marketId||u.id===link.yardId)||marketIds.has(link.marketId)||siteIds.has(link.yardId))fail();marketIds.add(link.marketId);siteIds.add(link.yardId);const m=data.state.buildings.find(b=>b.id===link.marketId),yard=data.state.buildings.find(b=>b.id===link.yardId);if(m&&m.type!=='market'||yard&&yard.type!=='loadingyard')fail();}
 if((q.upgrades.length||q.yards.length)&&q.stage!==3)fail();for(const s of data.state.construction.filter(s=>s.type==='loadingyard'))if(!q.upgrades.some(x=>x.siteId===s.id))fail();for(const b of data.state.buildings.filter(b=>b.type==='loadingyard'))if(!q.yards.some(x=>x.yardId===b.id))fail();return scClone(q);
}
function scTownArmWorkshop(){if(scScenario!=='city'||!scVillageActionReady()||wood<80||gold<60||stone<25)return false;scTownEnsure();mode='workshop';wallPointer=null;msg('Carpenters’ Workshop: 80 wood, 60 gold, 25 stone. Choose a legal plot; real builders complete it.');updateUI();return true;}
window.scTradeTown=Object.freeze({armWorkshop:scTownArmWorkshop,snapshot:scTownSnapshot,reserveBaskets:scTownReserve,dispatch:scTownDispatch,upgrade:scTownUpgrade});
