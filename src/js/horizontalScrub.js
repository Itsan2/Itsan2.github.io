import { Splide } from '@splidejs/splide';
import '@splidejs/splide/dist/css/splide-core.min.css';
import projectsData from '../content/projects.json';

export function getProjectList() {
  return projectsData.projects || [];
}

export function initHorizontalScrub() {
  const splideEl = document.querySelector('.splide');
  if (!splideEl) return;

  const splide = new Splide(splideEl, {
    type: 'slide',
    perPage: 2,
    gap: '3rem',
    arrows: true,
    pagination: false,
    speed: 800,
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    breakpoints: {
      1023: {
        perPage: 1,
        gap: '1.5rem'
      }
    }
  });

  splide.mount();
  return splide;
}
