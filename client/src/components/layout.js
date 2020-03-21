import React from 'react';
import Navbar from './navbar';

const Layout = (props) => (<div>
  <Navbar />
  {props.children}
</div>)

export default Layout;
