/** Independently authored question/answer pairs. Never attach a recall answer to a generic claim.
 * Each row is key | self-contained contrast question | direct answer and decisive distinction.
 * Editorial continuity review only; all cards remain draft pending human accuracy/provenance review.
 */
export const contrastText: Record<number, string> = {
1: `state-office|A state adviser opens an office in a state but has only two retail clients there. Can it use the five-client registration allowance?|No. The local office requires state registration even below six retail clients.
state-sixth|For a state adviser with no local office, does the five-client count restart each January?|No. Count noninstitutional clients over the preceding 12 months; the sixth triggers registration.
federal-notice|An SEC-registered adviser with no local office adds its sixth resident retail client in 12 months. Must the firm switch to state registration?|No. It generally makes a state notice filing and remains SEC-registered.
federal-office|Does SEC registration excuse an advisory firm from a state notice filing when it opens an office there?|No. An in-state office generally triggers notice filing, even though the firm remains federally registered.
federal-iar|A federal covered adviser's representative has six retail clients in a state but no office there. Does that client count require the representative to register there?|No. The representative's place of business controls; client count alone does not.
bd-office|Can a broker-dealer open a state office and wait until its sixth retail client to register?|No. The office requires registration; broker-dealers have no five-client allowance.
bd-institution|A broker-dealer has no office in a state. Is serving five resident retail clients equivalent to dealing exclusively with institutions for the counterparty exclusion?|No. Retail clients defeat that exclusion; broker-dealers have no five-client allowance.
bd-visitor|Does a new local retail customer qualify for the broker-dealer's visiting-customer exclusion merely by making a brief visit?|No. It concerns an existing out-of-state customer temporarily visiting the state, with no local broker-dealer office.
agent-limit|Can a securities agent transact with five retail customers in a state without registering under an adviser-style allowance?|No. An agent transacting business in the state must register; there is no five-client allowance.
institutions|Do institutional clients use up a state adviser's five-noninstitutional-client allowance?|No. Institutions are excluded from that count.
firm-individual|A federal covered advisory firm must notice-file because of a sixth retail client. Does its representative automatically owe registration in the same state?|No. The firm uses the client-count test; the representative registers based on the representative's place of business.
exempt-agent|Does selling an exempt bond automatically exempt a broker-dealer salesperson from agent registration?|No. The security exemption does not remove the salesperson's agent status.
issuer-employee|Is receiving no commission enough, by itself, for an issuer employee's narrow agent exclusion?|No. Sales must also be limited to existing employees, partners, or directors.
late-incidental|Does being a lawyer or accountant automatically exclude someone who gives securities advice from adviser registration?|No. The advice must be solely incidental to the profession and receive no special compensation.
late-holding-out|Can a professional claim the incidental-advice exclusion while advertising as an investment adviser?|No. Holding out as an adviser defeats that exclusion.
government-only|A firm's advice is solely about qualifying U.S. government securities. Does opening a state office require it to register as a state adviser?|No. This federally excluded firm is treated as federal covered for state registration purposes.
individual-capacity|An individual represents an advisory firm and meets a state registration trigger. Does the individual register as a separate adviser firm?|No. The individual registers as an investment adviser representative in that capacity.
each-state|Does registration in one state automatically authorize a securities professional to transact in another?|No. The registration obligation must be assessed separately in each state.
truthful-ad|May an adviser use truthful, nonmisleading general advertising?|Yes. General advertising is not inherently prohibited.
adviser-elements|Must compensation be a separately itemized advisory fee to satisfy the federal adviser definition?|No. Direct or indirect compensation can count, alongside securities advice and being in the advisory business.
business-regular|Can regular securities advice satisfy the federal business element when it is not the person's principal business?|Yes. Regular advisory activity can satisfy that element even if another business is primary.
bond-authority|Does completing state registration settle every bonding obligation for a registrant with discretion or custody?|No. The Administrator's authority to require a bond is a separate issue.`,
2: `state-employment|For a state-registered adviser's representative, is the representative personally responsible for the firm's employment notice to the Administrator?|No. The state-registered advisory firm gives that notice.
federal-employment|Does a federal covered adviser give its representative's state employment notice instead of the representative?|No. The representative gives the Administrator the notice.
agent-departure|Does an agent's voluntary resignation remove the agent's duty to notify the Administrator?|No. Both the agent and broker-dealer notify promptly, whether departure is voluntary or for cause.
ce-split|An investment adviser representative earns 12 annual continuing-education credits, all in Products and Practice. Is the category requirement satisfied?|No. The 12 credits must include 6 in Products and Practice and 6 in Ethics and Professional Responsibility.
ce-carry|Can an investment adviser representative carry surplus continuing-education credits into the next year?|No. Excess credits do not carry forward; earlier deficiencies still must be completed.`,
3: `adv-one|Is Form ADV Part 1 the personal brochure supplement delivered to clients?|No. Part 1 is the firm's regulatory filing; Part 2B is the individual's supplement.
adv-two-a|Is Form ADV Part 2B the advisory firm's brochure?|No. Part 2A is the firm brochure; Part 2B covers the individual.
adv-two-b|Does the firm's Form ADV Part 2A replace a required supervised-person supplement?|No. Part 2B is the supervised person's supplement; Part 2A describes the firm.
assignment-contract|Can disclosure in Form ADV alone replace the advisory contract's requirement for client consent before assignment?|No. The consent requirement belongs in the advisory contract.
act-1933|Did the Securities Exchange Act of 1934 establish the primary registration framework for new public offerings?|No. That framework comes from the Securities Act of 1933.
act-1934|Did the Securities Act of 1933 create the SEC?|No. The Securities Exchange Act of 1934 created the SEC and regulates secondary markets.
state-security-term|Does a state securities registration statement always expire on December 31 like a professional registration?|No. It generally lasts one year from effectiveness, with a possible extension for an underwriter's unsold allotment.
coordination-clocks|For registration by coordination, are both the filing and final-pricing waiting periods measured in business days?|No. The filing period is 10 days; final pricing must be on file for 2 full business days, unless shortened.
federal-civil|In the federal Securities Act 1-year/3-year comparison, can late discovery extend the outside three-year cutoff?|No. Use the earlier of one year after discovery or three years after the action.
state-civil|Does the tested Uniform Securities Act civil-action comparison use the federal one-year discovery period?|No. The state comparison uses two years after discovery or three years after the action, whichever is earlier.
civil-scope|Does the federal Securities Act 1-year/3-year comparison apply to every federal securities claim?|No. It is a specified Securities Act comparison, not a universal federal deadline.
bankruptcy-trustee|Does every private trustee qualify for the fiduciary transaction exemption merely by holding that title?|No. The specifically identified trustee is a trustee in bankruptcy.
underlying-offer|Must underlying shares already be delivered before a right or warrant can constitute an offer of those shares?|No. Issuing the right or warrant is an offer because the holder pays value to acquire the underlying shares.
non-offers|Is a stock dividend treated as an offer of underlying shares in the same way as a paid right or warrant?|No. A stock dividend is distinguished from a right or warrant requiring payment for the underlying shares.
fundamental-policy|Can a registered fund's portfolio manager alone approve a fundamental investment-policy change?|No. Approval generally requires a majority of the fund's outstanding voting securities.`,
4: `tested-act|Does the newer 2002 Uniform Securities Act automatically replace the Series 65's tested legal framework?|No. The exam framework is the 1956 Act as amended by NASAA.
state-effective|Is state professional registration generally effective as soon as the application is filed?|No. It generally becomes effective at noon on the 30th day after filing.
state-expiry|Does state professional registration always last 12 months from its effective date?|No. It expires on December 31 unless renewed.
sec-application|Is a federal adviser application automatically approved after 30 days?|No. The SEC has 45 days to grant registration or begin denial proceedings.
adv-update|Can an adviser use the brochure's 120-day deadline for its annual Form ADV updating amendment?|No. The ADV amendment is due within 90 days after fiscal year-end.
brochure-annual|Does the client's contract anniversary start the annual brochure-delivery clock?|No. The general 120-day deadline runs from the adviser's fiscal year-end.
brochure-initial|Under the tested state brochure rule, can an adviser deliver at contract signing without a penalty-free cancellation opportunity?|No. Delivery at signing requires five business days to cancel without penalty; earlier delivery must be at least 48 hours before signing.
prompt-amendment|Can a materially inaccurate filing always wait for the next annual update?|No. An item requiring prompt amendment must be corrected promptly.
records-ordinary|Does the ordinary state adviser five-year retention period always start when a record is created?|No. It runs from fiscal year-end of the last entry; the first two years are generally at the principal office.
records-formation|Can an adviser discard its formation records after five years while the enterprise continues operating?|No. Formation and governance records stay at the principal office until three years after the enterprise terminates.
aum-below|Is every adviser below $100 million barred from SEC registration?|No. Another federal registration basis may apply; ordinary advisers below that threshold generally register with the state.
aum-buffer|Does SEC registration become compulsory at exactly $100 million of regulatory AUM for an ordinary adviser?|No. From $100 million to below $110 million, SEC registration is optional.
aum-must|For an ordinary adviser, is $100 million the mandatory federal-registration threshold?|No. The mandatory threshold is generally $110 million; $100 million begins the optional buffer.
aum-exit|Must an already SEC-registered ordinary adviser withdraw as soon as regulatory AUM falls below $100 million?|No. It may generally remain until regulatory AUM falls below $90 million.
registered-fund|Must a small adviser to a registered investment company use state registration because it falls below ordinary AUM thresholds?|No. Advising a registered investment company supplies a federal basis regardless of those thresholds.
withdraw-clock|Does the 180-day federal-withdrawal deadline start when the annual update is actually filed?|No. It runs from fiscal year-end, with state registration arranged before the transition.`,
5: `termination-prompt|Under the tested Uniform Act rule, can an agent substitute a generic 30-day Form U5 deadline for termination notice?|No. The agent and firm or issuer must notify promptly.
prepay-state|Does a state adviser's fee of exactly $500 paid five months ahead trigger the tested prepaid-fee financial-reporting rule?|No. The fee must exceed $500 per client and be paid at least six months in advance.
prepay-federal|Does the state $500 prepaid-fee threshold also control a federal covered adviser's brochure balance-sheet requirement?|No. The federal threshold is more than $1,200 per client paid at least six months ahead.
prepay-boundary|For the tested prepaid-fee rules, must both the dollar threshold and the six-month period be strictly exceeded?|No. The dollar threshold must be exceeded, but exactly six months satisfies the time condition.
prepay-consequence|Does crossing an adviser's prepaid-fee threshold make the fee prohibited?|No. It triggers applicable financial reporting and disclosure obligations.
fee-custody|If fee deduction qualifies for a surprise-examination exception, does the adviser cease to have custody?|No. Fee-deduction authority is custody; the examination exception changes an obligation, not the classification.
bill-custody|Can an adviser with client-authorized bill-paying powers use the fee-deduction-only surprise-exam exception?|No. Bill-paying authority is custody beyond fee deduction and defeats that specific exception.
consent-custody|Can a signed client consent erase custody status or override a custody prohibition?|No. Consent does not change that classification or supersede the rule.
custody-worth|Is $35,000 a universal fixed bond amount for every state adviser with custody?|No. It is the tested minimum net worth for custody; a bond is a separate requirement.
discretion-worth|Must a state adviser with discretion but no custody meet the $35,000 custody net-worth minimum?|No. The tested minimum for discretion without custody is $10,000.
prepay-worth|Does the state prepaid-fee trigger alone require $35,000 of net worth?|No. More than $500 per client prepaid six or more months requires positive net worth under that test.
deficiency-bond|Does a net-worth-deficiency bond always equal the adviser's entire required minimum net worth?|No. It covers the shortfall, rounded up to a $5,000 increment.
general-bond|Are $35,000 and $10,000 universal fixed bond amounts for state advisers?|No. They are net-worth thresholds; separate bonding authority may consider client count and AUM.
enforcement|Can the state Administrator personally issue a court injunction or make an arrest?|No. The Administrator issues cease-and-desist orders and seeks an injunction from a court.
hearing|Can a final registration suspension ordinarily bypass notice and an opportunity for a hearing?|No. Notice and an opportunity for a hearing ordinarily precede final suspension.`,
6: `security-exempt|Does an exempt-security classification automatically remove the salesperson's registration duty?|No. It exempts the security from state registration; person registration is tested separately.
transaction-exempt|Does one exempt transaction permanently exempt every later sale of the same security?|No. The exemption applies to that particular transaction.
covered-security|Does federal-covered security status eliminate all state notice filings and fees?|No. It preempts full state securities registration, but notice filings and fees may remain.
fraud|Are exempt securities or transactions also exempt from antifraud rules?|No. Antifraud requirements still apply.
person-separate|Can a broker-dealer or agent rely solely on the security's exemption to avoid its own registration?|No. Person registration must be evaluated separately.
placement-count|For the tested state private-placement exemption, do only completed retail purchases count toward the ten-person limit?|No. Count noninstitutional offerees in the state over 12 months, whether or not they buy.
placement-investment|Does a prearranged immediate resale satisfy the investment-intent condition for a retail buyer in the tested state private placement?|No. Noninstitutional buyers must purchase for investment.
placement-pay|May commissions be paid for soliciting noninstitutional buyers under the tested state private-placement exemption?|No. That state exemption prohibits commissions for soliciting those buyers.
placement-federal|Does the state's ten-offeree private-placement limit define every federal Regulation D safe harbor?|No. The state exemption and federal Regulation D use different tests.
notification|Is notification the state registration method identified by a simultaneous federal offering registration?|No. That is coordination; notification is associated with qualifying seasoned issuers.
coordination|An offering has a federal Securities Act registration filing. Which state method fits: notification or coordination?|Coordination. The same offering's federal registration filing is the identifying fact.
qualification|Does qualification automatically become effective at the ordinary professional-registration time?|No. A securities registration by qualification becomes effective when the Administrator orders.`,
7: `accredited|Does accredited-investor status by itself establish eligibility to pay performance fees?|No. Qualified-client status addresses performance fees; accredited status addresses private-offering eligibility.
qualified-client|Are qualified client and qualified purchaser interchangeable investor labels?|No. Qualified client addresses performance fees; qualified purchaser is the investor standard for a 3(c)(7) fund.
qualified-purchaser|Does every accredited investor automatically qualify to invest in a 3(c)(7) private fund?|No. The investor must meet the separate qualified-purchaser standard.
client-managed|Does exactly $1.4 million managed by the adviser meet the federal qualified-client managed-assets test effective June 29, 2026?|Yes. This test requires at least $1.4 million, so equality qualifies.
client-worth|Does exactly $2.7 million of net worth satisfy the 2026 federal qualified-client net-worth test?|No. Net worth must exceed $2.7 million, generally excluding the primary residence.
client-version|Are $1.1 million managed and $2.2 million net worth the current federal qualified-client dollar thresholds used by this deck?|No. From June 29, 2026, the tests are at least $1.4 million managed or net worth over $2.7 million.`,
8: `fund-exclusion|Must a private fund relying on a qualifying Investment Company Act exclusion register as an investment company?|No. It is excluded from the statutory investment-company definition.
fund-one|Under the traditional 3(c)(1) exclusion, can a fund have 100 beneficial owners plus additional retail owners?|No. The traditional limit is 100 beneficial owners in total.
fund-seven|Does a 3(c)(7) private fund use the traditional 3(c)(1) ceiling of 100 beneficial owners?|No. The defining investor test is qualified-purchaser status, not that 100-owner ceiling.
adviser-private|For the private-fund-adviser exemption, does each U.S. private fund get a separate $150 million allowance?|No. The adviser aggregates all its U.S. private-fund assets and must stay below $150 million.
adviser-exact|Can a solely private-fund adviser use the less-than-$150-million exemption with exactly $150 million in U.S. private-fund assets?|No. Exactly $150 million fails the strictly-less-than test.
reporting-adviser|Does exemption from adviser registration eliminate an exempt reporting adviser's Form ADV filing obligations?|No. It must still file the required portions of Form ADV.`,
9: `time-price|Can a broker-dealer agent choose which security to buy under time-and-price authority alone?|No. The customer must already have fixed the security, buy/sell action, and amount.
agent-written|Can a broker-dealer agent start full discretionary trading and obtain written authority ten business days later?|No. Broader agent discretion generally needs prior written authority; the ten-business-day accommodation is for advisers.
adviser-written|Under the tested adviser oral-discretion accommodation, is written authority due ten calendar days after the first discretionary trade?|No. It is due within ten business days after that transaction.
minority-partner|Does a minority partnership membership change without a control transfer necessarily require assignment consent?|No. It generally requires notice to clients within a reasonable time.
control-consent|Can an adviser complete a control transfer or assignment and merely notify clients afterward?|No. Client consent is required before the assignment.
contract-terms|Is stating the fee rate alone sufficient for the basic terms of an advisory contract?|No. Include the contract term, fee and termination-refund treatment, and assignment restriction.
renew-writing|Can an advisory contract's renewal or extension be documented only orally under the tested rule?|No. Renewal or extension must be in writing.
pledge-assignment|Does pledging advisory client contracts avoid assignment requirements because the contracts are not sold outright?|No. A pledge is treated as an assignment and requires client consent.
oral-offer|Does an ordinary oral securities offer count as a prospectus?|No. An ordinary oral offer is not a prospectus.
media-prospectus|Can a radio offering communication count as a prospectus even though it is not printed?|Yes. Radio, television, and written offering communications can be prospectuses.
tombstone|Does simply calling an advertisement a tombstone exclude it from prospectus treatment?|No. Its contents must satisfy the limits for an excluded tombstone notice.
cooling-off|Are oral offers prohibited throughout the cooling-off period?|No. Oral offers, preliminary prospectuses, and permitted tombstones may be used during that period.
no-completion|Does delivering a preliminary prospectus permit payment and completion of a sale before registration is effective?|No. Completed sales, payment, confirmation, and securities delivery must wait for effectiveness.
principal|For an adviser's principal trade with a client, can capacity disclosure and consent wait until after settlement?|No. The adviser must disclose its principal capacity in writing and obtain client consent before completion.
agency-cross|Can an adviser recommend an agency-cross transaction to both clients because it acts as broker for both?|No. It may recommend the transaction to one side, not both.
broker-pay|Does a broker-dealer acting as agent earn a principal markup on that transaction?|No. A broker acting as agent earns a commission.
dealer-pay|Is a dealer acting as principal compensated by an agency commission?|No. A dealer acting as principal earns a markup or markdown.
trade-error|Should an agent make an offsetting trade before telling a supervisor about a trade error?|No. Report the error to the designated supervisor immediately.
solicitor-iar|Can an advisory-firm employee fall within the representative definition by soliciting clients without selecting investments?|Yes. Soliciting advisory clients generally places that employee within the investment adviser representative definition.
bd-active|Can an agent continue transacting after the employing broker-dealer's registration is no longer effective?|No. The agent's registration is effective only while the employing broker-dealer's registration is in force.
dual-compensation|Does an advisory fee make a dual adviser's additional transaction compensation irrelevant to conflict disclosure?|No. The potential transaction compensation requires written conflict disclosure and client consent.
forecast-device|Does stating how long a forecasting formula has been used satisfy the advertising disclosure requirement?|No. The advertising must disclose the formula's difficulties and limitations.
testimonial|Does compensation alone determine whether a marketing statement is a testimonial?|No. A testimonial comes from a current client; an endorsement comes from a nonclient.
promoter-oversight|Does an accurate paid promotional statement eliminate compensation disclosures and compliance oversight?|No. Compensation and conflicts must still be disclosed, and compliance must be overseen.
promoter-agreement|Does exactly $1,000 of promoter compensation over the preceding 12 months fit the de minimis written-agreement exception?|Yes. The exception covers compensation of $1,000 or less over that period.`,
10: `restricted-clock|Does affiliate status alone create a Rule 144 holding period for shares bought publicly without restriction?|No. Restricted acquisition creates the holding-period clock; affiliate status creates resale conditions.
unrestricted-clock|An affiliate buys unrestricted shares publicly. Must the affiliate hold them six months under Rule 144?|No. Unrestricted publicly acquired shares have no Rule 144 holding period, though affiliate resale conditions remain.
control|Can unrestricted shares be control securities?|Yes. Any shares held by an affiliate are control securities, whether restricted or unrestricted.
nonaffiliate-public|Does a nonaffiliate generally need Rule 144 to sell unrestricted shares in an ordinary public sale?|No. Rule 144 is generally unnecessary for that sale.
nonaffiliate-reporting|A nonaffiliate has held restricted shares of a reporting issuer for six months. Have all Rule 144 conditions ended?|No. Current public information is still required until the one-year holding point.
nonaffiliate-nonreporting|Can a nonaffiliate sell restricted shares of a nonreporting issuer under Rule 144 after only six months?|No. The holding period is one year; the six-month period applies to reporting issuers.
affiliate-public|Does the absence of a holding period free an affiliate's publicly bought shares from all Rule 144 conditions?|No. Current information, volume, manner-of-sale, and notice conditions still apply.
affiliate-reporting|An affiliate has held restricted shares of a reporting issuer for six months. Can the affiliate now ignore resale limits?|No. The holding period is met, but current information, volume, manner-of-sale, and notice conditions remain.
affiliate-nonreporting|An affiliate has held restricted shares of a nonreporting issuer for one year. Have all Rule 144 resale conditions ended?|No. The one-year holding period is met, but affiliate resale conditions still apply.
lookback|Does resigning as an affiliate yesterday immediately satisfy Rule 144's nonaffiliate test?|No. The seller must not be an affiliate now or during the preceding three months.
affiliate-conditions|Is a holding period the only Rule 144 restriction an affiliate must consider?|No. Affiliate resales also involve current information, volume, manner-of-sale, and notice conditions.
listed-volume|For the tested listed-equity Rule 144 volume ceiling, do you use the smaller of 1% outstanding and average weekly trading volume?|No. Use the greater of 1% outstanding or the preceding four-week average weekly volume.
otc-volume|Can a high four-week trading average increase the tested Rule 144 volume allowance for over-the-counter equity?|No. The tested over-the-counter allowance is 1% of outstanding shares.
form144|Must a Rule 144 sale exceed both 5,000 shares and $50,000 before the tested notice requirement is triggered?|No. Exceeding either threshold during three months triggers the notice requirement.
gift-tack|Does a gift of restricted securities restart the recipient's Rule 144 holding clock at zero?|No. The recipient can add the donor's holding period.`,
11: `plan-million|Does an employee benefit plan's $1 million institutional-client threshold qualify its adviser for the special federal pension-consultant registration basis?|No. It classifies the plan for the state client count; the separate federal consultant test uses $200 million in aggregate plan assets.
pension-consultant|Must each advised plan separately hold $200 million for the special federal pension-consultant registration basis?|No. The test is at least $200 million across the eligible plans advised.
plan-distinction|Do the $1 million and $200 million employee-plan thresholds both measure an adviser's ordinary regulatory AUM?|No. $1 million classifies a state-law client; $200 million of aggregate advised plan assets can support federal pension-consultant registration.`,
12: `erisa-law|Is ERISA itself a type of defined-contribution retirement plan?|No. ERISA is a federal law governing most private-employer plans.
erisa-excluded|Does favorable retirement-plan tax treatment automatically mean the plan is covered by ERISA?|No. Government and most church plans are generally outside ERISA.
fiduciary|May a plan fiduciary use plan cash for a personal bill if the fiduciary intends to repay it?|No. Personal use of plan assets is prohibited self-dealing, even with a plan to repay.
participant-choice|Does participant-directed investing under section 404(c) excuse a plan fiduciary's own misconduct?|No. The protection may cover a participant's investment choice in a compliant plan, not fiduciary misconduct.
defined-benefit|Does the employee bear the investment shortfall when a defined-benefit plan promises a fixed benefit?|No. The employer bears funding and investment risk for the promised benefit.
defined-contribution|Does a defined-contribution plan guarantee a specified retirement benefit?|No. The employee bears investment risk, and the account value depends on investment results.
plan-401|Is a 401(k) primarily the plan designation for public-school employees?|No. A 401(k) is associated with private employers; public schools commonly use 403(b) plans.
plan-403|Is a 403(b) the ordinary salary-deferral plan for a for-profit corporation?|No. It is associated with public schools and qualifying nonprofit or church organizations.
plan-457|Is a governmental 457(b) generally covered by ERISA like a private-employer plan?|No. Governmental plans generally fall outside ERISA even when tax-favored.
profit-sharing|Must an employer make a fixed contribution every year to a profit-sharing plan?|No. Employer contributions are discretionary.
money-purchase|Can an employer skip a money-purchase pension contribution as freely as a profit-sharing contribution?|No. A money-purchase pension requires an employer contribution fixed by formula.
sep|Are employee salary deferrals the primary contribution source for a SEP IRA?|No. Employer contributions are the primary source.
simple|Is the employer contribution to a SIMPLE IRA always optional?|No. A SIMPLE IRA combines employee deferrals with a required employer contribution.
traditional|Are traditional IRA contributions deductible for every contributor?|No. A deduction is possible, but eligibility matters; it is not automatic.
roth|Must a Roth IRA owner take lifetime required minimum distributions?|No. Roth IRAs have no owner lifetime required minimum distribution.
keogh|Does Keogh identify only a defined-contribution plan?|No. A qualified self-employed plan called a Keogh can be defined benefit or defined contribution.
nonqualified|Do nonqualified retirement benefits always have the same creditor protection as qualified-plan assets?|No. The employee may be an unsecured creditor in a nonqualified arrangement.
qdro|Does the qualified domestic relations order framework divide IRA assets in the same way as qualified employer-plan benefits?|No. IRAs use separate divorce-transfer rules; the order framework applies to qualified employer plans.
qualified-erisa|Can a government retirement plan receive favorable tax treatment while remaining outside ERISA?|Yes. Tax qualification and ERISA coverage are separate classifications.
government-design|Does a city employer's 457(b) designation mean the plan promises a defined retirement benefit?|No. Governmental 457(b) status does not by itself establish a defined-benefit plan.`,
13: `early-tax|Does the 10% additional tax on an early taxable retirement distribution replace ordinary income tax?|No. It is added to ordinary income tax unless an exception applies.
simple-early|Is the additional early-distribution tax on a SIMPLE IRA always limited to 10%?|No. It can be 25% during the first two years.
457-exception|Does rolling qualified-plan money into a governmental 457(b) automatically eliminate its early-distribution penalty exposure?|No. Rolled-in qualified-plan money can remain subject to the 10% additional tax.
rule55|Does the rule-of-55 exception apply to an IRA withdrawal after separation from employment?|No. That exception applies to employer-plan distributions, not IRA withdrawals.
general-exceptions|Does any personal financial hardship automatically waive the early-retirement-distribution additional tax?|No. A qualifying exception is needed, such as death, disability, specified periodic payments, qualifying medical expenses, or an IRS levy.
ira-education|Does the IRA higher-education penalty exception automatically extend to employer retirement plans?|No. This higher-education exception is an IRA distinction.
ira-health|Does paying any health-insurance premium establish an early-distribution exception for any retirement account?|No. The identified IRA exception concerns qualifying premiums while unemployed.
ira-home|Does the IRA first-home $10,000 penalty exception renew each year?|No. $10,000 is the lifetime limit.
qdro-exception|Does an IRA withdrawal qualify for the employer-plan divorce-order penalty exception merely because a divorce decree directs it?|No. The qualified domestic relations order exception applies to qualified employer plans, not IRAs.
roth-order|Are earnings treated as the first money withdrawn from a Roth IRA?|No. Withdrawals are ordered as contributions, then conversions, then earnings.
roth-contributions|Are withdrawals of Roth IRA contributions penalized solely because the owner is under 59½?|No. Contributions can be withdrawn free of income tax and penalty.
roth-earnings|Does satisfying the five-year Roth period alone make every earnings withdrawal qualified?|No. An additional qualifying condition is needed: age 59½, death, disability, or the qualifying first-home condition.
rmd-penalty|Is the general excise tax for a missed required minimum distribution still always 50%?|No. The general rate is 25%, reduced to 10% for timely correction under the tested rule.
rmd-working|Can a traditional IRA owner delay required minimum distributions simply by continuing to work?|No. Continued work does not postpone a traditional IRA's required minimum distributions.
rmd-employer|Can an employee who owns more than 5% use continued work to postpone current-employer plan required minimum distributions?|No. The more-than-5% owner is excluded from that working-employee deferral.
ira-loans|Can a SIMPLE IRA offer participant loans because it receives employer contributions?|No. Personal, SEP, and SIMPLE IRAs do not permit participant loans.
irmaa|Does the income-related Medicare surcharge apply to every Medicare part?|No. It applies to Parts B and D.
ira-deadline|Can an individual use an income-tax filing extension to postpone a prior-year IRA contribution?|No. The contribution is generally due by the original filing deadline, normally April 15.`,
14: `529-control|Does the child irrevocably own a 529 account in the same way as a custodial gift?|No. The 529 account owner retains control and may generally change the beneficiary to an eligible family member.
529-tax|Does a 529 contribution automatically qualify for a federal income-tax deduction?|No. Contributions are after-tax federally; qualified education withdrawals are tax-free, and state benefits may be available.
529-roth|Can an entire 529 balance immediately roll into the beneficiary's Roth IRA without limits?|No. The rollover has a $35,000 lifetime cap, annual limits, a 15-year account rule, and exclusions for recent contributions.
coverdell-limit|Can two contributors each put $2,000 into Coverdell accounts for the same beneficiary in one year?|No. The $2,000 annual total is per beneficiary across contributors.
coverdell-age|Do Coverdell accounts generally allow contributions and education distributions at any age?|No. Contributions generally end by age 18, and funds must generally be used or distributed by age 30.
coverdell-use|Is Coverdell education funding limited to college expenses?|No. It can cover qualifying kindergarten-through-grade-12 and higher-education expenses.
coverdell-beneficiary|Can a Coverdell beneficiary generally be changed to an eligible family member?|Yes. Its beneficiary rules allow that; an irrevocable custodial gift cannot be redirected that way.
minor-owner|Does a custodian own an UTMA account until the child becomes an adult?|No. The named minor owns it immediately; the custodian only manages it until the state termination age.
minor-purpose|Must UGMA or UTMA money be spent only on education?|No. It may be used for the named minor's benefit beyond education.
minor-property|Is UTMA limited to financial property in the same way as UGMA?|No. UTMA can hold broader types of property; UGMA mainly holds financial property.
utma-retest|Can an UTMA custodian take back a completed gift or move it to a different child?|No. The gift is irrevocable: it permanently belongs to the named minor.`,
15: `capital-rates|Do all federal long-term capital gains receive one flat basic tax rate?|No. The basic rates are 0%, 15%, or 20%, depending on taxable income.
qualified-dividends|Are qualified dividends generally taxed at ordinary income rates?|No. They generally receive preferential long-term capital-gain rates.
iso-holding|For qualifying incentive stock option treatment, is meeting either the post-exercise or post-grant holding period enough?|No. Both are needed: more than one year after exercise and more than two years after grant.
iso-amt|Does the lack of regular taxable income at incentive stock option exercise mean the spread has no possible tax effect?|No. The exercise spread can affect alternative minimum tax.
loss-netting|Should capital losses be deducted from salary before they are used against capital gains?|No. Capital losses offset capital gains first.
loss-ordinary|Does an unused net capital loss disappear after the annual ordinary-income deduction limit is reached?|No. Unused loss carries forward; the general annual ordinary-income deduction is up to $3,000.
loss-character|Does the most recent trade determine the character of a cross-netted capital gain or loss?|No. The larger short-term or long-term side determines the remaining result's character.
gift-loss|A gift's value was below the donor's basis, and it sells below that gift-date value. Is the donor's basis used to calculate the loss?|No. The gift-date fair market value is used to calculate the loss, assuming no later basis adjustments.
gift-gain|A gift's value was below the donor's basis, and it later sells above the donor's basis. Does the gift-date value determine the gain?|No. The donor's basis does, assuming no later basis adjustments.
gift-middle|A gift sells between its lower gift-date value and the donor's higher basis. Must the recipient recognize a gain or a loss?|No. A sale within that dual-basis middle band produces neither gain nor loss.
tod|Does avoiding probate through a transfer-on-death designation automatically avoid estate or inheritance tax?|No. The designation avoids probate; estate and inheritance tax are separate questions.
tic|Does tenancy in common automatically pass a deceased owner's share to the surviving co-owner?|No. There is no automatic survivorship; the deceased owner's share passes through the estate or estate plan.
jtwros|Can a deceased joint tenant's will redirect an interest held with right of survivorship away from the survivor?|No. The survivorship interest passes directly to the surviving joint owner.
jtwros-retest|Two people properly establish a JTWROS account but contribute unequal amounts. Does unequal funding override equal ownership and survivorship?|No. The title still controls equal undivided interests and survivorship; separate gift-tax issues may arise.
will-title|Does a will control both a tenancy-in-common interest and a joint-tenancy survivorship interest in the same way?|No. The tenancy-in-common interest can follow the will; the survivorship interest passes directly to the survivor.
entirety|Does tenancy by the entirety guarantee identical protection against a spouse's separate creditors in every state?|No. Protection varies by state; the title generally involves spouses and survivorship.`,
16: `sole|Does a sole proprietor gain limited liability because business income passes through to the owner?|No. A sole proprietor has unlimited personal liability despite pass-through taxation.
general-partner|Do general partners have corporate-style limited liability?|No. General partners have unlimited liability, with pass-through taxation.
limited-partner|Does forming a limited partnership give every partner limited liability?|No. The general partner manages with unlimited liability; the limited partner has limited liability in the basic model.
llc|Must a limited liability company always be taxed as a C corporation?|No. Its tax treatment is flexible and commonly pass-through.
c-corp|Does paying dividends eliminate a C corporation's income tax on its earnings?|No. Corporate income tax can be followed by shareholder tax on distributed dividends.
s-corp|Does an S corporation ordinarily use the same double-tax pattern as a C corporation?|No. An S corporation generally passes income through to shareholders.
tax-liability|Does pass-through taxation guarantee limited liability for every owner?|No. Tax treatment and liability protection are separate features.
march-return|Do calendar-year partnerships and S corporations generally share the C corporation's April 15 return deadline?|No. Their general return deadline is March 15.
april-return|Is a calendar-year C corporation's general return deadline March 15?|No. Its general deadline is April 15.
loss-gates|Does the largest of the basis, at-risk, and passive-loss limits determine a DPP loss deduction?|No. Apply basis, then at risk, then passive limits; each can reduce the amount that survives.
passive-offset|Can passive losses generally offset wages or portfolio interest?|No. They generally offset passive income; otherwise, they are suspended.
release-loss|Does a partial, tax-free transfer automatically release all suspended passive losses?|No. The general release rule requires a complete taxable sale to an unrelated buyer.
ptp-silo|Can passive income from one publicly traded partnership automatically absorb losses from another?|No. Each publicly traded partnership is a separate passive-loss silo.`,
17: `correlation|Other factors equal, does zero correlation provide more diversification than negative correlation?|No. Lower correlation provides more benefit; negative correlation beats zero.
systematic|Can holding enough different securities eliminate systematic market risk?|No. Systematic risk remains even in a diversified portfolio.
specific-risk|Is an individual security's liquidity risk always market-wide and nondiversifiable?|No. Individual-security liquidity risk is generally unsystematic and diversifiable in the exam taxonomy.
total-return|Does price appreciation alone measure a stock's total return when it also paid dividends?|No. Include dividends and the price change, divided by the beginning value for a percentage return.
weak-emh|Does weak-form market efficiency assume that private information is already reflected in prices?|No. Weak form concerns past prices and volume; strong form includes private information.
semi-emh|Under semi-strong efficiency, should analysis of public financial statements consistently produce excess returns?|No. Prices already reflect public information, so public fundamental analysis should not consistently outperform.
strong-emh|Under strong-form efficiency, does inside information remain a systematic route to excess returns?|No. Strong form assumes prices already reflect both public and nonpublic information.`,
18: `nav-value|Should an investor use the original public offering price to value mutual-fund shares already owned?|No. Current holding value is shares owned multiplied by net asset value.
pop-pay|Does a mutual fund's net asset value always include the sales charge paid by a new investor?|No. The public offering price represents the purchase price, including an applicable sales charge.
forward-price|Does a mutual-fund order lock in the last published price?|No. It receives the next computed offering price or net asset value, as applicable.
fractional|May an open-end fund refuse redemption solely because the investor owns a fractional share?|No. It must redeem fractional as well as whole shares.
daily-nav|Do open-end funds and unit investment trusts calculate net asset value only when an investor places an order?|No. They calculate net asset value daily.
closed-nav|Is monthly net asset value calculation the commonly tested minimum for a closed-end fund?|No. The tested comparison is at least weekly; a fund may calculate it daily.
sec-report|Must a registered investment company report every individual portfolio trade to the SEC as it happens?|No. The cram-sheet reporting comparison requires SEC reports at least annually, not a report for every trade.
shareholder-report|Is one shareholder report per year enough under the registered investment-company reporting comparison?|No. Shareholder reports are sent at least semiannually.
coverage-three|Does an open-end fund satisfy the bank-debt coverage requirement when assets merely equal bank debt?|No. Assets must be at least three times bank debt: 300% coverage under the stated simplified model.
repay-equation|When a fund uses cash to repay bank debt, can you calculate coverage by reducing debt while leaving assets unchanged?|No. Both fall by the repayment: coverage = (assets − repayment) ÷ (debt − repayment).
borrow-equation|When a fund borrows cash and keeps it as an asset, can you calculate coverage by increasing debt alone?|No. Both assets and debt rise: coverage = (assets + borrowing) ÷ (debt + borrowing).`,
19: `right|Is a preemptive right an exchange-written option unrelated to an existing shareholder's ownership?|No. It lets an existing shareholder buy new issuer shares to help maintain ownership percentage and is usually short-term.
warrant|Does exercising a corporate warrant normally just transfer an existing share without new issuance?|No. Warrant exercise normally creates new corporate shares.
listed-call|Does exercise of an ordinary listed call raise new equity for the corporation?|No. It is a market contract; the corporation is not issuing new shares through the exercise.
derivative|Are common stocks and straight bonds derivatives merely because their prices fluctuate?|No. A derivative's value derives from an underlying asset, rate, index, or event.
options-approval|Can a client's signed options order replace the required account approval before trading?|No. The designated options-qualified supervisor must approve the account before the first trade.
odd-timing|Can delivery of the Options Disclosure Document wait until 15 days after the first options trade?|No. It must be delivered no later than account opening.
agreement-timing|Does the 15-day deadline for the signed options agreement start with the first exercise?|No. It starts with account approval; the agreement need not arrive before the first trade.
buyer-call|Should a future buyer purchase a put to protect against a price increase?|No. A call protects a future buyer against rising purchase prices.
seller-put|Should a future seller purchase a call to protect against a price decrease?|No. A put protects a future seller against falling sale prices.`,
20: `term-life|Does term life build a small cash-value account that can support a policy loan?|No. Term life has no cash value and no cash-value policy loan.
whole-life|Do flexible premiums and fluctuating separate-account cash value identify whole life?|No. Whole life has level or fixed premiums and guaranteed cash value.
universal-life|Does traditional universal life require fixed premiums and a separate investment account?|No. It has flexible premiums and interest-sensitive cash value.
policy-loan|Is a policy loan simply a withdrawal of the death benefit with no later consequence?|No. It is borrowing against cash value; unpaid principal and interest generally reduce the eventual payout.`,
21: `discount-yields|Is the coupon rate the highest yield measure on the tested discount bond?|No. Yield to maturity is highest, followed by current yield, then coupon rate.
maturity-spread|Do bonds of different credit ratings but the same maturity isolate a term spread?|No. They isolate a credit spread; a term spread holds credit quality constant and changes maturity.
credit-spread|Do different maturities alone identify a credit spread?|No. A credit spread compares different credit ratings while holding maturity constant.
dividend-declare|Does declaring a cash dividend reduce cash immediately, before payment?|No. Declaration reduces equity and creates a dividend payable; cash falls when payment occurs.
dividend-pay|Does paying an already-declared cash dividend reduce equity a second time?|No. Payment reduces cash and the dividend payable equally; equity is unchanged.
dividend-current|Does paying equal amounts of current assets and current liabilities always raise the current ratio?|No. It rises when the starting ratio is above one; at one it stays unchanged, and below one it falls.
risk-labels|Can inflation risk be eliminated simply by holding more issuers?|No. Purchasing-power risk is systematic and nondiversifiable.
bond-rating|Does a higher bond rating guarantee a higher investment return?|No. It signals lower credit or default risk, not a guaranteed return.
after-tax|To find a taxable bond's after-tax yield, do you divide its stated yield by one minus the tax rate?|No. Multiply the stated yield by one minus the tax rate.
tax-equivalent|To find a tax-free bond's taxable-equivalent yield, do you multiply by one minus the tax rate?|No. Divide the tax-free yield by one minus the tax rate.`,
26: `affiliate-reminder|Does buying unrestricted shares publicly remove every Rule 144 condition for an affiliate?|No. It removes the holding-period requirement, but affiliate resale conditions remain.
gift-reminder|Does a gift force the recipient to start the restricted-stock holding period again?|No. The recipient can tack on the donor's holding period.
agent-reminder|Does an exempt security automatically exempt the broker-dealer salesperson who sells it from agent registration?|No. Agent registration is a separate question from the security's exemption.
issuer-reminder|Does receiving no commission automatically exclude every issuer salesperson from agent status?|No. The narrow exception also requires sales only to the specified existing employees, partners, or directors.
audit-reminder|Does missing audit evidence always require an adverse opinion?|No. Material but nonpervasive effects support a qualified opinion; possible material and pervasive effects support a disclaimer.
fund-reminder|Is the last displayed mutual-fund price guaranteed for a new order?|No. The order receives the next computed price.
bond-reminder|Does a fixed coupon make coupon rate the highest yield on a discount bond?|No. Yield to maturity is highest, above current yield and coupon rate.
payment-reminder|Does paying a previously declared cash dividend create another charge against equity?|No. Payment reduces cash and dividends payable together; equity was reduced at declaration.
risk-tolerance|Does high income prove that a client is willing to accept high investment risk?|No. The adviser must establish the client's risk tolerance separately.
free-service|Can an advisory service advertised as free require a separate purchase if no advisory fee is itemized?|No. A free service must carry neither monetary charges nor other obligations.`,
};
