/* v0.65: the keep's banner. Three heraldic banners (crimson lion, green stag, blue tower), chosen in the Royal Keep panel, flown beside the keep, with the house motto shown when a city begins. Stored per browser only; saves are untouched. */
(()=>{'use strict';
const KEY='shattered-crowns-banner-v1';
const BANNERS=[
 {id:'crimson',art:'banner_crimson',name:'Crimson Lion',motto:'Though crowns be shattered, we endure.'},
 {id:'green',art:'banner_green',name:'Green Stag',motto:'Swift to the harvest, slow to wrath.'},
 {id:'blue',art:'banner_blue',name:'Blue Tower',motto:'Stone upon stone, the realm is raised.'}
];
const find=id=>BANNERS.find(b=>b.id===id)||BANNERS[0];
let current=find((()=>{try{return localStorage.getItem(KEY)}catch(_){return null}})());
const art=()=>window.sc47Art||{};
const imgs={};
function image(b){const src=art()[b.art];if(!src)return null;let im=imgs[b.id];if(!im){im=imgs[b.id]=new Image();im.src=src}return im.complete&&im.naturalWidth?im:null}
/* draw the banner beside the keep */
const base=window.sc47Paint;
if(typeof base==='function'){
 window.sc47Paint=function(g,b,w0,key){const ok=base.apply(this,arguments);const k=key||b.type;
  if(ok&&(k==='keep')){const im=image(current);if(im){const w=26,h=w*im.naturalHeight/im.naturalWidth;g.drawImage(im,b.x+50,b.y+17-h-18,w,h)}}
  return ok};
}
/* picker inside the Royal Keep panel */
const sel=document.getElementById('sc140Selection');
let box=null;
function render(){
 if(!box)return;box.querySelectorAll('button').forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.banner===current.id)));
 const t=box.querySelector('small');if(t)t.textContent=current.name+' · “'+current.motto+'”';
}
function set(id){current=find(id);try{localStorage.setItem(KEY,current.id)}catch(_){}render();window.dispatchEvent(new CustomEvent('sc-banner-changed',{detail:{id:current.id}}))}
function build(){
 if(!sel||document.getElementById('sc65Banner'))return;
 box=document.createElement('div');box.id='sc65Banner';box.hidden=true;box.style.cssText='display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin-top:6px';
 const lab=document.createElement('span');lab.textContent='Banner:';lab.style.cssText='font-size:13px';box.append(lab);
 for(const b of BANNERS){const btn=document.createElement('button');btn.type='button';btn.dataset.banner=b.id;btn.title=b.name;btn.setAttribute('aria-label','Fly the '+b.name+' banner');btn.style.cssText='padding:2px 6px;min-width:40px;height:42px;border:2px solid #8a6a36;border-radius:6px;background:rgba(0,0,0,.25);cursor:pointer';
  const im=document.createElement('img');im.alt='';im.style.cssText='height:34px;width:auto;display:block;margin:0 auto';const put=()=>{if(art()[b.art]){im.src=art()[b.art];return true}return false};if(!put()){const w=setInterval(()=>{if(put())clearInterval(w)},500)}
  btn.append(im);btn.onclick=()=>set(b.id);box.append(btn)}
 const t=document.createElement('small');t.style.cssText='flex-basis:100%;font-style:italic';box.append(t);sel.append(box);render();
}
function refresh(){if(!box)return;const s=sel.querySelector('strong');box.hidden=!(s&&/Royal Keep/.test(s.textContent))}
build();setInterval(refresh,300);
/* the motto, once, when a city begins */
let card=null;
function motto(){
 const quiet=()=>!document.hidden&&!document.getElementById('sc47Intro')&&!document.getElementById('sc62Scene')&&!(document.getElementById('sc1310Welcome')&&document.getElementById('sc1310Welcome').hidden===false);
 let tries=0;const wait=setInterval(()=>{if(++tries>600){clearInterval(wait);return}if(!quiet())return;clearInterval(wait);showMotto()},500);
}
function showMotto(){
 if(card)card.remove();card=document.createElement('div');card.id='sc65Motto';card.setAttribute('role','status');
 card.style.cssText='position:fixed;left:50%;transform:translateX(-50%);top:calc(var(--sc-hud-height,115px) + 14px);z-index:3000;max-width:min(620px,90vw);box-sizing:border-box;padding:12px 20px;text-align:center;color:#fff0ce;background:rgba(18,30,26,.9);border:1px solid #b79b62;border-radius:8px;font:italic clamp(15px,1.8vw,19px)/1.45 Georgia,serif;transition:opacity 1.5s';
 const h=document.createElement('small');h.textContent='The motto of this city';h.style.cssText='display:block;font:12px system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;opacity:.8;margin-bottom:4px';
 card.append(h,document.createTextNode('“'+current.motto+'”'));document.body.append(card);
 const mine=card;setTimeout(()=>{mine.style.opacity='0'},9000);setTimeout(()=>{mine.remove();if(card===mine)card=null},10600);
}
window.addEventListener('sc-city-started',()=>{if(!(navigator.webdriver&&!new URLSearchParams(location.search).has('motto')))motto()});
window.sc65Banner={list:()=>BANNERS.map(b=>({...b})),current:()=>current.id,set,motto:()=>current.motto,showMotto};
})();
