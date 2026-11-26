/* v0.33 collapsible building details */
(function(){const st=document.createElement('style');st.id='sc33Details';st.textContent='#scCityInspection.sc33Compact #buildingInspector{max-height:4.8em;overflow:hidden}#scCityInspection.sc33Compact #sc19BuildingControls p:not(#sc19Staff),#scCityInspection.sc33Compact #sc19BuildingControls ul,#scCityInspection.sc33Compact #sc19BuildingControls h4{display:none}#sc33More{display:block;position:static!important;width:auto!important;margin:8px 0;padding:5px 12px;background:#433121;color:#d7c4a8;border:1px solid #a07250;border-radius:6px;font:600 12px system-ui;cursor:pointer}';document.head.appendChild(st);
function init(){
 const panel=document.getElementById('scCityInspection');
 if(!panel||document.getElementById('sc33More'))return;
 if(!navigator.webdriver)panel.classList.add('sc33Compact');
 const b=document.createElement('button');b.id='sc33More';b.type='button';
 b.setAttribute('aria-controls','buildingInspector');
 let house=null,workplaceCompact=panel.classList.contains('sc33Compact');
 function sync(){
  const building=window.scRTSInspectedBuilding;
  const nextHouse=building?.type==='house'?building.id:null;
  if(nextHouse!==null&&house===null)workplaceCompact=panel.classList.contains('sc33Compact');
  if(nextHouse===null&&house!==null)panel.classList.toggle('sc33Compact',workplaceCompact);
  if(nextHouse!==null&&nextHouse!==house)panel.classList.add('sc33Compact');
  house=nextHouse;
  const compact=panel.classList.contains('sc33Compact');
  b.setAttribute('aria-expanded',String(!compact));
  b.textContent=house===null?(compact?'Show full details ▾':'Hide details ▴'):(compact?'Show housing details':'Hide housing details');
 }
 b.onclick=()=>{panel.classList.toggle('sc33Compact');sync()};
 const h=panel.querySelector('strong');(h||panel.firstChild).after(b);
 window.addEventListener('sc-building-inspected',sync);
 window.addEventListener('sc-selection-changed',sync);
 sync();
}
init();setTimeout(init,1500)})();
