import React, { Component } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import locationService from '../lib/locationService';

class SearchMap extends Component {

  constructor(props) {

    super(props);

    this.state = {
      viewport: {
        latitude: 41.5,
        longitude: 2.3,
        zoom: 10,
        bearing: 0,
        pitch: 0,
        width: '100vp',
        height: 700,
      },
      currentPosition: {
        latitude: null,
        longitude: null
      },
      selectedLocation: null,
      results: [],
      lastSearch: null
    }
  }

  componentDidMount() {

    const listener = e => {
      if (e.key === 'Escape') {
        this.setState({ selectedLocation: null });
      }
    };
    window.addEventListener('keydown', listener);
  };

  componentDidUpdate() {
    if (this.state.lastSearch + 1000 < Date.now()) {
      this.setState({ lastSearch: Date.now() });
      this.state.results = [];
      this.launchSearch();
    }
  }

  launchSearch = () => {

    const searchParams = {
      lat: this.state.viewport.latitude,
      lon: this.state.viewport.longitude,
      dist: 30000000
    }


    locationService.search(searchParams)
      .then((results) => {
        this.setState({ searchParams, results });
      })
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

  render() {
    const { viewport, selectedLocation } = this.state;

    return (
      <div className="search-map-page">
        <div className="current-location-button">
          <button onClick={this.locateUser}>Current location</button>
        </div>
        <div className="location-info">
          <img src='https://res.cloudinary.com/dslkk8z2m/image/upload/v1558967426/Film-Trails/laejr1op5ycwgxkq5atx.jpg'></img>
          <p>Title</p>
        </div>
        <div className="search-map">
          <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
            mapStyle='mapbox://styles/gusbe/cjw3cw74r0vw01cpiazy0w3f4'
            onViewportChange={this.changeView}
          >



            {this.state.results.map((Location) => (
              <Marker
                key={Location._id}
                latitude={Location.coords.coordinates[1]}
                longitude={Location.coords.coordinates[0]}
                offsetLeft={-8}
                offsetTop={-27}
              >
                <div
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ selectedLocation: Location })
                  }}
                >
                  <img src='/img/logo-red.svg' alt='pin' style={{ width: '16px' }} />
                </div>

              </Marker>
            ))}

            {this.state.currentPosition.latitude ? (
              <Marker
                key='currentLocation'
                latitude={this.state.currentPosition.latitude}
                longitude={this.state.currentPosition.longitude}
                offsetLeft={-10}
                offsetTop={-10}
              >
                <div>
                  <img src='/img/blue.svg' alt='currentPosition' style={{ width: '20px' }} />
                </div>
              </Marker>
            ) : null}

            {selectedLocation ? (
              <Popup
                latitude={selectedLocation.coords.coordinates[1]}
                longitude={selectedLocation.coords.coordinates[0]}
                onClose={() => this.setState({ selectedLocation: null })}
              >
                <div>
                  <h3>{selectedLocation.title}</h3>
                  <img src={selectedLocation.scenePictureUrl} alt='selectedLocation.title' style={{ width: '50px' }} />
                </div>
              </Popup>
            ) : null}
          </ReactMapGL>
        </div>
      </div>

    );
  }
}

export default SearchMap;