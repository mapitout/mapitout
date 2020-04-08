import React from 'react';
import Modal from 'react-bootstrap/Modal';
import MultipleSelect from 'react-select';
import { connect } from 'react-redux';

import { createItem, editItem } from '../../actions';
import request from '../../redux/request';

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editting: false,
      form: {
        title: '',
        category: [],
        order: {
          phone: '',
          doordash: '',
          postmates: '',
          grubhub: '',
          ubereat: '',
          yelp: '',
          others: '',
        }
      },
      initialCategory: []
    }
    // if(props.data.details) {
    //   const initialCategory = props.data.details.category.map(c=>({ value: c, label: c }))
    //   props.data.details.category.length>0 && setCategory([...initialCategory]);
    // }
  }
  componentDidMount() {
    request.get('/publicApi/category/all')
      .then(r=>{
        this.setState({
          ...this.state,
          initialCategory: r.data.allCate.map(c=>({value: c._id, label: c.title}))
        })
      })
      .catch(e=>console.error(e.message))
  }
  activateEditting() {
    let form = {
      order: { ...this.state.form.order },
      address: this.props.focusport.details.address,
      location: {
        ...this.props.focusport.details.location
      }
    }
    if(this.props.focusport._id){
      form = {
        order: { ...this.state.form.order },
        ...this.props.focusport.details
      }
      form.category = this.props.focusport.details.category.map(c=>({value: c._id, label: c.title}))
    }
    console.log('form', form)
    this.setState({ ...this.state, editting: true, form })
  }
  cancelEditting() {
    this.setState({ ...this.state, editting: false })
  }
  renderItemView(item) {
    return (<div>
      {item._id && <div className='item-info-container'>
        <div className='session action-container'>
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
          {item.details && item.details.category.length > 0 && <div className='session-item category'>
            <div className='session-title'>category</div>
            {item.details.category.map((c) => (<div className='item' key={c._id}>{c.title}</div>))}
          </div>}
          <div className='session-item open-hour'> {item.details.open_hour} </div>
          {/* {item.details.order &&
            <div className='session-item order'>
              <div className='session-title'>Order Method</div>
              {item.details.order.map((o) => (<div key={o.type} className='order-method'>
                <div className='type'> {o.type} </div>
                <div className='notes'> {o.notes} </div>
                <div className='action'> {o.action} </div>
              </div>))}
            </div>} */}
          {item.details.menu > 0 && <div className='menu'>
            <div className='session-title'>menu</div>
            <img
              src={item.details.menu}
            />
          </div>}
        </div>
      </div> || <div className='item-empty'>
        <img src='../../assets/svgs/no-data.svg' />
        <div>This location has no information yet, can you help to map it out.</div>
        <button className='btn btn-block btn-lg try-it-out' onClick={this.activateEditting.bind(this)}>Map It Out</button>
      </div>}
    </div>)
  }
  onFormSubmit(e) {
    e.preventDefault()
    const item_id = this.props.focusport._id;
    if(!item_id) {
      this.props.createItem(this.state.form)
      this.setState({ ...this.state, editting: false })
    }else{
      const item = this.state.form;
      delete item.location; // location: long and lat should be changed
      delete item.address; // address should be changed
      delete item._id; // item _id should be changed
      this.props.editItem(item_id, item)
      this.setState({ ...this.state, editting: false })
    }
  }
  onFormChange(e) {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    })
  }
  onOrderFormChange(e) {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        order: {
          ...this.state.form.order,
          [e.target.name]: e.target.value
        }
      }
    })
  }
  onCategoryChange(c) {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        category: c
      }
    })
  }
  renderModal(show) {
    const { form } = this.state;
    return (
      <Modal className='create-editting-item-modal' show={show} onHide={this.cancelEditting.bind(this)}>
        <form onSubmit={this.onFormSubmit.bind(this)}>
          <Modal.Body>
            <div className="prompt-block form-group">
              <img src='../../assets/svgs/pin-on-the-map.svg' />
              <div className='session-title'>Add details to</div>
              <div className="address-prefill">
                {form.address && form.address.replace(', United States of America', ', US')}
              </div>
            </div>
            <div className="form-group">
              <div className='session-title'>Name</div>
              <input required={true} className="form-control" value={form.title} name="title" onChange={this.onFormChange.bind(this)} placeholder="Location name, store name...etc" />
            </div>
            <div className="form-group">
              <div className='session-title'>Category</div>
              <MultipleSelect
                isMulti
                name="category"
                className="basic-multi-select"
                classNamePrefix="category"
                value={this.state.form.category}
                onChange={this.onCategoryChange.bind(this)}
                options={[...this.state.initialCategory]} />
            </div>
            {<div className="form-group">
              <div className='session-title'>Order methods</div>
              <input type='number'className="form-control" value={form.order.phone} name="phone" onChange={this.onOrderFormChange.bind(this)} placeholder="phone number" />
              <input type='url'className="form-control" value={form.order.doordash} name="doordash" onChange={this.onOrderFormChange.bind(this)} placeholder="doordash" />
              <input type='url'className="form-control" value={form.order.postmates} name="postmates" onChange={this.onOrderFormChange.bind(this)} placeholder="postmates" />
              <input type='url'className="form-control" value={form.order.grubhub} name="grubhub" onChange={this.onOrderFormChange.bind(this)} placeholder="grubhub" />
              <input type='url'className="form-control" value={form.order.UberEat} name="UberEat" onChange={this.onOrderFormChange.bind(this)} placeholder="UberEat" />
              <input type='url'className="form-control" value={form.order.yelp} name="yelp" onChange={this.onOrderFormChange.bind(this)} placeholder="yelp" />
              <input type='string'className="form-control" value={form.order.others} name="others" onChange={this.onOrderFormChange.bind(this)} placeholder="others" />
            </div>}
            <div className="modal-btn-group">
              <span className="cancel" onClick={this.cancelEditting.bind(this)}>Cancel</span>
              <button type='submit' className="create">Save</button>
            </div>
          </Modal.Body>
        </form>
      </Modal>
    )
  }
  render() {
    return (<div className='item-view-component'>
      {this.renderItemView(this.props.focusport)}
      {this.renderModal(this.state.editting)}
    </div>)
  }
}

function mapStateToProps({item}) {
  const { focusport } = item;
  return { focusport }
}

export default connect(mapStateToProps, { createItem, editItem })(Item);
