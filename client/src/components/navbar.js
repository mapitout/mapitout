import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';
import { getUserProfile } from '../actions';
import PropTypes from 'prop-types';

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      pathname: '',
      toggle: false
    }
  }
  componentDidMount() {
    this.props.getUserProfile();
    const pathname = this.context.router.history.location.pathname;
    this.setState({ pathname })
  }
  renderClass(base, router) {
    return (this.state.pathname.indexOf(router) != -1) ? `${base} mapitout-active` : base;
  }
  toggleDropDown() {
    this.setState({ toggle: !this.state.toggle })
  }
  renderSignButton() {
    const { isLoggedIn, profile } = this.props;
    if (isLoggedIn && profile.name) {
      return (
        <span>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" onClick={this.toggleDropDown.bind(this)} href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {profile.name.first}
            </a>
            <div className={this.state.toggle ? "dropdown-menu show" : "dropdown-menu"} onClick={this.toggleDropDown.bind(this)} aria-labelledby="navbarDropdown">
              <NavLink className='dropdown-item' to="/user">Profile</NavLink>
              <div className="dropdown-divider"></div>
              <NavLink className="dropdown-item" to="/signout">Log Out</NavLink>
            </div>
          </li>
        </span>
      )
    } else {
      return (
        [
          <li className="nav-item" key="1">
            <NavLink to="/signin" className="nav-link">Sign in</NavLink>
          </li>,
          <li className="nav-item" key="2">
            <NavLink to="/signup" className="nav-link hightlight">Sign Up</NavLink>
          </li>
        ]
      )
    }
  }
  render() {
    return (
      <nav className="navbar navbar-expand navbar-light">
        <LoadingBar className='mapitout-loading-bar' />
        <a className="navbar-brand" href="/">
          <div className="logo-big">
            MapItOut
          </div>
          {/* <img src="../assets/svgs/mapitout-logo.svg" height="30" className='main-navbar-logo'/> */}
          {/* <img src="../assets/svgs/logo-long.svg" height="30" className='d-none d-sm-block'/> */}
        </a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-auto">
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <div className="fb-like nav-link" data-href="https://www.facebook.com/mapitoutapp" data-width="200" data-layout="button_count" data-action="like" data-size="large" data-share="false"></div>
            </li>
            <li className="nav-item">
              <NavLink className={this.renderClass('nav-link', 'maps')} to="/maps">Maps</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={this.renderClass('nav-link', 'covid19')} to="/covid19">Covid19</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

function mapStateToProps({ auth, profile }) {
  return {
    isLoggedIn: auth.authenticated,
    profile: profile,
    isAdmin: auth.isAdmin
  }
}

Navbar.contextTypes = {
  router: PropTypes.object
}

export default connect(mapStateToProps, { getUserProfile })(Navbar)