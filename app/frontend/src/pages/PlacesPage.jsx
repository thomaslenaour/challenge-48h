import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import CompaniesAPI from '../services/CompaniesAPI'
import Field from '../components/Field'
import Pagination from '../components/Pagination'

const PlacePages = () => {
  const [companies, setCompanies] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')

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

  const itemsPerPage = 5

  // Appel de la fonction fetchCompanies à chaque chargement de page
  useEffect(() => {
    fetchCompanies()
  }, [])

  // Fonction qui met à jour la valeur dans la barre de recherche pour filtrer ensuite les données
  const handleSearch = ({ currentTarget }) => {
    setSearch(currentTarget.value)
    setCurrentPage(1)
  }

  // Filtrage des sneakers selon la recherche en comparant celle-ci au nom des sneakers
  const companiesFiltered = companies.filter(
    company =>
      company.name.toLowerCase().includes(search.toLowerCase()) ||
      company.postal_code.toLowerCase().includes(search.toLowerCase())
  )

  // Gestion du changement de page
  const handlePageChange = page => setCurrentPage(page)

  // Pagination des données
  const paginatedCompanies = Pagination.getData(
    companiesFiltered,
    currentPage,
    itemsPerPage
  )

  return (
    <>
      <h1 className="my-5 text-center display-4">
        Liste des magasins en possession de masques
      </h1>

      <div className="container">
        <Field
          name="Rechercher"
          label="Rechercher"
          placeholder="Veuillez entrer un code postal ou le nom d'une société"
          onChange={handleSearch}
          value={search}
        />

        {paginatedCompanies.map(c => (
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
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChanged={handlePageChange}
          length={companiesFiltered.length}
        />
      </div>
    </>
  )
}

export default PlacePages
