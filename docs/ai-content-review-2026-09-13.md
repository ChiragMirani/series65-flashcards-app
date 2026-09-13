# AI content review — 2026-09-13

Reviewer: Claude (AI). This is **not** the qualified human review required by
[COMMERCIAL_RELEASE_BLOCKED.md](../COMMERCIAL_RELEASE_BLOCKED.md). No card's
`reviewStatus` was changed. Machine-readable flags: [`content/review/ai-review-2026-09-13.json`](../content/review/ai-review-2026-09-13.json).

## Scope
All 775 cards in `content/deck.json` (front, answer, trap, explanation) were read and checked
against general Series 65 / NASAA / SEC / IRS knowledge. Arithmetic on every worked example was recomputed.

## Result summary
- **Rules and numbers:** no clear factual errors found in the core thresholds (AUM $100M/$110M/$90M,
  net worth $35,000/$10,000, prepaid $500/$1,200 and six months, 30-day/noon effectiveness,
  90/120/180-day ADV clocks, Rule 144 periods and Form 144 thresholds, 12 CE credits,
  SIMPLE 25%, RMD 25%/10%, 529-to-Roth $35,000, Coverdell $2,000, $3,000 capital-loss limit, etc.).
- **Time-sensitive facts verified online:** qualified-client thresholds of $1.4M / $2.7M effective
  June 29, 2026; SEC proposal to rescind pay-to-play Rule 206(4)-5 on September 3, 2026 (proposal only).
- **All worked calculations are correct** (bond, deficiency bond, coverage ratio, Roth ordering,
  dual-basis gifts, option hedges, exclusion ratio, market cap, quick ratio, TEY).

## Issues to fix
| Severity | Cards | Issue |
|---|---|---|
| High (product) | 578 cards | `explanation` is identical to the answer/governingRule — adds nothing when shown. |
| High (coverage) | deck-wide | Major Series 65 outline topics have **zero** cards (see below). Economics is 33 cards (4%) vs ~15% of the exam; Investment Vehicles 129 (17%) vs ~25%. |
| Medium | s65-18-sec-report-recall/-contrast | "Investment companies report to the SEC at least annually" is oversimplified (N-CSR semiannual, N-PORT monthly, N-CEN annual). Reword or drop. |
| Medium | 55 cards | Source-note wording leaks into user text: "tested", "cram sheet", "the sheet" (e.g. s65-01-issuer-employee-recall, s65-03-state-civil-apply, s65-07-qualified-client-recall, s65-18-sec-report-contrast). |
| Low | s65-03-state-civil-* | 1956 Act text runs from the contract of sale; the 2-yr discovery / 3-yr comparison is the common exam-prep convention. Human reviewer should confirm wording. |
| Low | s65-01-bd-visitor-* | Visiting existing-customer exclusion comes from the 2002 Act; card elsewhere says the exam uses the 1956 Act. Add a note. |
| Low | s65-18-closed-nav-* | "At least weekly" closed-end NAV is weakly sourced; consider removing. |
| Low | s65-23-leading-recall | "New durable-goods orders" — Conference Board LEI uses specific new-orders series; acceptable but imprecise. |
| Low | s65-20-annuity-default-recall | Meta card about deck convention, not exam content. Remove. |
| Low | s65-26-* (21 cards) | Reminder section duplicates earlier cards nearly verbatim. |
| Watch | s65-09-pay-play-status-* | Re-check when the SEC finalizes or withdraws the rescission. |
| Watch | s65-07-client-* | Clients contracting before 2026-06-29 may rely on $1.1M / $2.2M. |

## Coverage gaps (0 cards found)
**Economics:** business cycle, GDP, CPI, monetary vs fiscal policy, Federal Reserve tools, yield curve shapes,
exchange rates, time value of money / present value, beta, alpha, Sharpe ratio, time- vs dollar-weighted return,
P/E and dividend yield.

**Investment vehicles:** Treasury bills/notes/bonds, zero-coupon bonds, GO vs revenue munis, agency and
mortgage-backed securities, callable bonds, ADRs, REITs, hedge funds, mutual fund share classes, breakpoints,
12b-1 fees, expense ratios.

**Strategies / recommendations:** client profile and investment objectives, time horizon, strategic vs tactical
asset allocation, growth vs value, dollar-cost averaging, modern portfolio theory / efficient frontier,
margin accounts, short sales, order types (market/limit/stop), Uniform Prudent Investor Act, estate and gift tax
(annual exclusion, step-up in basis).

**Laws & ethics:** soft dollars / Section 28(e), wrap fees, Form CRS, Regulation Best Interest, Regulation S-P
privacy, anti-money laundering, cybersecurity, senior investor protection, insider trading.

## Recommendation
The deck is strong on state law, registration, custody, Rule 144 and retirement tax, but it is **not yet a complete
Series 65 deck**. Before selling at $19.99: add roughly 250–350 cards for the gaps above, write real explanations for
at least the high-priority cards, remove source-note wording, and complete the human accuracy review.
