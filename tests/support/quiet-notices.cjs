// UI notifications are now retained in the journal instead of appearing over the map.
async function notice(p,title){await p.waitForFunction(title=>sc50UI.snapshot().entries.some(x=>x.title===title),title,{timeout:7000});}
async function openTrade(p){await p.locator('#sc50JournalButton').click();await p.getByRole('button',{name:'Diplomacy & neighbour trade',exact:true}).click();await p.locator('#sc24TradePanel').waitFor({state:'visible'});}
module.exports={notice,openTrade};
