/* Visual river detail stays inside the existing reserved crossing corridor. */
(()=>{'use strict';
 const center=y=>{const t=y<=315?y/315:(y-315)/475;return 500+Math.sin(Math.PI*t)*Math.sin(y*.018)*22};
 window.sc59RiverCenter=center;
 // Route to the bank approach before entering the river, then finish crossing
 // before turning toward the destination. Movement orders retain their target.
 const bridgeWest={x:442,y:315},bridgeEast={x:558,y:315};
 window.sc59BridgeWaypoint=(unit,target)=>{
  const destinationWest=target.x<center(target.y);
  const entry=destinationWest?bridgeEast:bridgeWest;
  const exit=destinationWest?bridgeWest:bridgeEast;
  if(destinationWest?unit.x<=exit.x:unit.x>=exit.x)return null;
  const onDeck=point=>point.x>bridgeWest.x&&point.x<bridgeEast.x&&Math.abs(point.y-315)<=10;
  if(onDeck(unit))return onDeck(target)?null:exit;
  const unitWest=unit.x<center(unit.y);
  if(unitWest===destinationWest)return null;
  return Math.hypot(unit.x-entry.x,unit.y-entry.y)<=1?exit:entry;
 };

 window.sc59PaintMeadows=(g,width)=>{if(window.scGraphicsTerrainDetails===false)return;g.save();g.beginPath();g.rect(0,0,width,780);g.clip();for(let i=0;i<46;i++){const x=80+(i*293.73)%(width-160),y=60+(i*157.19)%680;if(x>400&&x<600)continue;g.fillStyle=i%3===0?'rgba(191,170,104,.035)':'rgba(51,84,43,.035)';g.beginPath();g.ellipse(x,y,60+(i%5)*23,25+(i%4)*14,(i%7)*.3,0,Math.PI*2);g.fill();}g.restore();};
 window.sc59DrawRiver=(g,time)=>{g.save();const ribbon=(width,color)=>{g.fillStyle=color;g.beginPath();for(let y=0;y<=790;y+=5){const w=width+Math.max(0,y-720)*.13+Math.sin(y*.047)*1.5,x=center(y)-w/2;if(y===0)g.moveTo(x,y);else g.lineTo(x,y)}for(let y=790;y>=0;y-=5){const w=width+Math.max(0,y-720)*.13+Math.sin(y*.047)*1.5;g.lineTo(center(y)+w/2,y)}g.closePath();g.fill()};
  ribbon(92,'rgba(56,72,39,.18)');ribbon(78,'#a79868');ribbon(66,'#658477');ribbon(53,'#467c86');ribbon(35,'rgba(105,162,166,.35)');
  /* v0.63 river upgrade: deep channel, wet banks, drifting foam and flowing glints (visual only, same corridor). */
  const wAt=(width,y)=>width+Math.max(0,y-720)*.13+Math.sin(y*.047)*1.5;
  ribbon(26,'rgba(18,62,84,.42)');ribbon(12,'rgba(12,44,64,.30)');
  const edge=(width,sign,color,lw,dash,off)=>{g.strokeStyle=color;g.lineWidth=lw;g.setLineDash(dash);g.lineDashOffset=off;g.beginPath();for(let y=0;y<=790;y+=5){const x=center(y)+sign*(wAt(width,y)/2-1.5+Math.sin(y*.11+time*1.4)*.9);if(y===0)g.moveTo(x,y);else g.lineTo(x,y)}g.stroke();g.setLineDash([])};
  edge(66,-1,'rgba(40,58,38,.30)',3,[],0);edge(66,1,'rgba(40,58,38,.30)',3,[],0);
  edge(53,-1,'rgba(236,247,240,.55)',2.2,[13,9],-time*9);edge(53,1,'rgba(236,247,240,.55)',2.2,[11,10],-time*7);
  edge(53,-1,'rgba(255,255,255,.22)',4.5,[5,24],-time*12);edge(53,1,'rgba(255,255,255,.22)',4.5,[6,22],-time*10);
  for(let i=0;i<34;i++){const y0=(i*47.3+time*16)%800,y=y0,x=center(y)+Math.sin(i*2.7)*(wAt(35,y)*.3);if(y>285&&y<347)continue;g.strokeStyle=i%3?'rgba(214,244,238,.34)':'rgba(255,255,255,.26)';g.lineWidth=1.1;g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x+Math.sin(i)*3,y+7,x+Math.sin(i*1.3)*2,y+15);g.stroke();}
  g.fillStyle='rgba(120,104,76,.55)';for(let i=0;i<26;i++){const y=22+i*29.7;if(y>280&&y<352)continue;const side=i%2?1:-1,x=center(y)+side*(wAt(78,y)/2-4);g.beginPath();g.ellipse(x,y,2.4+(i%3),1.6+(i%2),.5,0,Math.PI*2);g.fill();}
  for(let y=16;y<780;y+=31){if(y>285&&y<347)continue;const x=center(y),drift=Math.sin(time*1.1+y*.05)*3;g.strokeStyle='rgba(196,232,220,.35)';g.lineWidth=1;g.beginPath();g.moveTo(x-15+drift,y);g.quadraticCurveTo(x-2,y+3,x+12+drift,y+1);g.stroke();const side=(y%3)?-1:1;g.fillStyle='rgba(107,104,77,.65)';g.beginPath();g.ellipse(x+side*35,y+9,3+(y%4),2,.4,0,Math.PI*2);g.fill();for(let j=0;j<3;j++){const bx=x+side*(35+j*2);g.strokeStyle=j%2?'#66875b':'#819367';g.lineWidth=1;g.beginPath();g.moveTo(bx,y+7);g.quadraticCurveTo(bx+side*3,y-1,bx+side*(3+j),y-6-j*2);g.stroke();}}
  g.restore();};
})();
