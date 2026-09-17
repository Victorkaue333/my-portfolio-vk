import { expect, test } from '@playwright/test';
import { pages } from '../../src/config/pages';

/**
 * Smoke: cada rota estática precisa renderizar, ter <title> e não sujar o
 * console. É a rede de segurança mínima para um SPA sem testes unitários —
 * quebras de import, erro em lazy chunk e rota fora do sitemap aparecem aqui.
 *
 * As rotas saem de src/config/pages.ts, o mesmo registro que alimenta o
 * <Routes>, os menus e o prerender. Página nova entra no teste sozinha.
 */
// `pages` é `as const`: rotas sem `sitemap` não têm a propriedade no tipo, daí
// o `in` em vez de comparar com undefined.
const staticRoutes = pages
  .filter((page): page is Extract<typeof page, { sitemap: unknown }> => 'sitemap' in page)
  .map((page) => page.path);

test.describe('rotas estáticas', () => {
  for (const route of staticRoutes) {
    test(`${route} carrega sem erro de console`, async ({ page }) => {
      const errors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') errors.push(msg.text());
      });
      page.on('pageerror', (err) => errors.push(err.message));

      const response = await page.goto(route);
      expect(response?.status()).toBe(200);

      await expect(page).toHaveTitle(/.+/);
      await expect(page.locator('#root')).not.toBeEmpty();
      expect(errors).toEqual([]);
    });
  }
});

test('rota inexistente renderiza a 404 do app, não um erro do servidor', async ({ page }) => {
  const response = await page.goto('/rota-que-nao-existe');
  // O rewrite da Vercel devolve o index.html; o react-router resolve o `*`.
  expect(response?.status()).toBe(200);
  await expect(page.locator('#root')).not.toBeEmpty();
});

test('Manrope é servida do próprio domínio, sem Google Fonts', async ({ page }) => {
  // Regressão do self-host: o <link> do Google Fonts era render-blocking e
  // custava ~1,1 s de FCP/LCP. Se alguém reintroduzir o CDN, este teste cai.
  const externalFontRequests: string[] = [];
  page.on('request', (req) => {
    const url = req.url();
    if (url.includes('fonts.googleapis.com') || url.includes('fonts.gstatic.com')) {
      externalFontRequests.push(url);
    }
  });

  await page.goto('/');
  await page.waitForLoadState('networkidle');

  expect(externalFontRequests).toEqual([]);

  const loaded = await page.evaluate(() =>
    Array.from(document.fonts).some((font) => font.family === 'Manrope' && font.status === 'loaded'),
  );
  expect(loaded).toBe(true);
});

test('tema alternado sobrevive a um reload', async ({ page }, testInfo) => {
  // Só desktop: abaixo de 1024px a .navbar tem `display: none` e a MobileNavbar
  // não expõe o botão de tema — não há como alternar o tema no mobile hoje.
  test.skip(testInfo.project.name !== 'chromium', 'toggle de tema só existe na Navbar desktop');

  await page.goto('/');

  const initial = await page.evaluate(() => document.documentElement.classList.contains('light'));
  await page.getByRole('button', { name: /tema|theme/i }).first().click();

  const toggled = await page.evaluate(() => document.documentElement.classList.contains('light'));
  expect(toggled).toBe(!initial);

  await page.reload();
  const afterReload = await page.evaluate(() =>
    document.documentElement.classList.contains('light'),
  );
  expect(afterReload).toBe(toggled);
});
