/* v0.64: a yearly rhythm. Each year the city holds an anniversary parade, two chapel holidays (needs a chapel) and a castle feast (needs a keep and enough food).
   Derived from the saved city cycle counter, so saves are unchanged. Add ?festivals=fast to the address for a short 6-cycle year when checking (parade after 15 s, throne quarrel after 30 s). */
(()=>{'use strict';
const fast=/[?&]festivals=fast/.test(location.search),YEAR=fast?6:48,core=()=>window.sc64Core;
const KIND={
 parade:{at:0,title:y=>'Year '+y+': the anniversary parade',lines:['Another year hath turned upon our wall;','Strike up the drums, and let the banners fly!'],note:'Residents are happier.'},
 holiday:{at:.25,title:()=>'Chapel holiday',lines:['The bell rings out; the candles warm the nave.','Rest, weary hands, and give the heavens thanks.'],note:'Residents are happier.',needs:'chapel'},
 feast:{at:.5,title:()=>'Castle feast',lines:['Set bread and wine upon the long oak board;','Let hall and hamlet feast as one tonight.'],note:'Costs 15 food. Residents are happier.',needs:'keep'},
 holiday2:{at:.75,title:()=>'Chapel holiday',lines:['The bell rings out; the candles warm the nave.','Rest, weary hands, and give the heavens thanks.'],note:'Residents are happier.',needs:'chapel'}
};
const FASTPOS={parade:1,holiday:3,feast:4,holiday2:5},THRONE=fast?2:Math.round(YEAR*.125),posOf=kind=>fast?FASTPOS[kind]:Math.round(YEAR*KIND[kind].at);
const MOOD={parade:6,holiday:4,holiday2:4,feast:8};
let banner=null,hideTimer=0,last=-1;
function show(title,lines,note){
 if(!banner){banner=document.createElement('div');banner.id='sc64Banner';banner.setAttribute('role','status');banner.setAttribute('aria-live','polite');banner.style.cssText='position:fixed;left:50%;top:76px;transform:translateX(-50%);z-index:2147481000;max-width:min(560px,92vw);padding:12px 20px;text-align:center;background:rgba(8,13,12,.82);border:1px solid #e8cd94;border-radius:8px;color:#fff0ce;font:15px/1.5 Georgia,serif;pointer-events:none;transition:opacity .5s';document.body.append(banner)}
 banner.replaceChildren();const h=document.createElement('strong');h.textContent=title;h.style.cssText='display:block;color:#e8cd94;font-size:17px';banner.append(h);
 for(const l of lines){const p=document.createElement('div');p.textContent=l;p.style.fontStyle='italic';banner.append(p)}
 if(note){const n=document.createElement('div');n.textContent=note;n.style.cssText='margin-top:6px;font:13px/1.4 system-ui,sans-serif;color:#cfe3c8';banner.append(n)}
 banner.style.opacity='1';clearTimeout(hideTimer);hideTimer=setTimeout(()=>{if(banner)banner.style.opacity='0'},9000)}
function run(kind,year){
 const k=KIND[kind],c=core();if(!k||!c)return {ok:false,message:'Unknown event.'};
 if(k.needs&&!c.has(k.needs))return {ok:false,message:'Needs a '+k.needs+'.'};
 if(kind==='feast'){const s=c.stock();if(s.food<40){show('No castle feast this year',['The larder is bare; the board must wait.'],'Needs at least 40 food in store.');return {ok:false,message:'Not enough food.'}}c.give(0,-15)}
 c.mood(MOOD[kind]);show(k.title(year),k.lines,k.note);return {ok:true,kind,year};
}
function tick(){
 const c=core();if(!c||!c.city()||c.ended()||c.paused())return;
 const now=c.cycle();if(last<0||now<last){last=now;return}
 for(let n=Math.max(last+1,now-3);n<=now;n++){const pos=n%YEAR,year=Math.floor(n/YEAR);
  for(const [kind,k] of Object.entries(KIND)){if(posOf(kind)!==pos)continue;if(!fast&&kind==='parade'&&year<1)continue;if(n<1)continue;run(kind,Math.max(1,year))}
  if((fast||year>=1)&&pos===THRONE&&n>=1&&window.sc64Throne)window.sc64Throne.maybeOpen()}
 last=now}
for(const ev of ['sc-city-started','sc-city-restored'])window.addEventListener(ev,()=>{last=-1});
setInterval(tick,700);
window.sc64Calendar={yearCycles:YEAR,year:()=>core()?Math.floor(core().cycle()/YEAR):0,trigger:kind=>run(kind,Math.max(1,window.sc64Calendar.year())),show,kinds:()=>Object.keys(KIND)};
})();
