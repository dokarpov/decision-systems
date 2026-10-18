# Decision Systems v0.7 — small, testable decision boundaries

[![Core, consumer and browser tests](https://github.com/dokarpov/decision-systems/actions/workflows/test.yml/badge.svg)](https://github.com/dokarpov/decision-systems/actions/workflows/test.yml)

**Who should decide a proposed workflow action: software or a person?** Decision Systems is a tiny deterministic JavaScript contract. It **does not execute an action**, authorize a tool, decide what evidence is true, or claim to make a production AI system safe.

## Use it now — no npm registry publication required

Node.js 20+:

```bash
mkdir decision-test && cd decision-test
npm init -y
npm install github:dokarpov/decision-systems
node -e "const d=require('decision-systems'); console.log(d.decide({clear:true,consequential:false,reversible:true}))"
```

This installs from the **public GitHub repository**, not the npm registry. Pin to a commit SHA for repeatable production experiments instead of using the moving default branch. The internal consumer CI additionally verifies `npm pack` and install in an empty project; **independent developer adoption is not yet demonstrated**.

### Minimal integration

```js
const { decide, record, toActionTraits } = require('decision-systems');

const result = record({
  happened: 'A customer asked an established FAQ',
  next: 'Save an internal response draft',
  clear: true,
  consequential: false,
  reversible: true
});

// Only system-owned decisions can reach the separate policy boundary.
// A route alone is not authorization.
const action = toActionTraits(result, {
  id: 'save_draft',
  allowed: true // explicit permission asserted by the integrating policy, not inferred here
});
console.log(result.decider, result.reason, action.allowed);
```

**Fail-closed defaults:** omitted reversibility means human review; omitted `allowed` means `false`; an explicit `allowed:true` cannot override a human-owned decision. Invalid or contradictory bridge results throw a TypeError rather than producing an apparently safe action.

| Decision input | Result |
| --- | --- |
| Clear, low consequence, explicitly reversible | `system` |
| Irreversible or reversibility not verified | `person` |
| Ambiguous, consequential or both | `person` |

### For non-developers

The [interactive demo](https://dokarpov.github.io/decision-systems/) uses four fictional scenarios and displays a JSON result immediately as you change assumptions. **GitHub Pages is not yet enabled for this repository; if this URL is 404, the demo is not publicly live.** To preview from source, clone the repository, run `python3 -m http.server 4173`, and open `http://localhost:4173`. No account, real input or sensitive data is required.

## Help evaluate the idea, not just the code

- [**External tester guide**](docs/EXTERNAL_TESTING.md) — 5–15 minute study with concrete tasks and success/failure criteria.
- [**Report a counterexample**](https://github.com/dokarpov/decision-systems/issues/new?template=validation.yml) — use **synthetic** workflow details, expected decision and observed outcome.
- [**Contribute a test or improvement**](CONTRIBUTING.md) — reproduction steps and regression checks are as valuable as new features.
- [**Example integration**](examples/consumer.js) and [**technical integration notes**](docs/INTEGRATION.md).

### What is tested

- 12 exhaustive combinations of clarity, consequence and reversible / irreversible / unknown.
- 16 illustrative evaluation cases with expected outcomes and key reasons.
- Clean temporary project can install the npm tarball and run its public API.
- Browser demo passes Chromium flow tests at 320 / 390 / 768 / 1440 px.
- CommonJS import does not write to global scope; explicit permission is required for the policy bridge.

This is **technical coverage**, not production authorization, independent security certification or evidence that anyone has used it.

### What has not been proved

- Upstream assessments of `clear`, `consequential` and `reversible` may be wrong; the contract does not validate them against real evidence.
- Domain-specific permissions, identity, recovery, authorization and safety checks belong in the integrating system.
- We have **no verified independent installation or developer reuse**, comprehension outcomes, or measured time savings yet.
- [Policy Kit](https://github.com/dokarpov/policy-kit) explores a separate execution policy layer. Decision Systems only returns ownership of a decision.

### Changes since v0.6

v0.7 intentionally changes `toActionTraits()`: `allowed` is now **false by default** and remains false for any `person` result even if the caller passes `allowed:true`. In v0.6 it could default to true for human-owned decisions. Node imports no longer attach `DecisionSystems` to `globalThis`. See [changelog](CHANGELOG.md).

MIT · Daria Karpova · Research-stage OSS.
