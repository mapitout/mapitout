import qs from 'qs';
import request from './request';

const CHANGE_FOCUSPORT = 'CHANGE_FOCUSPORT';

export function changeFocusport(focusport) {
  return function (dispatch) {
    // use lon+lat to query from db
    const query = qs.stringify({
      lon: focusport.longitude,
      lat: focusport.latitude
    })
    request.get(`/publicApi/item?${query}`)
      .then(d=>{
        // if it's found, use the response as focusport
        const item = d.data.findItem[0];
        const payload = {
          input: item.title,
          _id: item._id,
          longitude: item.location.coordinates[0],
          latitude: item.location.coordinates[1],
          details: { ...item }
        };
        console.log('200 focusport', payload)
        dispatch({ type: CHANGE_FOCUSPORT, payload })
      })
      .catch((e)=>{
        if(e.response.status===404){
          // if it's 404 not found, use input as item.details.address
          console.log('404 focusport', focusport);
          const payload = {
            details: focusport.details,
            longitude: focusport.longitude,
            latitude: focusport.latitude,
            input: focusport.input
          };
          payload.details.address = focusport.input;
          payload.details.location.coordinates[0] = focusport.longitude;
          payload.details.location.coordinates[1] = focusport.latitude;
          dispatch({ type: CHANGE_FOCUSPORT, payload })
        }
      })
  }
}

export function createItem(details) {
  return function (dispatch) {
    details.category = details.category.map(c=>c.value);
    const body = { details };
    request.post('/publicApi/item/create', body)
      .then((r) => {
        const payload = {
          longitude: r.data.createdItem.details.location.coordinates.longitude,
          latitude: r.data.createdItem.details.location.coordinates.latitude,
          input: r.data.createdItem.details.title,
          details: r.data.createdItem.details
        }
        dispatch({ type: CHANGE_FOCUSPORT, payload })
      })
      .catch(e=>console.error(e))
  }
}

// example:
// coordinates: [-122.23432, 37.5435] -> [long, lat]
const INITIAL_ITEM_STATE = {
  title: '',
  address: '',
  location: {
    type: 'Point',
    coordinates: [0,0]
  },
  category: [],
  menu: '',
  order: []
}

let INITIAL_STATE = {
  focusport: {
    latitude: 0,
    longitude: 0,
    input: '',
    details: {
      ...INITIAL_ITEM_STATE
    }
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
