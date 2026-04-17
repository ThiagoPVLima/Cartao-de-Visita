import { playError } from './audio.js';
import { showNotif } from './notifications.js';

export const maxed = new Set();
let activeDrag = null;

// Handler global de drag — um único listener evita acúmulo
document.addEventListener('mousemove', e => {
  if (!activeDrag) return;
  activeDrag.win.style.left = (e.clientX - activeDrag.ox) + 'px';
  activeDrag.win.style.top  = (e.clientY - activeDrag.oy) + 'px';
});
document.addEventListener('mouseup', () => { activeDrag = null; });

export function makeDraggable(winId, barId) {
  const win = document.getElementById(winId);
  const bar = document.getElementById(barId);
  if (!win || !bar) return;

  bar.addEventListener('mousedown', e => {
    if (e.target.tagName === 'BUTTON' || maxed.has(winId)) return;
    const r = win.getBoundingClientRect();
    win.style.position  = 'absolute';
    win.style.transform = 'none';
    win.style.left = r.left + 'px';
    win.style.top  = r.top  + 'px';
    activeDrag = { win, ox: e.clientX - r.left, oy: e.clientY - r.top };
    e.preventDefault();
  });
}

export function minimizeWindow(id) {
  document.getElementById(id).classList.add('minimized');
  document.getElementById('task-main').style.fontStyle = 'italic';
}

export function maximizeWindow(id) {
  const w = document.getElementById(id);
  if (maxed.has(id)) { w.classList.remove('maximized'); maxed.delete(id); }
  else               { w.classList.add('maximized');    maxed.add(id); }
}

export function closeWindow(id) {
  playError();
  document.getElementById(id).style.display = 'none';
  document.getElementById('task-main').style.opacity = '0.4';
  setTimeout(() => showNotif('⚠️ Atenção', 'Você fechou o perfil!<br>Pressione F5 para recarregar.'), 300);
}

export function restoreWindow(id) {
  const w = document.getElementById(id);
  w.style.display = '';
  w.classList.remove('minimized');
  document.getElementById('task-main').style.fontStyle = 'normal';
  document.getElementById('task-main').style.opacity = '1';
}

export function openPopup(id)  { document.getElementById(id).classList.add('open'); }
export function closePopup(id) { document.getElementById(id).classList.remove('open'); }
