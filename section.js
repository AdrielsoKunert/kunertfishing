function showSection(id, el) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-menu a').forEach(a => a.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  el.classList.add('active');
}
/*function showSection(id, el) {
  document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
  document.querySelectorAll('.nav-menu a').forEach(a => a.classList.remove('active'));
  document.getElementById('section-' + id).style.display = 'block';
  el.classList.add('active');
}
*/
