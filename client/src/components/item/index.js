import React from 'react';
import Modal from 'react-bootstrap/Modal';
import MultipleSelect from 'react-select';
import { connect } from 'react-redux';

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      item: this.props.focusport,
      editting: false,
      form: {}
    }
    // if(props.data.details) {
    //   const initialCategory = props.data.details.category.map(c=>({ value: c, label: c }))
    //   props.data.details.category.length>0 && setCategory([...initialCategory]);
    // }
  }
  activateEditting() {
    this.setState({ ...this.state, editting: true })
  }
  cancelEditting() {
    this.setState({ ...this.state, editting: false })
  }
  render() {
    const item = this.props.focusport;
    return (<div className='item-view-compoenet'>
      {item.details && item.details.order && <div className='item-info-container'>
        <div className='session action-container'>
          <div className='action'>
            <div className='icon'>D</div>
            <div className='title'>Directions</div>
          </div>
          <div className='action' onClick={this.activateEditting.bind(this)}>
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
        <button className='btn btn-block btn-lg try-it-out' onClick={this.activateEditting.bind(this)}>Map It Out</button>
      </div>}
    </div>)
  }
}

function mapStateToProps({item}) {
  const { focusport } = item;
  return { focusport }
}

export default connect(mapStateToProps, { })(Item);




// <Modal className='create-editting-item-modal' show={this.state.editting} onHide={this.cancelEditting.bind(this)}>
//   <form onSubmit={this.onSubmit.bind(this)}>
//     <Modal.Body>
//       {/* <div className="prompt-block form-group">
//         <img src='../../assets/svgs/pin-on-the-map.svg' />
//         <div className='session-title'>Add details to</div>
//         <div className="address-prefill">
//           {form.details.address}
//         </div>
//       </div>
//       <div className="form-group">
//         <div className='session-title'>Name</div>
//         <input className="form-control" value={form.title} name="title" onChange={this.onChange.bind(this)} placeholder="Location name, store name...etc" />
//       </div>
//       <div className="form-group">
//         <div className='session-title'>Category</div>
//         <MultipleSelect
//           isMulti
//           name="category"
//           className="basic-multi-select"
//           classNamePrefix="category"
//           value={form.category}
//           onChange={onCategoryChange}
//           options={[
//             // cultural(korean, thai...etc), food type(dessert, breakfase...etc), food catogory(pizza, durgers...etc)
//             { value: 'Taiwanese', label: 'Taiwanese' },
//             { value: 'Chinese', label: 'Chinese' },
//             { value: 'Thai', label: 'Thai' },
//             { value: 'Mexican', label: 'Mexican' },
//             { value: 'Italian', label: 'Italian' },
//             { value: 'Japanese', label: 'Japanese' },
//             { value: 'Korean', label: 'Korean' },
//             { value: 'American', label: 'American' },
//             { value: 'Middle Eastern', label: 'Middle Eastern' },
//             { value: 'Dessert', label: 'Dessert' },
//             { value: 'Breakfast', label: 'Breakfast' },
//             { value: 'Brunch', label: 'Brunch' },
//             { value: 'Lunch', label: 'Lunch' },
//             { value: 'Dinner', label: 'Dinner' },
//             { value: 'Late night', label: 'Late night' }
//           ]} />
//       </div> */}
//       <div className="modal-btn-group">
//         <span className="cancel" onClick={this.cancelEditting.bind(this)}>Cancel</span>
//         <span className="create">Create</span>
//       </div>
//     </Modal.Body>
//   </form>
// </Modal>