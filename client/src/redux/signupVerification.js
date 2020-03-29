import request from './request';

import {AUTH_USER, AUTH_ADMIN} from './auth';
const CHECK_EMAIL_TOKEN_GOOD = 'CHECK_EMAIL_TOKEN_GOOD';
const CHECK_EMAIL_TOKEN_BAD = 'CHECK_EMAIL_TOKEN_BAD';
const SIGNUP_EMAIL_BAD = 'SIGNUP_EMAIL_BAD';
const SIGNUP_EMAIL_GOOD = 'SIGNUP_EMAIL_GOOD';
const SIGNUP_EMAIL_RESET = 'SIGNUP_EMAIL_RESET';

export const signupEmailReset = () => (dispatch) => dispatch({type: SIGNUP_EMAIL_RESET});

export function signUserUp(token, user) {
  return function (dispatch) {
    // Submit email/password to server
    request
      .post(`/signup/${token}`, user)
      .then(res => {
        dispatch({type: AUTH_USER, payload: res.data});
        dispatch({type: AUTH_ADMIN, payload: res.data.isAdmin})
        if(res.data.status) dispatch({ type: SIGNUP_EMAIL_GOOD })
      })
      .catch(err => {
        dispatch({type: SIGNUP_EMAIL_BAD, payload: err})
      });
  }
}


export function verifyEmailToken(token, address) {
  return function (dispatch) {
    // Submit email/password to server
    request
      .post(`/verifyEmailToken`, {token})
      .then(res => {
        if(res.data == address) {
          dispatch({type: CHECK_EMAIL_TOKEN_GOOD})
        }else{
          dispatch({type: CHECK_EMAIL_TOKEN_BAD})
        }
      })
      .catch(error => {
        console.log(error.response.data)
        dispatch({type: CHECK_EMAIL_TOKEN_BAD})
      });
  }
}

let INITIAL_STATE = {
  emailTokenGood: true,
  authUserError: null
}

export function signupVerificationReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case CHECK_EMAIL_TOKEN_GOOD:
    return { ...state, emailTokenGood: true }
  case CHECK_EMAIL_TOKEN_BAD:
    return { ...state, emailTokenGood: false }
  case SIGNUP_EMAIL_BAD:
    return { ...state, authUserError: action.payload }
  case SIGNUP_EMAIL_GOOD:
    window.location = '/';
    break;
  case SIGNUP_EMAIL_RESET:
    return INITIAL_STATE;
  default:
    return state
  }
}