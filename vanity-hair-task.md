# Vanity Hair review — 2026-09-08

Branch: `dev/logo-performance`. Production has not been deployed.

Preview: https://nucbox-m7-1.taila7272b.ts.net:9461/ (Tailscale connection required).
The proxy serves the static build at `127.0.0.1:4341`. The computer and preview process must remain running.

## Completed

- [x] Restore the woman with flowing hair in the header, footer, favicon and salon schema. Source: `public/images/.logohero.jpg`, confirmed by Nelson. `vanity-logo.png` is an AI-assisted isolation/restoration from that low-resolution sign photograph, not an original vector master. The original is preserved. The white mark uses a black background and screen blending on the dark site.
- [x] Replace the blocking, unversioned Lucide CDN script with static SVG icons.
- [x] Serve Inter and Playfair Display locally, with their OFL licenses. Remove the unused Poppins download.
- [x] Generate responsive WebP files from the original CMS images at build/start time. Preserve originals for full-size gallery viewing and CMS editing; use hashed URLs for optimized assets. Add dimensions, lazy loading and hero priority.
- [x] Correct overlapping tablet navigation, small-screen contact wrapping, heading order, social-link labels, focus indicators and reduced-motion behavior.
- [x] Fix gallery backdrop dismissal, focus return to its opener, scroll locking, dialog sizing and interference with native video controls.
- [x] Replace the misleading `/success/` booking confirmation with instructions to contact the salon. Share global styles across layout-based pages.
- [x] Fix the sitemap pointing to Window Guys, align it with the existing `vanityhairwpg.ca` canonical, and exclude editor/success routes from the sitemap.
- [x] Load analytics only on the production hostnames, preventing preview CORS errors and traffic pollution.
- [x] Upgrade to Astro 7.3.2, sitemap 3.7.4, Sharp 0.35.4 and esbuild 0.28.2. Replace the retired Astro Tailwind integration with Tailwind 3/PostCSS; remove unused RSS dependency. All 21 originally reported dependency vulnerabilities are now resolved (`npm audit`: zero).
- [x] Migrate all 14 content collections to the Content Layer with filename-based IDs and `astro/zod`. Fix Pages CMS media paths, singleton files and object lists. Archive the retired Netlify/Decap admin and unused Window Guys code, including the dummy quote endpoint.
- [x] Add an Astro/TypeScript check and Node 24 build configuration. Update the preview launcher for Astro 7's managed background server.

## Validation

### Mobile layout and motion refinement — September 8

- Replaced oversized information cards with a compact strip: location across the first mobile row, hours and contact below, and three columns on desktop. Measured 159.5px tall at 375px viewport width.
- Navbar hides during scrolling in either direction and returns 220ms after the final scroll event. It stays visible at the top, while the mobile menu is open, and during keyboard focus.
- Replaced Playfair Display with locally hosted Cormorant Garamond (normal and italic variable Latin WOFF2, OFL included), keeping Inter for body copy. Refined heading weights, button sizing and decorative lines.
- Added lightweight IntersectionObserver section reveals, subtle button lift and a finite scroll cue. No animation library; content remains visible without JavaScript, and reduced-motion preferences disable animation.
- `npm run check`: zero errors/warnings/hints. `npm run build`: passed. All 13 Playwright tests pass, including compact layout at five widths, scroll/pause navigation on mobile and desktop, open-menu and keyboard behavior, reduced motion and content visibility without JavaScript.
- Verified the actual Tailscale URL with agent-browser, checked mobile and desktop screenshots, and found no browser errors. Latest mobile Lighthouse report: performance 97, accessibility 100, best practices 100, SEO 100; LCP 2.5s, CLS 0.035, TBT 0ms. The audit report completed successfully; Lighthouse's subsequent temporary Chrome profile cleanup reported Windows EPERM. Raw report: ignored `.preview/polish-mobile.json`. Earlier scores below belong to the previous upgrade run.

`npm run build` passes on Node 26.2.0; the same static build also passes on Node 24.19.0 LTS. `npm run check` reports zero errors, warnings or hints. `npm audit` reports zero vulnerabilities. `npm test` passes all 10 Playwright tests using installed Google Chrome: 320, 375, 768, 1024 and 1440px layouts; navigation/anchors; image URLs; phone/email destinations; gallery photo navigation, dismissal and focus; local reel readiness and media cleanup; TikTok iframe destination; secondary routes and sitemap; all migrated content; mobile admin redirection; CMS configuration against existing JSON data. Authenticated edits inside hosted Pages CMS were not exercised.

Post-upgrade Lighthouse against the Astro 7 local production build (one mobile and one desktop run; lab results, not field measurements):

| Category | Mobile | Desktop |
| --- | ---: | ---: |
| Performance | 98 | 100 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |
| LCP | 2.3s | 0.5s |
| CLS | 0.031 | 0.019 |
| Total blocking time | 0ms | 0ms |

Before adding the restored logo, all source photos totalled 7,446,388 bytes versus 2,471,102 bytes for their generated variants up to 640px (67% smaller). This is an asset comparison, not a measured first-load transfer reduction. Full-resolution photos and video are still available on demand.

Review assessment: design 9/10, UX 9.5, performance 9.8, mobile 9.5, SEO 9.5, accessibility 10, content 8.5; weighted overall 9.4/10. Content scores reflect unverified current business details. Screenshots and raw audits are in ignored `.preview/`.

## Follow-ups, in priority order

- [ ] Medium: independently verify the production custom domain and Google Business Profile. `vanityhairwpg.ca` resolves to `18.204.152.241`, but the HTTPS request timed out from this machine during review; the existing canonical was retained and no DNS or production hosting was changed.
- [ ] Medium: confirm current hours, prices and review counts with Dereje. Existing business data was preserved. Phone/email targets were verified without placing calls, sending messages or making bookings. TikTok destination was checked; playback availability depends on TikTok/network policy.
- [ ] Low: replace the restored bitmap with the original transparent/vector logo if it becomes available.

## Reproduce

1. Use Node 24 LTS and run `npm ci`.
2. Run `npm run check` and `npm run build` (regenerates responsive images).
3. `powershell -File scripts/start-preview.ps1`
4. Run `npm test` (uses installed Chrome) and `npm audit`.
5. Inspect with `npm run preview -- status`; stop with `npm run preview -- stop`.

Tailscale Serve is already configured on HTTPS port 9461. After a machine restart, start the preview again. Stop only this proxy with `tailscale serve --https=9461 off` when finished. Changes to CMS media during a running development session require `npm run images` or restarting `npm run dev`.

Migration references: [Astro 6](https://docs.astro.build/en/guides/upgrade-to/v6/), [Astro 7](https://docs.astro.build/en/guides/upgrade-to/v7/), [Content Loader API](https://docs.astro.build/en/reference/content-loader-reference/), [Pages CMS configuration](https://pagescms.org/docs/configuration/).

## Local search update — September 21, 2026

- Prepared locally: homepage title, description and introduction identify Vanity Hair & Esthetics as a barber shop at 432 Graham Avenue in downtown Winnipeg. Business schema now includes a stable identity and links to the exact Google Maps listing and existing Facebook page. Schema retains the valid HairSalon type; this does not change the Google Business Profile category.
- Verified: Astro check reports zero errors/warnings/hints; production build passes; revised copy scores 5/5 in the governed copy checker.
- Public Google listing verified as Hair replacement service, 4.7 stars, 62 reviews. The signed-in SavvOps account lacks management access; Google reports a different existing owner. Owner-account credential location is pending from Nelson. No access request or category edit was submitted.
- Not deployed: this branch also contains the earlier unpublished redesign/runtime upgrade. Website SEO changes remain local; production and Google category are unchanged.
