import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <>
      <h1 className="my-5 text-center display-3">Votre sécurité avant tout</h1>
      <div className="row pt-5 w-100">
        <div className="col-6 text-center">
          <img
            className="w-75 img-responsive"
            src="./img/background_homepage.png"
            alt="Home Health"
          />
        </div>
        <div className="col-5 text-center mt-3">
          <h2>
            Réservez vos masques sans avoir à vous déplacer plusieurs fois
          </h2>
          <p className="text-center text-justify px-5 mt-5 lead">
            <strong>YnovMask</strong> vous permet de trouver plusieurs points de
            vente de masques. En cette période délicate pour les Bordelais et la
            population mondiale, YnovMask propose un service qui vous permettra
            de réserver vos masques en avance et venir les récupérer dans la
            journée.
          </p>
          <h2 className="mt-5">Vous vendez des masques ?</h2>
          <Link
            to="/register"
            className="btn btn-success text-light btn-lg mt-4"
          >
            Je m&apos;inscris
          </Link>
        </div>
      </div>
    </>
  )
}

export default HomePage
