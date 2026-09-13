# Tap-through review and retained scheduling

The rating controls have been removed from Study as requested. Tap the centered card to reveal the answer, then tap again to advance. The question remains at the same font size while moving upward as the answer expands below. The reveal uses a short height/opacity transition and respects reduced-motion preferences. Side arrows support previous/next navigation. Each advance saves the pending queue and visited-card set, without changing schedules or recording an invented recall rating. Refresh and offline use preserve the current place. Details and bookmark/report controls do not advance the card. Space and Enter follow the same reveal/advance flow.

The retained engine in `lib/scheduler.ts` is a deterministic four-rating adaptation of [SuperMemo 2](https://www.super-memory.com/english/ol/sm2.htm), with explicit same-session relearning. It is not FSRS, does not claim SM-2's exact historical formula, and has not been validated as a predictor of exam performance.

The following rating rules describe the retained engine and historical backups, not the current tap-through interface. Tests continue to protect existing data compatibility. Inject the review instant into the engine; React and the repository do not supply hidden scheduling randomness.

| Rating | First review or relearning | Established review |
|---|---|---|
| Again | Enter learning; interval 0; due in 60 seconds | Same, with a lapse counted if the card was previously reviewed |
| Hard | 1 day | Prior interval × 1.2, rounded, at least one day longer |
| Good | 1 day | Prior interval × updated ease, rounded, at least one day longer |
| Easy | 4 days | Prior interval × updated ease × 1.3, rounded, at least one day longer |

Ease begins at 2.5. Again decreases it by 0.20, Hard by 0.15, Good leaves it unchanged, and Easy increases it by 0.15. It is clamped to 1.3–3.0. Intervals cap at 36,500 days. A failed mature card restarts at a short interval after successful relearning rather than immediately returning to its former interval. Successful-review streak resets on Again. The initial failed exposure is not counted as a lapse; later failures are.

## One-page full-deck study

- Study opens a flashcard on the home page. A dropdown selects All subjects or one of four areas. Shuffle and Sequential control ordering independently, without a Start screen or navigation to a second review page. Old `/review/` bookmarks redirect home.
- All subjects includes every active card (632 in the current deck). Subject selections include all active cards in that category: laws 321, recommendations 187, vehicles 96, economics 28. Suspended cards are excluded. Due dates and legacy daily/session caps do not restrict full-deck selection.
- Shuffle uses Fisher-Yates with a Mulberry32 seed derived from the supplied timestamp and snapshot revision. Sequential uses the compiled deck order. Both work for the full deck and each subject. The full order, pending queue, selected subject, and ratings are saved together. Changing the dropdown starts that selection at card 1 while retaining all previously saved ratings and schedules.
- The counter displays the current card's position in the saved order and that selection's unique-card total. Tapping the answer or the next arrow moves to the next number. The previous arrow restores the preceding card from the saved order. Advancing marks that card visited in the current pass; it does not assert that the learner recalled it correctly.
- In the retained rating engine, Again places the current card behind up to two pending cards. This intentional same-session step is based on intervening cards, not a forced timer. If it is the only card, it can be retried immediately. Its persisted due timestamp is one minute later for another session.
- Every pending card ID is unique. Tap-through navigation removes the current card once. Only the retained rating engine can deliberately requeue failed cards.
- Session queue and visited-card set are committed together in one IndexedDB transaction before the interface advances. Rating events and schedules stay unchanged.
- Refresh and returning to Study restore the selection, order, and current card automatically, including a completed deck. A completed deck can be reviewed again explicitly or replaced using the dropdown.
- Suspending a card removes it from the pending queue and saved order, reducing the total. Browse can resume it for the next selection. Bookmarks do not alter its schedule.
- Reset this deck clears its progress, bookmarks, suspensions, session, and reports while preserving settings. Reset all also restores settings. These controls require an explicit confirmation in the app and recommend export first.

## Compatibility

Earlier versions selected limited due/new sessions. The original pure selection function and its tests remain available, and old backups still validate. On the first visit to the new Study page, an old limited session is expanded into a full-deck selection; its saved ratings, schedules, bookmarks, and settings are preserved. Subsequent visits resume the full-deck position. Legacy limit values remain in stored settings for backup compatibility and have no controls in the simplified interface. Scheduling and Progress metrics still record due dates, although the Study selector intentionally allows early review of any active card.

## Time and metrics

Due timestamps and review timestamps are ISO 8601 UTC. Day-based reviews are due at midnight UTC on the target date; the same instant yields the same answer in every local timezone, including across daylight-saving changes. Streaks include today or the immediately preceding UTC day, then count backward over consecutive active days. The UI identifies this calendar convention.

Mature means a review-stage interval of at least 21 days. Learning includes reviewed, active cards below that threshold or in relearning. Accuracy is the fraction of self-ratings other than Again. These are learning indicators, not scored question correctness or validated exam readiness.
