const RUTAS = {
  inicio: 'section-inicio',
  productos: 'section-iscas',
  iscas: 'section-iscas',
  torneos: 'section-torneos',
};

function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelectorAll('.nav-menu a').forEach(a => {
    a.classList.toggle('active', a.dataset.section === id);
  });
}

function irAHash() {
  const clave = location.hash.slice(1).toLowerCase();
  showSection(RUTAS[clave] || 'section-inicio');
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', irAHash);
irAHash(); // se ejecuta ya, el script está al final del body

/*function showSection(id, el) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-menu a').forEach(a => a.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  el.classList.add('active');
}*/
/*function showSection(id, el) {
  document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
  document.querySelectorAll('.nav-menu a').forEach(a => a.classList.remove('active'));
  document.getElementById('section-' + id).style.display = 'block';
  el.classList.add('active');
}
*/
