import { test, expect } from '@playwright/test';
const prefix = '/series65-flashcards-app';

test('one dropdown selects random or an area and Continue keeps the saved card', async ({ page }) => {
  await page.goto(`${prefix}/`);
  const selector = page.getByRole('combobox', { name: 'Review area', exact: true });
  await expect(selector).toHaveValue('random');
  await expect(selector.locator('option')).toHaveCount(5);
  await expect(page.getByRole('button', { name: 'Random review', exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'Start review', exact: true }).click();
  await expect(page.locator('.session-mode')).toHaveText('Random review');
  const question = await page.locator('.question-button>span').innerText();
  await page.getByRole('link', { name: 'Save & exit' }).click();
  await page.getByRole('button', { name: 'Continue review', exact: true }).click();
  await expect(page.locator('.question-button>span')).toHaveText(question);
  await page.getByRole('button', { name: 'Reveal answer', exact: true }).click();
  await page.getByRole('button', { name: /^Good/ }).click();
  await page.getByRole('link', { name: 'Save & exit' }).click();
  await selector.selectOption('economics');
  await page.getByRole('button', { name: 'Start review', exact: true }).click();
  await expect(page.locator('.session-mode')).toHaveText('Economics & business');
  const areaQuestion = await page.locator('.question-button>span').innerText();
  await page.reload();
  await expect(page.locator('.question-button>span')).toHaveText(areaQuestion);
  await page.getByRole('link', { name: 'Save & exit' }).click();
  await expect(selector).toHaveValue('economics');
  await expect(page.getByRole('button', { name: 'Continue review', exact: true })).toBeVisible();
});

test('hosted phone navigation and refresh stay inside the project path', async ({ page }) => {
  const failures: string[] = [];
  page.on('pageerror', error => failures.push(error.message));
  await page.goto(`${prefix}/`);
  await expect(page.getByRole('button', { name: 'Start review' })).toBeVisible();
  await page.getByRole('link', { name: 'Browse', exact: true }).click();
  await expect(page).toHaveURL(new RegExp(`${prefix}/browse/`));
  await expect(page.getByRole('heading', { name: 'Find the rule you need.' })).toBeVisible();
  await page.reload();
  await expect(page.locator('.browse-card').first()).toBeVisible();
  for (const route of ['settings', 'progress', 'about', 'faq']) {
    await page.goto(`${prefix}/${route}/`);
    await expect(page.locator('h1')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  expect(failures).toEqual([]);
});

test('phone install icons, manifest, and canonical URLs use the hosted path', async ({ request, page }) => {
  const manifestResponse = await request.get(`${prefix}/manifest.webmanifest`);
  expect(manifestResponse.ok()).toBe(true);
  const manifest = await manifestResponse.json();
  expect(manifest.start_url).toBe(`${prefix}/`);
  expect(manifest.scope).toBe(`${prefix}/`);
  for (const icon of manifest.icons) {
    expect(icon.src.startsWith(`${prefix}/`)).toBe(true);
    expect((await request.get(icon.src)).ok()).toBe(true);
  }
  await page.goto(`${prefix}/faq/`);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://chiragmirani.github.io${prefix}/faq/`);
  await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute('href', `${prefix}/icon-192.png`);
  expect((await request.get(`${prefix}/favicon.ico`)).ok()).toBe(true);
});

test('hosted worker caches unvisited pages and saves phone reviews offline', async ({ page, context }) => {
  await page.goto(`${prefix}/`);
  await expect(page.getByText('Available offline on this device')).toBeVisible({ timeout: 45_000 });
  const scope = await page.evaluate(async () => {
    const registration = await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller) await new Promise<void>(resolve => navigator.serviceWorker.addEventListener('controllerchange', () => resolve(), { once: true }));
    return new URL(registration.scope).pathname;
  });
  expect(scope).toBe(`${prefix}/`);
  await context.setOffline(true);
  await page.goto(`${prefix}/review/`);
  await page.getByRole('button', { name: 'Start review', exact: true }).click();
  await page.getByRole('button', { name: 'Reveal answer', exact: true }).click();
  await page.getByRole('button', { name: /^Good/ }).click();
  const next = await page.locator('.question-button>span').innerText();
  await page.reload();
  await expect(page.locator('.question-button>span')).toHaveText(next);
  await page.getByRole('link', { name: 'Progress', exact: true }).click();
  await expect(page.locator('.progress-stats')).toContainText('100%');
});
