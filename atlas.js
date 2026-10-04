
(() => {
  const open = document.getElementById('openAtlasDetail');
  const detail = document.getElementById('atlasDetail');
  const close = document.getElementById('closeAtlasDetail');
  if (!open || !detail) return;
  const show = () => {
    detail.classList.add('open');
    detail.setAttribute('aria-hidden','false');
    open.setAttribute('aria-expanded','true');
    requestAnimationFrame(() => detail.scrollIntoView({behavior:'smooth',block:'start'}));
  };
  const hide = () => {
    detail.classList.remove('open');
    detail.setAttribute('aria-hidden','true');
    open.setAttribute('aria-expanded','false');
    open.scrollIntoView({behavior:'smooth',block:'center'});
  };
  open.addEventListener('click', show);
  close?.addEventListener('click', hide);
})();
