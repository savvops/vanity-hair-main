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
- [x] Refresh compatible dependencies: npm audit findings fell from 21 to 4. No forced major framework upgrade.

## Validation

`npm run build` passes. `npm test` passes all 7 Playwright tests using installed Google Chrome: 320, 375, 768, 1024 and 1440px layouts; navigation/anchors; image URLs; phone/email destinations; gallery photo navigation, dismissal and focus; local reel readiness and media cleanup; TikTok iframe destination; secondary routes and sitemap.

Lighthouse against the local production build (one mobile and one desktop run; lab results, not field measurements):

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

- [ ] High: plan and validate an Astro major-version migration. Four npm audit findings remain (Astro critical, nested Sharp high, esbuild low and the Tailwind integration low). The installed Astro 5 line still carries advisories; this static site does not use server islands or expose an image optimizer in its production output. That limits applicability but is not a claim that the dependency warnings are resolved. Direct image generation uses Sharp 0.35.4.
- [ ] Medium: independently verify the production custom domain and Google Business Profile. A request to `vanityhairwpg.ca` timed out from this machine during review; the existing canonical was retained and no DNS or production hosting was changed.
- [ ] Medium: confirm current hours, prices and review counts with Dereje. Existing business data was preserved. Phone/email targets were verified without placing calls, sending messages or making bookings. TikTok destination was checked; playback availability depends on TikTok/network policy.
- [ ] Low: replace the restored bitmap with the original transparent/vector logo if it becomes available.

## Reproduce

1. `npm ci`
2. `npm run build` (regenerates responsive images)
3. `powershell -File scripts/start-preview.ps1`
4. `npm test` (uses installed Chrome; the Playwright configuration can also start the preview)

Tailscale Serve is already configured on HTTPS port 9461. After a machine restart, start the preview again. Stop only this proxy with `tailscale serve --https=9461 off` when finished. Changes to CMS media during a running development session require `npm run images` or restarting `npm run dev`.
