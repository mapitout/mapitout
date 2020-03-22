export const AUTH_USER = 'AUTH_USER';
export const UNAUTH_USER = 'UNAUTH_USER';
export const PROMPT_TO_SIGNIN = 'PROMPT_TO_SIGNIN';
export const AUTH_ADMIN = 'AUTH_ADMIN';

export const signUserOut = () => (dispatch) => dispatch({type: UNAUTH_USER});

let INITIAL_STATE = {
    authenticated: false,
    isAdmin: false
}

export function authReducer(state=INITIAL_STATE, action) {
    switch (action.type) {
        case AUTH_USER:
            if(action.payload.token){
                localStorage.setItem('mapitout_auth_jwt_token', action.payload.token);
            }
            return { ...state,
                authenticated: true
            }
        case AUTH_ADMIN:
            localStorage.setItem('is_admin', action.payload);
            return { ...state,
                authenticated: true,
                isAdmin: action.payload
            }
        case UNAUTH_USER:
            localStorage.removeItem('mapitout_auth_jwt_token');
            localStorage.removeItem('is_admin');
            return { ...state,
                authenticated: false,
                isAdmin: false
            }
        case PROMPT_TO_SIGNIN:
            window.location = '/#signin';
            return state;
        default:
            return state;
    }
}