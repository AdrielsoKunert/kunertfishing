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
          <img src="${prod.imagen}" alt="">
        </div>
        <div class="card-body">
          <h4>${prod.nombre}</h4>
          <p>${prod.descripcion}</p>
          <div class="price"> Gs. ${prod.precio}</div>
          <button>VER MAIS</button>
        </div>
      `;

      contenedor.appendChild(card);
    });
  });
//   <div class="price"> Gs. ${prod.precio.toFixed(2)}</div>
