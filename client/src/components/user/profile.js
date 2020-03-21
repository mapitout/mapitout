import React from 'react';
import { connect } from 'react-redux';

import { getUserProfile } from '../../actions';
import { CenterCard121 } from '../utils';

class Profile extends React.Component {
  constructor(){
    super();
    this.state = {}
  }
  componentDidMount(){
    this.props.getUserProfile();
  }
  render() {
    let {profile} = this.props;
    return (
      <CenterCard121>
        <div className='card'>
        <div className='card-body'>
          {profile && profile._id}
        </div>
        </div>
      </CenterCard121>
    );
  }
}

function mapStateToProps({profile}) {
  return { profile }
}


export default connect(mapStateToProps, { getUserProfile })(Profile);