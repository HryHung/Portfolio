import assert from 'node:assert/strict';
import { setupCVDownload } from '../src/cv-download.js';

// Deterministic lifecycle checks; these do not replace rendered browser testing.
function fixture({ reduced = false, rejected = false } = {}) {
  let downloads = 0, plays = 0, now = 0, timerId = 0;
  const timers = new Map();
  class Element {
    listeners = {}; dataset = {}; open = false; currentTime = 0;
    style = { setProperty() {} };
    classList = { add() {}, remove() {} };
    addEventListener(name, fn) { (this.listeners[name] ??= []).push(fn); }
    emit(name, event = {}) { this.listeners[name]?.forEach(fn => fn(event)); }
    setAttribute() {} removeAttribute() {} focus() { this.focused = true; }
    getBoundingClientRect() { return { left: 100, top: 100, width: 250, height: 68 }; }
    showModal() { this.open = true; }
    close() { this.open = false; this.emit('close'); }
    load() {} pause() {}
    play() { plays++; return rejected ? Promise.reject(Error('blocked')) : Promise.resolve(); }
    click() { downloads++; } remove() {}
  }
  const trigger = new Element(); trigger.href = '/cv.pdf'; trigger.download = 'cv.pdf';
  const dialog = new Element(), video = new Element(), skip = new Element(), cancel = new Element(), playButton = new Element();
  const media = new Element(); media.matches = reduced;
  dialog.querySelector = s => ({ video, '.cinema-status': {}, '.cinema-skip': skip, '.cinema-cancel': cancel, '.cinema-play': playButton })[s];
  globalThis.document = {
    querySelector: s => ({ '.cv-trigger': trigger, '.cv-cinema': dialog })[s],
    createElement: () => new Element(), body: { append() {}, classList: { add() {}, remove() {} } },
  };
  globalThis.window = new Element();
  globalThis.matchMedia = () => media;
  globalThis.setTimeout = (fn, delay) => { const id = ++timerId; timers.set(id, {fn, due: now + delay}); return id; };
  globalThis.clearTimeout = id => timers.delete(id);
  setupCVDownload();
  return { trigger, dialog, video, skip, cancel, media,
    click() { const e = { button: 0, prevented: false, preventDefault() { this.prevented = true; } }; trigger.emit('click',e); return e; },
    tick(ms) { const target = now + ms; while (true) { const next = [...timers].sort((a,b)=>a[1].due-b[1].due)[0]; if (!next || next[1].due > target) break; now = next[1].due; timers.delete(next[0]); next[1].fn(); } now = target; },
    get downloads() { return downloads; }, get plays() { return plays; }, get pending() { return timers.size; },
  };
}
let f = fixture(); f.click(); f.click(); assert.equal(f.dialog.dataset.phase,'focus');
f.tick(2200); assert.equal(f.plays,1); assert.equal(f.downloads,0);
assert.equal(f.video.muted,false); assert.equal(f.video.volume,1);
f.video.emit('ended'); assert.equal(f.dialog.dataset.phase,'reveal'); f.tick(1400);
assert.equal(f.downloads,1); assert.equal(f.dialog.open,false); assert.equal(f.pending,0); assert.ok(f.trigger.focused);
f.click(); f.skip.emit('click'); assert.equal(f.downloads,2); f.tick(30000); assert.equal(f.downloads,2);
console.log('PASS full sequence, duplicate-click protection, replay, skip, focus restoration');
f = fixture(); f.click(); f.dialog.emit('cancel'); f.dialog.close(); f.tick(30000); assert.equal(f.downloads,0);
f = fixture(); f.click(); f.tick(2200); f.cancel.emit('click'); f.tick(30000); assert.equal(f.downloads,0);
console.log('PASS cancellation during focus and playback leaves no delayed download');
f = fixture({rejected:true}); f.click(); f.tick(2200); await Promise.resolve(); f.tick(1400); assert.equal(f.downloads,1);
f = fixture(); f.click(); f.tick(23600); assert.equal(f.downloads,1);
f = fixture(); f.click(); f.video.emit('error'); f.tick(1400); assert.equal(f.downloads,1);
console.log('PASS rejected playback, stall timeout, and media error fallback');
f = fixture({reduced:true}); assert.equal(f.click().prevented,false); assert.equal(f.dialog.open,false); assert.equal(f.plays,0);
console.log('PASS reduced motion retains immediate native download');
