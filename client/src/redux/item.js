// import request from './request';

const CHANGE_FOCUSPORT = 'CHANGE_FOCUSPORT';

export function changeFocusport(focusport) {
  return function (dispatch) {
    dispatch({ type: CHANGE_FOCUSPORT, payload: focusport })
  }
}

let INITIAL_STATE = {
  focusport: {
    latitude: 0,
    longitude: 0,
    name: '',
    details: {}
  }
}

export function itemReducer(state=INITIAL_STATE, action) {
  switch (action.type) {
  case CHANGE_FOCUSPORT:
    return { ...state, focusport: action.payload }
  default:
    return state;
  }
}

// const example_d = {
//   details: {
//     title: 'Taiwan Porridge Kingdom',
//     address: '20956 Homestead Rd, Cupertino, CA 95014',
//     location: {
//       coordinates: ['longitude', 'latitude']
//     },
//     category: ['ObjectId'],
//     open_hour: {
//       'mon': [{
//         startAt: 9.0,
//         endAt: 12.0
//       }],
//       'tue': [{
//         openAt: 0.0,
//         closeAt: 0.0
//       }],
//       'wed': [{
//         openAt: 9.0,
//         closeAt: 10.0
//       }]
//     },
//     menu: 'https://s3-media0.fl.yelpcdn.com/bphoto/UgtxQQlDJ9n5k8G8Y8pceQ/o.jpg',
//     order: [{
//       type: 'phone',
//       notes: 'Pick up on your own(cash only). Make a phone call and order 30 mins before picking up.',
//       action: '4082532569',
//     }, {
//       type: 'grubhub',
//       notes: 'Deliver by grubhub.',
//       action: 'https://www.grubhub.com/restaurant/taiwan-porridge-kingdom-20956-homestead-road-cupertino/1827642',
//     }, {
//       type: 'doordash',
//       notes: 'Deliver by doordash.',
//       action: 'https://www.doordash.com/store/taiwan-restaurant-san-jose-195/en-US',
//     }]
//   }
// }
