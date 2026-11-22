/* Visual river detail stays inside the existing reserved crossing corridor. */
(()=>{'use strict';
 const center=y=>{const t=y<=315?y/315:(y-315)/475;return 500+Math.sin(Math.PI*t)*Math.sin(y*.018)*22};
 window.sc59RiverCenter=center;
 window.sc59PaintMeadows=(g,width)=>{if(window.scGraphicsTerrainDetails===false)return;g.save();g.beginPath();g.rect(0,0,width,780);g.clip();for(let i=0;i<46;i++){const x=80+(i*293.73)%(width-160),y=60+(i*157.19)%680;if(x>400&&x<600)continue;g.fillStyle=i%3===0?'rgba(191,170,104,.035)':'rgba(51,84,43,.035)';g.beginPath();g.ellipse(x,y,60+(i%5)*23,25+(i%4)*14,(i%7)*.3,0,Math.PI*2);g.fill();}g.restore();};
 window.sc59DrawRiver=(g,time)=>{g.save();const ribbon=(width,color)=>{g.fillStyle=color;g.beginPath();for(let y=0;y<=790;y+=5){const w=width+Math.max(0,y-720)*.13+Math.sin(y*.047)*1.5,x=center(y)-w/2;if(y===0)g.moveTo(x,y);else g.lineTo(x,y)}for(let y=790;y>=0;y-=5){const w=width+Math.max(0,y-720)*.13+Math.sin(y*.047)*1.5;g.lineTo(center(y)+w/2,y)}g.closePath();g.fill()};
  ribbon(92,'rgba(56,72,39,.18)');ribbon(78,'#a79868');ribbon(66,'#658477');ribbon(53,'#467c86');ribbon(35,'rgba(105,162,166,.35)');
  for(let y=16;y<780;y+=31){if(y>285&&y<347)continue;const x=center(y),drift=Math.sin(time*1.1+y*.05)*3;g.strokeStyle='rgba(196,232,220,.35)';g.lineWidth=1;g.beginPath();g.moveTo(x-15+drift,y);g.quadraticCurveTo(x-2,y+3,x+12+drift,y+1);g.stroke();const side=(y%3)?-1:1;g.fillStyle='rgba(107,104,77,.65)';g.beginPath();g.ellipse(x+side*35,y+9,3+(y%4),2,.4,0,Math.PI*2);g.fill();}
  g.restore();};
})();
