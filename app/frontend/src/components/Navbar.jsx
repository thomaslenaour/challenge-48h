import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

const Navbar = () => {
  const auth = useContext(AuthContext)
  const history = useHistory()

  const handleLogout = () => {
    auth.logout()
    history.push('/')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success py-4">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          YnovMask
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
            <NavLink to="/places" className="nav-link">
              Les magasins
            </NavLink>
            <NavLink to="/map" className="nav-link">
              La map
            </NavLink>
          </ul>

          <ul className="navbar-nav ml-auto">
            {(!auth.isLoggedIn && (
              <>
                <li className="nav-item">
                  <NavLink to="/login" className="btn btn-light text-success">
                    Connexion
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/register"
                    className="ml-3 btn btn-light text-success"
                  >
                    Inscription
                  </NavLink>
                </li>
              </>
            )) || (
              <>
                <li className="nav-item mx-2">
                  <NavLink
                    to="/account/reservations"
                    className="btn btn-light text-success"
                  >
                    Les réservations
                  </NavLink>
                </li>
                <li className="nav-item mx-2">
                  <NavLink to="/account" className="btn btn-light text-success">
                    Compte de la société
                  </NavLink>
                </li>
                <li className="nav-item mx-2">
                  <button
                    onClick={handleLogout}
                    className="btn btn-light text-success"
                  >
                    Déconnexion
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
