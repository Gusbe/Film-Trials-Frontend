import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFound extends Component {
 
  render() {
    return (
        <div className='not-found'>
          <img src='/img/not-found.gif' alt='Not found'/>
          <p>This page doesn't exist! Go to the <Link to='/'>Map search</Link></p>
        </div>
    )
  }
}

export default NotFound;