# Creative Developer & Designer Portfolio

> Implementation inspired by the visual direction, layout hierarchy, motion engineering, and interaction patterns of `bright-avenue.jp`.

---

## 1. Project Summary
Proyek ini adalah implementasi portofolio personal yang dibangun dengan fondasi vanilla ESM + Vite, mengadopsi prinsip desain visual premium dan koreografi animasi presisi seluruh konten merupakan portofolio personal (karya kreatif, rekayasa web, motion, dan interaksi) tanpa menyertakan aset atau merek proprietary referensi.

## 2. Goal
- Menghadirkan pengalaman web portfolio kelas dunia yang memukau (*wow factor*), berkinerja tinggi, dan interaktif.
- Mengimplementasikan state machine loading 2-scene dengan transisi curtain mulus.
- Membangun animasi berbasis data-hooks (`data-*`) yang bersih, modular, dan terisolasi.
- Menjamin *progressive enhancement* sehingga konten utama tetap dapat dibaca secara penuh tanpa JavaScript (*no-JS degradation*).
- Menghormati preferensi pengguna (*prefers-reduced-motion: reduce*) dan standard aksesibilitas WCAG.

## 3. Design Direction
- **Palet Warna:** Latar belakang terang tenang (`#f6f6f6`), tipografi kontras elegan (`#333333`), aksen biru brand (`#609aae`), variasi netral beige hangat (`#D9D4D4`, `#e3d3d3`, `#afa3a3`), dan blok kontras putih bersih (`#ffffff`).
- **Tipografi:** Google Fonts modern (Inter / Plus Jakarta Sans) dengan heading clamp responsif, line-height rapat (1.1–1.3), serta label kategori uppercase ber-tracking longgar.
- **Rhythm & Grid:** Padding kontainer desktop `4rem` (SP: `1.5rem`), gap antar kolom `4rem`, sistem 4 dan 5 kolom fluid berbasis kalkulasi variabel CSS (`--js-clientWidth`).
- **Signature Visuals:** Video/poster loop hero dengan perlakuan background-text clip, kartu proyek dengan clip-path mask-slide reveal, dan indikator navigasi scroll beranimasi mikro.

## 4. Tech Stack
- **Bundler & Build Tool:** Vite 6 (Vanilla JavaScript, ESM native).
- **Core Engine:** HTML5 Semantik, Vanilla CSS3 (Custom Properties & GPU-accelerated transforms).
- **Motion & Smooth Scroll:** GSAP 3 (ScrollTrigger), Lenis Smooth Scroll.
- **Carousel & Sliders:** Splide.
- **3D / WebGL (Tier-2):** Three.js (lazy loaded setelah non-critical ready, chunk `three-vendor`).

## 5. Project Structure
```
/
├── README.md               # Dokumentasi utama dan status proyek
├── index.html              # Entry HTML semantik dan inline critical CSS
├── package.json            # Manifest dependensi & scripts
├── vite.config.js          # Konfigurasi bundler Vite (chunking three-vendor)
├── public/
│   ├── favicon.svg         # Favicon brand
│   ├── fonts/              # Woff2 webfonts
│   ├── img/                # WebP/AVIF media & poster blur
│   └── video/              # Video latar hero FV
└── src/
    ├── styles/
    │   ├── tokens.css      # CSS Variables (:root) warna, font, grid
    │   ├── base.css        # Reset, tipografi dasar, kontainer, focus-visible
    │   ├── components.css  # Header 10rem, drawer, cards, buttons, marquee
    │   └── sections.css    # Penataan layout 11 section
    ├── js/
    │   ├── main.js         # Non-critical bundle entry point & Lenis loop
    │   ├── loading.js      # Loading 2-scene state machine & scroll-lock
    │   ├── lineTextReveal.js # Reveal heading & text-fill via ScrollTrigger
    │   ├── imageReveal.js  # Reveal gambar mask-slide
    │   ├── parallax.js     # Section & background scale parallax
    │   ├── horizontalScrub.js # Scrubbing galeri project Splide
    │   ├── marquee.js      # Infinite loop text/client marquee
    │   ├── webglPlaneReveal.js # Transisi WebGL tier-2 (lazy)
    │   ├── cursor.js       # Custom cursor interaktif (pointer: fine only)
    │   └── header.js       # Header scroll hide/show & drawer controller
    └── content/
        └── projects.json   # Data proyek portofolio terstruktur
```

## 6. Setup & Installation
Pastikan Node.js (>= 18) telah terpasang di sistem.
```bash
# Install dependensi
npm install
```

## 7. Development, Build & Preview Commands
```bash
# Menjalankan dev server lokal
npm run dev

# Menghasilkan static production bundle ke dist/
npm run build

# Menjalankan server preview lokal dari direktori dist/
npm run preview
```

## 8. Content Management
Seluruh data proyek dikelola secara terstruktur melalui file `src/content/projects.json`

## 9. Animation Architecture
- **Hook-Driven:** Semua interaksi dan animasi dipicu eksklusif menggunakan atribut `data-*` (`data-line-reveal`, `data-text-fill-reveal`, `data-image-reveal`, `data-section-parallax`, `data-marquee-scroll-scrub`, `data-lenis-prevent`).
- **Single rAF & Single Registry:** GSAP ScrollTrigger disinkronkan secara mulus ke Lenis smooth scroll melalui satu loop `requestAnimationFrame` (`gsap.ticker.add`).
- **Dua Tahap Pemuatan (Phased Bootstrapping):**
  1. *Critical Phase:* Inline background first-paint `#609aae`, `loading.js` curtain 2-scene, font FV check, memancarkan event `ba-fv-critical-ready`.
  2. *Non-Critical Phase:* Memancarkan `ba-non-critical-ready`, lalu memuat modul non-kritis via dynamic import tanpa membebani First Contentful Paint. Three.js dipecah ke chunk `three-vendor` dan hanya dimuat secara lazy jika WebGL aktif.

## 10. Performance Targets
- **CLS (Cumulative Layout Shift):** 0 terverifikasi (dimensi eksplisit `width="800" height="500"` dan CSS `aspect-ratio: 16 / 10` pada seluruh gambar).
- **LCP (Largest Contentful Paint):** Preload gambar poster hero FV berprioritas tinggi (`fetchpriority="high"`).
- **Chunk Size Budget:** Bundler utama JS non-kritis = 176.84 kB (berada di bawah batas maksimum 180 kB sesuai `ARCHITECTURE.md` §5).

## 11. Accessibility
- Fallback lengkap `@media (prefers-reduced-motion: reduce)` pada CSS dan pengecekan runtime via `window.matchMedia` di setiap modul JS.
- Navigasi keyboard penuh dengan `:focus-visible` ring terlihat dan dialog drawer accessible (`Escape` untuk menutup, focus trap).
- Progressive enhancement: Blok `<noscript>` memastikan seluruh konten dan layout tampil sempurna tanpa JavaScript.

## 12. Browser & Responsive Strategy
- **Pendekatan:** Desktop-first (target viewport $\ge 1024\text{px}$) dengan override ke mobile/tablet (`max-width: 1023px`) dan layar compact (`max-width: 767px`).
- **Ultra-wide constraints:** Pembatasan lebar maksimum pada kontainer `max-width: 1600px`.
- **Device Capabilities:** Efek hover mikro dan custom cursor dikarantina menggunakan `@media (hover: hover) and (pointer: fine)`.

## 13. Known Limitations
- Modul Three.js WebGL sengaja diatur sebagai Tier-2 dengan pemuatan malas (`dynamic import`), sehingga jika perangkat klien tidak mendukung WebGL atau mengaktifkan reduced-motion, shader tidak dijalankan dan digantikan oleh poster visual statis.

## 14. Verification Status
- **Status Build (`npm run build`):** SUKSES (Dist generated: `dist/index.html` 23.02 kB, `dist/assets/main-BfKfoI_x.css` 25.37 kB, `dist/assets/main-BgQvlrsx.js` 177.18 kB, `dist/assets/three-vendor-8XBNpc-W.js` 512.43 kB).
- **Status Dev Server (`npm run dev`):** SUKSES (Berjalan dan merespons HTTP 200 di port 5173).
- **Status Preview Server (`npm run preview`):** SUKSES (Merespons HTTP 200 untuk HTML dan aset statis di port 4173).
- **Status Asset Endpoint:** 100% dari seluruh stylesheet, script, font, dan gambar WebP mengembalikan kode status HTTP 200 tanpa satupun 404.
- **Status Runtime Console:** 0 error, 0 warning (Three.js deprecation resolved, clean CDP live session).

## 15. Deployment Notes
- Build statis dihasilkan ke folder `dist/` melalui perintah `npm run build`.
- Siap dideploy langsung ke provider hosting statis seperti Vercel, Netlify, Cloudflare Pages, GitHub Pages, atau server Apache/Nginx.

## 16. Troubleshooting
- **Port 5173 terpakai:** Vite otomatis mengikat ke port berikutnya (misal 5174). Anda dapat menentukan port spesifik via `npm run dev -- --port <NOMOR_PORT>`.
- **Animasi kursor tidak muncul:** Kursor khusus secara sengaja hanya aktif pada perangkat desktop dengan tetikus (`(hover: hover) and (pointer: fine)`). Pada layar sentuh, kursor standar sistem operasi digunakan.
- **Preloader terlewati secara instan:** Jika pengguna menavigasi via tombol Back/Forward browser, `loading.js` mendeteksi `back_forward` navigation dan secara cerdas melewati animasi pembuka untuk kenyamanan navigasi.

## 17. Contribution & AI Agent Working Rules
- **Anti-Hallucination:** Jangan mengklaim pengujian yang belum dijalankan. Seluruh klaim harus disertai bukti eksekusi perintah terminal atau inspeksi berkas nyata.
- **Hook Protocol:** Gunakan atribut `data-*` sebagai API animasi. Dilarang menargetkan elemen animasi via class acak yang di-hardcode dalam JavaScript.
- **Design Token Strictness:** Seluruh warna, ukuran font, dan margin wajib merujuk ke token `:root` di `DESIGN.md`.
- **Vanilla ESM Only:** Dilarang menginstal framework reaktif (React, Vue, Svelte, Tailwind) di luar kesepakatan arsitektur.
