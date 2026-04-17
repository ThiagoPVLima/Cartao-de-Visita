export function toggleStartMenu(e) {
  if (e) e.stopPropagation();
  document.getElementById('start-menu').classList.toggle('open');
}

// Fecha ao clicar fora
document.addEventListener('click', e => {
  const sm  = document.getElementById('start-menu');
  const btn = document.getElementById('start-btn');
  if (sm.classList.contains('open') && !sm.contains(e.target) && !btn.contains(e.target)) {
    sm.classList.remove('open');
  }
});
