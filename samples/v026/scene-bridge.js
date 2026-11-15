/* Injected only into the throwaway sample, inside the original engine closure. */
window.sc26Scene={
 load(name){
  document.getElementById('sc26Scene').value=name;scCampaign.start('city','brookstead');paused=true;el('pause').textContent='Resume';
  if(name!=='opening'){
   buildings=buildings.filter(b=>b.type==='keep');nodes=[];units=units.filter(u=>u.type==='worker');selected=[];scConstructionSites=[];
   const keep=buildings[0];keep.x=660;keep.y=280;
   for(const [type,x,y] of [['house',760,270],['house',850,270],['house',760,410],['house',850,410],['market',965,340]])addBuilding(0,type,x,y);
   for(const [x,y] of [[670,500],[760,540],[850,540],[1040,300],[1040,390],[1120,350]])addBuilding(0,'house',x,y);
   for(let x=690;x<=1110;x+=35)addBuilding(0,'road',x,345);
   for(let y=380;y<=520;y+=35)addBuilding(0,'road',900,y);
   for(const [x,y] of [[585,230],[590,290],[565,345],[1020,240],[1080,250],[1120,280],[1060,420]])nodes.push({type:'tree',x,y,amount:600,radius:18,renew:0});
   nodes.push({type:'stone',x:1100,y:500,amount:700,radius:19,renew:0});
   const site={id:nextId++,team:0,type:'house',x:960,y:465,radius:16,progress:14,required:36,cost:{gold:25,wood:60,stone:0}};scConstructionSites.push(site);
   units.forEach((u,i)=>{u.x=660+i*42;u.y=390;u.order=null;u.target=null;});units[0].order={type:'build',target:site};units[1].order={type:'gather',target:nodes[2]};units[2].order={type:'move',x:1000,y:520};
   if(name==='stress'){
    for(let row=0;row<12;row++)for(let col=0;col<16;col++)addBuilding(0,col%7===0?'market':'house',620+col*80,65+row*56);
    for(let i=0;i<240;i++)nodes.push({type:'tree',x:65+(i*97)%2300,y:80+(i*61)%650,amount:600,radius:18,renew:0});
    for(let i=0;i<117;i++){const u=addUnit(0,'worker',610+(i*37)%1200,80+(i*59)%650);u.order={type:'move',x:900+(i*53)%1200,y:100+(i*31)%600};}
   }
  }
  mode=null;drag=null;wallPointer=null;inspectedBuilding=null;window.scRTSInspectedBuilding=null;window.scRTSUnits=units;window.scHoverBuildings=buildings;window.scRTSNodes=nodes;window.scRTSSelected=selected.slice();visualTime=0;
  updateUI();window.dispatchEvent(new Event('sc-city-restored'));window.scMapZoom?.set(1.5);window.sc148Camera?.suspend(true);
  requestAnimationFrame(()=>{mapViewport.scrollLeft=580;mapViewport.scrollTop=110;});return {name,seeded:name!=='opening'};
 },
 redraw(){draw();},
 construction(value){for(const s of scConstructionSites)s.progress=s.required*value;},
 counts(){return {buildings:buildings.length,nodes:nodes.length,units:units.length,sites:scConstructionSites.length};},
 renderState(){return {buildings:buildings.map(b=>({...b})),nodes:nodes.map(n=>({...n})),units:units.map(u=>({id:u.id,x:u.x,y:u.y,order:u.order?.type||null})),construction:scConstructionSites.map(s=>({id:s.id,progress:s.progress})),paused,visualTime};},
 camera(){return {left:mapViewport.scrollLeft,top:mapViewport.scrollTop,zoom:window.scMapZoom.get()};}
};
