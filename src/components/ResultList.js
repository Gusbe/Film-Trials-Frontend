import React, { Component } from 'react'
import OneResult from './OneResult';

class ResultList extends Component {

  

  render() {
    const { results } = this.props;
    const resultList = results.map( (result) => {
      return (
       <div key={result._id}>
         <OneResult info={result} changeDetailMarker={this.props.changeDetailMarker}/>
       </div>
      );
    });


    return (
      <div>
        {resultList}
      </div>
    )
  }
}

export default ResultList;