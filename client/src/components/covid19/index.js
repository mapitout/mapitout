import React from 'react';
import USData from './USData';
import CACounty from './CACounty';

const Index = () => {

  return(
    <div>
      {/* <USData/> */}
      <div style={{height:"1000px", width:"1000px", paddingTop:"64px"}}>
        <CACounty/>
      </div>
      
    </div>
  )
}
export default Index;
