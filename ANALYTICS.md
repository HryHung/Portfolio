# Private portfolio analytics

The GitHub Pages site sends anonymous usage events to your Umami account. GitHub Pages cannot write a private server log. Records live in Umami, with CSV export available through Umami Cloud. No log file or admin password is published with this site.

## Activate

Your supplied Umami Cloud Website ID is configured in `src/analytics-config.js`. Continue with steps 4–6 to check dashboard privacy, publish, and verify live events.

1. Sign in to [Umami Cloud](https://cloud.umami.is/) (or your own Umami server).
2. Add a website named **Portfolio**, with domain **hryhung.github.io**.
3. Open that website's **Tracking code** settings. Copy `data-website-id` and the script `src` into `websiteId` and `scriptUrl` in `src/analytics-config.js`. Keep the domain and `/Portfolio/` path as configured. The Website ID is public and does not grant access to reports. Never add an API key, password, or share URL to the source.
4. Keep **Share URL** disabled and do not grant other users or teams access to this website. Reports require your Umami login; the service operator also hosts the data.
5. Run `npm run build`. Publish through your existing GitHub Pages process. For a branch-root deployment, include the regenerated HTML and `src/` files; for a build deployment, publish `dist/`. The build uses relative asset URLs for `/Portfolio/`.
6. Visit `https://hryhung.github.io/Portfolio/` and open a project. Check Umami's real-time view. Then click Download CV and use Skip; expect one `cv_click` and one `cv_download_requested`.

To disable tracking, set `websiteId` to an empty string and redeploy. Deployment has not been performed by this change. You do not need to add a second Umami script to HTML; this integration loads it once. A second tracker would duplicate pageviews.

## Events

| Event | Meaning |
| --- | --- |
| Page view | One per loaded HTML document, including Home and About. |
| `project_view` | A project document opened; includes its project slug. |
| `project_visible_time` | The project tab accumulated 15, 30, or 60 visible seconds; each milestone once per document. Hidden-tab time is excluded. This does not prove active reading. |
| `project_scroll` | Scrolled 50% or 90% of the scrollable page distance, once per milestone per document. |
| `project_image_open` | An enlarge-image button was clicked on a project. |
| `cv_click` | An accepted click on Download CV; repeat clicks during the animation are ignored. |
| `cv_download_requested` | The browser was asked to download/open the PDF. `method` is `animation`, `skip`, `native`, or `reduced_motion`. |
| `cv_cancelled` | The animation closed before requesting the PDF; includes the animation phase. |

A request cannot prove a PDF was saved or read. Direct PDF URLs, JavaScript-disabled visits, ad blockers, offline requests, and rapid exits can bypass client analytics. Event totals are estimates, not an audit trail. Anonymous events do not tell you visitors' names or email addresses. No forms, login requirement, fingerprinting code, session replay, or custom visitor IDs are added.

Page URLs exclude query strings and fragments. Referrers are reduced to their origin. Umami can still derive standard browser/device and approximate location statistics from requests; this is not zero-data collection. Do Not Track and Global Privacy Control disable the integration. Localhost and other domains/paths are excluded.

## View and download your log

Use your private Umami dashboard to filter pageviews and events by date, project, or event name. In Umami Cloud, use the website's data export option to download a gzip-compressed CSV export. Store exports outside this public repository. Analytics starts after configuration and deployment; it cannot recover earlier activity.

To exclude your own browser, open the live portfolio, open Developer Tools > Console, run the following, and reload:

```js
localStorage.setItem('umami.disabled', '1');
```

To count that browser again, run `localStorage.removeItem('umami.disabled')` and reload. This preference applies to that browser profile on `hryhung.github.io`.

## Verification

```sh
node scripts/test-analytics.mjs
node scripts/test-cv-download.mjs
npm run build
```

The tests use a fake tracker and never send events to Umami. Confirm live ingestion in your own dashboard after deployment; local test results do not confirm receipt by Umami.

References: [tracking code](https://docs.umami.is/docs/collect-data), [tracker configuration](https://docs.umami.is/docs/tracker-configuration), [tracker functions](https://docs.umami.is/docs/tracker-functions), [private reports and share URLs](https://docs.umami.is/docs/enable-share-url), [CSV exports](https://docs.umami.is/docs/cloud/export-data).
