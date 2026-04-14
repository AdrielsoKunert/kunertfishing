function pedirWhatsApp(nombre, descripcion, imagen) {
  const numero = '595973585691'; // 👈 Tu número aquí

  const mensaje = `🎣 *CONSULTA DE PRODUCTO*

🪝 *Producto:* ${nombre}
🎨 *Color:* ${descripcion}

¡Hola! Me interesa este producto, ¿está disponible?`;

  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}
