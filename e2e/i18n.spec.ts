import AxeBuilder from '@axe-core/playwright';
import { expect, type Page, test } from '@playwright/test';
import { LOCALES, localePath } from '../src/i18n/locales.ts';

const translated = LOCALES.filter((l) => l.code !== 'en');
const pages = ['/', '/projects/', '/about/', '/projects/cambridge-dictionary-audio/', '/projects/batterybridge/'];

/** Elements whose content is wider than their box (clipped or overflowing text). */
async function overflowing(page: Page) {
  return page.evaluate(() => {
    const width = document.documentElement.clientWidth;
    const pageOverflow = document.documentElement.scrollWidth - width;
    const clipped = [...document.querySelectorAll<HTMLElement>('main :is(h1, h2, h3, p, a, button, label, summary, li, .tag, dt, dd)')]
      .filter(
        (el) =>
          el.offsetParent !== null &&
          !el.closest('.visually-hidden') &&
          el.scrollWidth > el.clientWidth + 1 &&
          getComputedStyle(el).overflowX !== 'auto',
      )
      .map((el) => `${el.tagName.toLowerCase()}: ${el.textContent?.trim().slice(0, 40)}`);
    return { pageOverflow, clipped };
  });
}

for (const locale of translated) {
  test.describe(`${locale.label} (${locale.code})`, () => {
    for (const path of pages) {
      const url = localePath(locale.code, path);

      test(`${url} is localized, accessible and fits`, async ({ page }) => {
        const response = await page.goto(url);
        expect(response?.status()).toBe(200);
        await expect(page.locator('html')).toHaveAttribute('lang', locale.code);
        await expect(page.locator('h1')).toHaveCount(1);
        const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
        expect(axe.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
        const fit = await overflowing(page);
        expect(fit.pageOverflow).toBeLessThanOrEqual(1);
        expect(fit.clipped).toEqual([]);
      });

      test(`${url} fits with 200% text`, async ({ page }) => {
        await page.goto(url);
        await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
        const fit = await overflowing(page);
        expect(fit.pageOverflow).toBeLessThanOrEqual(1);
      });
    }
  });
}

test('the language menu keeps the current page', async ({ page }) => {
  await page.goto('/projects/spacemosaic/');
  await page.locator('[data-lang-switch] summary').click();
  await page.getByRole('link', { name: 'Deutsch' }).click();
  await expect(page).toHaveURL(/\/de\/projects\/spacemosaic\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'de');
  await expect(page.getByRole('link', { name: 'Katalog', exact: true }).first()).toBeVisible();
});

test('the language menu closes with Escape', async ({ page, isMobile }) => {
  test.skip(isMobile, 'keyboard behaviour is checked on desktop');
  await page.goto('/ru/');
  const menu = page.locator('[data-lang-switch]');
  await menu.locator('summary').focus();
  await page.keyboard.press('Enter');
  await expect(menu).toHaveAttribute('open', '');
  await page.keyboard.press('Escape');
  await expect(menu).not.toHaveAttribute('open', '');
  await expect(menu.locator('summary')).toBeFocused();
});

test('catalog search and counter work in Russian', async ({ page }) => {
  await page.goto('/ru/projects/');
  await page.getByLabel('Поиск').fill('порог заряда');
  const visible = page.locator('[data-catalog] > li').filter({ visible: true });
  await expect(visible).toHaveCount(1);
  await expect(visible).toContainText('BatteryBridge');
  await expect(page.getByText(/^1 из \d+ проектов$/)).toBeVisible();
});

test('catalog counter uses Japanese wording', async ({ page }) => {
  await page.goto('/ja/projects/?platform=android');
  await expect(page.getByText(/^\d+ 件中 \d+ 件$/)).toBeVisible();
});

test('product pages mark English descriptions as English', async ({ page }) => {
  await page.goto('/fr/projects/margincarry/');
  await expect(page.getByRole('heading', { level: 2, name: 'Ce qu’il fait' })).toBeVisible();
  await expect(page.locator('.prose p[lang="en"]').first()).toBeVisible();
  await expect(page.getByRole('link', { name: /Télécharger/ }).first()).toBeVisible();
});
