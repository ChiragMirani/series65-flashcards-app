'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStudy } from './study-provider';
import { categories, type Category } from '@/lib/model';

export function Dashboard() {
  const { data, busy, dispatch } = useStudy();
  const router = useRouter();
  const [selection, setSelection] = useState<Category | 'random' | null>(null);
  if (!data) return <div className="page minimal-study" role="status"><h1>Opening your cards…</h1></div>;

  const choice = selection ?? data.session?.category ?? 'random';
  const canContinue = !!data.session?.queue.length && (data.session.category === choice || (choice === 'random' && data.session.mode === 'random' && !data.session.category));
  const start = async () => {
    const timestamp = new Date().toISOString();
    const command = canContinue ? { type: 'start' as const, now: timestamp }
      : choice === 'random' ? { type: 'start' as const, now: timestamp, mode: 'random' as const }
      : { type: 'start' as const, now: timestamp, category: choice };
    if (await dispatch(command)) router.push('/review/');
  };

  return <div className="page minimal-study">
    <section className="study-form" aria-labelledby="study-title">
      <h1 id="study-title">Let’s review.</h1>
      <div className="review-choice">
        <label htmlFor="review-area">Review area</label>
        <select id="review-area" value={choice} disabled={busy} onChange={event => setSelection(event.target.value as Category | 'random')}>
          <option value="random">Random</option>
          {(Object.keys(categories) as Category[]).map(category => <option key={category} value={category}>{categories[category].title}</option>)}
        </select>
      </div>
      <button className="button primary" disabled={busy} onClick={() => void start()}>{canContinue ? 'Continue review' : 'Start review'}</button>
      <p className="micro muted">Up to {data.settings.sessionLength} cards. Your progress saves automatically.</p>
    </section>
  </div>;
}
