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
/* picker inside the Royal Keep's own building menu (the panel that opens when the keep is selected) */
function pickerHtml(){
 return '<section id="sc65Banner" aria-label="Keep banner"><strong>Banner</strong><div style="display:flex;gap:6px;margin:4px 0">'+BANNERS.map(b=>'<button type="button" data-banner="'+b.id+'" title="'+b.name+'" aria-label="Fly the '+b.name+' banner" aria-pressed="'+String(b.id===current.id)+'" style="padding:2px 6px;min-width:40px;height:42px;border:2px solid '+(b.id===current.id?'#e0b44a':'#8a6a36')+';border-radius:6px;background:rgba(0,0,0,.25);cursor:pointer"><img alt="" data-art="'+b.art+'" src="'+(art()[b.art]||'')+'" style="height:34px;width:auto;display:block;margin:0 auto"></button>').join('')+'</div><small style="font-style:italic">'+current.name+' · “'+current.motto+'”</small></section>';
}
function set(id){current=find(id);try{localStorage.setItem(KEY,current.id)}catch(_){}window.dispatchEvent(new CustomEvent('sc-banner-changed',{detail:{id:current.id}}));if(window.scBuildingMenus)window.scBuildingMenus.render(true)}
function install(){
 const menus=window.scBuildingMenus;if(!menus||menus.__sc65)return;menus.__sc65=true;
 const original=menus.get('keep');
 menus.register('keep',b=>{const base=original?original(b):null;return {html:(base?.html||'')+pickerHtml(),bind:h=>{if(base?.bind)base.bind(h);h.querySelectorAll('#sc65Banner button').forEach(btn=>{btn.onclick=()=>set(btn.dataset.banner)})}}});
}
install();
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
