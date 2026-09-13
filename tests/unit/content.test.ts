import { describe, expect, it } from 'vitest';
import { deck } from '../../lib/deck';
import { contrastText } from '../../content/contrasts';
import { cardSchema } from '../../lib/model';
import { reviewRules } from '../../content/review-expansion';
import { nasaaRules, assertNasaaSource } from '../../content/nasaa-supplement';

describe('question and answer continuity', () => {
 it('keeps the NASAA supplement attributable and rejects weak or deceptive references', () => {
  for(const rule of nasaaRules) {
   expect(()=>assertNasaaSource(rule.source,rule.clause)).not.toThrow();
   const cards=deck.filter(c=>c.sourcePath==='content/nasaa-supplement.ts'&&c.tags.includes(rule.key));
   expect(cards).toHaveLength(2);
   expect(cards.map(c=>c.type)).toEqual(['recall','contrast']);
   for(const card of cards) expect(card.officialSources).toEqual([rule.source]);
  }
  const valid=nasaaRules[0].source;
  for(const url of ['https://www.nasaa.org.example.com/rule.pdf','https://example.com/rule.pdf','http://www.nasaa.org/rule.pdf','https://name@www.nasaa.org/rule.pdf']) {
   expect(()=>assertNasaaSource({...valid,url},'specific clause')).toThrow();
  }
  expect(()=>assertNasaaSource({...valid,kind:'outline'},'topic')).toThrow();
  expect(()=>assertNasaaSource(valid,' ')).toThrow();
 });
 it('requires an authored question and answer for every contrast', () => {
  const authored = Object.values(contrastText).flatMap(rows => rows.trim().split('\n'));
  expect(authored.length+reviewRules.length+nasaaRules.length).toBe(deck.filter(card => card.type === 'contrast').length);
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
 it('keeps articles grammatical after expanding abbreviations and preserves form names', () => {
  for (const card of deck) {
   expect(card.front+' '+card.answer,card.id).not.toMatch(/\ban (Uniform|Securities)|\ba (individual retirement|investment adviser|Employee Retirement)/i);
   expect(card.front,card.id).not.toContain('Form Uniform Application');
  }
  expect(deck.find(card=>card.id==='s65-01-federal-notice-recall')!.front).toMatch(/^A Securities and Exchange Commission/);
  expect(deck.find(card=>card.id==='s65-03-adv-one-contrast')!.front).toContain('Form ADV Part 1');
 });
});
