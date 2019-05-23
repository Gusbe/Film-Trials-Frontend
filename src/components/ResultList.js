import React, { Component } from 'react'
import OneResult from './OneResult';

class ResultList extends Component {

  constructor(props){
    super(props);
    this.state = {
  
    }

  }
  

  render() {
    const { results } = this.props;
    const resultList = results.map( (result) => {
      return (
       <div key={result._id}>
         <OneResult info={result}/>
       </div>
      );
    });


    return (
      <div>
        This is the result list
        {resultList}
      </div>
    )
  }
}

export default ResultList;