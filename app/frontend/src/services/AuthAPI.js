import axios from 'axios'

function login(credentials) {
  return axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/companies/login`,
    credentials
  )
}

export default {
  login
}
