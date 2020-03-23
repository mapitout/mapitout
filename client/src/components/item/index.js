import React from 'react'

const item = (props) => {
  return (<div className='item-details-container'>
  <div className='action-container'>
    <div className='action'>
      <div className='icon'>D</div>
      <div className='title'>Directions</div>
    </div>
    <div className='action'>
      <div className='icon'>E</div>
      <div className='title'>Edit</div>
    </div>
    <div className='action'>
      <div className='icon'>I</div>
      <div className='title'>Info</div>
    </div>
    <div className='action'>
      <div className='icon'>S</div>
      <div className='title'>Share</div>
    </div>
  </div>
</div>)
}

export default item;
