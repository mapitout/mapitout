import React, { Component } from 'react';
import Recaptcha from 'react-recaptcha';
let recaptchaInstance;
const resetRecaptcha = () => {
  recaptchaInstance.reset();
};
export class RecaptchaComponent extends Component {
  componentDidMount(){
    resetRecaptcha();
    window.onloadCallback = () => console.log('Recaptcha loaded')
  }
  componentWillUnmount(){
    resetRecaptcha();
  }
  render() {
    return (
      <div>
        <Recaptcha
          ref={e => recaptchaInstance = e}
          sitekey="6LfHB-MUAAAAALToDg6S4pNIc4mQGhbdozuVjjOz"
          render="explicit"
          verifyCallback={this.props.verify}
          onloadCallback={() => console.log('Recaptcha loaded')}
        />
      </div>
    );
  }
}
