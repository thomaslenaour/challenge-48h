import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Field from '../components/Field'
import CompaniesAPI from '../services/CompaniesAPI'

const RegisterPage = ({ history }) => {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    masksStock: '',
    address: '',
    postalCode: '',
    city: '',
    password: '',
    confirmPassword: ''
  })

  const [errorLogin, setErrorLogin] = useState('d-none')

  // Gestion des champs
  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget
    setCredentials({ ...credentials, [name]: value })
  }

  // Gestion du submit
  const handleSubmit = async event => {
    event.preventDefault()

    try {
      if (credentials.confirmPassword === credentials.password) {
        CompaniesAPI.createCompanie(credentials)
        toast.success(
          'Votre compte a bien été crée. Vous êtes maintenant connecté ✅'
        )
        setErrorLogin('d-none')
        history.replace('/')
      } else {
        setErrorLogin('')
        toast.error('Une erreur est survenue ❌')
        console.log('mdp')
      }

      // TODO SUCCESS TOAST
    } catch (error) {
      setErrorLogin('')
      // TODO ERROR TOAST
      toast.error('Une erreur est survenue ❌')
      console.log('autre')
    }
  }

  return (
    <div className="container my-5">
      <h1 className="text-center my-5 display-3">
        Inscription
        <span aria-label="Inscription" role="img" className="ml-3">
          ✍️
        </span>
      </h1>
      <p className="text-center">
        Les inscriptions sont réservées aux entreprises de Bordeaux qui vendent
        des masques.
      </p>
      <p className={`my-3 text-danger text-lg ${errorLogin}`}>
        Les informations sont invalides !
      </p>
      <form onSubmit={handleSubmit} className="py-5">
        <Field
          name="name"
          label="Nom de la société"
          value={credentials.name}
          onChange={handleChange}
          placeholder=""
          type="text"
          required
        />
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
          name="masksStock"
          label="Nombre de masques disponibles actuellement"
          value={credentials.masksStock}
          onChange={handleChange}
          placeholder=""
          type="number"
          required
        />
        <Field
          name="address"
          label="Adresse du lieu de vente des masques"
          value={credentials.address}
          onChange={handleChange}
          placeholder=""
          type="text"
          required
        />
        <Field
          name="postalCode"
          label="Code Postal"
          value={credentials.postalCode}
          onChange={handleChange}
          placeholder="33000"
          type="text"
          required
        />
        <Field
          name="city"
          label="Ville"
          value={credentials.city}
          onChange={handleChange}
          placeholder="Bordeaux"
          type="text"
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
        <Field
          name="confirmPassword"
          label="Confirmation du mot de passe"
          value={credentials.confirmPassword}
          onChange={handleChange}
          placeholder="Veuillez confirmer votre mot de passe"
          type="password"
          required
        />
        <div className="form-group">
          <button type="submit" className="btn btn-success text-white">
            Inscription
          </button>
          <Link to="/" className="btn btn-link text-success">
            Retour à l&apos;accueil
          </Link>
        </div>
      </form>
    </div>
  )
}

export default RegisterPage
