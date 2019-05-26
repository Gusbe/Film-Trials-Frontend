import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../providers/AuthProvider';

import Logo from './Logo';

class Navbar extends Component {
  render() {
    const { isLogged, user, logout } = this.props;
    const { username } = user;
    if (isLogged) {
      return (
        <div className="navbar">
          <Logo />
          <div className="logout">
            <p onClick={logout}>
              <span>{username}</span>
              <img src='/img/logout.png' alt='logout' /></p></div>
        </div>
      )
    } else {
      return (
        <div className="navbar">
          <Logo />
          <div className="login">
            <Link className="link-nav" to='/login'><img src="/img/user.png" alt='login'/></Link>
          </div>
        </div>
      )
    }
  }
}

export default withAuth(Navbar);