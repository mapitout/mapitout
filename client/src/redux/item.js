import qs from 'qs';
import request from './request';
import superagent from 'superagent';

const UPDATE_FOCUSPORT = 'UPDATE_FOCUSPORT';
const UPLOAD_IMAGES_TO_ITEM_DONE = 'UPLOAD_IMAGES_TO_ITEM_DONE';
const UPLOAD_IMAGES_TO_ITEM_STATUS = 'UPLOAD_IMAGES_TO_ITEM_STATUS';
const NOT_FOUND_404_FOCUSPORT = 'NOT_FOUND_404_FOCUSPORT';
const RESET_FOCUSPORT = 'RESET_FOCUSPORT';
const baseURL = process.env.SERVERURI || 'http://localhost:8000';

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
        if(!item) return;
        item.images = item.images.sort((a, b)=>b.lastUpdatedAt-a.lastUpdatedAt)
        const payload = {
          input: item.title,
          _id: item._id,
          longitude: item.location.coordinates[0],
          latitude: item.location.coordinates[1],
          details: { ...item }
        };
        console.log('200 focusport', payload)
        dispatch({ type: UPDATE_FOCUSPORT, payload })
      })
      .catch((e)=>{
        if(e.response && e.response.status===404){
          // if it's 404 not found, use input as item.details.address
          const payload = {
            input: focusport.input,
            longitude: focusport.longitude,
            latitude: focusport.latitude,
            details: {
              ...INITIAL_ITEM_STATE
            },
          };
          payload.details.address = focusport.input;
          payload.details.location.coordinates[0] = focusport.longitude;
          payload.details.location.coordinates[1] = focusport.latitude;
          dispatch({ type: NOT_FOUND_404_FOCUSPORT, payload })
        }else{
          console.error(e);
        }
      })
  }
}

function buildFocusport(item) {
  return {
    longitude: item.location.coordinates[0],
    latitude: item.location.coordinates[1],
    input: item.title,
    _id: item._id,
    details: { ...item }
  }
}

export function createItem(details) {
  return function (dispatch) {
    details.category = details.category.map(c=>c.value);
    const body = { details };
    request.post('/publicApi/item/create', body)
      .then((r) => {
        const item = r.data.createdItem;
        const payload = buildFocusport(item);
        dispatch({ type: UPDATE_FOCUSPORT, payload })
        window.location.reload(true);
      })
      .catch(e=>console.error(e))
  }
}

export function editItem(item_id, details) {
  return function (dispatch) {
    details.category = details.category.map(c=>c.value);
    const body = { details };
    request.put(`/publicApi/item/edit/${item_id}`, body)
      .then((r) => {
        const item = r.data.editItem;
        const payload = buildFocusport(item);
        dispatch({ type: UPDATE_FOCUSPORT, payload })
      })
      .catch(e=>console.error(e))
  }
}

export function uploadImagesStatusReset() {
  return function (dispatch) {
    dispatch({ type: UPLOAD_IMAGES_TO_ITEM_STATUS, payload: '' })
  }
}

export function uploadImagesToItem(file, itemId, group) {
  const body = {
    itemId,
    group,
    lastUpdatedAt: Date.now()
  }
  return function (dispatch) {
    const imageToUpload = file[0]
    dispatch({ type: UPLOAD_IMAGES_TO_ITEM_STATUS, payload: file[0].preview })
    superagent
      .post(`${baseURL}/publicApi/item/image?${qs.stringify(body)}`)
      .attach('mapitout_item_image', imageToUpload)
      .end((err, res) => {
        if (err) return console.log(err);
        const image = res.body;
        dispatch({ type: UPLOAD_IMAGES_TO_ITEM_STATUS, payload: 'done' })
        dispatch({ type: UPLOAD_IMAGES_TO_ITEM_DONE, payload: image })
      })
  }
}
export function resetFocusport() {
  return function (dispatch) {
    dispatch({ type: RESET_FOCUSPORT })
  }
}
const initDayOpenHour = {
  from: 0,
  to: 0
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
  order: {
    phone: '',
    doordash: '',
    postmates: '',
    grubhub: '',
    ubereats: '',
    yelp: '',
    others: '',
  },
  open_hour: {
    monday: [{...initDayOpenHour}],
    tuesday: [{...initDayOpenHour}],
    wednesday: [{...initDayOpenHour}],
    thursday: [{...initDayOpenHour}],
    friday: [{...initDayOpenHour}],
    saturday: [{...initDayOpenHour}],
    sunday: [{...initDayOpenHour}],
  },
  images: [],
}

let INITIAL_STATE = {
  focusport: {
    latitude: 0,
    longitude: 0,
    input: '',
    details: {
      ...INITIAL_ITEM_STATE
    }
  },
  imageUploadingStatus: '' // 0 reset, 1 start uploading, 100 done
}

export function itemReducer(state=INITIAL_STATE, action) {
  switch (action.type) {
  case RESET_FOCUSPORT:
    return { ...INITIAL_STATE }
  case UPDATE_FOCUSPORT:
    return { ...state, focusport: action.payload }
  case NOT_FOUND_404_FOCUSPORT:
    return { focusport: action.payload }
  case UPLOAD_IMAGES_TO_ITEM_STATUS:
    return { ...state, imageUploadingStatus: action.payload }
  case UPLOAD_IMAGES_TO_ITEM_DONE:
    return { ...state,
      focusport: {
        ...state.focusport,
        details: {
          ...state.focusport.details,
          images: [action.payload, ...state.focusport.details.images]
        }
      }
    }
  default:
    return state;
  }
}
