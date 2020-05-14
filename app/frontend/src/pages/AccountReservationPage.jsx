import React, { useState, useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import ReservationsAPI from '../services/ReservationsAPI'
import { AuthContext } from '../contexts/AuthContext'

const AccountReservationPage = ({ history }) => {
  const [reservations, setReservations] = useState([])
  const auth = useContext(AuthContext)

  const fetchReservations = async () => {
    try {
      const reservations = await ReservationsAPI.fetchReservations(
        auth.userId
      ).then(response => response.data.reservations)
      setReservations(reservations)
    } catch (error) {
      toast.error('Une erreur est survenue ❌')
    }
  }

  // Au chargement du composent on va chercher les sneakers
  useEffect(() => {
    fetchReservations()
  }, [])

  const handleDelete = async id => {
    const originalReservations = [...reservations]
    setReservations(reservations.filter(reservation => reservation.id !== id))

    try {
      await ReservationsAPI.deleteReservation(id, false)
      toast.success('La réservation a bien été supprimée ✅')
      history.push('/account/reservations')
    } catch (error) {
      toast.error('Une erreur est survenue ❌')
      setReservations(originalReservations)
    }
  }

  const handleComplete = async id => {
    const originalReservations = [...reservations]
    setReservations(reservations.filter(reservation => reservation.id !== id))

    try {
      await ReservationsAPI.deleteReservation(id, true)
      toast.success('La réservation a bien été récupérée ✅')
    } catch (error) {
      toast.error('Une erreur est survenue ❌')
      setReservations(originalReservations)
    }
  }

  return (
    <>
      <h1 className="container my-5 text-center display-4">
        Toutes les réservations
      </h1>

      <div className="container">
        {reservations.map(r => (
          <div key={r.id} className="row shadow p-4 my-5">
            <div className="col">
              <h3>{r.name}</h3>
              <p>
                {' '}
                {r.email} | {r.phone}
              </p>
              <p>
                {' '}
                <span className="badge badge-success">
                  {' '}
                  Nombre de masques commandés :
                  <span className="text-bold">{r.masks}</span>
                </span>
              </p>
              <button
                onClick={() => handleDelete(r.id)}
                className="btn btn-light text-danger border-danger"
              >
                Le client n'est pas passé
              </button>
              <button
                onClick={() => handleComplete(r.id)}
                className="btn btn-light text-success border-success ml-2"
              >
                Le client est passé
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default AccountReservationPage
