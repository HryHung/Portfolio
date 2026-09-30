// User-initiated only. A native link remains usable without JavaScript.
export function setupCVDownload() {
  const trigger = document.querySelector('.cv-trigger');
  const dialog = document.querySelector('.cv-cinema');
  if (!trigger || !dialog || typeof dialog.showModal !== 'function') return;
  const video = dialog.querySelector('video');
  const status = dialog.querySelector('.cinema-status');
  const playButton = dialog.querySelector('.cinema-play');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let phase = 'idle';
  let timers = new Set();
  let downloaded = false;
  let ownsFullscreen = false;
  function requestFullscreen() {
    const root = document.documentElement;
    if (document.fullscreenElement || !root?.requestFullscreen) return;
    // Called from a visitor click: delayed fullscreen requests may be blocked.
    root.requestFullscreen().then(() => {
      ownsFullscreen = true;
      if (phase === 'idle') exitFullscreen();
    }).catch(() => {}); // Keep the edge-to-edge viewport fallback.
  }
  function exitFullscreen() {
    if (ownsFullscreen && document.fullscreenElement === document.documentElement) {
      document.exitFullscreen().catch(() => {});
    }
    ownsFullscreen = false;
  }
  const later = (fn, delay) => {
    const id = setTimeout(() => { timers.delete(id); fn(); }, delay);
    timers.add(id);
  };
  const clearTimers = () => { timers.forEach(clearTimeout); timers.clear(); };
  function cleanup() {
    clearTimers();
    exitFullscreen();
    playButton.hidden = true;
    video.pause();
    video.currentTime = 0;
    phase = 'idle';
    dialog.dataset.phase = '';
    document.body.classList.remove('cinema-open');
    trigger.removeAttribute('aria-busy');
    trigger.focus({ preventScroll: true });
  }
  function download() {
    if (downloaded || phase === 'idle') return;
    downloaded = true;
    const link = document.createElement('a');
    link.href = trigger.href;
    link.download = trigger.download;
    document.body.append(link);
    link.click();
    link.remove();
    dialog.close();
  }
  function reveal() {
    if (phase === 'idle' || phase === 'reveal') return;
    clearTimers();
    playButton.hidden = true;
    video.pause();
    phase = 'reveal';
    dialog.dataset.phase = phase;
    status.textContent = 'Your CV is ready. Starting download…';
    later(download, reduce.matches ? 0 : 1400);
  }
  function playVideo() {
    if (phase !== 'focus') return;
    phase = 'video';
    dialog.dataset.phase = phase;
    status.textContent = 'Playing introduction. You can skip and download at any time.';
    playWithSound();
  }
  function playWithSound() {
    if (phase !== 'video') return;
    playButton.hidden = true;
    video.muted = false;
    video.volume = 1;
    video.play().catch(error => {
      if (phase !== 'video') return;
      if (error.name === 'NotAllowedError') {
        clearTimers();
        playButton.hidden = false;
        status.textContent = 'Your browser needs another click to play sound.';
        playButton.focus();
      } else reveal();
    });
    later(reveal, 20000);
  }
  playButton.addEventListener('click', () => { requestFullscreen(); playWithSound(); });
  trigger.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    if (reduce.matches) return; // Native, immediate download without motion.
    event.preventDefault();
    if (phase !== 'idle') return;
    closeOpenMenu();
    downloaded = false;
    const rect = trigger.getBoundingClientRect();
    dialog.style.setProperty('--focus-x', `${rect.left + rect.width / 2}px`);
    dialog.style.setProperty('--focus-y', `${rect.top + rect.height / 2}px`);
    phase = 'focus';
    requestFullscreen();
    dialog.dataset.phase = phase;
    trigger.setAttribute('aria-busy', 'true');
    status.textContent = 'Preparing your CV…';
    dialog.showModal();
    document.body.classList.add('cinema-open');
    video.load();
    later(playVideo, 2200);
  });
  function closeOpenMenu() {
    document.querySelector('.menu-toggle')?.setAttribute('aria-expanded', 'false');
    document.querySelector('#nav-links')?.classList.remove('is-open');
  }
  video.addEventListener('ended', reveal);
  video.addEventListener('error', () => { if (phase !== 'idle') reveal(); });
  dialog.querySelector('.cinema-skip').addEventListener('click', download);
  dialog.querySelector('.cinema-cancel').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', cleanup);
  dialog.addEventListener('cancel', () => { clearTimers(); video.pause(); });
  reduce.addEventListener('change', () => { if (reduce.matches && phase !== 'idle') download(); });
  window.addEventListener('pagehide', () => { if (dialog.open) dialog.close(); });
}
