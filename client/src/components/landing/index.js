import React from 'react';
import Welcome from './welcome';
import Social from './social';
import Feature from './feature';
import Author from './author';
import Discuss from './discuss';
import Footer from './footer';
import USData from '../covid19/USData';

const Landing= ()=> {
  return (
    <div className='landing-component'>
      <Welcome />
      <Feature />
      <Social />
      <Author />
      <Discuss />
      <Footer />
    </div>)
}

export default Landing;