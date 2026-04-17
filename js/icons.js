export function makeIconDraggable(el) {
  let dragging = false, startX, startY, ox, oy;

  el.addEventListener('mousedown', e => {
    if (e.button !== 0) return;
    startX = e.clientX;
    startY = e.clientY;
    dragging = false;

    document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
    el.classList.add('selected');

    const dr = document.getElementById('desktop').getBoundingClientRect();
    const er = el.getBoundingClientRect();
    ox = e.clientX - (er.left - dr.left);
    oy = e.clientY - (er.top  - dr.top);

    function onMove(e) {
      if (!dragging && (Math.abs(e.clientX - startX) > 4 || Math.abs(e.clientY - startY) > 4)) {
        dragging = true;
      }
      if (dragging) {
        el.style.left = (e.clientX - ox) + 'px';
        el.style.top  = (e.clientY - oy) + 'px';
      }
    }
    function onUp() {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    }
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    e.preventDefault();
    e.stopPropagation();
  });

  // Cancela o onclick se o usuário arrastou
  el.addEventListener('click', e => {
    if (dragging) { e.stopImmediatePropagation(); dragging = false; }
  }, true);
}

// Inicializa todos os ícones
document.querySelectorAll('.desktop-icon').forEach(makeIconDraggable);

// Clique no desktop limpa a seleção
document.getElementById('desktop').addEventListener('click', e => {
  if (!e.target.closest('.desktop-icon')) {
    document.querySelectorAll('.desktop-icon').forEach(i => i.classList.remove('selected'));
  }
});
