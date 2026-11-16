const {test}=require('node:test');const assert=require('node:assert/strict');const w=require('../src/v029/war-costs.js');
const base={soldiers:20,income:120,role:'aggressor',defenderWealth:3000,ownWealth:3000};
test('Declaring an unjust war hurts standing and stability more than a justified one',()=>{
 const a=w.declare(false),b=w.declare(true);assert.ok(a.standing<b.standing&&a.stability<b.stability&&a.embargo&&!b.embargo);
});
test('Economy penalty grows with war length, is capped, and hits the aggressor harder',()=>{
 assert.ok(w.economyPenalty(0,'aggressor')>0);assert.ok(w.economyPenalty(20,'aggressor')>w.economyPenalty(5,'aggressor'));
 assert.equal(w.economyPenalty(999,'aggressor'),w.CFG.econCap);assert.ok(w.economyPenalty(20,'aggressor')>w.economyPenalty(20,'defender'));
 assert.ok(w.weariness(100)<=w.CFG.warWeariness.cap);
});
test('A short, won war pays; a long one eats the prize',()=>{
 assert.ok(w.netIfWon({...base,days:10})>0,'short win');
 assert.ok(w.netIfWon({...base,days:80})<0,'long win');
 assert.ok(w.netIfWon({...base,days:10})>w.netIfWon({...base,days:30}));
});
test('A lost war is always negative and worse than a won one',()=>{
 for(const days of [1,10,40]){assert.ok(w.netIfLost({...base,days})<0);assert.ok(w.netIfLost({...base,days})<w.netIfWon({...base,days}));}
});
test('War is never free: even day-one cost is above zero',()=>{assert.ok(w.totalCost({...base,days:1})>0);});
test('Peaceful growth is competitive: a quick win is not worth more than a season of income',()=>{
 assert.ok(w.netIfWon({...base,days:10})<base.income*30);
});
