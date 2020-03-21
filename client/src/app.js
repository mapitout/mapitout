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

import RequireAuth from './components/auth/requireAuth';
import reducers from './reducers';
import {serverConnect} from './actions';

import './style/style.scss'

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
    <HashRouter hashType='noslash'>
      <Switch>
        <Layout>
          <Route exact path='/' component= {Landing} />
          
          <Route path='/signup' component= {SignupWithEmail} />
          <Route path='/user' component= {RequireAuth(User)} />
          
          <Route path='/signupVerification' component= {SignupVerification} />
          <Route path='/signin' component= {Signin} />
          <Route path='/signout' component= {Signout} />
        </Layout>
      </Switch>
    </HashRouter>
  </Provider>
  , document.getElementById('root'));