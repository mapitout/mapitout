import request from './request';
import { AUTH_USER,AUTH_ADMIN } from './auth';
import loader from './loader';

const SIGNIN_USER_NOT_FOUND = 'SIGNIN_USER_NOT_FOUND';
const SIGNIN_PASSWORD_FAIL = 'SIGNIN_PASSWORD_FAIL';
const SIGNIN_NORMAL_ERROR = 'SIGNIN_NORMAL_ERROR';
const SIGNIN_RESET = 'SIGNIN_RESET';

export const signinReset = () => (dispatch) => dispatch({type: SIGNIN_RESET});

export function signUserIn(data) {
  return function (dispatch) {
    request
      .post(`/signin`, data)
      .then(res => {
        loader.end(500);
        dispatch({type: AUTH_USER, payload: res.data});
        dispatch({type: AUTH_ADMIN, payload: res.data.isAdmin})
        window.location = '/#user/settings';
      })
      .catch(err => {
        loader.end(500);
        let message, status;
        if(err.response){
          message = err.response.data;
          status = err.response.status;
        }
        switch (status) {
          case 404:
            dispatch({
              type: SIGNIN_USER_NOT_FOUND,
              payload: message
            })
            break
          case 403:
            dispatch({
              type: SIGNIN_PASSWORD_FAIL,
              payload: message
            })
            break
          case 500:
            if (typeof message == 'string' && message.length < 20) dispatch({
              type: SIGNIN_NORMAL_ERROR,
              payload: message
            })
            break
          default:
            dispatch({
              type: SIGNIN_NORMAL_ERROR,
              payload: 'Server Is Temporarily Down'
            })
            break;
        }
      });
  }
}

let INITIAL_STATE = {
  emailStateError: null,
  passwordError: null,
  normalError: null
}

export function signinReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SIGNIN_USER_NOT_FOUND:
      return { ...state,
        emailStateError: action.payload
      }
    case SIGNIN_PASSWORD_FAIL:
      return { ...state,
        passwordError: action.payload
      }
    case SIGNIN_NORMAL_ERROR:
      return { ...state,
        normalError: action.payload
      }
    case SIGNIN_RESET:
      return INITIAL_STATE
    default:
      return state
  }
}