import { test, expect } from '@playwright/test';
const prefix = '/series65-flashcards-app';

test('one page opens a full deck and switches all subjects inline with the correct counter', async ({ page }) => {
  await page.goto(`${prefix}/`);
  const selector = page.getByRole('combobox', { name: 'Review area', exact: true });
  const counter = page.locator('.card-position');
  await expect(selector).toHaveValue('random');
  await expect(selector.locator('option')).toHaveCount(5);
  await expect(counter).toHaveText('1 of 628');
  await expect(page.locator('.question-button')).toBeVisible();
  await expect(page.getByRole('button', { name: /^(Start|Continue) review$/ })).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Save & exit' })).toHaveCount(0);
  const studyUrl = page.url();
  for (const [category, count] of Object.entries({ laws: 321, recommendations: 187, vehicles: 92, economics: 28 })) {
    await selector.selectOption(category);
    await expect(counter).toHaveText(`1 of ${count}`);
    await expect(page.locator('.question-button')).toBeVisible();
    await expect(page).toHaveURL(studyUrl);
  }
  await page.getByRole('button', { name: 'Reveal answer', exact: true }).click();
  await page.getByRole('button', { name: /^Good/ }).click();
  await expect(counter).toHaveText('2 of 28');
  const question = await page.locator('.question-button>span').innerText();
  await page.reload();
  await expect(selector).toHaveValue('economics');
  await expect(counter).toHaveText('2 of 28');
  await expect(page.locator('.question-button>span')).toHaveText(question);
  await page.getByRole('link', { name: 'Progress', exact: true }).click();
  await page.getByRole('link', { name: 'Study', exact: true }).click();
  await expect(page.locator('.question-button>span')).toHaveText(question);
  await expect(counter).toHaveText('2 of 28');
  await selector.selectOption('random');
  await expect(counter).toHaveText('1 of 628');
  await expect(page).toHaveURL(studyUrl);
});

test('hosted phone navigation and refresh stay inside the project path', async ({ page }) => {
  const failures: string[] = [];
  page.on('pageerror', error => failures.push(error.message));
  await page.goto(`${prefix}/`);
  await expect(page.locator('.question-button')).toBeVisible();
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
  await expect(page).toHaveURL(new RegExp(`${prefix}/$`));
  await expect(page.locator('.card-position')).toHaveText('1 of 628');
  await page.getByRole('button', { name: 'Reveal answer', exact: true }).click();
  await page.getByRole('button', { name: /^Good/ }).click();
  const next = await page.locator('.question-button>span').innerText();
  await page.reload();
  await expect(page.locator('.question-button>span')).toHaveText(next);
  await expect(page.locator('.card-position')).toHaveText('2 of 628');
  await page.getByRole('link', { name: 'Progress', exact: true }).click();
  await expect(page.locator('.progress-stats')).toContainText('100%');
});
