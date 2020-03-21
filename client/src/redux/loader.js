import { showLoading, hideLoading } from 'react-redux-loading-bar';
import {store} from '../app';

export default {
  show: (ms=250) => {
    store.dispatch(showLoading());
    setTimeout(()=>store.dispatch(hideLoading()),ms);
  },
  start: () => {
    store.dispatch(showLoading());
  },
  end: (ms=100) => {
    setTimeout(()=>store.dispatch(hideLoading()),ms); 
  }
}