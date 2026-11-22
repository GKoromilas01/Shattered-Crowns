/* Shipyard actions stay in its inspector; Fleet opens only on request. */
(()=>{'use strict';const api=window.scHarbour;if(!api)return;let epoch=0,key='';
 const make=(tag,parent,text,id)=>{const n=document.createElement(tag);if(id)n.id=id;if(text)n.textContent=text;parent?.append(n);return n};
 const style=make('style',document.head);style.textContent='#sc56Fleet{box-sizing:border-box;width:min(540px,94vw);max-height:85vh;overflow:auto;background:#19372e;color:#f1dfb5;border:1px solid #b79b62;border-radius:9px;padding:18px}#sc56Fleet::backdrop{background:#0008}#sc56Fleet button{background:#3d5140;color:#fff0ce;border:1px solid #b79b62;border-radius:4px;padding:7px;margin:4px;white-space:normal}#sc56Fleet button:disabled{opacity:.45}#sc56Fleet article{border-top:1px solid #827451;padding:8px 0}#sc56Fleet img{width:76px;height:50px;object-fit:contain;float:left;margin-right:12px}#sc56Fleet p{overflow-wrap:anywhere}';
 const source=make('button',document.getElementById('quickDock'),'Shipyard · 120 wood · 90 gold · 40 stone');source.type='button';source.dataset.action='shipyard';source.onclick=()=>api.arm();
 const fleet=make('dialog',document.body,null,'sc56Fleet');fleet.setAttribute('aria-labelledby','sc56FleetTitle');make('h2',fleet,'Harbour & Fleet','sc56FleetTitle');const close=make('button',fleet,'Close');close.type='button';close.onclick=()=>fleet.close();const list=make('div',fleet);const feedback=make('p',fleet);feedback.setAttribute('role','status');
 const open=make('button',document.getElementById('sc146Menu'),'Fleet','sc56FleetOpen');open.type='button';open.onclick=()=>{refresh(true);if(!fleet.open)fleet.showModal()};
 const allowed=e=>e===epoch&&window.sc50UI.activationAllowed()&&window.scCaravan.activationAllowed();
 function action(parent,label,attr,id,fn){const e=epoch,b=make('button',parent,label);b.type='button';b.setAttribute(attr,String(id));b.onclick=()=>{if(!allowed(e)){feedback.textContent='Town changed. Choose the action again.';return;}feedback.textContent=fn()?'Order accepted.':'Unavailable: check berth, resources or current order.';refresh(true)};return b;}
 function refresh(force=false){const focused=document.activeElement,focusKey=focused?.closest?.('#sc56Fleet button')?[...focused.attributes].find(a=>a.name.startsWith('data-')):null,scroll=fleet.scrollTop;const q=api.snapshot(),next=JSON.stringify([q.yards.map(y=>y.id),q.orders.map(o=>o.yardId),q.boats.map(b=>[b.id,b.homeId])]);
  if(force||key!==next){key=next;list.replaceChildren();if(!q.yards.length&&!q.boats.length)make('p',list,'Build a Shipyard on the south coast through Construction. Selected workers complete its foundation.');
   for(const y of q.yards){const row=make('article',list);row.dataset.yard=String(y.id);make('strong',row,'Shipyard #'+y.id);make('p',row,null).dataset.status='yard';action(row,'Order boat · 80 wood + 40 gold','data-yard-order',y.id,()=>api.order(y.id));action(row,'Cancel boat order · refund materials','data-yard-cancel',y.id,()=>api.cancel(y.id));}
   for(const b of q.boats){const row=make('article',list);row.dataset.boat=String(b.id);const im=make('img',row);im.src=window.sc47Art.ship;im.alt='';make('strong',row,'Coastal boat #'+b.id);make('p',row).dataset.status='boat';
    for(const [label,attr,delta]of [['Sail west','data-west',-180],['Sail east','data-east',180]])action(row,label,attr,b.id,()=>{const now=api.snapshot().boats.find(x=>x.id===b.id);return !!now&&api.sail(b.id,{x:Math.max(35,Math.min(q.width-35,now.x+delta)),y:840})});
    action(row,'Stop','data-stop',b.id,()=>api.stop(b.id));action(row,'Return to berth','data-home',b.id,()=>api.berth(b.id));}
  }
  for(const y of q.yards){const row=list.querySelector('[data-yard="'+y.id+'"]'),o=q.orders.find(o=>o.yardId===y.id),has=q.boats.some(b=>b.homeId===y.id);if(!row)continue;row.querySelector('[data-status]').textContent=y.staff+'/2 shipwright jobs filled · '+(o?'Boat '+Math.floor(o.progress/30*100)+'%'+(!y.staff?' · waiting for staff':''):has?'Boat launched':'Ready for an order');row.querySelector('[data-yard-order]').disabled=!!o||has||q.orders.length+q.boats.length>=20||q.wood<80||q.gold<40;row.querySelector('[data-yard-cancel]').disabled=!o;}
  for(const b of q.boats){const row=list.querySelector('[data-boat="'+b.id+'"]');if(!row)continue;row.querySelector('[data-status]').textContent=b.target?'Sailing along the coast':'Stopped in coastal water';row.querySelector('[data-home]').disabled=!q.yards.some(y=>y.id===b.homeId);}
  if(focusKey&&!focused.isConnected){const next=fleet.querySelector('['+focusKey.name+'="'+focusKey.value+'"]');(next&&!next.disabled?next:close).focus({preventScroll:true});fleet.scrollTop=scroll;}
 }
 window.scBuildingMenus.register('shipyard',b=>{const q=api.snapshot(),o=q.orders.find(o=>o.yardId===b.id),y=q.yards.find(y=>y.id===b.id),has=q.boats.some(x=>x.homeId===b.id),e=epoch;return {html:'<strong>Shipyard</strong><p>'+(y?.staff||0)+'/2 shipwrights · '+(o?'Boat '+Math.floor(o.progress/30*100)+'%':has?'Boat launched':'Boat: 80 wood + 40 gold · 30 staffed seconds')+'</p><button data-order '+(o||has||q.orders.length+q.boats.length>=20||q.wood<80||q.gold<40?'disabled':'')+'>Order coastal boat</button><button data-fleet>Open Fleet</button>',bind:host=>{host.querySelector('[data-order]').onclick=()=>{if(allowed(e))api.order(b.id)};host.querySelector('[data-fleet]').onclick=()=>{if(allowed(e))open.click()}}}});
 for(const event of ['sc-city-started','sc-city-restored'])window.addEventListener(event,()=>{epoch++;key='';feedback.textContent='';if(fleet.open)fleet.close();});window.addEventListener('sc-harbour-changed',()=>{if(fleet.open)refresh()});setInterval(()=>{if(fleet.open)refresh()},500);
 // Existing ship art is a full scene. Clip only its foreground boat at render time,
 // just as the building renderer clips atlas frames; no media file is edited.
 const ship=new Image();ship.src=window.sc47Art.ship;let sprite=null;
 function boatSprite(){if(sprite)return sprite;if(!ship.complete||!ship.naturalWidth)return null;sprite=document.createElement('canvas');sprite.width=400;sprite.height=520;const g=sprite.getContext('2d');g.translate(-50,-10);g.beginPath();
  for(const points of [
   [[104,331],[144,357],[191,371],[240,373],[282,349],[330,350],[356,323],[389,315],[410,343],[408,396],[367,419],[305,440],[235,450],[160,435],[111,413]],
   [[93,373],[109,388],[110,418],[163,439],[238,446],[304,433],[365,411],[403,374],[411,393],[403,434],[372,467],[314,490],[246,507],[171,501],[121,483],[96,455]],
   [[144,134],[260,104],[269,316],[255,351],[218,378],[193,326],[176,261]],
   [[278,100],[417,96],[410,146],[394,196],[375,250],[347,303],[306,341],[288,344]],
   [[264,28],[273,29],[280,417],[271,423]],
   [[273,44],[312,55],[325,66],[300,68],[274,61]],
   [[132,132],[420,92],[420,100],[136,140]]
  ]){g.moveTo(...points[0]);for(const p of points.slice(1))g.lineTo(...p);g.closePath();}
  g.clip();g.drawImage(ship,0,0,960,535);return sprite;
 }
 window.scHarbourPaint=g=>{const image=boatSprite();if(!image)return;for(const b of api.snapshot().boats){g.save();g.drawImage(image,b.x-32.4,b.y-89.1,72,93.6);g.restore()}};
})();
