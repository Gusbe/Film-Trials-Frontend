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
        width: 500,
        height: 500,
      },
      currentPosition: {
        latitude: null,
        longitude: null
      },
      savePosition: null
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
    this.setState({ [name]: value });
  }





  fileOnchange = (event) => {
    const file = event.target.files[0];
    const uploadData = new FormData()
    uploadData.append('photo', file)

    locationService.imageUpload(uploadData)
      .then((scenePictureUrl) => {
        this.setState({
          scenePictureUrl,
          disable: false,
        })
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

  render() {
    const { viewport } = this.state;

    return (
      <>
        <button onClick={this.locateUser}>CURRENT LOCATION</button>

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
            <img src='./../img/pin.png' alt='savePosition' style={{ width: '16px' } } />
            </div>
            </Marker>
          ) : null}


        </ReactMapGL>



        <form onSubmit={this.handleFormSubmit}>
          <label name="title">Title:</label>
          <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
          <label name="lon">Lon:</label>
          <input type="text" name="lon" value={this.state.lon} onChange={this.handleChange} />
          <label name="lat">Lat:</label>
          <input type="text" name="lat" value={this.state.lat} onChange={this.handleChange} />


          <label name="image">Image</label>
          <input type="file" onChange={this.fileOnchange} name="image" />

          {this.state.disable ? <input type="submit" disabled></input> : <input type="submit"></input>}

        </form >
      </>
    );
  }
}

export default withAuth(AddLocation);