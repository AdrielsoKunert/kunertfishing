function abrirModal(img) {
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  modalImg.src = img.src;
  modal.classList.add('activo');
}

function cerrarModal() {
  document.getElementById('modal').classList.remove('activo');
}

// También cerrar con tecla ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') cerrarModal();
});
