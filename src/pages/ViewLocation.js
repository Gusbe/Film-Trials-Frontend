import React, { Component } from 'react'
import locationService from './../services/locationService';

class ViewLocation extends Component {

  constructor(props){
    
    super(props);

    this.state = {
      title: '',
      lat: '',
      lon: '',
      scenePictureUrl: ''
    }

  }

  componentDidMount(){
    const { id } = this.props.match.params;
    locationService.view(id)
    .then((location) => {
      
      const { _id, scenePictureUrl, title, coords } = location;
      this.setState({
        id: _id,
        title,
        lat: coords.coordinates[1],
        lon: coords.coordinates[0],
        scenePictureUrl
      })
    })
  }

  render(){
    return (
      <div>
        <h2>{this.state.title}</h2>
        <img src={this.state.scenePictureUrl} alt={this.state.title}/>
        <p>Lon: {this.state.lon}</p>
        <p>Lat: {this.state.lat}</p>
      </div>
    );
  }


}


export default ViewLocation;