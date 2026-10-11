# Decision Systems v0.4

**A tiny decision layer for any workflow.**

> **What happened → What next → Who decides**

**Automate certainty. Route ambiguity.**

## Product upgrades in v0.4 (systemic)

| Change | Why |
|--------|-----|
| Optional `reversible` on `decide()` | Aligns workflow decisions with tool policy (Agentic Approval). Irreversible ⇒ person. |
| `record()` | Packages full `{ happened, next, decider, reason, traits }` for queues / audit. |
| `toActionTraits()` | Bridge into Agentic Approval Lab without ad-hoc mapping. |
| Agentic eval cases | money, privilege, irreversible delete, CRM write — not only FAQ demos. |
| Traits on every result | Downstream systems can re-evaluate without re-asking the model. |

Backward compatible: omitting `reversible` keeps v0.2/v0.3 behavior.

## Core rule

- **System acts** when the next step is clear and a wrong action is low-consequence (and reversible when the flag is supplied).
- **Person decides** when the situation is ambiguous, consequential, or hard to reverse.

## API

```js
const { decide, record, toActionTraits } = require('./decision.js');

decide({ clear: true, consequential: false, reversible: true });
// → { decider: 'system', reason: 'clear_low_consequence', traits: {...} }

record({
  happened: 'Lead validated with consent',
  next: 'Create CRM contact',
  clear: true,
  consequential: false,
  reversible: true
});

// Bridge to tool policy:
const action = toActionTraits(decide(...), { id: 'crm_create', allowed: true });
// → feed into AgenticApproval.routeAction(action)
```

## Pairing with Agentic Approval Lab

```text
decide / record  →  if system  →  toActionTraits  →  routeAction (AUTO|ASK|BLOCK)  →  execute
```

## Executable surface

| File | Purpose |
|------|---------|
| `decision.js` | decide / record / toActionTraits |
| `decision.schema.json` | Contract including optional reason + traits |
| `evals/decision-cases.json` | 12 routing cases (incl. agentic) |
| `examples/universal-cases.json` | Cross-domain illustrations |
| `index.html` | Interactive demo with reversible control |

```bash
npm test
```

## Status boundary

Reference pattern + executable policy. Not production metrics or compliance certification.

---

Built by **Daria Karpova** · Product Systems & AI · 0→1 · [dokarpov](https://github.com/dokarpov)
