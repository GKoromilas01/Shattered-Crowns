/* Original v0.26 art spike. Renderer only: never writes world entities. */
(()=>{'use strict';
const atlas=new Image();atlas.src='assets/settlement-atlas.png';
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const frames={keep:[0,0,362,382,190,350],house:[362,0,362,382,183,350],market:[724,0,362,382,181,350],tree:[1086,0,362,382,182,350],foundation:[0,390,362,372,180,718-390],frame:[362,390,362,372,180,718-390],roof:[724,390,362,372,181,718-390],idle:[95,794,180,270,88,229],walk:[442,794,195,270,100,229],gather:[801,794,180,270,95,229],build:[1150,794,210,270,110,229]};
const sprite=(g,key,x,y,width,flip=false)=>{const f=frames[key],scale=width/f[2];g.save();g.translate(x,y);if(flip)g.scale(-1,1);g.drawImage(atlas,f[0],f[1],f[2],f[3],-f[4]*scale,-f[5]*scale,f[2]*scale,f[3]*scale);g.restore();};
let ground=null,groundKey='',lastTime=null;const samples=[];
function ellipse(g,x,y,rx,ry,color){g.fillStyle=color;g.beginPath();g.ellipse(x,y,rx,ry,0,0,Math.PI*2);g.fill();}
function line(g,x,y,xx,yy,color,width=1){g.strokeStyle=color;g.lineWidth=width;g.beginPath();g.moveTo(x,y);g.lineTo(xx,yy);g.stroke();}
function terrain(g,W,H,biome){const c=document.createElement('canvas');c.width=W;c.height=H;const p=c.getContext('2d');const dry=biome==='dryland';const wash=p.createLinearGradient(0,0,W,H);wash.addColorStop(0,dry?'#b1a279':'#8c9e70');wash.addColorStop(1,dry?'#938568':'#748d60');p.fillStyle=wash;p.fillRect(0,0,W,H);let seed=26112026;const random=()=>((seed=(seed*1664525+1013904223)>>>0)/4294967296);for(let i=0;i<70;i++){const x=random()*W,y=random()*H,r=40+random()*140;const shade=p.createRadialGradient(x,y,0,x,y,r);shade.addColorStop(0,i%3===0?'#d5c58e20':'#2f604119');shade.addColorStop(1,'#526e3b00');p.fillStyle=shade;p.fillRect(x-r,y-r,r*2,r*2);}for(let i=0;i<22000;i++){const x=random()*W,y=random()*H;p.globalAlpha=.06+random()*.09;line(p,x,y,x+random()*2-1,y-1-random()*2,i%3===0?'#f6e8b0':'#36593c',.6);}p.globalAlpha=1;
// Original map geometry; no new river or placement exclusions.
p.fillStyle='#d0bd8b';p.fillRect(445,0,107,H);p.fillStyle='#385d51';p.fillRect(461,0,77,H);const water=p.createLinearGradient(470,0,531,0);water.addColorStop(0,'#347578');water.addColorStop(.5,'#60959a');water.addColorStop(1,'#366e73');p.fillStyle=water;p.fillRect(471,0,57,H);for(let i=0;i<110;i++){const y=random()*H;line(p,478+random()*20,y,490+random()*30,y+3,'#8fb7a7',.8);}p.fillStyle='#ae9470';p.fillRect(458,293,84,45);for(let x=461;x<542;x+=9)line(p,x,295,x,336,'#6c573f');line(p,458,294,542,294,'#d5c09a',3);line(p,458,337,542,337,'#78614b',3);
p.fillStyle='#337b85';p.beginPath();p.moveTo(0,792);for(let x=0;x<=W;x+=12)p.lineTo(x,792+Math.sin(x*.021)*7);p.lineTo(W,H);p.lineTo(0,H);p.fill();p.beginPath();for(let x=0;x<=W;x+=12){const y=792+Math.sin(x*.021)*7;x?p.lineTo(x,y):p.moveTo(x,y);}p.strokeStyle='#d4bf96';p.lineWidth=9;p.stroke();for(let i=0;i<210;i++){const x=random()*W,y=815+random()*80;line(p,x,y,x+4+random()*14,y,'#6faaa8',.7);}return c;}
function road(g,b,roads){ellipse(g,b.x,b.y,9,6,'#b7ac8e');for(const r of roads){if(r.id<=b.id||Math.hypot(r.x-b.x,r.y-b.y)>49)continue;line(g,b.x,b.y,r.x,r.y,'#716d55',17);line(g,b.x,b.y,r.x,r.y,'#baae90',13);const d=Math.hypot(r.x-b.x,r.y-b.y),nx=-(r.y-b.y)/d,ny=(r.x-b.x)/d;for(let k=5;k<d;k+=7){const x=b.x+(r.x-b.x)*k/d,y=b.y+(r.y-b.y)*k/d;line(g,x+nx*5,y+ny*5,x-nx*5,y-ny*5,'#8c846b',.65);}}}
function text(g,str,x,y,color='#f6e7c8'){g.font='600 10px system-ui';g.textAlign='center';g.lineWidth=3;g.strokeStyle='#243d32';g.strokeText(str,x,y);g.fillStyle=color;g.fillText(str,x,y);}
function object(g,o,s){const {kind,value:b}=o;
 if(kind==='node'){
  if(b.amount<=0){ellipse(g,b.x,b.y+2,10,5,'#78694f');return;}
  if(b.type==='tree'){sprite(g,'tree',b.x,b.y+7,65);return;}
  // Deposits remain the released geometry: sample art coverage is trees only.
  for(let i=0;i<4;i++){const x=b.x+(i-1.5)*10,y=b.y+(i%2)*4;g.fillStyle=b.type==='stone'?'#a9b2a4':'#bb9c55';g.beginPath();g.moveTo(x-10,y+7);g.lineTo(x-8,y-7);g.lineTo(x+1,y-15);g.lineTo(x+10,y+6);g.closePath();g.fill();line(g,x+1,y-15,x+1,y+4,b.type==='stone'?'#5f756e':'#7a673b',2);}return;
 }
 if(kind==='site'){const ratio=Math.max(0,Math.min(1,b.progress/b.required));sprite(g,ratio<.25?'foundation':ratio<.65?'frame':'roof',b.x,b.y+7,b.type==='house'?59:b.type==='market'?82:Math.max(43,b.radius*2+15));g.fillStyle='#253e31';g.fillRect(b.x-21,b.y+18,42,3);g.fillStyle='#d6bb7b';g.fillRect(b.x-21,b.y+18,42*ratio,3);text(g,Math.floor(ratio*100)+'%',b.x,b.y+32);return;}
 if(kind==='building'){
  if(frames[b.type]){sprite(g,b.type,b.x,b.y+10,b.type==='keep'?115:b.type==='market'?82:59);return;}
  // Deliberately not a full asset set. Unsupported sample buildings retain clear markers.
  g.fillStyle=b.type==='farm'?'#a68b52':'#b6ab8c';g.fillRect(b.x-b.radius*.75,b.y-9,b.radius*1.5,17);line(g,b.x-b.radius*.75,b.y-10,b.x+b.radius*.75,b.y-10,'#e3d1a7',2);text(g,b.type,b.x,b.y-15);return;
 }
 if(kind==='unit'){
  if(b.type!=='worker'){ellipse(g,b.x,b.y,6,4,b.team?'#b16256':'#6c96a0');g.fillStyle='#b7b8a3';g.fillRect(b.x-4,b.y-17,8,14);return;}
  const target=b.order?.type==='move'?b.order:b.order?.target;const distance=target?Math.hypot(b.x-target.x,b.y-target.y):0;const working=target&&distance<=(target.radius||0)+14;const moving=target&&!working;const animate=s.running&&!reduced.matches&&!document.hidden;const phase=animate?Math.floor(s.visualTime*5+b.id)%2:0;
  const key=working&&b.order.type==='build'?'build':working&&b.order.type==='gather'?'gather':moving&&phase?'walk':'idle';
  const flip=!!target&&target.x<b.x;const bob=animate&&working?Math.sin(s.visualTime*8+b.id)*.8:0;sprite(g,key,b.x,b.y+3+bob,23,flip); // Full worker is ~24px, anchored to actual unit position.
 }
}
function draw(g,s){if(!atlas.complete||!atlas.naturalWidth)return false;const start=performance.now();g.save();try{
 if(!ground||groundKey!==s.biome){ground=terrain(g,s.W,s.H,s.biome);groundKey=s.biome;}
 g.clearRect(0,0,s.W,s.H);g.drawImage(ground,0,0);
 const roads=s.buildings.filter(b=>b.hp>0&&b.type==='road');for(const b of roads)road(g,b,roads);
 const objects=[...s.nodes.map(value=>({kind:'node',value})),...s.buildings.filter(b=>b.hp>0&&b.type!=='road').map(value=>({kind:'building',value})),...s.sites.map(value=>({kind:'site',value})),...s.units.filter(u=>u.hp>0).map(value=>({kind:'unit',value}))].sort((a,b)=>a.value.y-b.value.y||a.value.id-b.value.id||0);
 for(const o of objects)object(g,o,s);
 // Interaction overlays are last, so crowded art cannot conceal selection or order targets.
 for(const u of s.selected){g.strokeStyle='#ffe5a1';g.lineWidth=1.5;g.beginPath();g.ellipse(u.x,u.y+3,u.radius+5,6,0,0,Math.PI*2);g.stroke();const t=u.order?.type==='move'?u.order:u.order?.target;if(t){g.setLineDash([4,6]);line(g,u.x,u.y,t.x,t.y,'#e8d8a0',1);g.setLineDash([]);}}
 if(s.inspected){g.strokeStyle='#ffe5a1';g.lineWidth=2;g.beginPath();g.ellipse(s.inspected.x,s.inspected.y+8,s.inspected.radius+6,10,0,0,Math.PI*2);g.stroke();}
 if(s.pointer&&s.mode){const p=s.preview;g.globalAlpha=.5;if(frames[s.mode])sprite(g,s.mode,p.x,p.y+10,s.mode==='market'?82:59);g.globalAlpha=1;g.strokeStyle=s.valid?'#f1e2a6':'#f4a58e';g.lineWidth=2;g.beginPath();g.arc(p.x,p.y,s.radius||20,0,Math.PI*2);g.stroke();text(g,s.valid?'Click to build':'Blocked',p.x,p.y+40);}
 if(s.drag&&!s.drag.pan){g.strokeStyle='#f1e1a2';g.strokeRect(s.drag.x,s.drag.y,s.drag.xx-s.drag.x,s.drag.yy-s.drag.y);}
 }finally{g.restore();}
 const now=performance.now();samples.push({draw:now-start,frame:lastTime===null?0:now-lastTime});lastTime=now;if(samples.length>5000)samples.shift();return true;}
window.sc26Art={draw,ready:()=>atlas.complete&&atlas.naturalWidth>0,resetMetrics:()=>{samples.length=0;lastTime=null;},metrics:()=>samples.map(x=>({...x})),cacheBytes:()=>ground?ground.width*ground.height*4:0,frames};
})();
