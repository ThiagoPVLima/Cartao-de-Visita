import { NOTIFS } from './data.js';

let notifTimer;
let nIdx = 0;

export function showNotif(title, msg) {
  const box = document.getElementById('notification');
  document.getElementById('notif-title').textContent = title;
  document.getElementById('notif-body').innerHTML = msg;
  box.classList.remove('show');
  void box.offsetWidth; // força reflow para reiniciar animação
  box.classList.add('show');
  clearTimeout(notifTimer);
  notifTimer = setTimeout(hideNotif, 4500);
}

export function hideNotif() {
  document.getElementById('notification').classList.remove('show');
}

export function scheduleNotifs() {
  setTimeout(function loop() {
    showNotif(...NOTIFS[nIdx % NOTIFS.length]);
    nIdx++;
    setTimeout(loop, 14000 + Math.random() * 6000);
  }, 7000);
}
