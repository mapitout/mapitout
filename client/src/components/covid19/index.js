import React from 'react';
import USData from './USData';
import CACounty from './CACounty';
import States from './States';
// import WorldMap from './WorldMap/WorldMap';

const Index = () => {

  return(
    <div>
      <USData/>
      <States/>
      <CACounty/>
      {/* <WorldMap/> */}
    </div>
  )
}
export default Index;
