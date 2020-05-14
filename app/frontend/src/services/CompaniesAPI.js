import Axios from 'axios'

function createCompanie(companie) {
  return Axios.post('http://localhost:5000/api/companies/register', companie)
}

export default {
  createCompanie
}
