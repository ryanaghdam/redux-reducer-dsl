export default callback => {
  let registeredActions = {};

  const registerAction = (actionType, handler) => {
    registeredActions[actionType] = handler;
  };

  callback({ action: registerAction });

  return (previousState, action) => {
    const handler = registeredActions[action.type];

    if (typeof handler !== 'function') {
      return (typeof previousState === 'undefined') ? {} : previousState;
    }
    
    return handler(previousState, action);
  };
};
