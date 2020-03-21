import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Welcome extends React.Component {
  render() {
    return (
      <div className='welcome'>
        <div className='content-container'>
          <div className='title'>
            Improve your monthly spend!
          </div>
          <div className='subtitle'>
            Find peers to split spotify/mobile/insurance bills.
          </div>
          <div  className='button-container'>
            {this.renderButton()}
          </div>
        </div>
      </div>)
  }
  renderButton(){
    return (!this.props.isLoggedin)?(
      <div>
        <Link className='btn btn-primary btn-block btn-lg try-it-out' to='signup'>Try It Now</Link>
      </div>)
    :(<div>
        <Link className='btn btn-primary btn-block btn-lg' to='pocket'>My Pocket</Link>
      </div>)
  }
}

const mapStateToProps = ({ auth }) => ({
  isLoggedin: auth.authenticated
});

export default connect(mapStateToProps, null)(Welcome);

