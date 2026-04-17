import { BOOT_MSGS } from './data.js';
import { setWallpaper } from './theme.js';
import { atualizarIdade, atualizarRelogio } from './ui.js';
import { showNotif, scheduleNotifs } from './notifications.js';

let prog = 0;

export function startBoot() {
  setInterval(atualizarRelogio, 15000);
  setTimeout(bootStep, 300);
}

function bootStep() {
  const idx = Math.min(Math.floor(prog / (100 / BOOT_MSGS.length)), BOOT_MSGS.length - 1);
  document.getElementById('boot-status').textContent  = BOOT_MSGS[idx];
  document.getElementById('boot-bar').style.width     = Math.min(prog, 100) + '%';
  prog += Math.random() * 12 + 4;

  if (prog < 100) {
    setTimeout(bootStep, 100 + Math.random() * 150);
  } else {
    document.getElementById('boot-bar').style.width    = '100%';
    document.getElementById('boot-status').textContent = 'Bem-vindo!';
    setTimeout(() => {
      const bs = document.getElementById('boot-screen');
      bs.style.transition = 'opacity 0.4s';
      bs.style.opacity    = '0';
      setTimeout(() => {
        bs.style.display = 'none';
        setWallpaper(0, true);
        atualizarIdade();
        atualizarRelogio();
        setTimeout(() => showNotif('💾 ThiagoOS', 'Sistema carregado! Clique direito no desktop para trocar o wallpaper.'), 500);
        scheduleNotifs();
      }, 400);
    }, 500);
  }
}
