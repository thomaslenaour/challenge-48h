import React, { useState, useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import ReservationsAPI from '../services/ReservationsAPI'
import { AuthContext } from '../contexts/AuthContext'

const AccountReservationPage = () => {
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

  console.log(auth.userId)

  // Au chargement du composent on va chercher les sneakers
  useEffect(() => {
    fetchReservations()
  }, [])

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
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default AccountReservationPage
