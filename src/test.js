import test from 'tape';
import reducer from './index.js';

const onReset = (state, action) => ({ value: 0 });

const onIncrement = (state, action) =>
  ({ value: state.value + action.amount || 1 });

const onDecrement = (state, action) =>
  ({ value: state.value - action.amount || 1 });

test('initialization', t => {
  const counterReducer = reducer(r => {
    r.action('RESET', onReset);
    r.action('INCREMENT', onIncrement);
    r.action('DECREMENT', onDecrement);
  });

  t.deepEqual(
    counterReducer({ a: 1 }, { type: '@@redux/INIT' }),
    { a: 1 }
  );

  t.deepEqual(
    counterReducer(undefined, { type: '@@redux/INIT' }),
    {}
  );

  t.end();
});

test('integration tests', t => {
  const counterReducer = reducer(r => {
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

