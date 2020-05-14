import React from 'react'
import { Marker, GoogleMap, withGoogleMap } from 'react-google-maps'

const Map = withGoogleMap(props => {
  return (
    <div className="d-flex justify-content-center border">
      <GoogleMap
        defaultCenter={{ lat: 44.8637226, lng: -0.6212461 }}
        defaultZoom={13}
      >
        {props.companies.map(marker => (
          <Marker position={marker.location} name="Marker" color="red" />
        ))}
      </GoogleMap>
    </div>
  )
})

export default Map
