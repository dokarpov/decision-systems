# Recovery

Recovery is deliberately **outside** the minimal decision contract.

If a system action can fail or create downstream cost:

1. Define the recovery path next to the integration that executes the action.
2. Prefer compensating actions that are themselves clear and low-consequence.
3. Escalate to a person when recovery is ambiguous or high-impact.

## Examples

| Action | Failure mode | Recovery ownership |
|--------|--------------|--------------------|
| Create internal task | Task system unavailable | Retry with backoff; alert ops if persistent |
| Send external email | Bounce / provider error | Do not auto-retry without policy; surface to person if customer-facing |
| Write CRM record | Partial write / conflict | Idempotent retry or human reconcile |

Decision Systems only answers **who should decide the next step**.
How to recover from a failed system action is a property of the executor and the domain.
