import React, { Component } from 'react'
import ReactMapGL, { Marker } from 'react-map-gl';

import locationService from '../lib/locationService';
import ResultList from './../components/ResultList';


class Search extends Component {

  constructor(props) {

    super(props);

    this.state = {
      results: [],
      searchParams: {
        lat: -42.967645,
        lon: 171.885557,
        dist: 1000
      },
      viewport: {
        latitude: -42.967645,
        longitude: 171.885557,
        zoom: 4,
        bearing: 0,
        pitch: 0,
        width: '100vp',
        height: 300,
      },
      currentPosition: {
        latitude: null,
        longitude: null
      },
      savePosition: {
        lon: 171.885557,
        lat: -42.967645
      },
      detailPosition: {
        lon: null,
        lat: null
      },
      lastSearch: null
    }
  }

  componentDidUpdate() {
    if (this.state.lastSearch + 1000 < Date.now()) {
      this.setState({ lastSearch: Date.now() });
      this.launchSearch();
    }
  }


  launchSearch = () => {
    let latSearch;
    let lonSearch;
    if (this.state.savePosition !== null) {
      latSearch = this.state.savePosition.lat;
      lonSearch = this.state.savePosition.lon;
    }
    else {
      latSearch = this.state.viewport.latitude;
      lonSearch = this.state.viewport.longitude;
    }

    let d = 0;
    let z = this.state.viewport.zoom;
    if (z < 2) d = 13000000 / 2;
    else if (z < 3) d = 10000000 / 2;
    else if (z < 4) d = 4000000 / 2;
    else if (z < 5) d = 2700000 / 2;
    else if (z < 6) d = 1500000 / 2;
    else if (z < 7) d = 700000 / 2;
    else if (z < 8) d = 350000 / 2;
    else if (z < 9) d = 182000 / 2;
    else if (z < 10) d = 85000 / 2;
    else if (z < 11) d = 43000 / 2;
    else if (z < 12) d = 25000 / 2;
    else if (z < 13) d = 13000 / 2;
    else if (z < 14) d = 5000 / 2;
    else if (z < 15) d = 2500 / 2;
    else if (z < 16) d = 1300 / 2;

    const searchParams = {
      lat: latSearch,
      lon: lonSearch,
      dist: d
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
      const savePosition = {
        lon: position.coords.longitude,
        lat: position.coords.latitude
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
      this.setState({ currentPosition, savePosition, viewport: newViewport });
    });
  }

  handleClick = (ev) => {
    window.scrollTo(0, 0);
    const savePosition = {
      lon: ev.lngLat[0],
      lat: ev.lngLat[1]
    }
    this.setState({ savePosition, lat: savePosition.lat, lon: savePosition.lon });
  };

  changeDetailMarker = (pos) => {
    this.setState({ detailPosition: pos });
  }



  render() {
    const { viewport } = this.state;

    return (
      <div className='search-list-page'>

        

        <div className="list-map">
        <button className='list-current-location-button' onClick={this.locateUser}>Current location</button>
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

            

            {this.state.savePosition ? (
              <Marker
                key='saveLocation'
                latitude={this.state.savePosition.lat}
                longitude={this.state.savePosition.lon}
                offsetLeft={-13}
                offsetTop={-27}
              >
                <div>
                  <img src='/img/pin-search.svg' alt='savePosition' style={{ width: '26px' }} />
                </div>
              </Marker>
            ) : null}





            {this.state.results.map((Location) => (
              <Marker
                key={Location._id}
                latitude={Location.coords.coordinates[1]}
                longitude={Location.coords.coordinates[0]}
                offsetLeft={-10}
                offsetTop={-10}
              >
                <div>
                  <img src='/img/logo-red.svg' alt='pin' style={{ width: '16px' }} />
                </div>

              </Marker>
            ))}

            {this.state.detailPosition.lon ? (
              <Marker
                key='detailPosition'
                latitude={this.state.detailPosition.lat}
                longitude={this.state.detailPosition.lon}
                offsetLeft={-10}
                offsetTop={-10}
              >
                <div>
                  <img src='/img/logo-orange.svg' alt='savePosition' style={{ width: '16px' }} />
                </div>
              </Marker>
            ) : null}




          </ReactMapGL>
        </div>
        <div className="result-list">
          <h2>{this.state.results.length} film locations</h2>
          <ResultList results={this.state.results} changeDetailMarker={this.changeDetailMarker} />
        </div>
      </div>
    );
  }


}


export default Search;