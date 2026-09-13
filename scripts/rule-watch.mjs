// Rule-change watch list: shows due checks, records verification, and validates card links.
// Usage: node scripts/rule-watch.mjs [--all] [--markdown] | --verify <id> [--date YYYY-MM-DD]
import { readFile, writeFile } from 'node:fs/promises';

const file = 'content/rule-watch.json';
const watch = JSON.parse(await readFile(file, 'utf8'));
const deck = JSON.parse(await readFile('content/deck.json', 'utf8'));
const args = process.argv.slice(2);
const today = new Date().toISOString().slice(0, 10);

const ruleIds = new Set(deck.map(card => card.ruleId));
const broken = watch.items.flatMap(item => item.rules.filter(id => !ruleIds.has(id)).map(id => `${item.id} → ${id}`));
if (broken.length) { console.error(`Watch list points to missing rules:\n${broken.join('\n')}`); process.exit(1); }

const verifyAt = args.indexOf('--verify');
if (verifyAt >= 0) {
  const id = args[verifyAt + 1];
  const item = watch.items.find(entry => entry.id === id);
  if (!item) { console.error(`Unknown watch item: ${id}`); process.exit(1); }
  const dateAt = args.indexOf('--date');
  item.lastVerified = dateAt >= 0 ? args[dateAt + 1] : today;
  await writeFile(file, `${JSON.stringify(watch, null, 2)}\n`);
  console.log(`Recorded ${id} as verified on ${item.lastVerified}.`);
  process.exit(0);
}

const nextDue = item => new Date(Date.parse(item.lastVerified) + item.everyDays * 86_400_000).toISOString().slice(0, 10);
const rows = watch.items.map(item => ({ ...item, due: nextDue(item) })).sort((a, b) => a.due.localeCompare(b.due));
const due = rows.filter(item => item.due <= today);
const shown = args.includes('--all') ? rows : due;

if (args.includes('--markdown')) {
  if (!due.length) { console.log('No rule checks due.'); process.exit(0); }
  console.log(`${due.length} rule check${due.length === 1 ? '' : 's'} due as of ${today}.\n`);
  for (const item of due) {
    const cards = deck.filter(card => item.rules.includes(card.ruleId)).length;
    console.log(`### ${item.id}\n- Check: ${item.fact}\n- Source: ${item.source}\n- Rules: ${item.rules.map(id => `\`${id}\``).join(', ')} (${cards} cards)\n- Last verified: ${item.lastVerified}\n`);
  }
  console.log('After checking: update cards if needed, run `npm run content:import`, then `npm run rules:verify -- <id>`.');
  process.exit(0);
}

console.log(shown.length ? '' : `No rule checks due. Next: ${rows[0].id} on ${rows[0].due}.`);
for (const item of shown) console.log(`${item.due <= today ? 'DUE ' : 'ok  '} ${item.due}  ${item.id}\n      ${item.fact}\n      ${item.source}`);
