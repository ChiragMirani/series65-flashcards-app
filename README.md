# Series 65 Flashcards

Study for the Series 65. The deck has 1,003 cards. It covers all four sections. It works offline too.

**Try it:** [chiragmirani.github.io/series65-flashcards-app](https://chiragmirani.github.io/series65-flashcards-app/)

> Cards are still drafts. An expert must review them. See [COMMERCIAL_RELEASE_BLOCKED.md](COMMERCIAL_RELEASE_BLOCKED.md).
> This is an independent app. NASAA and FINRA do not endorse it.

| Subject | Cards |
|---|---:|
| Laws & ethics | 448 |
| Recommendations | 253 |
| Investment vehicles | 194 |
| Economics & business | 108 |

## How to study

- Pick a subject first.
- Choose Shuffle or Sequential.
- Tap to see the answer.
- Tap again for the next.
- Tap **Again** to repeat soon.
- Tap **Got it** to skip later.
- Tap "known hidden" to include them.
- Reset known cards in Settings.
- Your place saves automatically.

## Run it

You need Node.js 22.

```bash
npm ci
npm run dev
npm run check
npm run test:e2e
```

`dev` starts the local app. `check` runs every quick test. `test:e2e` runs browser tests.

## Change cards

Cards live in `content/`. Edit a file, then rebuild.

| File | What it holds |
|---|---|
| `rules.ts`, `rules-rest.ts` | Main rule cards |
| `contrasts.ts`, `applications.ts` | Trap and example cards |
| `exam-coverage.ts` | Extra exam topics |
| `official-sources.ts` | Source links |

```bash
npm run content:import
npm run content:check
```

Keep each card's key the same. Saved progress then stays.

## Rule changes

Some facts change over time. `content/rule-watch.json` lists them. Each has a check date.

```bash
npm run rules:due
npm run rules:verify -- <id>
```

`rules:due` shows checks due now. Fix cards if rules changed. Run `content:import` after edits. Then mark the check done. A weekly GitHub job opens an issue too.

## Update the iOS app

Card fixes ship fast. No App Store review needed.

```bash
npm run deck:publish
```

It checks the deck first. Then it runs the tests. Then it pushes branch `deck-live`. The iOS app checks that branch. It downloads new cards quietly. Users get them next launch.

Code changes need a new build. On the Mac, run:

```bash
git pull
scripts/sync-deck.sh
fastlane ship
```

`ship` tests, builds, and uploads to TestFlight.

## Search and discovery

Topic pages list every question. Search engines can read them. Indexing stays off for now. Set `PUBLIC_INDEXING=true` to allow it.

## More docs

- [Deck coverage](docs/deck-coverage.md)
- [Card review](docs/ai-content-review-2026-09-13.md)
- [Sources](docs/public-references.md)
- [App Store plan](docs/app-store-optimization.md)
- [Web search notes](docs/aeo.md)

## Deploy

GitHub Actions tests every push. It then publishes GitHub Pages.
