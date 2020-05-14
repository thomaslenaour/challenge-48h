import Axios from 'axios'

function createReservation(id, reservation) {
  return Axios.post(`http://localhost:5000/api/reservations/${id}`, reservation)
}

function fetchReservations(id) {
  return Axios.get(`http://localhost:5000/api/reservations/company/${id}`)
}

export default {
  createReservation,
  fetchReservations
}
