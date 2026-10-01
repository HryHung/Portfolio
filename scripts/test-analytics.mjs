import assert from 'node:assert/strict';
import { createAnalytics } from '../src/analytics.js';

function fixture({ path = '/Portfolio/amr.html', hostname = 'hryhung.github.io', id = '11111111-1111-4111-8111-111111111111', optOut = false, dnt = false, gpc = false, hidden = false } = {}) {
  const target = () => ({
    listeners: {},
    addEventListener(name, fn) { (this.listeners[name] ??= []).push(fn); },
    emit(name, event = {}) { this.listeners[name]?.forEach(fn => fn(event)); },
  });
  let now = 0;
  const scripts = [], events = [], intervals = new Set();
  const win = Object.assign(target(), {
    location: { hostname, pathname: path },
    navigator: { doNotTrack: dnt ? '1' : '0', globalPrivacyControl: gpc },
    localStorage: { getItem: () => optOut ? '1' : null },
    performance: { now: () => now },
    setInterval(fn) { intervals.add(fn); return fn; },
    clearInterval(fn) { intervals.delete(fn); },
    innerHeight: 800, scrollY: 0,
  });
  const doc = Object.assign(target(), {
    visibilityState: hidden ? 'hidden' : 'visible',
    referrer: 'https://example.com/private/path?email=secret@example.com#secret',
    documentElement: { scrollHeight: 2800 },
    head: { append: script => scripts.push(script) },
    createElement: () => Object.assign(target(), { dataset: {} }),
  });
  const client = createAnalytics(win, doc, { websiteId: id, hostname: 'hryhung.github.io', basePath: '/Portfolio/', scriptUrl: 'https://cloud.umami.is/script.js' });
  return { win, doc, client, scripts, events,
    load() {
      win.umami = { track(fn) { events.push(fn({ website: id, url: `${path}?secret=yes#secret`, referrer: doc.referrer })); return Promise.resolve(); } };
      scripts[0].emit('load');
    },
    tick(ms) { now += ms; [...intervals].forEach(fn => fn()); },
  };
}

for (const options of [{ id: '' }, { hostname: 'localhost' }, { path: '/Other/' }, { optOut: true }, { dnt: true }, { gpc: true }]) {
  const f = fixture(options); f.client.start(); f.client.track('cv_click');
  assert.equal(f.scripts.length, 0);
  assert.equal(f.events.length, 0);
}
console.log('PASS missing configuration, development, other sites, owner opt-out, DNT, GPC send nothing');

let f = fixture(); f.client.start(); f.client.start();
assert.equal(f.scripts.length, 1);
assert.equal(f.scripts[0].dataset.autoTrack, 'false');
f.client.track('cv_click'); f.load();
assert.deepEqual(f.events.map(e => e.name), [undefined, 'project_view', 'cv_click']);
assert.ok(f.events.every(e => e.url === '/Portfolio/amr.html' && e.referrer === 'https://example.com'));
assert.ok(!JSON.stringify(f.events).includes('secret'));
console.log('PASS one pageview, queued events, project identification, URL/referrer privacy');

f.tick(15000);
f.doc.visibilityState = 'hidden'; f.doc.emit('visibilitychange');
f.tick(120000);
assert.deepEqual(f.events.filter(e => e.name === 'project_visible_time').map(e => e.data.seconds), [15]);
f.doc.visibilityState = 'visible'; f.doc.emit('visibilitychange');
f.tick(15000); f.tick(30000); f.tick(30000);
assert.deepEqual(f.events.filter(e => e.name === 'project_visible_time').map(e => e.data.seconds), [15, 30, 60]);
f.win.scrollY = 1000; f.win.emit('scroll'); f.win.emit('scroll');
f.win.scrollY = 1800; f.win.emit('scroll');
assert.deepEqual(f.events.filter(e => e.name === 'project_scroll').map(e => e.data.percent), [50, 90]);
console.log('PASS hidden time excluded; visible-time and scroll milestones emitted once');

f = fixture({ path: '/Portfolio/index.html' }); f.client.start(); f.load(); f.tick(60000);
assert.equal(f.events.length, 1);
f.win.umami.track = () => { throw Error('blocked'); };
assert.doesNotThrow(() => f.client.track('cv_click'));
f.win.umami.track = () => Promise.reject(Error('network failure'));
f.client.track('cv_download_requested'); await Promise.resolve();
f = fixture(); f.client.start(); f.scripts[0].emit('error');
assert.doesNotThrow(() => f.client.track('cv_click'));
assert.equal(f.events.length, 0);
console.log('PASS Home has no project events; blocked/broken analytics does not throw');
