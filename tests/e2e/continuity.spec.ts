import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir } from 'node:fs/promises';
import deck from '../../content/deck.json' with { type: 'json' };

test('every sequential reveal keeps its question and displays that cards own answer and sources', async ({page,context}) => {
 test.setTimeout(300_000);
 await page.setViewportSize({width:390,height:844});
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto('/?subject=all&order=sequential');
 await mkdir('test-results/continuity',{recursive:true});
 const screenshots = new Set(['s65-05-prepay-state-contrast','s65-05-prepay-consequence-recall','s65-10-affiliate-reporting-recall','s65-10-affiliate-nonreporting-recall','s65-15-gift-gain-contrast','s65-03-adv-one-contrast','s65-01-issuer-muni-recall','s65-09-pay-play-status-recall','s65-13-conversion-clock-contrast','s65-19-protect-short-apply','s65-21-tips-coupon-apply']);
 screenshots.add('s65-05-nasaa-custody-forward-contrast');
 screenshots.add('s65-09-nasaa-third-party-orders-recall');
 screenshots.add('s65-18-nasaa-inverse-daily-contrast');
 // Stub only the external destination: verify browser link behavior without
 // depending on the regulator's network or anti-bot policy in app CI.
 await context.route('https://www.nasaa.org/**',route=>route.fulfill({contentType:'text/html',body:'<h1>Reference destination</h1>'}));
 for (const [index,card] of deck.entries()) {
  await expect(page.locator('.card-position')).toHaveText(`${index+1} of ${deck.length}`);
  await expect(page.locator('.study-question')).toHaveText(card.front);
  await expect(page.locator('.study-source')).toHaveCount(0);
  await page.getByRole('button',{name:'Reveal answer',exact:true}).press('Enter');
  await expect(page.locator('.study-question')).toHaveText(card.front);
  await expect(page.locator('.study-answer-wrap')).toHaveCSS('opacity','1');
  await expect(page.locator('.answer-text')).toHaveText(card.answer);
  const links=page.locator('.study-source a');
  await expect(links).toHaveCount(card.officialSources.length);
  for(const [i,source] of card.officialSources.entries()) {
   await expect(links.nth(i)).toHaveAttribute('href',source.url);
   await expect(links.nth(i)).toHaveAttribute('target','_blank');
  }
  if(index===0) {
   const popupPromise=page.waitForEvent('popup');
   await links.first().click();
   const popup=await popupPromise;await popup.waitForLoadState();await popup.close();
   await expect(page.locator('.card-position')).toHaveText(`1 of ${deck.length}`);
   await expect(page.locator('.answer-text')).toHaveText(card.answer);
   await page.reload();
   await expect(page.locator('.study-question')).toHaveText(card.front);
   await page.getByRole('button',{name:'Reveal answer',exact:true}).click();
  }
  if(screenshots.has(card.id)) {
   await page.screenshot({path:`test-results/continuity/${card.id}-phone.png`,fullPage:true});
   const report=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
   expect(report.violations).toEqual([]);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   if(card.id==='s65-15-gift-gain-contrast') {
    await page.setViewportSize({width:1440,height:1000});
    await page.screenshot({path:'test-results/continuity/gift-gain-desktop.png',fullPage:true});
    await page.setViewportSize({width:390,height:844});
   }
  }
  await page.getByRole('button',{name:'Next card',exact:true}).press('Enter');
 }
 await expect(page.getByRole('heading',{name:'Deck complete.'})).toBeVisible();
});
