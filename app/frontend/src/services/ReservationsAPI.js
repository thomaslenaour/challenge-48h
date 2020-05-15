import Axios from 'axios'

function createReservation(id, reservation) {
  return Axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/reservations/${id}`,
    reservation
  )
}

function fetchReservations(id) {
  return Axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/reservations/company/${id}`
  )
}

function fetchReservationsByCompany(id) {
  return Axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/reservations/company/${id}`
  )
}

function deleteReservation(id, bool) {
  return Axios.delete(
    `${process.env.REACT_APP_BACKEND_URL}/reservations/${id}`,
    { data: { complete: bool } }
  )
}

export default {
  createReservation,
  fetchReservations,
  fetchReservationsByCompany,
  deleteReservation
}
