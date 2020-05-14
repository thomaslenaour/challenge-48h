import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success py-4">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          Stock/Masques
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar"
          aria-controls="navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav mr-auto">
            <NavLink to="/customers" className="nav-link">
              Les magasins
            </NavLink>
            <NavLink to="/invoices" className="nav-link">
              La map
            </NavLink>
          </ul>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink to="/login" className="btn btn-light mx-2 text-success">
                Connexion
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="#" className="btn btn-light mx-2 text-success">
                Déconnexion
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/register"
                className="btn btn-light mx-2 text-success"
              >
                Inscription
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
