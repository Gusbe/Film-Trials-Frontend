import React, { Component } from 'react';

class Searcher extends Component {

  constructor(props){
    super(props);
    this.state = {
      lat: 0,
      lon: 0,
      dist: 0
    }
   
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    this.props.launchSearch(this.state);
  }

  

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <label name="lat">Latitude:</label>
        <input type="text" name="lat" value={this.state.lat} onChange={this.handleChange} />
        <label name="lon">Longitude:</label>
        <input type="text" name="lon" value={this.state.lon} onChange={this.handleChange} />
        <label name="dist">Distance:</label>
        <input type="text" name="dist" value={this.state.dist} onChange={this.handleChange} />
        <button type="submit">Find locations</button>
      </form>
    )
  }
}

export default Searcher
