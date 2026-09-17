import { defineConfig, devices } from '@playwright/test';

// Os testes rodam contra o build de produção (`vite preview`), não contra o
// dev server: é lá que o prerender de meta/SEO e os chunks por rota existem.
// `npm run test:e2e` já dispara o build — ver script em package.json.
const BASE_URL = 'http://localhost:4173';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'github' : 'list',

  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
  },

  projects: [
    // Só Chromium: o portfólio é estático e o alvo de referência (PageSpeed,
    // Lighthouse) também é Chromium. Para adicionar Firefox/WebKit é preciso
    // rodar `npx playwright install firefox webkit` antes.
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 5'] } },
  ],

  webServer: {
    command: 'npm run preview -- --port 4173 --strictPort',
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
