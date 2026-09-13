import { describe, expect, it } from 'vitest';
import { deck } from '../../lib/deck';
import { contrastText } from '../../content/contrasts';
import { cardSchema } from '../../lib/model';

describe('question and answer continuity', () => {
 it('requires an authored question and answer for every contrast', () => {
  const authored = Object.values(contrastText).flatMap(rows => rows.trim().split('\n'));
  expect(authored).toHaveLength(deck.filter(card => card.type === 'contrast').length);
  for (const card of deck) {
   expect(card.front, card.id).toMatch(/\?$/);
   expect(card.front, card.id).not.toMatch(/trainee|makes this claim|what correction is needed|what applies to/i);
   expect(card.answer, card.id).not.toMatch(/^(yes|no)\.?$/i);
  }
 });
 it('answers the gift-basis question directly and preserves the two bases', () => {
  const gain = deck.find(card => card.id === 's65-15-gift-gain-contrast')!;
  expect(gain.front).toContain('Does the gift-date value determine the gain?');
  expect(gain.answer).toMatch(/^No\. The donor's basis does/);
  const loss = deck.find(card => card.id === 's65-15-gift-loss-contrast')!;
  expect(loss.answer).toMatch(/^No\. The gift-date fair market value/);
 });
 it('asks explicitly for the affiliate holding period and answers it first', () => {
  for (const [key, issuer, period] of [['affiliate-reporting','reporting','six months'],['affiliate-nonreporting','nonreporting','one year']]) {
   const card = deck.find(card => card.id === `s65-10-${key}-recall`)!;
   expect(card.front).toContain('how long');
   expect(card.front).toContain(`restricted shares of a ${issuer} issuer`);
   expect(card.answer).toMatch(new RegExp(`^At least ${period}\\.`));
   expect(card.answer).toContain('conditions still apply');
  }
 });
 it('requires safe public references for every card without changing draft status', () => {
  for (const card of deck) {
   expect(cardSchema.safeParse(card).success,card.id).toBe(true);
   expect(card.reviewStatus).toBe('draft');
   expect(card.officialSources.length).toBeGreaterThan(0);
   for (const source of card.officialSources) {
    expect(new URL(source.url).protocol).toBe('https:');
    expect(source.url).not.toMatch(/[?&](q|query|search)=/);
   }
  }
  const invalid = { ...deck[0], officialSources: [{...deck[0].officialSources[0],url:'javascript:alert(1)'}] };
  expect(cardSchema.safeParse(invalid).success).toBe(false);
 });
});
