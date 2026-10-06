const WA_NUMERO = "595973585691";
const WA_ICONO = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.527 5.845L.057 23.885l6.19-1.625A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.884 9.884 0 01-5.031-1.378l-.361-.214-3.735.979.997-3.648-.235-.374A9.86 9.86 0 012.106 12C2.106 6.58 6.58 2.106 12 2.106c5.42 0 9.894 4.474 9.894 9.894 0 5.42-4.474 9.894-9.894 9.894z"/></svg>`;

const waLink = (texto) => `https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(texto)}`;

// ── Botón flotante de WhatsApp ─────────────────────────────────
document.body.insertAdjacentHTML("beforeend", `
  <a class="wa-float" href="${waLink("¡Hola! Quisiera consultar por sus productos.")}"
     target="_blank" rel="noopener noreferrer" aria-label="Consultar por WhatsApp">${WA_ICONO}</a>`);

// ── Utilidades ─────────────────────────────────────────────────
// Compara sin tildes ni mayúsculas ("superficie" encuentra "SUPERFÍCIE")
const norm = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

// Modelo = nombre sin el tamaño: "Lori-X 90" -> "Lori-X", "MAGNET 90" -> "MAGNET".
// Si algún producto necesita otro agrupamiento, agrega  "modelo": "..."  en productos.json
const modeloDe = (p) =>
  (p.modelo || p.nombre.trim().replace(/\s*\d+\s*(?:gr?)?\b.*$/i, "")).trim();

// ── Estado ─────────────────────────────────────────────────────
let productos = [];
let modeloActivo = "todos";
let texto = "";

const grid = document.getElementById("lista-productos");
const buscador = document.getElementById("buscador");
const chipsEl = document.getElementById("chips");
const cuentaEl = document.getElementById("catalogo-count");

// ── Tarjeta ────────────────────────────────────────────────────
function tarjeta(prod) {
  const nombre = prod.nombre.trim();
  const desc = prod.descripcion.trim();

  // Acepta 60.000 (como está hoy en el JSON) o 60000
  const gs = prod.precio < 1000 ? Math.round(prod.precio * 1000) : prod.precio;
  const precio = gs.toLocaleString("es-PY");

  const mensaje = `🎣 *CONSULTA DE PRODUCTO*\n\n🪝 *Producto:* ${nombre}\n📝 *Detalle:* ${desc}\n\n¡Hola! Me interesa este producto, ¿está disponible?`;

  // La etiqueta solo se muestra si aporta información (hoy todas son "Lori")
  const tag = prod.etiqueta && prod.etiqueta !== "Lori"
    ? `<span class="tag">${prod.etiqueta}</span>` : "";

  return `
    <div class="card">
      <div class="card-top" style="background:${prod.color}">
        ${tag}
        <img src="${prod.imagen}" alt="${nombre} ${desc}"
             loading="lazy" width="220" height="150" onclick="abrirModal(this)">
      </div>
      <div class="card-body">
        <h4>${nombre}</h4>
        <p>${desc}</p>
        <div class="price"><small>Gs.</small> ${precio}</div>
        <a class="btn-whatsapp" href="${waLink(mensaje)}"
           target="_blank" rel="noopener noreferrer">
          ${WA_ICONO} Consultar
        </a>
      </div>
    </div>`;
}

// ── Pintar lista según filtro + búsqueda ───────────────────────
function pintar() {
  const q = norm(texto.trim());
  const lista = productos.filter((p) =>
    (modeloActivo === "todos" || p._clave === modeloActivo) &&
    (!q || norm(`${p.nombre} ${p.descripcion}`).includes(q))
  );

  grid.innerHTML = lista.length
    ? lista.map(tarjeta).join("")
    : `<p class="catalogo-vacio">No encontramos productos con ese filtro.
         <a href="${waLink("¡Hola! Estoy buscando un señuelo que no encuentro en la página.")}"
            target="_blank" rel="noopener noreferrer">Consulta por WhatsApp</a> si buscas otro modelo.</p>`;

  if (cuentaEl) cuentaEl.textContent = `${lista.length} de ${productos.length} productos`;
  if (chipsEl) {
    chipsEl.querySelectorAll(".chip").forEach((c) =>
      c.setAttribute("aria-pressed", String(c.dataset.clave === modeloActivo)));
  }
}

// ── Chips de modelos ───────────────────────────────────────────
function crearChips() {
  if (!chipsEl) return;
  const modelos = new Map(); // clave -> nombre a mostrar (orden de aparición)
  productos.forEach((p) => { if (!modelos.has(p._clave)) modelos.set(p._clave, p._modelo); });

  chipsEl.innerHTML =
    `<button type="button" class="chip" data-clave="todos" aria-pressed="true">Todos</button>` +
    [...modelos].map(([clave, nombre]) =>
      `<button type="button" class="chip" data-clave="${clave}" aria-pressed="false">${nombre}</button>`
    ).join("");

  chipsEl.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    modeloActivo = chip.dataset.clave;
    pintar();
  });
}

// ── Carga ──────────────────────────────────────────────────────
fetch("productos.json")
  .then((res) => res.json())
  .then((data) => {
    productos = data.map((p) => {
      const m = modeloDe(p);
      return { ...p, _modelo: m, _clave: norm(m) };
    });
    crearChips();
    if (buscador) buscador.addEventListener("input", () => { texto = buscador.value; pintar(); });
    pintar();
  })
  .catch((err) => console.error("Error cargando productos.json:", err));
