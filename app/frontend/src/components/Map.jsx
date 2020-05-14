import React from 'react'
import { Marker, GoogleMap, withGoogleMap } from 'react-google-maps'

const Map = withGoogleMap(props => {
  return (
    <div className="d-flex justify-content-center border">
      <GoogleMap
        defaultCenter={{ lat: 44.841211, lng: -0.5646937 }}
        defaultZoom={12}
      >
        {props.companies.map(company => (
          <Marker position={company.location} title={company.name} />
        ))}
      </GoogleMap>
    </div>
  )
})

export default Map
