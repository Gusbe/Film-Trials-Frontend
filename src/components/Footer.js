import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Navbar extends Component {
  render() {
    return (
      <div className="footer">
        <div>
          <Link className="link-nav" to='/search-map'><img src="/img/user.png" alt='login'/><span>Search</span></Link>
        </div>
        <div>
          <Link className="link-nav" to='/location/add'><img src="/img/user.png" alt='login'/><span>Add location</span></Link>
        </div>
      </div>
    )
  }
}

export default Navbar;