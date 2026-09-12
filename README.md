# Series 65 Review

Private work-in-progress prototype in the visual style of VocabDeck. Next.js App Router, TypeScript, Tailwind CSS, IndexedDB, and an independently authored draft cram-sheet deck.

**Commercial release is blocked.** See `COMMERCIAL_RELEASE_BLOCKED.md`. Implementation and verification are ongoing; no passing test or production-readiness claim is made in this initial commit.

## Local development

Node.js 22 or newer. Run `npm ci`, then `npm run dev`; open http://127.0.0.1:3065.

## Content

`npm run content:import` reproducibly compiles the authoring ledger against the four canonical local inputs. Set `SERIES65_SOURCE_DIR` for another source directory. Original study files are read only. Generated files include a 27-section coverage report and per-rule provenance.

Current work includes dashboard and review flows, deterministic spaced repetition, transactional local storage, original application/calculation cards, and future commercial interfaces. Browse, progress, settings, offline packaging, AEO pages, tests, and final visual verification are being completed.
