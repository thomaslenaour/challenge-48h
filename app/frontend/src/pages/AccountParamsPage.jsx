import React, { useState, useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import Field from '../components/Field'
import { AuthContext } from '../contexts/AuthContext'
import CompaniesAPI from '../services/CompaniesAPI'

const AccountParamsPage = () => {
  const auth = useContext(AuthContext)

  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    masksStock: '',
    address: '',
    postalCode: '',
    city: ''
  })

  const [errorParams, setErrorParams] = useState('d-none')

  const fetchCompany = async () => {
    try {
      const data = await CompaniesAPI.fetchCompany(auth.userId).then(
        response => response.data.company
      )
      setCredentials({
        name: data.name,
        email: data.email,
        masksStock: data.masks_stock,
        address: data.address,
        postalCode: data.postal_code,
        city: data.city
      })
    } catch (error) {
      toast.error("Une erreur s'est produite ❌")
    }
  }

  useEffect(() => {
    fetchCompany()
  }, [])

  // Gestion des champs
  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget
    setCredentials({ ...credentials, [name]: value })
  }

  // Gestion du submit
  const handleSubmit = async event => {
    event.preventDefault()

    try {
      await CompaniesAPI.updateCompany(auth.userId, credentials)
      toast.success('Vos informations ont bien été modifiées ✅')
    } catch (error) {
      toast.error('Une erreur est survenue ❌')
      setErrorParams('')
    }
  }

  return (
    <>
      <h1 className="display-4 text-center my-5">Paramètres de la société</h1>
      <p className={`my-3 text-danger text-lg ${errorParams}`}>
        Les informations sont invalides !
      </p>
      <div className="container">
        <form onSubmit={handleSubmit}>
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
          <div className="form-group">
            <button type="submit" className="btn btn-success text-white mr-2">
              Enregistrer
            </button>
            <Link to="/" className="btn btn-link text-success">
              Retour à l&apos;accueil
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default AccountParamsPage
