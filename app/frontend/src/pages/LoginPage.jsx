import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import AuthAPI from '../services/AuthAPI'
import { AuthContext } from '../contexts/AuthContext'
import Field from '../components/Field'

const LoginPage = ({ history }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  const [errorLogin, setErrorLogin] = useState('d-none')
  const auth = useContext(AuthContext)

  // Gestion des champs
  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget
    setCredentials({ ...credentials, [name]: value })
  }

  // Gestion du submit
  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const responseData = await AuthAPI.login(credentials)
      auth.login(responseData.data.userId, responseData.data.token)
      setErrorLogin('d-none')
      toast.success('Vous êtes désormais connecté ✅')
      history.replace('/')
    } catch (error) {
      setErrorLogin('')
      toast.error("Une erreur s'est produite ❌")
    }
  }

  return (
    <div className="container my-5">
      <h1 className="text-center my-5 display-3">
        Connexion
        <span aria-label="Inscription" role="img" className="ml-3">
          🔐
        </span>
      </h1>
      <p className={`my-3 text-danger text-lg ${errorLogin}`}>
        Les informations sont invalides !
      </p>
      <form onSubmit={handleSubmit} className="py-5">
        <Field
          name="email"
          label="Adresse Email"
          value={credentials.email}
          onChange={handleChange}
          placeholder="Adresse email de connexion"
          type="email"
          required
        />
        <Field
          name="password"
          label="Mot de passe"
          value={credentials.password}
          onChange={handleChange}
          type="password"
          required
        />
        <div className="form-group">
          <button type="submit" className="btn btn-success text-white">
            Connexion
          </button>
          <Link to="/" className="btn btn-link text-success">
            Retour à l&apos;accueil
          </Link>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
