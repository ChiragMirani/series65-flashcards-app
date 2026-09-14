import { describe, it, expect } from 'vitest';
import { deck } from '../../lib/deck';
import { emptySnapshot, snapshotSchema, type Category, type Rating, type Snapshot } from '../../lib/model';
import { knownCount, makeFullDeckSession, reduceSnapshot } from '../../lib/engine';
import { freshState } from '../../lib/scheduler';
import { IndexedDbStudyRepository } from '../../lib/repository';
import { selectionFromSearch, studyLink } from '../../lib/study-selection';
import 'fake-indexeddb/auto';

const now = new Date('2026-09-13T15:00:00Z');
const start = (state = emptySnapshot(), category?: Category) => reduceSnapshot(state, { type: 'start', fullDeck: true, category, now: now.toISOString() }, deck);
const rate = (state: Snapshot, rating: Rating = 'good') => reduceSnapshot(state, { type: 'rate', cardId: state.session!.queue[0], sessionId: state.session!.id, expectedRatings: state.session!.ratings, rating, now: now.toISOString() }, deck);

describe('one-page full-deck review', () => {
  it('shuffles the entire deck regardless of old limits or future due dates', () => {
    const state = emptySnapshot();
    state.settings = { ...state.settings, dailyNew: 0, dailyReviews: 0, sessionLength: 1 };
    state.states[deck[0].id] = { ...freshState(deck[0].id, now), totalReviews: 1, stage: 'review', due: '2027-01-01T00:00:00Z' };
    const session = makeFullDeckSession(deck, state, now);
    expect(session.initialCount).toBe(1048);
    expect(new Set(session.queue)).toEqual(new Set(deck.map(c => c.id)));
    expect(session.order).toEqual(session.queue);
    expect(session.queue).not.toEqual(deck.map(c => c.id));
    expect(makeFullDeckSession(deck, state, now)).toEqual(session);
    expect(makeFullDeckSession(deck, state, new Date(now.getTime() + 1)).queue).not.toEqual(session.queue);
    expect(snapshotSchema.safeParse({ ...state, session }).success).toBe(true);
  });

  it('selects every card in each subject and excludes suspended cards', () => {
    const counts = { laws: 464, recommendations: 278, vehicles: 196, economics: 110 };
    for (const category of Object.keys(counts) as Category[]) {
      const session = start(emptySnapshot(), category).session!;
      expect(session.initialCount).toBe(counts[category]);
      expect(session.order).toEqual(deck.filter(c => c.category === category).map(c => c.id));
    }
    const state = emptySnapshot();
    const excluded = deck.find(c => c.category === 'economics')!;
    state.states[excluded.id] = { ...freshState(excluded.id, now), suspended: true };
    expect(start(state).session!.initialCount).toBe(deck.length - 1);
    const subject = start(state, 'economics').session!;
    expect(subject.initialCount).toBe(counts.economics - 1);
    expect(subject.queue).not.toContain(excluded.id);
  });

  it('saves full-deck order and position through repository close, reopen and resume', async () => {
    const name = 'full-deck-reopen';
    const first = new IndexedDbStudyRepository(deck, name);
    let state = await first.execute({ type: 'start', fullDeck: true, category: 'economics', now: now.toISOString() });
    state = await first.execute({ type: 'rate', cardId: state.session!.queue[0], sessionId: state.session!.id, rating: 'good', now: now.toISOString() });
    first.close();
    const second = new IndexedDbStudyRepository(deck, name);
    expect(await second.read()).toEqual(state);
    const resumed = await second.execute({ type: 'start', fullDeck: true, resume: true, now: new Date(now.getTime() + 1000).toISOString() });
    expect(resumed).toEqual(state);
    expect(resumed.session!.order!.indexOf(resumed.session!.queue[0]) + 1).toBe(2);
    second.close();
  });

  it('expands old limited sessions while preserving ratings, settings and bookmarks', () => {
    let state = reduceSnapshot(emptySnapshot(), { type: 'start', now: now.toISOString() }, deck);
    state = rate(state);
    state = reduceSnapshot(state, { type: 'flag', cardId: deck[0].id, flag: 'bookmarked', value: true, now: now.toISOString() }, deck);
    const migrated = reduceSnapshot(state, { type: 'start', fullDeck: true, resume: true, now: now.toISOString() }, deck);
    expect(migrated.session!.initialCount).toBe(1048);
    expect(migrated.states).toEqual(state.states);
    expect(migrated.events).toEqual(state.events);
    expect(migrated.settings).toEqual(state.settings);
    const changed = start(migrated, 'economics');
    expect(changed.session!.initialCount).toBe(110);
    expect(changed.states).toEqual(state.states);
    expect(changed.events).toEqual(state.events);
  });

  it('drops retired cards from a saved session on resume without moving the current card', () => {
    const cards = deck.slice(0, 4);
    let state = reduceSnapshot(emptySnapshot(), { type: 'start', fullDeck: true, mode: 'scheduled', now: now.toISOString() }, cards);
    state = reduceSnapshot(state, { type: 'advance', cardId: state.session!.queue[0], sessionId: state.session!.id, expectedRatings: 0 }, cards);
    const retired = state.session!.queue[1];
    const remaining = cards.filter(c => c.id !== retired);
    const resumed = reduceSnapshot(state, { type: 'start', fullDeck: true, resume: true, now: now.toISOString() }, remaining);
    expect(resumed.session!.order).not.toContain(retired);
    expect(resumed.session!.queue).not.toContain(retired);
    expect(resumed.session!.queue[0]).toBe(state.session!.queue[0]);
    expect(resumed.session!.initialCount).toBe(3);
    expect(snapshotSchema.safeParse(resumed).success).toBe(true);
  });

  it('Again repeats a card soon and Got it skips known cards in new shuffles until included or reset', () => {
    const cards = deck.slice(0, 8);
    let state = reduceSnapshot(emptySnapshot(), { type: 'start', fullDeck: true, mode: 'scheduled', now: now.toISOString() }, cards);
    const first = state.session!.queue[0];
    const mark = (s: Snapshot, type: 'again' | 'known') => reduceSnapshot(s, { type, cardId: s.session!.queue[0], sessionId: s.session!.id, expectedRatings: s.session!.ratings, now: now.toISOString() }, cards);
    state = mark(state, 'again');
    expect(state.session!.queue.indexOf(first)).toBe(4);
    expect(state.session!.completed).not.toContain(first);
    expect(state.states[first].known).toBe(false);
    const second = state.session!.queue[0];
    state = mark(state, 'known');
    expect(state.states[second].known).toBe(true);
    expect(state.session!.completed).toContain(second);
    expect(state.events).toEqual([]);
    expect(snapshotSchema.safeParse(state).success).toBe(true);
    const next = reduceSnapshot(state, { type: 'start', fullDeck: true, mode: 'scheduled', now: now.toISOString() }, cards);
    expect(next.session!.order).not.toContain(second);
    expect(knownCount(cards, next)).toBe(1);
    const withKnown = reduceSnapshot(state, { type: 'start', fullDeck: true, mode: 'scheduled', includeKnown: true, now: now.toISOString() }, cards);
    expect(withKnown.session!.order).toContain(second);
    expect(snapshotSchema.parse(withKnown).session!.includeKnown).toBe(true);
    const cleared = reduceSnapshot(next, { type: 'reset-known' }, cards);
    expect(knownCount(cards, cleared)).toBe(0);
    expect(reduceSnapshot(cleared, { type: 'start', fullDeck: true, mode: 'scheduled', now: now.toISOString() }, cards).session!.order).toContain(second);
  });

  it('relearns without duplicating the queue or changing a card number', () => {
    let state = start();
    const order = state.session!.order!;
    const first = order[0];
    state = rate(state, 'again');
    expect(state.session!.queue.slice(0, 3)).toEqual([order[1], order[2], first]);
    state = rate(rate(state));
    expect(state.session!.queue[0]).toBe(first);
    expect(state.session!.order).toEqual(order);
    expect(new Set(state.session!.queue).size).toBe(state.session!.queue.length);
    expect(snapshotSchema.safeParse(state).success).toBe(true);
  });

  it('updates the total on suspension and keeps a completed deck completed after refresh', () => {
    const cards = deck.slice(0, 3);
    let state = reduceSnapshot(emptySnapshot(), { type: 'start', fullDeck: true, now: now.toISOString() }, cards);
    const removed = state.session!.queue[0];
    state = reduceSnapshot(state, { type: 'flag', cardId: removed, flag: 'suspended', value: true, now: now.toISOString() }, cards);
    expect(state.session!.initialCount).toBe(2);
    expect(state.session!.order).not.toContain(removed);
    expect(snapshotSchema.safeParse(state).success).toBe(true);
    state = rate(rate(state));
    expect(state.session!.queue).toEqual([]);
    expect(state.session!.completed).toHaveLength(2);
    expect(reduceSnapshot(state, { type: 'start', fullDeck: true, resume: true, now: now.toISOString() }, cards)).toBe(state);
  });

  it('rejects a corrupt full-deck backup order but accepts legacy backups', () => {
    const state = start();
    expect(snapshotSchema.safeParse({ ...state, session: { ...state.session, order: undefined } }).success).toBe(false);
    expect(snapshotSchema.safeParse({ ...state, session: { ...state.session, order: [deck[0].id, deck[0].id] } }).success).toBe(false);
    expect(snapshotSchema.safeParse({ ...state, session: { ...state.session, initialCount: 20 } }).success).toBe(false);
    expect(snapshotSchema.safeParse(reduceSnapshot(emptySnapshot(), { type: 'start', now: now.toISOString() }, deck)).success).toBe(true);
  });

  it('advances without changing recall scores and rejects a stale duplicate tap', () => {
    const state = rate(start());
    const session = state.session!;
    const command = { type: 'advance' as const, cardId: session.queue[0], sessionId: session.id, expectedRatings: session.ratings };
    const next = reduceSnapshot(state, command, deck);
    expect(next.session!.queue).toEqual(session.queue.slice(1));
    expect(next.session!.completed).toContain(command.cardId);
    expect(next.session!.order).toEqual(session.order);
    expect(next.session!.ratings).toBe(session.ratings);
    expect(next.states).toEqual(state.states);
    expect(next.events).toEqual(state.events);
    expect(snapshotSchema.safeParse(next).success).toBe(true);
    expect(() => reduceSnapshot(next, command, deck)).toThrow('session changed');
  });

  it('persists ungraded navigation and finishes a one-card deck', async () => {
    const cards = deck.slice(0, 1);
    const name = `tap-next-${crypto.randomUUID()}`;
    const first = new IndexedDbStudyRepository(cards, name);
    const initial = await first.execute({ type: 'start', fullDeck: true, now: now.toISOString() });
    const saved = await first.execute({ type: 'advance', cardId: cards[0].id, sessionId: initial.session!.id, expectedRatings: 0 });
    expect(saved.session!.queue).toEqual([]);
    expect(saved.session!.completed).toEqual([cards[0].id]);
    expect(saved.states).toEqual({});
    expect(saved.events).toEqual([]);
    first.close();
    const reopened = new IndexedDbStudyRepository(cards, name);
    expect(await reopened.read()).toEqual(saved);
    reopened.close();
  });

  it('orders the whole deck or one subject independently of selection', () => {
    for(const category of [undefined,'economics'] as const) {
      const ordered=makeFullDeckSession(deck,emptySnapshot(),now,category,'scheduled');
      const random=makeFullDeckSession(deck,emptySnapshot(),now,category,'random');
      expect(ordered.order).toEqual(deck.filter(c=>!category||c.category===category).map(c=>c.id));
      expect(new Set(random.order)).toEqual(new Set(ordered.order));
      expect(random.order).not.toEqual(ordered.order);
    }
  });

  it('moves back in the saved order without duplicating cards or changing recall data', () => {
    const original=start(emptySnapshot(),'economics');
    const advanced=reduceSnapshot(original,{type:'advance',cardId:original.session!.queue[0],sessionId:original.session!.id,expectedRatings:0},deck);
    const command={type:'previous' as const,cardId:advanced.session!.queue[0],sessionId:advanced.session!.id,expectedRatings:0};
    const previous=reduceSnapshot(advanced,command,deck);
    expect(previous.session!.queue).toEqual(original.session!.queue);
    expect(previous.session!.completed).toEqual([]);
    expect(previous.events).toEqual(original.events);
    expect(snapshotSchema.safeParse(previous).success).toBe(true);
    expect(()=>reduceSnapshot(previous,command,deck)).toThrow('session changed');
  });

  it('shares only subject and order and validates incoming selection links', () => {
    const url=studyLink('https://example.com','/series65/','economics','scheduled');
    expect(url).toBe('https://example.com/series65/?subject=economics&order=sequential');
    expect(selectionFromSearch(new URL(url).search)).toEqual({category:'economics',mode:'scheduled'});
    expect(selectionFromSearch('?subject=all&order=shuffle')).toEqual({category:undefined,mode:'random'});
    for(const search of ['', '?subject=secret', '?subject=all&order=invalid', '?subject=__proto__']) expect(selectionFromSearch(search)).toBeNull();
  });
});
