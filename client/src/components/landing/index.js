import React from 'react';
import Welcome from './welcome';
import Feature from './feature';
import Author from './author';
import Footer from './footer';

const Landing= ()=> {
  return (
    <div className='landing-component'>
      <Welcome />
      <Feature />
      <Author />
      <Footer />
    </div>)
}

export default Landing;