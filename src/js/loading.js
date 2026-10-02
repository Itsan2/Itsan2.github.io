/**
 * LOADING STATE MACHINE (loading.js)
 * Sesuai MOTION.md §1 & ARCHITECTURE.md §2
 */

export const LOADING_CONFIG = {
  scene1Duration: 750,
  scene2TransitionOverlap: 600,
  reloadLogoEnterDuration: 750,
  reloadCurtainLeadDuration: 300,
  reloadExitDuration: 800,
  fvVideoMaxWaitDurationDesktop: 5000,
  fvVideoMaxWaitDurationMobile: 1000,
  scene1AssetsMaxWaitDurationMobile: 1000
};

export class LoadingManager {
  constructor() {
    this.overlay = document.querySelector('.p-loading');
    this.barFill = document.querySelector('.p-loading__bar-fill');
    this.isMobile = window.matchMedia('(max-width: 1023px)').matches;
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.savedScrollY = 0;
  }

  init() {
    // Deteksi History Navigation (Back / Forward)
    const navEntries = performance.getEntriesByType('navigation');
    const navType = navEntries.length > 0 ? navEntries[0].type : '';

    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    if (navType === 'back_forward') {
      document.documentElement.classList.add('is-history-navigation');
      this.finish(true);
      return;
    }

    if (this.isReducedMotion) {
      this.finish(true);
      return;
    }

    this.lockScroll();
    this.startSequence();
  }

  lockScroll() {
    this.savedScrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${this.savedScrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
  }

  unlockScroll() {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    window.scrollTo(0, this.savedScrollY);
  }

  startSequence() {
    if (!this.overlay) {
      this.finish(false);
      return;
    }

    // Scene 1: Curtain & logo reveal
    requestAnimationFrame(() => {
      this.overlay.classList.add('is-scene1');
      if (this.barFill) {
        this.barFill.style.width = '100%';
      }
    });

    const maxWait = this.isMobile
      ? LOADING_CONFIG.fvVideoMaxWaitDurationMobile
      : LOADING_CONFIG.fvVideoMaxWaitDurationDesktop;

    // Timeout safety guard
    const safetyTimeout = setTimeout(() => {
      this.finish(false);
    }, maxWait + LOADING_CONFIG.scene1Duration);

    // Tunggu fonts FV & scene 1 duration
    Promise.all([
      document.fonts ? document.fonts.ready : Promise.resolve(),
      new Promise((resolve) => setTimeout(resolve, LOADING_CONFIG.scene1Duration))
    ]).then(() => {
      clearTimeout(safetyTimeout);
      this.transitionToFV();
    }).catch(() => {
      clearTimeout(safetyTimeout);
      this.finish(false);
    });
  }

  transitionToFV() {
    document.documentElement.classList.add('is-fv-critical-ready');
    window.dispatchEvent(new CustomEvent('ba-fv-critical-ready'));

    setTimeout(() => {
      this.finish(false);
    }, LOADING_CONFIG.scene2TransitionOverlap);
  }

  finish(instant = false) {
    this.unlockScroll();

    if (this.overlay) {
      if (instant) {
        this.overlay.style.display = 'none';
      } else {
        this.overlay.classList.add('is-loaded');
        setTimeout(() => {
          if (this.overlay) this.overlay.style.display = 'none';
        }, LOADING_CONFIG.reloadExitDuration);
      }
    }

    document.documentElement.classList.add('is-loading-fv-complete');
    window.__BA_NON_CRITICAL_READY__ = true;
    window.dispatchEvent(new CustomEvent('ba-non-critical-ready'));
  }
}

// Handler resume video pada visibilitychange & pageshow (MOTION.md §1)
export function requestTopFvVideoPlayback(reason = 'page-resume') {
  const fvVideo = document.querySelector('.p-top-fv__video');
  if (fvVideo && fvVideo.paused) {
    fvVideo.play().catch(() => {});
  }
}

window.addEventListener('visibilitychange', () => {
  if (!document.hidden) requestTopFvVideoPlayback('visibility');
});

window.addEventListener('pageshow', () => {
  requestTopFvVideoPlayback('pageshow');
});

// Inisialisasi mandiri bila script dipanggil langsung
if (typeof window !== 'undefined') {
  const loader = new LoadingManager();
  loader.init();
}
