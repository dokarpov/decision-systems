import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const { decide } = require(join(__dirname, '..', 'decision.js'));

const cases = JSON.parse(readFileSync(join(__dirname, '..', 'evals', 'decision-cases.json'), 'utf8'));

let passed = 0;
for (const c of cases) {
  const input = { clear: c.clear, consequential: c.consequential };
  if (c.reversible !== undefined) input.reversible = c.reversible;
  const result = decide(input);
  const ok = result.decider === c.expected && (!c.reason || result.reason === c.reason);
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${c.id}: expected=${c.expected} actual=${result.decider}${result.reason ? ` (${result.reason})` : ''}`);
  if (ok) passed += 1;
  else process.exitCode = 1;
}
console.log(`\n${passed}/${cases.length} passed`);
