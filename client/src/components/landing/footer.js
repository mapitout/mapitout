import React from 'react';
import {Link} from 'react-router-dom';

class Footer extends React.Component {
  render() {
    return (
      <div className='footer-component'>
      <div className='container'>
        <div className='row'>
          {this.renderModules(data)}
        </div>  
      </div>
      </div>)
  }
  renderModules(modules){
    return modules.map(m=>(
      <div className='footer-modules col-xs-12 col-sm-4' key={m.module}>
        <div className='module-title'>{m.module}</div>
        {this.renderLinks(m.list)}
      </div>
    ))
  }
  renderLinks(list){
    return list.map(l=>(
      <div key={l.title} className='module-link'>
        {l.outer_link&&
          <div><a href={l.outer_link} target='_blank' rel="noopener noreferrer">{l.title}</a></div>}
        {l.link&&
          <div><Link to={`${l.link}`}>{l.title}</Link></div>}
      </div>
    ))
  }
}

export default Footer;

const data = [{
  module: 'Company',
  list:[{
    title: 'About',
    link: '/company/about'
  },{
    title: 'Join Us',
    link: '/company/career'
  },{
    title: 'Press Kit',
    link: '/company/press'
  },{
    title: 'Contact Us',
    link: '/company/about'
  },{
    title: 'Privacy Policy',
    link: '/company/legal'
  },{
    title: 'Tersm of Servie',
    link: '/company/legal'
  }]
},{
  module: 'Social',
  list:[{
    title: 'Facebook',
    outer_link: 'https://facebook.com/mapitout'
  },{
    title: 'Medium Blog',
    outer_link: 'https://medium.com/mapitout'
  },{
    title: 'Github',
    outer_link: 'https://github.com/mapitout'
  },{
    title: 'Twitter',
    outer_link: 'https://twitter.com/mapitout_team'
  }]
}]