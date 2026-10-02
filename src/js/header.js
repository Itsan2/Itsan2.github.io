/**
 * HEADER & DRAWER MODULE (header.js)
 * Sesuai DESIGN.md §3 & §5, MOTION.md §1, §4, §5
 */
export function initHeader() {
  const header = document.querySelector('.l-header');
  const drawer = document.getElementById('drawerMenu');
  const menuBtn = document.querySelector('[data-drawer-open]');
  const closeBtn = document.querySelector('[data-drawer-close]');

  let lastScrollY = window.scrollY;
  let isAnimating = false;

  // Header scroll detection (hide on scroll down, show on scroll up)
  window.addEventListener('scroll', () => {
    // Jangan ubah header class bila drawer sedang aktif/terbuka
    if (drawer && (drawer.open || drawer.classList.contains('is-open'))) return;

    const currentScrollY = window.scrollY;

    if (currentScrollY > 60) {
      header?.classList.add('is-scrolled');
    } else {
      header?.classList.remove('is-scrolled');
    }

    if (currentScrollY > 150 && currentScrollY > lastScrollY) {
      // Scroll down -> hide
      header?.classList.add('is-hidden');
      header?.classList.remove('is-visible');
    } else if (currentScrollY < lastScrollY) {
      // Scroll up -> show
      header?.classList.remove('is-hidden');
      header?.classList.add('is-visible');
    }

    lastScrollY = currentScrollY;
  }, { passive: true });

  // Open Drawer dengan transisi masuk yang mulus
  const openDrawer = () => {
    if (!drawer || isAnimating || drawer.classList.contains('is-open')) return;
    isAnimating = true;

    // Buka modal dialog bila belum terbuka
    if (!drawer.open) {
      drawer.showModal();
    }

    // Set kelas state awal
    drawer.classList.remove('is-closing');
    drawer.classList.add('is-opening');
    header?.classList.add('is-drawer-open');
    menuBtn?.classList.add('is-active');
    menuBtn?.setAttribute('aria-expanded', 'true');
    menuBtn?.setAttribute('aria-label', 'Close Navigation Menu');
    document.body.style.overflow = 'hidden';

    // Beri 2 frame untuk rendering lalu aktifkan transisi is-open
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        drawer.classList.add('is-open');
        drawer.classList.remove('is-opening');
        setTimeout(() => {
          isAnimating = false;
        }, 650);
      });
    });
  };

  // Close Drawer dengan transisi keluar yang mulus (tanpa snapping)
  const closeDrawer = () => {
    if (!drawer || isAnimating || !drawer.open || drawer.classList.contains('is-closing')) return;
    isAnimating = true;

    // Mulai animasi transisi keluar
    drawer.classList.remove('is-open');
    drawer.classList.add('is-closing');
    header?.classList.remove('is-drawer-open');
    menuBtn?.classList.remove('is-active');
    menuBtn?.setAttribute('aria-expanded', 'false');
    menuBtn?.setAttribute('aria-label', 'Open Navigation Menu');

    // Tunggu durasi transisi CSS (550ms) selesai baru tutup dialog
    setTimeout(() => {
      drawer.close();
      drawer.classList.remove('is-closing');
      document.body.style.overflow = '';
      isAnimating = false;
    }, 550);
  };

  // Toggle drawer open/close
  const toggleDrawer = () => {
    if (drawer?.open && drawer.classList.contains('is-open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  };

  // Menu button di header (bisa berfungsi sebagai open & close toggle)
  menuBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    toggleDrawer();
  });

  // Tombol close sekunder di dalam drawer
  closeBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    closeDrawer();
  });

  // Tutup drawer bila salah satu tautan navigasi diklik
  const navLinks = drawer?.querySelectorAll('a');
  navLinks?.forEach((link) => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Intersep tombol Escape agar menutup dengan animasi halus (bukan snap close native)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer?.open) {
      e.preventDefault();
      closeDrawer();
    }
  });

  // Tutup bila mengklik area backdrop dialog
  drawer?.addEventListener('click', (e) => {
    if (e.target === drawer) {
      closeDrawer();
    }
  });
}
