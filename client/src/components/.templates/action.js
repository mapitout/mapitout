// import request from '../request';
// export const TYPEEEE = 'TYPEEEE';

// export const xxxReset = () => (dispatch) => dispatch({type: TYPEEEE});

// export function searchOneProductByURL(url) {
//     return function (dispatch) {
//       let productId = 'B0' + url.split('/B0')[1].split('/')[0];
//       request.get(`/api/product/getOneByProductId?productId=${productId}`)
//       .then(p=>{
//         dispatch({type: TYPEEEE, payload: p.date})
//       })
      
//       .catch(err=>console.log(err))
//     }
// }
// let INITIAL_STATE = {}

// export function adminReducer(state=INITIAL_STATE, action) {
//     switch (action.type) {
//       case TYPEEEE:
//         return { 
//           ...state
//         }
//       default:
//           return state;
//     }
// }