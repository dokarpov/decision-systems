// Run with `node examples/consumer.js` from a local clone.
// In an external app, replace require('../decision.js') with require('decision-systems')
// after installing the repository's npm tarball.
'use strict';
const { record } = require('../decision.js');

const event = {
  happened: 'Help desk confirmed the request matches a known answer',
  next: 'Save an internal draft reply',
  clear: true,
  consequential: false,
  reversible: true
};

const decision = record(event);
if (decision.decider === 'system') {
  // This is a safe routing signal, not permission to perform the action.
  // Always run a separate action policy and check access rights.
  console.log('NEXT: send to policy/executor boundary', JSON.stringify(decision));
} else {
  // A reviewer sees the original signal, candidate action, and routing reason.
  console.log('NEXT: queue human review', JSON.stringify(decision));
}
