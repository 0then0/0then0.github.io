import AxeBuilder from '@axe-core/playwright';
import { expect, type Page, test } from '@playwright/test';
import { productsWithDetail } from '../src/data/projects.ts';

const routes = ['/', '/projects/', '/about/', ...productsWithDetail.map((p) => `/projects/${p.slug}/`)];

async function noHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
}

test.describe('routes', () => {
  for (const route of routes) {
    test(`opens ${route} directly`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator('h1')).toHaveCount(1);
      await noHorizontalOverflow(page);
    });
  }

  test('redirects a product URL without the trailing slash', async ({ page }) => {
    const response = await page.goto('/projects/margincarry');
    expect(response?.status()).toBe(200);
    await expect(page).toHaveURL(/\/projects\/margincarry\/$/);
    await expect(page.getByRole('heading', { level: 1, name: 'MarginCarry' })).toBeVisible();
  });

  test('serves the 404 page for unknown and mistyped project paths', async ({ page }) => {
    for (const path of ['/does-not-exist/', '/projects/spacemosiac/']) {
      const response = await page.goto(path);
      expect(response?.status()).toBe(404);
      await expect(page.getByRole('heading', { level: 1, name: 'Page not found' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Open the catalog' })).toHaveAttribute('href', '/projects/');
    }
  });
});

test.describe('accessibility', () => {
  for (const scheme of ['light', 'dark'] as const) {
    for (const route of [...routes, '/404.html']) {
      test(`${route} has no axe violations in ${scheme} mode`, async ({ page }) => {
        await page.emulateMedia({ colorScheme: scheme });
        await page.goto(route);
        const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze();
        expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
      });
    }
  }

  test('skip link is the first focus stop and moves focus to main', async ({ page, isMobile }) => {
    test.skip(isMobile, 'keyboard navigation is checked on desktop');
    await page.goto('/projects/');
    await page.keyboard.press('Tab');
    const skip = page.getByRole('link', { name: 'Skip to content' });
    await expect(skip).toBeFocused();
    await expect(skip).toBeInViewport();
    await page.keyboard.press('Enter');
    await expect(page.locator('main')).toBeFocused();
  });

  test('focused controls show a visible outline', async ({ page, isMobile }) => {
    test.skip(isMobile, 'keyboard navigation is checked on desktop');
    await page.goto('/projects/');
    await page.getByLabel('Search').focus();
    await page.keyboard.press('Tab');
    const outline = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement;
      const style = getComputedStyle(el);
      return { tag: el.tagName, style: style.outlineStyle, width: parseFloat(style.outlineWidth) };
    });
    expect(outline.tag).toBe('SELECT');
    expect(outline.style).not.toBe('none');
    expect(outline.width).toBeGreaterThanOrEqual(2);
  });

  test('pages stay usable with 200% text size', async ({ page }) => {
    for (const route of ['/', '/projects/', '/projects/cambridge-dictionary-audio/']) {
      await page.goto(route);
      await page.addStyleTag({ content: 'html { font-size: 200% !important; }' });
      await noHorizontalOverflow(page);
    }
  });

  test('smooth scrolling is disabled for reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
  });
});

test.describe('home hero', () => {
  test('starts the glyph field without script or shader errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text());
    });
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('/');
    await expect(page.locator('[data-ascii-field]')).toHaveAttribute('data-state', /^(webgl|still)$/);
    await expect(page.getByRole('heading', { level: 1, name: 'Open-source apps and developer tools' })).toBeVisible();
    expect(errors).toEqual([]);
  });

  test('keeps the hero text and actions without JavaScript', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1, name: 'Open-source apps and developer tools' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Browse the catalog' })).toBeVisible();
    await context.close();
  });
});

test.describe('catalog filters', () => {
  test('search narrows the list and is kept in the URL', async ({ page }) => {
    await page.goto('/projects/');
    const rows = page.locator('[data-catalog] > li');
    const total = await rows.count();
    await page.getByLabel('Search').fill('charge limit');
    await expect(rows.filter({ visible: true })).toHaveCount(1);
    await expect(rows.filter({ visible: true })).toContainText('BatteryBridge');
    await expect(page.getByText(`1 of ${total} projects`)).toBeVisible();
    await expect(page).toHaveURL(/\?q=charge\+limit$/);

    await page.reload();
    await expect(page.getByLabel('Search')).toHaveValue('charge limit');
    await expect(rows.filter({ visible: true })).toHaveCount(1);

    await page.getByRole('button', { name: 'Clear filters' }).click();
    await expect(rows.filter({ visible: true })).toHaveCount(total);
    await expect(page).toHaveURL(/\/projects\/$/);
  });

  test('platform filter does not count test-only builds as support', async ({ page }) => {
    await page.goto('/projects/?platform=android');
    const visible = page.locator('[data-catalog] > li').filter({ visible: true });
    await expect(visible.filter({ hasText: 'SpaceMosaic' })).toHaveCount(1);
    await expect(visible.filter({ hasText: 'Cambridge Dictionary Audio' })).toHaveCount(0);
    await expect(visible.filter({ hasText: 'LANPair' })).toHaveCount(0);
  });

  test('shows an empty state instead of a blank list', async ({ page }) => {
    await page.goto('/projects/?q=zzzz-no-such-project');
    await expect(page.getByText('No project matches these filters.')).toBeVisible();
  });
});

test.describe('downloads', () => {
  test('preselects the visitor OS but lets them switch', async ({ browser }) => {
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/150 Safari/537.36',
    });
    const page = await context.newPage();
    await page.goto('/projects/spacemosaic/');
    const picker = page.getByRole('group', { name: 'Show downloads for' });
    await expect(picker.getByRole('button', { name: 'Windows' })).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#dl-windows')).toBeVisible();
    await expect(page.locator('#dl-macos')).toBeHidden();
    await picker.getByRole('button', { name: 'macOS' }).click();
    await expect(page.locator('#dl-macos')).toBeVisible();
    await expect(page.locator('#dl-windows')).toBeHidden();
    await context.close();
  });

  test('test-only mobile builds are explained, not offered as downloads', async ({ page }) => {
    await page.goto('/projects/cambridge-dictionary-audio/');
    await page.getByRole('group', { name: 'Show downloads for' }).getByRole('button', { name: 'Android' }).click();
    const panel = page.locator('#dl-android');
    await expect(panel.getByText('Not available as a regular install.')).toBeVisible();
    await expect(panel.locator('a[href$=".apk"]')).toHaveCount(0);
    await expect(
      page.locator('a[href*="TEST-ONLY"], a[href*="NOT-INSTALLABLE"], a[href*="REQUIRES-SIGNING"], a[href*="NOT-FOR-DEVICE"]'),
    ).toHaveCount(0);
  });

  test('download buttons point to GitHub release assets', async ({ page }) => {
    await page.goto('/projects/batterybridge/');
    const buttons = page.locator('.download-item a.btn');
    expect(await buttons.count()).toBeGreaterThan(0);
    for (const href of await buttons.evaluateAll((els) => els.map((e) => e.getAttribute('href')))) {
      expect(href).toMatch(/^https:\/\/github\.com\/0then0\/batterybridge\/releases\/download\/v[\d.]+\//);
    }
  });
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });

  test('catalog lists every project and hides the inactive filter form', async ({ page }) => {
    await page.goto('/projects/?q=battery');
    await expect(page.locator('form[data-filters]')).toBeHidden();
    const rows = page.locator('[data-catalog] > li');
    expect(await rows.filter({ visible: true }).count()).toBe(await rows.count());
  });

  test('all download panels are visible', async ({ page }) => {
    await page.goto('/projects/spacemosaic/');
    for (const os of ['macos', 'windows', 'linux', 'android', 'ios']) await expect(page.locator(`#dl-${os}`)).toBeVisible();
  });
});
