// Optional campaign exploration and receipt-backed relations. Rendering never activates this state.
let scFrontierState=null;
const scFrontierIds=['valewatch','ashford'];
const scFrontierEnabled=id=>scFrontierIds.includes(id);
const scFrontierNames={valewatch:{place:'Valewatch',who:'Warden Mira'},ashford:{place:'Ashford',who:'Caelan'}};
const scFrontierContact=()=>({surveySentAt:null,surveyPaid:0,discoveredAt:null,refusedAt:null,talkClosed:false,intro:null,introAt:null,pactAt:null});
const scFrontierFresh=()=>({version:1,contacts:Object.fromEntries(scFrontierIds.map(id=>[id,scFrontierContact()])),survey:null,cargo:null,nextId:1,history:[]});
function scFrontierTerms(id,kind,batches=1,version=1){
 if(version!==1||!scFrontierEnabled(id)||!Number.isSafeInteger(batches)||batches<1||batches>2||kind!=='pact'&&batches!==1)return null;
 const table={valewatch:{'intro-aid':[{wood:40},{stone:30},1],'intro-manufactured':[{planks:12},{gold:60},2],basic:[{planks:8},{gold:38},1],pact:[{planks:16},{gold:84},1]},
  ashford:{'intro-aid':[{stone:20},{gold:48},1],'intro-manufactured':[{baskets:12},{gold:60},2],basic:[{baskets:12},{gold:53},1],pact:[{baskets:24},{gold:112},1]}};
 const row=table[id]?.[kind];if(!row)return null;const vector=(fields,v)=>Object.fromEntries(fields.map(k=>[k,(v[k]||0)*batches]));
 return {cost:vector(['gold','wood','stone','planks','baskets'],row[0]),reward:vector(['gold','wood','stone'],row[1]),trust:row[2]};
}
function scSupplierCargoBusy(){return !!(scTownState?.journey||scFrontierState?.cargo);}
function scCargoCanPay(cost){return gold+1e-8>=(cost.gold||0)&&wood+1e-8>=(cost.wood||0)&&stone+1e-8>=(cost.stone||0)&&(scTownState?.planks||0)+1e-8>=(cost.planks||0)&&(scTownState?.reservedBaskets||0)>=(cost.baskets||0);}
function scCargoTake(cost){
 if(!scCargoCanPay(cost))return false;gold=Math.max(0,gold-(cost.gold||0));wood=Math.max(0,wood-(cost.wood||0));stone=Math.max(0,stone-(cost.stone||0));
 if(cost.planks||cost.baskets){const q=scTownEnsure();q.planks=Math.max(0,q.planks-(cost.planks||0));q.reservedBaskets-=cost.baskets||0;q.reservationTarget=Math.max(q.reservedBaskets,q.reservationTarget-(cost.baskets||0));}return true;
}
function scCargoCredit(reward){gold+=reward.gold||0;wood+=reward.wood||0;stone+=reward.stone||0;}
function scFrontierTrust(q,id,at=Infinity){
 const contact=q?.contacts[id];let trust=contact?.refusedAt!==null&&contact?.refusedAt!==undefined&&contact.refusedAt<=at+1e-5?-1:0;
 for(const j of q?.history||[])if(j.contact===id&&j.completedAt<=at+1e-5)trust+=scFrontierTerms(j.contact,j.kind,j.batches,j.termsVersion)?.trust||0;
 return Math.max(-1,Math.min(6,trust));
}
function scFrontierDoubleReserveEarned(q=scFrontierState,at=Infinity){const c=q?.contacts?.ashford;return !!c&&c.pactAt!==null&&c.pactAt!==undefined&&scFrontierTrust(q,'ashford',at)>=6;}
function scFrontierHasIntro(q=scFrontierState,id=null,at=Infinity){return Array.isArray(q?.history)&&q.history.some(j=>(!id||j.contact===id)&&j.kind?.startsWith('intro-')&&j.phase==='complete'&&j.completedAt<=at+1e-5);}
function scFrontierEnvoyBusy(){return !!scFrontierState?.survey||scEnvoyState?.phase==='travelling';}
function scFrontierReady(){return scScenario==='city'&&scTradePolicyReady()&&scCaravan.activationAllowed();}
function scFrontierMarketReady(){return scFrontierReady()&&cityOwned().some(b=>b.type==='market'&&marketHasTradeAccess(b)&&(employment.byId.get(b.id)?.efficiency||0)>=.5);}
function scFrontierChanged(){updateUI();scTownChanged();window.dispatchEvent(new Event('sc-frontier-changed'));}
function scFrontierSurvey(id){
 if(!scFrontierEnabled(id)||!scFrontierReady()||scFrontierEnvoyBusy()||gold<10||(scFrontierState?.history.length||0)>=512||scFrontierState?.contacts[id].surveySentAt!==null&&scFrontierState?.contacts[id].surveySentAt!==undefined)return false;
 scTownEnsure();const q=scFrontierState||(scFrontierState=scFrontierFresh());gold-=10;q.contacts[id].surveySentAt=elapsed;q.contacts[id].surveyPaid=10;q.survey={contact:id,departedAt:elapsed,progress:0,paid:10};scFrontierChanged();return true;
}
function scFrontierOrder(id,kind,batches=1){
 const q=scFrontierState,c=q?.contacts[id],terms=scFrontierTerms(id,kind,batches);let reason='';
 if(!terms)reason='This order is not available.';else if(!scFrontierReady())reason='Return to an active peaceful city with a living Keep.';else if(c?.discoveredAt===null||!c)reason='Survey this route first.';else if(scSupplierCargoBusy())reason='Supplier cargo is already travelling. Wait for its return.';else if(q.history.length>=512)reason='The new partner history is full; existing receipts are retained.';
 else if(kind.startsWith('intro-')){if(c.intro!==null)reason='Your introductory choice is already committed.';else if(c.talkClosed)reason='Reopen negotiations first.';}
 else if(!scFrontierHasIntro(q,id))reason='Complete an introductory supply shipment first.';
 else if(!scFrontierMarketReady()||!scTownHasYard())reason='Complete a real loading yard and open a road-connected, half-staffed Market.';
 else if(kind==='pact'&&c.pactAt===null)reason='Earn three trust and sign the supply pact first.';
 else if(batches===2&&scFrontierTrust(q,id)<6)reason='Two batches require six trust.';
 if(!reason&&terms&&!scCargoCanPay(terms.cost))reason='Produce or gather the listed real cargo first.';
 return {allowed:!reason,reason,...(terms||{})};
}
function scFrontierDispatch(id,kind,batches=1){
 const order=scFrontierOrder(id,kind,batches);if(!order.allowed)return false;const q=scFrontierState,c=q.contacts[id];if(!scCargoTake(order.cost))return false;
 if(kind.startsWith('intro-')){c.intro=kind.slice(6);c.introAt=elapsed;c.talkClosed=false;}
 q.cargo={id:q.nextId++,contact:id,kind,batches,termsVersion:1,departedAt:elapsed,progress:0,phase:'outbound',completedAt:null,cost:scClone(order.cost),reward:scClone(order.reward)};scFrontierChanged();return true;
}
function scFrontierRefuse(id){const c=scFrontierState?.contacts[id];if(!scFrontierEnabled(id)||!scFrontierReady()||!c||c.discoveredAt===null||c.intro!==null||c.talkClosed)return false;if(c.refusedAt===null)c.refusedAt=elapsed;c.talkClosed=true;scFrontierChanged();return true;}
function scFrontierReopen(id){const c=scFrontierState?.contacts[id];if(!scFrontierEnabled(id)||!scFrontierReady()||!c?.talkClosed)return false;c.talkClosed=false;scFrontierChanged();return true;}
function scFrontierSign(id){const q=scFrontierState,c=q?.contacts[id];if(!scFrontierEnabled(id)||!scFrontierReady()||!c||c.pactAt!==null||!scFrontierHasIntro(q,id)||scFrontierTrust(q,id)<3)return false;c.pactAt=elapsed;scFrontierChanged();return true;}
function scFrontierTick(dt){
 const q=scFrontierState;if(scScenario!=='city'||ended||!q)return;
 if(q.survey){const s=q.survey;s.progress=Math.min(60,s.progress+dt);if(s.progress>=60){q.contacts[s.contact].discoveredAt=elapsed;q.survey=null;msg('The '+scFrontierNames[s.contact].place+' route is surveyed. '+scFrontierNames[s.contact].who+'’s needs are available in Diplomacy.');scFrontierChanged();}}
 if(q.cargo){const j=q.cargo;j.progress=Math.min(120,j.progress+dt);if(j.progress>=120){j.progress=120;j.phase='complete';j.completedAt=elapsed;scCargoCredit(j.reward);q.history.push(scClone(j));q.cargo=null;msg(scFrontierNames[j.contact].place+' supplies returned. Actual cargo and earned trust are recorded in Chronicle.');scFrontierChanged();}else if(j.progress>=60)j.phase='returning';}
}
function scFrontierSnapshot(){
 const q=scFrontierState||scFrontierFresh(),contacts={};for(const id of scFrontierIds){const c=q.contacts[id];contacts[id]={...scClone(c),enabled:scFrontierEnabled(id),trust:scFrontierTrust(q,id),introDone:scFrontierHasIntro(q,id),canSurvey:scFrontierEnabled(id)&&scFrontierReady()&&!scFrontierEnvoyBusy()&&c.surveySentAt===null&&gold>=10&&q.history.length<512,canSign:scFrontierEnabled(id)&&scFrontierReady()&&c.pactAt===null&&scFrontierHasIntro(q,id)&&scFrontierTrust(q,id)>=3,orders:Object.fromEntries(['intro-aid','intro-manufactured','basic','pact'].map(kind=>[kind,scFrontierOrder(id,kind)])),doublePact:scFrontierOrder(id,'pact',2)};}
 return {...scClone(q),contacts,active:!!scFrontierState,supported:scScenario==='city',envoyBusy:scFrontierEnvoyBusy(),cargoBusy:scSupplierCargoBusy(),doubleReserveEarned:scFrontierDoubleReserveEarned(scFrontierState),hasYard:scTownHasYard(),marketReady:scFrontierMarketReady(),gold,wood,stone,planks:scTownState?.planks||0,reservedBaskets:scTownState?.reservedBaskets||0};
}
function scFrontierPrepare(q,data){
 const fail=()=>{throw Error('Invalid exploration, partner cargo or earned pact. Your city has not changed.');};
 const exact=(o,keys)=>{if(!o||typeof o!=='object'||Array.isArray(o)||Object.keys(o).length!==keys.length||Object.keys(o).some(k=>!keys.includes(k)))fail();};
 const clock=data.state.clock.elapsed,num=(n,min=0,max=clock,int=false)=>{if(!Number.isFinite(n)||n<min-1e-5||n>max+1e-5||int&&!Number.isSafeInteger(n))fail();};
 const maybe=(n,min=0,max=clock)=>{if(n!==null)num(n,min,max);};
 exact(q,['version','contacts','survey','cargo','nextId','history']);if(q.version!==1||data.schema!==11||data.campaign?.mode!=='city')fail();exact(q.contacts,scFrontierIds);if(!Array.isArray(q.history)||q.history.length>512)fail();num(q.nextId,1,514,true);
 let activated=false;const journeys=[];
 for(const id of scFrontierIds){const c=q.contacts[id];exact(c,['surveySentAt','surveyPaid','discoveredAt','refusedAt','talkClosed','intro','introAt','pactAt']);if(typeof c.talkClosed!=='boolean')fail();
  if(!scFrontierEnabled(id)){if(Object.entries(scFrontierContact()).some(([k,v])=>c[k]!==v))fail();continue;}
  if(c.surveySentAt===null){if(c.surveyPaid!==0||c.discoveredAt!==null||c.refusedAt!==null||c.talkClosed||c.intro!==null||c.introAt!==null||c.pactAt!==null)fail();continue;}
  activated=true;num(c.surveySentAt);if(c.surveyPaid!==10)fail();maybe(c.discoveredAt,c.surveySentAt+60);journeys.push({start:c.surveySentAt,end:c.discoveredAt??Infinity});
  if(c.discoveredAt===null){if(c.refusedAt!==null||c.talkClosed||c.intro!==null||c.introAt!==null||c.pactAt!==null||q.survey?.contact!==id)fail();continue;}
  maybe(c.refusedAt,c.discoveredAt);if(c.talkClosed&&(c.refusedAt===null||c.intro!==null))fail();
  if(c.intro===null){if(c.introAt!==null||c.pactAt!==null)fail();}else{if(!['aid','manufactured'].includes(c.intro)||c.talkClosed)fail();num(c.introAt,c.discoveredAt);if(c.refusedAt!==null&&c.refusedAt>c.introAt+1e-5)fail();}
  maybe(c.pactAt,c.discoveredAt);
 }
 if(!activated)fail();
 if(q.survey!==null){const s=q.survey;exact(s,['contact','departedAt','progress','paid']);const c=q.contacts[s.contact];if(!scFrontierEnabled(s.contact)||!c||c.discoveredAt!==null||s.paid!==10||s.departedAt!==c.surveySentAt)fail();num(s.progress,0,60);if(s.progress>=60||Math.abs(s.progress-(clock-s.departedAt))>1e-5)fail();}
 const oldVisit=data.state.diplomacy;if(oldVisit)journeys.push({start:oldVisit.departedAt,end:oldVisit.arrivedAt??Infinity});journeys.sort((a,b)=>a.start-b.start);for(let i=1;i<journeys.length;i++)if(journeys[i].start<journeys[i-1].end-1e-5)fail();
 const introCount={valewatch:0,ashford:0};let lastReturn=0;
 function cargo(j,complete,index){
  exact(j,['id','contact','kind','batches','termsVersion','departedAt','progress','phase','completedAt','cost','reward']);const c=q.contacts[j.contact],terms=scFrontierTerms(j.contact,j.kind,j.batches,j.termsVersion);if(j.id!==index+1||!terms||!c||c.discoveredAt===null)fail();
  exact(j.cost,['gold','wood','stone','planks','baskets']);exact(j.reward,['gold','wood','stone']);for(const k of Object.keys(j.cost))if(j.cost[k]!==terms.cost[k])fail();for(const k of Object.keys(j.reward))if(j.reward[k]!==terms.reward[k])fail();num(j.departedAt,Math.max(lastReturn,c.discoveredAt));num(j.progress,0,120);
  if(j.kind.startsWith('intro-')){introCount[j.contact]++;if(introCount[j.contact]!==1||j.kind!=='intro-'+c.intro||j.departedAt!==c.introAt)fail();}
  else {if(!scFrontierHasIntro(q,j.contact,j.departedAt))fail();if(j.kind==='pact'&&(c.pactAt===null||c.pactAt>j.departedAt+1e-5))fail();if(j.batches===2&&scFrontierTrust(q,j.contact,j.departedAt)<6)fail();}
  if(complete){if(j.progress!==120||j.phase!=='complete')fail();num(j.completedAt,j.departedAt+120);lastReturn=j.completedAt;}else{if(j.completedAt!==null||!['outbound','returning'].includes(j.phase)||j.progress>=120||j.phase==='outbound'&&j.progress>=60||j.phase==='returning'&&j.progress<60||Math.abs(j.progress-(clock-j.departedAt))>1e-5)fail();}
 }
 q.history.forEach((j,i)=>cargo(j,true,i));if(q.cargo!==null){if(q.history.length>=512)fail();cargo(q.cargo,false,q.history.length);}if(q.nextId!==q.history.length+(q.cargo?2:1))fail();
 for(const id of scFrontierIds){const c=q.contacts[id];if(c.intro!==null&&introCount[id]!==1)fail();if(c.pactAt!==null&&(!scFrontierHasIntro(q,id,c.pactAt)||scFrontierTrust(q,id,c.pactAt)<3))fail();}
 const old=data.state.tradeTown;if(old?.journey&&q.cargo)fail();const intervals=[...(old?.history||[]),...(old?.journey?[old.journey]:[]),...q.history,...(q.cargo?[q.cargo]:[])].map(j=>({start:j.departedAt,end:j.completedAt??Infinity})).sort((a,b)=>a.start-b.start);
 for(let i=1;i<intervals.length;i++)if(intervals[i].start<intervals[i-1].end-1e-5)fail();return scClone(q);
}
window.scFrontiers=Object.freeze({snapshot:scFrontierSnapshot,survey:scFrontierSurvey,dispatch:scFrontierDispatch,refuse:scFrontierRefuse,reopen:scFrontierReopen,sign:scFrontierSign});
