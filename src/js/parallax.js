/**
 * PARALLAX MODULE (parallax.js)
 * Sesuai MOTION.md §4 & §6
 * Mengimplementasikan section & background parallax menggunakan hook data-section-parallax
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initParallax() {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReducedMotion) return;

  const parallaxSections = document.querySelectorAll('[data-section-parallax]');
  if (!parallaxSections.length) return;

  parallaxSections.forEach((section) => {
    const factor = parseFloat(section.getAttribute('data-section-parallax-factor')) || 0.6;
    const yOffset = 100 * (1 - factor);

    gsap.fromTo(
      section,
      {
        y: yOffset
      },
      {
        y: -yOffset,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      }
    );

    // Background scale treatment bila hook tersedia
    const bgMedia = section.querySelector('[data-section-parallax-background-trigger], .p-top-feature__bg, .p-top-fv__bg-media');
    if (bgMedia) {
      const scaleFrom = parseFloat(bgMedia.getAttribute('data-scale-from')) || 1.15;
      const scaleTo = parseFloat(bgMedia.getAttribute('data-scale-to')) || 1.0;
      gsap.fromTo(
        bgMedia,
        { scale: scaleFrom },
        {
          scale: scaleTo,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );
    }
  });
}
