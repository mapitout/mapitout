import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Welcome extends React.Component {
  render() {
    return (
      <div className='welcome'>
        <div className='content-container'>
          <div className='title'>
            Map Out To Help
          </div>
          <div className='subtitle'>
            Help mapping out local restaurants and support their business
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
        <Link to='maps'>
          <button className='btn btn-block btn-lg btn-landing'>
            Map It Now
          </button>
        </Link>
      </div>)
      :(<div>
        <Link to='maps'>
          <button className='btn btn-block btn-lg btn-landing'>
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

