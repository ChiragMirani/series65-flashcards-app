# Verification record

Verified September 13, 2026 on Windows with production Next.js output and Playwright-controlled Chrome.

| Check | Result |
|---|---|
| Content import and reproducibility | Passed: 312 objectives, 632 draft cards, all 27 sections |
| ESLint and strict TypeScript | Passed |
| Vitest | 37 tests passed |
| Root production build | Passed: 12 static pages, 79 precached URLs |
| Root browser suite | 8 tests passed, including a complete traversal of all 632 cards |
| GitHub Pages build | Passed with the real project base path |
| Deployment browser suite | 7 tests passed |
| Accessibility | No axe WCAG 2 A/AA or 2.1 AA violations in tested routes and answer states |
| Manual visual inspection | Phone and desktop question/answer flow, short form names, source links, and focus visibility checked |

## Continuity review

Every original rule, contrast, and application/calculation was read as a question followed by its answer. This is an agent editorial review, not human subject-matter verification. The revision changes 349 existing question/answer pairs, including all 268 original contrast cards. The additional borrowing contrast brings the total to 269. The complete generated pair ledger is in [answer-continuity.md](answer-continuity.md).

Generic trainee claims were replaced with self-contained questions. Answers respond directly before explaining. The gift-gain contrast now says "No. The donor's basis does," with its basis-adjustment assumption. Affiliate resale questions explicitly ask how long to hold restricted shares and distinguish reporting from nonreporting issuers. Form ADV stays readable as a form name rather than expanding into its formal title in the question.

The full-deck browser test visits each card in sequential order, reveals it using keyboard activation, confirms the question remains unchanged, checks the exact answer and public-source URLs, and advances to completion. Existing mouse and touch tests cover the same interaction, including repeated taps at one location, previous-card navigation, shuffle, and sharing. A separate check opens a source in a new tab and verifies the original card has not advanced. External navigation is stubbed in CI to isolate app behavior from regulator-site availability.

Manually inspected examples:

- [Gift-basis question and answer on a phone](qa/continuity-gift-phone.png)
- [Explicit affiliate holding-period question on a phone](qa/continuity-timeline-phone.png)
- [Gift-basis question and answer on desktop](qa/continuity-desktop.png)

## Persistence, offline access, and content updates

Tests cover IndexedDB persistence, stale actions, backup validation, bookmarks, suspension, issue reports, reset/import/export, legacy scheduling, UTC boundaries, and full-deck navigation. Offline checks wait for first-load precaching, disconnect, visit previously unvisited routes, advance a card, refresh, and confirm the saved position. Source pages themselves need internet access.

All four required source files were reread. The canonical document changed in sections 14, 18, and 19 since the previous import. The ownership locator was reconciled, an original borrowing objective received three cards, and the options sequence received an application. All 628 previous card IDs remain present, so saved study state and bookmarks remain associated with the same concepts. Existing sessions retain their captured order; selecting another subject/order or starting another pass includes newly added cards. Original study files were not changed.

Public references are documented in [public-references.md](public-references.md). Model rules, guidance, professional references, and curriculum-only references have distinct labels. The closed-end-fund weekly-NAV exam shortcut still needs a more specific substantive authority; its current NASAA link is explicitly labeled an exam topic. State adoption, jurisdiction-dependent ownership, tax exceptions, and other qualifications remain human-review tasks.

## Reproduction and release limits

Run `npm run content:check`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, and `npm run test:e2e`. For the Pages build, use the environment variables in README, then run `npm run build` and `npm run test:pages`. Setting `PAGES_TEST_ORIGIN=https://chiragmirani.github.io` runs deployment tests against the live host. GitHub Actions repeats the checks using the committed deck without private source files.

Real iOS/Android installation and VoiceOver/TalkBack remain release checks. Browser emulation and axe do not establish complete accessibility conformance. All cards remain draft and the site retains noindex metadata and the independent-provider disclaimer. Human copyright/provenance and subject-matter audits in [COMMERCIAL_RELEASE_BLOCKED.md](../COMMERCIAL_RELEASE_BLOCKED.md) remain required before commercial release.
