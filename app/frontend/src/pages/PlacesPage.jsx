import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import CompaniesAPI from '../services/CompaniesAPI'

const PlacePages = () => {
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

  console.log(companies)

  return (
    <>
      <h1 className="my-5 text-center display-4">
        Liste des magasins en possession de masques
      </h1>

      <div className="container">
        {companies.map(c => (
          <div key={c.id} className="row shadow p-4 my-5">
            <div className="col">
              <h3>{c.name}</h3>
              <p>
                {' '}
                {c.address} | {c.city} | {c.postal_code}{' '}
              </p>
              <p>
                {' '}
                <span className="badge badge-success">
                  {' '}
                  Stock disponible :
                  <span className="text-bold">{c.masks_stock}</span>
                </span>
              </p>
              <Link
                to={`/reservation/${c.id}`}
                className="btn btn-success text-white"
              >
                {' '}
                Réserver des masques
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default PlacePages
