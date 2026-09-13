# Answer-engine and search readiness

The owner authorized public GitHub and a hosted study preview for phone access. The preview deliberately retains `noindex, nofollow` pending commercial review. Hosted canonicals use `https://chiragmirani.github.io/series65-flashcards-app/`. A project-level robots file does not govern the shared origin; page metadata supplies the indexing restriction. Noindex and robots are crawler instructions, not access control.

## Indexing switch

Indexing is off unless the build sets both `PUBLIC_SITE_URL` (real HTTPS origin) and `PUBLIC_INDEXING=true`. With the
switch on, pages emit `index, follow`, `robots.txt` allows crawling (except Progress and Settings) and points to the
sitemap. With it off, every page stays `noindex` and `robots.txt` disallows all. Plan: keep it off; the web preview is
retired when the iOS app ships, and topic pages move to the marketing site described in
[app-store-optimization.md](app-store-optimization.md).

## Topic pages (answer-engine content)

- `/topics/` lists 27 topics; `/topics/section-N-…/` renders every card in that section as static HTML: question as
  `h2`, direct answer, common trap, and official source links.
- Each topic page carries `Quiz` JSON-LD (`hasPart` Question / acceptedAnswer, matching visible text) and a
  `BreadcrumbList`. The index carries `CollectionPage` JSON-LD.
- Sitemap includes the home page, the topic index, all topic pages, About, and FAQ.
- `public/llms.txt` summarizes the site and links the topics for AI crawlers.
- Footer links Topics from every page for internal linking.

## Implemented

- Server-rendered About and FAQ pages: direct definitions, concrete feature explanations, limitations, local-storage behavior, and independent-provider disclaimer.
- FAQPage JSON-LD generated from the exact same eight question/answer objects that render visibly. No hidden FAQs, invented reviews, star ratings, or implied official endorsement.
- SoftwareApplication JSON-LD describing only implemented prototype features and draft status. No paid offers or fabricated price claims.
- Descriptive route titles and descriptions, semantic headings, internal navigation, and readable HTML available without executing JavaScript on informational pages.
- `PUBLIC_SITE_URL` supplies the real canonical HTTPS origin. About/FAQ have route-specific canonicals and social text metadata. The sitemap includes only the home and informational URLs once that origin is configured. Personal progress and filtered query states are not submitted as content pages.
- A distinctive SVG favicon, multi-size ICO, Apple icon, and normal/maskable PWA icons. No remote fonts, marketing images, or unnecessary trackers are needed.

## Before a public release

1. Complete both human audits. Add genuinely reviewed, independently authored public topic explanations with explicit conditions and authoritative citations. Never index draft/private notes or manufacture hundreds of near-duplicate answer pages.
2. Set the final canonical HTTPS domain and check all metadata in the built HTML. Add consistent canonical metadata for any new public route. Preserve noindex for personal progress, settings, and private content.
3. Remove the global indexing block only in an approved release change. Set crawler permissions intentionally. Validate sitemap absolute URLs and actual HTTP status codes. Do not leave robots disallow-all on pages whose noindex needs to be crawled for removal from an existing index.
4. Validate structured data, renderability, accessibility, loading performance, and content parity. Add human reviewer identity/qualifications and review date only when true. Technical schema checks cannot confer authority.
5. Verify the domain in Google Search Console and Bing Webmaster Tools, submit the sitemap, and measure indexed pages, queries, and observed citations. Do not promise rankings, rich results, answer-engine inclusion, or passing results.

Google says the normal technical and content requirements underlie eligibility for generative search features; there is no special markup that guarantees inclusion: [Google AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide). Structured data must represent visible, truthful content: [Google structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).

FAQ structured data improves explicit machine-readable organization here. It does **not** promise Google FAQ rich results; their availability was restricted to authoritative government and health sites: [Google's FAQ rich-result changes](https://developers.google.com/search/blog/2023/08/howto-faq-changes). Bing likewise connects discovery, accurate indexing, and content clarity to AI eligibility: [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a).
