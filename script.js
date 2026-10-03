/* V31 : attendre la fin du chargement du document avant de lier les interactions. */
(function () {
  function initPortfolio() {
const menu=document.querySelector('.hamburger');const nav=document.querySelector('.navlinks');menu?.addEventListener('click',()=>{let opened=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(opened))});document.querySelectorAll('.navlinks a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));const anchors=[...document.querySelectorAll('.navlinks a[href^="#"]')];if(anchors.length){const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){anchors.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}})},{rootMargin:'-25% 0px -60% 0px'});anchors.forEach(a=>{const el=document.querySelector(a.getAttribute('href'));if(el)observer.observe(el)})}const theme=document.querySelector('.toggle');theme?.addEventListener('click',()=>{document.body.classList.toggle('light');theme.setAttribute('aria-pressed',String(document.body.classList.contains('light')))});const canvas=document.querySelector('.network');if(canvas){const ctx=canvas.getContext('2d');function paint(){const w=canvas.width=canvas.clientWidth*devicePixelRatio,h=canvas.height=canvas.clientHeight*devicePixelRatio;ctx.clearRect(0,0,w,h);const dots=Array.from({length:31},(_,i)=>({x:((i*137.508)%100)/100*w,y:((i*73.913+21)%100)/100*h}));ctx.lineWidth=1*devicePixelRatio;dots.forEach((a,i)=>{dots.slice(i+1).forEach(b=>{const d=Math.hypot(a.x-b.x,a.y-b.y);if(d<w*.17){ctx.strokeStyle='rgba(40,103,255,.13)';ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}});ctx.fillStyle=i%3?'#1556d6':'#12a7f5';ctx.beginPath();ctx.arc(a.x,a.y,1.4*devicePixelRatio,0,Math.PI*2);ctx.fill()})}paint();window.addEventListener('resize',paint)}
/* V13 — commandes et topologies interactives */
const terminalOutputs={whoami:'Alexandre Kiefer\nAdministrateur systèmes, réseaux & cybersécurité',skills:'Windows Server · Debian · VMware ESXi/vCenter\nVLAN · ACL · VPN · Synology · Bash',projects:'Aegis Infra Lab — laboratoire personnel en cours\nCCP3 — audit et sécurisation d’une infrastructure virtualisée',availability:'Recherche une alternance de 24 mois\nMastère Expert Cybersécurité · Octobre 2026\n1 semaine école / 3 semaines entreprise'};
document.querySelectorAll('[data-command]').forEach(button=>button.addEventListener('click',()=>{const result=document.querySelector('.terminal-result');if(result)result.textContent='~$ '+button.dataset.command+'\n'+terminalOutputs[button.dataset.command]}));
const topoContent={aegis:{firewall:['OPNsense','Pare-feu et routage du laboratoire. Contrôle des communications entre les zones réseau et expérimentation du filtrage.'],infra:['Windows Server 2022','Environnement Active Directory, DNS et DHCP, avec des postes clients Windows intégrés au domaine.'],production:['Debian 12 et clients','Environnements Linux et Windows pour tester les services, les configurations et les échanges réseau.'],backup:['Sauvegarde et supervision','Volet de protection, de suivi et de continuité du laboratoire, développé progressivement.']},ccp3:{firewall:['OpenVPN et contrôle des accès','Accès administrateurs par tunnel VPN chiffré et certificats TLS. Filtrage des communications par ACL.'],infra:['VLAN 10 — INFRA','Hôtes VMware ESXi, vCenter et interfaces d’administration. Durcissement et application du moindre privilège.'],production:['VLAN 20 — PROD','Postes et environnement de production. Les communications vers les sauvegardes sont bloquées par ACL.'],backup:['VLAN 30 — BACKUP','NAS Synology isolé, sauvegardes chiffrées, rétention, snapshots et tests de restauration.']}};
document.querySelectorAll('[data-topology]').forEach(topology=>{const nodes=topology.querySelectorAll('[data-node]'),info=topology.querySelector('.topology-info');function show(node){nodes.forEach(n=>{const on=n===node;n.classList.toggle('selected',on);n.setAttribute('aria-pressed',String(on))});const item=topoContent[topology.dataset.topology]?.[node.dataset.node];if(item&&info){info.querySelector('h3').textContent=item[0];info.querySelector('p').textContent=item[1]}}nodes.forEach(node=>node.addEventListener('click',()=>show(node)));if(nodes[0])show(nodes[0])});
/* Réseau d’accueil animé très lentement, désactivé si mouvements réduits */
(()=>{const canvas=document.querySelector('.network');if(!canvas||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const ctx=canvas.getContext('2d');let raf=0;const dots=Array.from({length:25},(_,i)=>({x:((i*137.508)%100)/100,y:((i*73.913+21)%100)/100,phase:i*.63}));function frame(t){const dpr=Math.min(devicePixelRatio||1,2),w=canvas.clientWidth,h=canvas.clientHeight;if(!w||!h)return;const W=Math.round(w*dpr),H=Math.round(h*dpr);if(canvas.width!==W||canvas.height!==H){canvas.width=W;canvas.height=H}ctx.clearRect(0,0,W,H);const p=dots.map(d=>({x:(d.x+Math.sin(t/11000+d.phase)*.008)*W,y:(d.y+Math.cos(t/13000+d.phase)*.008)*H}));ctx.lineWidth=dpr;p.forEach((a,i)=>{for(let j=i+1;j<p.length;j++){const b=p[j],dist=Math.hypot(a.x-b.x,a.y-b.y);if(dist<W*.18){ctx.strokeStyle='rgba(101,159,158,.13)';ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke()}}ctx.fillStyle='#719e94';ctx.beginPath();ctx.arc(a.x,a.y,1.3*dpr,0,Math.PI*2);ctx.fill()});raf=requestAnimationFrame(frame)}raf=requestAnimationFrame(frame);document.addEventListener('visibilitychange',()=>{if(document.hidden)cancelAnimationFrame(raf);else raf=requestAnimationFrame(frame)})})();


/* V18 — Fiches projets et compétences dans une fenêtre modale */
(()=>{const modal=document.getElementById('detail-modal');if(!modal)return;
const title=modal.querySelector('#detail-title'),description=modal.querySelector('#detail-description'),type=modal.querySelector('#detail-type'),symbol=modal.querySelector('#detail-symbol'),tags=modal.querySelector('#detail-tags'),extra=modal.querySelector('#detail-extra'),link=modal.querySelector('#detail-link');
const projectNotes={
 'Aegis Infra Lab':'Laboratoire personnel en cours de développement. Architecture virtualisée autour d’OPNsense, de Windows Server 2022, de postes intégrés au domaine et de Debian 12. Objectifs : segmentation, filtrage réseau, services AD/DNS/DHCP, sécurisation, supervision et documentation.',
 'Audit & sécurisation CCP3':'Projet de Bachelor réalisé chez CESAM SEED : audit et analyse des risques, séparation des environnements par VLAN, contrôle des flux avec des ACL, accès administrateurs via OpenVPN, durcissement VMware ESXi/vCenter, sauvegardes Synology et supervision des services. Présentation publique simplifiée et anonymisée.',
 'Aegis Infra Lab sur GitHub':'Accédez au dépôt Aegis Infra Lab pour consulter sa documentation technique et suivre les évolutions du laboratoire.'
};
function show(card,isProject){const h=card.querySelector('h3');if(!h)return;const name=h.textContent.trim();title.textContent=name;description.textContent=(card.querySelector('p')?.textContent||'').trim();type.textContent=isProject?(card.querySelector('.chip')?.textContent||'PROJET'):'COMPÉTENCE · SAVOIR-FAIRE';symbol.textContent=card.querySelector(isProject?'.project-art':'.symbol')?.textContent.trim()||'⬡';extra.textContent=isProject?(projectNotes[name]||'Découvrez les objectifs, les technologies et les réalisations de ce projet.'):'Une compétence développée pendant mon parcours de formation, mes expériences en entreprise et mes projets techniques personnels.';tags.replaceChildren();if(isProject){const raw=card.querySelector('.tech')?.textContent||'';raw.split('·').map(s=>s.trim()).filter(Boolean).forEach(t=>{const el=document.createElement('span');el.textContent=t;tags.append(el)});link.hidden=false;link.href=card.getAttribute('href')||'#projets';link.textContent=link.href.startsWith('http')?'Voir mes dépôts GitHub ↗':'Consulter le projet complet ↗';if(link.href.startsWith('http')){link.target='_blank';link.rel='noopener'}else{link.removeAttribute('target');link.removeAttribute('rel')}}else{link.hidden=true;const words=[...card.querySelectorAll('strong')].map(el=>el.textContent.trim());words.forEach(t=>{const el=document.createElement('span');el.textContent=t;tags.append(el)})}modal.showModal()}
document.querySelectorAll('.project-card').forEach(card=>{card.addEventListener('click',e=>{if(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;e.preventDefault();show(card,true)})});
document.querySelectorAll('.skill').forEach(card=>{card.tabIndex=0;card.setAttribute('role','button');card.setAttribute('aria-label','En savoir plus : '+(card.querySelector('h3')?.textContent||'compétence'));card.addEventListener('click',()=>show(card,false));card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();show(card,false)}})});
modal.querySelectorAll('.detail-close,.detail-dismiss').forEach(b=>b.addEventListener('click',()=>modal.close()));modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});
})();

// V19: introduction non bloquante (une seule fois par onglet), comparaison accessible.
(()=>{const intro=document.getElementById('boot-intro');if(intro){const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;let seen=false;try{seen=sessionStorage.getItem('ak-boot-v19')==='1';sessionStorage.setItem('ak-boot-v19','1')}catch(e){}if(reduced||seen){intro.remove()}else{window.setTimeout(()=>{intro.classList.add('boot-hidden');window.setTimeout(()=>intro.remove(),600)},2200)}}const range=document.getElementById('compare-range');const after=document.getElementById('compare-after');const divider=document.getElementById('compare-divider');if(range&&after&&divider){const update=()=>{const x=Number(range.value);after.style.clipPath=`inset(0 ${100-x}% 0 0)`;divider.style.left=`${x}%`};range.addEventListener('input',update);update()}})();

/* V21 : révélation légère au défilement, sans masquer le contenu si JS est absent. */
(()=>{if(!('IntersectionObserver' in window)||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const items=[...document.querySelectorAll('.bio-section,.section:not(.bio-section)')];if(!items.length)return;const obs=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('ak-visible');obs.unobserve(e.target)}})},{threshold:.07,rootMargin:'0px 0px 30px 0px'});items.forEach(el=>{if(el.getBoundingClientRect().top<window.innerHeight*.95){el.classList.add('ak-visible')}else{el.classList.add('ak-reveal');obs.observe(el)}});document.body.classList.add('ak-reveal-ready')})();

/* V22 — navigation mobile : fermeture après sélection, clic extérieur et Échap */
(()=>{const menu=document.querySelector('.hamburger'),nav=document.querySelector('.navlinks');if(!menu||!nav)return;const close=()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Ouvrir le menu')};menu.addEventListener('click',()=>{menu.setAttribute('aria-label',nav.classList.contains('open')?'Fermer le menu':'Ouvrir le menu')});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));document.addEventListener('click',e=>{if(!nav.contains(e.target)&&!menu.contains(e.target))close()});document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});window.addEventListener('resize',()=>{if(window.innerWidth>850)close()})})();

  }
  
/* V34 — console de compétences interactive */
document.querySelectorAll('.domain-tab').forEach(tab=>{
  tab.addEventListener('click',()=>{
    const key=tab.dataset.domain;
    document.querySelectorAll('.domain-tab').forEach(t=>{const on=t===tab;t.classList.toggle('active',on);t.setAttribute('aria-selected',String(on))});
    document.querySelectorAll('.domain-panel').forEach(p=>p.classList.toggle('active',p.dataset.panel===key));
    const path=document.getElementById('domain-path');
    if(path) path.textContent='/infrastructure/'+key;
  });
});

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPortfolio, { once: true });
  } else {
    initPortfolio();
  }
})();

// V32 — animations sobres au scroll + progression
(() => {
  const reveal = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  }), { threshold: .12 });
  reveal.forEach(el => io.observe(el));
  const progress = document.querySelector('.progress-section');
  if (progress) {
    const pio = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) progress.classList.add('in-view');
    }, {threshold:.2});
    pio.observe(progress);
  }
})();
