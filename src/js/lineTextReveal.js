/**
 * LINE TEXT REVEAL MODULE (lineTextReveal.js)
 * Sesuai MOTION.md §4 & §6
 * Menggunakan GSAP + ScrollTrigger untuk menganimasi text reveal via hook data-line-reveal
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initLineTextReveal() {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReducedMotion) return;

  const elements = document.querySelectorAll('[data-line-reveal]');
  if (!elements.length) return;

  elements.forEach((el) => {
    const delay = parseFloat(el.getAttribute('data-line-reveal-delay')) || 0;
    const startPos = el.getAttribute('data-line-reveal-start') || 'top 85%';
    const triggerSelector = el.getAttribute('data-line-reveal-trigger');
    const triggerEl = triggerSelector ? document.querySelector(triggerSelector) || el : el;

    // Bungkus teks ke dalam wrapper overflow-hidden
    if (!el.dataset.wrapped) {
      const originalHtml = el.innerHTML.trim();
      el.innerHTML = `<span class="u-reveal-line" style="display: block; overflow: hidden;"><span class="u-reveal-inner" style="display: block; will-change: transform, opacity;">${originalHtml}</span></span>`;
      el.dataset.wrapped = 'true';
    }

    const inner = el.querySelector('.u-reveal-inner');
    if (!inner) return;

    gsap.fromTo(
      inner,
      {
        yPercent: 105,
        opacity: 0
      },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        delay: delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: triggerEl,
          start: startPos,
          toggleActions: 'play none none none',
          once: true
        }
      }
    );
  });

  // Text Fill Reveal (MOTION.md §4: data-text-fill-reveal)
  const textFillElements = document.querySelectorAll('[data-text-fill-reveal]');
  textFillElements.forEach((el) => {
    el.style.backgroundImage = 'linear-gradient(to right, var(--color-blue-1) 50%, var(--color-text) 50%)';
    el.style.backgroundSize = '200% 100%';
    el.style.backgroundPosition = '100% 0%';
    el.style.webkitBackgroundClip = 'text';
    el.style.webkitTextFillColor = 'transparent';

    gsap.to(el, {
      backgroundPosition: '0% 0%',
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        end: 'bottom 40%',
        scrub: 0.8
      }
    });
  });
}
