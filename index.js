'use strict';

function createReducer(callback) {
  var registeredActions = {};

  function registerAction(actionType, handler) {
    registeredActions[actionType] = handler;
  };

  callback({ action: registerAction });

  return function (previousState, action) {
    var handler = registeredActions[action.type];

    if (typeof handler !== 'function') {
      if (typeof previousState === 'undefined') {
        return {};
      } else {
        return previousState;
      }
    }

    return handler(previousState, action);
  }
}

module.exports = createReducer;
