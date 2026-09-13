# Series 65 Review

A mobile-first final-review prototype in VocabDeck's visual style: white rounded flashcards, blue controls, simple typography, keyboard/touch review, and a matching “65” favicon and install icon.

**Open on your phone:** [Series 65 Review](https://chiragmirani.github.io/series65-flashcards-app/). The owner authorized this public study preview. You can add it to your phone's home screen and study offline after the initial download.

**Study is one page:** the Subject dropdown selects All subjects or one of four areas. Shuffle mixes the selected deck; Sequential follows its source order. All subjects contains **1,003** cards: Laws & ethics **448**, Recommendations **253**, Investment vehicles **194**, and Economics & business **108**. Suspended cards are excluded. The counter sits inside the card, and the selected subject, order, and place save automatically.

**Tap to reveal; tap again for the next card.** The question remains large and moves upward as the answer opens underneath, following the VocabDeck interaction. There are no rating buttons or separate reveal controls. Side arrows move between cards. Space and Enter support the same tap flow. The top link icon copies the subject and order; opening that link selects the same deck. Extra explanations, source details, and bookmark/suspend/report tools are in Card details. Utility navigation lives in the footer.

**Commercial release is blocked.** Every card is a draft pending a human accuracy review and copyright/provenance audit. See [COMMERCIAL_RELEASE_BLOCKED.md](COMMERCIAL_RELEASE_BLOCKED.md). Public preview access and passing technical tests do not constitute commercial release approval.

## Setup and running

Use Node.js 22+ and npm. No account, backend, payment service, or secret is needed. The lockfile pins Next.js 16.3.5, React 19.3.0, TypeScript, Tailwind CSS 4, and the small supporting libraries.

```powershell
npm ci
npm run dev
```

Development: **http://127.0.0.1:3065**. Production/offline preview:

```powershell
npm run build
npm start
```

Production: **http://127.0.0.1:3066**. Wait for **Available offline on this device** before disconnecting. The dev server does not register the production worker; keep the ports separate.

Project path: `C:\Users\chira\Desktop\sports\datascience\series65-flashcards-app`. Run the commands above from that directory. The public repository is [ChiragMirani/series65-flashcards-app](https://github.com/ChiragMirani/series65-flashcards-app). Development was staged in the session's writable workspace before delivery to Desktop; the original study inputs remain outside the app and are read only.

## Product and architecture

Study selection and review share the home page. Legacy `/review/` bookmarks redirect there. Browse, Progress, Settings, About, and FAQ remain available as utility pages. Review includes tap navigation, bookmarks, suspend/resume, local issue reports, and expandable explanations. Historical recall statistics remain on Progress; tap navigation does not update those scores. Browse supports every requested filter. Settings include themes, motion preference, JSON export/import, and confirmed resets. Full-deck review includes future-due cards and has no daily or session cap. The earlier scheduler, rating data, and limit settings remain compatible with backups but are not exposed as study controls.

| Module | Responsibility |
|---|---|
| `lib/model.ts` | Strict types and Zod card/progress/backup validation |
| `lib/scheduler.ts` | Deterministic SM-2 adaptation and UTC date arithmetic |
| `lib/engine.ts` | Pure session selection and state transitions |
| `lib/repository.ts` | Typed StudyRepository interface and IndexedDB implementation |
| `lib/metrics.ts` | Recall, mastery, activity, and streak calculations |
| `components/study-provider.tsx` | React state, errors, theme, cross-tab notifications, offline registration |
| `content/rules*.ts`, `content/applications.ts` | Independently authored rule ledger and worked applications |
| `scripts/import-content.ts` | Reproducible card compilation, source matching, fingerprints, and reports |
| `scripts/build-sw.mjs` | Complete static-export cache, versioned by content hash |
| `lib/ports.ts` | Future auth, payment, entitlement, sync, and exam-concept contracts; no implementations |

Every advance commits the session position in one IndexedDB transaction before the UI moves to the next card. It preserves existing recall schedules and rating events. Read/write transactions serialize concurrent tab updates; BroadcastChannel refreshes the other tab. Errors do not silently reset saved data. See [navigation and the retained scheduler](docs/spaced-repetition.md).

## Reproducible content import

The later NASAA-only supplement is independently authored in `content/nasaa-supplement.ts`: 36 objectives and 72 cards, each with a precise inspected NASAA provision. [Its ledger](docs/nasaa-supplement.md) lists the references. [The notes audit](docs/september-notes-audit.md) distinguishes additions, existing coverage, and held details. Domain/type checks enforce a source boundary; they cannot certify factual accuracy. Every supplemental card stays draft.

On opening an older saved session, newly available cards for its subject are appended once. The current card, prior order, completed work, bookmarks, and review history stay intact. New Sequential sessions follow the complete expanded section order.

```powershell
$env:SERIES65_SOURCE_DIR = 'C:\Users\chira\Desktop\sports\datascience'
npm run content:import
npm run content:check
```

The default source directory is the one above. All four mandatory inputs are read. The original rules come from the canonical sheet; `content/review-expansion.ts` separately supplies the additional topics requested on September 13, with public authority links. The blueprint shapes difficulty, and handoff/miss-audit concepts shape priorities. Optional question banks, answer keys, and recalled-exam materials are never imported. Original inputs are read only.

The deck has **475 rule objectives and 1,003 cards across all 27 sections**, including the September 13 ERISA, fund-borrowing, and options-sequence retests. [Coverage](docs/deck-coverage.md) lists every objective and its counts. [Provenance](docs/content-provenance.md) identifies local sources and pending human review. [Conflicts](docs/content-conflicts.md) records discrepancies. Builds use the committed deck without private source files; `content:check` is a local authoring check.

Contrast prompts and answers are explicitly authored together in `content/contrasts.ts` and `content/review-expansion.ts`. Missing pairs fail import instead of falling back to unrelated recall text. The [30-topic coverage report](docs/requested-review-coverage.md) maps all requested topics to recall, contrast, application, and calculation cards. The expansion adds 27 objectives and 71 cards, including registration boundaries, issuer/agent distinctions, hedges, fund pricing, two Roth clocks, and the dated pay-to-play proposal. Each supplemental card identifies its own authoring source instead of claiming to come from the cram sheet. The [continuity ledger](docs/answer-continuity.md) shows every question beside its revealed answer. The full-deck browser test visits every card and checks this pairing, retained question text, and source links.

Every revealed answer has a public reference link that opens in another tab without advancing the card. [Public references](docs/public-references.md) distinguishes legal rules, official guidance, professional references, and the few concepts still linked only to the NASAA exam outline. Outline links indicate curriculum scope, not factual verification. References require internet access; flashcards remain available offline. Full human accuracy and provenance reviews remain required.

IDs are `s65-<section>-<permanent-concept-key>-<card-type>`, independent of wording and row order. Keep the concept key for wording edits; never recycle removed IDs. The SHA-256 version includes authored card content and, for canonical rules, its source section. Updates change content hashes while retaining progress. New/changed source sections and unmatched locators require authoring review. The importer does not call a model or promote review status. It cannot prove legal accuracy, complete coverage of newly added source sentences, or copyright clearance: compare full source revisions and review every content diff manually.

## Verification

```powershell
npm run content:check
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

Local Playwright uses installed Google Chrome and disposable browser contexts. CI uses bundled Chromium: `npx playwright install --with-deps chromium` before running with `CI=true`. The E2E command manages its local server on port 3066. Reports are in `playwright-report/`; phone/desktop screenshots are in `test-results/visual/`. Regenerate icons with `npm run icons:build`.

Tests exercise full-deck and subject counts, inline selection, saved position, scheduling/lapses, legacy daily limits, UTC/DST consistency, duplicate/session handling, transactional persistence, concurrent writes, invalid imports, stable-ID updates, review/filter/bookmark/report flows, reset/backup recovery, offline unvisited routes, keyboard operation, responsive overflow, automated accessibility, and AEO content parity. See [verification notes](docs/verification.md) for completed results and manual screenshot review.

## Deployment and AEO

GitHub Actions verifies the root-hosted app, then builds and tests the GitHub Pages version before deploying `out/`. The Pages build sets `PUBLIC_SITE_URL=https://chiragmirani.github.io` and `NEXT_PUBLIC_BASE_PATH=/series65-flashcards-app`. Navigation, canonical URLs, icons, the manifest, worker scope, and cache URLs all include that prefix. Cache cleanup is isolated by app path. No hosting secrets or payment account are needed.

To reproduce the hosted build locally in PowerShell, set those two environment variables, run `npm run build`, then `npm run test:pages`. The seven deployment tests use port 3067 and check repeated finger taps, reveal geometry, sharing, order selection, source-link navigation, phone navigation, refresh, install metadata, and offline persistence. Set `PAGES_TEST_ORIGIN=https://chiragmirani.github.io` to run the same checks against the deployed site. Clear the build variables before rebuilding the ordinary localhost preview.

`npm run build` emits `out/`, including all route `.txt` navigation payloads, chunks, icons, and `sw.js`. Other HTTPS hosts may serve it at an origin root with an empty base path or at the configured prefix. Serve route `index.html` files and use JavaScript MIME plus `Cache-Control: no-cache` for `sw.js` when configurable. `scripts/serve.mjs` demonstrates routing. Do not deploy server intermediates or original study files.

The study preview remains deliberately noindex. Its project-level robots file does not control crawling of the entire shared GitHub Pages origin; page metadata supplies the indexing restriction. Noindex is not access control. Server-rendered FAQ/About text, correct canonical URLs, and matching JSON-LD support machine readability. [AEO notes](docs/aeo.md) cover commercial launch configuration and limits on discovery/ranking claims.

## Known limitations and future work

- Draft final-review content is neither a complete textbook nor verified exam questions. Self-rated recall and maturity are not exam scores or pass probabilities.
- Progress is tied to a browser and origin. Browser eviction, private browsing, clearing site data, or changing origins can remove/separate it. Export backups; no cloud recovery exists.
- Offline availability requires a successful initial cache download. Updates require connectivity. A downloaded static deck cannot be made subscription-secure with client-side flags.
- UTC defines historical due days and rating streaks. Full-deck tap-through review is unrestricted by due dates and does not assign ratings or change recall schedules.
- One deck is implemented. Deck reset preserves settings; all reset also restores them. Issue reports stay local until exported.
- Review status changes require an authoring audit, not a learner rating. Accounts, 12-month access, Stripe, coupons, sync, sample entitlements, and four full exams are future work: [commercial roadmap](docs/commercial-roadmap.md).
- The optional proposed WebMCP start-session tool is feature-detected. Native WebMCP validation was unavailable; no compatibility claim is made. It uses the same visible session action and never rates cards.
- Real iOS/Android installation and screen-reader testing remain release checks beyond desktop browser emulation.

Independent educational study aid. Not affiliated with or endorsed by NASAA, FINRA, Kaplan, or any examination provider. Passing results are not guaranteed.
