import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  use: { baseURL: 'http://127.0.0.1:4341', browserName: 'chromium', channel: 'chrome' },
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port 4341',
    url: 'http://127.0.0.1:4341',
    // Playwright owns this child; prevent Astro's automatic agent-mode detachment.
    env: { ASTRO_PREVIEW_BACKGROUND: '1' },
    reuseExistingServer: !process.env.CI,
  },
});
