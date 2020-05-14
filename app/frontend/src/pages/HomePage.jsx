import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <>
      <h1 className="my-5 text-center display-3">Votre sécurité avant tout</h1>
      <div className="row pt-5">
        <div className="col-6 text-center">
          <img
            className="w-75 img-responsive"
            src="./img/background_homepage.png"
            alt="Home Health"
          />
        </div>
        <div className="col-6 text-center mt-3">
          <h2>
            Réservez vos masques sans avoir à vous déplacer plusieurs fois
          </h2>
          <p className="text-center text-justify px-5 mt-5">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            ipsum soluta voluptatibus, sequi dignissimos ipsa in voluptas
            perspiciatis dolore rem doloremque odit aspernatur iure error labore
            corporis nostrum? Id voluptatem deleniti sunt accusamus amet. Ut
            dicta ad adipisci perferendis ipsa nesciunt, sint libero,
            repudiandae aut doloribus, maxime possimus explicabo provident.
          </p>
          <h2>Vous vendez des masques ?</h2>
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
