import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import locationService from '../lib/locationService';
import {withAuth} from '../providers/AuthProvider';
import ReactMapGL, { Marker } from 'react-map-gl';

class ViewLocation extends Component {

  constructor(props){
    
    super(props);

    this.state = {
      id: '',
      title: '',
      lat: '',
      lon: '',
      scenePictureUrl: '',
      author: '',
      owner: false,
      viewport: {
        latitude: null,
        longitude: null,
        zoom: null,
        bearing: null,
        pitch: null,
        width: null,
        height: null
      },
      currentPosition: {
        latitude: null,
        longitude: null
      }
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    locationService.view(id)
    .then((location) => {
      
      const { _id, scenePictureUrl, title, coords, user } = location;

      let ownerState = false;
      if(this.props.user._id === user._id){
        ownerState = true;  
      }

      let viewport = {
        latitude: coords.coordinates[1],
        longitude: coords.coordinates[0],
        zoom: 14,
        bearing: 0,
        pitch: 0,
        width: '100vp',
        height: 150
      }

      this.setState({
        id: _id,
        title,
        lat: coords.coordinates[1],
        lon: coords.coordinates[0],
        scenePictureUrl,
        author: user.username,
        owner: ownerState,
        viewport
      })
    })
  }


  render() {
    const { viewport, lat, lon } = this.state;
    return (
      <div className='view-page'>
        <div className="view-map">
          {lat ? (
            <ReactMapGL
              {...viewport}
              mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
              mapStyle='mapbox://styles/gusbe/cjw3cw74r0vw01cpiazy0w3f4'
            >

              <Marker
                key='sss'
                latitude={lat}
                longitude={lon}
                offsetLeft={-10}
                offsetTop={-10}
              >
                <div>
                  <img src='/img/pin.png' alt='currentPosition' style={{ width: '20px' }} />
                </div>
              </Marker>

              {this.state.currentPosition.latitude ? (
                <Marker
                  key='currentLocation'
                  latitude={this.state.currentPosition.latitude}
                  longitude={this.state.currentPosition.longitude}
                  offsetLeft={-10}
                  offsetTop={-10}
                >
                  <div>
                    <img src='/img/pin.png' alt='currentPosition' style={{ width: '20px' }} />
                  </div>
                </Marker>
              ) : null}
            </ReactMapGL>
          ) : null}
        </div>
        <div className="view-title">
          <h1>{this.state.title}</h1>
        </div>
        <div className="view-image">
          <img src={this.state.scenePictureUrl} alt={this.state.title} />
          <p>Uploaded by: {this.state.author} </p>
        </div>

        {this.state.owner ? (
          <div className="view-links">
            <Link className='view-links-component' to={'/location/' + this.state.id + '/update'}>Update</Link>
            -
            <Link className='view-links-component' to={'/location/' + this.state.id + '/delete'}>Delete</Link>
          </div>
        ) : null}
      </div>
    );
  }
}


export default withAuth(ViewLocation);