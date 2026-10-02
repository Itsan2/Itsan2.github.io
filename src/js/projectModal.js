/**
 * PROJECT MODAL COMPONENT (projectModal.js)
 * Sesuai ARCHITECTURE.md §2–§4 & MOTION.md §4
 * Supports dynamic project data lookup, video showcases, and rendering.
 */

const PROJECTS_DATA = {
  kaiseki: {
    category: 'Web Engineering / Luxury Dining',
    video: '/video/kaiseki.mp4',
    poster: '/img/projects/kaiseki.png',
    metaYear: '2025',
    metaRole: 'Fullstack & Creative Motion Developer',
    title: 'Kaiseki | Modern Asian Luxury Dining',
    tagline: '"Experience the Art of Modern Asian Dining where Tradition Meets Contemporary Sophistication."',
    liveUrl: 'https://website-food-kaiseki.vercel.app/',
    githubUrl: 'https://github.com/Itsan2/Website-Food-Kaiseki',
    aboutParagraphs: [
      '<strong>KAISEKI</strong> is a luxury dining digital experience engineered for an elite Asian-fusion restaurant chain. Combining contemporary editorial aesthetics with high-performance modern web architecture, the platform delivers a cinematic culinary journey through immersive 3D-like visuals, fluid kinetic motion, and precise typographic craftsmanship.',
      'Every touchpoint—from atmospheric steam reveals on signature dishes to interactive table bookings—is meticulously choreographed to reflect the refinement of modern Japanese and Asian gastronomy.'
    ],
    highlightsTitle: 'Key Architectural Highlights',
    highlights: [
      {
        title: '🏆 Immersive Storytelling',
        desc: 'Scroll-driven brand narrative leveraging GSAP and ScrollTrigger for a dynamic, cinematic journey.'
      },
      {
        title: '🍣 Signature Menu Showcase',
        desc: 'High-fidelity digital culinary curation featuring flavor profiles, artisanal ingredients, and pricing.'
      },
      {
        title: '📜 Fluid Kinetic Motion',
        desc: 'High-performance Lenis smooth scrolling integration for a weightless, responsive feel across all devices.'
      },
      {
        title: '🥂 Frictionless Reservation & Locations',
        desc: 'Streamlined table booking engine validated with React Hook Form and Zod, complete with interactive global location discovery.'
      }
    ],
    stacks: [
      {
        label: 'Core Runtime & Framework',
        pills: ['Next.js 15+ (App Router)', 'React 19', 'TypeScript']
      },
      {
        label: 'Motion & Kinetic Animation',
        pills: ['GSAP 3', 'ScrollTrigger', 'Framer Motion', 'Lenis Smooth Scroll']
      },
      {
        label: 'Styling & UI Systems',
        pills: ['Tailwind CSS 4', 'Lucide React Icons', 'Modern Asian Dark Aesthetics']
      },
      {
        label: 'Form Validation & Deployment',
        pills: ['React Hook Form', 'Zod Schema Validation', 'Vercel Edge Network']
      }
    ]
  },
  perfume: {
    category: 'Luxury E-Commerce / Creative 3D Web',
    video: '/video/store-perfume.mp4',
    poster: '/img/projects/perfume.png',
    metaYear: '2025',
    metaRole: 'Fullstack 3D & Creative Frontend Engineer',
    title: 'PERFUME | Essence of Timeless Seduction',
    tagline: '"A luxury perfume house crafting the essence of timeless seduction. Scent is the invisible architecture of memory."',
    liveUrl: 'https://store-perfume.vercel.app/',
    githubUrl: 'https://github.com/Itsan2/Store-Perfume',
    aboutParagraphs: [
      '<strong>PERFUME</strong> is an avant-garde digital flagship engineered for an artisanal haute parfumerie. Merging sculptural minimalism with cutting-edge 3D WebGL technology and frame-by-frame scroll kinetics, the platform invites visitors into an intimate sensory universe where fragrance, form, and liquid light coalesce.',
      'Every interaction—from the seamless cinematic bottle unveil sequence to the interactive olfactory note discovery—is engineered to mirror the rarity, refinement, and tactile luxury of fine perfumery.'
    ],
    highlightsTitle: 'Key Architectural Highlights',
    highlights: [
      {
        title: '✨ Cinematic Canvas Scroll Sequence',
        desc: 'Frame-by-frame liquid splash and fragrance bottle reveal synchronized precisely to viewport scroll.'
      },
      {
        title: '🏺 Interactive 3D WebGL Showcase',
        desc: 'Real-time 3D spatial renders utilizing Three.js and React Three Fiber (@react-three/fiber & @react-three/drei).'
      },
      {
        title: '🕊️ Weightless Kinetic Flow',
        desc: 'Silky-smooth inertial scrolling powered by Studio Freight Lenis with zero scroll jank.'
      },
      {
        title: '🏛️ Editorial Avant-Garde UI',
        desc: 'Bespoke warm-beige and gold typographic hierarchy, sculptural stat counters, and responsive Bento grid architecture.'
      }
    ],
    stacks: [
      {
        label: 'Core Runtime & Framework',
        pills: ['Next.js 14 (App Router)', 'React 18', 'TypeScript 5']
      },
      {
        label: '3D & Kinetic Animation',
        pills: ['Three.js', 'React Three Fiber (@react-three/fiber)', '@react-three/drei', 'Framer Motion 12', 'Studio Freight Lenis']
      },
      {
        label: 'Styling & UI Systems',
        pills: ['Tailwind CSS 3.4', 'Tailwind Merge & Clsx', 'Lucide React Icons', 'Luxury Haute Parfumerie Aesthetics']
      },
      {
        label: 'State Management & Deployment',
        pills: ['Zustand 5', 'Vercel Edge Platform']
      }
    ]
  }
};

export function initProjectModal() {
  const modal = document.getElementById('projectModal');
  if (!modal) return;

  const triggers = document.querySelectorAll('[data-project-modal-trigger]');
  const closeButtons = modal.querySelectorAll('[data-project-modal-close]');

  const categoryEl = modal.querySelector('[data-modal-field="category"]');
  const videoEl = modal.querySelector('[data-modal-field="video"]');
  const videoSourceEl = modal.querySelector('[data-modal-field="videoSource"]');
  const metaEl = modal.querySelector('[data-modal-field="meta"]');
  const titleEl = modal.querySelector('[data-modal-field="title"]');
  const taglineEl = modal.querySelector('[data-modal-field="tagline"]');
  const liveBtn = modal.querySelector('[data-modal-field="liveBtn"]');
  const githubBtn = modal.querySelector('[data-modal-field="githubBtn"]');
  const aboutCol = modal.querySelector('[data-modal-field="aboutCol"]');
  const stackCol = modal.querySelector('[data-modal-field="stackCol"]');

  let isOpen = false;

  const populateModal = (projectId) => {
    const data = PROJECTS_DATA[projectId];
    if (!data) return;

    if (categoryEl) categoryEl.textContent = data.category;

    if (videoEl && data.video) {
      videoEl.poster = data.poster || '';
      if (videoSourceEl) {
        videoSourceEl.src = data.video;
      } else {
        videoEl.src = data.video;
      }
      videoEl.load();
      videoEl.currentTime = 0;
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }

    if (metaEl) {
      metaEl.innerHTML = `<span>${data.metaYear}</span><span>•</span><span>${data.metaRole}</span>`;
    }
    if (titleEl) titleEl.textContent = data.title;
    if (taglineEl) taglineEl.textContent = data.tagline;

    if (liveBtn) liveBtn.href = data.liveUrl;
    if (githubBtn) githubBtn.href = data.githubUrl;

    if (aboutCol) {
      const paragraphsHtml = data.aboutParagraphs.map(p => `<p class="c-project-modal__paragraph">${p}</p>`).join('');
      const highlightsHtml = data.highlights.map(h => `
        <li>
          <strong>${h.title}:</strong> ${h.desc}
        </li>
      `).join('');

      aboutCol.innerHTML = `
        <h3 class="c-project-modal__section-heading">About The Project</h3>
        ${paragraphsHtml}
        <h4 class="c-project-modal__sub-heading">${data.highlightsTitle}</h4>
        <ul class="c-project-modal__feature-list">
          ${highlightsHtml}
        </ul>
      `;
    }

    if (stackCol) {
      const stackBlocksHtml = data.stacks.map(s => `
        <div class="c-project-modal__stack-block">
          <span class="c-project-modal__stack-label">${s.label}</span>
          <div class="c-project-modal__pills">
            ${s.pills.map(pill => `<span class="c-project-modal__pill">${pill}</span>`).join('')}
          </div>
        </div>
      `).join('');

      stackCol.innerHTML = `
        <h3 class="c-project-modal__section-heading">Technologies &amp; Architecture</h3>
        ${stackBlocksHtml}
      `;
    }

    // Reset scroll of modal content to top
    const content = modal.querySelector('.c-project-modal__content');
    if (content) content.scrollTop = 0;
  };

  const openModal = (projectId) => {
    if (isOpen) return;
    if (projectId) {
      populateModal(projectId);
    }
    isOpen = true;

    // Use native showModal for accessible focus trapping & top-layer positioning
    if (typeof modal.showModal === 'function') {
      modal.showModal();
    } else {
      modal.setAttribute('open', '');
    }

    if (videoEl) {
      videoEl.play().catch(() => {});
    }

    document.body.classList.add('is-modal-active');
    requestAnimationFrame(() => {
      modal.classList.add('is-open');
    });
  };

  const closeModal = () => {
    if (!isOpen) return;
    isOpen = false;

    if (videoEl) {
      videoEl.pause();
    }

    modal.classList.remove('is-open');
    document.body.classList.remove('is-modal-active');

    setTimeout(() => {
      if (typeof modal.close === 'function') {
        modal.close();
      } else {
        modal.removeAttribute('open');
      }
    }, 350);
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = trigger.getAttribute('data-project-modal-trigger') || 'kaiseki';
      openModal(projectId);
    });
  });

  closeButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
    });
  });

  // Close on backdrop click (click outside dialog)
  modal.addEventListener('click', (e) => {
    const dialog = modal.querySelector('.c-project-modal__dialog');
    if (dialog && !dialog.contains(e.target)) {
      closeModal();
    }
  });

  // Handle native cancel (Escape key)
  modal.addEventListener('cancel', (e) => {
    e.preventDefault();
    closeModal();
  });
}
