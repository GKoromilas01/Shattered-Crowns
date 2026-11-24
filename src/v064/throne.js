/* v0.64: the first throne decision. After the first anniversary a farmer and a miller bring a quarrel to the throne; the ruler's choice has a small, visible cost or gain. Shown once per browser. */
(()=>{'use strict';
const KEY='shattered-crowns-throne-v1',core=()=>window.sc64Core;let open=null;
const seen=()=>{try{return localStorage.getItem(KEY)==='1'}catch(_){return false}};
const remember=()=>{try{localStorage.setItem(KEY,'1')}catch(_){}};
const CHOICES=[
 {id:'share',label:'Share the stream (costs 12 gold, spirits rise)',gold:-12,mood:5,verse:['The stream is shared, and both depart content;','A little gold hath bought a quiet town.']},
 {id:'miller',label:'Favour the miller (gain 15 gold, spirits fall)',gold:15,mood:-4,verse:['The miller pays his tribute with a smile;','The farmer mutters curses at the gate.']}
];
function openScene(force){
 const c=core();if(!c||open||(!force&&(seen()||c.paused()||c.ended())))return false;
 const pause=document.getElementById('sc154Pause');let ownsPause=false;if(pause&&!window.scCitySave?.status().paused){pause.click();ownsPause=true}
 const o=document.createElement('div');o.id='sc64ThroneScene';o.setAttribute('role','dialog');o.setAttribute('aria-modal','true');o.setAttribute('aria-labelledby','sc64ThroneTitle');
 const art=window.sc47Art?.advisor;o.style.cssText='position:fixed;inset:0;z-index:2147482000;display:flex;align-items:center;justify-content:center;background:'+(art?'linear-gradient(rgba(5,8,8,.72),rgba(5,8,8,.82)),url('+art+') center/cover':'rgba(5,8,8,.9)');
 const box=document.createElement('div');box.style.cssText='max-width:min(620px,92vw);padding:24px 28px;text-align:center;color:#fff0ce;font:18px/1.6 Georgia,serif';
 const h=document.createElement('h2');h.id='sc64ThroneTitle';h.textContent='A quarrel at the throne';h.style.cssText='margin:0 0 10px;color:#e8cd94;font:600 24px Georgia,serif';
 const lines=document.createElement('div');lines.style.fontStyle='italic';for(const t of ['A farmer and a miller crave the stream;','Each swears the water was his father’s gift.','Your Majesty, whose word shall quench the strife?']){const p=document.createElement('p');p.textContent=t;p.style.margin='0';lines.append(p)}
 const row=document.createElement('div');row.style.cssText='display:flex;flex-direction:column;gap:10px;margin-top:18px';
 const res=document.createElement('div');res.setAttribute('role','status');res.style.cssText='margin-top:14px;min-height:3em';
 const buttons=[];
 function finish(){o.remove();open=null;if(ownsPause&&pause&&window.scCitySave?.status().paused)pause.click()}
 for(const ch of CHOICES){const b=document.createElement('button');b.type='button';b.dataset.choice=ch.id;b.textContent=ch.label;b.style.cssText='padding:10px 16px;font:16px system-ui,sans-serif;border:1px solid #e8cd94;border-radius:6px;background:rgba(8,13,12,.7);color:#fff0ce;cursor:pointer';
  if(ch.gold<0&&c.stock().gold<-ch.gold){b.disabled=true;b.textContent+=' — not enough gold'}
  b.onclick=()=>{c.give(ch.gold,0);c.mood(ch.mood);remember();for(const x of buttons)x.disabled=true;res.replaceChildren();for(const t of ch.verse){const p=document.createElement('div');p.textContent=t;p.style.fontStyle='italic';res.append(p)}
   const done=document.createElement('button');done.type='button';done.id='sc64ThroneDone';done.textContent='Continue';done.style.cssText=b.style.cssText+';margin-top:12px';done.onclick=finish;res.append(done);done.focus()};
  buttons.push(b);row.append(b)}
 box.append(h,lines,row,res);o.append(box);document.body.append(o);open={close:finish};(buttons.find(b=>!b.disabled)||buttons[0]).focus();
 o.addEventListener('keydown',e=>{if(e.key==='Tab'){const f=[...o.querySelectorAll('button:not([disabled])')];if(!f.length)return;const i=f.indexOf(document.activeElement);e.preventDefault();f[(i+(e.shiftKey?f.length-1:1))%f.length].focus()}});
 return true}
for(const ev of ['sc-city-started','sc-city-restored'])window.addEventListener(ev,()=>{if(open)open.close()});
window.sc64Throne={maybeOpen:()=>openScene(false),open:()=>openScene(true),status:()=>({open:!!open,seen:seen()}),reset:()=>{try{localStorage.removeItem(KEY)}catch(_){}}};
})();
