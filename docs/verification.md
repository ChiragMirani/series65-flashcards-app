# Verification record

Verified September 13, 2026 on Windows with production Next.js output and Playwright-controlled Chrome.

| Check | Result |
|---|---|
| Content import and reproducibility | Passed: 339 objectives, 703 draft cards, all 27 sections |
| ESLint and strict TypeScript | Passed |
| Vitest | 46 tests passed |
| Root production build | Passed: 12 static pages, 79 precached URLs |
| Root browser suite | 8 tests passed, including a complete traversal of all 703 cards |
| GitHub Pages build | The publish workflow builds with the real project base path after the root checks pass |
| Deployment browser suite | 7 checks gate publication; they also support testing the live host |
| Accessibility | No axe WCAG 2 A/AA or 2.1 AA violations in tested routes and answer states |
| Manual visual inspection | Phone and desktop question/answer flow, short form names, source links, and focus visibility checked |

## Continuity review

The subsequent prepaid-fee clarification revises five existing question/answer pairs while preserving all 703 IDs. Ten related cards now cite Form ADV Part 2A, Item 18 directly through NASAA's published copy; the state pair also cites NASAA's financial-reporting model. The quarterly examples pass the dollar test but fail the six-month test. The exact-six-month example and ordinary audited-balance-sheet consequence are explicit. The original study inputs and the study engine are unchanged.

For this revision, content import/check, ESLint, strict TypeScript, all 46 unit tests, the production build, and all 8 browser tests passed. The complete 703-card walkthrough checked the updated answers and reference URLs; it added accessibility checks and phone screenshots for [quarterly prepayment](qa/prepaid-quarter-phone.png) and [the audit consequence](qa/prepaid-audit-phone.png). Both images were visually inspected. The broader [source eligibility audit](additional-content-audit.md) distinguishes this completed change from other proposed additions still awaiting the user's required NASAA support.

The 30-topic expansion adds **71 cards and 27 objectives**, retaining every one of the prior 632 card IDs. It adds original scenarios, contrasts, and worked calculations; it also clarifies five existing question/answer pairs, including dividend declaration, Roth tax years, and quick-ratio prepayments. Every mapped objective has both recall and non-recall practice. [Requested coverage](requested-review-coverage.md) lists every relevant question and answer under the corresponding numbered topic. All additional content remains draft.

The focused unit checks cover the $90M/$100M/$110M registration boundaries, qualified-client equality tests, continuing affiliate conditions, three audit outcomes, option-loss and market-cap calculations, TIPS payments, dividend accounting, the two Roth clocks, and the dated pay-to-play proposal. The earlier browse test expected three section-21 calculations; the expansion contains six, so the expected count was updated.

Additional phone examples inspected during the expansion:

- [Issuer versus broker-dealer representative](qa/review-issuer-phone.png)
- [Separate Roth conversion clock](qa/review-roth-phone.png)
- [TIPS interest calculation](qa/review-tips-phone.png)

In the preceding continuity pass, every original rule, contrast, and application/calculation was read as a question followed by its answer. This is an agent editorial review, not human subject-matter verification. That pass changed 351 existing question/answer pairs, including all 268 original contrast cards. The current deck contains 296 contrasts after the borrowing and 30-topic additions. The complete generated pair ledger is in [answer-continuity.md](answer-continuity.md).

Generic trainee claims were replaced with self-contained questions. Answers respond directly before explaining. The gift-gain contrast now says "No. The donor's basis does," with its basis-adjustment assumption. Affiliate resale questions explicitly ask how long to hold restricted shares and distinguish reporting from nonreporting issuers. Form ADV stays readable as a form name rather than expanding into its formal title in the question.

The full-deck browser test visits each card in sequential order, reveals it using keyboard activation, confirms the question remains unchanged, checks the exact answer and public-source URLs, and advances to completion. Existing mouse and touch tests cover the same interaction, including repeated taps at one location, previous-card navigation, shuffle, and sharing. A separate check opens a source in a new tab and verifies the original card has not advanced. External navigation is stubbed in CI to isolate app behavior from regulator-site availability.

Manually inspected examples:

- [Gift-basis question and answer on a phone](qa/continuity-gift-phone.png)
- [Explicit affiliate holding-period question on a phone](qa/continuity-timeline-phone.png)
- [Gift-basis question and answer on desktop](qa/continuity-desktop.png)

## Persistence, offline access, and content updates

Tests cover IndexedDB persistence, stale actions, backup validation, bookmarks, suspension, issue reports, reset/import/export, legacy scheduling, UTC boundaries, and full-deck navigation. Offline checks wait for first-load precaching, disconnect, visit previously unvisited routes, advance a card, refresh, and confirm the saved position. Source pages themselves need internet access.

The earlier canonical revision changed sections 14, 18, and 19. The ownership locator was reconciled, an original borrowing objective received three cards, and the options sequence received an application. The present expansion keeps the canonical, design, and miss-audit fingerprints unchanged and records a separately updated handoff, which was reread completely. All 632 pre-expansion IDs remain present, so saved study state and bookmarks remain associated with the same concepts. Existing sessions retain their captured order; selecting another subject/order or starting another pass includes newly added cards. This task did not modify any original study file.

Public references are documented in [public-references.md](public-references.md). Model rules, guidance, professional references, and curriculum-only references have distinct labels. The closed-end-fund weekly-NAV exam shortcut still needs a more specific substantive authority; its current NASAA link is explicitly labeled an exam topic. State adoption, jurisdiction-dependent ownership, tax exceptions, and other qualifications remain human-review tasks.

## Reproduction and release limits

Run `npm run content:check`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, and `npm run test:e2e`. For the Pages build, use the environment variables in README, then run `npm run build` and `npm run test:pages`. Setting `PAGES_TEST_ORIGIN=https://chiragmirani.github.io` runs deployment tests against the live host. GitHub Actions repeats the checks using the committed deck without private source files.

Real iOS/Android installation and VoiceOver/TalkBack remain release checks. Browser emulation and axe do not establish complete accessibility conformance. All cards remain draft and the site retains noindex metadata and the independent-provider disclaimer. Human copyright/provenance and subject-matter audits in [COMMERCIAL_RELEASE_BLOCKED.md](../COMMERCIAL_RELEASE_BLOCKED.md) remain required before commercial release.
