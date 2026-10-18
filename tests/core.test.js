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

// Exhaustive routing matrix: automate only if ALL three conditions are explicitly safe.
test('all combinations of clarity, consequence, reversibility and unknown are safe', () => {
  for (const clear of [false,true]) {
    for (const consequential of [false,true]) {
      for (const reversible of [false,true,undefined]) {
        const input = {clear,consequential};
        if(reversible!==undefined)input.reversible=reversible;
        const r=decide(input);
        const safe=clear===true && consequential===false && reversible===true;
        assert.equal(r.decider,safe?'system':'person',JSON.stringify(input));
        assert.equal(r.traits.reversible,reversible===undefined?null:reversible);
      }
    }
  }
});

test('unknown reversibility blocks automation and retains explicit uncertainty',()=>{
 const r=decide({clear:true,consequential:false});
 assert.equal(r.decider,'person');
 assert.equal(r.reason,'reversibility_unverified');
 assert.equal(r.traits.reversible,null);
});

test('a missing reversibility signal never silently becomes permission to act',()=>{
 const output=record({happened:'New message received',next:'Send an external response',clear:true,consequential:false});
 assert.equal(output.decider,'person');
 assert.equal(output.reason,'reversibility_unverified');
 const traits=toActionTraits(output);
 assert.equal(traits.reversible,false);
 // This is descriptive input to a policy engine, NOT an execution-authorization grant.
});
