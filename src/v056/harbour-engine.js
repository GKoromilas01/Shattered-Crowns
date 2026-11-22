// Authoritative harbour state. Naval IDs are separate from land entity IDs.
let scNavalState=null;
const scNavalFresh=()=>({version:2,nextBoatId:1,orders:[],boats:[]});
function scNavalEnsure(){scTownEnsure();return scNavalState||(scNavalState=scNavalFresh());}
const scNavalPlot=p=>!!p&&Number.isFinite(p.x)&&p.x>60&&p.x<W-90&&p.y===755&&!(p.x>445&&p.x<550);
const scNavalWater=p=>!!p&&Number.isFinite(p.x)&&Number.isFinite(p.y)&&p.x>=35&&p.x<=W-35&&p.y>=820&&p.y<=H-25;
const scNavalYard=id=>buildings.find(b=>b.id===id&&b.type==='shipyard'&&b.team===0&&alive(b)&&scNavalPlot(b));
function scNavalChanged(){window.dispatchEvent(new Event('sc-harbour-changed'));}
function scNavalPlace(p){
 if(!scVillageActionReady()||!scNavalPlot(p)||!canPlace('shipyard',p,null)||wood<120||gold<90||stone<40)return false;
 scNavalEnsure();wood-=120;gold-=90;stone-=40;const site=scStartConstruction('shipyard',p);scRecordUndo({kind:'build',ids:[site.id],gold:90,wood:120,stone:40,label:'shipyard'});updateUI();scNavalChanged();return true;
}
const scNavalKinds=Object.freeze({trade:Object.freeze({label:'Trade ship',factory:'shipyard',wood:100,gold:60,seconds:40}),warship:Object.freeze({label:'Warship',factory:'shipyard',wood:80,gold:40,seconds:30}),fishing:Object.freeze({label:'Fishing boat',factory:'fishery',wood:60,gold:25,seconds:20})});
const scNavalFacilityEligible=b=>!!b&&b.team===0&&alive(b)&&(['shipyard','fishery'].includes(b.type))&&Number.isFinite(b.x)&&b.x>60&&b.x<W-90&&b.y>=720&&b.y<=780&&!(b.x>445&&b.x<550);
const scNavalFacility=id=>buildings.find(b=>b.id===id&&scNavalFacilityEligible(b));
const scNavalKindFor=b=>b.type==='fishery'?'fishing':'warship';
function scNavalOrder(id,kind){
 const factory=scNavalFacility(id);if(!scVillageActionReady()||!factory)return false;if(kind===undefined)kind=scNavalKindFor(factory);if(typeof kind!=='string')return false;const def=Object.hasOwn(scNavalKinds,kind)?scNavalKinds[kind]:null;if(!def||def.factory!==factory.type||wood<def.wood||gold<def.gold)return false;const q=scNavalEnsure();
 if(q.boats.length+q.orders.length>=20||q.orders.some(o=>o.yardId===id)||kind==='fishing'&&q.boats.some(b=>b.homeId===id))return false;
 wood-=def.wood;gold-=def.gold;q.orders.push({yardId:id,progress:0,kind});updateUI();scNavalChanged();return true;
}
function scNavalCancel(id){if(!scVillageActionReady()||!scNavalState)return false;const q=scNavalState,i=q.orders.findIndex(o=>o.yardId===id);if(i<0)return false;const def=scNavalKinds[q.orders[i].kind];q.orders.splice(i,1);wood+=def.wood;gold+=def.gold;updateUI();scNavalChanged();return true;}
function scNavalFisheryBase(b){return 9+(scNavalState?.boats.some(boat=>boat.kind==='fishing'&&boat.homeId===b.id&&!boat.target&&Math.hypot(boat.x-b.x,boat.y-840)<=100)?3:0);}
function scNavalSail(id,p){if(!scVillageActionReady()||!scNavalWater(p))return false;const b=scNavalState?.boats.find(b=>b.id===id);if(!b)return false;b.target={x:p.x,y:p.y};scNavalChanged();return true;}
function scNavalStop(id){if(!scVillageActionReady())return false;const b=scNavalState?.boats.find(b=>b.id===id);if(!b)return false;b.target=null;scNavalChanged();return true;}
function scNavalBerth(id){const b=scNavalState?.boats.find(b=>b.id===id),yard=b&&scNavalFacility(b.homeId);return !!yard&&scNavalSail(id,{x:yard.x,y:840});}
function scNavalTick(dt){
 if(!scNavalState||scScenario!=='city'||ended||scOverview)return;const q=scNavalState;
 for(const o of [...q.orders]){const y=scNavalFacility(o.yardId),def=scNavalKinds[o.kind];if(!y){q.orders=q.orders.filter(x=>x!==o);wood+=def.wood;gold+=def.gold;scNavalChanged();continue;}
  o.progress=Math.min(def.seconds,o.progress+dt*(employment.byId.get(y.id)?.efficiency||0));
  if(o.progress>=def.seconds){q.orders=q.orders.filter(x=>x!==o);let x=y.x;for(let i=0;i<40;i++){const candidate=y.x+(i%2?1:-1)*Math.ceil(i/2)*70;if(candidate>=35&&candidate<=W-35&&q.boats.every(b=>Math.hypot(b.x-candidate,b.y-840)>=55)){x=candidate;break;}}q.boats.push({id:q.nextBoatId++,homeId:y.id,x,y:840,target:null,kind:o.kind});scNavalChanged();}
 }
 for(const b of q.boats){if(!b.target)continue;const d=Math.hypot(b.target.x-b.x,b.target.y-b.y),step=45*dt;if(d<=step){b.x=b.target.x;b.y=b.target.y;b.target=null;}else{b.x+=(b.target.x-b.x)*step/d;b.y+=(b.target.y-b.y)*step/d;}}
}
function scNavalPrepareBase(q,data,kinds=null,durations=null){
 if(data.schema<13)return null;const fail=()=>{throw Error('Invalid harbour checkpoint. Your city has not changed.');};
 const exact=(o,fields)=>{if(!o||typeof o!=='object'||Array.isArray(o)||Object.keys(o).length!==fields.length||Object.keys(o).some(k=>!fields.includes(k)))fail()};
 const num=(n,min,max,int=false)=>{if(!Number.isFinite(n)||n<min||n>max||int&&!Number.isSafeInteger(n))fail()};
 exact(q,['version','nextBoatId','orders','boats']);if(q.version!==1)fail();num(q.nextBoatId,1,1e9,true);
 if(!Array.isArray(q.orders)||!Array.isArray(q.boats)||q.orders.length+q.boats.length>20||q.nextBoatId!==q.boats.length+1)fail();const homes=new Set(),ids=new Set();const validHome=id=>{const e=[...data.state.units,...data.state.buildings,...data.state.construction].find(b=>b.id===id);if(e&&(!data.state.buildings.includes(e)||e.type!==(kinds?.get(id)||'shipyard')||e.team!==0||kinds?.get(id)==='fishery'&&(!(e.x>60&&e.x<W-90&&e.y>=720&&e.y<=780)||e.x>445&&e.x<550)))fail()};
 for(const o of q.orders){exact(o,['yardId','progress']);num(o.yardId,1,data.state.nextId-1,true);validHome(o.yardId);num(o.progress,0,durations?.get(o.yardId)||30);if(o.progress>=(durations?.get(o.yardId)||30)||homes.has(o.yardId))fail();homes.add(o.yardId);}
 for(const b of q.boats){exact(b,['id','homeId','x','y','target']);num(b.id,1,q.nextBoatId-1,true);num(b.homeId,1,data.state.nextId-1,true);validHome(b.homeId);if(ids.has(b.id)||(!kinds||kinds.get(b.homeId)==='fishery')&&homes.has(b.homeId)||!scNavalWater(b))fail();ids.add(b.id);homes.add(b.homeId);if(b.target!==null){exact(b.target,['x','y']);if(!scNavalWater(b.target))fail();}}
 return scClone(q);
}
function scNavalPrepare(q,data){
 if(data.schema<13)return null;
 if(data.schema===13){const old=scNavalPrepareBase(q,data);return {...old,version:2,orders:old.orders.map(o=>({...o,kind:'warship'})),boats:old.boats.map(b=>({...b,kind:'warship'}))};}
 if(!q||q.version!==2||!Array.isArray(q.orders)||!Array.isArray(q.boats))throw Error('Invalid harbour checkpoint. Your city has not changed.');
 const kinds=new Map(),durations=new Map();for(const row of [...q.orders,...q.boats]){const def=typeof row.kind==='string'&&Object.hasOwn(scNavalKinds,row.kind)?scNavalKinds[row.kind]:null;if(!def)throw Error('Invalid boat kind.');const id=row.yardId??row.homeId;if(kinds.has(id)&&kinds.get(id)!==def.factory)throw Error('Mixed boat factory.');kinds.set(id,def.factory);if(row.yardId!==undefined)durations.set(id,def.seconds);}
 const strip=row=>{const {kind,...rest}=row;return rest};const base=scNavalPrepareBase({...q,version:1,orders:q.orders.map(strip),boats:q.boats.map(strip)},data,kinds,durations);
 return {...base,version:2,orders:base.orders.map((o,i)=>({...o,kind:q.orders[i].kind})),boats:base.boats.map((b,i)=>({...b,kind:q.boats[i].kind}))};
}
function scNavalSnapshot(){const factories=buildings.filter(scNavalFacilityEligible).map(b=>({id:b.id,type:b.type,kind:scNavalKindFor(b),x:b.x,y:b.y,staff:employment.byId.get(b.id)?.count||0,efficiency:employment.byId.get(b.id)?.efficiency||0}));return {...scClone(scNavalState||scNavalFresh()),factories,yards:factories.filter(b=>b.type==='shipyard'),width:W,height:H,wood,gold,stone};}
window.scHarbour=Object.freeze({snapshot:scNavalSnapshot,boats:()=>scClone(scNavalState?.boats||[]),kinds:scNavalKinds,place:scNavalPlace,order:scNavalOrder,cancel:scNavalCancel,sail:scNavalSail,stop:scNavalStop,berth:scNavalBerth,arm:()=>{if(!scVillageActionReady())return false;mode='shipyard';wallPointer=null;msg('Shipyard: 120 wood, 90 gold, 40 stone. Choose clear south coast ground at the shoreline. Selected workers build it.');return true}});
