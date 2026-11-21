/* v0.50: presentation only. Native producers own progress, deadlines and payments. */
(()=>{'use strict';
 const style=document.createElement('style');style.textContent=`
 body:has(#sc50Journal:not([hidden])) #sc1311PauseOverlay{visibility:hidden}
 #scCityInspection:has([data-sc50-menu="workshop"]) #sc26WorkshopStock{display:none!important}
 #scChapters,#sc24Saying,#sc25Receipt,#sc24Offer{display:none!important}
 #scGuide:not([data-sc50-open]),#scStoryCard:not([data-sc50-open]),#scEventCard:not([data-sc50-open]){display:none!important}
 #sc50Journal[hidden],#sc50DecisionButton[hidden]{display:none!important}
 #sc50Journal{position:fixed;right:12px;top:calc(var(--sc-hud-height,100px) + 12px);width:min(370px,calc(100vw - 24px));max-height:calc(100dvh - var(--sc-hud-height,100px) - 110px);overflow:auto;box-sizing:border-box;padding:16px;z-index:30010;background:#203a32;color:#f2e6c6;border:1px solid #b99a65;border-radius:8px;font:13px/1.5 system-ui}
 #sc50Journal [data-objective]{white-space:pre-line}#sc50Journal h2{margin:0 0 8px;font-size:17px}#sc50Journal h3{font-size:14px}#sc50Journal button,#sc50MinimizeDecision{background:#3e5140;color:#fff0c5;border:1px solid #b99a65;border-radius:5px;padding:6px;cursor:pointer}
 #sc50JournalButton,#sc50DecisionButton{position:static!important;font:600 11px system-ui;padding:5px 8px;color:#fff0c5;background:#28473e;border:1px solid #b7a16d;border-radius:5px;cursor:pointer}
 #sc50DecisionButton{max-width:350px;white-space:normal;text-align:left;border-color:#efc867}
 @media(max-width:650px){#sc50DecisionButton{max-width:210px;font-size:10px}}
 `;document.head.append(style);
 const journal=document.createElement('section');journal.id='sc50Journal';journal.hidden=true;journal.setAttribute('role','region');journal.setAttribute('aria-label','Town journal');
 journal.innerHTML='<button type="button" data-close style="float:right" aria-label="Close town journal">✕</button><h2 tabindex="-1">Town journal</h2><h3>Current objective</h3><p data-objective></p><h3>Recent updates</h3><ol data-updates></ol><button type="button" data-chronicle>Full Chronicle</button> <button type="button" data-guide>Open guide</button> <button type="button" data-trade>Diplomacy & neighbour trade</button>';
 document.body.append(journal);
 const button=document.createElement('button');button.id='sc50JournalButton';button.type='button';button.textContent='Journal & objectives';button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls',journal.id);
 const decision=document.createElement('button');decision.id='sc50DecisionButton';decision.type='button';decision.hidden=true;decision.setAttribute('aria-controls','scEventCard');decision.setAttribute('aria-expanded','false');
 const toolbar=document.getElementById('sc149Status')||document.body;toolbar.append(button);toolbar.prepend(decision);function placeDecision(){const hud=document.getElementById('scResponsiveHud');if(hud&&toolbar.parentNode===hud)hud.insertBefore(decision,toolbar)}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',placeDecision,{once:true});else placeDecision();
 let entries=[],returnFocus=null,current=null,epoch=0,heldEpoch=null;
 const seen=new WeakSet(),noticeText=new Map();
 const closeControls={scConstructionPanel:'#scConstructionClose',sc24TradePanel:'#sc24TradeClose',scCityInspection:'[aria-label="Close building inspector"]',sc159Pulse:'#scCityLifeClose',sc1310AdvisorPanel:'#sc1310AdvisorClose',sc190ChroniclePanel:'#sc190Close',sc36People:'#sc36Close'};
 function activate(id){for(const [key,selector] of Object.entries(closeControls)){const p=document.getElementById(key);if(key!==id&&!(id==='sc24TradePanel'&&['sc159Pulse','scCityInspection'].includes(key))&&p&&!p.hidden)document.querySelector(selector)?.click()}if(id!==journal.id)hideJournal(false);document.getElementById('scGuide')?.removeAttribute('data-sc50-open');if(id!=='scEventCard')minimize();}
 function refresh(){journal.querySelector('[data-objective]').textContent=[...(document.getElementById('scChapters')?.children||[])].map(n=>n.textContent).join('\n')||'Build a sustainable town. Open the guide for help.';const list=journal.querySelector('[data-updates]');list.replaceChildren();for(const entry of entries){const li=document.createElement('li');const strong=document.createElement('strong');strong.textContent=entry.title+': ';li.append(strong,document.createTextNode(entry.text));list.append(li)}if(!entries.length){const li=document.createElement('li');li.textContent='No new updates in this town yet.';list.append(li)}}
 function notify(title,text){entries.unshift({title:String(title),text:String(text)});entries.length=Math.min(entries.length,40);button.textContent='Journal & objectives · '+entries.length;if(!journal.hidden)refresh()}
 function hideJournal(focus=true){if(journal.hidden)return;journal.hidden=true;button.setAttribute('aria-expanded','false');if(focus&&returnFocus?.isConnected)returnFocus.focus()}
 function openJournal(){returnFocus=document.activeElement;activate(journal.id);refresh();journal.hidden=false;button.setAttribute('aria-expanded','true');journal.querySelector('h2').focus()}
 function minimize(){const card=document.getElementById('scEventCard');card?.removeAttribute('data-sc50-open');decision.setAttribute('aria-expanded','false')}
 function openDecision(){const card=document.getElementById('scEventCard');if(!card)return;returnFocus=document.activeElement;activate('scEventCard');card.setAttribute('data-sc50-open','');decision.setAttribute('aria-expanded','true');card.querySelector('button')?.focus()}
 button.onclick=()=>journal.hidden?openJournal():hideJournal();decision.onclick=openDecision;journal.querySelector('[data-close]').onclick=()=>hideJournal();
 journal.querySelector('[data-chronicle]').onclick=()=>{activate('sc190ChroniclePanel');document.getElementById('sc190ChronicleBtn')?.click()};
 journal.querySelector('[data-trade]').onclick=()=>{activate('sc24TradePanel');window.scCaravanUI.open()};
 journal.querySelector('[data-guide]').onclick=()=>{returnFocus=button;activate('scGuide');document.getElementById('scGuideOpen')?.click();document.getElementById('scGuide')?.setAttribute('data-sc50-open','');document.getElementById('scGuideClose')?.focus()};
 document.addEventListener('click',e=>{const ids={sc1312CityLifeBtn:'sc159Pulse',sc1310AdvisorBtn:'sc1310AdvisorPanel',sc190ChronicleBtn:'sc190ChroniclePanel',sc36PeopleBtn:'sc36People',sc189HelpButton:'sc189HelpPanel',scGuideOpen:'scGuide',sc24MarketTrade:'sc24TradePanel',sc24CityTrade:'sc24TradePanel',scConstructionOpen:'scConstructionPanel'};const b=e.target.closest?.('button');if(b&&ids[b.id]){activate(ids[b.id]);if(b.id==='scGuideOpen')document.getElementById('scGuide')?.setAttribute('data-sc50-open','')}},true);
 window.addEventListener('sc-building-inspected',()=>activate('scCityInspection'));window.addEventListener('sc-building-selected',()=>activate('scCityInspection'));window.addEventListener('sc-selection-changed',e=>{if(e.detail?.building)activate('scCityInspection')});
 const controls='#sc50Journal,#sc50JournalButton,#sc50DecisionButton,#sc50MinimizeDecision,#scEventCard,#scGuide,#scBuildingMenu [data-sc50-menu]';
 window.addEventListener('pointerdown',e=>{if(e.target.closest?.(controls))heldEpoch=epoch},true);
 window.addEventListener('pointerup',()=>setTimeout(()=>heldEpoch=null,0),true);
 window.addEventListener('keyup',e=>{if(e.code==='Space'||e.key==='Enter')setTimeout(()=>heldEpoch=null,0)},true);
 window.addEventListener('keydown',e=>{
  if(e.key==='Escape'){
   if(document.querySelector('dialog[open]')||['scKingdomPanel','sc189HelpPanel'].some(id=>{const n=document.getElementById(id);return n&&!n.hidden&&n.getClientRects().length}))return;
   const card=document.getElementById('scEventCard'),guide=document.getElementById('scGuide');
   if(!journal.hidden||card?.hasAttribute('data-sc50-open')||guide?.hasAttribute('data-sc50-open')){e.preventDefault();e.stopImmediatePropagation();hideJournal();minimize();guide?.removeAttribute('data-sc50-open');if(returnFocus?.isConnected)returnFocus.focus()}return;
  }
  if(e.target.closest?.(controls)&&!e.ctrlKey&&!e.metaKey&&!e.altKey){if(e.code==='Space'||e.key==='Enter'){if(e.repeat)e.preventDefault();else heldEpoch=epoch}e.stopPropagation()}
 },true);
 const kingdomOpen=window.scKingdomUI.open;window.scKingdomUI.open=function(...args){activate('scKingdomPanel');return kingdomOpen.apply(this,args)};
 const constructionOpen=window.scConstructionUI.open;window.scConstructionUI.open=function(...args){activate('scConstructionPanel');return constructionOpen.apply(this,args)};
 function scan(){for(const [id,title] of [['sc24Saying','Words for the road'],['sc25Receipt','Shipment returned'],['sc24Offer','Neighbour trade offer']]){const n=document.getElementById(id);if(n&&!n.hidden&&noticeText.get(id)!==n.textContent){noticeText.set(id,n.textContent);notify(title,n.textContent)}}const story=document.getElementById('scStoryCard');if(story&&!seen.has(story)){seen.add(story);notify(story.children[1]?.textContent||'Town update',story.children[2]?.textContent||'')}
 const card=document.getElementById('scEventCard');if(card!==current){current=card;if(card){const minimizeButton=document.createElement('button');minimizeButton.id='sc50MinimizeDecision';minimizeButton.type='button';minimizeButton.textContent='Read later · timer continues';minimizeButton.onclick=()=>{minimize();decision.focus()};card.append(minimizeButton);if(card.hasAttribute('data-sc50-open')){activate('scEventCard');card.setAttribute('data-sc50-open','')}}}
 decision.hidden=!card;if(card)decision.textContent=(card.getAttribute('aria-label')||'Decision')+' · '+(document.getElementById('scEventClock')?.textContent||'Open decision');else decision.setAttribute('aria-expanded','false');}
 // Explicit API calls remain explicit requests. Automatic producer calls stay quiet.
 const fire=window.scEvents.fire;window.scEvents.fire=function(...args){const result=fire.apply(this,args);document.getElementById('scEventCard')?.setAttribute('data-sc50-open','');scan();return result};
 for(const name of ['show','card']){const original=window.scStoryCards[name];window.scStoryCards[name]=function(...args){const result=original.apply(this,args);document.getElementById('scStoryCard')?.setAttribute('data-sc50-open','');scan();return result}}
 for(const name of ['sc-city-started','sc-city-restored'])window.addEventListener(name,()=>{epoch++;entries=[];noticeText.clear();window.scEvents.close();window.scStoryCards.reset?.();hideJournal(false);current=null;scan();button.textContent='Journal & objectives'});
 setInterval(scan,250);
 window.sc50UI={openJournal,openDecision,activate,notify,snapshot:()=>({entries:entries.map(x=>({...x})),epoch,decision:!!document.getElementById('scEventCard')}),activationAllowed:()=>heldEpoch===null||heldEpoch===epoch,siteDetails:id=>{const p=document.getElementById('scConstructionPanel');return !!p&&!p.hidden&&document.getElementById('scConstructionSite')?.value===String(id)}};scan();
})();
