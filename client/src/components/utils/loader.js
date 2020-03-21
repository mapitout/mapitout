import React from 'react';

export function SquareLoader(props) {
  return <div className='loader-component' {...props}>
      <div className='square-spinner' style={{...props.loaderStyle}}></div>
    </div>;
}

export function CircleLoader(props) {
  return <div className='loader-component' {...props}>
      <div className='circle-spinner'>
        <div className='double-bounce1' style={{...props.loaderStyle}}></div>
        <div className='double-bounce2' style={{...props.loaderStyle}}></div>
      </div>
    </div>;
}