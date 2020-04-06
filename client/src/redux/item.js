// import request from './request';

const CHANGE_FOCUSPORT = 'CHANGE_FOCUSPORT';

export function changeFocusport(focusport) {
  return function (dispatch) {
    dispatch({ type: CHANGE_FOCUSPORT, payload: focusport })
  }
}

let INITIAL_STATE = {
  focusport: {
    key: '',
    latitude: 0,
    longitude: 0,
    name: '',
    details: {}
  }
}

export function itemReducer(state=INITIAL_STATE, action) {
  switch (action.type) {
  case CHANGE_FOCUSPORT:
    return { ...state, ...action.payload }
  default:
    return state;
  }
}
