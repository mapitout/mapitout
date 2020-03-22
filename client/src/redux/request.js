import axios from 'axios';

let request = axios.create({
  'baseURL': process.env.SERVERURI || 'http://localhost:8000',
  'Access-Control-Allow-Origin': '*'
});

request.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
request.defaults.headers.common['Authorization'] = localStorage.getItem('mapitout_auth_jwt_token') || 'Unauthorized';

request.interceptors.request.use(config => {
  if (config.url.includes('/api')){
    if(!localStorage.getItem('mapitout_auth_jwt_token')) return Promise.reject('User is not logged in (No Authorization)');
    config.headers['Authorization'] = localStorage.getItem('mapitout_auth_jwt_token');
  }
  return config;
})

export default request;