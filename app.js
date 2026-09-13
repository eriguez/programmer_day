const canvas = document.querySelector('#programmer-day');
const ctx = canvas.getContext('2d');
const W = canvas.width, H = canvas.height;
const hues = [180, 195, 285, 315, 45, 135];
const glyphs = {
  A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
  D: ['11110', '10001', '10001', '10001', '10001', '10001', '11110'],
  E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
  F: ['11111', '10000', '10000', '11110', '10000', '10000', '10000'],
  G: ['01111', '10000', '10000', '10111', '10001', '10001', '01110'],
  I: ['11111', '00100', '00100', '00100', '00100', '00100', '11111'],
  L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
  M: ['10001', '11011', '10101', '10101', '10001', '10001', '10001'],
  O: ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
  P: ['11110', '10001', '10001', '11110', '10000', '10000', '10000'],
  R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
  Z: ['11111', '00001', '00010', '00100', '01000', '10000', '11111']
};
const particles = [], waves = [];
let pulses = 0;
const rnd = (a, b) => a + Math.random() * (b - a);

function makeWord(word, top, cell) {
  const units = [...word].reduce((n, c) => n + (c === ' ' ? 3 : 6), 0);
  let x = W / 2 - units * cell / 2;
  for (const letter of word) {
    if (letter === ' ') { x += cell * 3; continue; }
    const rows = glyphs[letter];
    rows.forEach((row, iy) => [...row].forEach((bit, ix) => {
      if (bit === '1') for (let n = 0; n < 2; n++) {
        particles.push(new Particle(x + ix * cell + rnd(-1.5, 1.5), top + iy * cell + rnd(-1.5, 1.5)));
      }
    }));
    x += cell * 6;
  }
}

class Particle {
  constructor(tx, ty) {
    this.tx = tx; this.ty = ty; this.hue = hues[Math.floor(Math.random() * hues.length)];
    this.seed = Math.random() * 1000; this.energy = 0;
    const side = Math.floor(Math.random() * 4);
    if (side === 0) [this.x, this.y] = [rnd(0, W), rnd(-260, -40)];
    if (side === 1) [this.x, this.y] = [rnd(W + 40, W + 260), rnd(0, H)];
    if (side === 2) [this.x, this.y] = [rnd(0, W), rnd(H + 40, H + 260)];
    if (side === 3) [this.x, this.y] = [rnd(-260, -40), rnd(0, H)];
    this.vx = rnd(-1, 1); this.vy = rnd(-1, 1);
  }
  update(t) {
    const dx = this.tx - this.x, dy = this.ty - this.y, d = Math.hypot(dx, dy) || 1;
    const speed = d < 32 ? d / 32 * 5 : 5;
    let sx = dx / d * speed - this.vx, sy = dy / d * speed - this.vy;
    const sl = Math.hypot(sx, sy); if (sl > .24) { sx *= .24 / sl; sy *= .24 / sl; }
    this.vx = (this.vx + sx) * .992; this.vy = (this.vy + sy) * .992;
    if (d < 25) { this.vx += Math.sin(t * .003 + this.seed) * .012; this.vy += Math.cos(t * .003 + this.seed) * .012; }
    this.x += this.vx; this.y += this.vy; this.energy *= .92;
  }
  pulse(x, y, d) {
    let dx = this.x - x, dy = this.y - y, l = Math.hypot(dx, dy) || 1;
    const force = 10 - d / 150 * 8.5;
    this.vx += dx / l * force; this.vy += dy / l * force;
    this.energy = 1; this.hue = (this.hue + rnd(55, 130)) % 360;
  }
  draw() {
    const r = 2.2 + this.energy * 2.6;
    ctx.fillStyle = `hsla(${this.hue}, 90%, 70%, ${.13 + this.energy * .2})`;
    ctx.beginPath(); ctx.arc(this.x, this.y, r * 3.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = `hsl(${this.hue}, 95%, 82%)`;
    ctx.beginPath(); ctx.arc(this.x, this.y, r / 2, 0, Math.PI * 2); ctx.fill();
  }
}

function background(t) {
  // 1. Color base: Tu azul profundo (#031633)
  ctx.fillStyle = '#031633';
  ctx.fillRect(0, 0, W, H);

  // 2. Un suave resplandor central para que no se vea plano (Opcional, estilo neón)
  const glow = ctx.createRadialGradient(W / 2, H / 2 + 40, 20, W / 2, H / 2 + 40, 520);
  glow.addColorStop(0, 'rgba(80, 155, 255, 0.15)'); // Luz azul cian muy tenue en el centro
  glow.addColorStop(1, 'rgba(3, 22, 51, 0)');       // Se desvanece hacia tu azul profundo
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // Nota: Hemos eliminado el bucle 'for' que dibujaba los píxeles/estrellas parpadeantes
}

function label(text, y, size, color) {
  ctx.font = `${size}px system-ui, sans-serif`; ctx.textAlign = 'center'; ctx.fillStyle = color; ctx.fillText(text, W / 2, y);
}
function frame(t) {
  background(t);
  label('¡Que tu código compile a la primera, y que nunca te falte el café!', 72, 16, 'rgba(255,255,255,.8)');
  ctx.strokeStyle = 'rgba(80,235,255,.45)'; ctx.beginPath(); ctx.moveTo(W / 2 - 250, 96); ctx.lineTo(W / 2 + 250, 96); ctx.stroke();
  particles.forEach(p => { p.update(t); p.draw(); });
  for (let i = waves.length - 1; i >= 0; i--) {
    const w = waves[i]; w.r += 7; w.life -= 3.4;
    ctx.strokeStyle = `rgba(70,235,255,${w.life / 100})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(w.x, w.y, w.r, 0, Math.PI * 2); ctx.stroke();
    if (w.life <= 0) waves.splice(i, 1);
  }
  label('Click en cualquier partícula 😎', H - 42, 14, 'rgba(255,255,255,.75)');
  //label(`✦ ${pulses} pulsos de creatividad`, H - 20, 13, '#ffe85a');
  requestAnimationFrame(frame);
}

canvas.addEventListener('pointerdown', event => {
  const rect = canvas.getBoundingClientRect(), x = (event.clientX - rect.left) * W / rect.width, y = (event.clientY - rect.top) * H / rect.height;
  pulses++; waves.push({ x, y, r: 4, life: 100 });
  particles.forEach(p => { const d = Math.hypot(p.x - x, p.y - y); if (d < 150) p.pulse(x, y, d); });
});

makeWord('FELIZ DIA DEL', 215, 11);
makeWord('PROGRAMADOR', 380, 12);
requestAnimationFrame(frame);
