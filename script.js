const nav = document.querySelector('.nav');
const menu = document.querySelector('.menu');
const links = nav.querySelector('nav');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
links.id = 'main-navigation';
menu.setAttribute('aria-controls', links.id);
menu.setAttribute('aria-expanded', 'false');
function closeMenu() {
  links.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
  menu.textContent = 'Menu';
}
menu.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
  menu.textContent = open ? 'Close' : 'Menu';
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && links.classList.contains('open')) {
    closeMenu();
    menu.focus();
  }
});
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const id = link.getAttribute('href');
    const target = id === '#' ? document.body : document.querySelector(id);
    if (!target) return;
    event.preventDefault();
    closeMenu();
    target.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth' });
    if (id !== '#') history.replaceState(null, '', id);
  });
});
function updateNav() { nav.classList.toggle('scrolled', window.scrollY > 40); }
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .08 });
  document.querySelectorAll('.statement h2,.bodycopy,.feature,.section-head,.project,.steps>div,.tech-intro,.tech-item,.trade-copy,.trade-list,.cta h2').forEach(element => {
    element.classList.add('reveal');
    observer.observe(element);
  });
}
