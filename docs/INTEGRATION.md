# Integration pattern

A workflow can use Decision Systems between a signal and an executor:

```text
signal → normalize → decide → system action OR human handoff → outcome
```

The contract is intentionally transport-agnostic. It can sit behind a form, queue, webhook, agent tool call or internal product flow.

## Minimal usage (Node / browser)

```js
const { decide } = require('./decision.js');

const result = decide({
  clear: true,
  consequential: false
});
```

## Typical placement

1. **After signal normalization** — once you know what happened and what the candidate next step is.
2. **Before executor / tool call** — so the automation never auto-runs ambiguous or high-impact steps.
3. **Before human queue** — only cases that need a person land in the review surface.

## Pairing with Agentic Approval

```text
decide (who) → if system → routeAction (AUTO/ASK/BLOCK) → execute or escalate
```

Decision Systems keeps the **workflow** decision small.
Agentic Approval keeps the **tool/action** permission small.

## What not to put in the core contract

- Confidence scores
- Full evidence payloads
- Recovery plans
- RBAC roles
- Audit event schemas

Add those in the surrounding workflow when the domain requires them.
