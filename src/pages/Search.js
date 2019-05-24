import React, { Component } from 'react'

import locationService from '../lib/locationService';
import Searcher from './../components/Searcher';
import ResultList from './../components/ResultList';


class Search extends Component {

  constructor(props){
    
    super(props);

    this.state = {
      results: [],
      searchParams: {
        lat: 0,
        lon: 0,
        dist: 0
      }
    }

  }

  componentDidMount(){

    // locationService.search(this.state.searchParams)
    //   .then( (results) => {
    //     this.setState({results});
    //   })
  }


  launchSearch = (searchParams) => {
    locationService.search(searchParams)
      .then((results) => {
        this.setState( { searchParams, results });
      })
  }

  render(){    
    return (
      <div>
        <Searcher launchSearch={this.launchSearch} />
        <ResultList results={this.state.results}/>
      </div>
    );
  }


}


export default Search;