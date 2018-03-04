'use strict';

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _index = require('./index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onReset = function onReset(state, action) {
  return { value: 0 };
};

var onIncrement = function onIncrement(state, action) {
  return { value: state.value + action.amount || 1 };
};

var onDecrement = function onDecrement(state, action) {
  return { value: state.value - action.amount || 1 };
};

(0, _tape2.default)('initialization', function (t) {
  var counterReducer = (0, _index2.default)(function (r) {
    r.action('RESET', onReset);
    r.action('INCREMENT', onIncrement);
    r.action('DECREMENT', onDecrement);
  });

  t.deepEqual(counterReducer({ a: 1 }, { type: '@@redux/INIT' }), { a: 1 });

  t.deepEqual(counterReducer(undefined, { type: '@@redux/INIT' }), {});

  t.end();
});

(0, _tape2.default)('integration tests', function (t) {
  var counterReducer = (0, _index2.default)(function (r) {
    r.action('RESET', onReset);
    r.action('INCREMENT', onIncrement);
    r.action('DECREMENT', onDecrement);
  });

  t.deepEqual(counterReducer({}, { type: 'INCREMENT' }), { value: 1 });

  t.deepEqual(counterReducer({ value: 1 }, { type: 'INCREMENT', amount: 2 }), { value: 3 });

  t.deepEqual(counterReducer({ value: 2 }, { type: 'DECREMENT' }), { value: 1 });

  t.deepEqual(counterReducer({ value: 20 }, { type: 'DECREMENT', amount: 17 }), { value: 3 });

  t.deepEqual(counterReducer({}, { type: 'RESET' }), { value: 0 });

  t.end();
});