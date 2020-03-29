import React from 'react'


// const example_d = {
//   details: {
//     title: 'Taiwan Porridge Kingdom',
//     address: '20956 Homestead Rd, Cupertino, CA 95014',
//     location: {
//       coordinates: ['longitude', 'latitude']
//     },
//     category: ['ObjectId'],
//     open_hour: {
//       'mon': [{
//         startAt: 9.0,
//         endAt: 12.0
//       }],
//       'tue': [{
//         openAt: 0.0,
//         closeAt: 0.0
//       }],
//       'wed': [{
//         openAt: 9.0,
//         closeAt: 10.0
//       }]
//     },
//     menu: 'https://s3-media0.fl.yelpcdn.com/bphoto/UgtxQQlDJ9n5k8G8Y8pceQ/o.jpg',
//     order: [{
//       type: 'phone',
//       notes: 'Pick up on your own(cash only). Make a phone call and order 30 mins before picking up.',
//       action: '4082532569',
//     }, {
//       type: 'grubhub',
//       notes: 'Deliver by grubhub.',
//       action: 'https://www.grubhub.com/restaurant/taiwan-porridge-kingdom-20956-homestead-road-cupertino/1827642',
//     }, {
//       type: 'doordash',
//       notes: 'Deliver by doordash.',
//       action: 'https://www.doordash.com/store/taiwan-restaurant-san-jose-195/en-US',
//     }]
//   }
// }

const item = (props) => {
  console.log('props.data', props.data)
  const [item, setItem] = React.useState({})
  React.useEffect(() => {
    props.data && setItem({ ...props.data });
  }, [])
  const [editting, setEditting] = React.useState({
    active: !false,
    data: {}
  })
  const activateEditting = () => {
    setEditting({ ...editting, active: !editting.active })
  }
  return (item.details && item.details.order && <div className={`item-info-container editting-${editting.active}`}>
    <div className='session action-container'>
      <div className='action'>
        <div className='icon'>D</div>
        <div className='title'>Directions</div>
      </div>
      <div className={`action action-editting-${editting.active}`} onClick={activateEditting}>
        <div className='icon'>E</div>
        <div className='title'>{`${(editting.active) ? 'Editting' : 'Edit'}`}</div>
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
      <div className='session-item title'>
        <div className='session-title'>name</div>
        {item.details.title}
      </div>
      <div className='session-item address'>
        <div className='session-title'>address</div>
        <div className='fade'>{item.details.address}</div>
      </div>
      <div className='session-item category'>
        <div className='session-title'>category</div>
        {item.details.category.length > 0 && item.details.category.map((c) => (<div className='item' key={c}>{c}</div>))}
      </div>
      <div className='session-item open-hour'> {item.details.open_hour} </div>
      {item.details.length > 0 && <div className='menu'>
        <div className='session-title'>Order Method</div>
        {item.details.order.map((o) => (<div key={o.type} className='order-method'>
          <div className='type'> {o.type} </div>
          <div className='notes'> {o.notes} </div>
          <div className='action'> {o.action} </div>
        </div>))}
      </div>}
      <div className='menu'>
        <div className='session-title'>menu</div>
        <img
          src={item.details.menu}
        />
      </div>
    </div>
  </div> || <div>none</div>)
}

export default item;
