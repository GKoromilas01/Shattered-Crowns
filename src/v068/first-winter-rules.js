/* Pure First Winter rules. Times are existing simulation seconds, never wall time. */
(function(root){'use strict';
const DURATION=480,EVENTS=['caravan','cold','merchant'],AT=[120,240,360];
const OPTIONS={caravan:{buy:{gold:-40,food:30},decline:{}},cold:{warm:{wood:-30,happiness:8},conserve:{happiness:-8}},merchant:{buy:{gold:-25,stone:30},decline:{}}};
function start(now){return {version:1,startedAt:now,choices:[],outcome:'active',assessedAt:null}}
function pending(q,now){return q&&q.outcome!=='won'&&q.choices.length<3&&now>=q.startedAt+AT[q.choices.length]?EVENTS[q.choices.length]:null}
function choose(q,now,action,stock){const event=pending(q,now),delta=event&&Object.hasOwn(OPTIONS[event],action)&&OPTIONS[event][action];if(!delta)return {ok:false,message:'That decision is no longer available.'};for(const [k,v] of Object.entries(delta))if(v<0&&k!=='happiness'&&!(stock[k]>=-v))return {ok:false,message:'Not enough '+k+'.'};return {ok:true,state:{...q,choices:[...q.choices,action]},delta:{...delta}}}
function checks(s){return [
{id:'homes',label:'Two living houses',ok:s.houses>=2},
{id:'producer',label:'A staffed, open Farm or Fishery',ok:!!s.producer},
{id:'food',label:'Food covers demand; reserve of '+Math.max(40,s.population*2),ok:s.production>=s.demand&&s.food>=Math.max(40,s.population*2)},
{id:'morale',label:'Happiness at least 55',ok:s.happiness>=55},
{id:'materials',label:'40 wood and 20 stone in reserve',ok:s.wood>=40&&s.stone>=20},
{id:'defense',label:'Two soldiers/archers or a Watchtower',ok:s.army>=2||!!s.tower}];}
function assess(q,now,stock){if(!q||q.outcome==='won'||q.choices.length!==3||now<q.startedAt+DURATION)return {ok:false,message:'Finish the three decisions and the winter preparation period first.'};const won=checks(stock).every(x=>x.ok);return {ok:true,state:{...q,outcome:won?'won':'review',assessedAt:now},message:won?'First Winter secured. Your settlement can continue growing.':'Winter readiness is incomplete. Improve the unchecked needs, then reassess.'}}
function parse(q,now){if(q===null)return null;const fail=()=>{throw Error('Invalid First Winter checkpoint. Your city has not changed.')};if(!q||Array.isArray(q)||Object.keys(q).sort().join(',')!=='assessedAt,choices,outcome,startedAt,version'||q.version!==1||!Number.isFinite(q.startedAt)||q.startedAt<0||q.startedAt>now||!Array.isArray(q.choices)||q.choices.length>3||!['active','review','won'].includes(q.outcome))fail();q.choices.forEach((x,i)=>{if(!Object.hasOwn(OPTIONS[EVENTS[i]],x)||now<q.startedAt+AT[i])fail()});if(q.outcome==='active'){if(q.assessedAt!==null)fail()}else if(q.choices.length!==3||!Number.isFinite(q.assessedAt)||q.assessedAt<q.startedAt+DURATION||q.assessedAt>now)fail();return JSON.parse(JSON.stringify(q))}
const api={DURATION,EVENTS,AT,start,pending,choose,checks,assess,parse};if(typeof module==='object'&&module.exports)module.exports=api;else root.scWinterRules=Object.freeze(api);
})(typeof window==='object'?window:globalThis);
