import React, { useState, useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import ReservationsAPI from '../services/ReservationsAPI'
import { AuthContext } from '../contexts/AuthContext'
import Pagination from '../components/Pagination'
import Field from '../components/Field'

const AccountReservationPage = ({ history }) => {
  const [reservations, setReservations] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [search, setSearch] = useState('')
  const auth = useContext(AuthContext)

  const itemsPerPage = 10

  const fetchReservations = async () => {
    try {
      const reservations = await ReservationsAPI.fetchReservations(
        auth.userId
      ).then(response => response.data.reservations)
      if (reservations === true) {
        toast.error("Il n'y a pas de réservations pour le moment ❌")
      } else {
        setReservations(reservations)
      }
    } catch (error) {
      toast.error('Une erreur est survenue ❌')
    }
  }

  // Au chargement du composent on va chercher les sneakers
  useEffect(() => {
    fetchReservations()
  }, [])

  // Fonction qui met à jour la valeur dans la barre de recherche pour filtrer ensuite les données
  const handleSearch = ({ currentTarget }) => {
    setSearch(currentTarget.value)
    setCurrentPage(1)
  }

  // Filtrage des sneakers selon la recherche en comparant celle-ci au nom des sneakers
  const filteredReservations = reservations.filter(
    reservation =>
      reservation.name.toLowerCase().includes(search.toLowerCase()) ||
      reservation.phone.toLowerCase().includes(search.toLowerCase()) ||
      reservation.email.toLowerCase().includes(search.toLowerCase())
  )

  // Gestion du changement de page
  const handlePageChange = page => setCurrentPage(page)

  // Pagination des données
  const paginatedReservations = Pagination.getData(
    filteredReservations,
    currentPage,
    itemsPerPage
  )

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
        <Field
          name="Rechercher"
          label="Rechercher"
          placeholder="Veuillez entrer un nom, un email ou un numéro de téléphone"
          onChange={handleSearch}
          value={search}
        />
        {paginatedReservations.map(r => (
          <div key={r.id} className="row shadow p-4 my-5">
            <div className="col-8">
              <h3>{r.name}</h3>
              <p>
                {' '}
                {r.email} | {r.phone}
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
            <div className="col-4 text-right">
              <span className="badge badge-light text-success border border-success px-3 py-2">
                Masques réservés : <span className="text-bold">{r.masks}</span>
              </span>
            </div>
          </div>
        ))}
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChanged={handlePageChange}
          length={filteredReservations.length}
        />
      </div>
    </>
  )
}

export default AccountReservationPage
