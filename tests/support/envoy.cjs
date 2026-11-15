const {adapter}=require('./trade-town.cjs');
const envoyAdapter=adapter+`window.__envoyTest={
 supplier(){__townTest.ready();__townTest.advance(40);if(!scTradeTown.dispatch('agreement'))throw Error('planks');__townTest.advance(120);scTradeTown.reserveBaskets(12);__townTest.advance(70);if(!scTradeTown.dispatch('agreement'))throw Error('bread');__townTest.advance(120);scTradeTown.reserveBaskets(4);__townTest.advance(60);if(!scTradeTown.dispatch('agreement','timber'))throw Error('mixed');__townTest.advance(120);},
 yard(){const id=scTradeTown.upgrade(__townTest.market().id);if(!id)throw Error('yard');__townTest.finish(id);},
 gold(n){gold=n;updateUI();},wood(n){wood=n;updateUI();},loseYard(){const b=buildings.find(b=>b.type==='loadingyard');b.hp=0;buildings=buildings.filter(alive);},
 noCycle(){cityTimer=0;},stock(n){scTownState.planks=n;},baskets(n){tradeGoods=n;},advance(n){__townTest.advance(n);}
};`;
module.exports={adapter:envoyAdapter};
