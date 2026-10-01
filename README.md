# Le Huy Hung — Engineering Portfolio

Nine complete static HTML pages, built with Vite, semantic HTML, shared CSS, and small JavaScript enhancements. All content renders without JavaScript; JavaScript adds the mobile menu and native-dialog image viewer. No deployment is configured or performed.

## Run locally

Private visit, project engagement, and CV event tracking is configured with your Umami Website ID in `src/analytics-config.js`. Tracking runs on `hryhung.github.io/Portfolio/` after deployment; local previews are excluded. See [ANALYTICS.md](ANALYTICS.md) for private dashboard setup, CSV exports, event meanings, and GitHub Pages deployment.

Requires Node.js 18+ (Node.js 22 recommended) and npm.

```sh
npm install
npm run dev
```

Development: http://127.0.0.1:5173

```sh
npm run build
npm run preview -- --port 4173
```

Production preview: http://127.0.0.1:4173

The build outputs to `dist/`. Every page is a real `.html` file, supporting direct navigation, refresh, and browser history without server rewrite rules.

## Edit content and appearance

- `src/home.js` and `src/home-cinema.css`: darkened wallpaper Home, centered CV action, and full-viewport download presentation.
- `src/cv-download.js`: click → 2.2-second energy focus → supplied 8.85-second video → 1.4-second CV icon reveal/fade → PDF download. Video plays with sound after the click. If the browser blocks delayed audible playback, a Play with sound button provides a direct user gesture. Skip downloads immediately; Close/Escape cancels. Reduced motion and JavaScript-disabled visitors use the native download link. Playback failure or a 20-second stall timeout proceeds to the CV reveal and download. Video fills the screen with cover framing (edges may crop on different aspect ratios). The download click requests browser fullscreen, falling back to the full viewport when unsupported or denied; completion or cancellation exits fullscreen only if the sequence entered it.
- `asset/file/animation_cv_download.mp4`: supplied clip, preserved unchanged; Vite packages it into the production build. It is not preloaded on page entry.

- `src/content.js`: project identity, exact hero asset names, three design specifications, tools, and results-image references.
- `src/case-studies.js`: source-reviewed abstracts, engineering sections, supporting images, process diagrams, achievements, and evidence limits.
- `src/profile.js`: CV-grounded education, exact positions/dates, responsibility bullets, and requested skill groups.
- `src/icons.js`: consistent contact, brand, navigation, and skill icons.
- `scripts/generate.mjs`: shared HTML, navigation, Home and About content, metadata, and image dimensions. Run `npm run generate` after editing; development and build commands also regenerate pages.
- `src/style.css`: centered 1180px layout, compact two-column openings, reusable image treatments, sticky navigation, tool pills, and reduced-motion behavior.
- `src/main.js`: accessible mobile disclosure menu, image dialog with animated close/Escape/focus restoration, once-only section reveals, and optional desktop arrow navigation.
- `asset/`: original supplied images, preserved with their filenames and extensions. Image paths are relative and Vite includes referenced assets in the build.
- `favicon2.svg`: red, black, and white mark.

Manrope and IBM Plex Mono are loaded from Google Fonts with local fallbacks when offline. Images use contain framing, intrinsic dimensions, and lazy loading below the opening.

## Page order

`index.html` → `about.html` → `amr.html` → `nexcube.html` → `hexapod.html` → `mini-agv.html` → `printed-lens.html` → `merc.html` → `hand-gesture.html` → Home.

## Sources and factual boundaries

- The actual CV is `asset/file/CV_LeHuyHung.pdf`. The Home download links to it; the Vite build explicitly includes the unchanged PDF. Education and employment entries now use the CV. Its “Present” dates are retained; no graduation completion is inferred from its expected August 2026 graduation date.
- All seven pages of `asset/file/project_doc/Le_Huy_Hung_Portfolio2.pdf` were visually reviewed. The AMR and AGV reports, NEXCUBE disclosure, hand-gesture report, and Hexapod/MERC notes informed the narrative. Stronger unsupported claims in the portfolio PDF were not promoted into measured results.
- The lens technical-practice report was found and read at the user-supplied external path. It is not copied into this workspace or the published build.
- [SOURCES.md](SOURCES.md) records the source locations, precedence, and unresolved evidence gaps.
- The original source attribution for `asset/printedcam/principle.jpg` was not supplied or visible in the image. The caption identifies the attribution gap; update it when the source is known.

All requested project images, wallpaper, university logo, and organization logos were found.

## Verification

With the production preview running:

```sh
python scripts/verify.py http://127.0.0.1:4173
node scripts/test-cv-download.mjs
```

This checks all nine built pages over HTTP, Previous/Next order including wraparound, current-page markers, metadata, exactly three specifications and two to four engineering sections per project, About positions/dates, image dimensions, and local resource references. The downloaded CV must have the PDF content type and match the original file byte-for-byte by SHA-256. It does not substitute for visual browser testing.

The original assets are preserved. Extracted source text, PDF page renders, and previous implementation snapshots live in ignored `.verification/` and are not included in the production build.

Revision checks passed: production build, JavaScript syntax, all nine direct page URLs, all 50 local resource references, CV PDF content type and SHA-256 identity, contact destinations, page navigation, and source-backed About entries. Project narratives range from 271 words for the short MERC note to 490 for AMR, with two to four engineering sections each.

Browser verification remains pending because no browser was connected in the authoring environment. Check 360px, 768px, 1366×768, and 1440×900 at 100% zoom for overflow/readability; test menu activation and Escape, image open/close and focus restoration, Back/Forward, and reduced motion. Check browser console errors. Source PDFs and images have been visually reviewed; that is not a rendered website review.
