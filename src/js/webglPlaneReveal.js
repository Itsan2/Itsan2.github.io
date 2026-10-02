/**
 * WEBGL PLANE REVEAL MODULE (webglPlaneReveal.js)
 * Sesuai ARCHITECTURE.md §1 & §6, MOTION.md §4 & §6, PRD Phase 5
 * Di-load secara lazy hanya setelah ba-non-critical-ready dan bila WebGL aktif.
 */
import * as THREE from 'three';

export function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
}

export function initWebGLPlaneReveal() {
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReducedMotion || !isWebGLAvailable()) {
    return;
  }

  const stage = document.querySelector('[data-plane-reveal-stage]') || document.querySelector('.p-top-fv');
  if (!stage) return;

  const canvas = document.createElement('canvas');
  canvas.setAttribute('data-plane-reveal-canvas', 'true');
  canvas.style.position = 'absolute';
  canvas.style.inset = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '1';
  canvas.style.opacity = '0.7';

  stage.prepend(canvas);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, stage.clientWidth / stage.clientHeight, 0.1, 100);
  camera.position.z = 5;

  // Geometry & Material
  const geometry = new THREE.PlaneGeometry(6, 3.5, 32, 32);
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#609aae') }
    },
    vertexShader: `
      uniform float uTime;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        vec3 pos = position;
        pos.z += sin(pos.x * 2.0 + uTime * 0.8) * 0.08;
        pos.z += cos(pos.y * 2.0 + uTime * 0.6) * 0.06;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      varying vec2 vUv;
      void main() {
        float alpha = smoothstep(0.0, 0.8, sin(vUv.x * 3.1415) * sin(vUv.y * 3.1415)) * 0.25;
        gl_FragColor = vec4(uColor, alpha);
      }
    `,
    transparent: true,
    wireframe: false
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const resize = () => {
    if (!stage) return;
    const width = stage.clientWidth;
    const height = stage.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };
  resize();
  window.addEventListener('resize', resize, { passive: true });

  let animationFrameId;
  const startTime = performance.now();

  const animate = () => {
    const elapsedTime = (performance.now() - startTime) * 0.001;
    material.uniforms.uTime.value = elapsedTime;
    mesh.rotation.y = Math.sin(elapsedTime * 0.2) * 0.05;
    mesh.rotation.x = Math.cos(elapsedTime * 0.15) * 0.03;
    renderer.render(scene, camera);
    animationFrameId = requestAnimationFrame(animate);
  };

  // Mulai render loop
  animate();

  // Return cleanup function
  return () => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('resize', resize);
    renderer.dispose();
    geometry.dispose();
    material.dispose();
    canvas.remove();
  };
}
