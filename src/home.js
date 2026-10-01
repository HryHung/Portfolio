import { icon } from './icons.js';
export function home() {
  return `<section class="cinematic-home">
    <img class="home-backdrop" src="./asset/general/wallpaper.png" width="1366" height="768" alt="" fetchpriority="high">
    <div class="home-shade"></div>
    <div class="cinematic-copy entrance"><p class="eyebrow">MECHATRONICS / ROBOTICS / INTEGRATION</p>
      <h1>Le Huy Hung<span class="red">.</span></h1>
      <p class="profession">Mechatronics &amp; Robotics Engineer</p>
      <p class="summary">A BK-er who loves robotics and building things that work. I connect mechanical design, embedded electronics, and software to turn ideas into working robotic systems.</p>
    </div>
    <div class="cv-center"><a class="cv-trigger button" href="./asset/file/CV_LeHuyHung.pdf" download="Le-Huy-Hung-CV.pdf">${icon('download')}<span>Download CV</span><span class="button-glint" aria-hidden="true"></span></a>
      <a class="explore-link" href="./about.html">Explore my work ${icon('arrow')}</a>
    </div>
    <address class="cinematic-contacts">
      <a href="tel:+84375255155">${icon('phone')}+84 375 255 155</a>
      <span>${icon('location')}Ho Chi Minh City, Vietnam</span>
      <a href="mailto:huyhuzg@gmail.com">${icon('email')}huyhuzg@gmail.com</a>
      <a aria-label="Le Huy Hung on GitHub" href="https://github.com/HryHung" target="_blank" rel="noopener noreferrer">${icon('github')}GitHub</a>
      <a aria-label="Le Huy Hung on LinkedIn" href="https://www.linkedin.com/in/hung-le-huy-09823627b/" target="_blank" rel="noopener noreferrer">${icon('linkedin')}LinkedIn</a>
    </address>
  </section>
  <dialog class="cv-cinema" aria-label="CV download introduction">
    <div class="cinema-darkness"></div>
    <div class="energy-stage" aria-hidden="true"><div class="energy-core"><i></i><i></i><i></i><span class="energy-button">${icon('download')} Download CV</span></div></div>
    <video class="cv-video" src="./asset/file/animation_cv_download.mp4" preload="none" playsinline aria-label="Genshin Impact CV introduction"></video>
    <button type="button" class="cinema-play" hidden>▶ Play with sound</button>
    <div class="cv-reveal" aria-hidden="true"><div class="cv-document">${icon('download')}<strong>CV</strong></div><p>Le Huy Hung</p></div>
    <div class="cinema-controls"><button type="button" class="cinema-skip" aria-label="Skip animation and download CV">Skip</button><button type="button" class="cinema-cancel" aria-label="Cancel download animation">Close ×</button></div>
    <p class="cinema-status" role="status" aria-live="polite">Preparing your CV…</p>
  </dialog>`;
}
