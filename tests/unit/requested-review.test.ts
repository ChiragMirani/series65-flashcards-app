import { describe, expect, it } from 'vitest';
import { deck } from '../../lib/deck';
import { reviewChecklist } from '../../content/review-checklist';
import { reviewRules } from '../../content/review-expansion';

function card(id:string) {
 const result=deck.find(c=>c.id===id);
 if(!result) throw new Error(`Missing card ${id}`);
 return result;
}
describe('requested 30-topic learning coverage',()=>{
 it('includes every topic with recall and applied or contrast practice for every mapped objective',()=>{
  expect(reviewChecklist.map(p=>p.number)).toEqual(Array.from({length:30},(_,i)=>i+1));
  for(const point of reviewChecklist) for(const id of point.rules) {
   const sequence=deck.filter(c=>c.ruleId===id);
   expect(sequence.some(c=>c.type==='recall'),id).toBe(true);
   expect(sequence.some(c=>c.type!=='recall'),id).toBe(true);
   expect(sequence.every(c=>c.officialSources.every(s=>s.kind!=='outline')),id).toBe(true);
  }
 });
 it('attributes supplemental wording separately and preserves draft review status',()=>{
  for(const seed of reviewRules) {
   const sequence=deck.filter(c=>c.ruleId===`s65-${String(seed.section).padStart(2,'0')}-${seed.key}`);
   expect(sequence.length).toBeGreaterThanOrEqual(2);
   for(const c of sequence) {
    expect(c.sourcePath).toBe('content/review-expansion.ts');
    expect(c.sourceHeading).toMatch(new RegExp(`^Review point ${seed.point} —`));
    expect(c.reviewStatus).toBe('draft');
    expect(c.retest).toBe(true);
   }
  }
 });
 it('retains the entry/retention and qualified-client equality distinctions',()=>{
  expect(card('s65-04-aum-entry-buffer-contrast').answer).toMatch(/^No\..*below \$90 million, not exactly/);
  expect(card('s65-04-aum-must-apply').answer).toMatch(/^No\..*90 days/);
  expect(card('s65-07-client-managed-apply').answer).toMatch(/^Yes\. Exactly \$1\.4 million/);
  expect(card('s65-07-client-worth-contrast').answer).toMatch(/^No\..*exceed \$2\.7 million/);
 });
 it('does not remove affiliate conditions when the holding period expires',()=>{
  expect(card('s65-10-affiliate-reporting-apply').answer).toMatch(/^No\..*six-month.*conditions remain/);
  expect(card('s65-10-affiliate-nonreporting-apply').answer).toMatch(/^No\..*one year.*conditions still apply/);
 });
 it('distinguishes the three audit outcomes with applied facts',()=>{
  expect(card('s65-24-qualified-apply').answer).toBe('Qualified.');
  expect(card('s65-24-adverse-apply').answer).toBe('Adverse.');
  expect(card('s65-24-disclaimer-apply').answer).toBe('Disclaimer of opinion.');
 });
 it('keeps worked calculation answers consistent with the complete stated facts',()=>{
  expect(card('s65-22-market-cap-apply').answer).toBe(`$${(8-2)*25} million.`);
  expect(card('s65-21-tips-coupon-apply').answer).toBe(`$${(1080*.02/2).toFixed(2)}.`);
  expect(card('s65-19-protect-long-apply').answer).toBe(`$${(48+2-45)*100}.`);
  expect(card('s65-19-protect-short-apply').answer).toBe(`$${(65-60+3)*100}.`);
  expect(card('s65-22-quick-ratio-apply').front).toContain('prepaids $5,000');
  expect(card('s65-22-quick-ratio-apply').answer).toBe(`${((12000+8000+30000)/25000).toFixed(1)}.`);
  expect(card('s65-21-dividend-declare-apply').answer).toBe('$24,000.');
  expect(card('s65-21-dividend-pay-apply').answer).toContain('stays $24,000');
 });
 it('uses tax years for Roth earnings and a separate conversion clock',()=>{
  expect(card('s65-13-roth-earnings-recall').answer).toContain('Five tax years');
  expect(card('s65-13-roth-clock-contrast').answer).toContain('January 1, 2026');
  expect(card('s65-13-roth-clock-apply').answer).toContain('January 1, 2027');
  expect(card('s65-13-conversion-clock-contrast').answer).toMatch(/^No\..*own five-year clock/);
 });
 it('dates the pay-to-play proposal and never describes it as an effective repeal',()=>{
  const c=card('s65-09-pay-play-status-recall');
  expect(c.front).toContain('September 13, 2026');
  expect(c.answer).toMatch(/^No\..*proposal, not an effective repeal/);
  expect(c.officialSources.some(s=>s.url.endsWith('/s7-2026-31'))).toBe(true);
 });
});
