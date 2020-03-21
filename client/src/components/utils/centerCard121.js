import React from 'react';

export function CenterCard121(props){
  return (<div className='centercard121-component' {...props} >
    <div className='row'>
      <div className='col-xs-12 col-sm-1 col-md-3 col-xl-4'></div>
      <div className='col-sm-10 col-md-6 col-xl-4'>{props.children}</div>
      <div className='col-xs-12 col-sm-1 col-md-3 col-xl-4'></div>
    </div>
  </div>)
}