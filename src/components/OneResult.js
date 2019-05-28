import React from 'react'

function OneResult(props) {
  let distance;
  if(props.info.distance/1000 < 1) distance = `${Math.trunc(props.info.distance)} meters`;
  else if(props.info.distance/1000 < 5) distance = `${(props.info.distance/1000).toFixed(2)} Kms`;
  else distance = `${Math.trunc(props.info.distance/1000)-1} Kms`;

  return (
    <div className="one-result">

      <div className="location-info-one-result" style={{ backgroundImage: 'url(' + props.info.scenePictureUrl + ')' }} />
      <div className="title-distance">
        <p id="title-one-result">{props.info.title}</p>
        <div className="place-distance">
          <p id="place-one-result">{props.info.placeName}</p>
          <p id="distance-one-result">{distance}</p>
        </div>
        
      </div>
      
    </div>
  )
}

export default OneResult
