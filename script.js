document.documentElement.style.scrollBehavior='auto';
if('scrollRestoration' in history) history.scrollRestoration='manual';
window.scrollTo(0,0);
window.addEventListener('pageshow',()=>{if(!location.hash) window.scrollTo(0,0);document.documentElement.style.scrollBehavior='smooth';});
if ('scrollRestoration' in history) history.scrollRestoration='manual';
window.addEventListener('load',()=>{if(!location.hash) window.scrollTo(0,0);});
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
// Intro always visible on a fresh page load, then disappears automatically.
setTimeout(()=>$('#boot')?.classList.add('off'),1900);
setTimeout(()=>$('#boot')?.remove(),2500);

// Lightweight infrastructure network background.
const c=$('#net'),x=c.getContext('2d');let pts=[];
function resize(){c.width=innerWidth*devicePixelRatio;c.height=innerHeight*devicePixelRatio;x.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);pts=Array.from({length:28},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,vx:(Math.random()-.5)*.06,vy:(Math.random()-.5)*.06}))}
function draw(){x.clearRect(0,0,innerWidth,innerHeight);for(const p of pts){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>innerWidth)p.vx*=-1;if(p.y<0||p.y>innerHeight)p.vy*=-1;x.fillStyle='rgba(70,216,232,.35)';x.fillRect(p.x,p.y,2,2)}for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const a=pts[i],b=pts[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<145){x.strokeStyle=`rgba(70,216,232,${(1-d/145)*.045})`;x.beginPath();x.moveTo(a.x,a.y);x.lineTo(b.x,b.y);x.stroke()}}requestAnimationFrame(draw)}resize();addEventListener('resize',resize);draw();

const data={
edge:{k:'COUCHE 01 / PÉRIMÈTRE',t:'Pare-feu & routage',p:"OPNsense sert de passerelle au laboratoire. Cette couche permet de travailler le routage, le filtrage réseau et les règles de communication entre les différentes zones.",f:['Internet','OPNsense','Réseau interne']},
identity:{k:'COUCHE 02 / IDENTITÉ',t:'Active Directory & GPO',p:"Windows Server 2022 héberge Active Directory Domain Services. Le lab permet de gérer le domaine, les utilisateurs, les groupes, les droits et les stratégies GPO.",f:['Windows Server 2022','AD DS','Postes du domaine']},
services:{k:'COUCHE 03 / SERVICES RÉSEAU',t:'DNS & DHCP',p:"DNS et DHCP accompagnent l'annuaire afin d'assurer la résolution de noms et l'attribution de la configuration réseau aux clients du laboratoire.",f:['DNS','DHCP','Windows Client']},
segment:{k:'COUCHE 04 / SÉCURITÉ RÉSEAU',t:'Segmentation & filtrage',p:"La segmentation isole les rôles et les flux. Les règles de filtrage permettent de contrôler précisément les communications autorisées entre les différentes zones.",f:['Zone clients','Règles / ACL','Zone serveurs']},
linux:{k:'COUCHE 05 / SYSTÈMES',t:'Administration Linux',p:"Debian 12 complète l'environnement Microsoft et sert à pratiquer l'administration Linux, les services, Bash et l'exploitation quotidienne.",f:['Debian 12','Services','Bash']},
monitor:{k:'COUCHE 06 / EXPLOITATION',t:'Supervision & alertes',p:"La supervision centralise l'état des systèmes et services afin de détecter les incidents, analyser les alertes et contribuer au maintien en condition opérationnelle.",f:['Hôtes','Zabbix','Alertes']}
};
function layer(k){const d=data[k];$('#infraPanel').innerHTML=`<small>${d.k}</small><h3>${d.t}</h3><p>${d.p}</p><div class="flow">${d.f.map((v,i)=>`${i?'<i>→</i>':''}<b>${v}</b>`).join('')}</div>`}
layer('edge');
$$('.infra-tabs button').forEach(b=>b.addEventListener('click',()=>{$$('.infra-tabs button').forEach(q=>q.classList.remove('active'));b.classList.add('active');layer(b.dataset.layer)}));

const answers={
help:'Commandes : whoami · skills · experience · formation · aegis · contact · clear',
whoami:'Alexandre Kiefer — Administrateur Systèmes, Réseaux & Cybersécurité.',
skills:'Windows Server · Active Directory · Linux · VMware · VLAN · ACL · VPN · OPNsense · Synology · Zabbix · PowerShell.',
experience:'CESAM SEED : alternance Administrateur Systèmes, Réseaux & Cybersécurité | Kertios : stage Technicien Informatique.',
formation:'TP Technicien Informatique — OpenClassrooms | Bachelor AIS — LiveCampus | Objectif : Mastère Expert Cybersécurité.',
aegis:'Aegis Infra Lab — OPNsense + Windows Server 2022 + AD/DNS/DHCP/GPO + Windows Client + Debian 12 + supervision.',
contact:'kiefer.alexandre1@gmail.com · 06 28 04 15 78'
};
$('#terminalForm').addEventListener('submit',e=>{e.preventDefault();const input=$('#terminalInput'),v=input.value.trim().toLowerCase();if(!v)return;if(v==='clear'){$('#terminalOutput').innerHTML='';input.value='';return}$('#terminalOutput').insertAdjacentHTML('beforeend',`<div><b>alexandre@portfolio:~$</b> ${v}</div><div>${answers[v]||'Commande inconnue — tape help.'}</div>`);input.value='';});

const projectData={
 edge:{k:'COUCHE 01 / PÉRIMÈTRE',t:'Pare-feu & routage',p:"OPNsense constitue la passerelle du laboratoire. Cette couche sert à travailler le routage, le filtrage et le contrôle des communications entre les zones.",f:['Internet','OPNsense','Réseau interne']},
 identity:{k:'COUCHE 02 / IDENTITÉ',t:'Active Directory & GPO',p:"Windows Server 2022 héberge Active Directory Domain Services. Gestion du domaine, des utilisateurs, groupes, droits d'accès et stratégies GPO.",f:['Windows Server 2022','AD DS','Postes domaine']},
 network:{k:'COUCHE 03 / SERVICES',t:'DNS & DHCP',p:"Les services DNS et DHCP assurent la résolution de noms et l'attribution de la configuration réseau aux postes du laboratoire.",f:['DNS','DHCP','Clients']},
 segment:{k:'COUCHE 04 / RÉSEAU',t:'Segmentation & contrôle des flux',p:"Le lab permet de pratiquer la séparation logique des environnements avec VLAN, ACL et règles de filtrage afin de limiter les communications inutiles.",f:['Zone clients','VLAN / ACL','Zone serveurs']},
 systems:{k:'COUCHE 05 / SYSTÈMES',t:'Windows & Linux',p:"Le laboratoire associe Windows Server 2022, Windows Client et Debian 12 afin de pratiquer l'administration dans un environnement hétérogène.",f:['Windows Server','Windows Client','Debian 12']},
 monitor:{k:'COUCHE 06 / EXPLOITATION',t:'Supervision & alertes',p:"Zabbix et Grafana permettent de suivre l'état des hôtes et services, d'analyser les alertes et de travailler le maintien en condition opérationnelle.",f:['Hôtes','Zabbix','Grafana']},
 continuity:{k:'COUCHE 07 / CONTINUITÉ',t:'Sauvegarde & reprise',p:"Les notions de sauvegarde Synology, Active Backup, Hyper Backup, PRA et stratégie 3-2-1 complètent le travail d'administration et de continuité.",f:['Systèmes','Sauvegarde','PRA / 3-2-1']}
};
function renderProject(k){const d=projectData[k],p=document.querySelector('#projectDetail');if(!p)return;p.innerHTML=`<small>${d.k}</small><h3>${d.t}</h3><p>${d.p}</p><div class="project-flow">${d.f.map((v,i)=>`${i?'<i>→</i>':''}<span>${v}</span>`).join('')}</div>`}
renderProject('edge');
document.querySelectorAll('.project-layers button').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.project-layers button').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderProject(b.dataset.project)}));

// Contact panel: compact CTA -> full message form, without changing page.
const contactPanel=document.getElementById('contactPanel');
const openContactForm=document.getElementById('openContactForm');
const closeContactForm=document.getElementById('closeContactForm');
const contactFormView=document.getElementById('contactFormView');
if(openContactForm&&contactPanel){
  openContactForm.addEventListener('click',()=>{
    contactPanel.classList.add('form-open');
    contactFormView?.setAttribute('aria-hidden','false');
    setTimeout(()=>document.getElementById('contactName')?.focus(),180);
  });
}
if(closeContactForm&&contactPanel){
  closeContactForm.addEventListener('click',()=>{
    contactPanel.classList.remove('form-open');
    contactFormView?.setAttribute('aria-hidden','true');
    openContactForm?.focus();
  });
}
const contactForm=document.getElementById('portfolioContactForm');
if(contactForm){
  contactForm.addEventListener('submit',e=>{
    e.preventDefault();
    const name=document.getElementById('contactName').value.trim();
    const email=document.getElementById('contactEmail').value.trim();
    const subject=document.getElementById('contactSubject').value.trim();
    const message=document.getElementById('contactMessage').value.trim();
    const body=`Bonjour Alexandre,%0D%0A%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0A${encodeURIComponent(name)}%0D%0A${encodeURIComponent(email)}`;
    window.location.href=`mailto:kiefer.alexandre1@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  });
}

// ===== Aegis live infrastructure explorer =====
const infraNodes={
 internet:{eyebrow:'EXTERNAL / WAN',title:'Internet',status:'UPLINK',desc:"Point d'entrée symbolique du laboratoire. Les flux externes passent par la passerelle avant d'atteindre les réseaux internes.",role:'Accès externe',os:'—',services:'WAN',security:'Passage par le firewall',tags:['WAN','Uplink']},
 opnsense:{eyebrow:'EDGE / SECURITY',title:'OPNsense',status:'ONLINE',desc:"Passerelle et pare-feu du lab. Elle permet de travailler le routage, les règles de filtrage, les communications entre zones et les accès VPN.",role:'Gateway / Firewall',os:'OPNsense',services:'Routage · Firewall · VPN',security:'Filtrage · segmentation',tags:['OPNsense','Firewall','VPN','Routing']},
 dc01:{eyebrow:'IDENTITY / SERVER',title:'DC01',status:'ONLINE',desc:"Serveur Windows dédié aux services d'identité et de réseau. Il centralise le domaine et l'administration des comptes et stratégies.",role:'Contrôleur de domaine',os:'Windows Server 2022',services:'AD DS · DNS · DHCP',security:'GPO · groupes · droits',tags:['AD DS','GPO','DNS','DHCP']},
 client:{eyebrow:'ENDPOINT / DOMAIN',title:'CLIENT01',status:'ONLINE',desc:"Poste Windows intégré au domaine pour valider les stratégies, les comptes, la résolution DNS et le comportement des postes clients.",role:'Poste client domaine',os:'Windows',services:'Session domaine',security:'GPO · droits utilisateur',tags:['Windows','Domain Join','GPO']},
 debian:{eyebrow:'LINUX / SERVER',title:'DEBIAN01',status:'ONLINE',desc:"Machine Linux du laboratoire utilisée pour pratiquer l'administration Debian, les services et les interactions avec le reste de l'infrastructure.",role:'Serveur Linux',os:'Debian 12',services:'Services Linux',security:'Administration · Bash',tags:['Debian 12','Linux','Bash']},
 zabbix:{eyebrow:'OBSERVABILITY / MCO',title:'Monitoring',status:'ACTIVE',desc:"Couche de supervision pour suivre les hôtes et services, centraliser les informations utiles et travailler les alertes d'exploitation.",role:'Supervision',os:'Linux',services:'Zabbix · Grafana',security:'Alertes · visibilité',tags:['Zabbix','Grafana','Monitoring','MCO']}
};
function showInfraNode(k){
  const d=infraNodes[k], el=document.getElementById('nodeInspector'); if(!d||!el)return;
  document.querySelectorAll('.node').forEach(n=>n.classList.toggle('active',n.dataset.node===k));
  el.innerHTML=`<small>${d.eyebrow}</small><h3>${d.title}</h3><div class="inspector-status">● ${d.status}</div><p>${d.desc}</p><div class="inspector-table"><div><small>RÔLE</small><b>${d.role}</b></div><div><small>SYSTÈME</small><b>${d.os}</b></div><div><small>SERVICES</small><b>${d.services}</b></div><div><small>SÉCURITÉ</small><b>${d.security}</b></div></div><div class="inspector-tags">${d.tags.map(t=>`<span>${t}</span>`).join('')}</div>`;
}
showInfraNode('opnsense');
document.querySelectorAll('.node').forEach(n=>n.addEventListener('click',()=>showInfraNode(n.dataset.node)));

// ===== Practical case drawer =====
const caseData={
 ad:{e:'CAS 01 · IDENTITÉ',t:'Déployer et administrer Active Directory',p:"Le but est de centraliser l'identité et l'administration d'un environnement Windows plutôt que de gérer chaque poste indépendamment.",s:[['01 · CONSTRUIRE','Installer Windows Server et AD DS, structurer le domaine.'],['02 · ADMINISTRER','Créer utilisateurs, groupes, droits et stratégies GPO.'],['03 · VALIDER','Joindre les clients au domaine et vérifier DNS, DHCP et application des stratégies.']]},
 network:{e:'CAS 02 · RÉSEAU',t:'Segmenter et filtrer les communications',p:"La segmentation vise à limiter les communications inutiles et à mieux contrôler les flux entre les différentes parties de l'infrastructure.",s:[['01 · SÉPARER','Définir les zones et VLAN selon les rôles.'],['02 · CONTRÔLER','Appliquer routage, ACL et règles de pare-feu.'],['03 · TESTER','Vérifier les flux autorisés et bloqués entre les zones.']]},
 monitor:{e:'CAS 03 · MCO',t:'Superviser une infrastructure',p:"La supervision apporte de la visibilité sur l'état des systèmes et services pour détecter plus rapidement les anomalies.",s:[['01 · COLLECTER','Ajouter les hôtes et les métriques utiles.'],['02 · VISUALISER','Construire une lecture claire avec Zabbix / Grafana.'],['03 · ALERTER','Définir des alertes pertinentes pour l'exploitation.']]},
 backup:{e:'CAS 04 · CONTINUITÉ',t:'Sauvegarder et préparer la reprise',p:"Une sauvegarde n'est utile que si elle est pensée, contrôlée et restaurable. Le travail porte donc aussi sur la reprise.",s:[['01 · PROTÉGER','Définir les données et systèmes à sauvegarder.'],['02 · DUPLIQUER','Appliquer une logique 3-2-1 avec les outils Synology.'],['03 · REPRENDRE','Documenter restauration, PRA et objectifs RTO/RPO.']]}
};
document.querySelectorAll('[data-case]').forEach(b=>b.addEventListener('click',()=>{
  const d=caseData[b.dataset.case],dr=document.getElementById('caseDrawer'); if(!d||!dr)return;
  document.getElementById('caseEyebrow').textContent=d.e;
  document.getElementById('caseTitle').textContent=d.t;
  document.getElementById('caseText').textContent=d.p;
  document.getElementById('caseSteps').innerHTML=d.s.map(x=>`<div><b>${x[0]}</b><span>${x[1]}</span></div>`).join('');
  dr.classList.add('open'); dr.setAttribute('aria-hidden','false'); dr.scrollIntoView({behavior:'smooth',block:'nearest'});
}));
document.getElementById('closeCase')?.addEventListener('click',()=>{const d=document.getElementById('caseDrawer');d.classList.remove('open');d.setAttribute('aria-hidden','true')});

// Project roadmap filters
document.querySelectorAll('.project-filters button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.project-filters button').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f=btn.dataset.filter;
    document.querySelectorAll('.roadmap-project').forEach(card=>{
      card.classList.toggle('hidden',f!=='all' && card.dataset.category!==f);
    });
  });
});

// ===== V4: future project cards =====
const futureProjects={
 linux:{
   icon:'LX',type:'PROJET 02 · LINUX / ADMINISTRATION',title:'Borealis Linux Lab',status:'PROCHAIN PROJET · PRÉVU',
   intro:"Un lab local consacré à Linux. L'objectif est d'aller plus loin que la VM Debian présente dans Aegis et de pratiquer l'administration quotidienne d'un serveur Linux.",
   tasks:["Installer et configurer un serveur Debian ou Ubuntu","Administrer utilisateurs, groupes, permissions et sudo","Sécuriser SSH et configurer le pare-feu","Lire et exploiter les logs / services systemd","Automatiser quelques tâches avec Bash puis Ansible","Déployer un petit service avec Docker"],
   learn:["Administration Linux en ligne de commande","Durcissement de base d'un serveur","Automatisation simple et reproductible","Gestion de services et diagnostic"],
   cost:'● GRATUIT · VMs LOCALES',level:'NIVEAU VISÉ · JUNIOR → INTERMÉDIAIRE'
 },
 cloud:{
   icon:'CL',type:'PROJET 03 · CLOUD / IDENTITÉ',title:'Nimbus Cloud Lab',status:'PRÉVU · APRÈS BOREALIS',
   intro:"Une première approche cloud volontairement raisonnable : comprendre les concepts et construire une petite architecture sans prétendre déployer une infrastructure d'entreprise complète.",
   tasks:["Suivre les modules Microsoft Learn adaptés au projet","Créer et organiser les identités / groupes de test","Travailler les rôles et droits RBAC","Comprendre VNet, sous-réseaux et règles NSG","Déployer uniquement de petites ressources lorsque le niveau gratuit le permet","Documenter l'architecture et les choix de sécurité"],
   learn:["Fondamentaux Azure et cloud","Identité et contrôle d'accès","Réseau virtuel cloud","Journalisation et bonnes pratiques de sécurité"],
   cost:'● FREE TIER / MICROSOFT LEARN',level:'NIVEAU VISÉ · DÉCOUVERTE / JUNIOR'
 },
 blue:{
   icon:'BT',type:'PROJET 04 · BLUE TEAM / DÉTECTION',title:'Argus Detection Lab',status:'PRÉVU · LAB LOCAL',
   intro:"Un petit laboratoire défensif pour comprendre ce qui se passe après l'administration et le durcissement : collecter les événements, les lire et déclencher des alertes utiles.",
   tasks:["Déployer Wazuh dans le lab","Collecter les événements d'une machine Windows et Linux","Ajouter Sysmon sur le poste Windows","Étudier quelques événements et scénarios simples","Tester Suricata pour la visibilité réseau si les ressources du PC le permettent","Créer et documenter quelques règles / alertes"],
   learn:["Centralisation et lecture des logs","Bases d'un SIEM","Télémétrie Windows avec Sysmon","Détection et investigation de premier niveau"],
   cost:'● GRATUIT · OPEN SOURCE / LOCAL',level:'NIVEAU VISÉ · JUNIOR BLUE TEAM'
 }
};
function openFutureProject(key){
  const d=futureProjects[key],box=document.getElementById('futureProjectDetail'); if(!d||!box)return;
  document.querySelectorAll('.future-project-card').forEach(c=>{const on=c.dataset.future===key;c.classList.toggle('selected',on);c.setAttribute('aria-expanded',String(on));});
  document.getElementById('futureDetailIcon').textContent=d.icon;
  document.getElementById('futureDetailType').textContent=d.type;
  document.getElementById('futureDetailTitle').textContent=d.title;
  document.getElementById('futureDetailStatus').textContent=d.status;
  document.getElementById('futureDetailIntro').textContent=d.intro;
  document.getElementById('futureDetailTasks').innerHTML=d.tasks.map(x=>`<p>${x}</p>`).join('');
  document.getElementById('futureDetailLearn').innerHTML=d.learn.map(x=>`<p>${x}</p>`).join('');
  document.getElementById('futureDetailCost').textContent=d.cost;
  document.getElementById('futureDetailLevel').textContent=d.level;
  box.classList.add('open'); box.setAttribute('aria-hidden','false');
  box.scrollIntoView({behavior:'smooth',block:'nearest'});
}
document.querySelectorAll('.future-project-card').forEach(c=>c.addEventListener('click',()=>openFutureProject(c.dataset.future)));
document.getElementById('futureDetailClose')?.addEventListener('click',()=>{
 const box=document.getElementById('futureProjectDetail'); box.classList.remove('open');box.setAttribute('aria-hidden','true');
 document.querySelectorAll('.future-project-card').forEach(c=>{c.classList.remove('selected');c.setAttribute('aria-expanded','false')});
});
// Extend roadmap filters to future project cards.
document.querySelectorAll('.project-filters button').forEach(btn=>{
 btn.addEventListener('click',()=>{
   const f=btn.dataset.filter;
   document.querySelectorAll('.future-project-card').forEach(c=>c.style.display=(f==='all'||c.dataset.category===f)?'block':'none');
   const current=document.querySelector('.roadmap-project.current');
   if(current) current.style.display=(f==='all'||f==='infra')?'block':'none';
 });
});

// ===== Secure CV Viewer =====
const cvModal=document.getElementById('cvModal');
const cvImg=document.getElementById('cvModalImage');
const cvZoomLabel=document.getElementById('cvZoomLabel');
let cvZoom=100;
function setCvZoom(v){
  cvZoom=Math.max(60,Math.min(180,v));
  if(cvImg) cvImg.style.width=(720*cvZoom/100)+'px';
  if(cvZoomLabel) cvZoomLabel.textContent=cvZoom+'%';
}
function openSecureCv(){
  if(!cvModal)return;
  cvModal.classList.add('open');cvModal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';setCvZoom(100);
}
function closeSecureCv(){
  if(!cvModal)return;
  cvModal.classList.remove('open');cvModal.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}
document.getElementById('openCvViewer')?.addEventListener('click',openSecureCv);
document.getElementById('openCvViewer2')?.addEventListener('click',openSecureCv);
document.getElementById('closeCvViewer')?.addEventListener('click',closeSecureCv);
document.getElementById('cvZoomIn')?.addEventListener('click',()=>setCvZoom(cvZoom+15));
document.getElementById('cvZoomOut')?.addEventListener('click',()=>setCvZoom(cvZoom-15));
cvModal?.addEventListener('click',e=>{if(e.target===cvModal)closeSecureCv()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&cvModal?.classList.contains('open'))closeSecureCv()});
