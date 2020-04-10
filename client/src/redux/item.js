import qs from 'qs';
import request from './request';
import superagent from 'superagent';

const UPDATE_FOCUSPORT = 'UPDATE_FOCUSPORT';
const UPLOAD_IMAGES_TO_ITEM = 'UPLOAD_IMAGES_TO_ITEM';
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
          dispatch({ type: UPDATE_FOCUSPORT, payload })
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

export function uploadImagesToItem(itemId, group, files) {
  const body = {
    itemId,
    group,
    lastUpdatedAt: Date.now()
  }
  console.log('body', {...body, files});
  return function (dispatch) {
    superagent
      .post(`${baseURL}/publicApi/item/image`)
      .attach('mapitout_item_images', files[0])
      .send({
        ...body
      })
      .end((err, res) => {
        if (err) return console.log(err);
        const images = res.body.images;
        console.log(images)
        // dispatch({ type: UPLOAD_IMAGES_TO_ITEM, payload: images })
      })
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
  images: [{
    group: 'menu',
    src: 'https://i.imgur.com/TtWH0Ij.png',
    lastUpdatedAt: 1586472072895
  },
  {
    group: 'menu',
    src: 'https://i.imgur.com/TtWH0Ij.png',
    lastUpdatedAt: 1586472073895
  },
  {
    group: 'food',
    src: 'https://i.imgur.com/sxP36mb.jpg',
    lastUpdatedAt: 1586472052895
  },
  {
    group: 'menu',
    src: 'https://i.imgur.com/TtWH0Ij.png',
    lastUpdatedAt: 1586472032895
  },
  {
    group: 'food',
    src: 'https://i.imgur.com/toS1LUm.jpg',
    lastUpdatedAt: 1586472012895
  },
  {
    group: 'food',
    src: 'https://i.imgur.com/xA2SP0c.jpg',
    lastUpdatedAt: 1586472002895
  },
  {
    group: 'menu',
    src: 'https://i.imgur.com/nxuFFjK.png',
    lastUpdatedAt: 1586472072895
  }],
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
  case UPDATE_FOCUSPORT:
    return { ...state, focusport: action.payload }
  case UPLOAD_IMAGES_TO_ITEM:
    return { ...state,
      focusport: {
        ...state.focusport,
        details: {
          ...state.focusport.details,
          images: action.payload
        }
      }
    }
  default:
    return state;
  }
}
