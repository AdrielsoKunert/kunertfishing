function pedirWhatsApp(nombre, descripcion, imagen) {
  const numero = '595973585691'; // 👈 Tu número aquí
/*
  const mensaje = `🎣 *CONSULTA DE PRODUCTO*

🪝 *Producto:* ${nombre}
🎨 *Color:* ${descripcion}

¡Hola! Me interesa este producto, ¿está disponible?`;
*/
 const mensaje = encodeURIComponent(`🎣 *CONSULTA DE PRODUCTO*\n\n🪝 *Producto:* ${prod.nombre}\n🎨 *Color:* ${prod.descripcion}\n\n¡Hola! Me interesa este producto, ¿está disponible?`);
/*
  const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
*/
  const linkWhatsapp = `whatsapp://send?phone=595912345678&text=${mensaje}`;

}
