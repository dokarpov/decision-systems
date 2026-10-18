# Decision Systems — first external validation

**Status:** prepared test protocol, not a completed user study. No independent installations or user interviews have been recorded yet.

## What are we testing?

For a developer or workflow owner: *can a tiny deterministic decision boundary be understood, integrated into a real application, and trusted to avoid unsafe automatic routing?* This is not a test of whether an LLM reasons correctly or whether a decision should actually execute.

### Test A: browser, 5–7 minutes

1. Open the [public demo](https://dokarpov.github.io/decision-systems/) **only if it is reachable**. If it is not, use a local web server: `python3 -m http.server 4173`, then open `http://localhost:4173`.
2. **Without reading the implementation**, choose the customer identity scenario. Explain in your own words who decides and why.
3. Set up a clear, low-impact action but leave reversibility *not verified*. Predict the outcome, then observe it.
4. Inspect the output contract. Say what information is missing to make this decision useful in your work.
5. Use a fictionalized case of your own. Don't share PII, customer records, private prompts or credentials.

Observe: time to correctly identify the route; number of false interpretations of `system decides` as `action executed`; ability to notice unknown reversibility; whether a real workflow comes to mind; where human handoff breaks.

### Test B: independent developer integration, 10–15 minutes

Prerequisite: Node 20+ and npm. Install or publish nothing globally.

```bash
mkdir -p decision-test && cd decision-test
npm init -y
npm install github:dokarpov/decision-systems
node -e "const {decide}=require('decision-systems'); console.log(decide({clear:true,consequential:false,reversible:true}))"
```

The automated `consumer.test.js` verifies a local npm tarball installation inside a clean temporary directory. GitHub-source installation in an unrelated user environment is still a separate external test. A green CI run proves *technical installability in its test environment*, **not** adoption or ease of use by an independent person.

Try three cases: an internal draft (system route), an ambiguous customer identity (person), and a case whose reversal path is unverified (person). Pair the route with your own executor permission policy before doing anything irreversible.

### Sample and decision thresholds

Recruit **5 developers/automation owners** unfamiliar with the repo and **3 operations/product owners** who can interpret routing consequences. Separate usability findings from integration failures. The numbers are *pilot targets*, not a statistically representative sample. Record the repository commit SHA used in each external trial. Confirm the public demo URL works before directing browser-only testers there.

- **Safety gate:** 0 externally observed cases where an irreversible, high-consequence, ambiguous or unverified action is presented as eligible for automatic routing.
- **Comprehension hypothesis:** at least 6/8 participants can explain the outcome and reason without facilitator hints within 2 minutes. The criterion is provisional; record every failure case.
- **Developer friction:** at least 4/5 developers complete `npm pack` + installation and one custom scenario in 15 minutes unaided.
- **Utility:** at least **2 genuinely independent developers** integrate this decision boundary into a separate toy or real workflow and confirm they would use it again. A collaborator copying our fixture does not count.
- **Discard/pivot signal:** reviewers consistently cannot assign `clear / consequential / reversible` without adding further evidence or controls. If so, test a richer input/evidence layer rather than adding more abstract checks.

No external participant or conversion data are claimed until evidence is collected.

### Minimal anonymized observation log

| Case ID | Persona | Case | Expected route before seeing result | Actual route | Was it clear? | Setup minutes | Missing field / concern | Would reuse? |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Example only | Developer | Synthetic support draft | System | System | Not measured | Not measured | Not measured | Not measured |

Do not publish participant names, email addresses, credentials, sensitive files or company-specific operational context. Store consent and any raw private research outside this public repo.

### Report an issue or a useful result

Use the [structured validation issue](https://github.com/dokarpov/decision-systems/issues/new?template=validation.yml), or a PR with a *synthetic* regression case and an expected result. Publish only anonymized, permission-safe material. Record disagreements and counterexamples; do not quietly mark every pilot as a success.
