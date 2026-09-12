import type { Card, Snapshot } from './model';
import { DAY, isDue, utcDay } from './scheduler';
export function statistics(cards:Card[],data:Snapshot,now:Date){
  const ids=new Set(cards.map(c=>c.id));
  const events=data.events.filter(e=>ids.has(e.cardId));
  const states=cards.map(c=>data.states[c.id]);
  const active=cards.filter(c=>!data.states[c.id]?.suspended);
  const mature=states.filter(s=>s && s.interval>=21 && s.stage==='review' && !s.suspended).length;
  return {total:cards.length,due:active.filter(c=>isDue(data.states[c.id],now)).length,new:active.filter(c=>!data.states[c.id]?.totalReviews).length,
    mature,learning:states.filter(s=>s && s.totalReviews>0 && (s.interval<21||s.stage==='learning') && !s.suspended).length,
    suspended:states.filter(s=>s?.suspended).length,reviews:events.length,
    accuracy:events.length?Math.round(events.filter(e=>e.rating!=='again').length/events.length*100):null,
    lapses:states.reduce((sum,s)=>sum+(s?.lapses||0),0),mastery:cards.length?Math.round(mature/cards.length*100):0};
}
export function activity(data:Snapshot,now:Date){
  return Array.from({length:7},(_,i)=>{
    const day=utcDay(new Date(now.getTime()-(6-i)*DAY));
    return {day,count:data.events.filter(e=>utcDay(e.at)===day).length};
  });
}
export function currentStreak(data:Snapshot,now:Date){
  const days=new Set(data.events.map(e=>utcDay(e.at)));
  let day=new Date(`${utcDay(now)}T00:00:00.000Z`);
  if(!days.has(utcDay(day))) day=new Date(day.getTime()-DAY);
  let count=0;
  while(days.has(utcDay(day))){count++;day=new Date(day.getTime()-DAY);}
  return count;
}
