/**
 * MARQUEE MODULE (marquee.js)
 * Sesuai MOTION.md §4 & §6
 * Mengimplementasikan marquee scroll scrub & intro loop
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initMarquee() {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReducedMotion) return;

  const marquees = document.querySelectorAll('[data-marquee-scroll-scrub]');
  if (!marquees.length) return;

  marquees.forEach((marquee) => {
    const inner = marquee.querySelector('.c-marquee__inner');
    if (!inner) return;

    gsap.to(inner, {
      xPercent: -25,
      ease: 'none',
      scrollTrigger: {
        trigger: marquee,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.2
      }
    });
  });
}
