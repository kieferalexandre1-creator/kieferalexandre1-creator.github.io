
document.addEventListener("DOMContentLoaded",()=>{
  const toggle=document.getElementById("mobileNavToggle"), nav=document.getElementById("mainNav");
  if(toggle&&nav){toggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");nav.style.display=open?"flex":"";toggle.setAttribute("aria-expanded",String(open));});}
  document.querySelectorAll(".project-filters button").forEach(btn=>btn.addEventListener("click",()=>{
    document.querySelectorAll(".project-filters button").forEach(b=>b.classList.remove("active"));btn.classList.add("active");
    const f=btn.dataset.filter||"all";
    document.querySelectorAll("[data-category]").forEach(card=>{card.style.display=(f==="all"||card.dataset.category===f)?"": "none";});
  }));
  const form=document.getElementById("terminalForm"), input=document.getElementById("terminalInput"), out=document.getElementById("terminalOutput");
  if(form&&input&&out) form.addEventListener("submit",e=>{e.preventDefault();const q=input.value.trim().toLowerCase();if(!q)return;
    const d=document.createElement("div");d.innerHTML="<b>alexandre@portfolio:~$</b> "+q;out.appendChild(d);
    const a=document.createElement("div");a.textContent=q==="help"?"Commandes : profil · projets · certifs · contact":q==="projets"?"Aegis terminé · Borealis, Nimbus, Argus prévus · ATLAS = premier gros projet du portfolio":q==="certifs"?"Microsoft · Cisco · AWS · Fortinet":q==="contact"?"Consultez la section Contact du portfolio.":"Commande non reconnue — tapez help.";out.appendChild(a);input.value="";out.scrollTop=out.scrollHeight;
  });
  document.querySelectorAll(".future-project-card[data-future]").forEach(card=>card.addEventListener("click",()=>{
    const key=card.dataset.future; const detail=document.querySelector(`[data-future-detail="${key}"],#futureDetail`);
    document.querySelectorAll(".future-project-card").forEach(c=>c.setAttribute("aria-expanded","false"));
    card.setAttribute("aria-expanded","true");
    if(detail){detail.hidden=false;detail.scrollIntoView({behavior:"smooth",block:"nearest"});}
  }));
  const canvas=document.getElementById("net");
  if(canvas){const ctx=canvas.getContext("2d");let w,h,pts=[];const resize=()=>{w=canvas.width=innerWidth;h=canvas.height=innerHeight;pts=Array.from({length:28},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.15,vy:(Math.random()-.5)*.15}));};resize();addEventListener("resize",resize);
    (function draw(){ctx.clearRect(0,0,w,h);ctx.strokeStyle="rgba(70,216,232,.08)";ctx.fillStyle="rgba(70,216,232,.18)";pts.forEach((p,i)=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;ctx.fillRect(p.x,p.y,1,1);for(let j=i+1;j<pts.length;j++){let q=pts[j],dx=p.x-q.x,dy=p.y-q.y;if(dx*dx+dy*dy<18000){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();}}});requestAnimationFrame(draw)})(); }
});
