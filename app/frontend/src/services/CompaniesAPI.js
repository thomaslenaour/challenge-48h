import Axios from 'axios'

function createCompanie(companie) {
  return Axios.post('http://localhost:5000/api/companies/register', companie)
}

function fetchCompanies() {
  return Axios.get('http://localhost:5000/api/companies')
}

function fetchCompany(id) {
  return Axios.get(`http://localhost:5000/api/companies/${id}`)
}

function updateCompany(id, company) {
  return Axios.patch(`http://localhost:5000/api/companies/${id}`, company)
}

function deleteCompany(id){
  return Axios.delete(`http://localhost:5000/api/companies/${id}`)
}

export default {
  createCompanie,
  fetchCompanies,
  fetchCompany,
  updateCompany,
  deleteCompany
}
