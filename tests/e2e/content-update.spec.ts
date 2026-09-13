import {test,expect} from '@playwright/test';
import rawDeck from '../../content/deck.json' with {type:'json'};
import {emptySnapshot,cardSchema} from '../../lib/model';
import {reduceSnapshot} from '../../lib/engine';
const deck=rawDeck.map(card=>cardSchema.parse(card));

test('opening an old saved deck includes new content without moving the current question',async({page})=>{
 const now='2026-09-13T20:00:00Z';
 const oldDeck=deck.filter(c=>c.sourcePath!=='content/nasaa-supplement.ts');
 let saved=reduceSnapshot(emptySnapshot(),{type:'start',fullDeck:true,mode:'scheduled',now},oldDeck);
 saved=reduceSnapshot(saved,{type:'advance',cardId:saved.session!.queue[0],sessionId:saved.session!.id,expectedRatings:0},oldDeck);
 saved=reduceSnapshot(saved,{type:'flag',cardId:oldDeck[0].id,flag:'bookmarked',value:true,now},oldDeck);
 await page.goto('/');
 await expect(page.locator('.question-button')).toBeVisible();
 await page.evaluate(async snapshot=>{
  const db=await new Promise<IDBDatabase>((resolve,reject)=>{const request=indexedDB.open('series65-review-v1',1);request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);});
  const tx=db.transaction('study','readwrite');
  tx.objectStore('study').put(snapshot,'snapshot');
  await new Promise<void>((resolve,reject)=>{tx.oncomplete=()=>resolve();tx.onerror=()=>reject(tx.error);});
  db.close();
 },saved);
 await page.reload();
 await expect(page.locator('.card-position')).toHaveText(`2 of ${deck.length}`);
 await expect(page.locator('.study-question')).toHaveText(oldDeck[1].front);
 await page.getByRole('button',{name:'Reveal answer',exact:true}).click();
 await expect(page.locator('.answer-text')).toHaveText(oldDeck[1].answer);
 await page.reload();
 await expect(page.locator('.card-position')).toHaveText(`2 of ${deck.length}`);
 await page.getByRole('button',{name:'Reveal answer',exact:true}).click();
 await page.getByRole('button',{name:'Next card',exact:true}).click();
 await expect(page.locator('.card-position')).toHaveText(`3 of ${deck.length}`);
});
