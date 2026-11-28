/* v0.34 milestone story cards: small cut scenes at major achievements (palette: docs/ART_DIRECTION.md) */
(function(){
 const KEY='shattered-crowns-milestones-v1';let seen={};try{seen=JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){}
 const queue=[];let open=false,epoch=0;
 const defs={
  homes:{title:'A Hearth for Every Family',text:'Three homes now line the road. Smoke rises from the chimneys and the children stop asking when the winter will end.',scene:'homes'},
  harvest:{title:'The First Harvest',text:'The granary smells of fresh grain. For the first time since the old village fell, no one goes to bed hungry.',scene:'wheat'},
  market:{title:'Market Day',text:'Stalls open, coins ring, and neighbours trade stories as well as bread. Your village is becoming a place worth visiting.',scene:'market'},
  growth:{title:'The Village Grows',text:'Twenty souls now call this place home. Word travels along the roads: there is room, work and safety here.',scene:'crowd'},
  general:{title:'A General Rises',text:'Ten victories, and the soldiers follow one voice without being told. Your first general will lead the army when war comes.',scene:'crowd'},
  caravan:{title:'The First Caravan',text:'Wagons creak through the gate with goods from distant lands. The wider world has noticed you.',scene:'caravan'}
 };
 function draw(c,kind){const g=c.getContext('2d'),W=c.width,H=c.height;const sky=g.createLinearGradient(0,0,0,H);sky.addColorStop(0,'#2a485d');sky.addColorStop(.6,'#87a297');sky.addColorStop(1,'#d7c4a8');g.fillStyle=sky;g.fillRect(0,0,W,H);
  g.fillStyle='#d9a93c';g.beginPath();g.arc(W*.78,H*.3,22,0,7);g.fill();
  g.fillStyle='#466d62';g.beginPath();g.moveTo(0,H*.72);for(let x=0;x<=W;x+=20)g.lineTo(x,H*.62+Math.sin(x/53)*10);g.lineTo(W,H);g.lineTo(0,H);g.fill();
  g.fillStyle='#505f4d';g.fillRect(0,H*.78,W,H*.22);
  const house=(x,y,w)=>{g.fillStyle='#895d34';g.fillRect(x,y-w*.55,w,w*.55);g.fillStyle='#8e2f2a';g.beginPath();g.moveTo(x-4,y-w*.55);g.lineTo(x+w/2,y-w*.95);g.lineTo(x+w+4,y-w*.55);g.fill();g.fillStyle='#321e13';g.fillRect(x+w*.4,y-w*.3,w*.2,w*.3)};
  if(kind==='homes'){house(90,H*.8,56);house(190,H*.82,64);house(300,H*.8,56);g.fillStyle='#8a8a8a';for(let i=0;i<3;i++){g.globalAlpha=.5;g.beginPath();g.arc(115+i*105,H*.4-i*6,9,0,7);g.fill();g.globalAlpha=1}}
  else if(kind==='wheat'){g.fillStyle='#d9a93c';for(let x=20;x<W-10;x+=9){const h=26+Math.sin(x)*6;g.fillRect(x,H*.84-h,3,h)}house(250,H*.8,60)}
  else if(kind==='market'){for(let i=0;i<3;i++){const x=70+i*115;g.fillStyle='#433121';g.fillRect(x,H*.6,4,H*.2);g.fillRect(x+60,H*.6,4,H*.2);g.fillStyle=i%2?'#d7c4a8':'#8e2f2a';g.fillRect(x-6,H*.55,76,16)}}
  else if(kind==='crowd'){for(let i=0;i<14;i++){const x=40+i*26,y=H*.8+Math.sin(i*2)*5;g.fillStyle=i%3?'#b88b5b':'#6e6f4e';g.fillRect(x,y-18,8,18);g.fillStyle='#caa87b';g.beginPath();g.arc(x+4,y-22,5,0,7);g.fill()}}
  else if(kind==='caravan'){for(let i=0;i<2;i++){const x=90+i*140;g.fillStyle='#6d4a31';g.fillRect(x,H*.68,80,26);g.fillStyle='#d7c4a8';g.beginPath();g.arc(x+40,H*.68,34,Math.PI,0);g.fill();g.fillStyle='#321e13';g.beginPath();g.arc(x+16,H*.68+28,9,0,7);g.arc(x+64,H*.68+28,9,0,7);g.fill()}}}
 function show(){if(open||!queue.length||document.hidden||window.sc62Scenes?.status().open||document.getElementById('sc47Intro'))return;const id=queue.shift(),d=defs[id],generation=epoch;open=true;
  const clip={homes:'milestone_homes',market:'milestone_market',growth:'milestone_growth'}[id];
  if(clip&&window.sc47Video?.[clip]&&window.sc62Scenes){window.sc62Scenes.play(id,()=>{if(generation!==epoch)return;open=false;setTimeout(show,800)});return;}
  const o=document.createElement('div');o.id='sc34Milestone';o.setAttribute('role','dialog');o.setAttribute('aria-label',d.title);o.style.cssText='position:fixed;inset:0;z-index:900;display:flex;align-items:center;justify-content:center;background:rgba(18,30,28,.72);opacity:0;transition:opacity .6s';
  o.innerHTML='<div style="width:min(440px,92vw);background:#1f3a38;border:2px solid #d9a93c;border-radius:12px;padding:14px;text-align:center;color:#d7c4a8;font-family:Georgia,serif;box-shadow:0 10px 40px #000a"><canvas width="420" height="170" style="width:100%;border-radius:8px;border:1px solid #a07250"></canvas><h2 style="margin:10px 0 6px;color:#d9a93c;font-size:22px">'+d.title+'</h2><p style="margin:0 0 12px;line-height:1.45">'+d.text+'</p><button type="button" id="sc34MilestoneGo" style="padding:7px 18px;background:#6d4a31;color:#d7c4a8;border:1px solid #d9a93c;border-radius:6px;font:600 14px system-ui;cursor:pointer">Continue</button></div>';
  document.body.append(o);draw(o.querySelector('canvas'),d.scene);requestAnimationFrame(()=>o.style.opacity='1');
  const close=()=>{if(generation!==epoch)return;o.remove();open=false;setTimeout(show,800)};o.querySelector('button').onclick=close;setTimeout(()=>{if(o.isConnected)close()},14000)}
 function trigger(id){if(!defs[id]||seen[id])return false;seen[id]=1;try{localStorage.setItem(KEY,JSON.stringify(seen))}catch(e){}queue.push(id);show();return true}
 function check(){if(document.hidden||(navigator.webdriver&&!window.scMilestoneTest))return;let s;try{s=window.scCityEconomy&&window.scCityEconomy.snapshot()}catch(e){return}if(!s)return;const bs=s.buildings||[],n=t=>bs.filter(b=>b.type===t).length;
  if(window.sc49BaseFarms==null)window.sc49BaseFarms=n('farm');
  if(n('house')>=3)trigger('homes');if(s.food&&s.food.last&&n('farm')>window.sc49BaseFarms)trigger('harvest');if(n('market')>=1)trigger('market');if(s.population>=20)trigger('growth');if(s.trade&&s.trade.goodsSold>0)trigger('caravan')}
 window.scMilestones={trigger,defs:Object.keys(defs),reset(){seen={};try{localStorage.removeItem(KEY)}catch(e){}}};
 for(const event of ['sc-city-started','sc-city-restored'])window.addEventListener(event,()=>{epoch++;queue.length=0;open=false;document.getElementById('sc34Milestone')?.remove();});
 setInterval(show,250);setInterval(check,3000)})();
