# Quality and external validation — v0.6

This contract evaluates **routing behavior**, not AI quality or authorization. Production outcome accuracy and user value remain unmeasured.

## Executable gates

- Fail-closed policy bridge and contradictory-result rejection are checked in unit tests.
- CommonJS import must not attach a global browser variable in Node.js.
- Core unit tests with an exhaustive `2 × 2 × 3` (clear × consequence × reversible/irreversible/unknown) matrix: automatic routing requires **three explicit safe conditions**.
- 16 synthetic/illustrative evals: verify the decider and, where specified, the machine-readable reason.
- Clean consumer test: `npm pack`, install `.tgz` into a temporary unrelated directory, `require('decision-systems')`, run the public API, then remove everything.
- Browser smoke test: four widths (320, 390, 768, 1440), real scenario switching, decision result visibility after changes, JSON consistency, no document overflow, console errors or failed resources.

## Safety invariants

| Case | Route |
| --- | --- |
| Clear + low-consequence + explicitly reversible | system |
| Ambiguous or consequential | person |
| Hard to reverse | person |
| Reversibility not assessed | person |

The route is NOT authorization. The downstream service must independently decide if an action is permitted.

## Unverified risks

- Upstream judgement of clarity, consequence and reversibility can itself be incorrect.
- Domain-specific thresholds, source evidence, RBAC, consent, recovery and orchestration remain outside the core.
- A local npm consumer smoke test is not a real independent developer integration.
- Automated browser tests cannot measure comprehension, trust, or commercial value.

## Real-world falsification

Follow [external test protocol](EXTERNAL_TESTING.md). Capture failures and alternative interpretations, especially where participants cannot identify whether an action is reversible. Do not report pilot thresholds as measured outcomes until test participants are observed.
