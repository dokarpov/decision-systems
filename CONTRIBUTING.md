# Contributing and independent testing

Decision Systems is an experimental routing contract. Counterexamples, unclear handoffs and integration friction are more useful than cosmetic feature requests.

**Try it:** [browser test](https://dokarpov.github.io/decision-systems/) · [developer install guide](docs/EXTERNAL_TESTING.md) · [structured issue](https://github.com/dokarpov/decision-systems/issues/new?template=validation.yml).

For a code contribution: fork this repository, add or modify a **synthetic** example, add a regression test that fails on the current contract, then open a pull request describing the intended behavior. Run `npm test` first.

Do not submit personal data, customer records, production tokens, keys, private code or proprietary workflows. Don't claim deployment, adoption, or compliance certification without evidence.

The core deliberately routes ownership of decisions and does **not** grant authority to execute actions. All real integrations must apply separate authorization and domain-specific controls.
