import React from 'react'

function OneResult(props) {

  return (
    <div>
      <div>Title: {props.info.title}</div>
      <div><img style={{ width: '300px' }} src={props.info.scenePictureUrl} alt={props.info.title} /></div>
      <div>ID: {props.info._id}</div>
      <div>Latitude: {props.info.coords.coordinates[1]}</div>
      <div>Longitude: {props.info.coords.coordinates[0]}</div>
      <div>Distance: {props.info.distance}</div>
    </div>
  )
}

export default OneResult
