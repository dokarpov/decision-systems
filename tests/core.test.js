const test = require('node:test');
const assert = require('node:assert/strict');
const { decide, record, toActionTraits } = require('../decision.js');

test('clear, low-consequence, reversible work may stay with the system', () => {
  assert.deepEqual(
    decide({ clear: true, consequential: false, reversible: true }),
    {
      decider: 'system',
      reason: 'clear_low_consequence',
      traits: { clear: true, consequential: false, reversible: true }
    }
  );
});

test('ambiguity routes to a person', () => {
  assert.equal(
    decide({ clear: false, consequential: false, reversible: true }).decider,
    'person'
  );
});

test('consequence routes to a person even when the next step is clear', () => {
  assert.equal(
    decide({ clear: true, consequential: true, reversible: true }).reason,
    'consequential'
  );
});

test('irreversibility overrides otherwise automatable work', () => {
  assert.equal(
    decide({ clear: true, consequential: false, reversible: false }).reason,
    'hard_to_reverse'
  );
});

test('missing reversibility stays explicit instead of being guessed', () => {
  assert.equal(
    decide({ clear: true, consequential: false }).traits.reversible,
    null
  );
});

test('invalid decision inputs fail closed', () => {
  assert.throws(() => decide(), TypeError);
  assert.throws(() => decide({ clear: 'yes', consequential: false }), TypeError);
  assert.throws(() => decide({ clear: true, consequential: false, reversible: 'yes' }), TypeError);
});

test('record trims evidence and preserves the routing reason', () => {
  assert.deepEqual(
    record({
      happened: '  Lead validated with consent  ',
      next: '  Create CRM contact  ',
      clear: true,
      consequential: false,
      reversible: true
    }),
    {
      happened: 'Lead validated with consent',
      next: 'Create CRM contact',
      decider: 'system',
      reason: 'clear_low_consequence',
      traits: { clear: true, consequential: false, reversible: true }
    }
  );
});

test('action-policy bridge preserves decision traits and defaults safely', () => {
  const decision = decide({ clear: false, consequential: true, reversible: false });
  assert.deepEqual(
    toActionTraits(decision),
    {
      id: 'workflow_step',
      label: undefined,
      kind: 'workflow',
      allowed: true,
      clear: false,
      consequential: true,
      reversible: false
    }
  );
});
