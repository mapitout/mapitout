import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Welcome extends React.Component {
  render() {
    return (
      <div className='welcome'>
        <div className='content-container'>
          <div className='title'>
            MapOut Useful Information
          </div>
          <div className='subtitle'>
            Share useful localtion based information with the world.
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
        <Link to='signup'>
          <button className='btn btn-success btn-block btn-lg try-it-out'>
            Try It Now
          </button>
        </Link>
      </div>)
    :(<div>
        <Link to='explore'>
          <button className='btn btn-success btn-block btn-lg try-it-out'>
            Explore now
          </button>
        </Link>
      </div>)
  }
}

const mapStateToProps = ({ auth }) => ({
  isLoggedin: auth.authenticated
});

export default connect(mapStateToProps, null)(Welcome);

