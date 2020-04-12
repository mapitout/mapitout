import React from 'react';
import Modal from 'react-bootstrap/Modal';
import MultipleSelect from 'react-select';
import _ from 'lodash';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import ImageSlider from './imageSlider';
import { Toast } from 'react-bootstrap';

import { createItem, editItem, uploadImagesToItem, uploadImagesStatusReset } from '../../actions';
import request from '../../redux/request';
const CATE_LOCAL_NAME = `${process.env.NODE_ENV||'dev'}-initialCategory`;
const MULTI_LINE_SEPERATOR = '*|*';
const ORDER_MTHODS_COPY = {
  phone: 'Call to order',
  doordash: 'Doordash',
  postmates: 'Postmates',
  grubhub: 'Grubhub',
  ubereats: 'UberEats',
  yelp: 'Yelp',
  others: 'Others'
}

const initDayOpenHour = {
  from: 0,
  to: 0
}

const INITIAL_FORM = {
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
  open_hour: {
    monday: [{ ...initDayOpenHour }],
    tuesday: [{ ...initDayOpenHour }],
    wednesday: [{ ...initDayOpenHour }],
    thursday: [{ ...initDayOpenHour }],
    friday: [{ ...initDayOpenHour }],
    saturday: [{ ...initDayOpenHour }],
    sunday: [{ ...initDayOpenHour }],
  },
  images: [],
  activeInput: ''
}

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      editting: false,
      edittingImages: false,
      imageDraggingClass: '',
      modal: {
        group: '',
        imageActiveIndex: ''
      },
      form: { ...INITIAL_FORM },
      initialCategory: []
    }
  }
  componentDidMount() {
    const local_cat = localStorage.getItem(CATE_LOCAL_NAME);
    if(local_cat) {
      const initialCategory = JSON.parse(local_cat)
      this.setState({ initialCategory })
    }else{
      request.get('/publicApi/category/all')
        .then(r => {
          const initialCategory = r.data.allCate.map(c => ({ value: c._id, label: c.title }));
          localStorage.setItem(CATE_LOCAL_NAME, JSON.stringify(initialCategory))
          this.setState({ initialCategory })
        })
        .catch(e => console.error(e.message))
    }
  }
  passingPropsToFormState() {
    let form = {
      ...INITIAL_FORM,
      order: { ...this.state.form.order },
      address: this.props.focusport.details.address,
      location: {
        ...this.props.focusport.details.location
      }
    }
    if (this.props.focusport._id) {
      form = {
        order: { ...this.state.form.order },
        images: { ...this.state.form.images },
        ...this.props.focusport.details,
      }
      form.category = this.props.focusport.details.category.map(c => ({ value: c._id, label: c.title }))
    }
    return form;
  }
  activateEditting() {
    const form = this.passingPropsToFormState();
    this.setState({ ...this.state, editting: true, form })
  }

  copyURL() {
    let selectholder = document.createElement('input');
    let url = window.location.href;
    const holder = document.getElementById('holder');
    holder.appendChild(selectholder);
    selectholder.value = url;
    selectholder.select();
    document.execCommand('copy');
    console.log('COPY')
    this.setState({
      ...this.state,
      show: true,
    })
    holder.removeChild(selectholder);

  }

  cancelEditting() {
    this.setState({ ...this.state, editting: false })
  }
  renderOrderAction(k, o) {
    if (k == 'phone') {
      return <a href={`tel:${o}`}>{o}</a>
    }else if(k == 'others'){
      return <div> {o.split(MULTI_LINE_SEPERATOR).map((t, i)=><div key={i}>{t}</div>)} </div>;
    }else{
      return <a href={o} target='_blank' rel="noopener noreferrer" >available</a>
    }
  }
  renderOrderActions(k, o, isActive) {
    return (<div key={k}>
      {isActive && this.renderOrderAction(k, o)}
      {!isActive && <span>not available yet</span>}
    </div>)
  }
  renderOrderMethods(order) {
    const keys = Object.keys(order);
    return keys.map(k => {
      const o = order[k];
      const isActive = (o !== '');
      const isActiveClass = isActive ? 'active' : 'no-active';
      return (ORDER_MTHODS_COPY[k] && <div key={`${k}-${o}`} className={`order-method ${isActiveClass}`}>
        <div className='type'> {ORDER_MTHODS_COPY[k]} </div>
        <div className={`action ${k}`}>
          {this.renderOrderActions(k, o, isActive)}
        </div>
      </div> || <div key={`${k}-${o}`}></div>)
    })

  }
  renderActionsContainer() {
    return (<div className='session action-container'>
      <div className='action' onClick={this.activateEditting.bind(this)}>
        <div className='icon'>E</div>
        <div className='title'>Edit</div>
      </div>
      {/* <div className='action'>
        <div className='icon'>M</div>
        <div className='title'>Menus</div>
      </div> */}
      <div className='action' id="holder" onClick={this.copyURL.bind(this)}>
        <div className='icon'>S</div>
        <div className='title'>Share</div>
      </div>
    </div>)
  }
  convertDecimalToTime(n) {
    n = (Math.round(n * 100) / 100).toFixed(2);
    const str = _.toString(n);
    return str.split('.').join(':')
  }
  renderOpenHourForView(open_hour) {
    const d = new Date();
    const weekday = d.getDay() - 1;
    delete open_hour._id;
    const keys = Object.keys(open_hour);
    return keys.map((k, weekdayNumber) => {
      const length = open_hour[k].length;
      const isToday = (weekday == weekdayNumber);
      return <tbody key={k}>
        {open_hour[k].map(({ from, to }, i) => {
          const isNone = (from === 0 && to === 0);
          return (<tr className={`${isToday}`} key={`${k}-${i}-${from}-${to}`}>
            <td className='hour-title'>{i == 0 && <span>{k}<span>{isToday && <span> (Today)</span>}</span></span>}</td>
            {!isNone && <td>
              <div className={`hour-td-finish-${length - 1 === i}`}>{`${this.convertDecimalToTime(from)} - ${this.convertDecimalToTime(to)}`}</div>
            </td>}
            {isNone && <td><div className={`none-data`}>Closed</div></td>}
          </tr>)
        })}
      </tbody>
    })
  }
  activateImageSlider(imageActiveIndex, group, t) {
    this.props.uploadImagesStatusReset();
    const form = this.passingPropsToFormState();
    this.setState({ ...this.state, edittingImages: true, modal: { group, imageActiveIndex }, form });
  }
  renderItemView(item) {
    if(item.input=='')return <div></div>;
    return (<div>
      {item._id && <div className='item-info-container'>
        {this.renderActionsContainer()}
        <div className='session details-container'>
          <div className='session-item title'>
            {item.details.title}
          </div>
          <div className='session-item address'>
            <div className='fade'>{item.details.address}</div>
          </div>
          {item.details && item.details.category.length > 0 && <div className='session-item category'>
            <div className='session-title'><span />category</div>
            {item.details.category.map((c) => (<div className='item' key={c._id}>{c.title}</div>))}
          </div>}
          <div className='session-item open-hour'>
            <div className='session-title'><span />Open Hours</div>
            <table style={{ "width": "100%" }}>
              {this.renderOpenHourForView(item.details.open_hour)}
            </table>
          </div>
          <div className='session-item images'>
            {this.renderCurrentImages(item.details.images)}
          </div>
          <div className='session-item order'>
            <div className='session-title'><span />Order Methods</div>
            {this.renderOrderMethods(item.details.order)}
          </div>
        </div>
      </div> || <div className='item-empty'>
        <img src='../../assets/svgs/no-data.svg' />
        <div>This location has no information yet, can you help to map it out.</div>
        <button className='btn btn-block btn-lg map-it-out' onClick={this.activateEditting.bind(this)}>Map It Out</button>
      </div>}
    </div>)
  }
  onFormSubmit(e) {
    e.preventDefault()
    const item_id = this.props.focusport._id;
    if (!item_id) {
      this.props.createItem(this.state.form)
      this.setState({ ...this.state, editting: false })
    } else {
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
    if(e.target.name=='others') {
      const multiStr = e.target.value.split('\n').join(MULTI_LINE_SEPERATOR)
      this.setState({
        ...this.state,
        form: {
          ...this.state.form,
          order: {
            ...this.state.form.order,
            others: multiStr
          }
        }
      })
    }else{
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
  onOpenHourFormChange(e) {
    const type = e.target.name.split('.')[2];
    const day = e.target.name.split('.')[0].toLowerCase();
    const index = e.target.name.split('.')[1];
    const time = e.target.value;
    console.log(type, day, index, time);
    const current = [...this.state.form.open_hour[day]];
    current[index] = {
      ...current[index],
      [type]: time
    }
    const newData = [...current];
    this.updateOpenHourOfDay(day, newData)
  }
  updateOpenHourOfDay(day, data) {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        open_hour: {
          ...this.state.form.open_hour,
          [day]: data
        }
      }
    })
    console.log('this.form.open_hour', this.state.form.open_hour)
  }
  renderOpenHourTimeSelector() {
    const list = [
      <option key='6.00' value={6.00}>6:00 (6:00 am)</option>,
      <option key='6.30' value={6.30}>6:30 (6:30 am)</option>,
      <option key='7.00' value={7.00}>7:00 (7:00 am)</option>,
      <option key='7.30' value={7.30}>7:30 (7:30 am)</option>,
      <option key='8.00' value={8.00}>8:00 (8:00 am)</option>,
      <option key='8.30' value={8.30}>8:30 (8:30 am)</option>,
      <option key='9.00' value={9.00}>9:00 (9:00 am)</option>,
      <option key='9.30' value={9.30}>9:30 (9:30 am)</option>,
      <option key='10.00' value={10.00}>10:00 (10:00 am)</option>,
      <option key='10.30' value={10.30}>10:30 (10:30 am)</option>,
      <option key='11.00' value={11.00}>11:00 (11:00 am)</option>,
      <option key='11.30' value={11.30}>11:30 (11:30 am)</option>,
      <option key='12.00' value={12.00}>12:00 (noon)</option>,
      <option key='12.30' value={12.30}>12:30 (12:30 pm)</option>,
      <option key='13.00' value={13.00}>{`13:00 (${13 - 12}:00 pm)`}</option>,
      <option key='13.30' value={13.30}>{`13:30 (${13 - 12}:30 pm)`}</option>,
      <option key='14.00' value={14.00}>{`14:00 (${14 - 12}:00 pm)`}</option>,
      <option key='14.30' value={14.30}>{`14:30 (${14 - 12}:30 pm)`}</option>,
      <option key='15.00' value={15.00}>{`15:00 (${15 - 12}:00 pm)`}</option>,
      <option key='15.30' value={15.30}>{`15:30 (${15 - 12}:30 pm)`}</option>,
      <option key='16.00' value={16.00}>{`16:00 (${16 - 12}:00 pm)`}</option>,
      <option key='16.30' value={16.30}>{`16:30 (${16 - 12}:30 pm)`}</option>,
      <option key='17.00' value={17.00}>{`17:00 (${17 - 12}:00 pm)`}</option>,
      <option key='17.30' value={17.30}>{`17:30 (${17 - 12}:30 pm)`}</option>,
      <option key='18.00' value={18.00}>{`18:00 (${18 - 12}:00 pm)`}</option>,
      <option key='18.30' value={18.30}>{`18:30 (${18 - 12}:30 pm)`}</option>,
      <option key='19.00' value={19.00}>{`19:00 (${19 - 12}:00 pm)`}</option>,
      <option key='19.30' value={19.30}>{`19:30 (${19 - 12}:30 pm)`}</option>,
      <option key='20.00' value={20.00}>{`20:00 (${20 - 12}:00 pm)`}</option>,
      <option key='20.30' value={20.30}>{`20:30 (${20 - 12}:30 pm)`}</option>,
      <option key='21.00' value={21.00}>{`21:00 (${21 - 12}:00 pm)`}</option>,
      <option key='21.30' value={21.30}>{`21:30 (${21 - 12}:30 pm)`}</option>,
      <option key='22.00' value={22.00}>{`22:00 (${22 - 12}:00 pm)`}</option>,
      <option key='22.30' value={22.30}>{`22:30 (${22 - 12}:30 pm)`}</option>,
      <option key='23.00' value={23.00}>{`23:00 (${23 - 12}:00 pm)`}</option>,
      <option key='23.30' value={23.30}>{`23:30 (${23 - 12}:30 pm)`}</option>,
      <option key='24.00' value={24.00}>24:00 (midnight)</option>
    ];
    return [<option key='none' value={0}>closed</option>, list]
  }
  onOpenHourAddOneMoreInput(day) {
    const current = [...this.state.form.open_hour[day]];
    const newData = [...current, { ...initDayOpenHour }];
    this.updateOpenHourOfDay(day, newData)
  }
  onOpenHourRemoveCurrentInput(day, index) {
    const current = [...this.state.form.open_hour[day]];
    current.splice(index, 1);
    const newData = [...current];
    this.updateOpenHourOfDay(day, newData);
  }
  renderOpenHourActions(length, index, day) {
    if (length === 1) {
      return (<div className='day-block plus' onClick={this.onOpenHourAddOneMoreInput.bind(this, day)}>
        <i className="fas fa-plus"></i>
      </div>)
    } else if (index + 1 === length) {
      return (<div className='day-block plus' onClick={this.onOpenHourAddOneMoreInput.bind(this, day)}>
        <i className="fas fa-plus"></i>
      </div>)
    } else {
      return (<div className='day-block cancel' onClick={this.onOpenHourRemoveCurrentInput.bind(this, day, index)}>
        <i className="fas fa-times"></i>
      </div>)
    }
  }
  renderOpenHourWeek(d, form) {
    const title = d;
    const day = d.toLowerCase();
    const dayData = form.open_hour[day];
    return dayData.map((oneDayData, index) => {
      return (<tr key={`${day}.${index}`}>
        <td>{index == 0 && <div className='day-block day'>{title}</div>}</td>
        <td>
          <div className='day-block-input'>
            <select className="form-control" value={oneDayData.from} name={`${d}.${index}.from`} onChange={this.onOpenHourFormChange.bind(this)} placeholder="start">
              {this.renderOpenHourTimeSelector()}
            </select>
            <div className='day-block'>to</div>
            <select className="form-control" value={oneDayData.to} name={`${d}.${index}.to`} onChange={this.onOpenHourFormChange.bind(this)} placeholder="to">
              {this.renderOpenHourTimeSelector()}
            </select>
            {this.renderOpenHourActions(dayData.length, index, day)}
          </div>
        </td>
      </tr>)
    })
  }
  renderModal(show) {
    const { form } = this.state;
    console.log(form);
    return (
      <Modal className='create-editting-item-modal' show={show} onHide={this.cancelEditting.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit details</Modal.Title>
        </Modal.Header>
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
              <div className='session-title'>Open Hours</div>
              <div className='open-hour'>
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((d, i) => {
                  return (<div key={i} className='day-row'>
                    <table style={{ "width": "100%" }}>
                      <tbody>
                        {this.renderOpenHourWeek(d, form)}
                      </tbody>
                    </table>
                  </div>)
                })}
              </div>
            </div>}
            {<div className="form-group">
              <div className='session-title'>Order methods</div>
              <input type='phone' className="form-control" value={form.order.phone} name="phone" onChange={this.onOrderFormChange.bind(this)} placeholder='Phone Number(Call to order)' />
              <input type='url' className="form-control" value={form.order.doordash} name="doordash" onChange={this.onOrderFormChange.bind(this)} placeholder={ORDER_MTHODS_COPY['doordash']} />
              <input type='url' className="form-control" value={form.order.postmates} name="postmates" onChange={this.onOrderFormChange.bind(this)} placeholder={ORDER_MTHODS_COPY['postmates']} />
              <input type='url' className="form-control" value={form.order.grubhub} name="grubhub" onChange={this.onOrderFormChange.bind(this)} placeholder={ORDER_MTHODS_COPY['grubhub']} />
              <input type='url' className="form-control" value={form.order.UberEat} name="UberEat" onChange={this.onOrderFormChange.bind(this)} placeholder={ORDER_MTHODS_COPY['ubereats']} />
              <input type='url' className="form-control" value={form.order.yelp} name="yelp" onChange={this.onOrderFormChange.bind(this)} placeholder={ORDER_MTHODS_COPY['yelp']} />
              <textarea rows={5} type='string' className="form-control" value={form.order.others.split(MULTI_LINE_SEPERATOR).join('\n')} name="others" onChange={this.onOrderFormChange.bind(this)} placeholder={`other notes`} />
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
  onImageUploadingDrop(acceptedFiles, rejectedFiles) {
    const group = this.state.modal.group;
    this.props.uploadImagesToItem(acceptedFiles, this.props.focusport._id, group);
  }
  onDragEnter(type) {
    this.setState({ imageDraggingClass: type })
  }
  onDragLeave(type) {
    this.setState({ imageDraggingClass: type })
  }
  getAllImages(imgs) {
    const dict = {
      menu: [],
      food: []
    }
    for(let img in imgs) {
      img = imgs[img]
      const g = img.group;
      if(!dict[g]){
        dict[g] = []
      }
      dict[g].push(img)
    }
    return dict;
  }
  renderCurrentImages(imgs) {
    const images = this.getAllImages(imgs);
    const keys = Object.keys(images);
    return keys.map(group => {
      const groupImages = images[group];
      return (<div key={group}>
        <div className='session-title'><span/>{group} Photos</div>
        <div className='img-container'>
          {groupImages.length > 0 && groupImages.map(img=>{
            return (<div onClick={this.activateImageSlider.bind(this, img._id, group)} className='img-frame' key={img.lastUpdatedAt}>
              <img className='img' src={img.src} />
            </div>)
          })||<div onClick={this.activateImageSlider.bind(this, '', group)} className='img-frame holder'>
            <i className="fas fa-cloud-upload-alt"></i>
            Upload {group} Photos
          </div>}
        </div>
      </div>)
    })
  }
  renderImageUploadingModal(show) {
    return (
      <Modal className='image-uploading-modal' show={show} onHide={() => this.setState({ ...this.state, edittingImages: false })}>
        <Modal.Header closeButton>
          {/* <Modal.Title>Upload public photos of {this.props.focusport.details.title}</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <div>
            <ImageSlider group={this.state.modal.group} data={this.getAllImages(this.props.focusport.details.images)} activeIndex={this.state.modal.imageActiveIndex}/>
          </div>
          <div className='image-dropping-container'>
            <Dropzone
              onDragEnter={this.onDragEnter.bind(this, 'draggingOverEntering')}
              onDragLeave={this.onDragLeave.bind(this, 'draggingOverLeaving')}
              className={`image-uploader ${this.state.imageDraggingClass}`}
              accept="image/jpeg, image/png"
              onDrop={this.onImageUploadingDrop.bind(this)}
            >
              {!this.props.imageUploadingStatus && <div>
                <div className='drag-title'>Add photos</div>
                <div className='drag-subtitle'>Or, if you prefer...</div>
                <div className='upload-btn'>Choose photos to upload</div>
              </div>}
              {this.props.imageUploadingStatus == 'done' && <div>
                <div className='drag-title'>Add photos</div>
                <div className='drag-subtitle'>Or, if you prefer...</div>
                <div className='upload-btn'>Choose photos to upload</div>
              </div>}
              {this.props.imageUploadingStatus && this.props.imageUploadingStatus.length > 5 && <div className='image-uploading-status'>
                <div className='blurr'>
                  <div className='loader-component'>
                    <div className='circle-spinner'>
                      <div className='double-bounce1' />
                      <div className='double-bounce2'/>
                    </div>
                  </div>
                  <div className='uploading'>uploading</div>
                </div>
                <img className='img' src={`${this.props.imageUploadingStatus}`} />  
              </div>}
            </Dropzone>
            {this.props.imageUploadingStatus == 'done' && 
              <div onClick={() => this.setState({ ...this.state, edittingImages: false })} className='upload-btn finish-btn'>Finish and close</div>
            }
          </div>
        </Modal.Body>
      </Modal>
    )
  }
  render() {
    return (
      <div className='item-view-component'>
        {this.renderItemView(this.props.focusport)}
        {this.renderModal(this.state.editting)}
        {this.renderImageUploadingModal(this.state.edittingImages)}
        {this.state.show && <div aria-live="polite"
          aria-atomic="true" className="toast-container">
          <Toast className="toast" onClose={() => this.setState({ show: false })} show={this.state.show} delay={3000} autohide>
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded mr-2"
                alt=""
              />
              <span className="toast-title">Copied!</span>
            </Toast.Header>
            <Toast.Body>
              <div className="toast-content">URL is copied to your clipboard!</div>
            </Toast.Body>
          </Toast>
        </div>}
      </div>
    )
  }
}

function mapStateToProps({ item }) {
  const { focusport, imageUploadingStatus } = item;
  return { focusport, imageUploadingStatus }
}

export default connect(mapStateToProps, { createItem, editItem, uploadImagesToItem, uploadImagesStatusReset })(Item);
