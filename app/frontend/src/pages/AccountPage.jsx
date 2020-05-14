import React, { useContext, useState, useEffect } from 'react'
import '../styles/account.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import CompaniesAPI from '../services/CompaniesAPI'
import ReservationsAPI from '../services/ReservationsAPI'
import { toast } from 'react-toastify'

const AccountPage = ({ history }) => {
  const [masks, setMasks] = useState(0)
  const [reservations, setReservations] = useState(0)
  const auth = useContext(AuthContext)

  // Récupère le nombre de masque d'une compagnie
  const fetchCompany = async () => {
    try {
      const data = await CompaniesAPI.fetchCompany(auth.userId).then(
        response => response.data.company
      )
      setMasks(data.masks_stock)
    } catch {
      toast.error("Une erreur s'est produite ❌")
    }
  }

  // Récupère le nombre de réservations d'une compagnie
  const fetchReservations = async () => {
    try {
      const data = await ReservationsAPI.fetchReservationsByCompany(
        auth.userId
      ).then(response => response.data.reservations)
      const nbReservations = data.length
      setReservations(nbReservations)
    } catch {
      toast.error("Une erreur s'est produite ❌")
    }
  }

  // Appel des fonctions à chaque chargement de page
  useEffect(() => {
    fetchCompany()
    fetchReservations()
  }, [])

  // Gestion de la suppression
  const handleDelete = async () => {
    try {
      await CompaniesAPI.deleteCompany(auth.userId)
      toast.success('La société à bien été supprimée ✅')
      auth.logout()
      history.replace('/')
    } catch (error) {
      console.log(error.response)
      toast.error("Une erreur s'est produite ❌")
    }
  }

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
          className="btn btn-light text-danger border-danger ml-5"
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
