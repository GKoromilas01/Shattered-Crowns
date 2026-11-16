/* v0.29 resource profile: terrain shifts abundance, never removes a main resource. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.scResourceProfile=api;})(typeof window!=='undefined'?window:globalThis,function(){
const MULT=[0,0.6,0.85,1.15,1.5];            // level 1..4 -> multiplier (never zero)
const MIN_START={wood:120,stone:60,food:80}; // enough to build a first few things anywhere
const BASE_START={wood:180,stone:100,food:120};
const SPECIALTY={forest:'planks',tundra:'furs','tundra highland':'tools',dryland:'cloth','dryland highland':'tools',oasis:'dyes',coast:'salt',highland:'tools'};
const clamp=l=>Math.max(1,Math.min(4,Math.round(Number(l)||1)));
function levels(r){const[t,s,g,f,a]=(r||[1,1,1,1,1]).map(clamp);return {wood:t,stone:s,food:clamp((a*2+g+f)/4)};}
function profile(site){
 const lv=levels(site.r),mult={},start={},short=[],surplus=[];
 for(const k of ['wood','stone','food']){
  mult[k]=MULT[lv[k]];
  start[k]=Math.max(MIN_START[k],Math.round(BASE_START[k]*mult[k]));
  if(lv[k]<=2)short.push(k);if(lv[k]>=4)surplus.push(k);
 }
 return {levels:lv,income:mult,start,short,surplus,specialty:SPECIALTY[site.b]||'tools'};
}
/* A trade order asks the market for the goods a village is short of. */
function tradeNeeds(site,stock){const p=profile(site);return p.short.filter(k=>(stock[k]||0)<BASE_START[k]);}
return {MULT,MIN_START,BASE_START,SPECIALTY,levels,profile,tradeNeeds};
});
