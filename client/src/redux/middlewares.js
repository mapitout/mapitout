'use strict';
import loader from './loader';

function createThunkMiddleware(extraArgument) {
  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        if (typeof action === 'function') {
          loader.show(200+random(200));
          return action(dispatch, getState, extraArgument);
        }
        return next(action);
      };
    };
  };
}

var thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;

function random(n){
  return n/2 + Math.floor(Math.random()*n)
}