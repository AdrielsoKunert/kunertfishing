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
          <a class="btn-whatsapp" href="whatsapp://send?phone=595973585691&text=${mensaje}">
      📦 Pedido
    </a>
    <a class="btn-whatsapp" 
   href="intent://send?phone=595973585691&text=Hola#Intent;scheme=whatsapp;package=com.whatsapp;end">
   📦 Pedido
</a>
        </div>
      `;

      contenedor.appendChild(card);
    });
  });
//   
