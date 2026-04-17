import { WALLPAPERS, ICON_RECTS } from './data.js';
import { showNotif } from './notifications.js';

export let currentTheme = '98';
export let currentWallpaperIdx = 0;

const ctxMenu = document.getElementById('ctx-menu');

document.getElementById('desktop').addEventListener('contextmenu', e => {
  if (e.target.closest('.win-window')) return;
  e.preventDefault();
  ctxMenu.style.left = e.clientX + 'px';
  ctxMenu.style.top  = e.clientY + 'px';
  ctxMenu.classList.add('open');
  requestAnimationFrame(() => {
    const r = ctxMenu.getBoundingClientRect();
    if (r.right  > window.innerWidth)  ctxMenu.style.left = (e.clientX - r.width)  + 'px';
    if (r.bottom > window.innerHeight) ctxMenu.style.top  = (e.clientY - r.height) + 'px';
  });
});
document.addEventListener('click', closeCtxMenu);

export function closeCtxMenu() {
  ctxMenu.classList.remove('open');
}

export function setWallpaper(idx, silent = false) {
  currentWallpaperIdx = idx;
  const w = WALLPAPERS[idx];
  document.body.style.backgroundColor  = w.color;
  document.body.style.backgroundRepeat = 'no-repeat';

  if (w.url) {
    const img = new Image();
    img.onload = () => {
      document.body.style.backgroundImage    = `url('${w.url}')`;
      document.body.style.backgroundSize     = w.tile ? 'auto' : 'cover';
      document.body.style.backgroundRepeat   = w.tile ? 'repeat' : 'no-repeat';
      document.body.style.backgroundPosition = w.tile ? 'top left' : 'center';
    };
    img.onerror = () => {
      document.body.style.backgroundImage    = w.image;
      document.body.style.backgroundSize     = '';
      document.body.style.backgroundPosition = '';
    };
    img.src = w.url;
  } else {
    document.body.style.backgroundImage    = w.image;
    document.body.style.backgroundSize     = '';
    document.body.style.backgroundPosition = '';
  }

  document.querySelectorAll('.ctx-wallpaper').forEach((el, i) => {
    el.classList.toggle('active', i === idx);
  });
  closeCtxMenu();
  if (!silent) showNotif('🖼️ Papel de Parede', `${w.name} aplicado!`);
}

export function updateIcons(theme) {
  const rects = ICON_RECTS[theme];
  document.querySelectorAll('svg.win-logo').forEach(svg => {
    svg.innerHTML = rects.map(r =>
      `<rect x="${r.x}" y="${r.y}" width="5.5" height="5.5" fill="${r.fill}"/>`
    ).join('');
  });
}

export function setTheme(theme) {
  currentTheme = theme;
  document.getElementById('theme-css').href =
    theme === 'xp' ? 'https://unpkg.com/xp.css' : 'https://unpkg.com/98.css';
  document.body.classList.toggle('theme-xp', theme === 'xp');
  setWallpaper(currentWallpaperIdx, true);
  document.querySelectorAll('.ctx-theme').forEach((el, i) => {
    el.classList.toggle('active', (i === 0 && theme === '98') || (i === 1 && theme === 'xp'));
  });
  updateIcons(theme);
  closeCtxMenu();
  showNotif('🖥️ Tema', theme === 'xp' ? 'Windows XP ativado!' : 'Windows 98 ativado!');
}
