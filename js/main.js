import { playClick }                                          from './audio.js';
import { showNotif, hideNotif }                               from './notifications.js';
import { makeDraggable, minimizeWindow, maximizeWindow,
         closeWindow, restoreWindow, openPopup, closePopup }  from './windows.js';
import { setTheme, setWallpaper }                             from './theme.js';
import { changeTab, changeSkillCat, submitForm, clearForm }   from './ui.js';
import { toggleStartMenu }                                    from './startmenu.js';
import { openBrowser, closeBrowser, minimizeBrowser,
         maximizeBrowser, browserNav }                        from './browser.js';
import { startBoot }                                          from './boot.js';
import './icons.js'; // efeitos colaterais: inicializa ícones

// ── Expõe ao window funções chamadas via onclick no HTML ──
Object.assign(window, {
  setTheme, setWallpaper,
  changeTab, changeSkillCat,
  minimizeWindow, maximizeWindow, closeWindow, restoreWindow,
  openPopup, closePopup,
  toggleStartMenu,
  openBrowser, closeBrowser, minimizeBrowser, maximizeBrowser, browserNav,
  submitForm, clearForm,
  showNotif, hideNotif,
});

// ── Som em todos os botões ──
document.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') playClick();
});

// ── Easter egg: Ctrl+Alt+Del abre o Gerenciador de Tarefas ──
const held = new Set();
document.addEventListener('keydown', e => {
  held.add(e.key);
  if (held.has('Control') && held.has('Alt') && (held.has('Delete') || held.has('Del'))) {
    document.getElementById('task-manager').classList.toggle('open');
  }
});
document.addEventListener('keyup', e => held.delete(e.key));

// ── Inicializa janelas arrastáveis estáticas ──
makeDraggable('main-window',    'main-title-bar');
makeDraggable('task-manager',   'task-manager-bar');
makeDraggable('popup-github',   'popup-github-bar');
makeDraggable('popup-behance',  'popup-behance-bar');
makeDraggable('popup-linkedin', 'popup-linkedin-bar');
makeDraggable('popup-email',    'popup-email-bar');
makeDraggable('popup-sent',     'popup-sent-bar');

// ── Arranca o sistema ──
startBoot();
