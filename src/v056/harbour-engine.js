// Authoritative harbour state. Naval IDs are separate from land entity IDs.
let scNavalState=null;
const scNavalFresh=()=>({version:1,nextBoatId:1,orders:[],boats:[]});
function scNavalEnsure(){scTownEnsure();return scNavalState||(scNavalState=scNavalFresh());}
const scNavalPlot=p=>!!p&&Number.isFinite(p.x)&&p.x>60&&p.x<W-90&&p.y===755&&!(p.x>445&&p.x<550);
const scNavalWater=p=>!!p&&Number.isFinite(p.x)&&Number.isFinite(p.y)&&p.x>=35&&p.x<=W-35&&p.y>=820&&p.y<=H-25;
const scNavalYard=id=>buildings.find(b=>b.id===id&&b.type==='shipyard'&&b.team===0&&alive(b)&&scNavalPlot(b));
function scNavalChanged(){window.dispatchEvent(new Event('sc-harbour-changed'));}
function scNavalPlace(p){
 if(!scVillageActionReady()||!scNavalPlot(p)||!canPlace('shipyard',p,null)||wood<120||gold<90||stone<40)return false;
 scNavalEnsure();wood-=120;gold-=90;stone-=40;const site=scStartConstruction('shipyard',p);scRecordUndo({kind:'build',ids:[site.id],gold:90,wood:120,stone:40,label:'shipyard'});updateUI();scNavalChanged();return true;
}
function scNavalOrder(id){
 if(!scVillageActionReady()||!scNavalYard(id)||wood<80||gold<40)return false;const q=scNavalEnsure();
 if(q.boats.length+q.orders.length>=20||q.orders.some(o=>o.yardId===id)||q.boats.some(b=>b.homeId===id))return false;
 wood-=80;gold-=40;q.orders.push({yardId:id,progress:0});updateUI();scNavalChanged();return true;
}
function scNavalCancel(id){if(!scVillageActionReady()||!scNavalState)return false;const q=scNavalState,i=q.orders.findIndex(o=>o.yardId===id);if(i<0)return false;q.orders.splice(i,1);wood+=80;gold+=40;updateUI();scNavalChanged();return true;}
function scNavalSail(id,p){if(!scVillageActionReady()||!scNavalWater(p))return false;const b=scNavalState?.boats.find(b=>b.id===id);if(!b)return false;b.target={x:p.x,y:p.y};scNavalChanged();return true;}
function scNavalStop(id){if(!scVillageActionReady())return false;const b=scNavalState?.boats.find(b=>b.id===id);if(!b)return false;b.target=null;scNavalChanged();return true;}
function scNavalBerth(id){const b=scNavalState?.boats.find(b=>b.id===id),yard=b&&scNavalYard(b.homeId);return !!yard&&scNavalSail(id,{x:yard.x,y:840});}
function scNavalTick(dt){
 if(!scNavalState||scScenario!=='city'||ended||scOverview)return;const q=scNavalState;
 for(const o of [...q.orders]){const y=scNavalYard(o.yardId);if(!y){q.orders=q.orders.filter(x=>x!==o);wood+=80;gold+=40;scNavalChanged();continue;}
  o.progress=Math.min(30,o.progress+dt*(employment.byId.get(y.id)?.efficiency||0));
  if(o.progress>=30){q.orders=q.orders.filter(x=>x!==o);q.boats.push({id:q.nextBoatId++,homeId:y.id,x:y.x,y:840,target:null});scNavalChanged();}
 }
 for(const b of q.boats){if(!b.target)continue;const d=Math.hypot(b.target.x-b.x,b.target.y-b.y),step=45*dt;if(d<=step){b.x=b.target.x;b.y=b.target.y;b.target=null;}else{b.x+=(b.target.x-b.x)*step/d;b.y+=(b.target.y-b.y)*step/d;}}
}
function scNavalPrepare(q,data){
 if(data.schema<13)return null;const fail=()=>{throw Error('Invalid harbour checkpoint. Your city has not changed.');};
 const exact=(o,fields)=>{if(!o||typeof o!=='object'||Array.isArray(o)||Object.keys(o).length!==fields.length||Object.keys(o).some(k=>!fields.includes(k)))fail()};
 const num=(n,min,max,int=false)=>{if(!Number.isFinite(n)||n<min||n>max||int&&!Number.isSafeInteger(n))fail()};
 exact(q,['version','nextBoatId','orders','boats']);if(q.version!==1)fail();num(q.nextBoatId,1,1e9,true);
 if(!Array.isArray(q.orders)||!Array.isArray(q.boats)||q.orders.length+q.boats.length>20||q.nextBoatId!==q.boats.length+1)fail();const homes=new Set(),ids=new Set();const validHome=id=>{const e=[...data.state.units,...data.state.buildings,...data.state.construction].find(b=>b.id===id);if(e&&(!data.state.buildings.includes(e)||e.type!=='shipyard'||e.team!==0))fail()};
 for(const o of q.orders){exact(o,['yardId','progress']);num(o.yardId,1,data.state.nextId-1,true);validHome(o.yardId);num(o.progress,0,30);if(o.progress>=30||homes.has(o.yardId))fail();homes.add(o.yardId);}
 for(const b of q.boats){exact(b,['id','homeId','x','y','target']);num(b.id,1,q.nextBoatId-1,true);num(b.homeId,1,data.state.nextId-1,true);validHome(b.homeId);if(ids.has(b.id)||homes.has(b.homeId)||!scNavalWater(b))fail();ids.add(b.id);homes.add(b.homeId);if(b.target!==null){exact(b.target,['x','y']);if(!scNavalWater(b.target))fail();}}
 return scClone(q);
}
function scNavalSnapshot(){return {...scClone(scNavalState||scNavalFresh()),yards:buildings.filter(b=>b.type==='shipyard'&&b.team===0&&alive(b)).map(b=>({id:b.id,x:b.x,y:b.y,staff:employment.byId.get(b.id)?.count||0,efficiency:employment.byId.get(b.id)?.efficiency||0})),width:W,height:H,wood,gold,stone};}
window.scHarbour=Object.freeze({snapshot:scNavalSnapshot,place:scNavalPlace,order:scNavalOrder,cancel:scNavalCancel,sail:scNavalSail,stop:scNavalStop,berth:scNavalBerth,arm:()=>{if(!scVillageActionReady())return false;mode='shipyard';wallPointer=null;msg('Shipyard: 120 wood, 90 gold, 40 stone. Choose clear south coast ground at the shoreline. Selected workers build it.');return true}});
