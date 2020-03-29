import request from './request';
// import { UNAUTH_USER } from './auth';
import loader from './loader';
import superagent from 'superagent';

const GET_USER_PROFILE = 'GET_USER_PROFILE';
const UPDATE_USER_PROFILE_GOOD = 'UPDATE_USER_PROFILE_GOOD';
const UPDATE_USER_PROFILE_FAIL = 'UPDATE_USER_PROFILE_FAIL';
const UPDATE_USER_PROFILE_PHOTO_GOOD = 'UPDATE_USER_PROFILE_PHOTO_GOOD';

export function getUserProfile() {
  return function (dispatch) {
    request
      .get(`/api/user/profile`)
      .then(res => {
        dispatch({ type: GET_USER_PROFILE, payload: res.data })
      })
      .catch(error => {
        // dispatch({ type: UNAUTH_USER })
        console.error(error)
      });
  }
}

export function updateUserProfile(profile) {
  return function (dispatch) {
    request
      .post(`/api/user/profile`, profile)
      .then(() => {
        loader.end(300);
        dispatch({
          type: UPDATE_USER_PROFILE_GOOD
        })
        window.location.reload(true);
      })
      .catch(error => {
        loader.end(300);
        if(error.response.data == "Incorrect Password") {
          dispatch({
            type: UPDATE_USER_PROFILE_FAIL,
            payload: "Incorrect Password. Please try it again."
          })
        }
      });
  }
}
export function updateProfileAvatar(avatar) {
  return function (dispatch) {
    const baseURL = process.env.SERVERURI || 'http://localhost:8000'
    superagent
      .post(`${baseURL}/api/user/profile/avatar`)
      .set('Authorization', localStorage.getItem('mapitout_auth_jwt_token') || 'Unauthorized')
      .attach('avatar', avatar)
      .end((err, res) => {
        if (err) return console.log(err);
        dispatch({ type: UPDATE_USER_PROFILE_PHOTO_GOOD })
        window.location.reload(true);
      })
  }
}

let INITIAL_STATE = {
  updateProfileFailMsg: '',
  profile: null
}


export function profileReducer(state=INITIAL_STATE, action) {
  switch (action.type) {
  case GET_USER_PROFILE:
    return { ...state, ...action.payload }
  case UPDATE_USER_PROFILE_GOOD:
    return { ...state, updateProfileFailMsg: '' }
  case UPDATE_USER_PROFILE_FAIL:
    return { ...state, updateProfileFailMsg: 'Incorrect Password' }
  case UPDATE_USER_PROFILE_PHOTO_GOOD:
    return { ...state }
  default:
    return state;
  }
}