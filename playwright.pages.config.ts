import { defineConfig } from '@playwright/test';
const prefix = '/series65-flashcards-app';
const origin = process.env.PAGES_TEST_ORIGIN || 'http://127.0.0.1:3067';
export default defineConfig({
  testDir: './tests/deployment', workers: 1, timeout: 60_000,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-pages-report' }]],
  use: { baseURL: origin, channel: process.env.CI ? undefined : 'chrome', viewport: { width: 390, height: 844 }, hasTouch: true, trace: 'retain-on-failure' },
  webServer: process.env.PAGES_TEST_ORIGIN ? undefined : {
    command: 'node scripts/serve.mjs', url: `${origin}${prefix}/`, reuseExistingServer: false,
    env: { PORT: '3067', NEXT_PUBLIC_BASE_PATH: prefix }, timeout: 30_000,
  },
});
