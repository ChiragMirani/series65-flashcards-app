# Answer-engine and search readiness

The prototype deliberately uses `noindex, nofollow`, a disallow-all robots file, and no invented canonical domain. Private GitHub is development distribution, not a search launch. Noindex and robots are crawler instructions, not access control; use authenticated hosting for any private deployed preview.

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
