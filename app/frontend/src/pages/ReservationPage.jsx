import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import ReservationsAPI from '../services/ReservationsAPI'
import Field from '../components/Field'

const ReservationPage = ({ match, history }) => {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    phone: '',
    masks: 0
  })

  const { companyId } = match.params

  const [errorReservation, setErrorReservation] = useState('d-none')

  // Gestion des champs
  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget
    setCredentials({ ...credentials, [name]: value })
  }

  console.log(companyId)

  // Gestion du submit
  const handleSubmit = async event => {
    event.preventDefault()

    try {
      await ReservationsAPI.createReservation(companyId, credentials)
      setErrorReservation('d-none')
      toast.success(
        'Vos masques sont réservés ! Un message vous sera envoyé quand ils seront disponibles ✅'
      )
      history.replace('/')
    } catch (error) {
      setErrorReservation('')
      console.log(credentials)
      toast.error("Une erreur s'est produite ❌")
    }
  }

  return (
    <>
      <h1 className="my-5 text-center display-4">Je réserve mon masque</h1>
      <div className="container">
        <form onSubmit={handleSubmit} className="py-5">
          <Field
            name="name"
            label="Nom & Prénom"
            value={credentials.name}
            onChange={handleChange}
            placeholder="Veuillez renseigner votre nom et prénom (6 caractères minimums)"
            required
          />
          <Field
            name="email"
            label="Email"
            value={credentials.email}
            onChange={handleChange}
            type="email"
            required
          />
          <Field
            name="phone"
            label="Numéro de téléphone"
            value={credentials.phone}
            onChange={handleChange}
            placeholder="Veuillez renseigner votre numéro de téléphone"
            required
          />
          <Field
            name="masks"
            label="Nombre de masques souhaités"
            value={credentials.masks}
            onChange={handleChange}
            type="number"
            required
          />
          <div className="form-group">
            <button type="submit" className="btn btn-success text-white">
              Je réserve !
            </button>
            <Link to="/places" className="btn btn-link text-success">
              Retour aux différentes sociétés
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default ReservationPage
