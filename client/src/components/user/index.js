import React from 'react';
import { Route, Switch,Redirect } from 'react-router-dom';
import Profile from './profile';
import Settings from './settings';

export default function User(props) {
  return <div className='user-component'>
    <Switch>
      <Redirect exact from='/user' to='/user/profile'/>
      <Route path='/user/profile' component= {Profile} />
      <Route path='/user/settings' component= {Settings} />
    </Switch>
  </div>
}