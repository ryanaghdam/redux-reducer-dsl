export const handlerMatchesAction = action => (handler) => {
  switch (typeof handler.type) {
    case 'string':
      return handler.type === action.type;
    case 'function':
      return handler.type(action.type);
    default:
      return false;
  }
};

export const applyActions = actions => (state, action) =>
  actions.reduce((acc, a) => a.handler(acc, action), state);

export default (callback) => {
  const registeredActions = [];
  let defaultState = {};

  callback({
    action: (type, handler) => registeredActions.push({ type, handler }),
    defaultState: (userSuppliedState) => {
      defaultState = userSuppliedState;
    },
  });

  return (previousState, action) => {
    const state = (typeof previousState === 'undefined') ? defaultState : previousState;

    const matchedHandlers = registeredActions.filter(handlerMatchesAction(action));
    return (matchedHandlers.length > 0)
      ? applyActions(matchedHandlers)(state, action)
      : state;
  };
};
