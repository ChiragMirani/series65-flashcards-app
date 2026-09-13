import type { Card, Category, Rating, Settings, Snapshot, Session } from './model';
import { emptySnapshot } from './model';
import { freshState, isDue, schedule, utcDay } from './scheduler';
import { shuffled } from './shuffle';
export type Command =
  | {type:'start'; now:string; section?:number; retestOnly?:boolean; mode?:'random'|'scheduled'; category?:Category; fullDeck?:boolean; resume?:boolean}
  | {type:'rate'; cardId:string; rating:Rating; now:string; sessionId:string; expectedRatings?:number}
  | {type:'advance'; cardId:string; sessionId:string; expectedRatings:number}
  | {type:'previous'; cardId:string; sessionId:string; expectedRatings:number}
  | {type:'flag'; cardId:string; flag:'bookmarked'|'suspended'; value:boolean; now:string}
  | {type:'settings'; settings:Settings}
  | {type:'issue'; cardId:string; text:string; now:string}
  | {type:'reset'; scope:'deck'|'all'}
  | {type:'import'; data:Snapshot};
export function makeSession(cards: Card[], state: Snapshot, now: Date, section?:number, retestOnly=false, mode:'scheduled'|'random'='scheduled', category?:Category): Session {
  const today = state.events.filter(e=>utcDay(e.at)===utcDay(now));
  const newUsed = new Set(today.filter(e=>e.wasNew).map(e=>e.cardId)).size;
  const reviewUsed = new Set(today.filter(e=>!e.wasNew).map(e=>e.cardId)).size;
  const available = cards.filter(c=>(!section || c.section===section) && (!category || c.category===category) && (!retestOnly || c.retest) && !state.states[c.id]?.suspended);
  const rank = (a:Card,b:Card) => Number(b.retest)-Number(a.retest) || ({high:0,medium:1,low:2}[a.priority]-{high:0,medium:1,low:2}[b.priority]) || a.id.localeCompare(b.id);
  const due = available.filter(c=>isDue(state.states[c.id],now)).sort((a,b)=>Number(state.states[b.id].stage==='learning')-Number(state.states[a.id].stage==='learning') || state.states[b.id].lapses-state.states[a.id].lapses || rank(a,b));
  const fresh = available.filter(c=>!state.states[c.id]?.totalReviews).sort(rank);
  const seed=(now.getTime() ^ state.revision) >>> 0;
  const duePool=mode==='random'?shuffled(due,seed):due;
  const newPool=mode==='random'?shuffled(fresh,seed+1):fresh;
  const candidates=[...duePool.slice(0,Math.max(0,state.settings.dailyReviews-reviewUsed)),...newPool.slice(0,Math.max(0,state.settings.dailyNew-newUsed))];
  const queue=(mode==='random'?shuffled(candidates,seed+2):candidates).slice(0,state.settings.sessionLength).map(c=>c.id);
  return {id:now.toISOString(), mode, ...(category?{category}:{}), startedAt:now.toISOString(), queue, completed:[], initialCount:queue.length, ratings:0};
}
export function makeFullDeckSession(cards:Card[], state:Snapshot, now:Date, category?:Category, mode:'random'|'scheduled'=category?'scheduled':'random'):Session {
  const available=cards.filter(c=>(!category||c.category===category)&&!state.states[c.id]?.suspended);
  const selected=mode==='random'?shuffled(available,(now.getTime()^state.revision)>>>0):available;
  const order=selected.map(c=>c.id);
  return {id:`${now.toISOString()}:${state.revision}`,scope:'full-deck',mode,...(category?{category}:{}),order,queue:[...order],completed:[],initialCount:order.length,ratings:0,startedAt:now.toISOString()};
}
export function reduceSnapshot(state: Snapshot, command: Command, cards: Card[]): Snapshot {
  let next: Snapshot = {...state, states:{...state.states}};
  if(command.type==='reset') next = command.scope==='all' ? emptySnapshot() : {...state,states:{},events:[],session:null,issues:[]};
  else if(command.type==='import') next = {...command.data,states:{...command.data.states}};
  else if(command.type==='settings') next.settings = command.settings;
  else if(command.type==='start') {
    if(command.fullDeck) {
      if(command.resume&&state.session?.scope==='full-deck') {
        // A content update can also retire cards: drop IDs no longer in the deck.
        const known=new Set(cards.map(c=>c.id));
        const session={...state.session,order:state.session.order!.filter(id=>known.has(id)),queue:state.session.queue.filter(id=>known.has(id)),completed:state.session.completed.filter(id=>known.has(id))};
        const removed=session.order.length!==state.session.order!.length;
        const saved=new Set(session.order);
        const eligible=makeFullDeckSession(cards,state,new Date(command.now),session.category,session.mode);
        const added=eligible.order!.filter(id=>!saved.has(id));
        if(!added.length&&!removed) return state;
        // A content update must not move the current card or erase completed work.
        // Append newly available cards once, within the saved subject and mode.
        const order=[...session.order,...added];
        next.session={...session,order,queue:[...session.queue,...added],initialCount:order.length};
      } else next.session=makeFullDeckSession(cards,state,new Date(command.now),command.category,command.mode);
    } else {
      if(state.session?.queue.length && !command.section && !command.retestOnly && !command.category && command.mode!=='random') return state;
      next.session = makeSession(cards, state, new Date(command.now),command.section,command.retestOnly,command.mode,command.category);
    }
  } else {
    if(!cards.some(c=>c.id===command.cardId)) throw new Error('This card is no longer in the current deck.');
    if(command.type==='issue') next.issues=[...state.issues,{cardId:command.cardId,text:command.text.trim(),at:command.now}];
    if(command.type==='flag') {
      next.states[command.cardId]={...(state.states[command.cardId] || freshState(command.cardId,new Date(command.now))),[command.flag]:command.value};
      if(command.flag==='suspended' && command.value && state.session) {
        if(state.session.scope==='full-deck') {
          const order=state.session.order!.filter(id=>id!==command.cardId);
          next.session={...state.session,order,initialCount:order.length,queue:state.session.queue.filter(id=>id!==command.cardId),completed:state.session.completed.filter(id=>id!==command.cardId)};
        } else next.session={...state.session,queue:state.session.queue.filter(id=>id!==command.cardId),completed:[...new Set([...state.session.completed,command.cardId])]};
      }
    }
    if(command.type==='rate'||command.type==='advance'||command.type==='previous') {
      if(!state.session || state.session.id!==command.sessionId || state.session.queue[0]!==command.cardId || (command.expectedRatings!==undefined && state.session.ratings!==command.expectedRatings)) throw new Error('This session changed in another tab. Reloaded the latest progress.');
    }
    if(command.type==='advance') {
      // Navigation is not a recall rating: preserve schedules and accuracy data.
      next.session={...state.session!,queue:state.session!.queue.slice(1),completed:[...new Set([...state.session!.completed,command.cardId])]};
    }
    if(command.type==='previous') {
      const session=state.session!;
      const index=session.order?.indexOf(command.cardId)??-1;
      if(index<=0) return state;
      const previous=session.order![index-1];
      next.session={...session,queue:[previous,...session.queue.filter(id=>id!==previous)],completed:session.completed.filter(id=>id!==previous)};
    }
    if(command.type==='rate') {
      const session=state.session!;
      const previous=state.states[command.cardId] || freshState(command.cardId,new Date(command.now));
      next.states[command.cardId]=schedule(previous,command.rating,new Date(command.now));
      const queue=session.queue.slice(1);
      if(command.rating==='again') queue.splice(Math.min(2,queue.length),0,command.cardId);
      next.session={...session,queue,ratings:session.ratings+1,completed:command.rating==='again'?session.completed:[...new Set([...session.completed,command.cardId])]};
      next.events=[...state.events,{id:`${session.id}:${session.ratings}`,cardId:command.cardId,at:command.now,rating:command.rating,wasNew:previous.totalReviews===0}];
    }
  }
  return {...next,revision:state.revision+1};
}
