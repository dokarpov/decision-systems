# Quality and evals

This repository evaluates **routing behavior**, not model intelligence.

## Quality questions (v0.4)

- Does a clear, low-consequence action route to the system?
- Does ambiguity route to a person?
- Does meaningful consequence route to a person even when the action is clear?
- Does a supplied irreversible flag force human review?
- Does every case produce an explicit decision with no silent fall-through?

The eval set is intentionally small. Add cases when a real workflow reveals a new failure mode.

## Safety invariants

| Input | Expected decider |
|-------|------------------|
| clear + !consequential + reversible | system |
| !clear | person |
| consequential | person |
| reversible = false | person |

## What this does not measure

- production accuracy
- financial impact
- latency
- model quality
- real user outcomes
- compliance certification

Those require workflow-specific evidence and organizational controls.
