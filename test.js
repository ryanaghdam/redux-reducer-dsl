'use strict';

var test = require('tape');
var reducer = require('.');

function onReset(state, action) {
  return { value: 0 };
}

function onIncrement(state, action) {
  return { value: state.value + action.amount || 1 };
};

function onDecrement(state, action) {
  return { value: state.value - action.amount || 1 };
}

test('integration tests', function (t) {
  var counterReducer = reducer(function (r) {
    r.action('RESET', onReset);
    r.action('INCREMENT', onIncrement);
    r.action('DECREMENT', onDecrement);
  });

  t.deepEqual(
    counterReducer({}, { type: 'INCREMENT' }),
    { value: 1 }
  );

  t.deepEqual(
    counterReducer({ value: 1 }, { type: 'INCREMENT', amount: 2 }),
    { value: 3 }
  );

  t.deepEqual(
    counterReducer({ value: 2 }, { type: 'DECREMENT' }),
    { value: 1 }
  );

  t.deepEqual(
    counterReducer({ value: 20 }, { type: 'DECREMENT', amount: 17 }),
    { value: 3 }
  );

  t.deepEqual(
    counterReducer({}, { type: 'RESET' }),
    { value: 0 }
  );

  t.end();
});
