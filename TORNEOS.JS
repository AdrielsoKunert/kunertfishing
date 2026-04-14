// ─── TORNEOS.JS ───────────────────────────────────────────────
// Lee torneos.json y renderiza las secciones de próximos y resultados
// Para agregar/editar torneos: solo modificar torneos.json
// ──────────────────────────────────────────────────────────────

const IMAGEN_PLACEHOLDER = 'img/torneos/placeholder.jpg';

function formatearFecha(fechaStr) {
  const fecha = new Date(fechaStr + 'T00:00:00');
  const dia = fecha.getDate();
  const mes = fecha.toLocaleString('es-PY', { month: 'short' }).toUpperCase();
  const anio = fecha.getFullYear();
  return { dia, mes, anio };
}

function diasRestantes(fechaStr) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const fecha = new Date(fechaStr + 'T00:00:00');
  const diff = Math.ceil((fecha - hoy) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 'Hoy';
  if (diff === 1) return 'Mañana';
  if (diff > 0) return `En ${diff} días`;
  return 'Finalizado';
}

function badgeColor(dias) {
  if (dias === 'Hoy' || dias === 'Mañana') return 'badge-urgente';
  if (dias === 'Finalizado') return 'badge-cerrado';
  return 'badge-open';
}

function linkWhatsApp(telefono, nombre) {
  const msg = encodeURIComponent(`Hola! Me quiero inscribir al ${nombre}`);
  return `https://wa.me/${telefono}?text=${msg}`;
}

function imagenConFallback(src, alt, className) {
  return `<img 
    src="${src}" 
    alt="${alt}" 
    class="${className}"
    onerror="this.src='${IMAGEN_PLACEHOLDER}'; this.onerror=null;"
  >`;
}

// ── Tarjeta de torneo próximo ──────────────────────────────────
function renderProximo(t) {
  const { dia, mes, anio } = formatearFecha(t.fecha);
  const dias = diasRestantes(t.fecha);
  const badge = badgeColor(dias);
  const categorias = t.categorias.map(c => `<span class="cat-tag">${c}</span>`).join('');
  const btnInscripcion = t.inscripcion_tipo === 'whatsapp'
    ? `<a href="${linkWhatsApp(t.telefono, t.nombre)}" target="_blank" class="btn-inscribir">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.527 5.845L.057 23.885l6.19-1.625A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.884 9.884 0 01-5.031-1.378l-.361-.214-3.735.979.997-3.648-.235-.374A9.86 9.86 0 012.106 12C2.106 6.58 6.58 2.106 12 2.106c5.42 0 9.894 4.474 9.894 9.894 0 5.42-4.474 9.894-9.894 9.894z"/></svg>
        Inscribirse
       </a>`
    : `<a href="${t.inscripcion_link || '#'}" class="btn-inscribir">Inscribirse</a>`;

  return `
    <div class="torneo-card torneo-proximo">
      <div class="torneo-img-wrap">
        ${imagenConFallback(t.imagen, t.nombre, 'torneo-img')}
        <div class="torneo-fecha-badge">
          <span class="fecha-dia">${dia}</span>
          <span class="fecha-mes">${mes}</span>
          <span class="fecha-anio">${anio}</span>
        </div>
      </div>
      <div class="torneo-body">
        <div class="torneo-header">
          <h3 class="torneo-nombre">${t.nombre}</h3>
          <span class="badge ${badge}">${dias}</span>
        </div>
        <p class="torneo-lugar">📍 ${t.lugar}</p>
        <p class="torneo-desc">${t.descripcion}</p>
        <div class="torneo-cats">${categorias}</div>
        <div class="torneo-footer">
          <span class="torneo-premio">🏆 ${t.premio}</span>
          ${btnInscripcion}
        </div>
      </div>
    </div>
  `;
}

// ── Tarjeta de resultado ───────────────────────────────────────
function renderResultado(t) {
  const { dia, mes, anio } = formatearFecha(t.fecha);
  const medallas = ['🥇', '🥈', '🥉'];
  const podio = t.podio.map((p, i) => `
    <div class="podio-item podio-${p.puesto}">
      <span class="podio-medalla">${medallas[i] || p.puesto}</span>
      <span class="podio-nombre">${p.nombre}</span>
      <span class="podio-detalle">${p.detalle}</span>
    </div>
  `).join('');

  return `
    <div class="torneo-card torneo-resultado">
      <div class="torneo-img-wrap">
        ${imagenConFallback(t.imagen, t.nombre, 'torneo-img')}
        <div class="resultado-overlay">
          <span class="resultado-label">RESULTADO FINAL</span>
        </div>
      </div>
      <div class="torneo-body">
        <h3 class="torneo-nombre">${t.nombre}</h3>
        <p class="torneo-lugar">📍 ${t.lugar} — ${dia} ${mes} ${anio}</p>
        <div class="podio">
          ${podio}
        </div>
      </div>
    </div>
  `;
}

// ── Esqueleto de carga (skeleton) ──────────────────────────────
function renderSkeleton() {
  return Array(2).fill(`
    <div class="torneo-card skeleton-card">
      <div class="skeleton skeleton-img"></div>
      <div class="torneo-body">
        <div class="skeleton skeleton-title"></div>
        <div class="skeleton skeleton-text"></div>
        <div class="skeleton skeleton-text short"></div>
      </div>
    </div>
  `).join('');
}

// ── Función principal ──────────────────────────────────────────
async function cargarTorneos() {
  const contenedor = document.getElementById('torneos-contenido');
  if (!contenedor) return;

  contenedor.innerHTML = renderSkeleton();

  try {
    const res = await fetch('torneos.json');
    if (!res.ok) throw new Error('No se pudo cargar torneos.json');
    const data = await res.json();

    let html = '';

    if (data.proximos && data.proximos.length > 0) {
      html += `<div class="torneos-seccion">
        <div class="torneos-seccion-title">
          <span class="seccion-linea"></span>
          <span>PRÓXIMOS TORNEOS</span>
          <span class="seccion-linea"></span>
        </div>
        <div class="torneos-grid">
          ${data.proximos.map(renderProximo).join('')}
        </div>
      </div>`;
    }

    if (data.resultados && data.resultados.length > 0) {
      html += `<div class="torneos-seccion">
        <div class="torneos-seccion-title">
          <span class="seccion-linea"></span>
          <span>RESULTADOS</span>
          <span class="seccion-linea"></span>
        </div>
        <div class="torneos-grid">
          ${data.resultados.map(renderResultado).join('')}
        </div>
      </div>`;
    }

    if (!html) {
      html = '<p class="torneos-empty">No hay torneos disponibles por el momento.</p>';
    }

    contenedor.innerHTML = html;

  } catch (err) {
    console.error('Error cargando torneos:', err);
    contenedor.innerHTML = `<p class="torneos-error">⚠️ No se pudieron cargar los torneos. Intentá más tarde.</p>`;
  }
}
