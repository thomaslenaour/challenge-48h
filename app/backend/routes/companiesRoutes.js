const express = require('express')

const companiesController = require('../controllers/companiesController')

const router = express.Router()

// /api/companies
router.get('/', companiesController.getCompanies)
router.get('/:companyId', companiesController.getCompany)
router.patch('/:companyId', companiesController.updateCompany)
router.delete('/:companyId', companiesController.deleteCompany)
router.post('/register', companiesController.createCustomer)
router.post('/login', companiesController.createCustomer)

module.exports = router
