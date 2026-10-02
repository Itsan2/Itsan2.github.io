/**
 * IMAGE REVEAL MODULE (imageReveal.js)
 * Sesuai MOTION.md §4 & §6
 * Mengimplementasikan mask-slide clip-path reveal via data-image-reveal
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initImageReveal() {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReducedMotion) return;

  const revealItems = document.querySelectorAll('[data-image-reveal]');
  if (!revealItems.length) return;

  revealItems.forEach((item) => {
    const start = item.getAttribute('data-image-reveal-start') || 'top 85%';
    const stagger = parseFloat(item.getAttribute('data-image-reveal-stagger')) || 0;

    gsap.fromTo(
      item,
      {
        clipPath: 'inset(0% 0% 100% 0%)',
        scale: 1.08,
        opacity: 0
      },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        scale: 1,
        opacity: 1,
        duration: 1.2,
        delay: stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: start,
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  });
}
