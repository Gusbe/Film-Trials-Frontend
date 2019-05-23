import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import locationService from './../services/locationService';
import Searcher from './../components/Searcher';
import ResultList from './../components/ResultList';


class Search extends Component {

  constructor(props){
    
    super(props);

    this.state = {
      results: []
    }

  }

  componentDidMount(){
    
    const searchParams = {
      lat : 42,
      lon : 2,
      dist : 150000
    }

    locationService.search(searchParams)
      .then( (results) => {
        this.setState({results});
      })
  }

  render(){    
    return (
      <div>
        <Searcher />
        <ResultList results={this.state.results}/>
      </div>
    );
  }


}


export default Search;