const BASE = 'https://tjkelly.com/wp-content/uploads/';

export const WALLPAPERS = [
  { name: 'Bliss',          url: BASE + 'windows-xp-desktop-background-wallpaper-bliss-800x600.jpg',           color: '#4a8a3a', image: 'linear-gradient(180deg,#87ceeb 40%,#5aa54e 60%,#3d8b37 100%)' },
  { name: 'Azul',           url: BASE + 'windows-xp-desktop-background-wallpaper-azul-800x600.jpg',            color: '#003080', image: 'radial-gradient(ellipse at 40% 60%,#0050c8 0%,#001860 100%)' },
  { name: 'Autumn',         url: BASE + 'windows-xp-desktop-background-wallpaper-autumn-800x600.jpg',          color: '#8b4513', image: 'linear-gradient(135deg,#c8602a,#8b4513)' },
  { name: 'Vortec Space',   url: BASE + 'windows-xp-desktop-background-wallpaper-vortec-space-800x600.jpg',    color: '#0a0020', image: 'radial-gradient(ellipse at 50% 50%,#3a0080 0%,#0a0020 100%)' },
  { name: 'Red Moon Desert', url: BASE + 'windows-xp-desktop-background-wallpaper-red-moon-desert-800x600.jpg', color: '#3a1a00', image: 'linear-gradient(180deg,#1a0a00 0%,#8b2a00 50%,#3a1a00 100%)' },
];

export const ICON_RECTS = {
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

export const PROJECTS = {
  brscience:  { name: 'BrScience',       url: 'http://86.48.23.217:8098/',           icon: '🔬', cat: 'Pessoal'  },
  cybis:      { name: 'Cybis Café',       url: 'https://cybis-cafe-page.vercel.app/', icon: '☕', cat: 'Pessoal'  },
  uzimais:    { name: 'Uzi Mais',         url: 'https://uzimais.com.br/',             icon: '🏢', cat: 'MelloAit' },
  pqnpassos:  { name: 'Pequenos Passos',  url: 'https://pqnpassos.com.br/',           icon: '👣', cat: 'MelloAit' },
  piishield:  { name: 'PiiShield',        url: 'https://piishield.com.br/',           icon: '🛡️', cat: 'MelloAit' },
};

export const BOOT_MSGS = [
  'Carregando kernel...', 'Inicializando CSS engine...',
  'Montando portfolio.sys...', 'Carregando skills.dll...',
  'Indexando frameworks...', 'Conectando ao GitHub...',
  'Preparando interface...', 'Bem-vindo!',
];

export const NOTIFS = [
  ['💡 Dica',          'Clique direito no desktop para trocar o wallpaper!'],
  ['📬 Disponível',    'Aberto para novos projetos e colaborações.'],
  ['☕ coffee_daemon', 'CPU em 100%. Café urgente necessário.'],
  ['⚡ Novidade',      'Aprendendo SvelteKit e TypeScript em 2025!'],
  ['👋 Olá!',          'Obrigado por visitar meu cartão de visitas.'],
];
