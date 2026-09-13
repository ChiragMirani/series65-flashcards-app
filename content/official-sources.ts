import type { OfficialSource } from '../lib/model';

// Curated public references, inspected September 13, 2026. These links do not
// certify the draft cards or imply that a model rule is enacted in every state.
const source = (authority: string, title: string, url: string, kind: OfficialSource['kind'] = 'guidance'): OfficialSource => ({ authority, title, url, kind });
export const officialSources = {
 usa: source('NASAA', '1956 Uniform Securities Act with NASAA updates and commentary', 'https://www.nasaa.org/wp-content/uploads/2021/10/1956-Uniform-Securities-Act-with-NASAA-Updates-and-Commentary.pdf', 'rule'),
 adviser: source('NASAA', 'Investment Adviser Guide — registration, operations, and state requirements', 'https://www.nasaa.org/industry-resources/investment-advisers/investment-adviser-guide/'),
 ce: source('NASAA', 'Investment Adviser Representative Continuing Education Model Rule', 'https://www.nasaa.org/wp-content/uploads/2022/11/model-rule-iar-continuing-education.pdf', 'rule'),
 ethics: source('NASAA', 'Unethical Business Practices Model Rule 102(a)(4)-1, amended May 2026', 'https://www.nasaa.org/wp-content/uploads/2026/05/NASAA-Unethical-Business-Practices-of-Investment-Advisers-Model-Rule_102a_4-1_5-4-2026.pdf', 'rule'),
 records: source('NASAA', 'Recordkeeping Model Rule 203(a)-2, amended May 2026', 'https://www.nasaa.org/wp-content/uploads/2026/05/NASAA-Recordkeeping-Requirements-for-Investment-Advisers-Model-Rule_203a-2_5-4-2026.pdf', 'rule'),
 financial: source('NASAA', 'Minimum Financial Requirements Model Rule 202(d)-1', 'https://www.nasaa.org/wp-content/uploads/2011/07/IA-Model-Rule-Minimum-Financial-Requirements.pdf', 'rule'),
 custody: source('NASAA', 'Custody Requirements Model Rule 102(e)(1)-1', 'https://www.nasaa.org/wp-content/uploads/2023/07/Investment_Adviser_Custody_Rules_102e1-1_and_411f-1.pdf', 'rule'),
 brochure: source('NASAA', 'Brochure Requirements Model Rule 203(b)-1', 'https://www.nasaa.org/wp-content/uploads/2011/07/IA-Brochure-Rule.pdf', 'rule'),
 adv: source('SEC', 'Form ADV general instructions', 'https://www.sec.gov/about/forms/formadv-instructions.pdf'),
 advPart2Nasaa: source('NASAA', 'NASAA-published Form ADV Part 2A, Item 18 — prepaid fees and audited balance sheets (PDF page 14)', 'https://www.nasaa.org/wp-content/uploads/2015/03/Part2andSched.02-2015.pdf#page=14', 'reference'),
 financialReporting: source('NASAA', 'Financial Reporting Model Rule 203(c)-1 — audited state adviser balance sheets', 'https://www.nasaa.org/wp-content/uploads/2022/11/model-rule-investment-adviser-financial-reporting.pdf', 'rule'),
 acts: source('SEC', 'Federal securities statutes and links to their full texts', 'https://www.sec.gov/rules-regulations/statutes-regulations'),
 qualified: source('SEC', 'Qualified-client inflation adjustment, Release IA-6961', 'https://www.sec.gov/files/rules/ia/2026/ia-6961.pdf', 'rule'),
 privateFunds: source('SEC', 'Private Funds — fund exclusions and adviser registration', 'https://www.sec.gov/resources-small-businesses/capital-raising-building-blocks/private-funds'),
 marketing: source('SEC', 'Investment Adviser Marketing Rule compliance guide', 'https://www.sec.gov/resources-small-businesses/small-business-compliance-guides/investment-adviser-marketing'),
 rule144: source('SEC', 'Rule 144 — reporting and nonreporting issuers, affiliate resale conditions', 'https://www.sec.gov/resources-small-businesses/small-business-compliance-guides/revisions-rules-144-145'),
 rule144Gifts: source('SEC', 'Rule 144 — restricted securities, affiliate conditions, and gift tacking', 'https://www.sec.gov/reports/rule-144-selling-restricted-control-securities'),
 discretion: source('FINRA', 'Rule 3260 — Discretionary Accounts', 'https://www.finra.org/rules-guidance/rulebooks/finra-rules/3260', 'rule'),
 options: source('FINRA', 'Rule 2360 — Options, account approval and disclosure requirements', 'https://www.finra.org/rules-guidance/rulebooks/finra-rules/2360', 'rule'),
 optionBasics: source('SEC', 'Options — purchase and sale rights', 'https://www.investor.gov/introduction-investing/investing-basics/glossary/options'),
 fiduciary: source('DOL', 'Meeting Your Fiduciary Responsibilities — ERISA retirement plans', 'https://www.dol.gov/agencies/ebsa/about-ebsa/our-activities/resource-center/publications/meeting-your-fiduciary-responsibilities'),
 plans: source('IRS', 'Retirement plans — definitions and plan types', 'https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-plans-definitions'),
 planOptions: source('IRS', 'Choosing a retirement plan — contribution and employer distinctions', 'https://www.irs.gov/retirement-plans/choosing-a-retirement-plan-plan-options'),
 smallPlans: source('IRS', 'Publication 560 — Retirement Plans for Small Business', 'https://www.irs.gov/publications/p560'),
 nonqualified: source('IRS', 'Nonqualified Deferred Compensation — Publication 5528', 'https://www.eitc.irs.gov/pub/irs-access/p5528_accessible.pdf'),
 early: source('IRS', 'Exceptions to tax on early distributions', 'https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-exceptions-to-tax-on-early-distributions'),
 ira: source('IRS', 'Publication 590-B — IRA distributions, Roth ordering, and penalties', 'https://www.irs.gov/publications/p590b'),
 iraFaq: source('IRS', 'IRA frequently asked questions — contributions and distributions', 'https://www.irs.gov/retirement-plans/retirement-plans-faqs-regarding-iras'),
 rmd: source('IRS', 'Retirement plan and IRA required minimum distributions', 'https://www.irs.gov/retirement-plans/retirement-plan-and-ira-required-minimum-distributions-faqs'),
 loans: source('IRS', 'Hardships, early withdrawals and loans', 'https://www.irs.gov/retirement-plans/hardships-early-withdrawals-and-loans'),
 medicare: source('SSA', 'Medicare premiums and income-related adjustments', 'https://www.ssa.gov/benefits/medicare/medicare-premiums.html'),
 education: source('IRS', 'Publication 970 — 529 and Coverdell education tax benefits', 'https://www.irs.gov/publications/p970'),
 minors: source('FINRA', 'Regulatory Notice 20-07 — UTMA and UGMA ownership and custodians', 'https://www.finra.org/sites/default/files/2020-02/Regulatory-Notice-20-07.pdf'),
 investments: source('IRS', 'Publication 550 — investment income, capital gains, losses, and dividends', 'https://www.irs.gov/publications/p550'),
 giftBasis: source('IRS', 'Basis of property received as a gift — gain and loss bases', 'https://www.irs.gov/faqs/capital-gains-losses-and-sale-of-home/property-basis-sale-of-home-etc/property-basis-sale-of-home-etc'),
 stockOptions: source('IRS', 'Stock options — incentive option holding periods and tax treatment', 'https://www.irs.gov/faqs/capital-gains-losses-and-sale-of-home/stocks-options-splits-traders'),
 amt: source('IRS', 'Form 6251 instructions — incentive stock option exercise', 'https://www.irs.gov/instructions/i6251'),
 ownership: source('FDIC', 'Joint accounts — survivorship and tenancy in common', 'https://www.fdic.gov/financial-institution-employees-guide-deposit-insurance/joint-accounts'),
 estate: source('FINRA', 'Estate account distribution, title, and beneficiary designations', 'https://www.finra.org/sites/default/files/Securities_Helpline_for_Seniors_Report.pdf'),
 entirety: source('Virginia law', 'Tenancy by the entirety — one state example; other states differ', 'https://law.lis.virginia.gov/vacode/title55.1/chapter1/section55.1-136/', 'rule'),
 businesses: source('SBA', 'Choosing a business structure — liability and taxation', 'https://www.sba.gov/counseling/launch-your-business/'),
 passive: source('IRS', 'Publication 925 — Passive Activity and At-Risk Rules', 'https://www.irs.gov/publications/p925'),
 corporateReturn: source('IRS', 'Form 1120 instructions — corporate return deadline', 'https://www.irs.gov/instructions/i1120'),
 partnershipReturn: source('IRS', 'Form 1065 instructions — partnership return deadline', 'https://www.irs.gov/instructions/i1065'),
 sReturn: source('IRS', 'Form 1120-S instructions — S corporation return deadline', 'https://www.irs.gov/instructions/i1120s'),
 diversification: source('SEC', 'Asset allocation, diversification, and risk', 'https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-35'),
 efficiency: source('CFA Institute', 'Market Efficiency — forms and information reflected in prices', 'https://www.cfainstitute.org/insights/professional-learning/refresher-readings/2026/market-efficiency', 'reference'),
 capm: source('CFA Institute', 'The Capital Asset Pricing Model — Theory and Evidence', 'https://rpc.cfainstitute.org/research/cfa-digest/2005/05/the-capital-asset-pricing-model-theory-and-evidence-digest-summary', 'reference'),
 cashflows: source('CFA Institute', 'Capital Investments and Capital Allocation — NPV and IRR', 'https://www.cfainstitute.org/insights/professional-learning/refresher-readings/2026/capital-investments-and-capital-allocation', 'reference'),
 funds: source('SEC', 'Mutual Funds and ETFs — investor guide', 'https://www.investor.gov/sites/investorgov/files/2019-02/mutual-funds-ETFs.pdf'),
 coverage: source('U.S. Code', '15 USC 80a-18 — investment-company borrowing and asset coverage', 'https://uscode.house.gov/view.xhtml?req=%28title%3A15+section%3A80a-18+edition%3Aprelim%29', 'rule'),
 fundReports: source('SEC', 'Mutual fund annual and semiannual shareholder reports', 'https://www.sec.gov/files/ib_readmfreport.pdf'),
 annualReport: source('SEC', 'Form N-CEN — annual report for registered investment companies', 'https://www.sec.gov/files/formn-cen.pdf'),
 annuityTax: source('IRS', 'Publication 575 — Pension and Annuity Income', 'https://www.irs.gov/publications/p575'),
 annuities: source('SEC', 'Variable annuities — features and risks', 'https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/updated-5'),
 indexed: source('SEC', 'Indexed annuities — index-linked crediting', 'https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/updated-investor-bulletin-indexed-annuities'),
 life: source('Texas insurance regulator', 'Life insurance guide — policy types, cash value, and loans', 'https://agate.tdi.texas.gov/pubs/consumer/cb018.html'),
 bonds: source('FINRA', 'Understanding bond yield and return', 'https://www.finra.org/investors/insights/bond-yield-return'),
 spreads: source('CFA Institute', 'Yield and yield-spread measures — credit profile and maturity', 'https://www.cfainstitute.org/insights/professional-learning/refresher-readings/2026/yield-and-yield-spread-measures-for-fixed-rate-bonds', 'reference'),
 creditSpreads: source('CFA Institute', 'Credit strategies — comparing yields at similar maturities', 'https://www.cfainstitute.org/insights/professional-learning/refresher-readings/2026/fixed-income-active-management-credit-strategies', 'reference'),
 taxYield: source('MSRB', 'Understanding taxable municipal bonds — taxable-equivalent yield formula', 'https://www.msrb.org/Understanding-Taxable-Municipal-Bonds'),
 warrants: source('SEC', 'Investor bulletin — warrants to purchase additional company shares', 'https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/what-you'),
 credit: source('SEC', 'Corporate bonds — yields and credit ratings', 'https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/what-are'),
 statements: source('SEC', 'Beginners guide to financial statements and ratios', 'https://www.sec.gov/about/reports-publications/investorpubsbegfinstmtguide'),
 accounting: source('IRS', 'Publication 538 — cash and accrual accounting', 'https://www.irs.gov/publications/p538'),
 statistics: source('NIST', 'Measures of scale — range and standard deviation', 'https://www.itl.nist.gov/div898/handbook/eda/section3/eda356.htm'),
 mode: source('NIST', 'Histogram interpretation — the mode as the most frequent value', 'https://www.itl.nist.gov/div898/handbook/eda/section3/eda33d4.htm'),
 indicators: source('The Conference Board', 'U.S. leading, coincident, and lagging indicators', 'https://www.conference-board.org/topics/us-leading-indicators/', 'reference'),
 derivatives: source('SEC', 'Derivatives — underlying assets and examples', 'https://www.investor.gov/introduction-investing/investing-basics/glossary/derivatives'),
 rights: source('CFA Institute', 'Preemptive rights — protecting existing shareholders', 'https://rpc.cfainstitute.org/sites/default/files/-/media/documents/article/position-paper/non-preemptive-share-issues-in-asia-role-of-regulation.pdf', 'reference'),
 audit: source('PCAOB', 'AS 3105 — qualified, adverse, and disclaimer audit opinions', 'https://pcaobus.org/oversight/standards/auditing-standards/details/AS3105', 'rule'),
 blackout: source('SEC', 'Regulation BTR — pension blackout trading restrictions', 'https://www.sec.gov/news/press/2003-6.htm'),
 trust: source('IRS', 'Form 1041 instructions — trust distributable net income', 'https://www.irs.gov/instructions/i1041'),
 outline: source('NASAA', 'Series 65 study guide and topic outline — curriculum scope, not a substantive rule', 'https://www.nasaa.org/wp-content/uploads/2023/09/NASAA-Series-65-Exam-Study-Guide.pdf', 'outline'),
 tips: source('U.S. Treasury', 'Treasury Inflation-Protected Securities — principal and interest', 'https://www.treasurydirect.gov/marketable-securities/tips/'),
 duration: source('CFA Institute', 'Yield-Based Bond Duration Measures and Properties', 'https://www.cfainstitute.org/insights/professional-learning/refresher-readings/2026/yield-based-bond-duration-measures-and-properties', 'reference'),
 stocks: source('FINRA', 'Stocks — preferred and common liquidation priority', 'https://www.finra.org/investors/investing/investment-products/stocks'),
 marketCap: source('SEC', 'Market Capitalization — outstanding shares times share price', 'https://www.investor.gov/introduction-investing/investing-basics/glossary/market-capitalization'),
 etn: source('SEC', 'Exchange Traded Notes — unsecured issuer obligations', 'https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-50'),
 etf: source('SEC', 'Exchange-Traded Funds — market prices, structure, and active management', 'https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-24'),
 optionRights: source('OCC / OIC', 'Options Basics — call purchase rights and put sale rights', 'https://www.optionseducation.org/optionsoverview/options-basics', 'reference'),
 hedges: source('CME Group', 'Put-option price floors compared with short futures hedges', 'https://www.cmegroup.com/education/courses/hedging-with-grain-and-oilseed-futures-and-options/risk-management-for-sellers-of-commoditities/establishing-a-floor-price-by-buying-put-options', 'reference'),
 durable: source('CFPB', 'Durable power of attorney — incapacity and death; Arizona guide', 'https://www.consumerfinance.gov/documents/6274/cfpb_help-for-agents-under-a-power-of-attorney_arizona.pdf'),
 qualifiedRule: source('eCFR', '17 CFR 275.205-3 — qualified clients and primary-residence treatment', 'https://www.ecfr.gov/current/title-17/chapter-II/part-275/section-275.205-3', 'rule'),
 payPlayProposal: source('SEC', 'Proposed rescission of Rule 206(4)-5 — September 3, 2026; not an effective repeal', 'https://www.sec.gov/rules-regulations/2026/09/s7-2026-31', 'reference'),
 // Exam-coverage supplement references (content/exam-coverage.ts).
 nber: source('NBER', 'Business cycle dating — how U.S. recessions are determined', 'https://www.nber.org/research/business-cycle-dating', 'reference'),
 gdp: source('BEA', 'Gross domestic product — definition and real versus current dollars', 'https://www.bea.gov/data/gdp/gross-domestic-product'),
 cpi: source('BLS', 'Consumer Price Index — overview and definition', 'https://www.bls.gov/cpi/'),
 fed: source('Federal Reserve', 'Monetary policy — policy tools and the federal funds rate', 'https://www.federalreserve.gov/monetarypolicy.htm'),
 yieldCurve: source('U.S. Treasury', 'Interest rate statistics — daily Treasury par yield curve rates', 'https://home.treasury.gov/policy-issues/financing-the-government/interest-rate-statistics'),
 exchangeRates: source('Federal Reserve', 'Foreign exchange rates (H.10)', 'https://www.federalreserve.gov/releases/h10/current/'),
 beta: source('SEC', 'Investor.gov glossary — beta and market risk', 'https://www.investor.gov/introduction-investing/investing-basics/glossary'),
 sharpe: source('CFA Institute', 'Capital Asset Pricing Model — risk and return measures', 'https://rpc.cfainstitute.org/research/cfa-digest/2005/05/the-capital-asset-pricing-model-theory-and-evidence-digest-summary', 'reference'),
 performance: source('CFA Institute', 'Rate-of-return measurement — time-weighted and money-weighted returns', 'https://www.cfainstitute.org/insights/professional-learning/refresher-readings/2026/rates-and-returns', 'reference'),
 tbills: source('U.S. Treasury', 'Treasury bills — discount pricing and maturities', 'https://www.treasurydirect.gov/marketable-securities/treasury-bills/'),
 treasuries: source('U.S. Treasury', 'Treasury notes and bonds — maturities, interest, and state tax exemption', 'https://www.treasurydirect.gov/marketable-securities/treasury-notes/'),
 munis: source('SEC', 'Municipal bonds — general obligation and revenue bonds', 'https://www.investor.gov/introduction-investing/investing-basics/investment-products/bonds-or-fixed-income-products-0'),
 zeroCoupon: source('SEC', 'Zero-coupon bonds — discount and annual taxable accretion', 'https://www.investor.gov/introduction-investing/investing-basics/glossary/zero-coupon-bond'),
 callable: source('SEC', 'Callable bonds — call risk and reinvestment', 'https://www.investor.gov/introduction-investing/investing-basics/glossary/callable-or-redeemable-bonds'),
 convertibles: source('SEC', 'Convertible securities — conversion into common stock', 'https://www.investor.gov/introduction-investing/investing-basics/glossary/convertible-securities'),
 mbs: source('SEC', 'Investor.gov glossary — mortgage-backed securities', 'https://www.investor.gov/introduction-investing/investing-basics/glossary'),
 adr: source('SEC', 'Investor.gov glossary — American depositary receipts', 'https://www.investor.gov/introduction-investing/investing-basics/glossary'),
 reits: source('SEC', 'Investor.gov glossary — real estate investment trusts', 'https://www.investor.gov/introduction-investing/investing-basics/glossary'),
 hedgeFunds: source('SEC', 'Hedge funds — private fund features and risks', 'https://www.investor.gov/introduction-investing/investing-basics/investment-products/private-investment-funds/hedge-funds'),
 moneyMarket: source('SEC', 'Investor.gov glossary — money market funds', 'https://www.investor.gov/introduction-investing/investing-basics/glossary'),
 shareClasses: source('FINRA', 'Mutual funds — share classes', 'https://www.finra.org/investors/investing/investment-products/mutual-funds/share-classes'),
 breakpoints: source('FINRA', 'Breakpoints — rights of accumulation and letters of intent', 'https://www.finra.org/rules-guidance/key-topics/breakpoints'),
 feesFunds: source('SEC', 'Mutual fund and ETF fees and expenses — 12b-1 fees and expense ratios', 'https://www.investor.gov/introduction-investing/investing-basics/glossary/mutual-fund-fees-and-expenses'),
 uit: source('SEC', 'Unit investment trusts (UITs)', 'https://www.investor.gov/introduction-investing/investing-basics/glossary/unit-investment-trusts-uits'),
 suitability: source('FINRA', 'Rule 2111 — Suitability and investment profile', 'https://www.finra.org/rules-guidance/rulebooks/finra-rules/2111', 'rule'),
 dca: source('SEC', 'Dollar-cost averaging', 'https://www.investor.gov/introduction-investing/investing-basics/glossary/dollar-cost-averaging'),
 margin: source('SEC', 'Investor bulletin — understanding margin accounts', 'https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-29'),
 shortSales: source('SEC', 'Investor.gov glossary — short sales', 'https://www.investor.gov/introduction-investing/investing-basics/glossary'),
 orderTypes: source('SEC', 'Investor.gov glossary — market, limit, and stop orders', 'https://www.investor.gov/introduction-investing/investing-basics/glossary'),
 prudentInvestor: source('Uniform Law Commission', 'Uniform Prudent Investor Act', 'https://www.uniformlaws.org/committees/community-home?CommunityKey=58f87d0a-3617-4635-a2af-9a4d02d119c9', 'rule'),
 inheritance: source('IRS', 'Publication 551 — basis of inherited property', 'https://www.irs.gov/publications/p551'),
 giftTax: source('IRS', 'Frequently asked questions on gift taxes', 'https://www.irs.gov/businesses/small-businesses-self-employed/frequently-asked-questions-on-gift-taxes'),
 estateTax: source('IRS', 'Estate tax — exemption and marital deduction', 'https://www.irs.gov/businesses/small-businesses-self-employed/estate-tax'),
 trusts: source('IRS', 'Estate tax — trusts, exemption, and marital deduction', 'https://www.irs.gov/businesses/small-businesses-self-employed/estate-tax'),
 fiduciaryAdviser: source('SEC', 'Commission interpretation regarding standard of conduct for investment advisers', 'https://www.sec.gov/rules/interp/2019/ia-5248.pdf', 'guidance'),
 softDollars: source('SEC', 'Commission guidance regarding client commission practices under Section 28(e)', 'https://www.sec.gov/rules/interp/2006/34-54165.pdf'),
 wrapFee: source('SEC', 'Investor bulletin — investment adviser sponsored wrap fee programs', 'https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-40'),
 formCrs: source('SEC', 'Form CRS relationship summary — frequently asked questions', 'https://www.sec.gov/investment/form-crs-faq'),
 regBi: source('SEC', 'Regulation Best Interest — frequently asked questions', 'https://www.sec.gov/tm/faq-regulation-best-interest'),
 regSp: source('SEC', 'Regulation S-P — privacy of consumer financial information', 'https://www.sec.gov/rules-regulations/2024/05/s7-05-23'),
 aml: source('FINRA', 'Anti-money laundering — CIP, SARs, and CTRs', 'https://www.finra.org/rules-guidance/key-topics/aml'),
 finra2165: source('FINRA', 'Rule 2165 — Financial Exploitation of Specified Adults', 'https://www.finra.org/rules-guidance/rulebooks/finra-rules/2165', 'rule'),
 finra4512: source('FINRA', 'Rule 4512 — Customer Account Information and trusted contact', 'https://www.finra.org/rules-guidance/rulebooks/finra-rules/4512', 'rule'),
 insiderTrading: source('SEC', 'Investor.gov glossary — insider trading', 'https://www.investor.gov/introduction-investing/investing-basics/glossary'),
 codeOfEthics: source('eCFR', '17 CFR 275.204A-1 — Investment adviser codes of ethics', 'https://www.ecfr.gov/current/title-17/chapter-II/part-275/section-275.204A-1', 'rule'),
 sellingAway: source('FINRA', 'Rule 3280 — Private Securities Transactions of an Associated Person', 'https://www.finra.org/rules-guidance/rulebooks/finra-rules/3280', 'rule'),
} satisfies Record<string, OfficialSource>;
type SourceId = keyof typeof officialSources;
const sectionDefaults: Record<number, SourceId> = {1:'usa',2:'usa',3:'usa',4:'adviser',5:'financial',6:'usa',7:'qualified',8:'privateFunds',9:'ethics',10:'rule144',11:'adviser',12:'plans',13:'early',14:'education',15:'investments',16:'businesses',17:'diversification',18:'funds',19:'options',20:'annuityTax',21:'bonds',22:'statements',23:'outline',24:'audit',25:'blackout',26:'ethics',27:'usa'};
const overrides = new Map<string, SourceId[]>();
function map(section: number, keys: string, ...ids: SourceId[]) {
 for (const key of keys.split(' ')) {
  const id = `${section}:${key}`;
  if (overrides.has(id)) throw new Error(`Duplicate public source mapping: ${id}`);
  overrides.set(id, ids);
 }
}
map(1,'federal-notice federal-office federal-iar firm-individual government-only adviser-elements business-regular late-incidental late-holding-out','adviser');
map(1,'truthful-ad','ethics'); map(1,'bond-authority','financial');
map(2,'ce-split ce-carry','ce');
map(3,'adv-one adv-two-a adv-two-b','adv'); map(3,'assignment-contract','ethics');
map(3,'act-1933 act-1934 federal-civil civil-scope underlying-offer non-offers fundamental-policy','acts');
map(4,'tested-act state-effective state-expiry','usa'); map(4,'adv-update prompt-amendment','adv');
map(4,'brochure-annual brochure-initial','brochure'); map(4,'records-ordinary records-formation','records');
map(5,'termination-prompt enforcement hearing','usa');
map(5,'prepay-state','advPart2Nasaa','financialReporting');
map(5,'prepay-federal prepay-boundary prepay-consequence','advPart2Nasaa');
map(5,'fee-custody bill-custody consent-custody','custody');
map(7,'accredited qualified-purchaser','privateFunds');
map(9,'time-price agent-written','discretion'); map(9,'oral-offer media-prospectus tombstone cooling-off no-completion','acts');
map(9,'broker-pay dealer-pay','adviser'); map(9,'bd-active solicitor-iar','usa');
map(9,'testimonial promoter-oversight promoter-agreement','marketing');
map(10,'gift-tack listed-volume otc-volume form144','rule144Gifts'); map(11,'plan-million','usa');
map(12,'erisa-law erisa-excluded fiduciary participant-choice qualified-erisa','fiduciary');
map(12,'profit-sharing money-purchase plan-401 plan-403 sep simple','planOptions');
map(12,'keogh','smallPlans'); map(12,'traditional roth qdro','iraFaq'); map(12,'nonqualified','nonqualified');
map(13,'roth-order roth-contributions roth-earnings','ira'); map(13,'rmd-penalty rmd-working rmd-employer','rmd');
map(13,'ira-loans','loans'); map(13,'irmaa','medicare'); map(13,'ira-deadline','iraFaq');
map(14,'minor-owner minor-purpose minor-property utma-retest','minors');
map(15,'gift-loss gift-gain gift-middle','giftBasis'); map(15,'iso-holding','stockOptions'); map(15,'iso-amt','amt');
map(15,'tic jtwros jtwros-retest will-title','ownership'); map(15,'tod','estate'); map(15,'entirety','entirety');
map(16,'loss-gates passive-offset release-loss ptp-silo','passive'); map(16,'april-return','corporateReturn'); map(16,'march-return','partnershipReturn','sReturn');
map(17,'weak-emh semi-emh strong-emh','efficiency'); map(17,'total-return','bonds');
map(18,'coverage-three repay-equation borrow-equation','coverage'); map(18,'shareholder-report','fundReports');
map(18,'closed-nav','outline'); map(18,'sec-report','annualReport','fundReports');
map(19,'right','rights'); map(19,'warrant','warrants'); map(19,'derivative','derivatives'); map(19,'buyer-call seller-put listed-call','optionBasics');
map(20,'fixed-annuity variable-annuity','annuities'); map(20,'indexed-annuity','indexed');
map(20,'term-life whole-life universal-life variable-life policy-loan life-security','life');
map(21,'dividend-declare dividend-pay dividend-current','statements'); map(21,'risk-labels','diversification');
map(21,'bond-rating','credit'); map(21,'after-tax tax-equivalent','taxYield'); map(21,'maturity-spread','spreads'); map(21,'credit-spread','creditSpreads');
map(22,'cash-basis accrual','accounting');
map(23,'range deviation','statistics'); map(23,'mode','mode'); map(23,'leading lagging claims-duration','indicators'); map(23,'npv irr','cashflows'); map(23,'capm capm-specific','capm'); map(23,'bond-cashflow','bonds');


map(27,'dni-components dni-character dni-gains','trust'); map(27,'mass-ad mailing-source','records');
map(4,'aum-entry-buffer aum-buffer aum-must aum-exit withdraw-clock','adv');
map(7,'client-residence','qualified','qualifiedRule');
map(9,'time-price-expiry','discretion'); map(9,'durable-authority','durable'); map(9,'pay-play-status','payPlayProposal');
map(13,'conversion-clock roth-clock','ira'); map(15,'gift-dual','giftBasis');
map(18,'traded-fund-price','funds','etf'); map(18,'etf-structure etf-active','etf');
map(19,'protect-long protect-short','optionRights'); map(19,'futures-hedge hedge-direction','hedges');
map(21,'tips-coupon','tips'); map(21,'rates-prices','bonds'); map(21,'duration-long-low','duration');
map(21,'preferred-priority','stocks'); map(21,'etn-credit','etn'); map(22,'market-cap','marketCap');

export function sourcesForRule(section: number, key: string): OfficialSource[] {
 const ids = overrides.get(`${section}:${key}`) ?? [sectionDefaults[section]];
 if (ids.some(id => !id || !officialSources[id])) throw new Error(`Missing public reference: ${section}:${key}`);
 return ids.map(id => officialSources[id]);
}
