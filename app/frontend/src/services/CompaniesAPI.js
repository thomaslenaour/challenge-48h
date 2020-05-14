import Axios from 'axios'

function createCompanie(companie) {
  return Axios.post('http://localhost:5000/api/companies/register', companie)
}

function fetchCompanies() {
  return Axios.get('http://localhost:5000/api/companies')
}

export default {
  createCompanie,
  fetchCompanies
}
