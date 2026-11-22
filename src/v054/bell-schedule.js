/* Presentation clock: one game hour per active simulation minute. Uses saved elapsed time. */
(function(root){'use strict';
 function create(){let previous=null,city=null;return {reset(){previous=null;city=null},poll(s){
  const now=s.elapsed;if(!Number.isFinite(now)||now<0)return [];
  const last=previous;previous=now;const replaced=city!==s.cityId;city=s.cityId;
  if(replaced||last===null||now<last||now-last>5||!s.active)return [];
  const events=[];
  if(s.chapel&&Math.floor(now/900)>Math.floor(last/900))events.push('chapel');
  if(s.school&&Math.floor((now-120)/1440)>Math.floor((last-120)/1440))events.push('school');
  return events;
 }};}
 const api={create,time:elapsed=>{const minutes=(360+Math.floor(Math.max(0,elapsed)))%1440;return String(Math.floor(minutes/60)).padStart(2,'0')+':'+String(minutes%60).padStart(2,'0')}};
 if(typeof module==='object'&&module.exports)module.exports=api;else root.sc54BellSchedule=api;
})(globalThis);
