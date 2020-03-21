import request from './request';

const SIGNUP_EMAIL_IS_IN_USE = 'SIGNUP_EMAIL_IS_IN_USE';
const SIGNUP_WITH_EMAIL_RESET = 'SIGNUP_WITH_EMAIL_RESET';
const SIGNUP_EMAIL_SENT = 'SIGNUP_EMAIL_SENT';

export const signupWithEmailReset = () => (dispatch) => dispatch({type: SIGNUP_WITH_EMAIL_RESET});

export function signupWithEmail(email) {
  return function (dispatch) {
      // Submit email/password to server
      request
          .post(`/signupWithEmail`, {email})
          .then(res => {
              dispatch({ type: SIGNUP_EMAIL_SENT, payload: res.data.email })
          })
          .catch((err) => {
            if(err.response){
              const message = err.response.data;
              const status = err.response.status;
              switch (status) {
                case 403:
                  dispatch({
                    type: SIGNUP_EMAIL_IS_IN_USE,
                    payload: message
                  })
                  break
                default:
                  break;
              }
            }
          });
  }
}

let INITIAL_STATE = {
  emailStateError: null,
  emailSentTo: null
}

export function signupWithEmailReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SIGNUP_EMAIL_SENT:
      return { ...state, emailSentTo: action.payload }
    case SIGNUP_EMAIL_IS_IN_USE:
      return { ...state, emailStateError: action.payload }
    case SIGNUP_WITH_EMAIL_RESET:
      return INITIAL_STATE
    default:
      return state
  }
}