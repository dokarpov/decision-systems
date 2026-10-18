(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.DecisionSystems = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  function decide(input) {
    if (!input || typeof input !== 'object') throw new TypeError('decide input is required');
    const { clear, consequential, reversible } = input;
    if (typeof clear !== 'boolean' || typeof consequential !== 'boolean') throw new TypeError('clear and consequential must be booleans');
    if (reversible !== undefined && typeof reversible !== 'boolean') throw new TypeError('reversible must be a boolean when provided');
    const traits = { clear, consequential, reversible: reversible === undefined ? null : reversible };
    if (reversible === false) return { decider: 'person', reason: 'hard_to_reverse', traits };
    // Unknown reversibility is not proof of reversibility. Never infer permission to automate.
    if (reversible === undefined) return { decider: 'person', reason: 'reversibility_unverified', traits };
    if (clear && !consequential) return { decider: 'system', reason: 'clear_low_consequence', traits };
    if (!clear && consequential) return { decider: 'person', reason: 'ambiguous_and_consequential', traits };
    if (!clear) return { decider: 'person', reason: 'ambiguous', traits };
    return { decider: 'person', reason: 'consequential', traits };
  }

  function record({ happened, next, clear, consequential, reversible }) {
    if (typeof happened !== 'string' || !happened.trim()) throw new TypeError('happened must be a non-empty string');
    if (typeof next !== 'string' || !next.trim()) throw new TypeError('next must be a non-empty string');
    const result = decide({ clear, consequential, reversible });
    return { happened: happened.trim(), next: next.trim(), decider: result.decider, reason: result.reason, traits: result.traits };
  }

  function toActionTraits(decisionResult, { id, allowed = false, label, kind } = {}) {
    if (!decisionResult || typeof decisionResult !== 'object' || !decisionResult.traits || !['system', 'person'].includes(decisionResult.decider)) {
      throw new TypeError('decisionResult with valid decider and traits is required');
    }
    const t = decisionResult.traits;
    if (typeof t.clear !== 'boolean' || typeof t.consequential !== 'boolean' || !(t.reversible === null || typeof t.reversible === 'boolean')) {
      throw new TypeError('decision traits must preserve explicit boolean or unknown signals');
    }
    const recalculated = decide({ clear: t.clear, consequential: t.consequential, ...(t.reversible === null ? {} : {reversible: t.reversible}) });
    if (recalculated.decider !== decisionResult.decider) {
      throw new TypeError('decisionResult conflicts with its supplied traits');
    }
    return {
      id: id || 'workflow_step',
      label: label || undefined,
      kind: kind || 'workflow',
      // A route is never an execution grant. Downstream permission must be explicit.
      allowed: allowed === true && decisionResult.decider === 'system',
      clear: t.clear === true,
      consequential: t.consequential === true,
      reversible: t.reversible === true
    };
  }

  return { decide, record, toActionTraits };
});
