# Decision Systems

**A tiny decision layer for any workflow.**

> **What happened → What next → Who decides**

Most teams do not need another dashboard.  
They need a simple way to turn signals into the next clear action.

Decision Systems is a lightweight pattern for product, operations and AI workflows.

## The whole model

Every event only needs three answers:

1. **What happened?**
2. **What should happen next?**
3. **Who decides — the system or a person?**

That is the core.

Everything else — evidence, confidence, deadlines, permissions, recovery — is optional metadata added only when the workflow needs it.

## Universal rule

**System acts** when the next step is clear and low-risk.

**Person decides** when the situation is ambiguous, consequential or irreversible.

No scoring model is required.

## Examples

| Situation | What happened | What next | Who decides |
|---|---|---|---|
| Support | Customer asks a known FAQ | Send known answer | System |
| Billing | Refund exception | Review account context | Person |
| Sales | Company matches target profile | Draft outreach | System |
| CRM | Two records may be the same person | Resolve identity | Person |
| AI agent | Draft is ready | Save draft | System |
| AI agent | Message is ready to send externally | Approve send | Person |

## Try it

Open `index.html`.

Describe an event, choose whether the next step is clear and whether the action has meaningful consequences.

The demo returns only one of two decisions:

- **DO IT**
- **ASK A PERSON**

## Why this is useful

The pattern is deliberately small enough to use in:

- product workflows
- support
- sales
- internal tools
- onboarding
- finance operations
- AI agents
- approvals
- back-office work
- automation

The point is not to model the whole organisation.

The point is to make the **next decision explicit**.

## Design principle

> **Automate certainty. Route ambiguity.**

Built by **Daria Karpova**  
Product Systems & AI · 0→1 · Fractional Product Lead
