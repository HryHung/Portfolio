import { analyticsConfig } from './analytics-config.js';

const projects = new Set(['amr', 'nexcube', 'hexapod', 'mini-agv', 'printed-lens', 'merc', 'hand-gesture']);
let client;

// A separate client also lets tests verify privacy and timing without contacting Umami.
export function createAnalytics(win, doc, config) {
  let started = false, enabled = false, ready = false;
  let queue = [];
  const page = win.location.pathname.split('/').pop()?.replace(/\.html$/, '') || 'index';
  const project = projects.has(page) ? page : null;
  function optedOut() {
    if (win.navigator.doNotTrack === '1' || win.navigator.globalPrivacyControl === true) return true;
    try { return Boolean(win.localStorage.getItem('umami.disabled')); }
    catch { return false; }
  }
  function referrerOrigin() {
    try { return new URL(doc.referrer).origin; } catch { return ''; }
  }
  function send(event) {
    if (optedOut()) return;
    try {
      // Use Umami's defaults for browser metadata, but never send query strings,
      // fragments, or the referring page's path. No identify() or visitor IDs.
      const result = win.umami.track(props => ({
        ...props,
        url: win.location.pathname,
        referrer: referrerOrigin(),
        ...(event.name ? { name: event.name, data: event.data } : {}),
      }));
      Promise.resolve(result).catch(() => {});
    } catch { /* Analytics must never interrupt navigation or CV downloads. */ }
  }
  function track(name, data = {}) {
    if (!enabled || optedOut()) return;
    const event = { name, data: { page, ...data } };
    if (ready) send(event);
    else if (queue.length < 30) queue.push(event);
  }
  function setupProjectEvents() {
    if (!project) return;
    track('project_view', { project });
    const scrollMilestones = new Set();
    win.addEventListener('scroll', () => {
      if (doc.visibilityState !== 'visible') return;
      const distance = doc.documentElement.scrollHeight - win.innerHeight;
      if (distance <= 0 || win.scrollY <= 0) return;
      const percent = Math.min(100, 100 * win.scrollY / distance);
      for (const milestone of [50, 90]) {
        if (percent >= milestone && !scrollMilestones.has(milestone)) {
          scrollMilestones.add(milestone);
          track('project_scroll', { project, percent: milestone });
        }
      }
    }, { passive: true });

    // Visible-tab time is an engagement signal, not proof someone read the page.
    let seconds = 0, last = win.performance.now();
    let visible = doc.visibilityState === 'visible';
    const timeMilestones = new Set();
    function updateTime() {
      const now = win.performance.now();
      if (visible) seconds += (now - last) / 1000;
      last = now;
      visible = doc.visibilityState === 'visible';
      for (const milestone of [15, 30, 60]) {
        if (seconds >= milestone && !timeMilestones.has(milestone)) {
          timeMilestones.add(milestone);
          track('project_visible_time', { project, seconds: milestone });
        }
      }
      if (timeMilestones.has(60)) win.clearInterval(timer);
    }
    const timer = win.setInterval(updateTime, 1000);
    doc.addEventListener('visibilitychange', updateTime);
    win.addEventListener('pagehide', () => { updateTime(); visible = false; });
    win.addEventListener('pageshow', () => {
      last = win.performance.now();
      visible = doc.visibilityState === 'visible';
    });
    doc.addEventListener('click', event => {
      if (event.target.closest?.('[data-enlarge]')) track('project_image_open', { project });
    });
  }
  function start() {
    if (started) return;
    started = true;
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(config.websiteId)) return;
    if (win.location.hostname !== config.hostname || !win.location.pathname.startsWith(config.basePath) || optedOut()) return;
    let scriptUrl;
    try { scriptUrl = new URL(config.scriptUrl); } catch { return; }
    if (scriptUrl.protocol !== 'https:') return;
    enabled = true;
    queue.push({}); // One page view per document, before any queued custom events.
    const script = doc.createElement('script');
    script.src = scriptUrl.href;
    script.async = true;
    script.dataset.websiteId = config.websiteId;
    script.dataset.autoTrack = 'false';
    script.dataset.domains = config.hostname;
    script.dataset.doNotTrack = 'true';
    script.dataset.excludeSearch = 'true';
    script.dataset.excludeHash = 'true';
    script.addEventListener('load', () => {
      if (typeof win.umami?.track !== 'function') { enabled = false; queue = []; return; }
      ready = true;
      queue.splice(0).forEach(send);
    });
    script.addEventListener('error', () => { enabled = false; queue = []; });
    doc.head.append(script);
    setupProjectEvents();
  }
  return { start, track };
}

export function setupAnalytics() {
  client ??= createAnalytics(window, document, analyticsConfig);
  client.start();
}

export function trackEvent(name, data) {
  client?.track(name, data);
}
