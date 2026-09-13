import { describe, it, expect } from 'vitest';
import { deck } from '../../lib/deck';
import { categories, emptySnapshot, sessionSchema } from '../../lib/model';
import { makeSession, reduceSnapshot } from '../../lib/engine';
import { freshState } from '../../lib/scheduler';

const now = new Date('2026-09-13T15:00:00Z');
describe('random and area review', () => {
  it('samples across the eligible deck before limiting and remains reproducible', () => {
    const state = emptySnapshot();
    const make = (at = now) => makeSession(deck, state, at, undefined, false, 'random');
    const session = make();
    expect(session.queue).toHaveLength(20);
    expect(new Set(session.queue).size).toBe(20);
    expect(new Set(session.queue.map(id => deck.find(c => c.id === id)!.section)).size).toBeGreaterThan(3);
    expect(make().queue).toEqual(session.queue);
    expect(make(new Date(now.getTime() + 1000)).queue).not.toEqual(session.queue);
    expect(session.queue).not.toEqual(makeSession(deck, state, now).queue);
  });

  it('respects remaining daily limits, suspension, and future due dates', () => {
    const state = emptySnapshot();
    state.settings = { ...state.settings, dailyNew: 2, dailyReviews: 2, sessionLength: 10 };
    for (const card of deck.slice(0, 3)) state.states[card.id] = { ...freshState(card.id, now), totalReviews: 1, stage: 'review', due: '2026-09-12T00:00:00Z' };
    for (const card of [deck[3], deck[5]]) state.states[card.id] = { ...freshState(card.id, now), totalReviews: 1, stage: 'review', due: '2026-09-20T00:00:00Z' };
    state.states[deck[4].id] = { ...freshState(deck[4].id, now), suspended: true };
    state.events = [{ id: 'a', cardId: deck[0].id, at: now.toISOString(), rating: 'good', wasNew: false }, { id: 'b', cardId: deck[5].id, at: now.toISOString(), rating: 'good', wasNew: true }];
    const session = makeSession(deck, state, now, undefined, false, 'random');
    expect(session.queue).toHaveLength(2);
    expect(session.queue.filter(id => state.states[id]?.totalReviews)).toHaveLength(1);
    for (const card of deck.slice(3, 6)) expect(session.queue).not.toContain(card.id);
    state.settings.dailyNew = 1; state.settings.dailyReviews = 1;
    expect(makeSession(deck, state, now, undefined, false, 'random').queue).toEqual([]);
  });

  it('restricts every area selection to its category', () => {
    for (const category of Object.keys(categories) as (keyof typeof categories)[]) {
      const state = reduceSnapshot(emptySnapshot(), { type: 'start', now: now.toISOString(), category }, deck);
      expect(state.session?.category).toBe(category);
      expect(state.session!.queue.length).toBeGreaterThan(0);
      expect(state.session!.queue.every(id => deck.find(c => c.id === id)?.category === category)).toBe(true);
    }
  });

  it('keeps saved reviews when changing selection and resumes without reshuffling', () => {
    let state = reduceSnapshot(emptySnapshot(), { type: 'start', now: now.toISOString(), mode: 'random' }, deck);
    const id = state.session!.queue[0];
    state = reduceSnapshot(state, { type: 'rate', now: now.toISOString(), cardId: id, sessionId: state.session!.id, rating: 'good' }, deck);
    expect(reduceSnapshot(state, { type: 'start', now: new Date(now.getTime() + 1000).toISOString() }, deck)).toBe(state);
    const changed = reduceSnapshot(state, { type: 'start', now: new Date(now.getTime() + 2000).toISOString(), category: 'economics' }, deck);
    expect(changed.states[id]).toEqual(state.states[id]);
    expect(changed.events).toEqual(state.events);
    const legacy = { ...changed.session! };
    delete legacy.mode; delete legacy.category;
    expect(sessionSchema.safeParse(legacy).success).toBe(true);
  });
});
