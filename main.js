// Année
document.querySelectorAll('.year').forEach(e => e.textContent = new Date().getFullYear());

// Thème clair / sombre (mémorisé)
const root = document.documentElement;
try { const t = localStorage.getItem('theme'); if (t) root.dataset.theme = t; } catch (e) {}
const themeBtn = document.getElementById('theme');
if (themeBtn) themeBtn.addEventListener('click', () => {
  const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = dark ? 'light' : 'dark';
  try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
});

// Menu mobile
const nav = document.getElementById('nav'), burger = document.getElementById('burger');
if (nav && burger) {
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    burger.textContent = open ? '✕' : '☰';
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open'); burger.textContent = '☰'; burger.setAttribute('aria-expanded', false);
  }));
  // Lien actif
  const links = [...nav.querySelectorAll('a')];
  const spy = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(l => l.classList.toggle('active', l.hash === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach(s => spy.observe(s));
}

// Apparition au défilement
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .1 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Formulaire de contact (Formspree)
const form = document.getElementById('form'), msg = document.getElementById('form-msg');
if (form) form.addEventListener('submit', async ev => {
  ev.preventDefault();
  if (form.action.includes('VOTRE_ID')) {
    window.location.href = 'mailto:kiefer.alexandre1@gmail.com?subject=' + encodeURIComponent('Opportunité IT - Alexandre Kiefer') + '&body=' + encodeURIComponent(form.message.value + '\n\n' + form.nom.value + ' ' + (form.entreprise.value || '') + '\n' + form.email.value);
    return;
  }
  msg.textContent = 'Envoi…';
  try {
    const r = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
    msg.textContent = r.ok ? 'Merci, message envoyé ✓' : 'Erreur, réessayez ou écrivez-moi par email.';
    if (r.ok) form.reset();
  } catch (e) { msg.textContent = 'Erreur réseau, écrivez-moi par email.'; }
});
