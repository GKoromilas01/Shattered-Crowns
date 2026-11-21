/* Existing embedded videos play for each explicit New Game; resume never invokes this player. */
(()=>{'use strict';let active=null,epoch=0;function cancel(){epoch++;if(active){const close=active;active=null;close()}}
 const steps=[['village','Once, we had a home: a quiet village, full harvests and good neighbours.'],['attack','Then the barbarians came, and everything we loved burned.'],['march','The war is over. The survivors have lost their homes, but not each other.'],['hill','They climb a hill above a quiet valley. Here, they decide, a new kingdom begins.'],['house','Timber by timber, the first home rises.'],['market','Soon roads, trade and neighbours follow.'],['raiders','But every settlement is watched. Be ready.']];
 function play(onDone=()=>{}){cancel();if(navigator.webdriver&&!/[?&]intro=1/.test(location.search)){onDone();return;}const cityId=window.scCitySave.status().cityId,token=epoch;
  try{window.scMusic&&window.scMusic.select&&window.scMusic.select('leo_march')}catch(_){}
  const pause=document.getElementById('sc154Pause');let paused=false;
  if(pause&&!window.scCitySave.status().paused){pause.click();paused=true}
  const o=document.createElement('div');o.id='sc47Intro';o.setAttribute('role','dialog');o.setAttribute('aria-label','Opening story');
  o.style.cssText='position:fixed;inset:0;z-index:2147483000;background:#000;opacity:0;transition:opacity .6s';
  const v=document.createElement('video');v.muted=true;v.playsInline=true;v.style.cssText='position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:0;transition:opacity .5s';
  const cap=document.createElement('p');cap.style.cssText='position:absolute;left:0;right:0;bottom:12%;margin:0;padding:0 8%;text-align:center;color:#fff0ce;font:italic 22px/1.4 Georgia,serif;text-shadow:0 2px 12px #000,0 0 3px #000;opacity:0;transition:opacity .5s';
  const skip=document.createElement('button');skip.type='button';skip.textContent='Skip ▸';skip.style.cssText='position:absolute;right:18px;bottom:18px;border:1px solid #bca06a;border-radius:5px;background:#233e39cc;color:#fff0ce;padding:8px 14px;font:14px system-ui;cursor:pointer';
  o.append(v,cap,skip);document.body.append(o);requestAnimationFrame(()=>{o.style.opacity=1});
  let i=0,done=false,fade=0;
  function show(){if(done)return;while(i<steps.length&&!(window.sc47Video&&window.sc47Video[steps[i][0]]))i++;if(i>=steps.length)return end();v.style.opacity=0;cap.style.opacity=0;setTimeout(()=>{if(done)return;v.src=window.sc47Video[steps[i][0]];cap.textContent=steps[i][1];const pr=v.play();if(pr&&pr.catch)pr.catch(()=>{i++;show()});v.style.opacity=1;cap.style.opacity=1},350)}
  v.addEventListener('ended',()=>{i++;show()});v.addEventListener('error',()=>{i++;show()});
  function key(e){if(['Escape','Enter',' '].includes(e.key)){e.preventDefault();e.stopPropagation();end()}}
  function end(resume=true){if(done&&resume)return;done=true;clearTimeout(fade);document.removeEventListener('keydown',key,true);o.style.opacity=0;try{v.pause()}catch(_){}if(!resume){o.remove();return}fade=setTimeout(()=>{if(token!==epoch)return;o.remove();active=null;if(window.scCitySave.status().cityId===cityId){if(paused&&pause&&window.scCitySave.status().paused)pause.click();onDone()}},650)}
  active=()=>end(false);skip.addEventListener('click',()=>end());document.addEventListener('keydown',key,true);skip.focus();show();
 }
window.sc50Intro={play,cancel};for(const event of ['sc-city-restored','sc-city-started'])window.addEventListener(event,cancel);})();
