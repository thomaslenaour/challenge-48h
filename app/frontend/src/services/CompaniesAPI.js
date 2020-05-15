import Axios from 'axios'

function createCompanie(companie) {
  return Axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/companies/register`,
    companie
  )
}

function fetchCompanies() {
  return Axios.get(`${process.env.REACT_APP_BACKEND_URL}/companies`)
}

function fetchCompany(id) {
  return Axios.get(`${process.env.REACT_APP_BACKEND_URL}/companies/${id}`)
}

function updateCompany(id, company) {
  return Axios.patch(
    `${process.env.REACT_APP_BACKEND_URL}/companies/${id}`,
    company
  )
}

function deleteCompany(id) {
  return Axios.delete(`${process.env.REACT_APP_BACKEND_URL}/companies/${id}`)
}

export default {
  createCompanie,
  fetchCompanies,
  fetchCompany,
  updateCompany,
  deleteCompany
}
