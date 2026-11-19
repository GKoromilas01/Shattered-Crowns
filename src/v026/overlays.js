function sc26DrawOverlays(){
const sc26Motion=!matchMedia('(prefers-reduced-motion: reduce)').matches&&!paused&&!scOverview&&!document.hidden;
// Visual-only projectile trails and floating damage; hit timing and balance are unchanged.
for(let a of projectiles){let f=1-a.life/a.maxLife,x=a.x+(a.tx-a.x)*f,y=a.y+(a.ty-a.y)*f-25*Math.sin(f*Math.PI);ctx.save();ctx.strokeStyle=a.team===0?'#f5d48e':'#f5aaa0';ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(x-(a.tx-a.x)*.035,y-(a.ty-a.y)*.035);ctx.lineTo(x,y);ctx.stroke();ctx.fillStyle='#fff5c9';ctx.beginPath();ctx.arc(x,y,3,0,Math.PI*2);ctx.fill();ctx.restore()}
for(let a of combatTexts){let f=1-a.life/a.maxLife;ctx.save();ctx.globalAlpha=Math.min(1,a.life*3);ctx.font='bold 14px system-ui';ctx.textAlign='center';ctx.lineWidth=3;ctx.strokeStyle='#1d2428';ctx.strokeText(a.text,a.x,a.y-f*28);ctx.fillStyle=a.team===0?'#ffb7a8':'#fff0ae';ctx.fillText(a.text,a.x,a.y-f*28);ctx.restore()}
// V10.3 — Market neighborhood planning overlay. Selecting a market shows
// nearby homes and whether road access and staffing support trade activity.
// Informational only: this does not change tax or trade calculations.
if(inspectedBuilding&&alive(inspectedBuilding)&&inspectedBuilding.team===0&&inspectedBuilding.type==='market'){
 const m=inspectedBuilding;
 const service=cityProviderService(m,{network:getRoadNetwork()});
 const active=service.status==='ready';
 const homes=buildings.filter(h=>h.team===0&&alive(h)&&h.type==='house'&&dist(h,m)<190);
 ctx.save();ctx.fillStyle=active?'rgba(243,205,111,.07)':'rgba(219,128,105,.06)';
 ctx.strokeStyle=active?'#efc86c':'#e59a80';ctx.lineWidth=2;ctx.setLineDash([8,7]);
 ctx.beginPath();ctx.arc(m.x,m.y,190,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.setLineDash([]);
 for(const h of homes){ctx.strokeStyle=active?'#f3d889':'#b98c77';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(h.x,h.y+5,h.radius+9,13,0,0,Math.PI*2);ctx.stroke()}
 ctx.font='bold 14px system-ui';ctx.fillStyle=active?'#ffdf96':'#ffc0a9';ctx.textAlign='center';
 const label={ready:'MARKET SERVICE READY',no_food:'MARKET: EMPTY FOOD RESERVE',unstaffed:'MARKET: NEEDS STAFF',disconnected:'MARKET: CONNECT THREE ROAD SECTIONS'};
 ctx.fillText(label[service.status],m.x,m.y-200);
 ctx.restore();
}
// V10.3 bakery neighborhood service: inspect the bakery to see exactly which
// homes receive bread. This visual layer does not alter the approved economy.
if(inspectedBuilding&&alive(inspectedBuilding)&&inspectedBuilding.team===0&&inspectedBuilding.type==='bakery'){
 const b=inspectedBuilding;
 const granary=buildings.some(g=>g.team===0&&alive(g)&&g.type==='granary'&&dist(g,b)<190);
 const staffed=(employment.byId.get(b.id)?.efficiency||0)>=.5;
 const active=granary&&staffed&&food>=3;
 const nearbyHomes=buildings.filter(h=>h.team===0&&alive(h)&&h.type==='house'&&dist(h,b)<210);
 // Show which nearby granaries can supply this bakery, without altering production.
 const supplyGranaries=buildings.filter(g=>g.team===0&&alive(g)&&g.type==='granary'&&dist(g,b)<190);
 for(const g of supplyGranaries){
  ctx.save();ctx.strokeStyle='#9ee1ad';ctx.lineWidth=2;ctx.setLineDash([5,6]);
  ctx.beginPath();ctx.moveTo(b.x,b.y);ctx.lineTo(g.x,g.y);ctx.stroke();ctx.setLineDash([]);
  ctx.strokeStyle='#a9efbd';ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(g.x,g.y+4,g.radius+10,17,0,0,Math.PI*2);ctx.stroke();
  ctx.font='bold 12px system-ui';ctx.fillStyle='#c6f4cd';ctx.textAlign='center';ctx.fillText('GRAIN SUPPLY',g.x,g.y-37);ctx.restore();
 }

 ctx.save();ctx.fillStyle=active?'rgba(238,190,95,.08)':'rgba(210,130,105,.07)';
 ctx.strokeStyle=active?'rgba(245,216,121,.9)':'rgba(255,150,124,.85)';
 ctx.lineWidth=2;ctx.setLineDash([9,7]);ctx.beginPath();ctx.arc(b.x,b.y,210,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.setLineDash([]);
 for(const h of nearbyHomes){
  ctx.strokeStyle=active?'#f7d58a':'#c58e76';ctx.lineWidth=2.5;
  ctx.beginPath();ctx.ellipse(h.x,h.y+4,h.radius+10,12,0,0,Math.PI*2);ctx.stroke();
  if(active){ctx.font='bold 12px system-ui';ctx.fillStyle='#ffe1a2';ctx.textAlign='center';ctx.fillText('🥖',h.x,h.y-26)}
 }
 ctx.fillStyle=active?'#f9df9c':'#ffb9a1';ctx.font='bold 15px system-ui';ctx.textAlign='center';
 ctx.fillText(active?'BREAD DELIVERY AREA':'BAKERY NEEDS SUPPLIES / STAFF',b.x,b.y-218);
 ctx.restore();
}

const line=(x,y,xx,yy,color,width=2)=>{ctx.strokeStyle=color;ctx.lineWidth=width;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(xx,yy);ctx.stroke()};const label=(t,x,y,size=11,color='#f6edd6')=>{ctx.textAlign='center';ctx.font=`bold ${size}px system-ui`;ctx.fillStyle=color;ctx.fillText(t,x,y)};
// Road-network view distinguishes the largest connected network from isolated road groups.
if(serviceOverlay==='roads'){
 const network=getRoadNetwork();
 ctx.save();
 for(const b of network.roads){
  const main=network.main.has(b.id);
  ctx.strokeStyle=main?'#8ce6b5':'#ffad84';ctx.lineWidth=3;
  ctx.beginPath();ctx.arc(b.x,b.y,20,0,Math.PI*2);ctx.stroke();
  ctx.fillStyle=main?'#d3ffdd':'#ffd0b1';ctx.font='bold 11px system-ui';ctx.textAlign='center';
  ctx.fillText(main?'✓':'!',b.x,b.y-25);
 }
 ctx.restore();
}
// City-planning service overlays. Distances are the same as those used by the economy.
if(serviceOverlay!=='off'){
 const type=serviceOverlay==='water'?'well':serviceOverlay==='health'?'clinic':'road';
 const radius=serviceOverlay==='trade'?135:190;
 const providers=buildings.filter(b=>b.team===0&&alive(b)&&b.type===type);
 ctx.save();
 for(const b of providers){if(serviceOverlay!=='trade'){ctx.save();ctx.strokeStyle=civicHasRoadAccess(b)?'#c2ff9b':'#ffbc88';ctx.lineWidth=3;ctx.beginPath();ctx.arc(b.x,b.y,23,0,Math.PI*2);ctx.stroke();ctx.restore()}ctx.beginPath();ctx.arc(b.x,b.y,radius,0,Math.PI*2);ctx.fillStyle=serviceOverlay==='water'?'rgba(90,180,230,.085)':serviceOverlay==='health'?'rgba(120,224,150,.085)':'rgba(245,197,91,.085)';ctx.fill();ctx.strokeStyle=serviceOverlay==='water'?'rgba(105,205,255,.65)':serviceOverlay==='health'?'rgba(150,255,168,.65)':'rgba(255,219,115,.65)';ctx.lineWidth=2;ctx.setLineDash([8,7]);ctx.stroke()}
 ctx.setLineDash([]);
 for(const b of buildings.filter(b=>b.team===0&&alive(b)&&b.type===(serviceOverlay==='trade'?'market':'house'))){
  let covered=serviceOverlay==='trade'?marketHasTradeAccess(b):providers.some(p=>dist(p,b)<radius);
  ctx.strokeStyle=covered?'#baf4bb':'#ff9a8b';ctx.lineWidth=3;ctx.beginPath();ctx.ellipse(b.x,b.y+12,b.radius+8,b.radius*.65+7,0,0,Math.PI*2);ctx.stroke();
  ctx.fillStyle=covered?'#baf4bb':'#ffb6a8';ctx.font='bold 13px system-ui';ctx.textAlign='center';ctx.fillText(covered?'✓':'!',b.x,b.y-57);
 }
 ctx.restore();
}
// Selected unit orders are easy to read without adding permanent battlefield clutter.
for(let u of selected){if(!alive(u)||!u.order)continue;let target=u.order.type==='move'?u.order:u.order.target;if(!target)continue;ctx.save();ctx.lineWidth=1.5;ctx.strokeStyle='#ffe5a0';ctx.beginPath();ctx.arc(target.x,target.y,7+(sc26Motion?Math.sin(visualTime*4)*2:0),0,Math.PI*2);ctx.stroke();ctx.restore()}
for(let e of effects){let progress=1-e.life/(e.maxLife||.35);ctx.save();ctx.globalAlpha=Math.max(0,1-progress);ctx.translate(e.x,e.y);if(e.kind==='arrow'){ctx.strokeStyle='#f7e3aa';ctx.lineWidth=2.5;ctx.beginPath();ctx.moveTo(-16+progress*9,-15+progress*7);ctx.lineTo(7+progress*9,8+progress*7);ctx.stroke();ctx.fillStyle='#fff0bd';ctx.fillRect(5+progress*9,6+progress*7,5,5)}else{let rays=e.kind==='siege'?9:5;for(let k=0;k<rays;k++){let a=k*Math.PI*2/rays+e.x*.1;let inner=3+progress*8,outer=(e.kind==='siege'?26:17)+progress*13;ctx.strokeStyle=k%2?'#fff0a4':'#ef8d57';ctx.lineWidth=e.kind==='siege'?3:2;ctx.beginPath();ctx.moveTo(Math.cos(a)*inner,Math.sin(a)*inner);ctx.lineTo(Math.cos(a)*outer,Math.sin(a)*outer);ctx.stroke()}}ctx.restore()}
// V14.01: House planning overlay persists while the House tool is armed.
// Compact 40px house plots are checked against the SAME canPlace rule used on click.
// No permanent visual clutter in normal play.
if(mode==='house'||window.scHousePlotsVisible){
 const roads=buildings.filter(b=>b.team===0&&b.type==='road'&&alive(b));
 if(roads.length){
  const keys=new Set(roads.map(b=>Math.round(b.x)+':'+Math.round(b.y)));
  const sites=new Map();
  // A complete 3x3+ perimeter has road tiles on all four sides.
  // Evaluate a compact 40px residential grid with 44px road setback.
  for(const a of roads){
   for(let w=3;w<=10;w++)for(let d=3;d<=10;d++){
    const x=a.x,y=a.y,dx=w*44,dy=d*44;
    if(!keys.has(Math.round(x+dx)+':'+Math.round(y))||
       !keys.has(Math.round(x)+':'+Math.round(y+dy))||
       !keys.has(Math.round(x+dx)+':'+Math.round(y+dy)))continue;
    let perimeter=true;
    for(let i=0;i<=w&&perimeter;i++)if(!keys.has(Math.round(x+i*44)+':'+Math.round(y))||!keys.has(Math.round(x+i*44)+':'+Math.round(y+dy)))perimeter=false;
    for(let i=1;i<d&&perimeter;i++)if(!keys.has(Math.round(x)+':'+Math.round(y+i*44))||!keys.has(Math.round(x+dx)+':'+Math.round(y+i*44)))perimeter=false;
    if(!perimeter)continue;
    for(let px=x+44;px<=x+dx-44;px+=40)for(let py=y+44;py<=y+dy-44;py+=40){
      const p={x:px,y:py};
      if(canPlace('house',p,null))sites.set(Math.round(px)+':'+Math.round(py),p);
    }
   }
  }
  ctx.save();ctx.lineWidth=2;
  let shown=0;
  for(const p of sites.values()){
   if(++shown>80)break;
   ctx.fillStyle='rgba(102,219,113,.24)';ctx.strokeStyle='rgba(180,255,155,.88)';
   ctx.fillRect(p.x-13,p.y-13,26,26);ctx.strokeRect(p.x-13,p.y-13,26,26);
   ctx.fillStyle='#ecffda';ctx.font='bold 14px system-ui';ctx.textAlign='center';ctx.fillText('✓',p.x,p.y+5);
  }
  if(shown){
   // Put the plot guide in the map's upper margin, not on top of houses.
   ctx.fillStyle='rgba(14,39,31,.88)';ctx.fillRect(12,52,250,27);
   ctx.fillStyle='#e8ffd7';ctx.font='bold 12px system-ui';ctx.textAlign='left';
   ctx.fillText('HOUSE PLOTS  ·  '+shown+' open positions',22,70);
  }
  // A compact service readout over built houses while planning is enabled.
  // Water/food/roads are existing simulation conditions, not invented bonuses.
  if(window.scHousePlotsVisible){
   const houses=buildings.filter(b=>b.team===0&&b.type==='house'&&alive(b));
   for(const home of houses){
    const tier=houseTier(home);
    const checks=[['R',tier.access],['W',tier.water],['F',tier.foodReady]];
    for(let i=0;i<checks.length;i++){
     const bx=home.x-24+i*17,by=home.y+31;
     ctx.fillStyle=checks[i][1]?'rgba(45,113,70,.94)':'rgba(125,70,53,.94)';
     ctx.fillRect(bx-7,by-9,15,15);
     ctx.fillStyle='#fff5d6';ctx.font='bold 10px system-ui';ctx.textAlign='center';
     ctx.fillText(checks[i][0],bx,by+2);
    }
   }
  }
  ctx.restore();
 }
}

if(['tower','fortress','wall'].includes(mode)){let worker=scDefenseWorker(wallPointer);if(worker){ctx.save();ctx.fillStyle='rgba(91,175,238,.08)';ctx.strokeStyle='rgba(130,206,255,.85)';ctx.setLineDash([9,7]);ctx.lineWidth=2;ctx.beginPath();ctx.arc(worker.x,worker.y,180,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.setLineDash([]);ctx.fillStyle='#e3f4ff';ctx.font='bold 12px system-ui';ctx.textAlign='center';ctx.fillText('DEFENSE BUILD RANGE',worker.x,worker.y-186);ctx.restore()}}if(mode==='market'){ctx.save();ctx.strokeStyle='rgba(250,218,121,.65)';ctx.lineWidth=2;for(let m of buildings.filter(b=>b.team===0&&b.type==='road')){ctx.beginPath();ctx.arc(m.x,m.y,135,0,Math.PI*2);ctx.stroke()}ctx.restore()}if(['tower','fortress','wall','house','farm','fishery','market','well','lumberyard','road','granary','bakery','clinic','garden','plaza','theater','workshop'].includes(mode)&&wallPointer){let worker=scDefenseCosts[mode]?scDefenseWorker(wallPointer):selected.find(u=>u.type==='worker'&&alive(u));let preview=mode==='road'?roadPoint(wallPointer):mode==='fishery'?fisheryPoint(wallPointer):compactAmenity(mode)?civicGridPoint(mode,wallPointer):wallPointer;let valid=canPlace(mode,preview,worker);
// V13.28: placement rectangles follow the visible building proportions.
// These are visual previews only; existing collision and road rules stay intact.
const sc1328PreviewSize=(type)=>{
 const compact=window.sc1323CompactBuildings!==false;
 const factor=compact?.82:1;
 const art={
  house:[40,47],farm:[64,45],fishery:[61,43],market:[65,48],
  well:[42,48],lumberyard:[64,46],granary:[62,61],
  bakery:[61,53],theater:[70,56],school:[66,54],chapel:[60,62],clinic:[62,61],garden:[60,38],plaza:[58,39],
  road:[30,17],tower:[55,75],fortress:[95,88],wall:[84,45]
 };
 const dims=art[type]||[65,48];
 if(type==='road')return dims;
 const typeScale=type==='house'?.58:['garden','plaza','clinic'].includes(type)?.48:.78;
 const scale=factor*typeScale;
 return [Math.max(16,Math.round(dims[0]*scale)),Math.max(15,Math.round(dims[1]*scale))];
};
if(mode==='road'&&drag){
 ctx.save();ctx.lineCap='round';ctx.lineJoin='round';
 const pts=roadPlan({x:drag.x,y:drag.y},{x:drag.xx,y:drag.yy},true);
 const blocked=pts.filter(q=>!scRoadExists(q)&&!canPlace('road',q,null));
 const fresh=pts.filter(q=>!scRoadExists(q));
 // Show the actual usable land inside the proposed block, not just its roads.
 const minX=Math.min(...pts.map(q=>q.x)),maxX=Math.max(...pts.map(q=>q.x));
 const minY=Math.min(...pts.map(q=>q.y)),maxY=Math.max(...pts.map(q=>q.y));
 if(maxX-minX>=132&&maxY-minY>=132){
  ctx.fillStyle=blocked.length?'rgba(155,64,52,.09)':'rgba(96,176,114,.11)';
  ctx.fillRect(minX+25,minY+25,maxX-minX-50,maxY-minY-50);
  ctx.strokeStyle=blocked.length?'rgba(228,120,104,.4)':'rgba(175,225,153,.5)';
  ctx.lineWidth=1.5;ctx.setLineDash([5,7]);
  ctx.strokeRect(minX+25,minY+25,maxX-minX-50,maxY-minY-50);
  ctx.setLineDash([]);
  // Plot preview follows the actual building placement rules. A 3x3 road
  // perimeter can contain one central house; larger blocks may contain more.
  // Mark obstructed sites too so an empty preview is never unexplained.
  let availablePlots=0,blockedPlots=0;
  const plotXs=[],plotYs=[];
  for(let px=minX+44;px<=maxX-44+0.01;px+=40)plotXs.push(px);
  for(let py=minY+44;py<=maxY-44+0.01;py+=40)plotYs.push(py);
  if(!plotXs.length)plotXs.push((minX+maxX)/2);
  if(!plotYs.length)plotYs.push((minY+maxY)/2);
  for(const py of plotYs)for(const px of plotXs){
   const site={x:px,y:py};
   const safeFromRoad=pts.every(q=>dist(q,site)>=29);
   const valid=safeFromRoad&&canPlace('house',site,null);
   if(valid)availablePlots++;else blockedPlots++;
   ctx.fillStyle=valid?'rgba(119,221,122,.28)':'rgba(223,101,88,.18)';
   ctx.strokeStyle=valid?'#b7ff9b':'#ffa69d';
   ctx.lineWidth=2.5;
   ctx.fillRect(px-15,py-15,30,30);ctx.strokeRect(px-15,py-15,30,30);
   ctx.fillStyle=valid?'#e5ffce':'#ffe3d9';
   ctx.font='bold 15px system-ui';ctx.textAlign='center';
   ctx.fillText(valid?'✓':'×',px,py+5);
  }
  ctx.font='bold 12px system-ui';ctx.textAlign='center';
  ctx.fillStyle=availablePlots?'#e1f5d5':'#ffb8a7';
  ctx.fillText(availablePlots+' house plots'+(blockedPlots?' · '+blockedPlots+' blocked':''), (minX+maxX)/2,(minY+maxY)/2-20);
 }
 // Join neighboring road tiles, regardless of their perimeter ordering.
 // The old preview joined array neighbors and left gaps on rectangular blocks.
 const roadKeys=new Set(pts.map(q=>`${Math.round(q.x)}:${Math.round(q.y)}`));
 for(const a of pts){
  for(const [dx,dy] of [[44,0],[0,44]]){
   const b={x:a.x+dx,y:a.y+dy};
   if(!roadKeys.has(`${Math.round(b.x)}:${Math.round(b.y)}`))continue;
   const ok=(scRoadExists(a)||canPlace('road',a,null))&&(scRoadExists(b)||canPlace('road',b,null));
   ctx.strokeStyle=ok?'rgba(23,66,43,.82)':'rgba(112,38,38,.82)';ctx.lineWidth=21;
   ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
   ctx.strokeStyle=ok?'rgba(125,219,137,.72)':'rgba(239,112,105,.75)';ctx.lineWidth=16;
   ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();
  }
 }
 for(const q of pts){ctx.fillStyle=scRoadExists(q)?'rgba(241,211,136,.9)':!canPlace('road',q,null)?'rgba(239,112,105,.85)':stone<fresh.length*12?'rgba(241,180,90,.88)':'rgba(125,219,137,.8)';ctx.beginPath();ctx.arc(q.x,q.y,9,0,Math.PI*2);ctx.fill()}
 ctx.font='bold 13px system-ui';ctx.textAlign='center';ctx.fillStyle='#f5e7c5';
 const roadCost=fresh.length*12;
 const canAfford=stone>=roadCost;
 const status=blocked.length?blocked.length+' blocked':!canAfford?'need '+(roadCost-stone)+' more stone':(pts.length-fresh.length)+' existing';
 const statusText=fresh.length+' new · '+roadCost+' stone · '+status;
 ctx.font='bold 13px system-ui';
 const labelX=Math.max(130,Math.min(W-130,drag.xx)),labelY=Math.max(32,Math.min(H-20,drag.yy-26));
 const labelW=Math.min(390,ctx.measureText(statusText).width+20);
 ctx.fillStyle='rgba(12,32,28,.9)';ctx.fillRect(labelX-labelW/2,labelY-17,labelW,23);
 ctx.fillStyle=(blocked.length||!canAfford)?'#ffb2a5':'#d9f4c4';
 ctx.fillText(statusText,labelX,labelY);
 ctx.restore();
}
// Construction-only reservation guides use the same distances as placement.
if(mode!=='road'&&Object.hasOwn(scConstructionRadii,mode)){
 ctx.save();ctx.lineWidth=1.5;ctx.setLineDash([4,5]);
 for(const b of [...buildings,...scConstructionSites]){
  if(b.type==='road'||!alive(b)&&!scConstructionSites.includes(b))continue;
  const radius=scBuildingSpacing(mode,b),distance=dist(b,preview);if(distance>radius+55)continue;
  const blocked=distance<radius;ctx.strokeStyle=blocked?'rgba(247,153,122,.8)':'rgba(221,202,154,.5)';
  ctx.fillStyle=blocked?'rgba(174,76,53,.08)':'rgba(213,195,147,.035)';
  ctx.beginPath();ctx.arc(b.x,b.y,radius,0,Math.PI*2);ctx.fill();ctx.stroke();
 }
 ctx.setLineDash([]);ctx.strokeStyle=valid?'rgba(213,249,183,.8)':'rgba(255,179,168,.8)';
 ctx.beginPath();ctx.ellipse(preview.x,preview.y+6,scConstructionRadii[mode],scConstructionRadii[mode]*.55,0,0,Math.PI*2);ctx.stroke();ctx.restore();
}
if(!(mode==='road'&&drag)){ctx.save();ctx.globalAlpha=.7;const [previewW,previewH]=sc1328PreviewSize(mode);ctx.fillStyle=valid?'#b7c8b5':'#da6b64';ctx.fillRect(preview.x-previewW/2,preview.y-previewH/2,previewW,previewH);ctx.strokeStyle=valid?'#d5f9b7':'#ffb3a8';ctx.lineWidth=3;ctx.strokeRect(preview.x-previewW/2,preview.y-previewH/2,previewW,previewH);ctx.globalAlpha=1;ctx.font='bold 13px system-ui';ctx.fillStyle='#fff';ctx.textAlign='center';ctx.fillText(valid?(mode==='fishery'?'✓ FISHERY — CLICK TO BUILD':mode==='road'?'DRAG TO DRAW ROAD':'CLICK TO BUILD'):(mode==='fishery'?'NO FREE COASTAL SPACE':'✕ BLOCKED'),preview.x,preview.y-36);
if(mode==='fishery'){ctx.strokeStyle=valid?'#b5f9a7':'#ffb3a8';ctx.lineWidth=2;ctx.setLineDash([5,5]);ctx.beginPath();ctx.moveTo(wallPointer.x,wallPointer.y);ctx.lineTo(preview.x,preview.y);ctx.stroke();ctx.setLineDash([]);ctx.fillStyle='#e5fff0';ctx.font='bold 13px system-ui';ctx.fillText('FISHING DOCK',preview.x,preview.y+30)}ctx.restore()}}
if(false && showMinimap){
 const mx=W-220,my=12,mw=205,mh=127,sx=mw/W,sy=mh/H;
 ctx.save();ctx.fillStyle='rgba(10,25,30,.88)';ctx.fillRect(mx-5,my-5,mw+10,mh+25);ctx.strokeStyle='#cfb57b';ctx.lineWidth=2;ctx.strokeRect(mx-5,my-5,mw+10,mh+25);
 ctx.fillStyle='#446044';ctx.fillRect(mx,my,mw,mh);ctx.fillStyle='#568796';ctx.fillRect(mx+480*sx,my,40*sx,mh);ctx.fillStyle='#c5ad7a';ctx.fillRect(mx+460*sx,my+294*sy,80*sx,42*sy);
 for(const n of nodes){ctx.fillStyle=n.amount<=0?'#66675e':n.type==='tree'?'#92d47e':n.type==='stone'?'#c6c8ce':'#f2cb6a';ctx.fillRect(mx+n.x*sx-2,my+n.y*sy-2,4,4)}
 for(const b of buildings){ctx.fillStyle=b.team===0?'#77c6ff':'#ff8b78';ctx.fillRect(mx+b.x*sx-4,my+b.y*sy-4,8,8)}
 for(const u of units){ctx.fillStyle=u.team===0?'#77c6ff':'#ff8b78';ctx.beginPath();ctx.arc(mx+u.x*sx,my+u.y*sy,2,0,Math.PI*2);ctx.fill()}
 ctx.font='bold 11px system-ui';ctx.textAlign='center';ctx.fillStyle='#f1ddb2';ctx.fillText('BATTLEFIELD OVERVIEW',mx+mw/2,my+mh+15);ctx.restore();
}
if(drag&&!drag.pan){ctx.strokeStyle='#fff1a4';ctx.fillStyle='#f4e4a51a';let x=Math.min(drag.x,drag.xx),y=Math.min(drag.y,drag.yy),w=Math.abs(drag.xx-drag.x),h=Math.abs(drag.yy-drag.y);ctx.fillRect(x,y,w,h);ctx.strokeRect(x,y,w,h)}
if(ended){ctx.fillStyle='#08131ac9';ctx.fillRect(0,0,W,H);ctx.fillStyle='#f2d69a';ctx.font='bold 44px system-ui';ctx.textAlign='center';ctx.fillText(buildings.some(b=>b.team===0&&b.type==='keep')?'VICTORY':'DEFEAT',W/2,H/2)}
}
