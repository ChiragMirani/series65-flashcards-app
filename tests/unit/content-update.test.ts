import { expect, it } from 'vitest';
import 'fake-indexeddb/auto';
import { deck } from '../../lib/deck';
import { reduceSnapshot } from '../../lib/engine';
import { emptySnapshot, snapshotSchema } from '../../lib/model';
import { IndexedDbStudyRepository } from '../../lib/repository';

const now='2026-09-13T20:00:00Z';
const oldDeck=deck.filter(c=>c.sourcePath!=='content/nasaa-supplement.ts');
it('appends an expanded deck once while preserving the current card, order, reviews and bookmarks across refresh',async()=>{
 const name=`content-update-${crypto.randomUUID()}`;
 const oldRepo=new IndexedDbStudyRepository(oldDeck,name);
 let old=await oldRepo.execute({type:'start',fullDeck:true,category:'laws',mode:'scheduled',now});
 const first=old.session!.queue[0];
 old=await oldRepo.execute({type:'rate',cardId:first,rating:'good',sessionId:old.session!.id,expectedRatings:0,now});
 old=await oldRepo.execute({type:'flag',cardId:first,flag:'bookmarked',value:true,now});
 oldRepo.close();
 const updatedRepo=new IndexedDbStudyRepository(deck,name);
 const updated=await updatedRepo.execute({type:'start',fullDeck:true,resume:true,now});
 const added=deck.filter(c=>c.category==='laws'&&!old.session!.order!.includes(c.id)).map(c=>c.id);
 expect(updated.session!.order).toEqual([...old.session!.order!,...added]);
 expect(updated.session!.queue).toEqual([...old.session!.queue,...added]);
 expect(updated.session!.completed).toEqual(old.session!.completed);
 expect(updated.states).toEqual(old.states);
 expect(updated.events).toEqual(old.events);
 expect(updated.session!.initialCount).toBe(deck.filter(c=>c.category==='laws').length);
 updatedRepo.close();
 const reopened=new IndexedDbStudyRepository(deck,name);
 expect(await reopened.read()).toEqual(updated);
 expect(await reopened.execute({type:'start',fullDeck:true,resume:true,now})).toEqual(updated);
 reopened.close();
});
it('adds only eligible cards to completed or shuffled sessions and never duplicates relearning cards',()=>{
 for(const mode of ['random','scheduled'] as const) {
  const original=reduceSnapshot(emptySnapshot(),{type:'start',fullDeck:true,category:'vehicles',mode,now},oldDeck);
  const excluded=deck.find(c=>c.sourcePath==='content/nasaa-supplement.ts'&&c.category==='vehicles')!;
  const suspended=reduceSnapshot(original,{type:'flag',cardId:excluded.id,flag:'suspended',value:true,now},deck);
  const state=reduceSnapshot(suspended,{type:'rate',cardId:suspended.session!.queue[0],sessionId:suspended.session!.id,rating:'again',now},oldDeck);
  const updated=reduceSnapshot(state,{type:'start',fullDeck:true,resume:true,now},deck);
  expect(updated.session!.queue.slice(0,state.session!.queue.length)).toEqual(state.session!.queue);
  expect(updated.session!.order).not.toContain(excluded.id);
  expect(new Set(updated.session!.queue).size).toBe(updated.session!.queue.length);
  expect(updated.session!.mode).toBe(mode);
  expect(snapshotSchema.safeParse(updated).success).toBe(true);
  const complete={...state,session:{...state.session!,queue:[],completed:state.session!.order!}};
  const resumed=reduceSnapshot(complete,{type:'start',fullDeck:true,resume:true,now},deck);
  expect(resumed.session!.queue).toEqual(updated.session!.order!.slice(state.session!.order!.length));
  expect(resumed.session!.completed).toEqual(complete.session.completed);
 }
});
