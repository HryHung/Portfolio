import { setupCVDownload } from './cv-download.js';
setupCVDownload();
const toggle = document.querySelector('.menu-toggle');
const links = document.querySelector('#nav-links');
function closeMenu() { toggle.setAttribute('aria-expanded', 'false'); links.classList.remove('is-open'); }
toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); links.classList.toggle('is-open', open); });
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
const viewer = document.querySelector('.viewer');
let opener;
let closingTimer;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
function closeViewer() {
  if (!viewer.open || viewer.classList.contains('is-closing')) return;
  if (reducedMotion.matches) { viewer.close(); return; }
  viewer.classList.add('is-closing');
  closingTimer = setTimeout(() => viewer.close(), 180);
}
document.querySelectorAll('[data-enlarge]').forEach(button => button.addEventListener('click', () => {
  opener = button;
  const original = button.querySelector('img');
  const img = viewer.querySelector('img');
  img.src = original.currentSrc || original.src;
  img.alt = original.alt;
  viewer.querySelector('figcaption').textContent = button.closest('figure').querySelector('figcaption').textContent;
  viewer.classList.remove('is-closing');
  viewer.showModal();
  document.body.classList.add('viewer-open');
}));
viewer.querySelector('.viewer-close').addEventListener('click', closeViewer);
viewer.addEventListener('cancel', event => { event.preventDefault(); closeViewer(); });
viewer.addEventListener('click', event => { if (event.target === viewer) closeViewer(); });
viewer.addEventListener('close', () => { clearTimeout(closingTimer); viewer.classList.remove('is-closing'); document.body.classList.remove('viewer-open'); opener?.focus(); });
document.addEventListener('keydown', event => {
  if (viewer.open || document.querySelector('.cv-cinema[open]')) return;
  if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); return; }
  if (toggle.getAttribute('aria-expanded') === 'true' || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || event.target.closest('input,textarea,select,button,[contenteditable="true"]')) return;
  if (matchMedia('(min-width: 1100px)').matches && ['ArrowLeft', 'ArrowRight'].includes(event.key)) {
    event.preventDefault();
    document.querySelector(`a[rel="${event.key === 'ArrowLeft' ? 'prev' : 'next'}"]`).click();
  }
});
matchMedia('(min-width: 1100px)').addEventListener('change', closeMenu);

// Sections are visible by default. Only animate an entering section once.
// If observer setup fails or motion is reduced, reading never depends on it.
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(section => observer.observe(section));
}
