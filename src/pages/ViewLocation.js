import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import locationService from '../lib/locationService';
import { withAuth } from '../providers/AuthProvider';
import ReactMapGL, { Marker } from 'react-map-gl';

class ViewLocation extends Component {

  constructor(props) {

    super(props);

    this.state = {
      id: '',
      title: '',
      lat: '',
      lon: '',
      placeName: '',
      scenePictureUrl: '',
      author: '',
      info: '',
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
      },
      deleteLink: false,
      redirectSearch: false
    }
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    locationService.view(id)
      .then((location) => {

        const { _id, scenePictureUrl, title, coords, user, placeName, info } = location;

        let ownerState = false;
        if (this.props.user._id === user._id) {
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
          info,
          owner: ownerState,
          viewport
        })
      });
  }

  showDelete = () => {
    if (this.state.deleteLink) {
      this.setState({ deleteLink: false })
    }
    else {
      this.setState({ deleteLink: true })
    }
  }

  deleteElement = () => {
    const { id } = this.props.match.params;
    locationService.delete(id)
      .then((location) => {
        this.setState({ redirectSearch: true });
      });
  }


  render() {
    const { viewport, lat, lon } = this.state;
    return (
      <div className='view-page'>
        {this.state.redirectSearch ? (
          <Redirect to='/'></Redirect>
        ) : (
            <>



              <div className="view-image">
                <img src={this.state.scenePictureUrl} alt={this.state.title} />
                <p>Uploaded by: {this.state.author} </p>
              </div>




              <div className="view-title">
                <h1>{this.state.title}</h1>
                {this.state.placeName ? (
                  <h2>({this.state.placeName})</h2>
                ) : null}

              </div>












              <div className="view-map">
                {lat ? (
                  <ReactMapGL
                    {...viewport}
                    mapboxApiAccessToken={process.env.REACT_APP_MAP_TOKEN}
                    mapStyle='mapbox://styles/gusbe/cjw3cw74r0vw01cpiazy0w3f4'
                    className='view-map-wrap'
                  >

                    <Marker
                      key='sss'
                      latitude={lat}
                      longitude={lon}
                      offsetLeft={-8}
                      offsetTop={-27}
                    >
                      <div>
                        <img src='/img/logo-red.svg' alt='currentPosition' style={{ width: '20px', fill: 'red' }} />
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





              {this.state.info && this.state.info !== 'N/A' ? (
                <div className="movie-information">
                  <div className="info-plot">
                    {this.state.info.plot && this.state.info.plot !== 'N/A'? (
                      <p>
                        {this.state.info.plot}
                      </p>
                    ) : null}
                  </div>

                  <div className="info-container">

                    <div className="info-other">
                      {this.state.info.actors && this.state.info.actors !== 'N/A' ?  (
                        <p>
                          <strong>Cast:</strong><br />{this.state.info.actors}
                        </p>
                      ) : null}

                      {this.state.info.director && this.state.info.director !== 'N/A' ?  (
                        <p>
                          <strong>Director:</strong><br />{this.state.info.director}
                        </p>
                      ) : null}
                      {this.state.info.year && this.state.info.year !== 'N/A' ?  (
                        <p>
                          <strong>Year:</strong><br />{this.state.info.year}
                        </p>
                      ) : null}

                      {this.state.info.awards && this.state.info.awards !== 'N/A' ?  (
                        <p>
                          <strong>Awards:</strong><br />{this.state.info.awards}
                        </p>
                      ) : null}

                      {this.state.info.website && this.state.info.website !== 'N/A' ?  (
                        <p>
                          <a href={this.state.info.website} rel="noopener noreferrer" target="_blank">Official website</a>
                        </p>
                      ) : null}
                    </div>
                    {this.state.info.poster && this.state.info.poster !== 'N/A'? (
                      <div className="info-image">
                        <img src={this.state.info.poster} alt="poster" />
                      </div>
                    ) : null}


                  </div>


                </div>

              ) : null}










              {this.state.owner ? (
                <div className="view-links">
                  {this.state.deleteLink ? (
                    <p className='view-links-component'>
                      Do you really want to delete this location?
                <a href="#;" className='view-links-component-link' onClick={this.deleteElement}>
                        Yes
                </a>
                      <a href="#;" className='view-links-component-link' onClick={this.showDelete}>
                        No
                </a>
                    </p>
                  ) : (
                      <p className='view-links-component'>
                        <Link className='view-links-component-link' to={'/location/' + this.state.id + '/update'}>
                          <img src="/img/pen.svg" alt="update" className="update-icon" />
                          Update
                </Link>
                        <img src="/img/delete.svg" alt="delete" className="delete-icon" />
                        <a href="#;" className='view-links-component-link' onClick={this.showDelete}>Delete</a>
                      </p>
                    )}
                </div>
              ) : null}




            </>
          )}
      </div>
    );
  }
}


export default withAuth(ViewLocation);