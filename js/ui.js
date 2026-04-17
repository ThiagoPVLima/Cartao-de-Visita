import { showNotif } from './notifications.js';
import { playSuccess, playError } from './audio.js';
import { openPopup } from './windows.js';

export function changeTab(name, el) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('menu[role="tablist"] li').forEach(li => li.removeAttribute('aria-selected'));
  document.getElementById('tab-' + name).classList.add('active');
  el.setAttribute('aria-selected', 'true');
}

export function changeSkillCat(name, el) {
  document.querySelectorAll('.skill-cat').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.skill-nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('cat-' + name).classList.add('active');
  el.classList.add('active');
}

export function submitForm() {
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
    body: JSON.stringify({ name, email, message: msg }),
  })
    .then(res => {
      if (res.ok) {
        playSuccess();
        clearForm();
        document.getElementById('sent-msg-text').innerHTML =
          `Mensagem enviada com sucesso!<br><span style="font-size:10px;color:#666">Obrigado, ${name}! Responderei em breve.</span>`;
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

export function clearForm() {
  document.getElementById('f-name').value  = '';
  document.getElementById('f-email').value = '';
  document.getElementById('f-msg').value   = '';
}

export function atualizarIdade() {
  const nasc = new Date('1995-08-08');
  const hoje = new Date();
  let idade = hoje.getFullYear() - nasc.getFullYear();
  if (hoje.getMonth() < nasc.getMonth() ||
     (hoje.getMonth() === nasc.getMonth() && hoje.getDate() < nasc.getDate())) idade--;
  document.getElementById('idade').textContent = idade;
}

export function atualizarRelogio() {
  const n   = new Date();
  const txt = String(n.getHours()).padStart(2, '0') + ':' + String(n.getMinutes()).padStart(2, '0');
  document.getElementById('status-time').textContent    = txt;
  document.getElementById('taskbar-clock').textContent  = txt;
}
