import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { ruleText } from '../content/rules';
import { remainingRules } from '../content/rules-rest';
import { applications } from '../content/applications';
import { contrastText } from '../content/contrasts';
import { sourcesForRule } from '../content/official-sources';
import { cardSchema, categories, type Card, type Category } from '../lib/model';
const sourceDir=process.env.SERIES65_SOURCE_DIR || 'C:/Users/chira/Desktop/sports/datascience';
const sourceFile='series_65_must_memorize_SHORT_2026-09-06.md';
const sourceFiles=[sourceFile,'series_65_question_design_research.md','series_65_new_chat_handoff.md','series_65_test_5_miss_audit_2026-09-12.md'];
const hash=(s:string)=>createHash('sha256').update(s).digest('hex');
const sources=await Promise.all(sourceFiles.map(async f=>({file:f,text:await readFile(path.join(sourceDir,f),'utf8')})));
const sourceRevision=sources[0].text.match(/\*\*Last updated (.+?)\*\*/)?.[1];
if(!sourceRevision) throw new Error('Canonical source revision heading is missing. Review the source before importing.');
const sections=[...sources[0].text.matchAll(/^### Section (\d+) — (.+)\r?$/gm)].map((m,i,all)=>({number:Number(m[1]),title:m[2].trim(),body:sources[0].text.slice(m.index,all[i+1]?.index || sources[0].text.length)}));
if(sections.length!==27) throw new Error(`Expected 27 sections; got ${sections.length}. Review the authoring ledger before importing a changed outline.`);
const glossary:Record<string,string>={IA:'investment adviser',IAR:'investment adviser representative',BD:'broker-dealer',SEC:'Securities and Exchange Commission',AUM:'assets under management',RAUM:'regulatory assets under management',USA:'Uniform Securities Act',NASAA:'North American Securities Administrators Association',CE:'continuing education',IRA:'individual retirement account',RMD:'required minimum distribution',ERISA:'Employee Retirement Income Security Act',QDRO:'qualified domestic relations order',SEP:'Simplified Employee Pension',SIMPLE:'Savings Incentive Match Plan for Employees',IRS:'Internal Revenue Service',AMT:'alternative minimum tax',ISO:'incentive stock option',FMV:'fair market value',TOD:'transfer on death',TIC:'tenancy in common',JTWROS:'joint tenants with right of survivorship',TBE:'tenancy by the entirety',UGMA:'Uniform Gifts to Minors Act',UTMA:'Uniform Transfers to Minors Act',LLC:'limited liability company',DPP:'direct participation program',EMH:'efficient market hypothesis',NAV:'net asset value',POP:'public offering price',UIT:'unit investment trust',ODD:'Options Disclosure Document',LIFO:'last in, first out',YTM:'yield to maturity',NPV:'net present value',IRR:'internal rate of return',CAPM:'capital asset pricing model',DNI:'distributable net income',OTC:'over-the-counter',IRMAA:'income-related monthly adjustment amount',ESA:'Education Savings Account',GP:'general partner',LP:'limited partner',VC:'venture capital','S&P 500':"Standard & Poor's 500 Index"};
function expandSequence(strings:string[]):string[]{
  // Form ADV is the form's proper identifier, not an acronym to replace inside
  // a sentence. Its formal title remains in the source heading in Card details.
  const seen=new Set<string>();
  return strings.map(s=>s.replace(/\b(?:S&P 500|RAUM|[A-Z]{2,6})\b/g,ac=>{
    if(!glossary[ac]||seen.has(ac)) return ac;
    seen.add(ac); return `${glossary[ac]} (${ac})`;
  }));
}
const text={...ruleText,...remainingRules};
const contrasts = new Map<string, { front: string; answer: string }>();
for (const [section, rows] of Object.entries(contrastText)) {
  for (const row of rows.trim().split('\n')) {
    const parts = row.split('|').map(value => value.trim());
    if (parts.length !== 3 || parts.some(value => !value)) throw new Error(`Malformed contrast: ${row}`);
    const [key, front, answer] = parts;
    const id = `${section}:${key}`;
    if (contrasts.has(id)) throw new Error(`Duplicate contrast: ${id}`);
    contrasts.set(id, { front, answer });
  }
}
const usedContrasts = new Set<string>();
const retestKeys=new Set(['14:utma-retest','14:minor-owner','15:jtwros-retest','15:jtwros','15:will-title','20:whole-life','20:universal-life','20:policy-loan','20:term-life','8:fund-one','8:fund-seven','8:adviser-private','8:adviser-exact','15:loss-netting','15:loss-ordinary','15:loss-character','17:specific-risk','17:systematic','21:risk-labels','3:federal-civil','3:state-civil','2:agent-departure','2:state-employment','2:federal-employment']);
// The miss audit identifies concepts only. No question or answer wording is imported from it.
const auditSections=new Set([1,3,5,9,13,18,19,21,26]);
for(const key of ['fiduciary','plan-403','plan-457','qualified-erisa','government-design']) retestKeys.add(`12:${key}`);
const hooks:Record<string,string>={'1:federal-iar':'For the federal representative, locate the desk.','2:ce-split':'Two six-credit buckets; no rollover.','3:act-1933':'Issuing comes before trading: 1933 before 1934.','4:adv-update':'File at ninety; deliver at one-twenty.','5:deficiency-bond':'Find the gap, then round upward.','8:fund-seven':'The fund checks investors; the adviser checks aggregate assets.','10:restricted-clock':'Acquisition sets the clock; affiliation sets the conditions.','14:utma-retest':'The custodian holds the keys; the child owns the car.','15:will-title':'Read the title before reading the will.','16:loss-gates':'Basis first, economic exposure second, passive income last.','18:repay-equation':'Cash leaves both sides of the coverage fraction.','20:universal-life':'Flexible premiums, interest-sensitive value.','21:tax-equivalent':'To compare with a taxable bond, gross up the tax-free yield.','24:disclaimer':'Unknown evidence, no opinion; known error, adverse.'};
const cards:Card[]=[];
const ledger:{id:string;section:number;locator:string;category:Category;count:number}[]=[];
const locators: {section:number; key:string; found:boolean}[]=[];
for(const section of sections){
  const category:Category=section.number<=11?'laws':section.number<=17?'recommendations':section.number<=21?'vehicles':section.number<=24?'economics':section.number===25?'laws':section.number===26?'recommendations':'laws';
  for(const line of (text[section.number]||'').trim().split('\n')){
    const parts=line.split('|').map(x=>x.trim());
    if(parts.length!==5) throw new Error(`Malformed rule in ${section.number}: ${line}`);
    const [key,locator,prompt,rule,trap]=parts;
    locators.push({section:section.number,key,found:section.body.includes(locator)});
    const ruleId=`s65-${String(section.number).padStart(2,'0')}-${key}`;
    const specialCategory:Category=section.number===26?(key.startsWith('audit')?'economics':key.startsWith('fund')||key.startsWith('bond')||key.startsWith('payment')?'vehicles':key.includes('agent')||key.includes('issuer')||key.includes('affiliate')||key.includes('gift')||key.includes('free')?'laws':'recommendations'):section.number===27&&key.startsWith('dni')?'recommendations':category;
    const priority:Card['priority']=section.number>=25?'low':specialCategory==='laws'||specialCategory==='recommendations'?'high':specialCategory==='vehicles'?'medium':'low';
    const retest=retestKeys.has(`${section.number}:${key}`)||auditSections.has(section.number);
    const common={ruleId,deckId:'series65' as const,section:section.number,sectionTitle:section.title,category:specialCategory,priority,tags:[key,...(retest?['retest']:[])],sourcePath:sourceFile,sourceHeading:`Section ${section.number} — ${section.title}`,retest,reviewStatus:'draft' as const};
    const add=(suffix:string,type:Card['type'],front:string,answer:string,explanation:string)=>{
      const expanded=expandSequence([front,answer,rule,trap,explanation,hooks[`${section.number}:${key}`]||'']);
      const fields={...common,id:`${ruleId}-${suffix}`,type,front:expanded[0],answer:expanded[1],governingRule:expanded[2],trap:expanded[3],explanation:expanded[4],officialSources:sourcesForRule(section.number,key),...(expanded[5]?{memoryHook:expanded[5]}:{})};
      cards.push(cardSchema.parse({...fields,contentVersion:hash(JSON.stringify(fields)+section.body)}));
    };
    add('recall','recall',prompt,rule,rule);
    if(priority==='high'||retest) {
      const keyId = `${section.number}:${key}`;
      const pair = contrasts.get(keyId);
      if (!pair) throw new Error(`Author a complete contrast question and answer for ${keyId}.`);
      usedContrasts.add(keyId);
      add('contrast','contrast',pair.front,pair.answer,rule);
    }
    const extras=applications.filter(a=>a.section===section.number&&a.key===key);
    for(const extra of extras) add('apply',extra.type,extra.front,extra.answer,extra.explanation);
    ledger.push({id:ruleId,section:section.number,locator,category:specialCategory,count:1+Number(priority==='high'||retest)+extras.length});
  }
}
const missing=locators.filter(x=>!x.found);
if(missing.length) throw new Error(`Source locators not found: ${JSON.stringify(missing)}`);
if(new Set(cards.map(c=>c.id)).size!==cards.length) throw new Error('Duplicate stable IDs.');
for (const key of contrasts.keys()) if (!usedContrasts.has(key)) throw new Error(`Unused contrast: ${key}`);
for(const a of applications) if(!ledger.some(r=>r.section===a.section&&r.id.endsWith(`-${a.key}`))) throw new Error(`Unmapped application: ${a.key}`);
const count=(field:keyof Card,value:unknown)=>cards.filter(c=>c[field]===value).length;
let coverage=`# Deck coverage\n\nGenerated by npm run content:import. All ${cards.length} cards are draft. ${ledger.length} explicitly authored rule objectives span all 27 numbered sections. This is a cram-sheet review deck, not full exam coverage.\n\n| Section | Source heading | Rules | Cards | Recall | Application | Contrast | Calculation |\n|---|---|---:|---:|---:|---:|---:|---:|\n`;
for(const s of sections){const subset=cards.filter(c=>c.section===s.number);coverage+=`| ${s.number} | ${s.title} | ${ledger.filter(r=>r.section===s.number).length} | ${subset.length} | ${['recall','application','contrast','calculation'].map(t=>subset.filter(c=>c.type===t).length).join(' | ')} |\n`;}
coverage+='\n## Categories\n\n| Category | Cards |\n|---|---:|\n'+Object.entries(categories).map(([key,value])=>`| ${value.full} | ${count('category',key)} |`).join('\n');
coverage+='\n\n## Priority\n\n| Priority | Cards |\n|---|---:|\n'+['high','medium','low'].map(p=>`| ${p} | ${count('priority',p)} |`).join('\n');
coverage+=`\n\nRetest cards: ${count('retest',true)}. Every high-priority rule and retest rule has a contrast companion. Every explicit RETEST concept in sections 12, 14, and 15 also has a changed-fact application. Retest flags additionally use the handoff's cold-retest concepts and sections containing core miss-audit concepts; this is an editorial priority, not an inference about another learner's performance.\n\n## Coverage boundaries\n\nSection 26 private scores and performance judgments are excluded as non-testable personal context. Repeated mnemonic summaries are not independent rules. Duplicate reminders have explicit IDs in section 26 for source traceability. Narrative first-use acronym lines supply terminology, not questions. Sections 25–27 stay low priority. Grouped lists (for example, general penalty exceptions and CAPM assumptions) are one recognition objective; their separate neighboring-rule distinctions receive independent cards where specified.\n\n## Objective ledger\n\n| Stable rule ID | Section | Source locator | Cards |\n|---|---:|---|---:|\n`+ledger.map(r=>`| ${r.id} | ${r.section} | ${r.locator.replaceAll('|','/')} | ${r.count} |`).join('\n')+'\n';
const provenance=`# Content provenance\n\nStudy preview; commercial release blocked. All authored prompts, scenarios, traps, and worked numerical examples were independently written for this project. The importer never reads optional vendor-style question banks, keys, or recalled examination materials. Facts come from the canonical sheet. The design blueprint shapes difficulty; handoff and miss audit identify priorities only. No private scores or source-note text are bundled in the application.\n\nAll cards remain **draft**. None has received a human copyright/provenance audit or subject-matter verification. Every imported rule below **requires review against official public authority before commercial release**. A technical schema or source-locator check is not substantive verification.\n\n## Input fingerprints\n\n`+sources.map(s=>`- ${path.join(sourceDir,s.file)} — SHA-256 ${hash(s.text)}`).join('\n')+'\n\n## Rule provenance\n\n| Rule ID | Canonical local path | Source heading | Release review |\n|---|---|---|---|\n'+ledger.map(r=>`| ${r.id} | ${path.join(sourceDir,sourceFile)} | Section ${r.section} — ${sections.find(s=>s.number===r.section)!.title} | REQUIRED: primary authority + human wording audit |`).join('\n')+'\n';
const manifest={schemaVersion:1,sourceRevision,sourceFiles:sources.map(s=>({file:s.file,sha256:hash(s.text)})),rules:ledger.length,cards:cards.length,sections:sections.map(s=>({number:s.number,title:s.title,sha256:hash(s.body)}))};
const cell = (value:string) => value.replaceAll('|', '\\|').replaceAll('\n', ' ');
const answerReview = `# Question and answer continuity\n\nEditorial pass: September 13, 2026. Every original recall objective, generated contrast pair, and authored application/calculation was read as a question followed by its answer. The revised deck has ${cards.length} cards. This is an agent editorial pass, not human subject-matter or copyright verification. All cards remain draft.\n\n- Contrast cards now have independently authored questions and direct answers in content/contrasts.ts. There is no generic claim template and no fallback to a recall answer.\n- Yes/no questions answer yes or no before explaining; choice questions name the selected choice.\n- Timeline questions identify the actor, issuer status, and the period being requested.\n- Changed wording retains stable IDs. The importer rejects missing and unused contrast pairs.\n- Public references identify their publisher and distinguish rules, guidance, references, and exam-outline topics. An outline link confirms curriculum scope only; it does not substantiate the complete answer.\n- Calculations state their assumptions and retain a worked explanation in Card details.\n\nGenerated pair ledger for review and regression comparison:\n\n| Card ID | Question | Revealed answer |\n|---|---|---|\n` + cards.map(c=>`| ${c.id} | ${cell(c.front)} | ${cell(c.answer)} |`).join('\n')+'\n';
const publicReferences = `# Public answer references\n\nCurated September 13, 2026. Every answer has at least one public reference. Links supplement the canonical local source; they do not change draft status, establish state adoption of a model rule, or certify subject-matter accuracy. Educational concepts can use guidance or a professional body's reference instead of a legal rule. External pages require an internet connection; the deck remains available offline.\n\n## References still needing a more specific authority\n\nThe following rules currently link to the NASAA topic outline. This is explicitly labeled **exam topic**, not a rule citation. A specific public authority for the full claim remains a release requirement:\n\n` + cards.filter(c=>c.type==='recall'&&c.officialSources.some(s=>s.kind==='outline')).map(c=>`- ${c.ruleId}: ${c.front}`).join('\n') + '\n\n## Rule-to-reference ledger\n\n| Rule ID | Public reference | Kind |\n|---|---|---|\n' + cards.filter(c=>c.type==='recall').map(c=>`| ${c.ruleId} | ${c.officialSources.map(s=>`[${cell(s.authority+' — '+s.title)}](${s.url})`).join('<br>')} | ${c.officialSources.map(s=>s.kind).join(', ')} |`).join('\n')+'\n';
const outputs:Record<string,string>={'content/deck.json':JSON.stringify(cards,null,2)+'\n','content/source-manifest.json':JSON.stringify(manifest,null,2)+'\n','docs/deck-coverage.md':coverage,'docs/content-provenance.md':provenance,'docs/answer-continuity.md':answerReview,'docs/public-references.md':publicReferences};
for(const [file,contents] of Object.entries(outputs)){
  if(process.argv.includes('--check')) { if(await readFile(file,'utf8')!==contents) throw new Error(`${file} is stale. Reimport and review changes.`); }
  else { await mkdir(path.dirname(file),{recursive:true}); await writeFile(file,contents); }
}
console.log(`${process.argv.includes('--check')?'Verified':'Generated'} ${cards.length} draft cards, ${ledger.length} rule objectives, ${sections.length} sections.`);
