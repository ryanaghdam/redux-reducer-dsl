# redux-reducer-dsl

Define Redux reducers with a doman-specific language.

```javascript
import reducer from 'redux-reducer-dsl';

const counterReducer = reducer(r => {
  r.action('RESET', (state, action) => { value: 0; });
  r.action('INCREMENT', (state, action) => { value: state.value + 1 });
  r.action('DECREMENT', (state, action) => { value: state.value - 1 });
});
```

## Changelog

- v2.0.0: Rewrite with ES6. Support function predicate for action type

- v1.1.0: Adds integration tests.

- v1.0.0: Initial prototype.
