import React from 'react';
import USData from './USData';
import County from './County';
import States from './States';
// import WorldMap from './WorldMap/WorldMap';

const Index = () => {

  return(
    <div>
      <USData/>
      <States/>
      <County/>
      {/* <WorldMap/> */}
    </div>
  )
}
export default Index;
