/**
 * MAIN ENTRY POINT (main.js)
 * Sesuai ARCHITECTURE.md §2–§4 & MOTION.md §2
 */
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { initLineTextReveal } from './lineTextReveal.js';
import { initImageReveal } from './imageReveal.js';
import { initParallax } from './parallax.js';
import { initMarquee } from './marquee.js';
import { initHorizontalScrub } from './horizontalScrub.js';
import { initCursor } from './cursor.js';
import { initHeader } from './header.js';
import { initProjectModal } from './projectModal.js';

// Registrasi tunggal GSAP plugin
gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;

export function initApp() {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Set localhost flag (ARCHITECTURE.md §4)
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    document.documentElement.classList.add('is-localhost');
  }

  // Update --js-clientWidth untuk kalkulasi grid (DESIGN.md §3)
  const updateClientWidth = () => {
    document.documentElement.style.setProperty('--js-clientWidth', `${document.documentElement.clientWidth}px`);
  };
  updateClientWidth();
  window.addEventListener('resize', updateClientWidth, { passive: true });

  // Inisialisasi Lenis tunggal hanya jika bukan reduced motion
  if (!isReducedMotion) {
    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5
    });

    document.body.classList.add('is-lenis-active');

    // Sinkronisasi tunggal Lenis ke GSAP ScrollTrigger ticker
    lenisInstance.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }

  // Inisialisasi modul UI & Motion
  initHeader();
  initLineTextReveal();
  initImageReveal();
  initParallax();
  initMarquee();
  initHorizontalScrub();
  initCursor();
  initProjectModal();

  // Smooth Anchor Navigation via Lenis & data-anchor-offset (MOTION.md §4)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const offset = parseInt(anchor.getAttribute('data-anchor-offset'), 10) || -70;
        if (lenisInstance) {
          lenisInstance.scrollTo(targetEl, { offset, duration: 1.2 });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Tier-2 WebGL Plane Reveal: Lazy-load Three.js (ARCHITECTURE.md §1 & PRD Phase 5)
  if (!isReducedMotion) {
    import('./webglPlaneReveal.js')
      .then(({ initWebGLPlaneReveal }) => {
        initWebGLPlaneReveal();
      })
      .catch(() => {
        // Fallback CSS murni otomatis aktif
      });
  }

  // ScrollTrigger refresh setelah font & dom stabil
  if (document.fonts) {
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });
  } else {
    setTimeout(() => ScrollTrigger.refresh(), 300);
  }
}

// Dengarkan event ba-non-critical-ready dari loading.js
if (window.__BA_NON_CRITICAL_READY__) {
  initApp();
} else {
  window.addEventListener('ba-non-critical-ready', () => {
    initApp();
  }, { once: true });

  // Fallback guard jika preloader selesai atau script dimuat independen
  setTimeout(() => {
    if (!window.__BA_NON_CRITICAL_READY__) {
      initApp();
    }
  }, 2000);
}

