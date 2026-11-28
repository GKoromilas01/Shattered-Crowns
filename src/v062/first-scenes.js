/* v0.62: one short film when the first school, chapel, theatre or shipyard is finished. Verse subtitles describe the picture; the game's music keeps playing. */
(()=>{'use strict';
const SCENES={
 parade:{video:'milestone_parade',title:'The Defenders Return',caption:'Our defenders return.',lines:['For hearth and home, the village welcomes them.']},
 homes:{video:'milestone_homes',title:'A Hearth for Every Family',caption:'A hearth for every family.',lines:['Smoke rises. At last, a place to call home.']},
 market:{video:'milestone_market',title:'Market Day',caption:'The first market opens.',lines:['Bread, honest trade, and stories shared.']},
 growth:{video:'milestone_growth',title:'The Village Grows',caption:'Our village grows.',lines:['New neighbours. New hands. A future together.']},
 school:{video:'school',title:'The first school',caption:'The first school opens its door.',lines:['The beams are laid, the tiles upon the roof.','A scholar opens wide the oaken door,','And little feet step in to meet the light.','Here shall our children learn what swords forget.']},
 chapel:{video:'chapel',title:'The first chapel',caption:'At dawn the first chapel is blessed.',lines:['At dawn the stones are set, the bell is raised;','A humble priest doth bless the threshold new.','Let candles keep the vigil of our hopes,','And let this hamlet pray for gentler days.']},
 theater:{video:'theater',title:'The first theatre',caption:'The players take the first stage.',lines:['Behold a stage of timber, bright with banners,','Where players practise sorrow, wit and war.','The town doth gather round to laugh and weep:','This village is a stage, and we its players.']},
 shipyard:{video:'shipyard',title:'The first shipyard',caption:'The first keel is laid by the river.',lines:["Hard by the river's brim the ribs are bent,",'And patient hands do coax a hull from oak.','The mist doth lift; the water beckons forth:','Make fast the rope, and let the keel be laid.']}
};
const KEY='shattered-crowns-first-scenes-v1';let active=null,epoch=0;const pending=[];
const seen=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch(_){return {}}};
const remember=k=>{try{const s=seen();s[k]=1;localStorage.setItem(KEY,JSON.stringify(s))}catch(_){}};
function cancel(){epoch++;pending.length=0;if(active){const close=active;active=null;close(false)}}
function enqueue(type,onDone=()=>{}){pending.push({type,onDone,epoch});pump();}
function pump(){if(active||document.getElementById('sc47Intro')||document.hidden)return;const next=pending.shift();if(next&&next.epoch===epoch)play(next.type,next.onDone);}
setInterval(pump,250);
function play(type,onDone=()=>{}){const scene=SCENES[type];if(!scene||!window.sc47Video?.[scene.video]){onDone();return false}if(active){const close=active;active=null;close(true,true);}
 const token=epoch,cityId=window.scCitySave?.status().cityId,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches,pause=document.getElementById('sc154Pause');let ownsPause=false;if(pause&&!window.scCitySave?.status().paused){pause.click();ownsPause=true}
 const o=document.createElement('div');o.id='sc62Scene';o.dataset.scene=type;o.setAttribute('role','dialog');o.setAttribute('aria-modal','true');o.setAttribute('aria-label',scene.title);o.tabIndex=-1;o.style.cssText='position:fixed;inset:0;z-index:2147482000;background:#080d0c;color:#fff0ce;transition:opacity .6s';
 const video=document.createElement('video');video.muted=true;video.playsInline=true;video.style.cssText='position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:'+(reduce?'1':'0');
 const mk=(id,css)=>{const e=document.createElement('p');e.id=id;e.style.cssText='position:absolute;margin:0;pointer-events:none;opacity:0;text-shadow:0 2px 10px #000,0 0 3px #000;'+css;return e};
 const cap=mk('sc62Caption','left:0;right:0;bottom:20%;padding:12px 8%;text-align:center;color:#fff6dc;font:italic 22px/1.5 Georgia,serif');
 const sub=mk('sc62Subtitle','left:0;right:0;bottom:6%;margin:0 auto;max-width:min(860px,88%);padding:10px 18px;text-align:center;color:#fff6dc;font:italic 22px/1.5 Georgia,serif;background:transparent');sub.setAttribute('aria-live','polite');
 const ttl=mk('sc62Title','left:4%;top:5%;color:#fff6dc;font:italic 22px/1.5 Georgia,serif');ttl.setAttribute('aria-hidden','true');
 const next=document.createElement('button');next.type='button';next.id='sc62Continue';next.textContent='Continue';next.style.cssText='position:absolute;right:4%;top:5%;padding:8px 16px;border:1px solid #e8cd94;border-radius:6px;background:rgba(8,13,12,.6);color:#fff0ce;font:15px Georgia,serif;cursor:pointer;opacity:0;transition:opacity .5s';
 cap.textContent=scene.caption;ttl.textContent=scene.title;o.append(video,cap,sub,ttl,next);document.body.append(o);
 let done=false,cleaned=false,cleanupTimer=0,raf=0;const fresh=()=>!done&&token===epoch;
 function frame(){if(!fresh())return;const d=video.duration,t=video.currentTime,ok=Number.isFinite(d)&&d>0,p=ok?t/d:0,edge=Math.min(.5,ok?d/3:.5),v=reduce?1:Math.max(0,Math.min(1,t/edge,ok?(d-t)/edge:1));video.style.opacity=String(v);
  const ease=(s,len)=>reduce?1:Math.max(0,Math.min(1,s/.4,(len-s)/.4)),from=.26,to=.97;cap.style.opacity=String(p<.24?Math.min(v,ease(t-.03*d,.21*d)):0);
  let text='',op=0;if(ok&&p>=from&&p<to){const len=(to-from)*d/scene.lines.length,s0=t-from*d,k=Math.min(scene.lines.length-1,Math.floor(s0/len));text=scene.lines[k];op=Math.min(v,ease(s0-k*len,len))}
  if(sub.textContent!==text)sub.textContent=text;sub.style.opacity=String(op);ttl.style.opacity=String(ok&&p>=from&&p<to?Math.min(v,reduce?1:Math.min(1,(t-from*d)/.6,(to*d-t)/.6)):0);next.style.opacity=t>1.5?'1':'0';raf=requestAnimationFrame(frame)}
 function cleanup(resume,immediate){if(cleaned)return;cleaned=true;clearTimeout(cleanupTimer);o.remove();if(active===closer)active=null;
  const sameCity=token===epoch&&window.scCitySave?.status().cityId===cityId;if(resume&&sameCity&&ownsPause&&pause&&window.scCitySave?.status().paused)pause.click();if(sameCity)onDone();if(sameCity&&resume&&!immediate)pump();}
 function finish(resume=true,immediate=false){if(cleaned)return;if(done){if(!resume||immediate)cleanup(resume,immediate);return;}done=true;cancelAnimationFrame(raf);document.removeEventListener('keydown',key,true);document.removeEventListener('visibilitychange',vis);video.pause();
  if(!resume||reduce||immediate){cleanup(resume,immediate);return;}o.style.opacity='0';cleanupTimer=setTimeout(()=>cleanup(resume,false),600);}
 const closer=(r,i)=>finish(r,i);function key(e){if(done)return;if(e.key==='Tab'){e.preventDefault();next.focus();return}if(!['Escape','Enter',' '].includes(e.key))return;e.preventDefault();e.stopImmediatePropagation();if(e.key===' '){if(video.paused)video.play().catch(()=>finish());else video.pause()}else finish()}
 function vis(){if(document.hidden)video.pause();else video.play().catch(()=>finish())}
 next.addEventListener('click',()=>finish());video.addEventListener('ended',()=>finish());video.addEventListener('error',()=>finish());document.addEventListener('keydown',key,true);document.addEventListener('visibilitychange',vis);
 active=closer;video.src=window.sc47Video[scene.video];video.play().catch(()=>finish());o.focus();raf=requestAnimationFrame(frame);return true}
function cityKey(type){let id='';try{id=window.scCitySave.status().cityId||''}catch(_){}return id+':'+type}
function onBuilt(e){const type=e.detail?.type;if(!['school','chapel','theater','shipyard'].includes(type))return;if(navigator.webdriver&&!/[?&]intro=1/.test(location.search))return;const key=cityKey(type);if(seen()[key])return;
 const count=(window.scHoverBuildings||[]).filter(b=>b.team===0&&b.type===type&&b.hp>0).length;if(count>1)return;remember(key);const generation=epoch;setTimeout(()=>{if(generation===epoch)enqueue(type)},900)}
window.addEventListener('sc-construction-completed',onBuilt);for(const ev of ['sc-city-restored','sc-city-started'])window.addEventListener(ev,cancel);
window.sc62Scenes={play,enqueue,cancel,types:()=>Object.keys(SCENES).filter(k=>!!window.sc47Video?.[SCENES[k].video]),status:()=>({open:!!active})};
})();
