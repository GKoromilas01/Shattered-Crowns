/* Portable resource pictograms: keep the adjacent text/value as the accessible name. */
window.sc26ResourceIcon=id=>{
 const drawings={
  resGold:'<g stroke="#8d5918" stroke-width="1.3"><ellipse cx="10" cy="16" rx="7" ry="3" fill="#c28b25"/><path d="M3 13v3m14-3v3"/><ellipse cx="10" cy="13" rx="7" ry="3" fill="#f3c34d"/><circle cx="15" cy="8" r="6" fill="#f4c650"/><circle cx="15" cy="8" r="4" fill="none" stroke="#fff0aa"/><path d="M15 5v6m-2-4h4" stroke="#a36d1e"/></g>',
  resWood:'<g stroke="#643f25" stroke-width="1.3"><path d="M3 7l10-4 7 5-10 4z" fill="#a47444"/><path d="M3 7v7l7 5v-7m0 7l10-4V8" fill="#805430"/><ellipse cx="6.5" cy="12" rx="3.4" ry="4.6" fill="#dfb47a"/><ellipse cx="6.5" cy="12" rx="1.5" ry="2.6" fill="none" stroke="#aa7747"/><path d="M12 11l6-3m-6 6l6-3" stroke="#d4a66a"/></g>',
  resStone:'<g stroke="#546575" stroke-width="1.3" stroke-linejoin="round"><path d="M2 16l3-7 8-3 8 7-4 6-12 1z" fill="#9aabb9"/><path d="M5 9l5 5 11-1M10 14l-2 6m5-14l-3 8" fill="none"/><path d="M5 9l8-3-3 8z" fill="#cfdae1"/><path d="M10 14l11-1-4 6-9 1z" fill="#7b8d9d"/></g>',
  resFood:'<g stroke="#a87c2b" stroke-width="1.2"><path d="M6 21L15 3m-5 18l8-14" fill="none" stroke="#e7c665"/><g fill="#f2d17b"><ellipse cx="11" cy="7" rx="2" ry="3" transform="rotate(-40 11 7)"/><ellipse cx="15" cy="10" rx="2" ry="3" transform="rotate(35 15 10)"/><ellipse cx="8" cy="12" rx="2" ry="3" transform="rotate(-40 8 12)"/><ellipse cx="12" cy="15" rx="2" ry="3" transform="rotate(35 12 15)"/><ellipse cx="17" cy="5" rx="1.8" ry="3" transform="rotate(30 17 5)"/></g></g>',
  resGoods:'<path d="M5 10Q5 1 12 2q7-1 7 8" fill="none" stroke="#d1a56b" stroke-width="2"/><path d="M4 11Q4 4 9 6q3-5 6 0 5-1 5 5" fill="#e7bf78" stroke="#aa7637"/><path d="M2 10h20l-3 11H5z" fill="#ad7945" stroke="#69472b" stroke-width="1.4"/><path d="M4 14h16M5 18h14M8 11l1 10m7-10l-1 10" stroke="#e1b77e" stroke-width="1"/>'
 };
 if(!drawings[id])return null;
 const holder=document.createElement('span');holder.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false" style="flex:none;vertical-align:middle">'+drawings[id]+'</svg>';
 return holder.firstChild;
};
