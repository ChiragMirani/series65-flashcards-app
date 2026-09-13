'use client';
import { useCallback,useEffect,useRef,useState } from 'react';
import Link from 'next/link';
import { ArrowLeft,CheckCircle2,RotateCcw } from 'lucide-react';
import { useStudy } from './study-provider';
import { cardById } from '@/lib/deck';
import { categories,type Card,type Rating } from '@/lib/model';
import { freshState,schedule } from '@/lib/scheduler';
import { AnswerDetails,CardActions } from './card-actions';
import { Dashboard } from './dashboard';
const ratings:Rating[]=['again','hard','good','easy'];
export function Review(){
  const {data}=useStudy();
  if(!data)return <div className="page loading" role="status">Opening your study session…</div>;
  const session=data.session;const card=session?.queue[0]?cardById.get(session.queue[0]):null;
  if(!session)return <Dashboard/>;
  if(!card)return <div className="page narrow empty-state"><CheckCircle2 aria-hidden="true" className="finish-icon"/><p className="eyebrow">{session.ratings?'SESSION COMPLETE':'ALL CAUGHT UP FOR NOW'}</p><h1>{session.ratings?'A little clearer.':'Nothing ready in this session.'}</h1><p>{session.ratings?`${session.completed.length} cards completed · ${session.ratings} reviews saved.`:'Your daily limits may be reached, cards may be suspended, or the next review may be later. You can still browse the full deck.'}</p><div className="button-row"><Link className="button primary" href="/">Back to study</Link><Link className="button secondary" href="/browse/">Browse cards</Link></div></div>;
  return <ReviewCard key={`${session.id}:${session.ratings}:${card.id}`} card={card}/>;
}
function ReviewCard({card}:{card:Card}){
  const {data,now,busy,dispatch}=useStudy();const [revealed,setRevealed]=useState(false);const answerRef=useRef<HTMLHeadingElement>(null);
  const session=data!.session!;const progress=session.initialCount?Math.round(session.completed.length/session.initialCount*100):0;
  useEffect(()=>{window.scrollTo(0,0);},[card.id]);
  const rate=useCallback(async(rating:Rating)=>{if(!revealed||busy)return;await dispatch({type:'rate',cardId:card.id,sessionId:session.id,expectedRatings:session.ratings,rating,now:new Date().toISOString()});},[revealed,busy,dispatch,card.id,session.id,session.ratings]);
  useEffect(()=>{const handler=(e:KeyboardEvent)=>{const target=e.target as HTMLElement;if(target.closest('input,textarea,select,button,a,summary,dialog'))return;if((e.key===' '||e.key==='Enter')&&!revealed){e.preventDefault();setRevealed(true);}else if(revealed&&['1','2','3','4'].includes(e.key)){e.preventDefault();void rate(ratings[Number(e.key)-1]);}};window.addEventListener('keydown',handler);return()=>window.removeEventListener('keydown',handler);},[revealed,rate]);
  useEffect(()=>{if(revealed)answerRef.current?.focus();},[revealed]);
  return <div className="page review-page"><div className="review-top"><Link href="/"><ArrowLeft aria-hidden="true"/>Save & exit</Link><span>{session.completed.length} of {session.initialCount} complete</span><span>{session.queue.length} remaining</span></div>{(session.mode==='random'||session.category)&&<p className="eyebrow session-mode">{session.mode==='random'?'Random review':categories[session.category!].title}</p>}<div className="meter session-meter" role="progressbar" aria-label="Session completion" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}><span style={{width:`${progress}%`}}/></div><div className="review-meta"><span>Section {card.section} · {card.sectionTitle}</span><span className="badge">{card.type}</span></div>
    <section className={`flashcard ${revealed?'revealed':''}`} aria-label="Study card"><div className="flashcard-top"><span className="eyebrow">{revealed?'THE ANSWER':'TAKE A MOMENT TO RECALL'}</span><div>{card.retest&&<span className="badge blue">Retest</span>}<span className="badge">Draft</span></div></div>{!revealed?<button className="question-button" onClick={()=>setRevealed(true)} aria-label={`Reveal answer: ${card.front}`}><span>{card.front}</span><small>Tap to reveal the answer</small></button>:<div className="answer-body"><p className="question-reminder">{card.front}</p><h1 ref={answerRef} tabIndex={-1} className="answer-text">{card.answer}</h1><AnswerDetails card={card}/></div>}<CardActions card={card}/></section>
    <div className="sr-only" role="status" aria-live="polite">{revealed?'Answer revealed. Rate your recall with Again, Hard, Good, or Easy.':`Question ready. ${session.queue.length} cards remaining.`}</div>
    {revealed?<section className="rating-section" aria-label="Rate your recall"><p>How well did you recall it?</p><div className="rating-grid">{ratings.map((rating,i)=>{const next=schedule(data!.states[card.id]||freshState(card.id,now),rating,now);return <button key={rating} className={`rating ${rating}`} disabled={busy} onClick={()=>void rate(rating)}><span>{rating==='again'?<RotateCcw aria-hidden="true"/>:null}{rating[0].toUpperCase()+rating.slice(1)}</span><small>{rating==='again'?'This session':`${next.interval} day${next.interval===1?'':'s'}`}</small><kbd>{i+1}</kbd></button>;})}</div><p className="micro muted">Again repeats this card after up to two others. Ratings are saved immediately.</p></section>:<div className="reveal-area"><button className="button primary" onClick={()=>setRevealed(true)}>Reveal answer<span aria-hidden="true">↵</span></button><p className="micro muted">Keyboard: Space or Enter to reveal · 1–4 to rate</p></div>}
  </div>;
}
