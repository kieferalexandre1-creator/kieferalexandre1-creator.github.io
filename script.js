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
