import Axios from 'axios'

function createReservation(id, reservation) {
  return Axios.post(`http://localhost:5000/api/reservations/${id}`, reservation)
}

export default {
  createReservation
}
