// ══ WALLPAPERS ══
// Wallpapers originais do Windows XP
// color: cor de fundo enquanto a imagem carrega
// image: gradiente CSS de fallback
const BASE = 'https://tjkelly.com/wp-content/uploads/';
const WALLPAPERS = [
  {
    name: 'Bliss',
    url:   BASE + 'windows-xp-desktop-background-wallpaper-bliss-800x600.jpg',
    color: '#4a8a3a',
    image: 'linear-gradient(180deg,#87ceeb 40%,#5aa54e 60%,#3d8b37 100%)'
  },
  {
    name: 'Azul',
    url:   BASE + 'windows-xp-desktop-background-wallpaper-azul-800x600.jpg',
    color: '#003080',
    image: 'radial-gradient(ellipse at 40% 60%,#0050c8 0%,#001860 100%)'
  },
  {
    name: 'Autumn',
    url:   BASE + 'windows-xp-desktop-background-wallpaper-autumn-800x600.jpg',
    color: '#8b4513',
    image: 'linear-gradient(135deg,#c8602a,#8b4513)'
  },
  {
    name: 'Vortec Space',
    url:   BASE + 'windows-xp-desktop-background-wallpaper-vortec-space-800x600.jpg',
    color: '#0a0020',
    image: 'radial-gradient(ellipse at 50% 50%,#3a0080 0%,#0a0020 100%)'
  },
  {
    name: 'Red Moon Desert',
    url:   BASE + 'windows-xp-desktop-background-wallpaper-red-moon-desert-800x600.jpg',
    color: '#3a1a00',
    image: 'linear-gradient(180deg,#1a0a00 0%,#8b2a00 50%,#3a1a00 100%)'
  },
];

function setWallpaper(idx, silent = false) {
  currentWallpaperIdx = idx;
  const w = WALLPAPERS[idx];

  document.body.style.backgroundColor  = w.color;
  document.body.style.backgroundRepeat = 'no-repeat';

  if (w.url) {
    const img = new Image();
    img.onload = () => {
      document.body.style.backgroundImage    = "url('" + w.url + "')";
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
  if (!silent) showNotif('🖼️ Papel de Parede', w.name + ' aplicado!');
}

// ══ ÍCONES POR TEMA ══
// Win98: cores primárias clássicas dos anos 90
// XP: cores vibrantes da era Luna
const ICON_RECTS = {
  '98': [
    { x:'0',   y:'0',   fill:'#c0392b' },
    { x:'6.5', y:'0',   fill:'#27ae60' },
    { x:'0',   y:'6.5', fill:'#2980b9' },
    { x:'6.5', y:'6.5', fill:'#f39c12' },
  ],
  'xp': [
    { x:'0',   y:'0',   fill:'#f35325' },
    { x:'6.5', y:'0',   fill:'#81bc06' },
    { x:'0',   y:'6.5', fill:'#05a6f0' },
    { x:'6.5', y:'6.5', fill:'#ffba08' },
  ],
};

function updateIcons(theme) {
  const rects = ICON_RECTS[theme];
  document.querySelectorAll('svg.win-logo').forEach(svg => {
    svg.innerHTML = rects.map(r =>
      `<rect x="${r.x}" y="${r.y}" width="5.5" height="5.5" fill="${r.fill}"/>`
    ).join('');
  });
}

// ══ TEMA ══
let currentTheme = '98';
let currentWallpaperIdx = 0;  // rastreia o wallpaper ativo

function setTheme(theme) {
  currentTheme = theme;
  const link = document.getElementById('theme-css');
  link.href = theme === 'xp' ? 'https://unpkg.com/xp.css' : 'https://unpkg.com/98.css';
  document.body.classList.toggle('theme-xp', theme === 'xp');

  // Re-aplica o wallpaper atual em vez de resetar para cor sólida
  setWallpaper(currentWallpaperIdx, true);

  document.querySelectorAll('.ctx-theme').forEach((el, i) => {
    el.classList.toggle('active', (i === 0 && theme === '98') || (i === 1 && theme === 'xp'));
  });

  updateIcons(theme);
  closeCtxMenu();
  showNotif('🖥️ Tema', theme === 'xp' ? 'Windows XP ativado!' : 'Windows 98 ativado!');
}

// ══ CONTEXT MENU ══
const ctxMenu = document.getElementById('ctx-menu');

document.getElementById('desktop').addEventListener('contextmenu', e => {
  if (e.target.closest('.win-window')) return; // usa o menu padrão dentro de janelas
  e.preventDefault();
  // Posiciona no cursor e ajusta se sair da tela
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

function closeCtxMenu() {
  ctxMenu.classList.remove('open');
}

// ══ AUDIO ══
const AC = window.AudioContext || window.webkitAudioContext;
let ac;

function playClick() {
  try {
    if (!ac) ac = new AC();
    const o = ac.createOscillator(), g = ac.createGain();
    o.connect(g); g.connect(ac.destination);
    o.type = 'square';
    o.frequency.setValueAtTime(880, ac.currentTime);
    o.frequency.exponentialRampToValueAtTime(440, ac.currentTime + 0.04);
    g.gain.setValueAtTime(0.07, ac.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.08);
    o.start(); o.stop(ac.currentTime + 0.08);
  } catch(e) {}
}

function playError() {
  try {
    if (!ac) ac = new AC();
    [660,440,330].forEach((f,i) => {
      const o = ac.createOscillator(), g = ac.createGain();
      o.connect(g); g.connect(ac.destination);
      o.type = 'sawtooth'; o.frequency.value = f;
      const t = ac.currentTime + i * 0.13;
      g.gain.setValueAtTime(0.07, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
      o.start(t); o.stop(t + 0.1);
    });
  } catch(e) {}
}

function playSuccess() {
  try {
    if (!ac) ac = new AC();
    [440, 554, 659].forEach((f,i) => {
      const o = ac.createOscillator(), g = ac.createGain();
      o.connect(g); g.connect(ac.destination);
      o.type = 'sine'; o.frequency.value = f;
      const t = ac.currentTime + i * 0.1;
      g.gain.setValueAtTime(0.07, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
      o.start(t); o.stop(t + 0.15);
    });
  } catch(e) {}
}

document.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') playClick();
});

// ══ BOOT ══
const bootMsgs = [
  'Carregando kernel...', 'Inicializando CSS engine...',
  'Montando portfolio.sys...', 'Carregando skills.dll...',
  'Indexando frameworks...', 'Conectando ao GitHub...',
  'Preparando interface...', 'Bem-vindo!'
];
let prog = 0;

function bootStep() {
  const idx = Math.min(Math.floor(prog / (100 / bootMsgs.length)), bootMsgs.length - 1);
  document.getElementById('boot-status').textContent = bootMsgs[idx];
  document.getElementById('boot-bar').style.width = Math.min(prog, 100) + '%';
  prog += Math.random() * 12 + 4;
  if (prog < 100) {
    setTimeout(bootStep, 100 + Math.random() * 150);
  } else {
    document.getElementById('boot-bar').style.width = '100%';
    document.getElementById('boot-status').textContent = 'Bem-vindo!';
    setTimeout(() => {
      const bs = document.getElementById('boot-screen');
      bs.style.transition = 'opacity 0.4s';
      bs.style.opacity = '0';
      setTimeout(() => {
        bs.style.display = 'none';
        setWallpaper(0, true);  // aplica o primeiro wallpaper silenciosamente
        atualizarIdade();
        atualizarRelogio();
        setTimeout(() => showNotif('💾 ThiagoOS', 'Sistema carregado! Clique direito no desktop para trocar o wallpaper.'), 500);
        scheduleNotifs();
      }, 400);
    }, 500);
  }
}
setTimeout(bootStep, 300);

// ══ ABAS PRINCIPAIS ══
function changeTab(name, el) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('menu[role="tablist"] li').forEach(li => li.removeAttribute('aria-selected'));
  document.getElementById('tab-' + name).classList.add('active');
  el.setAttribute('aria-selected', 'true');
}

// ══ SUB-ABAS SKILLS ══
function changeSkillCat(name, el) {
  document.querySelectorAll('.skill-cat').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.skill-nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('cat-' + name).classList.add('active');
  el.classList.add('active');
}

// ══ JANELAS ══
const maxed = new Set();

function minimizeWindow(id) {
  document.getElementById(id).classList.add('minimized');
  document.getElementById('task-main').style.fontStyle = 'italic';
}

function maximizeWindow(id) {
  const w = document.getElementById(id);
  if (maxed.has(id)) { w.classList.remove('maximized'); maxed.delete(id); }
  else               { w.classList.add('maximized');    maxed.add(id); }
}

function closeWindow(id) {
  playError();
  document.getElementById(id).style.display = 'none';
  document.getElementById('task-main').style.opacity = '0.4';
  setTimeout(() => showNotif('⚠️ Atenção', 'Você fechou o perfil!<br>Pressione F5 para recarregar.'), 300);
}

function restoreWindow(id) {
  const w = document.getElementById(id);
  w.style.display = '';
  w.classList.remove('minimized');
  document.getElementById('task-main').style.fontStyle = 'normal';
  document.getElementById('task-main').style.opacity = '1';
}

// ══ DRAG (corrigido) ══
// Um único handler global evita acúmulo de listeners e o bug de salto.
// No mousedown: salva o offset entre o cursor e o canto da janela.
// No mousemove: posição = cursor − offset.
let activeDrag = null;

document.addEventListener('mousemove', e => {
  if (!activeDrag) return;
  activeDrag.win.style.left = (e.clientX - activeDrag.ox) + 'px';
  activeDrag.win.style.top  = (e.clientY - activeDrag.oy) + 'px';
});

document.addEventListener('mouseup', () => { activeDrag = null; });

function makeDraggable(winId, barId) {
  const win = document.getElementById(winId);
  const bar = document.getElementById(barId);
  if (!win || !bar) return;

  bar.addEventListener('mousedown', e => {
    if (e.target.tagName === 'BUTTON' || maxed.has(winId)) return;

    // Lê posição visual atual (funciona tanto em position:relative quanto absolute)
    const r = win.getBoundingClientRect();

    // Troca para absolute para que left/top funcionem em coordenadas do viewport
    win.style.position = 'absolute';
    win.style.transform = 'none';
    win.style.left = r.left + 'px';
    win.style.top  = r.top  + 'px';

    // Offset = distância do mouse ao canto superior-esquerdo da janela
    activeDrag = { win, ox: e.clientX - r.left, oy: e.clientY - r.top };
    e.preventDefault();
  });
}

makeDraggable('main-window',   'main-title-bar');
makeDraggable('task-manager',  'task-manager-bar');
makeDraggable('popup-github',  'popup-github-bar');
makeDraggable('popup-behance', 'popup-behance-bar');
makeDraggable('popup-linkedin','popup-linkedin-bar');
makeDraggable('popup-email',   'popup-email-bar');
makeDraggable('popup-sent',    'popup-sent-bar');

// ══ POPUPS ══
function openPopup(id)  { document.getElementById(id).classList.add('open'); }
function closePopup(id) { document.getElementById(id).classList.remove('open'); }

// ══ FORMULÁRIO ══
function submitForm() {
  const name  = document.getElementById('f-name').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const msg   = document.getElementById('f-msg').value.trim();

  if (!name || !email || !msg) {
    showNotif('⚠️ Atenção', 'Preencha todos os campos!');
    return;
  }

  showNotif('📤 Enviando...', 'Aguarde um momento.');

  fetch('https://formspree.io/f/mwvavyao', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ name, email, message: msg })
  })
  .then(res => {
    if (res.ok) {
      playSuccess();
      clearForm();
      document.getElementById('sent-msg-text').innerHTML =
        'Mensagem enviada com sucesso!<br><span style="font-size:10px;color:#666">Obrigado, ' + name + '! Responderei em breve.</span>';
      openPopup('popup-sent');
    } else {
      playError();
      showNotif('❌ Erro', 'Não foi possível enviar. Tente novamente.');
    }
  })
  .catch(() => {
    playError();
    showNotif('❌ Erro', 'Sem conexão. Verifique sua internet.');
  });
}

function clearForm() {
  document.getElementById('f-name').value  = '';
  document.getElementById('f-email').value = '';
  document.getElementById('f-msg').value   = '';
}

// ══ NOTIFICAÇÕES ══
let notifTimer;

function showNotif(title, msg) {
  const box = document.getElementById('notification');
  document.getElementById('notif-title').textContent = title;
  document.getElementById('notif-body').innerHTML = msg;
  box.classList.remove('show');
  void box.offsetWidth; // força reflow para reiniciar animação
  box.classList.add('show');
  clearTimeout(notifTimer);
  notifTimer = setTimeout(hideNotif, 4500);
}

function hideNotif() {
  document.getElementById('notification').classList.remove('show');
}

const notifs = [
  ['💡 Dica',          'Clique direito no desktop para trocar o wallpaper!'],
  ['📬 Disponível',    'Aberto para novos projetos e colaborações.'],
  ['☕ coffee_daemon', 'CPU em 100%. Café urgente necessário.'],
  ['⚡ Novidade',      'Aprendendo SvelteKit e TypeScript em 2025!'],
  ['👋 Olá!',          'Obrigado por visitar meu cartão de visitas.'],
];
let nIdx = 0;
function scheduleNotifs() {
  setTimeout(function loop() {
    showNotif(...notifs[nIdx % notifs.length]);
    nIdx++;
    setTimeout(loop, 14000 + Math.random() * 6000);
  }, 7000);
}

// ══ EASTER EGG: Ctrl+Alt+Del abre o gerenciador ══
const held = new Set();
document.addEventListener('keydown', e => {
  held.add(e.key);
  if (held.has('Control') && held.has('Alt') && (held.has('Delete') || held.has('Del'))) {
    document.getElementById('task-manager').classList.toggle('open');
  }
});
document.addEventListener('keyup', e => held.delete(e.key));

// ══ RELÓGIO + IDADE ══
function atualizarIdade() {
  const nasc = new Date('1995-08-08');
  const hoje = new Date();
  let idade = hoje.getFullYear() - nasc.getFullYear();
  if (hoje.getMonth() < nasc.getMonth() ||
     (hoje.getMonth() === nasc.getMonth() && hoje.getDate() < nasc.getDate())) idade--;
  document.getElementById('idade').textContent = idade;
}

function atualizarRelogio() {
  const n = new Date();
  const txt = String(n.getHours()).padStart(2,'0') + ':' + String(n.getMinutes()).padStart(2,'0');
  document.getElementById('status-time').textContent = txt;
  document.getElementById('taskbar-clock').textContent = txt;
}

setInterval(atualizarRelogio, 15000);
