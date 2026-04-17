const AC = window.AudioContext || window.webkitAudioContext;
let ac;

export function playClick() {
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

export function playError() {
  try {
    if (!ac) ac = new AC();
    [660, 440, 330].forEach((f, i) => {
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

export function playSuccess() {
  try {
    if (!ac) ac = new AC();
    [440, 554, 659].forEach((f, i) => {
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
