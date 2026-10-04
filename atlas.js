
document.addEventListener("DOMContentLoaded",()=>{
  const card=document.querySelector(".atlas-major-card,[data-atlas-open]");
  const detail=document.querySelector(".atlas-detail,#atlasDetail");
  const close=document.querySelector(".atlas-close,[data-atlas-close]");
  const open=()=>{if(!detail)return;detail.hidden=false;card?.setAttribute("aria-expanded","true");detail.scrollIntoView({behavior:"smooth",block:"start"});};
  const shut=()=>{if(!detail)return;detail.hidden=true;card?.setAttribute("aria-expanded","false");card?.scrollIntoView({behavior:"smooth",block:"center"});};
  if(card)card.addEventListener("click",e=>{if(e.target.closest("a"))return;open();});
  if(close)close.addEventListener("click",e=>{e.stopPropagation();shut();});
  document.addEventListener("keydown",e=>{if(e.key==="Escape"&&detail&&!detail.hidden)shut();});
});
