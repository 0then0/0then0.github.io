import AxeBuilder from '@axe-core/playwright';
import { expect, type Page, test } from '@playwright/test';
import { productsWithDetail } from '../src/data/projects.ts';
import { LOCALES, localePath, messages, notFoundPath, productDetail } from '../src/i18n/index.ts';

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

for (const locale of LOCALES) {
  test(`task counts stay on one line and cards share row height (${locale.code})`, async ({ page }) => {
    await page.goto(localePath(locale.code, '/'));
    const result = await page.evaluate(() => {
      const links = [...document.querySelectorAll<HTMLElement>('.task-links a')];
      const wrapped = links
        .map((a) => a.querySelector<HTMLElement>('.count'))
        .filter((c): c is HTMLElement => c !== null)
        .filter((c) => c.getBoundingClientRect().height > parseFloat(getComputedStyle(c).lineHeight) * 1.5)
        .map((c) => c.textContent);
      const rows = new Map<number, number[]>();
      for (const a of links) {
        const box = a.getBoundingClientRect();
        rows.set(Math.round(box.top), [...(rows.get(Math.round(box.top)) ?? []), Math.round(box.height)]);
      }
      const uneven = [...rows.values()].filter((heights) => new Set(heights).size > 1);
      return { wrapped, uneven };
    });
    expect(result.wrapped).toEqual([]);
    expect(result.uneven).toEqual([]);
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

test('product pages translate their descriptions', async ({ page }) => {
  await page.goto('/fr/projects/margincarry/');
  await expect(page.getByRole('heading', { level: 2, name: 'Ce qu’il fait' })).toBeVisible();
  await expect(page.locator('.prose p').first()).toContainText('Quand un préprint');
  await expect(page.locator('.prose [lang="en"]')).toHaveCount(0);
  await expect(page.getByRole('link', { name: /Télécharger/ }).first()).toBeVisible();
});

for (const locale of LOCALES) {
  test(`missing URLs keep their status and language (${locale.code})`, async ({ page }) => {
    const path = localePath(locale.code, '/projects/does-not-exist/');
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
    await expect(page).toHaveURL(new RegExp(`${path}$`));
    await expect(page.locator('html')).toHaveAttribute('lang', locale.code);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(messages(locale.code).notFound.heading);
    await expect(page.getByRole('link', { name: messages(locale.code).notFound.catalog, exact: true })).toHaveAttribute(
      'href',
      localePath(locale.code, '/projects/'),
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
    const axe = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze();
    expect(axe.violations.map((v) => v.id)).toEqual([]);
    const fit = await overflowing(page);
    expect(fit.pageOverflow).toBeLessThanOrEqual(1);
    expect(fit.clipped).toEqual([]);
    if (locale.code === 'ru') await page.screenshot({ path: `test-results/error-ru-${test.info().project.name}.png`, fullPage: true });
    await page.locator('.lang-switch:visible summary').click();
    await expect(page.locator('.lang-switch:visible a[hreflang="ru"]')).toHaveAttribute('href', '/ru/404/');
  });

  test(`complete product descriptions (${locale.code})`, async ({ page }) => {
    for (const project of productsWithDetail) {
      await page.goto(localePath(locale.code, `/projects/${project.slug}/`));
      const detail = productDetail(locale.code, project);
      await expect(page.locator('.prose > p').first()).toHaveText(detail.summary);
      await expect(page.locator('.steps li p').first()).toHaveText(detail.firstRun[0]?.text ?? '');
      await expect(page.locator('.figure figcaption').first()).toContainText(detail.media[0]?.caption ?? '');
      await expect(page.locator('.support li p').first()).toHaveText(detail.support[0]?.note ?? '');
      await expect(page.locator('main :is(p, ul, ol, figure, figcaption, strong, .scenarios)[lang="en"]')).toHaveCount(0);
      if (detail.downloads?.length) {
        await page
          .locator('[data-os-panel]')
          .first()
          .evaluate((el) => {
            (el as HTMLElement).hidden = false;
          });
        const step = detail.downloads[0]?.steps[0] ?? '';
        expect(await page.locator('#download').textContent()).toContain(step);
      }
      if (['ru', 'ja'].includes(locale.code) && project.slug === 'spacemosaic')
        await page.screenshot({ path: `test-results/product-${locale.code}-${test.info().project.name}.png`, fullPage: true });
      const fit = await overflowing(page);
      expect(fit.pageOverflow, project.slug).toBeLessThanOrEqual(1);
      expect(fit.clipped, project.slug).toEqual([]);
      await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
      expect((await overflowing(page)).pageOverflow, project.slug).toBeLessThanOrEqual(1);
    }
  });
}

test.describe('translated errors without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  for (const locale of LOCALES) {
    test(`error page ${locale.code}`, async ({ page }) => {
      await page.goto(notFoundPath(locale.code));
      await expect(page.locator('html')).toHaveAttribute('lang', locale.code);
      await expect(page.getByRole('heading', { level: 1 })).toHaveText(messages(locale.code).notFound.heading);
      await expect(page.locator('.lang-list:visible a[hreflang="en"]')).toHaveAttribute('href', '/404.html');
    });
  }
});
