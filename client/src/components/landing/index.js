import React from 'react';
import Welcome from './welcome';
import Feature from './feature';
import Footer from './footer';

const Landing= ()=> {
  return (
    <div className='landing-component'>
      <Welcome />
      <Feature />
      <Footer />
    </div>)
}

export default Landing;