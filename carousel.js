document.addEventListener('DOMContentLoaded', function () {
  const outer  = document.querySelector('.carousel-track-outer');
  const track  = document.getElementById('carousel-track');
  const dotsEl = document.getElementById('carousel-dots');
  const prev   = document.getElementById('carousel-prev');
  const next   = document.getElementById('carousel-next');
  if (!outer || !track || !dotsEl) return;

  fetch('productos.json')
    .then(res => res.json())
    .then(productos => {
      productos.forEach(p => {
        const nombre = p.nombre.trim();
        const desc = p.descripcion.trim();
        const card = document.createElement('div');
        card.className = 'carousel-card';
        card.innerHTML = `
          <div class="carousel-img-wrap">
            <img src="${p.imagen}" alt="${nombre} ${desc}" loading="lazy"
                 onerror="this.style.display='none'">
          </div>
          <div class="carousel-name">${nombre}</div>
          <div class="carousel-desc">${desc}</div>
        `;
        track.appendChild(card);
      });

      const cards = track.children;
      const gap = () => parseFloat(getComputedStyle(track).columnGap) || 20;
      const step = () => cards[0].offsetWidth + gap();
      const perPage = () => Math.max(1, Math.floor((outer.clientWidth + gap()) / step()));
      const maxScroll = () => outer.scrollWidth - outer.clientWidth;

      function updateDots() {
        const dots = [...dotsEl.children];
        if (!dots.length) return;
        let i = Math.round(outer.scrollLeft / (perPage() * step()));
        if (outer.scrollLeft >= maxScroll() - 2) i = dots.length - 1;
        dots.forEach((d, k) => d.classList.toggle('active', k === i));
      }

      function buildDots() {
        if (!outer.clientWidth) return; // sección oculta
        dotsEl.innerHTML = '';
        const pages = Math.ceil(cards.length / perPage());
        for (let i = 0; i < pages; i++) {
          const d = document.createElement('div');
          d.className = 'dot';
          d.onclick = () => outer.scrollTo({ left: i * perPage() * step(), behavior: 'smooth' });
          dotsEl.appendChild(d);
        }
        updateDots();
      }

      prev.onclick = () => outer.scrollBy({ left: -perPage() * step(), behavior: 'smooth' });
      next.onclick = () => outer.scrollBy({ left:  perPage() * step(), behavior: 'smooth' });
      outer.addEventListener('scroll', updateDots, { passive: true });

      // Recalcula al girar el celular y cuando la sección pasa de oculta a visible
      new ResizeObserver(buildDots).observe(outer);

      // Autoplay: se pausa al tocar o pasar el mouse, y no corre si el usuario pide menos movimiento
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        let auto = null;
        const stop = () => { clearInterval(auto); auto = null; };
        const play = () => {
          stop();
          auto = setInterval(() => {
            if (!outer.clientWidth) return;
            if (outer.scrollLeft >= maxScroll() - 2) outer.scrollTo({ left: 0, behavior: 'smooth' });
            else outer.scrollBy({ left: step(), behavior: 'smooth' });
          }, 3500);
        };
        play();
        ['mouseenter', 'touchstart', 'focusin'].forEach(e => outer.addEventListener(e, stop, { passive: true }));
        ['mouseleave', 'touchend'].forEach(e => outer.addEventListener(e, () => setTimeout(play, 4000), { passive: true }));
      }
    })
    .catch(err => console.error('Error cargando productos.json:', err));
});
// carousel.js
/*document.addEventListener('DOMContentLoaded', function () {
  const CARD_W = 200;
  const VISIBLE = 4;
  let current = 0;

  const track = document.getElementById('carousel-track');
  const dotsEl = document.getElementById('carousel-dots');
  if (!track || !dotsEl) return;

  fetch('productos.json')
    .then(res => res.json())
    .then(productos => {

      productos.forEach(p => {
        const card = document.createElement('div');
        card.className = 'carousel-card';
        card.innerHTML = `
          <div class="carousel-img-wrap">
            <img src="${p.imagen}" alt="${p.nombre}" onerror="this.style.display='none'">
          </div>
          <div class="carousel-name">${p.nombre.trim()}</div>
          <div class="carousel-desc">${p.descripcion.trim()}</div>
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
        document.querySelectorAll('#carousel-dots .dot').forEach((d, i) => {
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

    })
    .catch(err => console.error('Error cargando productos.json:', err));
});
*/