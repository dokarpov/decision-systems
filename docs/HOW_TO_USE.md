# How to use Decision Systems

Use the pattern whenever a workflow produces signals but people still need to decide what happens next.

## 1. Pick one recurring event

Example:
> A payment failed.

## 2. Write the expected next step

Example:
> Retry automatically once.

## 3. Decide who owns the decision

Use only this rule:

- **System** — next step is clear and a wrong action is easy to undo.
- **Person** — next step is unclear, consequential or hard to reverse.

That is enough for the first version.

## Optional metadata

Only add these when they solve a real problem:

- `why`
- `source`
- `deadline`
- `evidence`
- `confidence`
- `permissions`
- `recovery`

Do not require them by default.
