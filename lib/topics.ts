import { deck } from './deck';
import type { Card } from './model';

export interface Topic { section:number; slug:string; title:string; cards:Card[] }
// Readable, stable URLs: keep whole words, capped near 60 characters.
const slugify = (value:string) => { let slug=''; for(const word of value.toLowerCase().replace(/&/g,' and ').replace(/[^a-z0-9]+/g,' ').trim().split(' ')) { if(slug && slug.length+word.length>=60) break; slug=slug?`${slug}-${word}`:word; } return slug; };
/** One public, server-rendered question-and-answer page per deck section. */
export const topics: Topic[] = [...new Set(deck.map(card => card.section))].sort((a,b) => a-b).map(section => {
  const cards = deck.filter(card => card.section === section);
  const title = cards[0].sectionTitle;
  return { section, slug: `section-${section}-${slugify(title)}`, title, cards };
});
export const topicBySlug = new Map(topics.map(topic => [topic.slug, topic]));
