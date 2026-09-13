# Spaced repetition

The engine in `lib/scheduler.ts` is a deterministic four-rating adaptation of [SuperMemo 2](https://www.super-memory.com/english/ol/sm2.htm), with explicit same-session relearning. It is not FSRS, does not claim SM-2's exact historical formula, and has not been validated as a predictor of exam performance.

Inject the review instant into the engine; React and the repository do not supply hidden scheduling randomness.

| Rating | First review or relearning | Established review |
|---|---|---|
| Again | Enter learning; interval 0; due in 60 seconds | Same, with a lapse counted if the card was previously reviewed |
| Hard | 1 day | Prior interval × 1.2, rounded, at least one day longer |
| Good | 1 day | Prior interval × updated ease, rounded, at least one day longer |
| Easy | 4 days | Prior interval × updated ease × 1.3, rounded, at least one day longer |

Ease begins at 2.5. Again decreases it by 0.20, Hard by 0.15, Good leaves it unchanged, and Easy increases it by 0.15. It is clamped to 1.3–3.0. Intervals cap at 36,500 days. A failed mature card restarts at a short interval after successful relearning rather than immediately returning to its former interval. Successful-review streak resets on Again. The initial failed exposure is not counted as a lapse; later failures are.

## Sessions and daily limits

- Due cards precede new cards. Learning cards precede other due cards, followed by greater lapse count to focus on weak recall. Retest priority, exam priority, and stable ID then provide deterministic selection.
- Daily limits restrict initial card selection. The day boundary is UTC. Distinct newly introduced card IDs and distinct previously reviewed card IDs are counted from the day's event log.
- Again places the current card behind up to two pending cards. This intentional same-session step is based on intervening cards, not a forced timer. If it is the only card, it can be retried immediately. Its persisted due timestamp is one minute later for another session.
- Every pending card ID is unique. Only Again deliberately requeues it. Relearning can increase the number of rating attempts beyond the selected unique-card limit.
- Session queue, completion set, review events, and schedule are committed together in one IndexedDB transaction before the interface advances.
- Refresh and Continue session restore the queue. Save & exit does not discard it. A targeted section/retest start replaces the pending selection, while preserving all already-saved reviews.
- Suspending a card removes it from the pending queue and future selection. Browse can resume it. Bookmarks do not alter its schedule.
- Reset this deck clears its progress, bookmarks, suspensions, session, and reports while preserving settings. Reset all also restores settings. These controls require an explicit confirmation in the app and recommend export first.

## Time and metrics

Due timestamps and review timestamps are ISO 8601 UTC. Day-based reviews are due at midnight UTC on the target date; the same instant yields the same answer in every local timezone, including across daylight-saving changes. Streaks include today or the immediately preceding UTC day, then count backward over consecutive active days. The UI identifies this calendar convention.

Mature means a review-stage interval of at least 21 days. Learning includes reviewed, active cards below that threshold or in relearning. Accuracy is the fraction of self-ratings other than Again. These are learning indicators, not scored question correctness or validated exam readiness.
