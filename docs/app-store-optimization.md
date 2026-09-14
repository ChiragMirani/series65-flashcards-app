# App Store optimization, AEO, and discovery plan — native iOS

Prepared September 13, 2026 for the planned native SwiftUI app: Series 65 flashcards, one-time $19.99 unlock.
Paste-ready listing text lives in [`app-store/metadata/en-US/`](../app-store/metadata/en-US/). Character limits are
checked by `node scripts/check-store-metadata.mjs`.

Commercial release is still blocked by [COMMERCIAL_RELEASE_BLOCKED.md](../COMMERCIAL_RELEASE_BLOCKED.md): complete the
human accuracy review before charging anyone or claiming exam readiness.

## 1. Market facts this plan is built on (checked online, September 13, 2026)

| App | Rating | Price | Opening for us |
|---|---|---|---|
| Series 65 Exam Center (Tuli Education) | 4.7★, 183 ratings | $9.99/mo or $2.99–4.99 per exam | Last updated July 2024; reviewers cite off-topic content |
| Test Prep for FINRA Series 65 (Snap Prep) | 4.9★, 8 ratings | $8.99/wk, $24.99/mo | Weekly subscription; title names FINRA, not NASAA |
| Series 65 Practice Test Prep (Moon Mountain) | 3.0★, 2 ratings | $9.99 | Almost no social proof |
| Pocket Prep | — | subscription | No longer sells new subscriptions through the App Store |
| Achievable ($199), Kaplan ($159–319) | — | courses | Achievable has no flashcards; Kaplan sells flashcards as a $29 add-on |

Positioning: **the flashcard companion to any Series 65 course — one price, no subscription, works offline.**
$19.99 undercuts Kaplan's $29 flashcard add-on and every subscription competitor.

## 2. Pricing and paywall (affects ranking)

- **Free download, $19.99 one-time non-consumable unlock** (StoreKit 2). Paid-upfront apps get far fewer installs,
  and installs plus retention feed App Store search rank.
- Free tier: ~60 cards spread across all four subjects, plus the full question list visible but locked.
- Include **Restore Purchases**. Offer **Family Sharing** on the unlock (a small conversion boost, free to enable).
- Introductory offers apply only to subscriptions, not one-time unlocks. For a launch discount, set $14.99 for the
  first week and schedule the change to $19.99 in App Store Connect.

## 3. App Store metadata (US storefront)

| Field | Limit | Value |
|---|---:|---|
| App name | 30 | `Series 65 Exam Prep Flashcards` |
| Subtitle | 30 | `Uniform Investment Adviser Law` |
| Keywords | 100 | see `keywords.txt` |
| Promotional text | 170 | see `promotional_text.txt` (editable without a new build) |
| Description | 4,000 | see `description.txt` (not indexed for search; written for conversion) |

Rules applied:
- The name and subtitle are the heaviest-weighted fields. They cover "series 65", "exam", "prep", "flashcards",
  "uniform", "investment", "adviser", and "law" — the exam's official name.
- The keyword field never repeats a word already in the name or subtitle (Apple combines them), uses commas with no
  spaces, singular forms, and no competitor names or trademarks (FINRA and NASAA appear only as descriptive words).
- Primary category **Education**, secondary **Finance**. Education has fewer strong competitors for these terms.
- Age rating 4+. Privacy label: **Data Not Collected** (progress stays on device) — a trust signal on the page.
- **Additional localization trick:** the US storefront also indexes the *Spanish (Mexico)* metadata locale. Add an
  es-MX localization with a second 100-character keyword set (e.g. `advisor,representative,licensing,
  fiduciary,compliance,broker,dealer,retirement,options,bonds`) to roughly double indexable keywords. ASO
  practitioners widely report this; verify in App Store Connect and keep the es-MX name/subtitle accurate.
- Do **not** stuff "Series 66", "Series 7", or "SIE" into the name; keep "66" and "63" only in keywords until those
  decks exist, or Apple can reject for misleading metadata.

## 4. Screenshots and product page (conversion)

First three screenshots do the selling (most users never scroll). 6.9" iPhone set; iPad set if iPad is supported.

1. **"1,048 Series 65 flashcards"** — a real card mid-reveal.
2. **"All 4 exam sections"** — Laws & ethics, Recommendations, Investment vehicles, Economics, weighted like the exam.
3. **"Know the trap answers"** — the Common trap panel.
4. **"Works offline. No subscription."** — airplane-mode badge and the one-time price.
5. **"Worked calculations"** — a tax-equivalent-yield or margin card.
6. **"Updated for 2026 rules"** — qualified-client thresholds card.

- App preview video (15–30 s): tap-reveal flow; no voice needed; autoplays muted in search results.
- **Product Page Optimization:** A/B test icon (bold "65" vs card motif) and screenshot 1 caption after ~1,000
  page views.
- **Custom Product Pages** (up to 35): e.g. "Series 65 formulas" and "Series 65 laws" pages for Apple Search Ads
  keyword groups and for Reddit/social links.

## 5. Ratings and reviews

- Ask with `RequestReviewAction` (SwiftUI) only after a positive moment: finishing a subject or a 7-day streak —
  never at launch or after a paywall. Apple caps the prompt at 3 times per 365 days.
- Target 50 ratings in the first 60 days — enough to out-rank a leader with 183 ratings in a thin category.
- Reply to every review in App Store Connect; replies are public and editable.
- Beta: 20–30 real candidates via TestFlight from r/Series65 and r/FinancialCareers before launch.

## 6. In-App Events and recurring visibility

In-App Events appear in search results and the Today/Games-style event cards, even for people who have not installed.
- "Exam Week Cram: 100 highest-yield cards" (evergreen, rerun monthly).
- "2026 rule updates" whenever SEC/NASAA thresholds change (e.g. the qualified-client adjustment, pay-to-play status).
- "New: Series 66 deck" when it launches.

## 7. Apple Search Ads

- Start with **Search Results** campaigns on exact match: `series 65`, `series 65 exam`, `series 65 prep`,
  `series 65 flashcards`, `uniform investment adviser law exam`.
- Discovery campaign with Search Match on to harvest new terms; move winners to exact match.
- Budget test: $10–20/day for 3 weeks; stop terms with cost per unlock above ~$8.

## 8. The app-equivalent of AEO: Siri, Spotlight, and Apple Intelligence

Answer-engine optimization inside iOS means exposing structured content and actions to the system.

- **App Intents + App Shortcuts** (free Siri/Spotlight/Shortcuts presence, no user setup):
  "Study Series 65 flashcards", "Review my weak cards", "Quiz me on Rule 144". Provide `AppShortcutsProvider`
  phrases containing the app name.
- **Core Spotlight indexing:** index subject and topic entities (not full answers) with `CSSearchableItem` so a
  search for "tax-equivalent yield" or "Rule 144" on the device surfaces the app. Adopt `IndexedEntity` so App
  Intents entities are searchable and available to Apple Intelligence.
- **Widgets and Live Activities:** a "card of the day" widget and a study-streak widget keep daily opens up, which
  supports ranking.
- **Universal Links + Smart App Banner** on the public website so web answers hand off to the app.

## 9. Web AEO / SEO that feeds the App Store

Search engines and AI answer engines cite web pages, not App Store listings. One small public site does both jobs.

- Keep the study preview `noindex` until release (see [aeo.md](aeo.md)). At release, publish a separate marketing
  site, e.g. `series65flashcards.com`, with:
  - A landing page with the Smart App Banner (`<meta name="apple-itunes-app" content="app-id=…">`) and a
    SoftwareApplication JSON-LD block that includes the real price and `operatingSystem: iOS`.
  - **40–60 topic pages** written as direct answers ("What is the Series 65 prepaid fee threshold?",
    "Tax-equivalent yield formula", "Rule 144 holding periods") — each shows 3–5 sample cards, cites the
    official source already stored with each card, and links to the App Store. Human-reviewed only; no thin
    auto-generated pages.
  - FAQPage markup that matches visible text, an `llms.txt` summary, a sitemap, and Search Console + Bing
    Webmaster verification.
- Answer-first formatting (question as H2, one-sentence answer, then detail and a citation) is what AI answer
  engines quote.

## 10. Community and launch

- Reddit: answer questions in r/Series65, r/FinancialCareers, r/CFP with genuine help; link only when asked or in a
  profile. Offer 50 free unlock promo codes for beta testers in exchange for honest feedback, not ratings.
- Study-guide bloggers and YouTube Series 65 creators: offer free codes for an honest review.
- Launch timing: avoid the December holiday lull; January and September have heavy licensing-exam study traffic.

## 11. Measure

App Store Connect: impressions → product page views → installs → unlock rate, by source (search, browse, web
referrer, campaign links with `ct=` tokens). Targets for a healthy niche app: page-view-to-install ≥ 30%,
install-to-unlock ≥ 5%, day-7 retention ≥ 25%.

## Compliance guardrails for all store and web copy

- State "Independent study app. Not affiliated with or endorsed by NASAA, FINRA, or the SEC."
- No pass guarantees, no "official", no NASAA/FINRA logos, no claims of real exam questions.
- Keep dated facts (qualified-client thresholds, pay-to-play status) current before each update.
