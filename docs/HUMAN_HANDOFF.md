# Human handoff

Human review is a **routing outcome**, not a separate product by default.

When `decider === 'person'`:

1. Preserve the original signal and the candidate next step.
2. Preserve why the system did not act (ambiguity, consequence, or both).
3. Give the person enough context to decide without reconstructing the case.
4. Record the human decision as an audit event in the surrounding system.

## Good handoff

- Clear statement of what happened
- Clear candidate next action
- Explicit reason the system deferred
- Links / IDs to the underlying records
- One primary action the person can take (approve / reject / choose alternative)

## Bad handoff

- Dumping raw agent traces
- Forcing the person to re-derive the next step
- Mixing multiple unrelated cases in one review item
- Auto-expiring the case with no decision

## Relation to approval fatigue

If almost every case routes to a person, the decision boundary is too conservative or the upstream signals are too noisy. Tighten clarity where possible; keep consequence and irreversibility strict.
