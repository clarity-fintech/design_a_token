import { defineConfig } from '@playwright/test';

const PREVIEW = process.env.CLARITY_TOKENS_URL || 'http://localhost:4179/';

export default defineConfig({
  testDir: './e2e',
  timeout: 90_000,
  use: {
    headless: true,
    ignoreHTTPSErrors: true,
    baseURL: PREVIEW,
  },
  webServer: process.env.CLARITY_TOKENS_URL
    ? undefined
    : {
        command: 'npm run build && npm run preview',
        cwd: '.',
        url: 'http://localhost:4179/',
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
      },
  reporter: [['list'], ['json', { outputFile: '../dist/playwright-report.json' }]],
});
