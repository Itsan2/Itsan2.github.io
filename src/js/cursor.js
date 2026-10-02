/**
 * CUSTOM CURSOR MODULE (cursor.js)
 * Sesuai DESIGN.md §4 & MOTION.md §6
 * Hanya aktif pada (hover: hover) and (pointer: fine)
 */
export function initCursor() {
  const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!hasFinePointer) return;

  const cursor = document.querySelector('.c-cursor');
  if (!cursor) return;

  document.body.classList.add('has-custom-cursor');

  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function render() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);

  const interactives = document.querySelectorAll('a, button, .c-project-card, [data-cursor-hover]');
  interactives.forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-hovering'));
  });
}
