// Validates App Store Connect metadata limits and keyword hygiene for app-store/metadata/<locale>/.
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

const root = 'app-store/metadata';
const limits = { 'name.txt': 30, 'subtitle.txt': 30, 'keywords.txt': 100, 'promotional_text.txt': 170, 'description.txt': 4000 };
let failed = false;
for (const locale of await readdir(root)) {
  const read = async file => (await readFile(path.join(root, locale, file), 'utf8')).trim();
  const values = {};
  for (const [file, max] of Object.entries(limits)) {
    values[file] = await read(file);
    const length = [...values[file]].length;
    const ok = length > 0 && length <= max;
    if (!ok) failed = true;
    console.log(`${ok ? 'ok  ' : 'FAIL'} ${locale}/${file}: ${length}/${max}`);
  }
  const titleWords = new Set(`${values['name.txt']} ${values['subtitle.txt']}`.toLowerCase().split(/\s+/));
  const keywords = values['keywords.txt'].split(',');
  const problems = keywords.filter((k, i) => !k || k !== k.trim() || titleWords.has(k.toLowerCase()) || keywords.indexOf(k) !== i);
  if (problems.length) { failed = true; console.log(`FAIL ${locale}/keywords.txt repeats or blank entries: ${problems.join(', ')}`); }
}
if (failed) process.exit(1);
