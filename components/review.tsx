'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RotateCcw } from 'lucide-react';
import { useStudy } from './study-provider';
import { cardById } from '@/lib/deck';
import { categories, type Category, type Card, type Rating } from '@/lib/model';
import { freshState, schedule } from '@/lib/scheduler';
import { AnswerDetails, CardActions } from './card-actions';
const ratings: Rating[] = ['again', 'hard', 'good', 'easy'];

export function Review() {
  const { data, busy, error, dispatch } = useStudy();
  const session = data?.session?.scope === 'full-deck' ? data.session : null;
  useEffect(() => {
    if (data && !session && !busy && !error) void dispatch({ type: 'start', fullDeck: true, resume: true, category: data.session?.category, now: new Date().toISOString() });
  }, [data, session, busy, error, dispatch]);
  if (!data || !session) return <div className="page review-page" role="status">Opening your cards…</div>;

  const choice = session.category ?? 'random';
  const card = cardById.get(session.queue[0]);
  const position = card ? session.order!.indexOf(card.id) + 1 : session.initialCount;
  const select = (value: Category | 'random') => dispatch({ type: 'start', fullDeck: true, category: value === 'random' ? undefined : value, now: new Date().toISOString() });
  return <div className="page review-page single-study">
    <h1 className="sr-only">Series 65 flashcards</h1>
    <div className="study-controls">
      <div className="review-choice"><label htmlFor="review-area">Review area</label><select id="review-area" value={choice} disabled={busy} onChange={event => void select(event.target.value as Category | 'random')}>
        <option value="random">Random</option>
        {(Object.keys(categories) as Category[]).map(category => <option key={category} value={category}>{categories[category].title}</option>)}
      </select></div>
      <p className="card-position" aria-live="polite" aria-atomic="true">{position} of {session.initialCount}</p>
    </div>
    {card ? <ReviewCard key={`${session.id}:${session.ratings}:${card.id}`} card={card}/> : <section className="flashcard deck-finished"><h2>{session.initialCount ? 'Deck complete.' : 'No active cards.'}</h2><p>{session.initialCount ? 'Your reviews are saved. Choose another subject or review this deck again.' : 'You can choose another subject or resume suspended cards in Browse.'}</p>{session.initialCount > 0 && <button className="button primary" disabled={busy} onClick={() => void select(choice)}>Review again</button>}</section>}
  </div>;
}

/** Old bookmarks resolve to the same study page, not a separate review screen. */
export function LegacyReviewRedirect() {
  const router = useRouter();
  useEffect(() => { router.replace('/'); }, [router]);
  return <Review/>;
}

function ReviewCard({ card }: { card: Card }) {
  const { data, now, busy, dispatch } = useStudy();
  const [revealed, setRevealed] = useState(false);
  const answerRef = useRef<HTMLHeadingElement>(null);
  const session = data!.session!;
  useEffect(() => { window.scrollTo(0, 0); }, [card.id]);
  const rate = useCallback(async (rating: Rating) => {
    if (!revealed || busy) return;
    await dispatch({ type: 'rate', cardId: card.id, sessionId: session.id, expectedRatings: session.ratings, rating, now: new Date().toISOString() });
  }, [revealed, busy, dispatch, card.id, session.id, session.ratings]);
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('input,textarea,select,button,a,summary,dialog')) return;
      if ((event.key === ' ' || event.key === 'Enter') && !revealed) { event.preventDefault(); setRevealed(true); }
      else if (revealed && ['1', '2', '3', '4'].includes(event.key)) { event.preventDefault(); void rate(ratings[Number(event.key) - 1]); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [revealed, rate]);
  useEffect(() => { if (revealed) answerRef.current?.focus(); }, [revealed]);

  return <>
    <div className="review-meta"><span>Section {card.section} · {card.sectionTitle}</span><span className="badge">{card.type}</span></div>
    <section className={`flashcard ${revealed ? 'revealed' : ''}`} aria-label="Study card">
      <div className="flashcard-top"><span className="eyebrow">{revealed ? 'THE ANSWER' : 'RECALL THE RULE'}</span><div>{card.retest && <span className="badge blue">Retest</span>}<span className="badge">Draft</span></div></div>
      {!revealed ? <button className="question-button" disabled={busy} onClick={() => setRevealed(true)} aria-label={`Reveal answer: ${card.front}`}><span>{card.front}</span><small>Tap to reveal the answer</small></button> : <div className="answer-body"><p className="question-reminder">{card.front}</p><h2 ref={answerRef} tabIndex={-1} className="answer-text">{card.answer}</h2><AnswerDetails card={card}/></div>}
      <CardActions card={card}/>
    </section>
    <div className="sr-only" role="status" aria-live="polite">{revealed ? 'Answer revealed. Rate your recall with Again, Hard, Good, or Easy.' : 'Question ready.'}</div>
    {revealed ? <section className="rating-section" aria-label="Rate your recall"><p>How well did you recall it?</p><div className="rating-grid">{ratings.map((rating, index) => {
      const next = schedule(data!.states[card.id] || freshState(card.id, now), rating, now);
      return <button key={rating} className={`rating ${rating}`} disabled={busy} onClick={() => void rate(rating)}><span>{rating === 'again' ? <RotateCcw aria-hidden="true"/> : null}{rating[0].toUpperCase() + rating.slice(1)}</span><small>{rating === 'again' ? 'Again soon' : `${next.interval} day${next.interval === 1 ? '' : 's'}`}</small><kbd>{index + 1}</kbd></button>;
    })}</div></section> : <div className="reveal-area"><button className="button primary" disabled={busy} onClick={() => setRevealed(true)}>Reveal answer</button></div>}
  </>;
}
