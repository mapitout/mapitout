import React from 'react';
import Modal from 'react-bootstrap/Modal';
import useForm from '../utils/useForm';
import MultipleSelect from 'react-select'

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

  const [item, setItem] = React.useState({})
  const [category, setCategory] = React.useState([])
  React.useEffect(() => {
    props.data && setItem({ ...props.data });
    if(props.data.details) {
      const initialCategory = props.data.details.category.map(c=>({ value: c, label: c }))
      props.data.details.category.length>0 && setCategory([...initialCategory]);
    }
  }, [])
  const [editting, setEditting] = React.useState(!false)
  const activateEditting = () => setEditting(true);
  const cancelClose = () => setEditting(false);
  const { onSubmit, onChange, inputs } = useForm('creatingForm', {
    initialValues: {
      title: props.data.name,
      address: props.data.details ? props.data.details.address : '',
      longitude: props.data.longitude,
      latitude: props.data.latitude
    },
    callback: (inputs) => {
      console.log({ ...inputs, category: category.map(i => i.value.toLowerCase()) });
    }
  })
  const onCategoryChange = (inputValue) => {
    setCategory([...inputValue])
  }
  return (<div className='item-view-compoenet'>
    {item.details && item.details.order && <div className='item-info-container'>
      <div className='session action-container'>
        <div className='action'>
          <div className='icon'>D</div>
          <div className='title'>Directions</div>
        </div>
        <div className='action' onClick={activateEditting}>
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
          {item.details && item.details.category.length > 0 && item.details.category.map((c) => (<div className='item' key={c}>{c}</div>))}
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
    </div> || <div className='item-empty'>
      <img src='../../assets/svgs/no-data.svg' />
      <div>This location has no information yet, can you help to map it out.</div>
      <button className='btn btn-block btn-lg try-it-out' onClick={activateEditting}>Map It Out</button>
      <Modal className='create-editting-item-modal' show={editting} onHide={cancelClose}>
        <form onSubmit={onSubmit}>
          <Modal.Body>
            <div className="prompt-block form-group">
              <img src='../../assets/svgs/pin-on-the-map.svg' />
              <div className='session-title'>Add details to</div>
              <div className="address-prefill">
                {inputs.address}
              </div>
            </div>
            <div className="form-group">
              <div className='session-title'>Name</div>
              <input className="form-control" value={inputs.title} name="title" onChange={onChange} placeholder="Location name, store name...etc" />
            </div>
            <div className="form-group">
              <div className='session-title'>Category</div>
              <MultipleSelect
                isMulti
                name="category"
                className="basic-multi-select"
                classNamePrefix="category"
                value={category}
                onChange={onCategoryChange}
                options={[
                  // cultural(korean, thai...etc), food type(dessert, breakfase...etc), food catogory(pizza, durgers...etc)
                  { value: 'Taiwanese', label: 'Taiwanese' },
                  { value: 'Chinese', label: 'Chinese' },
                  { value: 'Thai', label: 'Thai' },
                  { value: 'Mexican', label: 'Mexican' },
                  { value: 'Italian', label: 'Italian' },
                  { value: 'Japanese', label: 'Japanese' },
                  { value: 'Korean', label: 'Korean' },
                  { value: 'American', label: 'American' },
                  { value: 'Middle Eastern', label: 'Middle Eastern' },
                  { value: 'Dessert', label: 'Dessert' },
                  { value: 'Breakfast', label: 'Breakfast' },
                  { value: 'Brunch', label: 'Brunch' },
                  { value: 'Lunch', label: 'Lunch' },
                  { value: 'Dinner', label: 'Dinner' },
                  { value: 'Late night', label: 'Late night' }
                ]} />
            </div>
            <div className="modal-btn-group">
              <span className="cancel" onClick={cancelClose}>Cancel</span>
              <span className="create">Create</span>
            </div>
          </Modal.Body>
        </form>
      </Modal>
    </div>}
  </div>)
}

export default item;
