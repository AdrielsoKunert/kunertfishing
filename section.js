function showSection(id, el) {
  document.querySelectorAll('section').forEach(s => s.style.display = 'none');
  document.querySelectorAll('.nav-menu a').forEach(a => a.classList.remove('active'));
  document.getElementById('section-' + id).style.display = 'block';
  el.classList.add('active');
}
