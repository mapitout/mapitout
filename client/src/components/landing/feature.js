import React from 'react';
import { SquareLoader } from '../utils';

class Feature extends React.Component {
  render() {
    return (
      <div className='feature-component container'>
        <div className='row'>
          {this.renderFeatures()}
        </div>
      </div>)
  }
  
  renderFeatures(){
    return featuresList.map(f=>(
      <div className='col-sm-12 col-md-6 feature-item' key={f.title}>
        <div className='item-icon'>
          {this.renderImage(f)}
        </div>
        <div className='item-title'>{f.title}</div>
        <div className='item-description'>{f.description}</div>
      </div>
    ))
  }
  renderImage(f){
    if(<img src={`../../assets/svgs/${f.icon}`}/>){
      return <img className='item-image' src={`../../assets/svgs/${f.icon}`}/>
    }
    return (<SquareLoader/>);
  }
}

const featuresList = [{
  icon: 'customer-1.svg',
  title: 'Help Small Bussiness',
  description: 'Order and help local small bussiness owners.'
},{
  icon: 'customer-2.svg',
  title: 'Explore New Things Near You',
  description: 'Explore local bussiness on the easy-to-use map.'
},{
  icon: 'customer-3.svg',
  title: 'Sharing With Caring',
  description: 'Make the neighborhood full of love and support.'
},{
  icon: 'customer-4.svg',
  title: 'Thrive Together',
  description: 'Thrive with the community during pandemic.'
},]

export default Feature;

