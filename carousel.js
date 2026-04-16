const productos = [
  { nombre: "Jig Anti Fabio Baca 12gr", descripcion: "Sunset", imagen: "img/x-jig-sunset.png" },
  { nombre: "Lori-X 90", descripcion: "Superfície color 05", imagen: "img/lori-x-05.png" },
  { nombre: "Lori-X 90", descripcion: "Superfície color 20", imagen: "img/lori-x-20.png" },
  { nombre: "MAGNET 90", descripcion: "Color 18", imagen: "img/magnet-18.png" },
  { nombre: "MAGNET 90", descripcion: "Color 54", imagen: "img/magnet-54.png" },
  { nombre: "FATAL 90", descripcion: "Color 42", imagen: "img/fatal-42.png" },
  { nombre: "FLASH 75", descripcion: "Color 14", imagen: "img/flash-14.png" },
  { nombre: "LORI BLACK 80", descripcion: "Color 105", imagen: "img/LoriBlack105.png" },
  { nombre: "Lori Face 65", descripcion: "Chaaama", imagen: "img/face-65-chama.png" },
  { nombre: "Lori Face 65", descripcion: "Tequila", imagen: "img/face-65-tequila.png" },
  { nombre: "Laker 55", descripcion: "Iron", imagen: "img/laker-iron.png" },
  { nombre: "UP X", descripcion: "Lima", imagen: "img/up-x-110-lima.png" },
  { nombre: "Brutal 95 ZN", descripcion: "Chaaama", imagen: "img/brutal-95-zn-chama.png" },
  { nombre: "Brutal 95 ZN", descripcion: "Sunset", imagen: "img/brutal-95-zn-sunset.png" },
];

const track = document.getElementById('track');
const dotsEl = document.getElementById('dots');
let current = 0;
const visible = 4;
const total = productos.length;
const maxIndex = total - visible;

productos.forEach(p => {
  const card = document.createElement('div');
  card.className = 'carousel-card';
  card.innerHTML = `
    <div class="carousel-img-wrap">
      <img src="${p.imagen}" alt="${p.nombre}" onerror="this.parentElement.textContent='sem imagem'">
    </div>
    <div class="carousel-name">${p.nombre}</div>
    <div class="carousel-desc">${p.descripcion}</div>
  `;
  track.appendChild(card);
});

const numDots = Math.ceil(total / visible);
for (let i = 0; i < numDots; i++) {
  const d = document.createElement('div');
  d.className = 'dot' + (i === 0 ? ' active' : '');
  d.onclick = () => goTo(i * visible);
  dotsEl.appendChild(d);
}

function goTo(idx) {
  current = Math.max(0, Math.min(idx, maxIndex));
  const cardW = 180 + 20;
  track.style.transform = `translateX(-${current * cardW}px)`;
  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', Math.floor(current / visible) === i);
  });
}

document.getElementById('prev').onclick = () => goTo(current - visible);
document.getElementById('next').onclick = () => goTo(current + visible);

let auto = setInterval(() => goTo(current + 1 > maxIndex ? 0 : current + 1), 2800);
track.addEventListener('mouseenter', () => clearInterval(auto));
track.addEventListener('mouseleave', () => { auto = setInterval(() => goTo(current + 1 > maxIndex ? 0 : current + 1), 2800); });