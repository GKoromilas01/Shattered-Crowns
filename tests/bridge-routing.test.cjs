const {test}=require('node:test');
const assert=require('node:assert/strict');
const {readFileSync}=require('node:fs');
const vm=require('node:vm');

const html=readFileSync('index.html','utf8');
const movement=html.slice(html.indexOf('function move(u,p,dt'),html.indexOf('function attack(u,t,dt)'));
const terrain=readFileSync('src/v059/terrain.js','utf8');
const window={};
const context=vm.createContext({
 window,buildings:[],nodes:[],W:2450,scFastRate:1,
 dist:(a,b)=>Math.hypot(a.x-b.x,a.y-b.y),
 clamp:(v,min,max)=>Math.max(min,Math.min(v,max))
});
vm.runInContext(terrain+'\n'+movement,context);

test('Workers and soldiers reach either bank through the bridge',()=>{
 for(const [type,speed] of [['worker',40],['soldier',55]]){
  for(const [from,to] of [[400,620],[620,400]]){
   const unit={type,speed,x:from,y:125};
   const target={x:to,y:125};
   let crossed=false;
   for(let i=0;i<700;i++){
    if(context.move(unit,target,.05))break;
    if(Math.abs(unit.x-window.sc59RiverCenter(unit.y))<25){
     crossed=true;
     assert.ok(Math.abs(unit.y-315)<17,'unit entered the river away from the bridge');
    }
   }
   assert.ok(crossed);
   assert.ok(Math.hypot(unit.x-to,unit.y-125)<=1);
  }
 }
});

test('A unit can stop at a destination on the bridge deck',()=>{
 const unit={type:'worker',speed:40,x:550,y:315};
 const target={x:540,y:315};
 for(let i=0;i<100;i++)if(context.move(unit,target,.05))break;
 assert.ok(Math.hypot(unit.x-target.x,unit.y-target.y)<=1);
});
