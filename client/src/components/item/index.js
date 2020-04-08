import React from 'react';
import Modal from 'react-bootstrap/Modal';
import MultipleSelect from 'react-select';
import { connect } from 'react-redux';

import { createItem, editItem } from '../../actions';
import request from '../../redux/request';

const ORDER_MTHODS_COPY = {
  phone: 'Call to order',
  doordash: 'Doordash',
  postmates: 'Postmates',
  grubhub: 'Grubhub',
  ubereats: 'UberEats',
  yelp: 'Yelp',
  others: 'Others'
}
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
          ubereats: '',
          yelp: '',
          others: '',
        },
        activeInput: ''
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
  activateEditting(activeInput) {
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
        ...this.props.focusport.details,
        activeInput
      }
      form.category = this.props.focusport.details.category.map(c=>({value: c._id, label: c.title}))
    }
    console.log('form', form)
    this.setState({ ...this.state, editting: true, form })
  }
  cancelEditting() {
    this.setState({ ...this.state, editting: false })
  }
  renderOrderActions(k, o, isActive) {
    if(k=='phone'){
      return <div>{o}</div>
    }else{
      return (<div>
        {isActive && <a href={o} target='_blank' rel="noopener noreferrer" >available</a>}
        {!isActive && <span>not available yet</span>}
      </div>)
    }
  }
  renderOrderMethod(order) {
    const keys = Object.keys(order);
    return keys.map(k=>{
      const o = order[k];
      const isActive = (o!=='');
      const isActiveClass = isActive?'active':'no-active';
      return (ORDER_MTHODS_COPY[k] && <div key={k} className={`order-method ${isActiveClass}`}>
        <div className='type'> {ORDER_MTHODS_COPY[k]} </div>
        <div className={`action ${k}`}>
          {this.renderOrderActions(k, o, isActive)}
        </div>
      </div>||<div></div>)
    })

  }
  renderActionsContainer() {
    return (<div className='session action-container'>
      <div className='action' onClick={this.activateEditting.bind(this)}>
        <div className='icon'>U</div>
        <div className='title'>Update</div>
      </div>
      <div className='action'>
        <div className='icon'>I</div>
        <div className='title'>Info</div>
      </div>
      <div className='action'>
        <div className='icon'>S</div>
        <div className='title'>Share</div>
      </div>
    </div>)
  }
  renderItemView(item) {
    return (<div>
      {item._id && <div className='item-info-container'>
        {this.renderActionsContainer()}
        <div className='session details-container'>
          <div className='session-item title'>
            <div className='session-title'><span/>name</div>
            {item.details.title}
          </div>
          <div className='session-item address'>
            <div className='session-title'><span/>address</div>
            <div className='fade'>{item.details.address}</div>
          </div>
          {item.details && item.details.category.length > 0 && <div className='session-item category'>
            <div className='session-title'><span/>category</div>
            {item.details.category.map((c) => (<div className='item' key={c._id}>{c.title}</div>))}
          </div>}
          <div className='session-item open-hour'> {item.details.open_hour} </div>
          <div  className='session-item order'>
            <div className='session-title'><span/>Order Method</div>
            {this.renderOrderMethod(item.details.order)}
          </div>
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
              <input type='phone'className="form-control" value={form.order.phone} name="phone" onChange={this.onOrderFormChange.bind(this)} placeholder='Phone Number(Call to order)' />
              <input type='url'className="form-control" value={form.order.doordash} name="doordash" onChange={this.onOrderFormChange.bind(this)} placeholder={ORDER_MTHODS_COPY['doordash']} />
              <input type='url'className="form-control" value={form.order.postmates} name="postmates" onChange={this.onOrderFormChange.bind(this)} placeholder={ORDER_MTHODS_COPY['postmates']} />
              <input type='url'className="form-control" value={form.order.grubhub} name="grubhub" onChange={this.onOrderFormChange.bind(this)} placeholder={ORDER_MTHODS_COPY['grubhub']} />
              <input type='url'className="form-control" value={form.order.UberEat} name="UberEat" onChange={this.onOrderFormChange.bind(this)} placeholder={ORDER_MTHODS_COPY['ubereats']} />
              <input type='url'className="form-control" value={form.order.yelp} name="yelp" onChange={this.onOrderFormChange.bind(this)} placeholder={ORDER_MTHODS_COPY['yelp']} />
              <input type='string'className="form-control" value={form.order.others} name="others" onChange={this.onOrderFormChange.bind(this)} placeholder={`${ORDER_MTHODS_COPY['others']} links`} />
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
