import React, { useContext, useState, useEffect } from 'react'
import '../styles/account.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import CompaniesAPI from '../services/CompaniesAPI'
import ReservationsAPI from '../services/ReservationsAPI'

const AccountPage = () => {
  const [masks, setMasks] = useState(0)
  const [reservations, setReservations] = useState(0)
  const auth = useContext(AuthContext)

  const fetchCompany = async () => {
    try {
      const data = await CompaniesAPI.fetchCompany(auth.userId).then(
        response => response.data.company
      )
      setMasks(data.masks_stock)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchReservations = async () => {
    try {
      const data = await ReservationsAPI.fetchReservationsByCompany(
        auth.userId
      ).then(response => response.data.reservations)
      const nbReservations = data.length
      setReservations(nbReservations)
    } catch (error) {
      console.log('error')
    }
  }

  useEffect(() => {
    fetchCompany()
    fetchReservations()
  }, [])

  const handleDelete = () => {}

  return (
    <>
      <h1 className="my-5 text-center display-3">Notre entreprise</h1>
      <div className="data row d-flex justify-content-center">
        <div className="nb_masks col-md-3 shadow mx-5 p-5 text-center">
          <h2 className="text-success display-4">{masks}</h2>
          <p className="lead">Masques restants</p>
          <Link
            to={`/account/params/${auth.userId}`}
            className="btn btn-success text-light"
          >
            Modifier
          </Link>
        </div>
        <div className="nb_masks col-md-3 shadow mx-5 p-5 text-center">
          <h2 className="text-success display-4">{reservations}</h2>
          <p className="lead">Réservations</p>
          <Link
            to="/account/reservations"
            className="btn btn-success text-light"
          >
            Afficher
          </Link>
        </div>
        <div className="nb_masks col-md-3 shadow mx-5 p-5 text-center">
          <h2 className="text-success display-4">48</h2>
          <p className="lead">Masques restants</p>
          <Link to="" className="btn btn-success text-light">
            Modifier
          </Link>
        </div>
      </div>
      <div className="my-5 d-flex">
        <button
          onClick={handleDelete}
          className="btn btn-light text-success border-success ml-5"
        >
          Supprimer notre compte
        </button>
        <Link to="/" className="nav-link text-success">
          Retour à l'accueil
        </Link>
      </div>
    </>
  )
}

export default AccountPage
