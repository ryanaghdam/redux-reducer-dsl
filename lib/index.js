'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (callback) {
  var registeredActions = {};

  var registerAction = function registerAction(actionType, handler) {
    registeredActions[actionType] = handler;
  };

  callback({ action: registerAction });

  return function (previousState, action) {
    var handler = registeredActions[action.type];

    if (typeof handler !== 'function') {
      return typeof previousState === 'undefined' ? {} : previousState;
    }

    return handler(previousState, action);
  };
};