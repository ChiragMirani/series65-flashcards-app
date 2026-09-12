import raw from '../content/deck.json';
import { cardSchema } from './model';
export const deck = cardSchema.array().parse(raw);
export const sections = [...new Map(deck.map(c=>[c.section,{number:c.section,title:c.sectionTitle}])).values()];
export const cardById = new Map(deck.map(c=>[c.id,c]));
