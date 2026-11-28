/* Owner media replay and earned first-defence presentation. No economy changes. */
(()=>{'use strict';const menu=document.getElementById('sc146Menu');if(!menu)return;
const films=[['homes','A Hearth for Every Family'],['market','Market Day'],['growth','The Village Grows'],['parade','The Defenders Return']],tracks=[['leo_crown_i','Crown Anthem I · 2:00'],['leo_crown_ii','Crown Anthem II · 2:00'],['leo_roman_new','Roman Rebuilding · 2:50']];
const section=document.createElement('section');section.id='sc70Media';section.innerHTML='<h3>Films & new music</h3><p>Replay the new films or choose a new recording. Replaying does not change city progress.</p>';menu.append(section);
function button(label,attr,value,action){const b=document.createElement('button');b.type='button';b.textContent=label;b.setAttribute(attr,value);b.addEventListener('click',e=>{e.stopPropagation();menu.classList.remove('open');action()});section.append(b)}
for(const [key,title]of films)button(title,'data-sc70-film',key,()=>window.sc62Scenes.play(key));for(const [key,title]of tracks)button(title,'data-sc70-music',key,()=>{window.scMusic.select(key);window.scAudio.configure({music:true});});
const style=document.createElement('style');style.textContent='#sc70Media{border-top:1px solid #8d7951;padding-top:8px}#sc70Media button{position:static!important;float:none!important;display:inline-block;margin:4px;padding:7px 10px;white-space:normal;max-width:100%}';document.head.append(style);
const KEY='shattered-crowns-parades-v1';let celebrated=new Set();try{const q=JSON.parse(localStorage.getItem(KEY)||'[]');if(Array.isArray(q)&&q.every(x=>typeof x==='string'))celebrated=new Set(q)}catch(_){}
function checkParade(){const city=window.scCitySave.status().cityId,q=window.scWar.snapshot();if(!city||celebrated.has(city)||!q.supported||!['active','won'].includes(q.phase)||q.waves<1||document.hidden||window.sc62Scenes.status().open||document.getElementById('sc47Intro')||document.getElementById('sc1310Welcome')?.hidden===false)return false;
 if(!window.scHoverBuildings.some(b=>b.team===0&&b.type==='keep'&&b.hp>0)||window.scRTSUnits.some(u=>u.team===1&&u.hp>0))return false;
 celebrated.add(city);try{localStorage.setItem(KEY,JSON.stringify([...celebrated].slice(-100)))}catch(_){}window.sc62Scenes.enqueue('parade');return true;}
window.sc70Media=Object.freeze({checkParade});setInterval(()=>{if(!window.scCitySave.status().paused)checkParade()},1000);
})();
