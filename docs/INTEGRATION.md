# Integration pattern

Use Decision Systems between a normalized signal and the executor that could act on it:

```text
signal → normalize → decide → system path OR human handoff → outcome
```

The contract is intentionally transport-agnostic. It can sit behind a form, queue, webhook, agent tool call or internal product flow.

## Minimal usage

```js
const { decide } = require('./decision.js');

const result = decide({
  clear: true,
  consequential: false,
  reversible: true
});
```

## Typical placement

1. **After signal normalization** — once the workflow knows what happened and has a candidate next step.
2. **Before an executor or tool call** — so ambiguous, consequential or explicitly hard-to-reverse work is not silently automated.
3. **Before the human queue** — so a reviewer receives a reasoned handoff rather than an opaque exception.

## Pairing with Policy Kit

Decision Systems answers **who decides**.  
[Policy Kit](https://github.com/dokarpov/policy-kit) answers **whether the proposed action may execute automatically**.

```text
Decision Systems          Policy Kit
who decides?  ───────►    AUTO / ASK / BLOCK
```

A system-owned decision is not the same thing as permission to execute. The downstream action policy can still ask or block based on permissions, data sensitivity, money movement or other domain rules.

## What stays outside the core

- confidence scores
- full evidence payloads
- recovery plans
- RBAC / permission models
- audit-event schemas
- domain-specific thresholds

Those belong in the surrounding workflow when the domain requires them. This repository does not claim that the three routing traits are sufficient for every production decision.
