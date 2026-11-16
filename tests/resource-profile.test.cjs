const {test}=require('node:test');const assert=require('node:assert/strict');
const rp=require('../src/v029/resource-profile.js');const sites=Object.values(require('../assets/v029/placement.json').sites);
test('Every village keeps all three main resources and can build at the start',()=>{
 assert.equal(sites.length,128);
 for(const s of sites){const p=rp.profile(s);for(const k of ['wood','stone','food']){assert.ok(p.income[k]>0);assert.ok(p.start[k]>=rp.MIN_START[k]);}assert.ok(p.specialty);}
});
test('Terrain shifts abundance: rich beats poor but poor is never zero',()=>{
 const hi=rp.profile({b:'highland',r:[1,4,2,1,1]}),fo=rp.profile({b:'forest',r:[4,1,2,2,3]});
 assert.ok(hi.income.stone>fo.income.stone);assert.ok(fo.income.wood>hi.income.wood);assert.ok(hi.income.wood>0&&fo.income.stone>0);
 assert.deepEqual(hi.short.sort(),['food','wood']);assert.ok(hi.surplus.includes('stone'));
});
test('Shortages generate trade needs only when stock runs low',()=>{
 const s={b:'highland',r:[1,4,2,1,1]};
 assert.ok(rp.tradeNeeds(s,{wood:10,stone:500,food:500}).includes('wood'));
 assert.equal(rp.tradeNeeds(s,{wood:500,stone:500,food:500}).length,0);
});
test('Some villages are short and some rich, so trade has a purpose',()=>{
 const shortWood=sites.filter(s=>rp.profile(s).short.includes('wood')).length,richWood=sites.filter(s=>rp.profile(s).surplus.includes('wood')).length;
 assert.ok(shortWood>5&&richWood>5);
});
