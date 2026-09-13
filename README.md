# Series 65 Review

A mobile-first final-review prototype in VocabDeck's visual style: white rounded flashcards, blue controls, simple typography, keyboard/touch review, and a matching “65” favicon and install icon.

**Open on your phone:** [Series 65 Review](https://chiragmirani.github.io/series65-flashcards-app/). The owner authorized this public study preview. You can add it to your phone's home screen and study offline after the initial download.

**Study is one page:** the **Review area** dropdown sits directly above the flashcard. Choosing **Random** immediately loads a shuffled full deck with a **1 of 628** counter. Choosing a subject loads all its active cards: Laws & ethics **321**, Recommendations **187**, Investment vehicles **92**, or Economics & business **28**. Suspended cards are excluded from those totals. There is no Start screen; the selected deck and your place save automatically and survive refresh.

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

Study selection and review share the home page. Legacy `/review/` bookmarks redirect there. Browse, Progress, Settings, About, and FAQ remain available as utility pages. Due/new counts, streak, category mastery, weakest sections, and retest counts live on Progress. Review includes four ratings, same-session relearning, bookmarks, suspend/resume, local issue reports, and expandable explanations. Browse supports every requested filter. Settings include themes, motion preference, JSON export/import, and confirmed resets. Full-deck review includes future-due cards and has no daily or session cap; earlier limit settings remain in backup data for compatibility but do not limit this interface.

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

Every review commits its schedule, event, and session in one IndexedDB transaction before the UI advances. Read/write transactions serialize concurrent tab updates; BroadcastChannel refreshes the other tab. Errors do not silently reset saved data. See [scheduling](docs/spaced-repetition.md).

## Reproducible content import

```powershell
$env:SERIES65_SOURCE_DIR = 'C:\Users\chira\Desktop\sports\datascience'
npm run content:import
npm run content:check
```

The default source directory is the one above. All four mandatory inputs are read; only the canonical sheet supplies facts. The blueprint shapes difficulty, and handoff/miss-audit concepts shape priorities. Optional question banks, answer keys, and recalled-exam materials are never imported. Original inputs are read only.

The initial deck has **311 rule objectives and 628 cards across all 27 sections**, including the September 13 ERISA retests. [Coverage](docs/deck-coverage.md) lists every objective and counts by section/category/type/priority. [Provenance](docs/content-provenance.md) lists every rule's source path, heading, and required review. [Conflicts](docs/content-conflicts.md) records discrepancies. The committed deck permits builds without the private source files; `content:check` remains a local authoring check rather than a GitHub CI step.

IDs are `s65-<section>-<permanent-concept-key>-<card-type>`, independent of wording and row order. Keep the concept key for wording edits; never recycle removed IDs. The SHA-256 version includes authored content and its source section. Updates change content hashes while retaining progress. New/changed source sections and unmatched locators require authoring review. The importer does not call a model or promote review status. It cannot prove legal accuracy, complete coverage of newly added source sentences, or copyright clearance: compare full source revisions and review every content diff manually.

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

To reproduce the hosted build locally in PowerShell, set those two environment variables, run `npm run build`, then `npm run test:pages`. The four deployment tests use port 3067 and check phone navigation, refresh, install metadata, and offline persistence. Set `PAGES_TEST_ORIGIN=https://chiragmirani.github.io` to run the same checks against the deployed site. Clear the build variables before rebuilding the ordinary localhost preview.

`npm run build` emits `out/`, including all route `.txt` navigation payloads, chunks, icons, and `sw.js`. Other HTTPS hosts may serve it at an origin root with an empty base path or at the configured prefix. Serve route `index.html` files and use JavaScript MIME plus `Cache-Control: no-cache` for `sw.js` when configurable. `scripts/serve.mjs` demonstrates routing. Do not deploy server intermediates or original study files.

The study preview remains deliberately noindex. Its project-level robots file does not control crawling of the entire shared GitHub Pages origin; page metadata supplies the indexing restriction. Noindex is not access control. Server-rendered FAQ/About text, correct canonical URLs, and matching JSON-LD support machine readability. [AEO notes](docs/aeo.md) cover commercial launch configuration and limits on discovery/ranking claims.

## Known limitations and future work

- Draft final-review content is neither a complete textbook nor verified exam questions. Self-rated recall and maturity are not exam scores or pass probabilities.
- Progress is tied to a browser and origin. Browser eviction, private browsing, clearing site data, or changing origins can remove/separate it. Export backups; no cloud recovery exists.
- Offline availability requires a successful initial cache download. Updates require connectivity. A downloaded static deck cannot be made subscription-secure with client-side flags.
- UTC defines due days and streaks. Full-deck review is unrestricted by due dates. Again deliberately revisits a card at its original number, so rating attempts can exceed the displayed unique-card total.
- One deck is implemented. Deck reset preserves settings; all reset also restores them. Issue reports stay local until exported.
- Review status changes require an authoring audit, not a learner rating. Accounts, 12-month access, Stripe, coupons, sync, sample entitlements, and four full exams are future work: [commercial roadmap](docs/commercial-roadmap.md).
- The optional proposed WebMCP start-session tool is feature-detected. Native WebMCP validation was unavailable; no compatibility claim is made. It uses the same visible session action and never rates cards.
- Real iOS/Android installation and screen-reader testing remain release checks beyond desktop browser emulation.

Independent educational study aid. Not affiliated with or endorsed by NASAA, FINRA, Kaplan, or any examination provider. Passing results are not guaranteed.
