import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Map from '../components/Map'
import CompaniesAPI from '../services/CompaniesAPI'

const MapPage = () => {
  const [companies, setCompanies] = useState([])

  const fetchCompanies = async () => {
    try {
      const companies = await CompaniesAPI.fetchCompanies().then(
        response => response.data.companies
      )
      setCompanies(companies)
    } catch (error) {
      toast.error('Une erreur est survenue ❌')
    }
  }

  useEffect(() => {
    fetchCompanies()
  }, [])

  return (
    <div className="container">
      <h2 className="text-center my-5">Map</h2>
      <Map
        containerElement={<div style={{ height: `500px`, width: '100%' }} />}
        mapElement={<div style={{ height: `100%` }} />}
        companies={companies}
      />
    </div>
  )
}

export default MapPage
