import axios from 'axios'

function login(credentials) {
  return axios.post('http://localhost:5000/api/companies/login', credentials)
}

export default {
  login
}
