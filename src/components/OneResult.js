import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

class OneResult extends Component {

  constructor(props){

    super(props);

    this.state = {
      distance: props.info.distance,
      scenePictureUrl: props.info.scenePictureUrl,
      title: props.info.title,
      _id: props.info._id,
      placeName: props.info.placeName
    }
  
  }

  showMarker = () => {
    console.log('Mouse over');
  }

  unshowMarker = () => {
    console.log('Mouse out');
  }
  

  render() {
    let distance;
  if(this.state.distance/1000 < 1) distance = `${Math.trunc(this.state.distance)} meters`;
  else if(this.state.distance/1000 < 5) distance = `${(this.state.distance/1000).toFixed(2)} Kms`;
  else distance = `${Math.trunc(this.state.distance/1000)-1} Kms`;
  return (
    <Link to={`/location/${this.state._id}`} className='link-location'>
      <div className="one-result" >

        <div className="location-info-one-result" style={{ backgroundImage: 'url(' + this.state.scenePictureUrl + ')' }} />
        <div className="title-distance">
          <p id="title-one-result">{this.state.title}</p>
          <div className="place-distance">
            <p id="place-one-result">{this.state.placeName}</p>
            <p id="distance-one-result">{distance}</p>
          </div>

        </div>

      </div>
      </Link>
  )
  }
}

export default OneResult;
