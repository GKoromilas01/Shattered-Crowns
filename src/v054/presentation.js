/* Quiet town presentation. No simulation, building types or saved-world changes. */
(()=>{'use strict';
 const schedule=window.sc54BellSchedule.create();let lastEvent=null;
 const sound=document.getElementById('scAudioSection'),clock=document.createElement('p');clock.id='sc54TownTime';clock.title='Town time: 24 active minutes per day, starting at 06:00. School bell at 08:00. Chapel every 15 active minutes. No catch-up chimes.';sound?.append(clock);
 function poll(){const state=window.sc54TownState();const active=!state.paused&&!state.ended&&!document.hidden&&!document.getElementById('sc47Intro')&&!document.getElementById('sc50Entry')?.checkVisibility()&&!window.scCampaign.status().overview&&window.scCampaign.status().scenario==='city';
  clock.textContent='Town time '+window.sc54BellSchedule.time(state.elapsed)+' · School 08:00 · Chapel every 15 active minutes';
  for(const event of schedule.poll({...state,active})){if(window.scAudio.bell(event))lastEvent=event;}
 }
 window.sc54TownClock={poll,status:()=>({time:window.sc54BellSchedule.time(window.sc54TownState().elapsed),lastEvent})};
 for(const event of ['sc-city-started','sc-city-restored'])window.addEventListener(event,()=>{schedule.reset();lastEvent=null;poll()});
 document.addEventListener('visibilitychange',()=>{schedule.reset();poll()});setInterval(poll,1000);poll();
 // Preserve the existing crossing. Painted bridge is visual only; collision geometry stays unchanged.
 const bridge=new Image();bridge.src=window.sc47Art.bridge;
 window.sc54Bridge={ready:()=>bridge.complete&&bridge.naturalWidth>0,paint:g=>{if(!bridge.complete||!bridge.naturalWidth)return false;g.save();g.translate(500,315);g.rotate(.55);const w=110,h=w*bridge.naturalHeight/bridge.naturalWidth;g.drawImage(bridge,-w/2,-h/2,w,h);g.restore();return true}};
})();
