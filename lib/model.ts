import { z } from 'zod';

export const categories = {
  laws: { title: 'Laws & ethics', full: 'Laws, regulations, and unethical business practices', weight: 30 },
  recommendations: { title: 'Recommendations', full: 'Client investment recommendations and strategies', weight: 30 },
  vehicles: { title: 'Investment vehicles', full: 'Investment vehicle characteristics', weight: 25 },
  economics: { title: 'Economics & business', full: 'Economic factors and business information', weight: 15 },
} as const;
export type Category = keyof typeof categories;
export const ratingSchema = z.enum(['again','hard','good','easy']);
export type Rating = z.infer<typeof ratingSchema>;
const iso = z.string().datetime();
const safeId = z.string().regex(/^s65-[a-z0-9-]+$/).max(140);
export const cardSchema = z.object({
  id: safeId, ruleId: safeId, deckId: z.literal('series65'),
  section: z.number().int().min(1).max(27), sectionTitle: z.string(),
  category: z.enum(['laws','recommendations','vehicles','economics']), priority: z.enum(['high','medium','low']),
  type: z.enum(['recall','application','contrast','calculation']),
  front: z.string().min(8), answer: z.string().min(2), governingRule: z.string().min(2),
  trap: z.string(), explanation: z.string(), memoryHook: z.string().optional(), tags: z.array(z.string()),
  sourcePath: z.string(), sourceHeading: z.string(), contentVersion: z.string().regex(/^[a-f0-9]{64}$/),
  retest: z.boolean(), reviewStatus: z.enum(['draft','reviewed','verified']),
});
export type Card = z.infer<typeof cardSchema>;
export const studySchema = z.object({
  cardId: safeId, due: iso, interval: z.number().min(0).max(36500), ease: z.number().min(1.3).max(3),
  stage: z.enum(['new','learning','review']), lastReviewed: iso.nullable(), lapses: z.number().int().nonnegative(),
  streak: z.number().int().nonnegative(), totalReviews: z.number().int().nonnegative(), lastRating: ratingSchema.nullable(),
  bookmarked: z.boolean(), suspended: z.boolean(),
});
export type StudyState = z.infer<typeof studySchema>;
export const settingsSchema = z.object({
  dailyNew: z.number().int().min(0).max(500), dailyReviews: z.number().int().min(0).max(2000),
  sessionLength: z.number().int().min(1).max(200), theme: z.enum(['light','dark','system']), reduceMotion: z.boolean(),
});
export type Settings = z.infer<typeof settingsSchema>;
export const eventSchema = z.object({ id: z.string().max(200), cardId: safeId, at: iso, rating: ratingSchema, wasNew: z.boolean() });
export type ReviewEvent = z.infer<typeof eventSchema>;
export const sessionSchema = z.object({
  mode: z.enum(['scheduled','random']).optional(), // Older saved sessions omit this field.
  category: z.enum(['laws','recommendations','vehicles','economics']).optional(),
  id: z.string().max(200), startedAt: iso, queue: z.array(safeId).max(1000), completed: z.array(safeId).max(1000),
  initialCount: z.number().int().nonnegative().max(200), ratings: z.number().int().nonnegative(),
});
export type Session = z.infer<typeof sessionSchema>;
export const snapshotSchema = z.object({
  version: z.literal(1), revision: z.number().int().nonnegative(),
  states: z.record(safeId, studySchema), settings: settingsSchema,
  events: z.array(eventSchema).max(200000), session: sessionSchema.nullable(),
  issues: z.array(z.object({cardId: safeId, text: z.string().min(1).max(2000), at: iso})).max(5000),
}).superRefine((s, ctx) => {
  for (const [id, state] of Object.entries(s.states)) if(id !== state.cardId) ctx.addIssue({code:'custom',message:'Card ID does not match progress key.'});
  if(s.session && new Set(s.session.queue).size !== s.session.queue.length) ctx.addIssue({code:'custom',message:'Session contains duplicate pending cards.'});
});
export type Snapshot = z.infer<typeof snapshotSchema>;
export const backupSchema = z.object({ app: z.literal('series65-review'), exportedAt: iso, data: snapshotSchema });
export const defaults: Settings = { dailyNew: 20, dailyReviews: 100, sessionLength: 20, theme: 'system', reduceMotion: false };
export const emptySnapshot = (): Snapshot => ({ version: 1, revision: 0, states: {}, settings: {...defaults}, events: [], session: null, issues: [] });
