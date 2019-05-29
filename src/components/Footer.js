import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Navbar extends Component {
  render() {
    return (
      <div className="footer">
        <div>
          <Link className="link-nav" to='/'><img src="/img/map-icon.svg" alt='Map Search'/></Link>
        </div>
        <div>
          <Link className="link-nav" to='/search'><img src="/img/search-list.svg" alt='Search List'/></Link>
        </div>
        <div>
          <Link className="link-nav" to='/location/add'><img src="/img/map-add.svg" alt='Map Add'/></Link>
        </div>
      </div>
    )
  }
}

export default Navbar;