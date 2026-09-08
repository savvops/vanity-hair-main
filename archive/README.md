# Archived legacy code

These files are preserved for reference and excluded from compilation by `tsconfig.json`.

- `astro5/`: the former content schema, before the Astro 7 Content Layer migration.
- `legacy-admin/`: the old Netlify/Decap admin and Pages CMS configuration.
- `unused-template/`: components unreachable from any site page, plus an unused quote endpoint that only logged submissions and returned success. These were inherited from the Window Guys template.

Nothing here is deployed. Active content remains in `src/content/`, its schema is `src/content.config.ts`, and the editor configuration is `.pages.yml`.
