# Decision Systems v0.5

[![test](https://github.com/dokarpov/decision-systems/actions/workflows/test.yml/badge.svg)](https://github.com/dokarpov/decision-systems/actions/workflows/test.yml)

**An explicit decision boundary for product, operations and agentic workflows.**

> What happened → what next → who decides?

Decision Systems is deliberately small. It separates workflow routing from action permission so automation can handle clear, low-consequence work while ambiguity, meaningful consequence or explicit irreversibility is routed to a person.

## Why this exists

Many “AI workflow” designs collapse three different questions into one prompt:

1. what happened?
2. what should happen next?
3. who has the right to decide?

That makes handoff, testing and downstream policy harder to inspect. This repository turns the third question into a deterministic contract.

```text
event / state
    ↓
candidate next step
    ↓
clarity + consequence + reversibility
    ↓
system ───────────────► continue
person ───────────────► human queue
```

## Core API

```js
const { decide, record, toActionTraits } = require('./decision.js');

const decision = decide({
  clear: true,
  consequential: false,
  reversible: true
});
// { decider: 'system', reason: 'clear_low_consequence', traits: ... }

const evidence = record({
  happened: 'Lead validated with consent',
  next: 'Create CRM contact',
  clear: true,
  consequential: false,
  reversible: true
});
```

- `decide()` routes the decision to `system` or `person`.
- `record()` packages the event, candidate next step, decision, reason and traits.
- `toActionTraits()` carries those traits into a downstream action-policy layer.

## What is actually verified

| Evidence | Status |
|---|---|
| Executable routing contract | implemented |
| Input validation / fail-fast behavior | tested |
| Record + action-trait bridge | tested |
| JSON contract | included |
| Cross-domain examples | included |
| Scenario evals | **12 cases passing** |
| Browser behavior | CI smoke-tested at 4 viewport sizes |
| Production deployment / customer outcome | **not claimed** |

Run the contract tests and scenario evals with:

```bash
npm test
```

The GitHub workflow also checks the browser demo separately.

## Interactive demo

`index.html` exposes the same routing rule used by the library. It is a demonstration of the contract, not a claim of production workflow coverage.

## Relationship to Policy Kit

Decision Systems answers **who decides**.

[Policy Kit](https://github.com/dokarpov/policy-kit) answers the separate execution question: **may this action run automatically?**

```text
Decision Systems                 Policy Kit
who decides?        ───────►     AUTO / ASK / BLOCK
```

A system-owned decision can therefore still be asked or blocked by downstream action policy.

## Limits

This repository demonstrates a reusable decision pattern with deterministic tests and explicit handoff behavior. It does **not** claim production deployment, customer adoption, compliance certification, domain completeness or statistically optimal thresholds.

The rule is intentionally conservative. Real deployments still need domain-specific permissions, evidence, observability, recovery and review design around it.

---

Built by **Daria Karpova** · Product Systems · AI · 0→1 · [dokarpov](https://github.com/dokarpov)
