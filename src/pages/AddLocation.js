import React, { Component } from 'react'
import { withAuth } from '../providers/AuthProvider';

import locationService from '../lib/locationService';

class AddLocation extends Component {

  constructor(){
    super();
    this.state = {
      title: '',
      lat: '',
      lon: '',
      scenePictureUrl: '',
      disable: true
    }
  }

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
      .then(( data ) => {
        this.props.history.push('/location/' + data._id);
      });
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <label name="title">Title:</label>
        <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
        <label name="lon">Lon:</label>
        <input type="text" name="lon" value={this.state.lon} onChange={this.handleChange} />
        <label name="lat">Lat:</label>
        <input type="text" name="lat" value={this.state.lat} onChange={this.handleChange} />


        <label name="image">Image</label>
        <input type="file" onChange={this.fileOnchange} name="image"/>

        {this.state.disable ? <input type="submit" disabled></input> : <input type="submit"></input>}

      </form >
    );
  }
}

export default withAuth(AddLocation);