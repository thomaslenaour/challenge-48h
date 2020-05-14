import React from 'react'
import '../styles/account.css'
import { Link } from 'react-router-dom'

const AccountPage = () => {
  const handleDelete = () => {}

  return (
    <>
      <h1 className="my-5 text-center display-3">Notre entreprise</h1>
      <div className="data row d-flex justify-content-center">
        <div className="nb_masks col-md-3 shadow mx-5 p-5 text-center">
          <h2 className="text-success display-4">1000</h2>
          <p className="lead">Masques restants</p>
          <Link to="" className="btn btn-success text-light">
            Modifier
          </Link>
        </div>
        <div className="nb_masks col-md-3 shadow mx-5 p-5 text-center">
          <h2 className="text-success display-4">48</h2>
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
        <button onClick={handleDelete} className="ml-5 btn btn-danger">
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
