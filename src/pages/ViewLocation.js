import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import locationService from '../lib/locationService';
import {withAuth} from '../providers/AuthProvider';

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
      owner: false
    }
  }

  componentDidMount(){
    
    const { id } = this.props.match.params;
    locationService.view(id)
    .then((location) => {
      
      const { _id, scenePictureUrl, title, coords, user } = location;

      let ownerState;
      if(this.props.user._id === user._id){
        ownerState = true;  
      }

      this.setState({
        id: _id,
        title,
        lat: coords.coordinates[1],
        lon: coords.coordinates[0],
        scenePictureUrl,
        author: user.username,
        owner: ownerState
      })
    })
  }

  render(){    
    return (
      <>
        <h2>{this.state.title}</h2>
        <img src={this.state.scenePictureUrl} alt={this.state.title}/>
        <p>Lon: {this.state.lon}</p>
        <p>Lat: {this.state.lat}</p>
        <p>Author: {this.state.author}</p>
        {this.state.owner ? <Link to={'/location/' + this.state.id + '/update'}>Update</Link> : null}
        {this.state.owner ? <Link to={'/location/' + this.state.id + '/delete'}>Delete</Link> : null}
      </>
    );
  }


}


export default withAuth(ViewLocation);