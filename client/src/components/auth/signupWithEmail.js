import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { RecaptchaComponent, CenterCard121 } from '../utils';
import { signupWithEmail, signupWithEmailReset } from '../../actions';
let INITIAL_STATE = {
    recaptchaGood: window.location.href.includes('localhost'),
    errorMsg: null
}

class SignupWithEmail extends React.Component {
    constructor(){
        super();
        this.state = {
            recaptchaGood: window.location.href.includes('localhost'),
            errorMsg: null
        };
    }
    componentDidMount(){
        this.resetStateAndProps();
    }
    componentWillUnmount(){
        this.resetStateAndProps();
    }
    renderAlert(error) {
        let errorMsg = error || this.props.errorMsg || this.state.errorMsg
        if (errorMsg) {
            return (
                <div className='alert alert-warning'>
                    <strong>Oops!
                    </strong> {errorMsg}
                </div>
            )
        }
    }
    handleFormSubmit({email}) {
        if(this.state.recaptchaGood){
            this.props.signupWithEmail(email);
        }else{
            this.setState({
                errorMsg: 'Recaptcha Failed, the page will be refreshed in 2 seconds.'
            })
            setTimeout(()=>{
                window.location.reload(true);
            }, 2000)
        }
    }
    render() {
        return (
            <div className='auth-component'>
                <CenterCard121>
                    <div className='card'>
                    <h4 className='card-header'>
                        Sign Up
                    </h4>
                    <div className='card-body'>
                        {this.renderForm()}
                    </div>
                    </div>
                </CenterCard121>
            </div>
        );
    }
    resetStateAndProps(){
        this.setState(INITIAL_STATE)
        this.props.signupWithEmailReset();
    }
    renderForm(){
        const { handleSubmit,emailStateError,emailSentTo, submitting } = this.props;
        const isBetaOnly = true;
        if(isBetaOnly && emailSentTo && emailSentTo.length > 1) {
            return (<div className='alert alert-success'>
                <h4 className='alert-heading'>Activiation Email sent!</h4>
                    Activiation email will be sent to <b>{emailSentTo}</b>!
                </div>)
        }else if(emailSentTo && emailSentTo.length > 1) {
            return(<div className='alert alert-success'>
                <h4 className='alert-heading'>Almost there!</h4>
                Verification email is sent to <b>{emailSentTo}</b>
                <hr/>Please check your inbox or trash/junk box. The activation code will be expired in 60 minutes...
            </div>)
        }else{
            return(<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} onChange={this.resetStateAndProps.bind(this)}>
                <div className='form-group'>
                    <label>
                        Email: {emailStateError&&<span className='danger-hint'><i className='fas fa-exclamation-circle'></i>{emailStateError}</span>}
                    </label>
                    <Field
                        type= 'email'
                        name='email'
                        component='input'
                        className={`form-control form-control-lg ${(emailStateError)?'is-invalid':''}`}
                        placeholder='your email adddress'
                        required
                    />
                </div>
                {this.renderAlert()}
                <div>
                    <div style={{'margin': '20px auto'}}>
                        {!this.state.recaptchaGood ? <RecaptchaComponent verify={this.recaptchaVerifyCallback.bind(this)}/>:<div></div>}
                    </div>
                    <button type='submit' disabled={submitting} className='btn btn-lg btn-success btn-block'>Send Me Activation</button>
                </div>
                <div style={{'paddingTop': '20px'}}>
                    <Link to='/signin' className='btn btn-link btn-block'>Have an account? Sign in here</Link>
                </div>
            </form>)
        }
    }
    recaptchaVerifyCallback(){
        this.setState({
            recaptchaGood: true
        })
    }
}

function mapStateToProps({signupWithEmail}) {
    const {emailStateError, emailSentTo} = signupWithEmail;
    return {
        emailStateError,
        emailSentTo
    }
}

SignupWithEmail.contextTypes = {
    router: PropTypes.object
}

export default connect(mapStateToProps, {signupWithEmail, signupWithEmailReset})(reduxForm({
    form: 'SignupWithEmail'
})(SignupWithEmail));