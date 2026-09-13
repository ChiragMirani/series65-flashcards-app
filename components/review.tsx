'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useStudy } from './study-provider';
import { cardById } from '@/lib/deck';
import { categories, type Category, type Card } from '@/lib/model';
import { selectionFromSearch, type StudyOrder } from '@/lib/study-selection';
import { AnswerDetails, CardActions } from './card-actions';

export function Review() {
  const { data, busy, error, dispatch } = useStudy();
  const opened = useRef(false);
  const session = data?.session?.scope === 'full-deck' ? data.session : null;
  useEffect(() => {
    if (!data || busy || error) return;
    if (!opened.current) {
      opened.current = true;
      const shared = selectionFromSearch(window.location.search);
      if (shared) {
        window.history.replaceState(window.history.state, '', window.location.pathname);
        if (!session || session.category !== shared.category || session.mode !== shared.mode) {
          void dispatch({ type: 'start', fullDeck: true, ...shared, now: new Date().toISOString() });
          return;
        }
      }
    }
    if (!session) void dispatch({ type: 'start', fullDeck: true, resume: true, category: data.session?.category, mode: data.session?.mode, now: new Date().toISOString() });
  }, [data, session, busy, error, dispatch]);
  if (!data || !session) return <div className="page review-page" role="status">Opening your cards…</div>;

  const mode = session.mode ?? 'random';
  const card = cardById.get(session.queue[0]);
  const position = card ? session.order!.indexOf(card.id) + 1 : session.initialCount;
  const select = (category:Category|undefined, order:StudyOrder=mode) => dispatch({ type: 'start', fullDeck: true, category, mode: order, now: new Date().toISOString() });
  return <div className="page review-page single-study">
    <h1 className="sr-only">Series 65 flashcards</h1>
    <div className="study-controls"><label htmlFor="review-area">Subject</label><select id="review-area" value={session.category ?? 'all'} disabled={busy} onChange={event => void select(event.target.value === 'all' ? undefined : event.target.value as Category)}>
      <option value="all">All subjects</option>
      {(Object.keys(categories) as Category[]).map(category => <option key={category} value={category}>{categories[category].title}</option>)}
    </select></div>
    {card ? <ReviewCard key={`${session.id}:${session.ratings}:${card.id}`} card={card} position={position} total={session.initialCount}/> : <div className="study-stage"><section className="flashcard deck-finished"><h2>{session.initialCount ? 'Deck complete.' : 'No active cards.'}</h2><p>{session.initialCount ? 'Your place is saved.' : 'Choose another subject or resume cards in Browse.'}</p>{session.initialCount > 0 && <button className="button primary" disabled={busy} onClick={() => void select(session.category)}>Review again</button>}</section></div>}
    <div className="study-order" role="group" aria-label="Card order"><button type="button" aria-pressed={mode === 'random'} disabled={busy} onClick={() => { if (mode !== 'random') void select(session.category, 'random'); }}>Shuffle</button><button type="button" aria-pressed={mode === 'scheduled'} disabled={busy} onClick={() => { if (mode !== 'scheduled') void select(session.category, 'scheduled'); }}>Sequential</button></div>
    {card && <details className="study-extras" key={card.id}><summary>Card details</summary><div className="study-extra-content"><p>Section {card.section} · {card.sectionTitle}</p><p className="micro muted">{card.type} · {card.reviewStatus}{card.retest ? ' · Retest' : ''}</p><AnswerDetails card={card}/><CardActions card={card}/></div></details>}
  </div>;
}

export function LegacyReviewRedirect() {
  const router = useRouter();
  useEffect(() => { router.replace('/'); }, [router]);
  return <Review/>;
}

function ReviewCard({ card, position, total }: { card:Card; position:number; total:number }) {
  const { data, busy, dispatch } = useStudy();
  const [revealed, setRevealed] = useState(false);
  const face = useRef<HTMLButtonElement>(null);
  const session = data!.session!;
  const advance = useCallback(async () => {
    if (busy) return;
    await dispatch({ type: 'advance', cardId: card.id, sessionId: session.id, expectedRatings: session.ratings });
  }, [busy, dispatch, card.id, session.id, session.ratings]);
  const previous = () => dispatch({ type: 'previous', cardId: card.id, sessionId: session.id, expectedRatings: session.ratings });
  useEffect(() => { window.scrollTo(0, 0); }, [card.id]);
  useEffect(() => {
    const handler = (event:KeyboardEvent) => {
      if ((event.target as HTMLElement).closest('input,textarea,select,button,a,summary,dialog')) return;
      if ([' ', 'Enter'].includes(event.key)) {
        event.preventDefault();
        if (!event.repeat && !busy) { if (revealed) void advance(); else setRevealed(true); }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [revealed, busy, advance]);
  useEffect(() => { if (revealed) face.current?.focus({ preventScroll: true }); }, [revealed]);
  return <div className="study-stage"><section className="flashcard vocab-card" aria-label="Study card">
    <span className="card-draft">{card.reviewStatus}</span>
    <button className="card-arrow previous" aria-label="Previous card" disabled={busy || position <= 1} onClick={() => void previous()}><ChevronLeft aria-hidden="true"/></button>
    <button ref={face} className={`study-face ${revealed ? 'answer-button' : 'question-button'}`} disabled={busy} aria-label={revealed ? 'Next card' : 'Reveal answer'} aria-describedby={`prompt-${card.id}${revealed ? ` answer-${card.id}` : ''}`} onClick={() => { if (revealed) void advance(); else setRevealed(true); }} onKeyDown={event => { if (event.repeat && [' ', 'Enter'].includes(event.key)) event.preventDefault(); }}>
      <span className="study-question" id={`prompt-${card.id}`}>{card.front}</span>
      <span className={`study-answer-wrap ${revealed ? 'show' : ''}`} aria-hidden={!revealed}><span className="study-answer-clip"><span className="answer-text" id={`answer-${card.id}`}>{card.answer}</span></span></span>
      <small className="study-hint">{revealed ? 'tap for next' : 'tap to reveal'}</small>
    </button>
    <button className="card-arrow next" aria-label="Skip to next card" disabled={busy} onClick={() => void advance()}><ChevronRight aria-hidden="true"/></button>
    <p className="card-position" aria-live="polite" aria-atomic="true">{position} of {total}</p>
    <span className="sr-only" role="status">{revealed ? 'Answer revealed. Tap again for the next card.' : 'Question ready.'}</span>
  </section></div>;
}
