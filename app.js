
// SPA tab switcher
const links = document.querySelectorAll('.nav [data-view]');
const views = document.querySelectorAll('.view');
links.forEach(a => a.addEventListener('click', e => {
  e.preventDefault();
  const id = a.getAttribute('data-view');
  links.forEach(l => l.classList.toggle('active', l===a));
  views.forEach(v => v.classList.toggle('active', v.id === 'view-'+id));
  history.replaceState(null, '', '#'+id);
}));

// Preserve tab on reload
const start = location.hash.replace('#','') || 'home';
document.querySelector(`[data-view="${start}"]`)?.click();

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();
