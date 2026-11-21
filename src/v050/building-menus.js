/* Native inspector menus; all workplace changes use the existing economy API. */
(()=>{'use strict';
 let epoch=0;for(const event of ['sc-city-started','sc-city-restored'])window.addEventListener(event,()=>epoch++);
 const identity=()=>window.scCitySave.status().cityId;
 function menu(type,b){
 const host=document.getElementById('scBuildingMenu');
 if(host?.dataset.sc50Building===String(b.id))update(host,type,b.id);
 return {html:'<div data-sc50-menu="'+type+'" data-building="'+b.id+'" data-epoch="'+epoch+'"><b>'+(type==='workshop'?'Carpenters’ Workshop':'School')+'</b><p data-facts></p>'+(type==='workshop'?'<details><summary>Production & staffing</summary><p>At full staffing: 4 wood → 1 plank per five-second cycle. Shared storage: 200 planks. Priority can draw staff away from food producers. Map builders are separate from civilian jobs.</p></details><button type="button" data-residents>Review employment</button>':'<details><summary>Learning & attendance</summary><p>These are the residents currently listed as teaching or attending this School. Teachers are assigned from available working-age residents after production jobs. This view adds no jobs or production bonuses.</p></details><button type="button" data-residents>View residents</button>')+'</div>',bind:h=>{
 h.dataset.sc50Building=String(b.id);const city=identity(),version=epoch;let held=null;
 h.firstElementChild.addEventListener('pointerdown',()=>held=epoch);h.firstElementChild.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' ')held=epoch});
 const valid=()=>window.scCaravan.activationAllowed()&&window.sc50UI.activationAllowed()&&version===epoch&&city===identity()&&(held===null||held===epoch)&&window.scRTSInspectedBuilding?.id===b.id;
 h.querySelector('[data-residents]').onclick=()=>{if(!valid())return;if(type==='school'){window.sc50UI.activate('sc36People');document.getElementById('sc36PeopleBtn')?.click()}else{window.sc50UI.activate('sc159Pulse');document.getElementById('sc1312CityLifeBtn')?.click()}};update(h,type,b.id);
 }};
 }
 function update(h,type,id){const facts=h.querySelector('[data-facts]');if(!facts)return;
 if(type==='workshop'){const s=window.scCityEconomy.snapshot().workforce.sites.find(x=>x.id===id),stock=window.scTradeTown.snapshot();if(!s)return;facts.textContent='Staff: '+s.filled+'/'+s.need+' · '+(s.paused?'Paused':'Open')+' · Wood: '+Math.floor(stock.wood)+' · Planks: '+Math.floor(stock.planks)+'/200';}
 else{const people=window.scPeople.list(),site='school #'+id,teachers=people.filter(p=>p.role==='Teacher'&&p.site.toLowerCase()===site),pupils=people.filter(p=>p.attends?.toLowerCase()===site);facts.textContent='Teacher: '+(teachers.map(p=>p.name).join(', ')||'No available teacher')+' · Pupils: '+pupils.length+(pupils.length?' — '+pupils.map(p=>p.name).join(', '):'');}}
 for(const type of ['workshop','school'])window.scBuildingMenus.register(type,b=>menu(type,b));
})();
