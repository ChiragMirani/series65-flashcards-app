import { test, expect } from '@playwright/test';
const prefix = '/series65-flashcards-app';

test('one page opens a full deck and switches all subjects inline with the correct counter', async ({ page }) => {
  await page.goto(`${prefix}/`);
  const selector = page.getByRole('combobox', { name: 'Subject', exact: true });
  const counter = page.locator('.card-position');
  await expect(selector).toHaveValue('all');
  await expect(selector.locator('option')).toHaveCount(5);
  await expect(counter).toHaveText('1 of 632');
  await expect(page.locator('.question-button')).toBeVisible();
  await expect(page.getByRole('button', { name: /^(Start|Continue) review$/ })).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Save & exit' })).toHaveCount(0);
  const studyUrl = page.url();
  for (const [category, count] of Object.entries({ laws: 321, recommendations: 187, vehicles: 96, economics: 28 })) {
    await selector.selectOption(category);
    await expect(counter).toHaveText(`1 of ${count}`);
    await expect(page.locator('.question-button')).toBeVisible();
    await expect(page).toHaveURL(studyUrl);
  }
  await page.getByRole('button', { name: 'Reveal answer', exact: true }).click();
  await page.getByRole('button', { name: 'Next card', exact: true }).click();
  await expect(counter).toHaveText('2 of 28');
  const question = await page.locator('.study-question').innerText();
  await page.reload();
  await expect(selector).toHaveValue('economics');
  await expect(counter).toHaveText('2 of 28');
  await expect(page.locator('.study-question')).toHaveText(question);
  await page.getByRole('link', { name: 'Progress', exact: true }).click();
  await page.getByRole('link', { name: 'Study', exact: true }).click();
  await expect(page.locator('.study-question')).toHaveText(question);
  await expect(counter).toHaveText('2 of 28');
  await selector.selectOption('all');
  await expect(counter).toHaveText('1 of 632');
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
  await expect(page.locator('.card-position')).toHaveText('1 of 632');
  await page.getByRole('button', { name: 'Reveal answer', exact: true }).click();
  await page.getByRole('button', { name: 'Next card', exact: true }).click();
  await expect(page.locator('.question-button')).toBeVisible();
  const next = await page.locator('.study-question').innerText();
  await page.reload();
  await expect(page.locator('.study-question')).toHaveText(next);
  await expect(page.locator('.card-position')).toHaveText('2 of 632');
  await page.getByRole('link', { name: 'Progress', exact: true }).click();
  await page.getByRole('link', { name: 'Study', exact: true }).click();await expect(page.locator('.card-position')).toHaveText('2 of 632');
});

test('repeated finger taps reveal and advance at the same spot without ratings', async ({ page }) => {
  await page.goto(`${prefix}/`);
  await expect(page.locator('.question-button')).toBeVisible();
  const action = page.locator('.study-face');
  const box = (await action.boundingBox())!;
  const x = box.x + box.width / 2, y = box.y + box.height / 2;
  for (let index = 1; index <= 3; index++) {
    await page.touchscreen.tap(x, y);
    await expect(page.locator('.answer-text')).toBeVisible();
    await expect(action).toHaveAttribute('aria-label', 'Next card');await expect(page.locator('.study-answer-wrap')).toHaveCSS('opacity', '1');
    await expect(page.locator('.card-position')).toHaveText(`${index} of 632`);
    await expect(page.getByRole('button', { name: /^(Again|Hard|Good|Easy)/ })).toHaveCount(0);
    await page.touchscreen.tap(x, y);
    await expect(page.locator('.question-button')).toBeVisible();
    await expect(page.locator('.card-position')).toHaveText(`${index + 1} of 632`);
  }
  await page.locator('.question-button').tap();
  await page.getByText('Card details', { exact: true }).tap();
  await expect(page.locator('.card-position')).toHaveText('4 of 632');
  await page.getByText('Card details', { exact: true }).tap();
  await page.locator('.answer-text').tap();
  await expect(page.locator('.card-position')).toHaveText('5 of 632');
  await expect(page.locator('.question-button')).toBeVisible();
  const next = await page.locator('.study-question').innerText();
  await page.reload();
  await expect(page.locator('.study-question')).toHaveText(next);
  await expect(page.locator('.card-position')).toHaveText('5 of 632');
});

test('published answer has a public reference without advancing the card', async ({ page, context }) => {
  await context.route('https://www.nasaa.org/**', route => route.fulfill({contentType:'text/html',body:'<h1>Public reference</h1>'}));
  await page.goto(`${prefix}/?subject=all&order=sequential`);
  await expect(page.locator('.study-source')).toHaveCount(0);
  const question = page.locator('.study-question');
  await expect(question).toContainText('five or fewer retail clients');
  const before = await question.innerText();
  await page.getByRole('button', {name:'Reveal answer',exact:true}).tap();
  await expect(question).toHaveText(before);
  const source = page.locator('.study-source a');
  await expect(source).toHaveAttribute('href', 'https://www.nasaa.org/wp-content/uploads/2021/10/1956-Uniform-Securities-Act-with-NASAA-Updates-and-Commentary.pdf');
  const popupPromise = page.waitForEvent('popup');
  await source.tap();
  const popup = await popupPromise; await popup.waitForLoadState(); await popup.close();
  await expect(page.locator('.card-position')).toHaveText('1 of 632');
  await expect(page.getByRole('button', {name:'Next card',exact:true})).toBeVisible();
});

test('VocabDeck reveal motion, order toggle, previous card and share link', async ({ page, browser }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async (value:string) => { (window as Window & { copiedStudyLink?:string }).copiedStudyLink = value; } } });
  });
  await page.goto(`${prefix}/`);
  const subject = page.getByRole('combobox', { name: 'Subject', exact: true });
  await subject.selectOption('economics');
  await page.getByRole('button', { name: 'Sequential', exact: true }).tap();
  await expect(page.getByRole('button', { name: 'Sequential', exact: true })).toHaveAttribute('aria-pressed', 'true');
  const prompt = page.locator('.study-question');
  const first = await prompt.innerText();
  const before = (await prompt.boundingBox())!;
  const font = await prompt.evaluate(el => getComputedStyle(el).fontSize);
  await page.locator('.study-face').tap();
  await expect(page.locator('.study-answer-wrap')).toHaveCSS('opacity', '1');
  const after = (await prompt.boundingBox())!;
  expect(after.y).toBeLessThan(before.y - 10);
  expect(await prompt.evaluate(el => getComputedStyle(el).fontSize)).toBe(font);
  await expect(prompt).toHaveText(first);
  await page.locator('.study-face').tap();
  await expect(page.locator('.card-position')).toHaveText('2 of 28');
  await page.getByRole('button', { name: 'Previous card', exact: true }).tap();
  await expect(prompt).toHaveText(first);
  await expect(page.locator('.card-position')).toHaveText('1 of 28');
  await page.getByRole('button', { name: 'Shuffle', exact: true }).tap();
  await expect(page.getByRole('button', { name: 'Shuffle', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.reload();
  await expect(subject).toHaveValue('economics');
  await expect(page.getByRole('button', { name: 'Shuffle', exact: true })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Sequential', exact: true }).tap();
  await expect(prompt).toHaveText(first);
  await page.getByRole('button', { name: 'Copy study link', exact: true }).tap();
  await expect(page.getByRole('status').filter({ hasText: 'Link copied' })).toBeVisible();
  const shared = await page.evaluate(() => (window as Window & { copiedStudyLink?:string }).copiedStudyLink!);
  expect(new URL(shared).pathname).toBe(`${prefix}/`);
  expect(new URL(shared).searchParams.get('subject')).toBe('economics');
  expect(new URL(shared).searchParams.get('order')).toBe('sequential');
  const friend = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true });
  try {
    await friend.goto(shared);
    await expect(friend.getByRole('combobox', { name: 'Subject', exact: true })).toHaveValue('economics');
    await expect(friend.getByRole('button', { name: 'Sequential', exact: true })).toHaveAttribute('aria-pressed', 'true');
    await expect(friend.locator('.card-position')).toHaveText('1 of 28');
    await expect(friend.locator('.study-question')).toHaveText(first);
    await friend.getByRole('combobox', { name: 'Subject', exact: true }).selectOption('laws');
    await friend.reload();
    await expect(friend.getByRole('combobox', { name: 'Subject', exact: true })).toHaveValue('laws');
  } finally { await friend.close(); }
});
