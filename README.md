# Decision Systems v0.4

[![test](https://github.com/dokarpov/decision-systems/actions/workflows/test.yml/badge.svg)](https://github.com/dokarpov/decision-systems/actions/workflows/test.yml)

**A small executable decision boundary for product, operations and agentic workflows.**

> What happened → what next → who decides?

The point is not to make every decision automatic. It is to make the boundary explicit enough that a system can **act on clear, low-consequence work and route ambiguity or irreversible decisions to a person**.

## Why this exists

Many “AI workflow” designs collapse three different questions into one prompt:

1. what happened?
2. what should happen next?
3. who has the right to decide?

That makes handoff, audit and downstream policy harder to reason about. Decision Systems keeps the decision contract small and inspectable.

```text
event / state
    ↓
next action candidate
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

- `decide()` — routes the next decision to `system` or `person`.
- `record()` — packages `happened / next / decider / reason / traits` for queues or audit.
- `toActionTraits()` — bridges the decision into tool/action policy without hiding risk traits in prose.

## Evidence today

| Evidence | Status |
|---|---|
| Executable routing contract | implemented |
| JSON schema | implemented |
| Cross-domain examples | included |
| Agentic decision cases | included |
| Automated evals | **12/12 passing** |
| Production customer outcome | **not claimed** |

Run:

```bash
npm test
```

## Interactive demo

`index.html` exposes the routing rule directly: clarity, consequence and reversibility change the decider in real time.

## Relationship to Policy Kit

Decision Systems answers **who decides**.

[Policy Kit](https://github.com/dokarpov/policy-kit) answers the second question required by tool-using agents: **even if the system may decide, may this action execute automatically?**

```text
Decision Systems                 Policy Kit
who decides?        ───────►     AUTO / ASK / BLOCK
```

## Status boundary

This repository demonstrates a reusable product/agent decision pattern plus executable tests. It does **not** claim production deployment, customer adoption, compliance certification or statistically optimal decision thresholds.

---

Built by **Daria Karpova** · Product Systems · AI · 0→1 · [dokarpov](https://github.com/dokarpov)
