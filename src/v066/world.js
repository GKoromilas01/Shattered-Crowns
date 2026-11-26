/* v0.66: a livelier world. Upgrade looks (house, farm, market, keep) bought in each building's own panel; the King's Guard at the Keep gate; children by some houses; a sheep flock at each farm; and rival armies in the dress of Ironmere, Valewatch or Ashford. Saves are untouched: upgrade levels live in localStorage per city, the rival kingdom is derived from the saved rival id. */
(()=>{'use strict';
const W=window.sc66World;if(!W)return;
const KEY='shattered-crowns-upgrades-v1';
const art=()=>window.sc47Art||{};
const imgs={};
function image(name){const src=art()[name];if(!src)return null;let im=imgs[name];if(!im){im=imgs[name]=new Image();im.src=src}return im.complete&&im.naturalWidth?im:null}

/* ---- rival kingdoms ---- */
const KINGS=[
 {id:'ironmere',name:'Ironmere',emblem:'iron anvil on grey',soldier:'unit_ironmere_soldier',archer:'unit_ironmere_archer'},
 {id:'valewatch',name:'Valewatch',emblem:'white stag on green',soldier:'unit_valewatch_soldier',archer:'unit_valewatch_archer'},
 {id:'ashford',name:'Ashford',emblem:'wheat sheaf on ochre',soldier:'unit_ashford_soldier',archer:'unit_ashford_crossbowman'}
];
function kingdomOf(seed){return KINGS[Math.abs(seed|0)%3]}
function rival(){
 const war=W.war();if(war&&Number.isSafeInteger(war.rivalId)&&war.rivalId>0)return kingdomOf(war.rivalId);
 if(W.scenario()==='skirmish'){const k=W.buildings().find(x=>x.team===1&&x.type==='keep');if(k)return kingdomOf(k.id)}
 return null;
}
window.sc66Enemy=function(b){
 if(b.team!==1||b.scHoldPosition||(b.type!=='soldier'&&b.type!=='archer'))return null;
 const k=rival();if(!k)return null;const name=b.type==='archer'?k.archer:k.soldier;return art()[name]?name:null;
};

/* ---- upgrades ---- */
const TIERS={
 house:{label:'House',art:[null,'house','upgrade_house_2','upgrade_house_3'],w:70,cost:[null,null,{wood:50,gold:30},{stone:60,gold:60}],perMin:[0,0,{gold:4},{gold:8}],names:['','Cottage','Timbered house','Stone townhouse']},
 farm:{label:'Farm',art:[null,'farm','upgrade_farm_2','upgrade_farm_3'],w:96,cost:[null,null,{wood:60,gold:30},{stone:50,gold:70}],perMin:[0,0,{food:6},{food:12}],names:['','Smallholding','Cornfield farm','Mill farm']},
 market:{label:'Market',art:[null,'market','upgrade_market_2','upgrade_market_3'],w:82,cost:[null,null,{wood:70,gold:50},{stone:70,gold:100}],perMin:[0,0,{gold:8},{gold:16}],names:['','Stall','Market square','Guild hall market']},
 keep:{label:'Royal Keep',art:[null,'keep','upgrade_keep_2','upgrade_keep_3'],w:132,cost:[null,null,{wood:100,stone:60,gold:100},{stone:150,gold:250}],perMin:[0,0,{gold:10},{gold:20}],names:['','Tower keep','Fortified keep','Castle']}
};
let curCity=null,map={};
function loadAll(){try{const o=JSON.parse(localStorage.getItem(KEY)||'{}');return o&&typeof o==='object'?o:{}}catch(_){return {}}}
function levels(){const id=String(W.cityId()||'');if(id!==curCity){curCity=id;map=loadAll()[id]||{}}return map}
function level(b){const v=levels()[b.id];return v===2||v===3?v:1}
function setLevel(b,v){const all=loadAll(),id=String(W.cityId()||'');all[id]=Object.assign({},all[id],{[b.id]:v});try{localStorage.setItem(KEY,JSON.stringify(all))}catch(_){}curCity=null;levels()}
function costText(c){return Object.entries(c).map(([k,v])=>v+' '+k).join(', ')}
function can(c){const r=W.res();return Object.entries(c).every(([k,v])=>(r[k]||0)>=v)}
function eligible(b){return !!TIERS[b.type]&&b.team===0&&b.hp>0&&W.scenario()==='city'&&!(b.type==='keep'&&b.max<1500)}
function upgrade(b){
 const t=TIERS[b.type];if(!t||!eligible(b))return {ok:false,reason:'not here'};
 const lv=level(b);if(lv>=3)return {ok:false,reason:'already at the highest look'};
 const c=t.cost[lv+1];if(!W.pay(c))return {ok:false,reason:'not enough resources'};
 setLevel(b,lv+1);W.msg(t.label+' upgraded: '+t.names[lv+1]+'.');W.refresh();return {ok:true,level:lv+1};
}
function menuFor(b){
 const t=TIERS[b.type],lv=level(b);
 if(!eligible(b))return {html:'',bind:()=>{}};
 const bonus=Object.entries(t.perMin[lv]||{}).map(([k,v])=>'+'+v+' '+k+'/min').join(', ');
 const head='<div class="sc66Up" style="margin-top:6px;padding-top:6px;border-top:1px solid #7a5d3a"><b>Look '+lv+' of 3 · '+t.names[lv]+'</b>'+(bonus?'<div>Bonus: '+bonus+'</div>':'');
 if(lv>=3)return {html:head+'<div>Fully upgraded.</div></div>',bind:()=>{}};
 const c=t.cost[lv+1],ok=can(c),nb=Object.entries(t.perMin[lv+1]).map(([k,v])=>'+'+v+' '+k+'/min').join(', ');
 return {html:head+'<button type="button" data-sc66up="'+b.id+'"'+(ok?'':' disabled')+'>Upgrade to '+t.names[lv+1]+' ('+costText(c)+')</button><div style="font-size:11px;opacity:.85">'+(ok?'Gives '+nb+'.':'Needs '+costText(c)+'. Gives '+nb+'.')+'</div></div>',
  bind:h=>{const btn=h.querySelector('[data-sc66up]');if(btn)btn.onclick=()=>{const id=Number(btn.dataset.sc66up),cur=W.buildings().find(x=>x.id===id);if(cur)upgrade(cur)}}};
}
function hookMenus(){
 const M=window.scBuildingMenus;if(!M||M.sc66)return false;M.sc66=true;
 const wrap=(type,prev)=>b=>{const mine=menuFor(b),p=prev?prev(b):{html:''};return {html:(p.html||'')+mine.html,bind:h=>{if(p.bind)p.bind(h);mine.bind(h)}}};
 const reg=M.register;
 M.register=(type,fn)=>reg(type,TIERS[type]?wrap(type,fn):fn);
 for(const type of Object.keys(TIERS))reg(type,wrap(type,M.has(type)?M.get(type):null));
 return true;
}
if(!hookMenus()){let n=0;const w=setInterval(()=>{if(hookMenus()||++n>60)clearInterval(w)},500)}
/* bonus per minute, from game time (paused time earns nothing) */
let lastT=null;
setInterval(()=>{
 if(W.scenario()!=='city'){lastT=null;return}
 const t=W.elapsed();if(lastT===null||t<lastT||t-lastT>5){lastT=t;return}
 const dt=t-lastT;lastT=t;if(dt<=0||W.paused())return;
 const g={gold:0,food:0};
 for(const b of W.buildings()){if(b.team!==0||!(b.hp>0)||!TIERS[b.type])continue;const per=TIERS[b.type].perMin[level(b)];if(per){g.gold+=(per.gold||0)*dt/60;g.food+=(per.food||0)*dt/60}}
 if(g.gold||g.food)W.gain(g);
},1000);

/* ---- painting: upgraded looks, guards, children, sheep ---- */
const base=window.sc47Paint;
const now=()=>performance.now()/1000;
function figure(g,name,x,y,h,flip){const im=image(name);if(!im)return;const w=h*im.naturalWidth/im.naturalHeight;g.save();g.fillStyle='rgba(40,34,24,.25)';g.beginPath();g.ellipse(x,y+1,w*.34,2.5,0,0,Math.PI*2);g.fill();if(flip){g.translate(x,0);g.scale(-1,1);g.drawImage(im,-w/2,y-h,w,h)}else g.drawImage(im,x-w/2,y-h,w,h);g.restore()}
if(typeof base==='function'){
 window.sc47Paint=function(g,b,w0,key){
  const k=key||b.type,t=TIERS[k],mine=b.team===0&&(!key||key===b.type)&&!(b.type==='keep'&&b.max<1500);
  let ok;
  const lv=t&&mine?level(b):1;
  if(lv>1&&t.art[lv]){const im=image(t.art[lv]);if(im){const w=t.w,h=w*im.naturalHeight/im.naturalWidth;g.drawImage(im,b.x-w/2,b.y+17-h,w,h);ok=true}}
  if(!ok)ok=base.apply(this,arguments);
  if(ok&&mine){
   const T=now();
   if(k==='keep'&&b.hp>0){figure(g,'unit_kings_guard',b.x-30,b.y+21,32,false);figure(g,'unit_kings_guard',b.x+24,b.y+21,32,true)}
   else if(k==='house'&&(b.id%2===0)){const off=Math.sin(T*.5+b.id)*12,dir=Math.cos(T*.5+b.id)<0;figure(g,'unit_children',b.x+10+off,b.y+24,19,dir)}
   else if(k==='farm'){const off=Math.sin(T*.25+b.id*1.7)*8;figure(g,'unit_sheep',b.x+46+off,b.y+23,24,off<0&&Math.cos(T*.25+b.id*1.7)<0)}
  }
  return ok;
 };
}
window.sc66World.api={kingdoms:()=>KINGS.map(k=>({...k})),rival:()=>{const k=rival();return k&&k.id},level:b=>level(b),upgrade,tiers:()=>Object.keys(TIERS),perMin:(type,lv)=>({...(TIERS[type].perMin[lv]||{})}),cost:(type,lv)=>({...(TIERS[type].cost[lv]||{})}),kingdomOf:seed=>kingdomOf(seed).id};
window.sc66Upgrades=window.sc66World.api;
})();
