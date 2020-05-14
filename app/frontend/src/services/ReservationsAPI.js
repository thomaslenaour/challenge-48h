import Axios from 'axios'

function createReservation(id, reservation) {
  return Axios.post(`http://localhost:5000/api/reservations/${id}`, reservation)
}

function fetchReservations(id) {
  return Axios.get(`http://localhost:5000/api/reservations/company/${id}`)
}

function fetchReservationsByCompany(id) {
  return Axios.get(`http://localhost:5000/api/reservations/company/${id}`)
}

function deleteReservation(id, bool){
  return Axios.delete(`http://localhost:5000/api/reservations/${id}`,{data:{complete:bool}})
}

export default {
  createReservation,
  fetchReservations,
  fetchReservationsByCompany,
  deleteReservation
}
