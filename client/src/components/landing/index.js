import React from 'react';
import Welcome from './welcome';
import Feature from './feature';
import Author from './author';
import Discuss from './discuss';
import Footer from './footer';

const Landing= ()=> {
  return (
    <div className='landing-component'>
      <Welcome />
      <Feature />
      <Author />
      <Discuss />
      <Footer />
    </div>)
}

export default Landing;