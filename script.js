/* ====== Fundo de código binário (Matrix suave) ====== */
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

let w, h, cols, drops;
const chars = '01';
const fontSize = 16;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  cols = Math.floor(w / fontSize);
  drops = new Array(cols).fill(0);
}
window.addEventListener('resize', resize);
resize();

function draw() {
  // véu para rastro
  ctx.fillStyle = 'rgba(11,11,11,0.08)';
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = 'rgba(0,230,118,0.28)';
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = chars[Math.floor(Math.random() * chars.length)];
    const x = i * fontSize;
    const y = drops[i] * fontSize;
    ctx.fillText(text, x, y);

    if (y > h && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
  requestAnimationFrame(draw);
}
draw();

/* ====== Smooth scroll para os links de navegação ====== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ====== Reveal ao rolar ====== */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ====== Formulário -> WhatsApp ====== */
const form = document.getElementById('leadForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const zap  = document.getElementById('zap').value.trim();
  const msg  = document.getElementById('mensagem').value.trim();

  const linhas = [
    `Olá! Tenho interesse em um projeto com a Tech Safe Digital.`,
    `Nome: ${nome || '—'}`,
    `WhatsApp: ${zap || '—'}`,
    `Detalhes: ${msg || '—'}`
  ];
  const texto = encodeURIComponent(linhas.join('\n'));
  const url = `https://wa.me/5534991063450?text=${texto}`;

  window.open(url, '_blank'); // abre em nova aba
});
