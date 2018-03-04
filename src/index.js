export const handlerMatchesAction = action => handler =>
  handler.type === action.type;

export const applyActions = actions => (state, action) =>
  actions.reduce((acc, a) => a.handler(acc, action), state);

export default callback => {
  let registeredActions = [];
  let defaultState = {};

  callback({
    action: (type, handler) => registeredActions.push({ type, handler }),
    defaultState: s => defaultState = s
  });

  return (previousState, action) => {
    const state = (typeof previousState === 'undefined') ? defaultState : previousState;

    const matchedHandlers = registeredActions.filter(handlerMatchesAction(action));
    return (matchedHandlers.length > 0)
      ? applyActions(matchedHandlers)(state, action)
      : state;
  };
};
