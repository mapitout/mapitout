import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import { Route, Switch, HashRouter } from 'react-router-dom';
import reduxMiddlewares from './redux/middlewares';

import Layout from './components/layout';
import Landing from './components/landing';
import User from './components/user';
import Signin from './components/auth/signin';
import SignupWithEmail from './components/auth/signupWithEmail';
import SignupVerification from './components/auth/signupVerification';
import Signout from './components/auth/signout';

import Covid19 from './components/covid19';
import MapView from './components/maps';

import RequireAuth from './components/auth/requireAuth';
import reducers from './reducers';
import {serverConnect} from './actions';

import './style/style.scss'
import * as serviceWorker from './services/service-worker';

export const store = createStore(
  reducers,
  applyMiddleware(
    reduxMiddlewares,
    loadingBarMiddleware()
  )
);
serverConnect()(store.dispatch);

ReactDOM.render(
  <Provider store={store}>
    <HashRouter hashType='slash'>
      <Switch>
        <Layout>
          <Route exact path='/' component= {Landing} />
          
          <Route path='/signup' component= {SignupWithEmail} />
          <Route path='/user' component= {RequireAuth(User)} />
          
          <Route path='/signupVerification' component= {SignupVerification} />
          <Route path='/signin' component= {Signin} />
          <Route path='/signout' component= {Signout} />
          <Route path='/covid19' component= {Covid19} />
          <div className='map-view-outter-container'><Route path='/maps' component= {MapView} /></div>
        </Layout>
      </Switch>
    </HashRouter>
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
