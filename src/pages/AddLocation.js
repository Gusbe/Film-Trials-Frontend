import React, { Component } from 'react'
import { withAuth } from '../providers/AuthProvider';
import ReactMapGL, { Marker } from 'react-map-gl';

import locationService from '../lib/locationService';

class AddLocation extends Component {

  constructor() {
    super();
    this.state = {
      title: '',
      lat: '',
      lon: '',
      scenePictureUrl: '',
      disable: true,
      viewport: {
        latitude: 41.5,
        longitude: 2.3,
        zoom: 10,
        bearing: 0,
        pitch: 0,
        width: '100vp',
        height: 200,
      },
      currentPosition: {
        latitude: null,
        longitude: null
      },
      savePosition: null,
      disable: true
    }
  }

  changeView = (viewport) => {
    this.setState({ viewport });
  }

  locateUser = () => {
    navigator.geolocation.getCurrentPosition(position => {

      const currentPosition = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }
      const newViewport = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: this.state.viewport.zoom,
        bearing: this.state.viewport.bearing,
        pitch: this.state.viewport.pitch,
        width: this.state.viewport.width,
        height: this.state.viewport.height
      }
      this.setState({ currentPosition, viewport: newViewport });
    });
  }

  handleClick = (ev) => {
    
    const savePosition = {
      lon: ev.lngLat[0],
      lat: ev.lngLat[1]
    }
    this.setState({savePosition, lat:savePosition.lat, lon:savePosition.lon});
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value});
  }

  fileOnchange = (event) => {
    const file = event.target.files[0];
    const uploadData = new FormData()
    uploadData.append('photo', file)

    locationService.imageUpload(uploadData)
      .then((scenePictureUrl) => {
        this.setState({scenePictureUrl})
      })
      .catch((error) => console.log(error))
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    const locationObject = {
      title: this.state.title,
      scenePictureUrl: this.state.scenePictureUrl,
      coords: {
        coordinates: [this.state.lon, this.state.lat],
        type: 'Point'
      }
    };

    locationService.add(locationObject)
      .then((data) => {
        this.props.history.push('/location/' + data._id);
      });
  }

  controlButton = () => {
    if (
      this.state.title
      && this.state.scenePictureUrl
      && this.state.lat
      && this.state.lon
    ){
      return false
    }
    else{
      return true;
    }
  }

  componentDidUpdate() {
    console.log("CHECKING...");
    if(!this.controlButton() && this.state.disable){
      console.log('Canvio a enable!');
      this.setState({disable: false});
    }
    else if(this.controlButton() && !this.state.disable){
      console.log('Canvio a disable!');
      this.setState({disable: true});
    }
  }

  render() {
    const { viewport } = this.state;
    
    return (
      <div className='add-location-page'>
        <h2>Add a new movie location</h2>
        <div className='add-location'>
          <h3>1. Select location:</h3>
          <button className='get-location-button' onClick={this.locateUser}>Current location</button>
        </div>
        <div className="add-map">
          <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
            mapStyle='mapbox://styles/gusbe/cjw3cw74r0vw01cpiazy0w3f4'
            onViewportChange={this.changeView}
            onClick={this.handleClick}
          >

            {this.state.currentPosition.latitude ? (
              <Marker
                key='currentLocation'
                latitude={this.state.currentPosition.latitude}
                longitude={this.state.currentPosition.longitude}
                offsetLeft={-10}
                offsetTop={-10}
              >
                <div>
                  <img src='./../img/blue.svg' alt='savePosition' style={{ width: '20px' }} />
                </div>
              </Marker>
            ) : null}

            {this.state.savePosition ? (
              <Marker
                key='saveLocation'
                latitude={this.state.savePosition.lat}
                longitude={this.state.savePosition.lon}
                offsetLeft={-8}
                offsetTop={-27}
              >
                <div>
                  <img src='./../img/pin.png' alt='savePosition' style={{ width: '16px' }} />
                </div>
              </Marker>
            ) : null}


          </ReactMapGL>
        </div>
        <div className="add-form">
          <form onSubmit={this.handleFormSubmit}>
            <label className='lat-lon-inputs' name="lon">Lon:</label>
            <input className='lat-lon-inputs' type="text" name="lon" value={this.state.lon} onChange={this.handleChange} />
            <label className='lat-lon-inputs' name="lat">Lat:</label>
            <input className='lat-lon-inputs' type="text" name="lat" value={this.state.lat} onChange={this.handleChange} />
            <h3>2. Movie title:</h3>
            <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
            <h3>3. Upload a scene picture:</h3>
            <input type="file" onChange={this.fileOnchange} name="image" />
            {this.state.disable ? <input id='add-button-disabled' type="submit" value='Complete all the fields' disabled></input> : <input id='add-button' type="submit"  value='Send new location'></input>}
          </form>
        </div>
      </div>
    );
  }
}

export default withAuth(AddLocation);