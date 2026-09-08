import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  use: { baseURL: 'http://127.0.0.1:4341', browserName: 'chromium', channel: 'chrome' },
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port 4341',
    url: 'http://127.0.0.1:4341',
    reuseExistingServer: !process.env.CI,
  },
});
