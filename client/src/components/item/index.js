import React from 'react'

const item = (props) => {
  console.log('props.data', props.data)
  // const [editting, setEditting] = React.useState(false)
  const [item, setItem] = React.useState({})
  React.useEffect(()=>{
    props.data && setItem({...props.data});
  }, [])
  return (item.details&&item.details.order && <div className='item-info-container'>
  <div className='session action-container'>
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
  <div className='session details-container'>
    <div className='title'>
    <div className='session-title'>name</div>
      {item.details.title}
    </div>
    <div className='address'>
    <div className='session-title'>address</div>
    <div className='fade'>{item.details.address}</div>
    </div>
    <div className='category'>
    <div className='session-title'>category</div>
    {item.details.category.length>0 && item.details.category.map((c)=>(<div className='item' key={c}>{c}</div>))}
    </div>
    <div className='open-hour'> {item.details.open_hour} </div>
    <div className='menu'>
      <div className='session-title'>menu</div>
      <img
        src={item.details.menu}
      />
    </div>
    {item.details.order.length>0 && item.details.order.map((o)=>(<div key={o.type} className='order-method'>
      <div className='type'> {o.type} </div>
      <div className='notes'> {o.notes} </div>
      <div className='action'> {o.action} </div>
    </div>))}
  </div>
</div>||<div>none</div>)
}

export default item;
