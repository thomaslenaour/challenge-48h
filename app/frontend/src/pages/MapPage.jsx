import React from 'react'
import Map  from '../services/Map'

const MapPage = () => {
  return (
    <>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css" integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ==" crossorigin="" />
      <div id="map" style={{ height:"1080px"}}>
            
      </div>
    </>
  )
}

export default MapPage
