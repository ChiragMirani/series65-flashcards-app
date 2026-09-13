# AI content review — 2026-09-13

Reviewer: Claude (AI). This is **not** the qualified human review required by
[COMMERCIAL_RELEASE_BLOCKED.md](../COMMERCIAL_RELEASE_BLOCKED.md). No card's `reviewStatus` was changed.
Per-card flags from the first pass: [`content/review/ai-review-2026-09-13.json`](../content/review/ai-review-2026-09-13.json).

## Pass 1 — original 775 cards
All cards were read and checked against general Series 65, NASAA, SEC, FINRA, and IRS knowledge; every worked
calculation was recomputed. No clear errors in the core thresholds. Time-sensitive facts were verified online:
qualified-client thresholds of $1.4M / $2.7M effective June 29, 2026, and the SEC's September 3, 2026 proposal to
rescind pay-to-play Rule 206(4)-5 (proposal only).

## Fixes applied (pass 2)
| Issue | Resolution |
|---|---|
| Coverage gaps: economics 33 cards, no cards on major outline topics | Added `content/exam-coverage.ts`: 100 objectives, 245 cards (economics, fixed income, fund share classes, options strategies, portfolio strategy, trading, estate transfer, conduct rules). Deck is now 1,003 cards: laws 448, recommendations 253, vehicles 194, economics 108. |
| Source-note wording ("tested", "cram sheet") in 55 cards and 3 UI strings | Rewritten in `content/*.ts`, About, Progress, and Card details. Deck check finds zero occurrences. |
| SEC fund reporting card said "at least annually" | Rewritten: N-CSR semiannual, N-PORT monthly, N-CEN annual. |
| Closed-end NAV card relied on "commonly tested" framing | Reworded as a factual frequency statement. |
| 8 duplicate section-26 reminder rules (16 cards) and the meta annuity-default card | Removed. Saved study sessions now drop retired card IDs on resume (`lib/engine.ts`). |
| Duplicate explanations (578 cards) | Left as is: explanations sit in a collapsed Card details panel, so repetition is not shown by default. |

## Pass 2 — new and changed cards
All 245 new cards and 53 wording-changed cards were read after the deck was generated (so acronym expansion is
checked as rendered). Every calculation was recomputed. Fixes made during this pass: a doubled
"unit investment trust (UIT)" expansion, "Under capital asset pricing model" grammar, and a more precise
selling-away answer (written notice; approval when compensated).

New public references were link-checked. Pages that returned 404 were replaced; investor.gov pages that block
automated checks point to verified investor.gov pages or the investor.gov glossary.

## Still open for the human reviewer
- Confirm the Uniform Securities Act civil-liability convention (two years from discovery / three years) against the
  1956 Act text used by the exam.
- The visiting-customer broker-dealer exclusion originates in the 2002 Act; add a source note.
- Recheck the pay-to-play card when the SEC finalizes or withdraws the rescission.
- Clients contracting before 2026-06-29 may rely on the older $1.1M / $2.2M qualified-client thresholds.
- Every card, including the new coverage cards, remains draft until a qualified human review.
