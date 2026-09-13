# Verification record

Verified on September 13, 2026 with Node.js, production Next.js static output, and Playwright-controlled Google Chrome on Windows.

| Check | Result |
|---|---|
| Reproducible content check | Passed; 310 rule objectives, 623 draft cards, all 27 numbered sections |
| ESLint | Passed without warnings |
| Strict TypeScript | Passed; route types generated before checking |
| Vitest | 16 tests passed |
| Production build | Passed; 12 static pages and 80 precached URLs |
| Playwright | All 7 end-to-end tests passed; no failed tests |
| Automated accessibility | No axe WCAG 2 A/AA or WCAG 2.1 AA violations in tested routes/states |
| Responsive checks | No horizontal page overflow at 390px and 1440px |
| Manual visual review | Phone dashboard, question, revealed answer, dark theme, desktop dashboard, and app icon inspected |

## Behavior exercised

Unit tests cover successful intervals, failures/lapses, UTC and daylight-saving boundaries, daily limits, deliberately reinserted failed cards, duplicate prevention, stale review rejection, stable-ID content updates, IndexedDB refresh persistence, transaction serialization, and backup validation.

Browser tests cover reveal/rating/relearning, bookmarks, suspension, search and filters, local issue reports, settings, JSON export/import, invalid backup rejection, reset and recovery, keyboard controls, reduced motion, contrast checks, and accessible state changes. An offline test loads the production app once, waits for worker readiness, disconnects the browser, visits previously unvisited routes, completes reviews, and refreshes to verify persisted progress. Metadata tests check visible FAQ and JSON-LD agreement, prototype crawler blocking, the manifest, and icon resources.

Manual screenshot review found that long answers could place ratings below the phone viewport. The rating controls now stay above the bottom navigation, and a new card starts at the top. The final browser suite passed after that adjustment. A transient notification that obstructed desktop navigation was also moved and given an automatic timeout before the passing final run.

Representative final screenshots:

- [Desktop dashboard](qa/dashboard-1440.png)
- [Phone dashboard](qa/dashboard-390.png)
- [Phone question](qa/review-phone.png)
- [Phone answer and reachable ratings](qa/answer-phone.png)
- [Dark theme](qa/dark-phone.png)

## Scope and remaining checks

The visual inspection used real browser-rendered screenshots. The native interactive computer-use browser was unavailable, so no native browser-control or WebMCP compatibility result is claimed. Real iOS/Android installation, VoiceOver/TalkBack, and broader assistive-technology checks remain release checks. Automated axe checks and emulation do not establish full WCAG conformance.

The original source files were read without modification. The importer checks source fingerprints and compares all regenerated artifacts. Passing these checks proves reproducibility, not complete subject-matter accuracy or copyright clearance. All 623 cards remain drafts; the human reviews in [COMMERCIAL_RELEASE_BLOCKED.md](../COMMERCIAL_RELEASE_BLOCKED.md) are still required.

GitHub Actions repeats lint, types, unit tests, production build, and browser tests on Ubuntu with Chromium. It uses the committed deck and does not require private source materials. The source-dependent content check is run locally. Consult the repository's Actions tab for the current remote run; local results above are independent of its status.
