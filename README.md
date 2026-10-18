# Decision Systems v0.6 — an explicit routing boundary

[![CI: core, evaluations, external-package and browser](https://github.com/dokarpov/decision-systems/actions/workflows/test.yml/badge.svg)](https://github.com/dokarpov/decision-systems/actions/workflows/test.yml)

**Should software decide this step, or should a person?** A small deterministic decision contract for product, operations and AI-enabled workflows. It does **not** execute actions.

## Try it without reading the code

- **[Interactive decision test](https://dokarpov.github.io/decision-systems/)** — choose a scenario, change the inputs and see who decides. No log-in; synthetic data only. If this link isn't live yet, use `python3 -m http.server 4173` and open `http://localhost:4173`.
- **[5–15-minute external test guide](docs/EXTERNAL_TESTING.md)** — browser tasks, developer consumer test and what to report.
- **[Report a counterexample](https://github.com/dokarpov/decision-systems/issues/new?template=validation.yml)** — synthetic input, observed result, expected result and missing context.

## Small enough to copy into a real workflow

```js
const { decide, record } = require('decision-systems');

const result = record({
  happened: 'Support message matched a known FAQ',
  next: 'Save a private draft reply',
  clear: true,
  consequential: false,
  reversible: true
});

if (result.decider === 'person') {
  // Hand the signal, candidate action and reason to a reviewer.
} else {
  // Route to SEPARATE permission/policy check — never execute based on this alone.
}
```

**Important:** The package is *installable from a local npm tarball or GitHub checkout*; this README does **not** claim it has been published to the npm registry. Clone, run `npm test`, run `npm pack`, then install the resulting `.tgz` into a clean project. The test suite performs exactly this consumer check in a temporary directory.

## Policy in plain English

| Input conditions | Who decides | Why |
| --- | --- | --- |
| Clear, low-consequence, **explicitly reversible** | System | `clear_low_consequence` |
| Clear, low-consequence, reversibility **unknown** | Person | `reversibility_unverified` |
| Hard to reverse | Person | `hard_to_reverse` |
| Ambiguous, high consequence or both | Person | `ambiguous` / `consequential` / `ambiguous_and_consequential` |

v0.6 fixes an unsafe ambiguity in v0.5: **unspecified reversibility no longer permits a system-owned decision**. This is a routing safety change and intentionally changes the output of `decide({clear:true, consequential:false})`.

Every output contains `decider`, `reason` and original `traits`. `record()` also includes `happened` and `next`. `toActionTraits()` supplies descriptive traits to a downstream engine; an `allowed` field on its own is not permission to execute. See [integration](docs/INTEGRATION.md), [human handoff](docs/HUMAN_HANDOFF.md), and [quality](docs/QUALITY.md).

## What can be verified right now

| Claim | Evidence |
| --- | --- |
| Routing invariants | Automated exhaustive trait matrix: 2 clarity × 2 consequence × 3 reversibility states |
| Negative cases, including missing reversibility | [16 scenario evaluations](evals/decision-cases.json) and reason assertions |
| A developer *can technically install* the package | [Clean temporary directory npm-tarball integration test](tests/consumer.test.js) |
| A browser *can show the routing response* | [Responsive end-to-end browser checks](tests/browser-smoke.mjs) |
| Real developers adopted the contract | **Not demonstrated** |
| External comprehension or time savings | **Not measured** |
| Domain-specific permissions and production safety | **Not established** |

## Boundary between the two products

[Decision Systems](https://github.com/dokarpov/decision-systems) answers **who decides**. [Policy Kit](https://github.com/dokarpov/policy-kit) answers **whether a proposed action may execute**. Routing to the system does not bypass authorization or human policy.

This project is a **research-grade reference**, not an agent controller, compliance certification, or independently validated commercial product.

## What success looks like next

Five developer/automation-owner tests, three operator/product-owner tests, and at least two independent installations used in a **different** workflow (not copies of the test fixture). Record both successes and failures using the [validation protocol](docs/EXTERNAL_TESTING.md). No interviews, users or adoption are implied by this plan.

MIT license · Built by Daria Karpova.
