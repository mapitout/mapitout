import request from './request';
import {
    AUTH_USER,
    AUTH_ADMIN
} from '../actions';

const TRY_CONNECT_SERVER = 'TRY_CONNECT_SERVER';
const TRY_CONNECT_SERVER_FAILED = 'TRY_CONNECT_SERVER_FAILED';

export function serverConnect() {
    return function (dispatch) {
        request
            .get(`/api`)
            .then(res => {
                dispatch({
                    type: AUTH_USER,
                    payload: localStorage.getItem('mapitout_auth_jwt_token')
                })
                dispatch({
                    type: AUTH_ADMIN,
                    payload: localStorage.getItem('is_admin') == 'true'
                });
                dispatch({
                    type: TRY_CONNECT_SERVER,
                    payload: 'connected'
                });
            })
            .catch(error => {
                dispatch({
                    type: TRY_CONNECT_SERVER_FAILED,
                    payload: 'not connected'
                });
            });
    }
}

let INITIAL_STATE = {
    connection: false
}

export function serverReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case TRY_CONNECT_SERVER:
            return { ...state,
                connection: action.payload
            }
        case TRY_CONNECT_SERVER_FAILED:
            return { ...state,
                connection: action.payload
            }
        default:
            return state
    }
}