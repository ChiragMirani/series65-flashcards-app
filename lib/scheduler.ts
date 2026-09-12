import type { Rating, StudyState } from './model';
export const DAY = 86_400_000;
export const utcDay = (now: Date | string) => new Date(now).toISOString().slice(0,10);
export function dueInDays(now: Date, days: number): string {
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + days)).toISOString();
}
export function freshState(cardId: string, now: Date): StudyState {
  return {cardId,due:now.toISOString(),interval:0,ease:2.5,stage:'new',lastReviewed:null,lapses:0,streak:0,totalReviews:0,lastRating:null,bookmarked:false,suspended:false};
}
/** Deterministic SM-2 adaptation with four ratings and an in-session relearning step. */
export function schedule(previous: StudyState, rating: Rating, now: Date): StudyState {
  const next = {...previous, lastReviewed: now.toISOString(), totalReviews: previous.totalReviews + 1, lastRating: rating};
  if(rating === 'again') return {...next, due: new Date(now.getTime()+60_000).toISOString(), interval:0, ease:Math.max(1.3, previous.ease - .2), stage:'learning', lapses:previous.lapses + (previous.totalReviews > 0 ? 1 : 0), streak:0};
  const ease = Math.min(3, Math.max(1.3, previous.ease + (rating === 'hard' ? -.15 : rating === 'easy' ? .15 : 0)));
  const initial = previous.interval < 1;
  const interval = Math.min(36500, initial ? (rating === 'easy' ? 4 : 1) : Math.max(previous.interval+1, Math.round(previous.interval*(rating === 'hard' ? 1.2 : rating === 'good' ? ease : ease*1.3))));
  return {...next, ease, interval, due:dueInDays(now, interval), stage:'review', streak:previous.streak+1};
}
export const isDue = (state: StudyState | undefined, now: Date) => !!state && state.totalReviews > 0 && !state.suspended && new Date(state.due).getTime() <= now.getTime();
