import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  timeout: 90_000,
  use: {
    headless: true,
    ignoreHTTPSErrors: true,
    baseURL: process.env.CLARITY_TOKENS_URL || 'http://localhost:4179/',
  },
  webServer: process.env.CLARITY_TOKENS_URL
    ? undefined
    : {
        command: 'npm run build -w @clrty/clarity-tokens-landing && npm run preview -w @clrty/clarity-tokens-landing',
        cwd: '..',
        url: 'http://localhost:4179/',
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
      },
  reporter: [['list']],
});
