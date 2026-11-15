// One paid diplomatic visit. Snapshot reads never create progress or economic state.
let scEnvoyState=null;
const scEnvoyFields=['version','phase','paid','departedAt','progress','arrivedAt','choice','chosenAt'];
function scEnvoyChanged(){window.dispatchEvent(new Event('sc-envoy-changed'));scTownChanged();}
function scEnvoyHistoryFull(){return (scTownState?.history.length||0)+(scTownState?.journey?1:0)>=512;}
function scEnvoySend(){
 if(scEnvoyState||scEnvoyHistoryFull()||scTownState?.stage!==3||!scTownReady()||!scVillageActionReady()||!scCaravan.activationAllowed()||gold<30)return false;
 gold-=30;scEnvoyState={version:1,phase:'travelling',paid:30,departedAt:elapsed,progress:0,arrivedAt:null,choice:null,chosenAt:null};updateUI();scEnvoyChanged();return true;
}
function scEnvoyTick(dt){
 const q=scEnvoyState;if(scScenario!=='city'||ended||q?.phase!=='travelling')return;
 q.progress=Math.min(120,q.progress+dt);if(q.progress>=120){q.phase='audience';q.arrivedAt=elapsed;msg('Your envoy has reached Ironmere. Review Lady Elowen’s charter offers in Neighbour trade.');scEnvoyChanged();}
}
function scEnvoyChoose(choice){
 const q=scEnvoyState;if(q?.phase!=='audience'||!['timber','provisions','leave'].includes(choice)||!scVillageActionReady()||!scCaravan.activationAllowed())return false;
 q.choice=choice;q.chosenAt=elapsed;q.phase=choice==='leave'?'declined':'signed';updateUI();scEnvoyChanged();return true;
}
function scEnvoySnapshot(){
 const q=scEnvoyState;return {...(q?scClone(q):{phase:'unvisited',choice:null,progress:0,paid:0}),supported:scTownSupported(),supplierComplete:scTownState?.stage===3,historyFull:scEnvoyHistoryFull(),canSend:!q&&! (scEnvoyHistoryFull())&&scTownState?.stage===3&&scTownReady()&&scVillageActionReady()&&gold>=30,hasYard:scTownHasYard(),gold,fee:30,duration:120};
}
function scEnvoyPrepare(q,data){
 const fail=()=>{throw Error('Invalid envoy visit or charter checkpoint. Your city has not changed.');};
 if(!q||typeof q!=='object'||Array.isArray(q)||Object.keys(q).length!==scEnvoyFields.length||Object.keys(q).some(k=>!scEnvoyFields.includes(k))||q.version!==1||q.paid!==30||!['travelling','audience','signed','declined'].includes(q.phase))fail();
 if(data.state.tradeTown?.stage!==3||!['home','brookstead'].includes(data.campaign?.originId||'home'))fail();
 const clock=data.state.clock.elapsed,lastAgreement=data.state.tradeTown.history.filter(j=>j.kind==='agreement').at(-1);
 const num=(n,min,max)=>{if(!Number.isFinite(n)||n<min-1e-5||n>max+1e-5)fail();};
 num(q.departedAt,lastAgreement?.completedAt??Infinity,clock);num(q.progress,0,120);
 if(q.phase==='travelling'){if(q.progress>=120||q.arrivedAt!==null||q.choice!==null||q.chosenAt!==null||Math.abs(q.progress-(clock-q.departedAt))>1e-5)fail();}
 else {if(q.progress!==120)fail();num(q.arrivedAt,q.departedAt+120,clock);if(q.phase==='audience'){if(q.choice!==null||q.chosenAt!==null)fail();}else{if(q.phase==='signed'?!['timber','provisions'].includes(q.choice):q.choice!=='leave')fail();num(q.chosenAt,q.arrivedAt,clock);}}
 for(const j of [...data.state.tradeTown.history,...(data.state.tradeTown.journey?[data.state.tradeTown.journey]:[])])if(j.kind.startsWith('charter-')&&(q.phase!=='signed'||j.kind!=='charter-'+q.choice||j.departedAt<q.chosenAt-1e-5))fail();
 return scClone(q);
}
window.scEnvoy=Object.freeze({snapshot:scEnvoySnapshot,send:scEnvoySend,choose:scEnvoyChoose});
