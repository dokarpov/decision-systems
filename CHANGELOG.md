# Changelog

## v0.6.0 — 2026-10-18 (release candidate)

### Safety
- Missing `reversible` now routes to `person` with reason `reversibility_unverified`. **Behavior change:** the v0.5 default might have routed clear/low-consequence actions to the system without an explicit rollback signal.
- Expanded eval cases and added exhaustive routing matrix.

### Independent test readiness
- A clean temporary consumer project installs and exercises the package produced by `npm pack`.
- Interactive synthetic scenarios with immediate decision feedback, inspectable JSON, explicit uncertainty and no real action execution.
- Browser checks include first-viewport feedback visibility on mobile.
- External study protocol, counterexample issue template and minimal integration script.

### Evidence boundary
- No npm registry publication, third-party adoption, external user test or verified production outcomes are claimed.
- A public GitHub Pages site still requires activation before anyone can use the browser demo by URL.

## v0.5.0 — 2026-10-11

### Reliability
- Added contract-level tests for routing, validation, recording and action-policy bridging
- Kept scenario evals as a separate evidence layer
- CI continues to exercise the browser demo across four viewport sizes

### Documentation
- Removed stale Agentic Approval naming and aligned integration docs with Policy Kit
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
- README rewritten around systemic upgrades and Policy Kit pairing narrative
