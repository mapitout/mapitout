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
  title: 'Analyze your transactions',
  description: 'Analyze bank transactions in a secure and reliable way.'
},{
  icon: 'customer-2.svg',
  title: 'Get Smart Ideas',
  description: 'Get ideas of what to unsubscribe and cancel.'
},{
  icon: 'customer-3.svg',
  title: 'Find peers',
  description: 'Find peers without reveal identity.'
},{
  icon: 'customer-4.svg',
  title: 'Save 40% on utility bills.',
  description: 'Reduce 40% on Spotify/Mobile/Insurance bills.'
},]

export default Feature;

