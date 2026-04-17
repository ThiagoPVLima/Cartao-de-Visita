import { PROJECTS } from './data.js';
import { playClick } from './audio.js';
import { showNotif } from './notifications.js';
import { maxed, makeDraggable } from './windows.js';

let browserZ = 600;
const openBrowsers = {};

// ── Calcula posição centralizada com offset em cascata ──
function calcPosition(off) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const w  = Math.min(820, vw - 40);
  const h  = Math.min(520, vh - 80);
  const left = Math.max(8, Math.round((vw - w) / 2) + off * 24);
  const top  = Math.max(8, Math.round((vh - h) / 2) + off * 24 - 16);
  return { w, h, left, top };
}

export function openBrowser(key) {
  document.getElementById('start-menu').classList.remove('open');

  const proj = PROJECTS[key];
  if (!proj) return;

  // Já aberta → restaura e traz para frente
  const existing = document.getElementById('browser-' + key);
  if (existing) {
    existing.classList.remove('minimized');
    existing.style.zIndex = ++browserZ;
    const tb = document.getElementById('task-browser-' + key);
    if (tb) tb.style.fontStyle = 'normal';
    return;
  }

  const winId = 'browser-' + key;
  const barId = 'browser-bar-' + key;
  const off   = Object.keys(openBrowsers).length;
  const { w, h, left, top } = calcPosition(off);

  const win = document.createElement('div');
  win.className = 'window win-window browser-window';
  win.id = winId;

  win.style.cssText = [
    'position:absolute',
    `top:${top}px`,
    `left:${left}px`,
    `width:${w}px`,
    `height:${h}px`,
    `z-index:${++browserZ}`,  // começa acima dos ícones (z-index:10)
    'display:flex',
    'flex-direction:column',
  ].join(';');

  const isHttp = proj.url && proj.url.startsWith('http://');

  const contentHtml = !proj.url
    ? `<div class="browser-soon">
         <div class="browser-soon-icon">${proj.icon}</div>
         <div class="browser-soon-title">${proj.name}</div>
         <div class="browser-soon-msg">Em construção<br>Em breve disponível!</div>
       </div>`
    : isHttp
      ? `<div class="browser-soon">
           <div class="browser-soon-icon">${proj.icon}</div>
           <div class="browser-soon-title">${proj.name}</div>
           <div class="browser-soon-msg">Este site usa HTTP e não pode ser exibido<br>aqui por restrições de segurança do browser.<br><br>
             <button onclick="window.open('${proj.url}','_blank')">Abrir em nova aba ↗</button>
           </div>
         </div>`
      : `<iframe id="iframe-${key}" src="${proj.url}" frameborder="0" allowfullscreen></iframe>
         <div class="browser-blocked" id="blocked-${key}" style="display:none">
           <div class="browser-blocked-icon">🚫</div>
           <div class="browser-blocked-title">Conteúdo bloqueado</div>
           <div class="browser-blocked-msg">Este site não permite ser exibido em frames.<br>Use o botão ⧉ na barra para abrir em nova aba.</div>
           <button onclick="window.open('${proj.url}','_blank')">Abrir em nova aba ↗</button>
         </div>`;

  win.innerHTML = `
    <div class="title-bar" id="${barId}">
      <div class="title-bar-text">${proj.icon} ${proj.name}</div>
      <div class="title-bar-controls">
        <button aria-label="Minimize" onclick="minimizeBrowser('${key}')"></button>
        <button aria-label="Maximize" onclick="maximizeBrowser('${key}')"></button>
        <button aria-label="Close"    onclick="closeBrowser('${key}')"></button>
      </div>
    </div>
    <div class="browser-toolbar">
      <button class="browser-nav-btn" onclick="browserNav('${key}','back')"   title="Voltar">◀</button>
      <button class="browser-nav-btn" onclick="browserNav('${key}','fwd')"    title="Avançar">▶</button>
      <button class="browser-nav-btn" onclick="browserNav('${key}','reload')" title="Recarregar">↻</button>
      <div class="browser-address-bar">
        <span class="browser-address-icon">🌐</span>
        <span class="browser-url">${proj.url || 'em breve...'}</span>
      </div>
      ${proj.url ? `<button class="browser-nav-btn" title="Abrir em nova aba" onclick="window.open('${proj.url}','_blank')">⧉</button>` : ''}
    </div>
    <div class="browser-content">${contentHtml}</div>
  `;

  document.getElementById('desktop').appendChild(win);
  openBrowsers[key] = true;

  makeDraggable(winId, barId);
  addTaskbarBtn(key, proj);
  playClick();

  // Traz para frente ao clicar (mouse e touch)
  win.addEventListener('mousedown', () => { win.style.zIndex = ++browserZ; });
  win.addEventListener('touchstart', () => { win.style.zIndex = ++browserZ; }, { passive: true });
}

export function closeBrowser(key) {
  document.getElementById('browser-' + key)?.remove();
  delete openBrowsers[key];
  document.getElementById('task-browser-' + key)?.remove();
}

export function minimizeBrowser(key) {
  document.getElementById('browser-' + key)?.classList.add('minimized');
  const btn = document.getElementById('task-browser-' + key);
  if (btn) btn.style.fontStyle = 'italic';
}

export function maximizeBrowser(key) {
  const id  = 'browser-' + key;
  const win = document.getElementById(id);
  if (!win) return;
  if (maxed.has(id)) { win.classList.remove('maximized'); maxed.delete(id); }
  else               { win.classList.add('maximized');    maxed.add(id);    }
}

export function browserNav(key, action) {
  const iframe = document.getElementById('iframe-' + key);
  if (!iframe) return;
  if (action === 'reload') { iframe.src = iframe.src; return; }
  try {
    if (action === 'back') iframe.contentWindow.history.back();
    if (action === 'fwd')  iframe.contentWindow.history.forward();
  } catch(e) {
    showNotif('🌐 Navegador', 'Histórico indisponível para sites externos.');
  }
}

function addTaskbarBtn(key, proj) {
  const btn = document.createElement('button');
  btn.className = 'taskbar-task';
  btn.id        = 'task-browser-' + key;
  btn.innerHTML = `${proj.icon} ${proj.name}`;
  btn.onclick = () => {
    const win = document.getElementById('browser-' + key);
    if (!win) return;
    if (win.classList.contains('minimized')) {
      win.classList.remove('minimized');
      btn.style.fontStyle = 'normal';
      win.style.zIndex = ++browserZ;
    } else {
      win.classList.add('minimized');
      btn.style.fontStyle = 'italic';
    }
  };
  document.getElementById('taskbar').insertBefore(btn, document.getElementById('taskbar-clock'));
}
