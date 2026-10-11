# Changelog

## v0.5.0 — 2026-10-11

### Reliability
- Added contract-level tests for routing, validation, recording and action-policy bridging
- Kept scenario evals as a separate evidence layer
- CI continues to exercise the browser demo across four viewport sizes

### Documentation
- Removed the stale Agentic Approval naming and aligned integration docs with Policy Kit
- Tightened claims around what is tested versus what has not been proven in production
- Clarified that system ownership of a decision is separate from permission to execute the resulting action

## v0.4.0 — 2026-10-09

### Product / system
- Optional `reversible` dimension on `decide()` (non-breaking)
- `record()` for full happened/next/decider payloads
- `toActionTraits()` bridge to downstream action policy
- Traits object on every decision result
- Agentic eval cases: money, privilege, irreversible, CRM
- Demo UI includes reversible control

### Docs
- README rewritten around systemic upgrades and Policy Kit pairing

## v0.3.0
- Packaging, market positioning and decision/action-policy pairing narrative

## v0.2.0
- Initial public reference
