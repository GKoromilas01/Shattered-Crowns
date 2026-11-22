// Authoritative harbour state. Naval IDs are separate from land entity IDs.
let scNavalState=null;
const scNavalFresh=()=>({version:3,nextBoatId:1,orders:[],boats:[]});
function scNavalEnsure(){scTownEnsure();return scNavalState||(scNavalState=scNavalFresh());}
const scNavalPlot=p=>!!p&&Number.isFinite(p.x)&&p.x>60&&p.x<W-90&&p.y===755&&!(p.x>445&&p.x<550);
const scNavalWater=p=>!!p&&Number.isFinite(p.x)&&Number.isFinite(p.y)&&p.x>=35&&p.x<=W-35&&p.y>=820&&p.y<=H-25;
const scNavalYard=id=>buildings.find(b=>b.id===id&&b.type==='shipyard'&&b.team===0&&alive(b)&&scNavalPlot(b));
function scNavalChanged(){window.dispatchEvent(new Event('sc-harbour-changed'));}
function scNavalPlace(p){
 if(!scVillageActionReady()||!scNavalPlot(p)||!canPlace('shipyard',p,null)||wood<120||gold<90||stone<40)return false;
 scNavalEnsure();wood-=120;gold-=90;stone-=40;const site=scStartConstruction('shipyard',p);scRecordUndo({kind:'build',ids:[site.id],gold:90,wood:120,stone:40,label:'shipyard'});updateUI();scNavalChanged();return true;
}
const scNavalKinds=Object.freeze({trade:Object.freeze({label:'Trade ship',factory:'shipyard',wood:100,gold:60,seconds:40,hp:100}),warship:Object.freeze({label:'Warship',factory:'shipyard',wood:80,gold:40,seconds:30,hp:160}),fishing:Object.freeze({label:'Fishing boat',factory:'fishery',wood:60,gold:25,seconds:20,hp:60})});
const scNavalFacilityEligible=b=>!!b&&b.team===0&&alive(b)&&(['shipyard','fishery'].includes(b.type))&&Number.isFinite(b.x)&&b.x>60&&b.x<W-90&&b.y>=720&&b.y<=780&&!(b.x>445&&b.x<550);
const scNavalFacility=id=>buildings.find(b=>b.id===id&&scNavalFacilityEligible(b));
const scNavalKindFor=b=>b.type==='fishery'?'fishing':'warship';
function scNavalOrder(id,kind){
 const factory=scNavalFacility(id);if(!scVillageActionReady()||!factory)return false;if(kind===undefined)kind=scNavalKindFor(factory);if(typeof kind!=='string')return false;const def=Object.hasOwn(scNavalKinds,kind)?scNavalKinds[kind]:null;if(!def||def.factory!==factory.type||wood<def.wood||gold<def.gold)return false;const q=scNavalEnsure();
 if(q.boats.length+q.orders.length>=20||q.orders.some(o=>o.yardId===id)||kind==='fishing'&&q.boats.some(b=>b.homeId===id))return false;
 wood-=def.wood;gold-=def.gold;q.orders.push({yardId:id,progress:0,kind});updateUI();scNavalChanged();return true;
}
function scNavalCancel(id){if(!scVillageActionReady()||!scNavalState)return false;const q=scNavalState,i=q.orders.findIndex(o=>o.yardId===id);if(i<0)return false;const def=scNavalKinds[q.orders[i].kind];q.orders.splice(i,1);wood+=def.wood;gold+=def.gold;updateUI();scNavalChanged();return true;}
function scNavalFisheryBase(b){return 9+(scNavalState?.boats.filter(x=>x.homeId===b.id&&x.mission?.type==='fish'&&x.mission.phase==='unloading').reduce((n,x)=>n+x.mission.cargo,0)||0);}
function scNavalUnload(){for(const b of scNavalState?.boats||[])if(b.mission?.phase==='unloading'&&scNavalFacility(b.homeId)&&(employment.byId.get(b.homeId)?.efficiency||0)>0){b.mission=null;scNavalChanged();}}
const scNavalHostiles=()=>[...units,...buildings].filter(x=>x.team===1&&alive(x)&&x.y>=660&&x.y<=H);
function scNavalDispatch(id,type){
 if(!scVillageActionReady())return false;const b=scNavalState?.boats.find(x=>x.id===id),home=b&&scNavalFacility(b.homeId);
 if(!b||b.mission||!home||!['fish','trade','guard','attack'].includes(type)||({fish:'fishing',trade:'trade',guard:'warship',attack:'warship'})[type]!==b.kind)return false;
 const enemy=type==='attack'?scNavalHostiles().sort((a,c)=>Math.abs(a.x-b.x)-Math.abs(c.x-b.x))[0]:null;
 if(type==='attack'&&!enemy||type==='trade'&&tradeGoods<10||type==='fish'&&!(employment.byId.get(home.id)?.efficiency>0))return false;
 const origin={x:home.x,y:840},destination={x:Math.max(35,Math.min(W-35,type==='attack'?enemy.x:home.x+(home.x>W/2?-360:360))),y:type==='fish'?Math.min(H-25,920):840};
 b.mission={type,phase:type==='guard'?'patrol':'outbound',progress:0,cargo:type==='trade'?10:0,cargoType:type==='trade'?'goods':null,targetId:enemy?.id||null,origin,destination};
 if(type==='trade'){tradeGoods-=10;if(scNavalHostiles().length<2&&!scNavalHostiles().some(e=>Math.abs(e.x-destination.x)<180)){addUnit(1,'soldier',destination.x,740);const raider=units[units.length-1];raider.scHoldPosition=true;msg('Coastal raiders spotted near the exchange. A warship can escort your merchant.');}}b.target=type==='guard'?null:{...destination};updateUI();scNavalChanged();return true;
}
function scNavalMissionTick(b,dt){const m=b.mission;if(!m)return;
 if(m.type==='guard'||m.type==='attack'){
  const enemies=scNavalHostiles(),target=m.type==='attack'?enemies.find(x=>x.id===m.targetId):enemies.filter(x=>Math.hypot(x.x-b.x,x.y-b.y)<=200).sort((a,c)=>Math.hypot(a.x-b.x,a.y-b.y)-Math.hypot(c.x-b.x,c.y-b.y))[0];
  if(m.type==='attack'&&!target&&m.phase!=='home'){m.phase='home';b.target={...m.origin};}
  else if(m.phase!=='home'){
   if(target){b.target={x:Math.max(35,Math.min(W-35,target.x)),y:840};if(Math.hypot(target.x-b.x,target.y-b.y)<=200){const hit=Math.min(target.hp,16*dt);target.hp-=hit;stats.damage[0]+=hit;if(target.hp<=0)stats.kills[0]++;}}
   else if(m.type==='guard'){const working=scNavalState.boats.filter(x=>x.kind!=='warship'&&x.mission&&x.mission.phase!=='unloading').sort((a,c)=>Math.hypot(a.x-b.x,a.y-b.y)-Math.hypot(c.x-b.x,c.y-b.y))[0];b.target=working?{x:working.x,y:Math.max(820,Math.min(H-25,working.y))}:null;}
   return;
  }
 }
 if(m.phase==='outbound'&&!b.target){m.phase='working';m.progress=0;scNavalChanged();}
 if(m.phase==='working'){const home=scNavalFacility(b.homeId);if(!home)return;m.progress=Math.min(m.type==='fish'?10:8,m.progress+dt*(m.type==='fish'?(employment.byId.get(home.id)?.efficiency||0):1));if(m.progress>=(m.type==='fish'?10:8)){m.cargo=m.type==='fish'?6:25;m.cargoType=m.type==='fish'?'food':'gold';m.phase='home';b.target={...m.origin};scNavalChanged();}}
 if(m.phase==='home'&&!b.target&&Math.hypot(b.x-m.origin.x,b.y-m.origin.y)<1&&scNavalFacility(b.homeId)){
  if(m.type==='fish'&&m.cargo){m.phase='unloading';}else{if(m.cargoType==='goods'&&tradeGoods+m.cargo>80)return;if(m.cargoType==='goods')tradeGoods+=m.cargo;if(m.cargoType==='gold')gold+=m.cargo;b.mission=null;}updateUI();scNavalChanged();
 }
}
function scNavalSail(id,p){if(!scVillageActionReady()||!scNavalWater(p))return false;const b=scNavalState?.boats.find(b=>b.id===id);if(!b||b.mission)return false;b.target={x:p.x,y:p.y};scNavalChanged();return true;}
function scNavalStop(id){if(!scVillageActionReady())return false;const b=scNavalState?.boats.find(b=>b.id===id);if(!b||b.mission)return false;b.target=null;scNavalChanged();return true;}
function scNavalBerth(id){if(!scVillageActionReady())return false;const b=scNavalState?.boats.find(b=>b.id===id),yard=b&&scNavalFacility(b.homeId);if(!yard)return false;if(b.mission){if(b.mission.phase==='unloading')return false;b.mission.phase='home';b.target={...b.mission.origin};scNavalChanged();return true;}return scNavalSail(id,{x:yard.x,y:840});}
function scNavalTick(dt){
 if(!scNavalState||scScenario!=='city'||ended||scOverview||document.hidden)return;const q=scNavalState;
 for(const o of [...q.orders]){const y=scNavalFacility(o.yardId),def=scNavalKinds[o.kind];if(!y){q.orders=q.orders.filter(x=>x!==o);wood+=def.wood;gold+=def.gold;scNavalChanged();continue;}
  o.progress=Math.min(def.seconds,o.progress+dt*(employment.byId.get(y.id)?.efficiency||0));
  if(o.progress>=def.seconds){q.orders=q.orders.filter(x=>x!==o);let x=y.x;for(let i=0;i<40;i++){const candidate=y.x+(i%2?1:-1)*Math.ceil(i/2)*70;if(candidate>=35&&candidate<=W-35&&q.boats.every(b=>Math.hypot(b.x-candidate,b.y-840)>=55)){x=candidate;break;}}q.boats.push({id:q.nextBoatId++,homeId:y.id,x,y:840,target:null,kind:o.kind,hp:def.hp,mission:null});scNavalChanged();}
 }
 for(const enemy of scNavalHostiles().filter(x=>units.includes(x))){const near=q.boats.filter(b=>b.hp>0&&Math.hypot(b.x-enemy.x,b.y-enemy.y)<=180).sort((a,c)=>Math.hypot(a.x-enemy.x,a.y-enemy.y)-Math.hypot(c.x-enemy.x,c.y-enemy.y))[0];if(near)near.hp=Math.max(0,near.hp-4*dt);}
 const sunk=q.boats.filter(b=>b.hp<=0);if(sunk.length){q.boats=q.boats.filter(b=>b.hp>0);msg(sunk.length+' vessel(s) lost to coastal enemies, including any cargo.');scNavalChanged();}
 for(const b of q.boats){scNavalMissionTick(b,dt);if(!b.target)continue;const d=Math.hypot(b.target.x-b.x,b.target.y-b.y),step=45*dt;if(d<=step){b.x=b.target.x;b.y=b.target.y;b.target=null;}else{b.x+=(b.target.x-b.x)*step/d;b.y+=(b.target.y-b.y)*step/d;}}
}
function scNavalPrepareBase(q,data,kinds=null,durations=null){
 if(data.schema<13)return null;const fail=()=>{throw Error('Invalid harbour checkpoint. Your city has not changed.');};
 const exact=(o,fields)=>{if(!o||typeof o!=='object'||Array.isArray(o)||Object.keys(o).length!==fields.length||Object.keys(o).some(k=>!fields.includes(k)))fail()};
 const num=(n,min,max,int=false)=>{if(!Number.isFinite(n)||n<min||n>max||int&&!Number.isSafeInteger(n))fail()};
 exact(q,['version','nextBoatId','orders','boats']);if(q.version!==1)fail();num(q.nextBoatId,1,1e9,true);
 if(!Array.isArray(q.orders)||!Array.isArray(q.boats)||q.orders.length+q.boats.length>20||(data.schema<15&&q.nextBoatId!==q.boats.length+1))fail();const homes=new Set(),ids=new Set();const validHome=id=>{const e=[...data.state.units,...data.state.buildings,...data.state.construction].find(b=>b.id===id);if(e&&(!data.state.buildings.includes(e)||e.type!==(kinds?.get(id)||'shipyard')||e.team!==0||kinds?.get(id)==='fishery'&&(!(e.x>60&&e.x<W-90&&e.y>=720&&e.y<=780)||e.x>445&&e.x<550)))fail()};
 for(const o of q.orders){exact(o,['yardId','progress']);num(o.yardId,1,data.state.nextId-1,true);validHome(o.yardId);num(o.progress,0,durations?.get(o.yardId)||30);if(o.progress>=(durations?.get(o.yardId)||30)||homes.has(o.yardId))fail();homes.add(o.yardId);}
 for(const b of q.boats){exact(b,['id','homeId','x','y','target']);num(b.id,1,q.nextBoatId-1,true);num(b.homeId,1,data.state.nextId-1,true);validHome(b.homeId);if(ids.has(b.id)||(!kinds||kinds.get(b.homeId)==='fishery')&&homes.has(b.homeId)||!scNavalWater(b))fail();ids.add(b.id);homes.add(b.homeId);if(b.target!==null){exact(b.target,['x','y']);if(!scNavalWater(b.target))fail();}}
 return scClone(q);
}
function scNavalPrepareV2(q,data){
 if(data.schema<13)return null;
 if(data.schema===13){const old=scNavalPrepareBase(q,data);return {...old,version:2,orders:old.orders.map(o=>({...o,kind:'warship'})),boats:old.boats.map(b=>({...b,kind:'warship'}))};}
 if(!q||q.version!==2||!Array.isArray(q.orders)||!Array.isArray(q.boats))throw Error('Invalid harbour checkpoint. Your city has not changed.');
 const kinds=new Map(),durations=new Map();for(const row of [...q.orders,...q.boats]){const def=typeof row.kind==='string'&&Object.hasOwn(scNavalKinds,row.kind)?scNavalKinds[row.kind]:null;if(!def)throw Error('Invalid boat kind.');const id=row.yardId??row.homeId;if(kinds.has(id)&&kinds.get(id)!==def.factory)throw Error('Mixed boat factory.');kinds.set(id,def.factory);if(row.yardId!==undefined)durations.set(id,def.seconds);}
 const strip=row=>{const {kind,...rest}=row;return rest};const base=scNavalPrepareBase({...q,version:1,orders:q.orders.map(strip),boats:q.boats.map(strip)},data,kinds,durations);
 return {...base,version:2,orders:base.orders.map((o,i)=>({...o,kind:q.orders[i].kind})),boats:base.boats.map((b,i)=>({...b,kind:q.boats[i].kind}))};
}
function scNavalPrepare(q,data){
 if(data.schema<13)return null;
 if(data.schema<15){const old=scNavalPrepareV2(q,data);return {...old,version:3,boats:old.boats.map(b=>({...b,mission:null,hp:scNavalKinds[b.kind].hp}))};}
 const fail=()=>{throw Error('Invalid fleet mission checkpoint. Your city has not changed.');};
 if(!q||q.version!==3||!Array.isArray(q.boats))fail();
 for(const b of q.boats){if(!Number.isFinite(b.hp)||b.hp<=0||b.hp>(scNavalKinds[b.kind]?.hp||0)||!Object.hasOwn(b,'mission'))fail();const m=b.mission;if(m===null)continue;
  const fields=['type','phase','progress','cargo','cargoType','targetId','origin','destination'];if(!m||typeof m!=='object'||Array.isArray(m)||Object.keys(m).length!==fields.length||Object.keys(m).some(k=>!fields.includes(k)))fail();
  if(!['fish','trade','guard','attack'].includes(m.type)||({fish:'fishing',trade:'trade',guard:'warship',attack:'warship'})[m.type]!==b.kind||!scNavalWater(m.origin)||!scNavalWater(m.destination)||Object.keys(m.origin).length!==2||Object.keys(m.destination).length!==2)fail();
  if(!Number.isFinite(m.progress)||m.progress<0||m.progress>(m.type==='fish'?10:8)||!Number.isSafeInteger(m.cargo)||!['outbound','working','home','unloading','patrol'].includes(m.phase))fail();
  if(m.type==='fish'){if(m.targetId!==null||!['outbound','working','home','unloading'].includes(m.phase)||!((m.cargo===0&&m.cargoType===null&&m.phase!=='unloading')||(m.cargo===6&&m.cargoType==='food'&&['home','unloading'].includes(m.phase))))fail();}
  else if(m.type==='trade'){if(m.targetId!==null||!['outbound','working','home'].includes(m.phase)||!((m.cargo===10&&m.cargoType==='goods')||(m.cargo===25&&m.cargoType==='gold'&&m.phase==='home')))fail();}
  else if(m.cargo!==0||m.cargoType!==null||m.progress!==0||!['outbound','patrol','home'].includes(m.phase)||m.type==='attack'&&(!Number.isSafeInteger(m.targetId)||m.targetId<1||m.targetId>=data.state.nextId)||m.type==='guard'&&m.targetId!==null)fail();
  if(m.phase==='unloading'&&(b.target!==null||Math.hypot(b.x-m.origin.x,b.y-m.origin.y)>1))fail();
 }
 const old=scNavalPrepareV2({...q,version:2,boats:q.boats.map(({mission,hp,...b})=>b)},data);return {...old,version:3,boats:old.boats.map((b,i)=>({...b,mission:scClone(q.boats[i].mission),hp:q.boats[i].hp}))};
}
function scNavalSnapshot(){const factories=buildings.filter(scNavalFacilityEligible).map(b=>({id:b.id,type:b.type,kind:scNavalKindFor(b),x:b.x,y:b.y,staff:employment.byId.get(b.id)?.count||0,efficiency:employment.byId.get(b.id)?.efficiency||0}));return {...scClone(scNavalState||scNavalFresh()),factories,yards:factories.filter(b=>b.type==='shipyard'),width:W,height:H,wood,gold,stone,tradeGoods,coastalHostiles:scNavalHostiles().length};}
window.scHarbour=Object.freeze({snapshot:scNavalSnapshot,boats:()=>scClone(scNavalState?.boats||[]),kinds:scNavalKinds,dispatch:scNavalDispatch,place:scNavalPlace,order:scNavalOrder,cancel:scNavalCancel,sail:scNavalSail,stop:scNavalStop,berth:scNavalBerth,arm:()=>{if(!scVillageActionReady())return false;mode='shipyard';wallPointer=null;msg('Shipyard: 120 wood, 90 gold, 40 stone. Choose clear south coast ground at the shoreline. Selected workers build it.');return true}});
