import React, { Component } from 'react'
import { withAuth } from '../providers/AuthProvider';
import ReactMapGL, { Marker } from 'react-map-gl';

import locationService from '../lib/locationService';

class AddLocation extends Component {

  constructor() {
    super();
    this.state = {
      ownerState: false,
      id: '',
      title: '',
      lat: '',
      lon: '',
      placeName: '',
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
      uploadPicture: false
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    locationService.view(id)
    .then((location) => {
      
      const { _id, scenePictureUrl, title, coords, user, placeName } = location;

      let ownerState = false;
      if(this.props.user._id === user._id){
        ownerState = true;  
      }

      let viewport = {
        latitude: coords.coordinates[1],
        longitude: coords.coordinates[0],
        zoom: 12,
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
        placeName,
        scenePictureUrl,
        author: user.username,
        owner: ownerState,
        viewport
      })
    });
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
    this.setState({lat:savePosition.lat, lon:savePosition.lon});
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
      placeName: this.state.placeName,
      scenePictureUrl: this.state.scenePictureUrl,
      coords: {
        coordinates: [this.state.lon, this.state.lat],
        type: 'Point'
      }
    };

    locationService.update(this.state.id, locationObject)
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
    if(!this.controlButton() && this.state.disable){
      this.setState({disable: false});
    }
    else if(this.controlButton() && !this.state.disable){
      this.setState({disable: true});
    }
  }

  showUploadPicture = () => {
    this.setState({uploadPicture: true});
  }

  render() {
    const { viewport } = this.state;
    
    return (
      <div className='add-location-page'>
        <h2>Add a new movie location</h2>
        <div className='add-location'>
          <h3>Select location:</h3>
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
                  <img src='/img/blue.svg' alt='savePosition' style={{ width: '20px' }} />
                </div>
              </Marker>
            ) : null}

            {this.state.lat ? (
              <Marker
                key='saveLocation'
                latitude={this.state.lat}
                longitude={this.state.lon}
                offsetLeft={-8}
                offsetTop={-27}
              >
                <div>
                  <img src='/img/logo-orange.svg' alt='savePosition' style={{ width: '16px' }} />
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
            <h3>Place name:</h3>
            <input type="text" name="placeName" value={this.state.placeName} onChange={this.handleChange} />
            <h3>Movie title:</h3>
            <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
            <h3>Scene picture:</h3>
            <img className='picture-update' src={this.state.scenePictureUrl} alt="scene"/>
            
            {this.state.uploadPicture ? (
              <input type="file" onChange={this.fileOnchange} name="image" />
            ) : (
                <div className="edit-foto-content">
                  <p className="edit-foto" onClick={this.showUploadPicture}><img src="/img/pen.svg" alt="update" className="update-picture-icon" />Edit picture</p>
                </div>
              )}



            {this.state.disable ? <input id='add-button-disabled' type="submit" value='Complete all the fields' disabled></input> : <input id='add-button' type="submit"  value='Change location info'></input>}
          </form>
        </div>
      </div>
    );
  }
}

export default withAuth(AddLocation);