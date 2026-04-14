fetch("productos.json")
  .then((res) => res.json())
  .then((data) => {
    const contenedor = document.getElementById("productos");

    data.forEach((prod) => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <div class="card-top" style="background:${prod.color}">
          <span class="tag">${prod.etiqueta}</span>
          <img src="${prod.imagen}" alt=""  onclick="abrirModal(this)">
        </div>
        <div class="card-body">
          <h4>${prod.nombre}</h4>
          <p>${prod.descripcion}</p>
          <div class="price"> Gs. ${prod.precio.toFixed(3)}</div>
          <a class="btn-whatsapp" href="https://wa.me/595912345678?text=${encodeURIComponent(`🎣 *CONSULTA DE PRODUCTO*\n\n🪝 *Producto:* ${prod.nombre}\n🎨 *Color:* ${prod.descripcion}\n\n¡Hola! Me interesa este producto, ¿está disponible?`)}" target="_blank">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.554 4.103 1.523 5.824L.057 23.486a.5.5 0 0 0 .609.61l5.737-1.505A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.891 0-3.667-.5-5.207-1.378l-.374-.217-3.853 1.011 1.029-3.76-.231-.386A9.944 9.944 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              Pedido
          </a>
        </div>
      `;

      contenedor.appendChild(card);
    });
  });
//   
