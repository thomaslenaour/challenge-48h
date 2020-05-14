import React, { useEffect } from 'react'
import {initMap}  from '../services/Map'

const MapPage = () => {
  useEffect(() => {
    initMap()
  }, [])
  return (
    <>
      <div id="map" style={{ height:"1080px"}}>
            
      </div>
    </>
  )
}

export default MapPage
