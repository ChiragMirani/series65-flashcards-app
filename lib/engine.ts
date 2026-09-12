import type { Card, Rating, Settings, Snapshot, Session } from './model';
import { emptySnapshot } from './model';
import { freshState, isDue, schedule, utcDay } from './scheduler';
export type Command =
  | {type:'start'; now:string; section?:number; retestOnly?:boolean}
  | {type:'rate'; cardId:string; rating:Rating; now:string; sessionId:string}
  | {type:'flag'; cardId:string; flag:'bookmarked'|'suspended'; value:boolean; now:string}
  | {type:'settings'; settings:Settings}
  | {type:'issue'; cardId:string; text:string; now:string}
  | {type:'reset'; scope:'deck'|'all'}
  | {type:'import'; data:Snapshot};
export function makeSession(cards: Card[], state: Snapshot, now: Date, section?:number, retestOnly=false): Session {
  const today = state.events.filter(e=>utcDay(e.at)===utcDay(now));
  const newUsed = new Set(today.filter(e=>e.wasNew).map(e=>e.cardId)).size;
  const reviewUsed = new Set(today.filter(e=>!e.wasNew).map(e=>e.cardId)).size;
  const available = cards.filter(c=>(!section || c.section===section) && (!retestOnly || c.retest) && !state.states[c.id]?.suspended);
  const rank = (a:Card,b:Card) => Number(b.retest)-Number(a.retest) || ({high:0,medium:1,low:2}[a.priority]-{high:0,medium:1,low:2}[b.priority]) || a.id.localeCompare(b.id);
  const due = available.filter(c=>isDue(state.states[c.id],now)).sort((a,b)=>Number(state.states[b.id].stage==='learning')-Number(state.states[a.id].stage==='learning') || rank(a,b));
  const fresh = available.filter(c=>!state.states[c.id]?.totalReviews).sort(rank);
  const queue = [...due.slice(0,Math.max(0,state.settings.dailyReviews-reviewUsed)),...fresh.slice(0,Math.max(0,state.settings.dailyNew-newUsed))].slice(0,state.settings.sessionLength).map(c=>c.id);
  return {id:now.toISOString(), startedAt:now.toISOString(), queue, completed:[], initialCount:queue.length, ratings:0};
}
export function reduceSnapshot(state: Snapshot, command: Command, cards: Card[]): Snapshot {
  let next: Snapshot = {...state, states:{...state.states}};
  if(command.type==='reset') next = command.scope==='all' ? emptySnapshot() : {...state,states:{},events:[],session:null,issues:[]};
  else if(command.type==='import') next = {...command.data,states:{...command.data.states}};
  else if(command.type==='settings') next.settings = command.settings;
  else if(command.type==='start') {
    if(state.session?.queue.length && !command.section && !command.retestOnly) return state;
    next.session = makeSession(cards, state, new Date(command.now),command.section,command.retestOnly);
  } else {
    if(!cards.some(c=>c.id===command.cardId)) throw new Error('This card is no longer in the current deck.');
    if(command.type==='issue') next.issues=[...state.issues,{cardId:command.cardId,text:command.text.trim(),at:command.now}];
    if(command.type==='flag') {
      next.states[command.cardId]={...(state.states[command.cardId] || freshState(command.cardId,new Date(command.now))),[command.flag]:command.value};
      if(command.flag==='suspended' && command.value && state.session) next.session={...state.session,queue:state.session.queue.filter(id=>id!==command.cardId),completed:[...new Set([...state.session.completed,command.cardId])]};
    }
    if(command.type==='rate') {
      if(!state.session || state.session.id!==command.sessionId || state.session.queue[0]!==command.cardId) throw new Error('This session changed in another tab. Reloaded the latest progress.');
      const previous=state.states[command.cardId] || freshState(command.cardId,new Date(command.now));
      next.states[command.cardId]=schedule(previous,command.rating,new Date(command.now));
      const queue=state.session.queue.slice(1);
      if(command.rating==='again') queue.splice(Math.min(2,queue.length),0,command.cardId);
      next.session={...state.session,queue,ratings:state.session.ratings+1,completed:command.rating==='again'?state.session.completed:[...new Set([...state.session.completed,command.cardId])]};
      next.events=[...state.events,{id:`${state.session.id}:${state.session.ratings}`,cardId:command.cardId,at:command.now,rating:command.rating,wasNew:previous.totalReviews===0}];
    }
  }
  return {...next,revision:state.revision+1};
}
