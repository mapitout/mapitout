import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export default function(ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      if (!localStorage.getItem('auth_jwt_token')) {
        this.context.router.history.push('/signin');
      }
    }

    componentWillUpdate(nextProps) {
      if (!localStorage.getItem('auth_jwt_token')) {
        this.context.router.history.push('/signin');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps({auth}) {
    return { authenticated: auth.authenticated };
  }
  Authentication.contextTypes = {
    router: PropTypes.object
  }

  return connect(mapStateToProps)(Authentication);
}