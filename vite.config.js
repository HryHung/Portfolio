import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
const pages = ['index', 'about', 'amr', 'nexcube', 'hexapod', 'mini-agv', 'printed-lens', 'merc', 'hand-gesture'];
export default defineConfig({
  base: './', // Keep built assets working under GitHub Pages /Portfolio/.
  plugins: [{
    name: 'include-original-cv',
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'asset/file/CV_LeHuyHung.pdf', source: readFileSync(resolve(import.meta.dirname, 'asset/file/CV_LeHuyHung.pdf')) });
    },
  }],
  build: { rollupOptions: { input: Object.fromEntries(pages.map(p => [p, resolve(import.meta.dirname, `${p}.html`)])) } },
});
