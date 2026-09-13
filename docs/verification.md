# Verification record

Verified on September 13, 2026 with Node.js, production Next.js static output, and Playwright-controlled Google Chrome on Windows.

| Check | Result |
|---|---|
| Reproducible content check | Last imported deck: 311 rule objectives, 628 draft cards, all 27 numbered sections. A later external source edit now requires authoring review; see below. |
| ESLint | Passed without warnings |
| Strict TypeScript | Passed; route types generated before checking |
| Vitest | 28 tests passed |
| Production build | Passed; 12 static pages and 79 precached URLs |
| Playwright | All 7 end-to-end tests passed; no failed tests |
| Automated accessibility | No axe WCAG 2 A/AA or WCAG 2.1 AA violations in tested routes/states |
| Responsive checks | No horizontal page overflow at 390px and 1440px |
| Manual visual review | One-page Study at phone and desktop widths, revealed answer, dark theme, and app icon inspected |

## Behavior exercised

Unit tests cover successful intervals, failures/lapses, UTC and daylight-saving boundaries, daily limits, deliberately reinserted failed cards, duplicate prevention, stale review rejection, stable-ID content updates, IndexedDB refresh persistence, transaction serialization, and backup validation.

Browser tests cover reveal/rating/relearning, bookmarks, suspension, search and filters, local issue reports, settings, JSON export/import, invalid backup rejection, reset and recovery, keyboard controls, reduced motion, contrast checks, and accessible state changes. An offline test loads the production app once, waits for worker readiness, disconnects the browser, visits previously unvisited routes, completes reviews, and refreshes to verify persisted progress. Metadata tests check visible FAQ and JSON-LD agreement, prototype crawler blocking, the manifest, and icon resources.

Manual screenshot review found that long answers could place ratings below the phone viewport. The rating controls now stay above the bottom navigation, and a new card starts at the top. The final browser suite passed after that adjustment. A transient notification that obstructed desktop navigation was also moved and given an automatic timeout before the passing final run.

Representative final screenshots:

- [Desktop Study](qa/dashboard-1440.png)
- [Phone Study](qa/dashboard-390.png)
- [Phone question](qa/review-phone.png)
- [Phone answer and reachable ratings](qa/answer-phone.png)
- [Dark theme](qa/dark-phone.png)

## Scope and remaining checks

The visual inspection used real browser-rendered screenshots. The native interactive computer-use browser was unavailable, so no native browser-control or WebMCP compatibility result is claimed. Real iOS/Android installation, VoiceOver/TalkBack, and broader assistive-technology checks remain release checks. Automated axe checks and emulation do not establish full WCAG conformance.

The app implementation never modified the original source files. A final fresh-checkout check detected a concurrent September 13 revision to the canonical sheet, including new section 12 ERISA retests. That section was reread, the affected concepts received retest flags, and one new atomic rule plus three original applications were added. The other 26 section fingerprints were unchanged. The source manifest now reads the revision date from the canonical heading.

The importer checks source fingerprints and compares all regenerated artifacts. Passing these checks proves reproducibility, not complete subject-matter accuracy or copyright clearance. All 628 cards remain drafts; the human reviews in [COMMERCIAL_RELEASE_BLOCKED.md](../COMMERCIAL_RELEASE_BLOCKED.md) are still required.

A subsequent external source edit was detected during the UI work: `content:check` reports that the section 14 `minor-owner` locator no longer matches. This UI update retains the committed 628-card deck. The changed source requires a separate authoring reconciliation before the next import; no source files or generated card facts were changed for the one-page interface.

GitHub Actions repeats lint, types, unit tests, production build, and browser tests on Ubuntu with Chromium. It uses the committed deck and does not require private source materials. The source-dependent content check is run locally. Consult the repository's Actions tab for the current remote run; local results above are independent of its status.

## Public phone preview

The owner requested public GitHub and phone access on September 13. GitHub Pages uses `/series65-flashcards-app` as its base path. Four additional deployment tests cover inline selection of the entire deck and every subject; phone navigation and direct refresh; canonical/manifest/favicon/Apple icon URLs; and first-load offline caching with saved review state. The deployment workflow repeats these tests before publishing. The optional `PAGES_TEST_ORIGIN` setting runs the same suite against the real HTTPS host.

The site retains draft labels, noindex metadata, and the commercial-release audit requirements. Public preview access is separately authorized and does not promote card review status.

## One-page study

Study now opens directly to the dropdown and flashcard on the home page. Selection, reveal, rating, and the card counter stay on that page. There are no Start/Continue buttons or separate selection and review screens. Random includes all 628 active cards; subjects contain 321, 187, 92, and 28 cards respectively. Old review bookmarks redirect to Study. Metrics remain on Progress.

Seven new engine tests cover unrestricted full-deck selection, category totals, suspension, reproducible shuffling, persistent card position after repository recreation, old-session migration, Again requeueing, completed-deck resume, and invalid full-deck backups. Browser checks exercise refresh, JSON backup recovery with the full 628-card order, offline legacy-route redirection, keyboard operation, and accessibility. Manual phone and desktop screenshot inspection confirms that the dropdown, counter, flashcard, and reveal button are together on the initial screen; phone rating controls stay reachable after reveal.
