import React from 'react';
import Modal from 'react-bootstrap/Modal';
import MultipleSelect from 'react-select';
import { connect } from 'react-redux';

import request from '../../redux/request';

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      item: this.props.focusport,
      editting: false,
      form: {
        title: '',
        longtitue: 0,
        latitute: 0,
        category: []
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
    this.setState({ ...this.state, editting: true, form: {
      ...this.props.focusport,
      ...this.props.focusport.details
    }})
  }
  cancelEditting() {
    this.setState({ ...this.state, editting: false })
  }
  renderItemView(item) {
    return (<div>
      {item.details && item.details.title && <div className='item-info-container'>
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
  onFormSubmit(e) {
    e.preventDefault()
    console.log(this.state.form);
  }
  onFormChange(e) {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        title: e.target.name=='title'?e.target.value:this.state.form.title,
        details: {
          ...this.state.form.details,
          [e.target.name]: e.target.value
        }
      }
    })
  }
  onCategoryChange(chosenCategory) {
    const currentCategory = this.state.form.category;
    let updatedCategory = [...currentCategory, ...chosenCategory]
    // if(currentCategory.indexOf(chosenCategory)!==-1){
    //   updatedCategory.push(chosenCategory)
    // }
    // console.log('updatedCategory', updatedCategory)
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        category: updatedCategory
      }
    })
    console.log('this.state.form.category', this.state.form)
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
              <input className="form-control" value={form.title} name="title" onChange={this.onFormChange.bind(this)} placeholder="Location name, store name...etc" />
            </div>
            <div className="form-group">
              <div className='session-title'>Category</div>
              <MultipleSelect
                isMulti
                name="category"
                className="basic-multi-select"
                classNamePrefix="category"
                value={['hello', 'cool']}
                onChange={this.onCategoryChange.bind(this)}
                options={[...this.state.initialCategory]} />
            </div>
            <div className="modal-btn-group">
              <span className="cancel" onClick={this.cancelEditting.bind(this)}>Cancel</span>
              <button type='submit' className="create">Create</button>
            </div>
          </Modal.Body>
        </form>
      </Modal>
    )
  }
  render() {
    return (<div className='item-view-compoenet'>
      {this.renderItemView(this.props.focusport)}
      {this.renderModal(this.state.editting)}
    </div>)
  }
}

function mapStateToProps({item}) {
  const { focusport, edittingItem } = item;
  return { focusport, edittingItem }
}

export default connect(mapStateToProps, { })(Item);
