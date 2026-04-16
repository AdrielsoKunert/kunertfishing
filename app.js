fetch("productos.json")
  .then((res) => res.json())
  .then((data) => {
    const contenedor = document.getElementById("productos");

    data.forEach((prod) => {
      const card = document.createElement("div");
      card.className = "card";
      
      const mensaje = encodeURIComponent(`🎣 *CONSULTA DE PRODUCTO*\n\n🪝 *Producto:* ${prod.nombre}\n🎨 *Color:* ${prod.descripcion}\n\n¡Hola! Me interesa este producto, ¿está disponible?`);

      card.innerHTML = `
        <div class="card-top" style="background:${prod.color}">
          <span class="tag">${prod.etiqueta}</span>
          <img src="${prod.imagen}" alt=""  onclick="abrirModal(this)">
        </div>
        <div class="card-body">
          <h4>${prod.nombre}</h4>
          <p>${prod.descripcion}</p>
          <div class="price"> Gs. ${prod.precio.toFixed(3)}</div>
        <a class="btn-whatsapp" 
             href="https://wa.me/595973585691?text=${mensaje}"
             target="_blank">
            📦 Pedido
          </a>
        </div>
      `;

      contenedor.appendChild(card);
    });
  });
(function initCarousel() {
  const CARD_W = 200; // 180px + 20px gap
  const VISIBLE = 4;
  const track = document.getElementById('carousel-track');
  const dotsEl = document.getElementById('carousel-dots');
  let current = 0;

  productos.forEach(p => {
    const card = document.createElement('div');
    card.className = 'carousel-card';
    card.innerHTML = `
      <div class="carousel-img-wrap">
        <img src="${p.imagen}" alt="${p.nombre}">
      </div>
      <div class="carousel-name">${p.nombre}</div>
      <div class="carousel-desc">${p.descripcion}</div>
    `;
    track.appendChild(card);
  });

  const numDots = Math.ceil(productos.length / VISIBLE);
  for (let i = 0; i < numDots; i++) {
    const d = document.createElement('div');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.onclick = () => goTo(i * VISIBLE);
    dotsEl.appendChild(d);
  }

  function goTo(idx) {
    const max = productos.length - VISIBLE;
    current = Math.max(0, Math.min(idx, max));
    track.style.transform = `translateX(-${current * CARD_W}px)`;
    document.querySelectorAll('.dot').forEach((d, i) => {
      d.classList.toggle('active', Math.floor(current / VISIBLE) === i);
    });
  }

  document.getElementById('carousel-prev').onclick = () => goTo(current - VISIBLE);
  document.getElementById('carousel-next').onclick = () => goTo(current + VISIBLE);

  let auto = setInterval(() => {
    goTo(current + 1 > productos.length - VISIBLE ? 0 : current + 1);
  }, 2800);

  track.addEventListener('mouseenter', () => clearInterval(auto));
  track.addEventListener('mouseleave', () => {
    auto = setInterval(() => {
      goTo(current + 1 > productos.length - VISIBLE ? 0 : current + 1);
    }, 2800);
  });
})();
