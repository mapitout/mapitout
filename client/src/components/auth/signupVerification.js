import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import qs from 'qs';

import {signUserUp,verifyEmailToken,signupEmailReset} from '../../actions';
import { CenterCard121 } from '../utils';

class SignupVerification extends Component {
  constructor(){
    super();
    this.state = {
      email: '',
      loading: true,
      token: '',
      address: '',
      avatarChosen: null, // 0 for man or 1 for woman
      localError: ''
    }
  }
  componentWillUnmount(){
    this.props.signupEmailReset();
  }
  componentDidMount(){
    const params = qs.parse(this.context.router.history.location.search.split('?')[1])
    const {token, address} = params;
    this.setState({
      token, address
    })
    this.props.signupEmailReset();
    this.props.verifyEmailToken(token, address);
  }
  handleFormSubmit(data) {
    const {token, address, avatarChosen} = this.state;
    const avatarchoices = [
      'https://mapitout.s3.amazonaws.com/users/mascot/mascot-m.jpg',
      'https://mapitout.s3.amazonaws.com/users/mascot/mascot-w.jpg'
    ]
    data.email = address;
    data.avatar = avatarchoices[avatarChosen];
    if(data.avatar){
      if (data.password == data.password2) {
        this.props.signUserUp(token, data);
      }else{
        this.renderAlert('Please Verify Passwords');
      }
    }else{
      this.renderAlert('Choose One Avatar');
    }
  }
  renderAlert(msg){
    this.setState({
      localError: msg
    });
  }
  renderBorder(){
    const {emailTokenGood} = this.props;
    if(emailTokenGood==null){
      return 'card'
    }
    if(emailTokenGood){
      return 'card border-success'
    }else{
      return 'card border-warning'
    }
  }
  render() {
    return (
      <CenterCard121>
        <div className={this.renderBorder()}>
          <div className='card-body'>
            {this.renderLoading()}
          </div>
        </div>
      </CenterCard121>
    );
  }
  renderLoading(){
    const {address,localError} = this.state;
    const {handleSubmit, emailTokenGood, authUserError,signupEmailReset} = this.props;
    if(this.state.loading){
      return <div>Loading</div>
    }else{
      return <div>
        {emailTokenGood?(<div>
          <h3 className='card-title text-center text-success'>One Last step</h3>
          <div className='signup-title'>Account Information</div>
          <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} onChange={signupEmailReset}>
            <div className='form-group'>
              <Field
                name='username'
                type='text'
                component='input'
                className='form-control form-control-lg original-disable'
                disabled
                readOnly='true'
              />
            </div>
            <div className='form-group'>
              <Field
                name='firstName'
                type='text'
                component='input'
                className='form-control form-control-lg'
                placeholder='First Name'
                required/>
            </div>
            <div className='form-group'>
              <Field
                name='lastName'
                type='text'
                component='input'
                className='form-control form-control-lg'
                placeholder='Last Name'
                required/>
            </div>
            <div className='form-group'>
              <Field
                type='password'
                name='password'
                component='input'
                className='form-control form-control-lg'
                placeholder='your password'
                required
              />
            </div>
                    
            <div className='form-group'>
              <Field
                type='password'
                name='password2'
                component='input'
                className='form-control form-control-lg'
                placeholder='your password again'
                required/>
            </div>
            <div>
              <div className='signup-title'>Choose Your Avatar</div>
              <div className='form-group-row row'>
                <div className='col'>
                  <img className={`${(this.state.avatarChosen==0)}-img`} onClick={this.chooseAvatar.bind(this,0)} src='../../assets/icons/mascot-m.jpg'/>
                </div>
                <div className='col'>
                  <img className={`${(this.state.avatarChosen==1)}-img`} onClick={this.chooseAvatar.bind(this,1)} src='../../assets/icons/mascot-w.jpg'/>
                </div>
              </div>
            </div>
            <div style={{'padding': '15px 0px'}}>
              <button type='submit' className='btn btn-lg btn-success btn-block'>Join mapitout!</button>
            </div>
            {authUserError && <div className='alert alert-warning'>
              {authUserError}
            </div>}
            {localError && <div className='alert alert-warning'>
              {localError}
            </div>}
            <div className='form-group' style={{'fontSize': '0.7rem', 'opacity': '0.7', 'textAlign': 'center'}}>
              <hr style={{'margin': '10px 0px 20px'}}/>
                        To signup, you promise that:
                        1. You are <b>older than 18 years</b> old.&nbsp;
                        2. You have read and agreed with the <a><b>terms of use</b></a>&nbsp;
                        3. You have read and understand the <a><b>privacy policy</b></a>&nbsp;
                        4. Be nice and make this world a better to live in.
            </div>
            {!emailTokenGood&&<div style={{'paddingTop': '20px'}}>
              <Link to='/signup' className='btn btn-link btn-block'>You can signup here again</Link>
            </div>}
          </form>
        </div>)
          :(<div className='text-center '>
            <h3 className='card-title text-center text-warning'>Verification Expired</h3>
            <p>Verification Information sent to {address} is expired.</p>
            <div style={{'paddingTop': '20px'}}>
              <Link to='/signup' className='btn btn-light btn-lg btn-block'>Try Again</Link>
            </div>
          </div>)}
      </div>
    }
  }
  chooseAvatar(num){
    this.setState({
      avatarChosen: num
    })
  }
}

// function validate(formProps) {
//     const errors = {}
//     if(formProps.password !== formProps.password2){
//         errors.password = 'Password must match';
//     }
//     return errors;
// }

function mapStateToProps({signupVerification}) {
  const params = qs.parse(window.location.href.split('?')[1]);
  const {address} = params;
  const { emailTokenGood, authUserError } = signupVerification;
  if(address){
    return {
      emailTokenGood,
      authUserError,
      initialValues: {
        username: address
      }
    }
  }else{
    return {
      emailTokenGood,
      authUserError
    }
  }
}

SignupVerification.contextTypes = {
  router: PropTypes.object
}

export default connect(mapStateToProps, {signUserUp, verifyEmailToken,signupEmailReset})(reduxForm({
  form: 'signup'
})(SignupVerification));