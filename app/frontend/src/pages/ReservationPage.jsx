import React, { useState } from 'react'
import { toast } from 'react-toastify'
import ReservationsAPI from '../services/ReservationsAPI'

const ReservationPage = ({ match, history }) => {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    phone: '',
    mask: ''
  })

  const { companyId } = match.params

  const [errorReservation, setErrorReservation] = useState('d-none')

  // Gestion des champs
  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget
    setCredentials({ ...credentials, [name]: value })
  }

  // Gestion du submit
  const handleSubmit = async event => {
    event.preventDefault()

    try {
      await ReservationsAPI.createReservation(credentials)
      setErrorReservation('d-none')
      toast.success('Vous êtes désormais connecté ✅')
      history.replace('/')
    } catch (error) {
      setErrorReservation('')
      toast.error("Une erreur s'est produite ❌")
    }
  }

  console.log(companyId)

  return <h1 className="my-5 text-center display-4">Je réserve mon masque</h1>
}

export default ReservationPage
